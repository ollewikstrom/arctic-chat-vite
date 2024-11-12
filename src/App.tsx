import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Admin from "./routes/admin/Admin";
import Room from "./routes/rooms/Room";
import WaitingRoom from "./routes/WaitingRoom";
import Navbar from "./components/Navbar";
import Experiment from "./routes/rooms/Experiment";
import { createContext, useState } from "react";
import { Answer, Judgement, Quiz, Team } from "./utils/types";
import JudgementDay from "./routes/admin/quiz/JudgementDay";

interface QuizContextType {
  quiz: Quiz | null;
  setQuiz: (quiz: Quiz | null) => void;
}

interface ResultType {
  answers: Answer[];
  judgements: Judgement[];
}

interface ResultContextType {
  results: ResultType | null;
  setResults: (results: ResultType | null) => void;
}

export const QuizContext = createContext<QuizContextType | null>(null);
export const ResultContext = createContext<ResultContextType | null>(null);

function App() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [results, setResults] = useState<ResultType | null>(null);
  return (
    <>
      <Navbar />
      <QuizContext.Provider value={{ quiz, setQuiz }}>
        <ResultContext.Provider value={{ results, setResults }}>
          <section className="min-h-container relative">
            <Routes>
              <Route
                path="/admin/"
                element={<Navigate to="/admin/quiz" replace />}
              />
              <Route path="/admin/:currentPath" element={<Admin />} />
              <Route path="/*" element={<WaitingRoom />} />

              <Route path="/room/:roomId" element={<Room />} />
              <Route
                path="/room/:roomId/team/:teamId"
                element={<Experiment />}
              />

              <Route
                path="/quiz/:quizId/judgement"
                element={<JudgementDay />}
              />
            </Routes>
          </section>
        </ResultContext.Provider>
      </QuizContext.Provider>
    </>
  );
}

export default App;
