import { useContext, useEffect, useState } from "react";
import Start from "./judgementStates/Start";
import QuestionState from "./judgementStates/Question";
import {
  Answer,
  Judgement,
  Question,
  Team,
  TeamScore,
} from "../../../utils/types";
import AnswerCard from "../../../components/admin/quiz/Answer";
import Scores from "./judgementStates/Scores";
import { QuizContext, ResultContext } from "../../../App";
import { getTeamsForQuiz } from "../../../services/api/apiService";
import Loader from "../../../components/Loader";
import EndState from "./judgementStates/EndState";

enum FlowState {
  Start,
  Question,
  Scores,
  End,
}

export const synthwaveColors = [
  "#ff5e99", // Neon Pink
  "#ff76d7", // Bright Magenta
  "#9e51ff", // Purple
  "#5c4bfe", // Deep Violet
  "#4832e4", // Electric Blue
  "#2d1b8f", // Dark Purple
  "#18ffff", // Cyan
  "#00e5ff", // Light Neon Blue
  "#e0ff26", // Neon Yellow
  "#ff9100", // Neon Orange
  "#ff1744", // Bright Red
  "#282a36", // Dark Background (Base Color)
  "#1a1a2e", // Midnight Background
  "#000000", // Pure Black
];

export default function JudgementDay() {
  const quizContext = useContext(QuizContext);
  if (!quizContext) {
    throw new Error("Quiz context is not defined");
  }
  const resultContext = useContext(ResultContext);
  if (!resultContext) {
    throw new Error("Result context is not defined");
  }

  const [flowState, setFlowState] = useState<FlowState>(FlowState.Start);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [showMotivation, setShowMotivation] = useState<boolean>(false);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [judgements, setJudgements] = useState<Judgement[]>([]);

  const [teamScores, setTeamScores] = useState<TeamScore[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleBackButton = () => {
    if (flowState === FlowState.Start) return;
    if (flowState === FlowState.Question) {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        return;
      }
      setFlowState(FlowState.Start);
    }
    if (flowState === FlowState.Scores) {
      setFlowState(FlowState.Question);
    }
  };

  const updateScores = () => {
    const newScores = teamScores.map((score) => ({ ...score }));

    // Filter judgments for the current question
    const currentQuestionJudgements = judgements.filter((judgement) => {
      return judgement.question === questions[currentQuestionIndex]?.id;
    });

    // Update scores based on judgments
    newScores.forEach((teamScore) => {
      const judgement = currentQuestionJudgements.find(
        (j) => j.team === teamScore.teamId
      );

      if (judgement) {
        // Push the actual score from the judgement
        teamScore.scores.push(judgement.score);
      } else {
        // If no judgement, push zero to indicate no score
        teamScore.scores.push(0);
      }
    });

    console.table(newScores);

    // Update state only if there is a change
    setTeamScores((prevScores) => {
      const isScoreChanged = newScores.some((newScore, index) => {
        return newScore.scores.some(
          (score, scoreIndex) => score !== prevScores[index]?.scores[scoreIndex]
        );
      });
      return isScoreChanged ? newScores : prevScores;
    });
  };

  const handleNextButton = () => {
    if (currentQuestionIndex === questions.length) {
      updateScores();
      setFlowState(FlowState.End);
      return;
    }
    if (flowState === FlowState.Question) {
      if (!showAnswers) {
        setShowAnswers(true);
        return;
      }
      if (!showMotivation) {
        setShowMotivation(true);
        return;
      }

      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Update scores before moving to Scores state
      updateScores();
      if (currentQuestionIndex === questions.length - 1) {
        setFlowState(FlowState.End);
        return;
      } else {
        setFlowState(FlowState.Scores);
        return;
      }
    }
    if (flowState === FlowState.Start) {
      setFlowState(FlowState.Question);
    }
    if (flowState === FlowState.Scores) {
      setFlowState(FlowState.Question);
      setShowAnswers(false);
      setShowMotivation(false);
    }
  };

  // Fetch and initialize quiz data
  useEffect(() => {
    const fetchTeams = async () => {
      if (!quizContext.quiz) return;
      setQuestions(quizContext.quiz.questions);
      const res = await getTeamsForQuiz(quizContext.quiz.id);
      setTeams(res);
      setAnswers(resultContext.results?.answers || []);
      setJudgements(resultContext.results?.judgements || []);

      const initialScores = res.map((team: Team) => ({
        teamId: team.id,
        teamName: team.name,
        scores: [0],
        teamColor: synthwaveColors[res.indexOf(team) % synthwaveColors.length],
      }));
      setTeamScores(initialScores);
      setIsLoading(false);
    };
    fetchTeams();
  }, [quizContext]);

  useEffect(() => {
    setCurrentQuestion(questions[currentQuestionIndex]);
  }, [currentQuestionIndex, questions]);

  return (
    <section className="flex-container items-center h-container overflow-y-auto">
      <nav className="w-full flex justify-between px-8">
        <button className="btn btn-primary btn-lg" onClick={handleBackButton}>
          Tillbake
        </button>
        <button className="btn btn-primary btn-lg" onClick={handleNextButton}>
          Nästa
        </button>
      </nav>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {quizContext.quiz ? (
            <>
              {flowState === FlowState.Start && (
                <Start teams={teams} quizName={quizContext.quiz.name} />
              )}
            </>
          ) : (
            <h1>Quiz context har gått snett</h1>
          )}
          {flowState === FlowState.Question && (
            <>
              <QuestionState
                question={currentQuestion}
                questionIndex={currentQuestionIndex}
              />
              {showAnswers && (
                <ul className="flex flex-wrap gap-4 justify-evenly">
                  {answers
                    .filter(
                      (answer) => answer.question.id === currentQuestion?.id
                    )
                    .map((answer) => (
                      <li key={answer.id}>
                        <AnswerCard
                          answer={answer}
                          judgement={
                            judgements.find(
                              (judgement) =>
                                judgement.question === answer.question.id &&
                                judgement.team === answer.team
                            ) || {
                              id: "",
                              team: "",
                              content: "",
                              question: "",
                              score: 0,
                            }
                          }
                          teamName={
                            teams.find((team) => team.id === answer.team)
                              ?.name || "Lag saknas"
                          }
                          showMotivation={showMotivation}
                        />
                      </li>
                    ))}
                </ul>
              )}
            </>
          )}
          {flowState === FlowState.Scores && (
            <Scores teamScores={teamScores} amtQuestions={questions.length} />
          )}
          {flowState === FlowState.End && (
            <EndState teamScores={teamScores} amtQuestions={questions.length} />
          )}
        </>
      )}
    </section>
  );
}
