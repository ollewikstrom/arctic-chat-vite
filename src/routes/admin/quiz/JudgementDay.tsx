import { useState } from "react";
import { useParams } from "react-router-dom";
import Start from "./judgementStates/Start";
import QuestionState from "./judgementStates/Question";
import { Judgement, Question, Team } from "../../../utils/types";

// const judgementContext = createContext<JudgementContextType | null>(null);

enum FlowState {
  Start,
  Question,
  Scores,
}

export default function JudgementDay() {
  const { quizId } = useParams();
  const [flowState, setFlowState] = useState<FlowState>(FlowState.Question);
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

  //Fetch teams and questions and motivation from the backend

  return (
    <section className="flex-container items-center justify-center h-container">
      {flowState === FlowState.Start && <Start quizId={quizId || ""} />}
      {flowState === FlowState.Question && (
        <>
          <QuestionState
            question={exampleQuestion}
            questionIndex={currentQuestionIndex}
          />
          {showAnswers && (
            <QuestionState
              question={questions[currentQuestionIndex]}
              questionIndex={currentQuestionIndex}
            />
          )}
          {showMotivation && (
            <QuestionState
              question={questions[currentQuestionIndex]}
              questionIndex={currentQuestionIndex}
            />
          )}
        </>
      )}
      {flowState === FlowState.Scores && <h1>Scoreboard</h1>}
    </section>
  );
}
