import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import Start from "./judgementStates/Start";
import QuestionState from "./judgementStates/Question";
import { Answer, Judgement, Question, Team } from "../../../utils/types";
import AnswerCard from "../../../components/admin/quiz/Answer";
import Scores from "./judgementStates/Scores";
import { QuizContext } from "../../../App";

// const judgementContext = createContext<JudgementContextType | null>(null);

enum FlowState {
  Start,
  Question,
  Scores,
}

export default function JudgementDay() {
  const quizContext = useContext(QuizContext);
  if (!quizContext) {
    throw new Error("Quiz context is not defined");
  }

  const [flowState, setFlowState] = useState<FlowState>(FlowState.Start);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [judgements, setJudgements] = useState<Judgement[] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [showMotivation, setShowMotivation] = useState<boolean>(false);

  const exampleQuestion: Question = {
    id: "abc123",
    type: "question",
    content: "Hi, what is your name?",
  };

  const exampleTeam: Team = {
    id: "abc123",
    name: "Team 1",
    prompt: "Prompt 1",
    score: 0,
    color: "#000000",
  };

  const exampleAnswer: Answer = {
    id: "abc123",
    team: exampleTeam,
    content: "lorem25",
    question: "abc123",
  };

  const handleBackButton = () => {
    if (flowState === FlowState.Start) {
      return;
    }
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

  const handleNextButton = () => {
    if (flowState === FlowState.Question) {
      if (!showAnswers) {
        setShowAnswers(true);
        return;
      }
      if (!showMotivation) {
        setShowMotivation(true);
        return;
      }
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        return;
      }
      setFlowState(FlowState.Scores);
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

  //Fetch teams and questions and motivation from the backend

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
      {quizContext && (
        <>
          {quizContext.quiz ? (
            <>
              {flowState === FlowState.Start && (
                <Start quiz={quizContext.quiz} />
              )}
            </>
          ) : (
            <h1>Quiz context har gått snett</h1>
          )}
          {flowState === FlowState.Question && (
            <>
              <QuestionState
                question={exampleQuestion}
                questionIndex={currentQuestionIndex}
              />
              {showAnswers && (
                <ul className="flex flex-wrap gap-4 justify-between">
                  <AnswerCard
                    answer={exampleAnswer}
                    showMotivation={showMotivation}
                  />
                  <AnswerCard
                    answer={exampleAnswer}
                    showMotivation={showMotivation}
                  />
                  <AnswerCard
                    answer={exampleAnswer}
                    showMotivation={showMotivation}
                  />
                  <AnswerCard
                    answer={exampleAnswer}
                    showMotivation={showMotivation}
                  />
                  <AnswerCard
                    answer={exampleAnswer}
                    showMotivation={showMotivation}
                  />
                  <AnswerCard
                    answer={exampleAnswer}
                    showMotivation={showMotivation}
                  />
                </ul>
              )}
            </>
          )}
          {flowState === FlowState.Scores && <Scores />}
        </>
      )}
    </section>
  );
}
