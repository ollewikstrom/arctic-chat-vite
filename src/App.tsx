import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import Admin from "./routes/admin/Admin";
import Room from "./routes/rooms/Room";
import WaitingRoom from "./routes/WaitingRoom";
import Navbar from "./components/Navbar";
import Experiment from "./routes/rooms/Experiment";
import { createContext, useState } from "react";
import { Quiz, Team } from "./utils/types";
import JudgementDay from "./routes/admin/quiz/JudgementDay";

interface QuizContextType {
  quiz: Quiz | null;
  setQuiz: (quiz: Quiz | null) => void;
}

export const QuizContext = createContext<QuizContextType | null>(null);

function App() {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  return (
    <>
      <Navbar />
      <QuizContext.Provider value={{ quiz, setQuiz }}>
        <section className="min-h-container relative">
          <Routes>
            <Route
              path="/admin/"
              element={<Navigate to="/admin/quiz" replace />}
            />
            <Route path="/admin/:currentPath" element={<Admin />} />
            <Route path="/*" element={<WaitingRoom />} />

            <Route path="/room/:roomId" element={<Room />} />
            <Route path="/room/:roomId/team/:teamId" element={<Experiment />} />

            <Route path="/quiz/:quizId/judgement" element={<JudgementDay />} />
          </Routes>
        </section>
      </QuizContext.Provider>
    </>
  );
}

export default App;
