import { useLocation, useParams } from "react-router-dom";
import AdminMenu from "../../components/admin/AdminMenu";
import Judges from "./judges/Judges";
import CreateQuiz from "./quiz/CreateQuiz";
import Questions from "./questions/questions";
import { Question, QuestionTheme } from "../../utils/types";

export default function Admin() {
  const { currentPath } = useParams();
  const judges = [
    {
      id: 1,
      name: "Domare 1",
      demands: ["Kräver kaffe", "Kräver te"],
      prompt: "Vad tycker du om kaffe?",
    },
    {
      id: 2,
      name: "Domare 2",
      demands: ["Kräver kaffe"],
      prompt: "Vad tycker du om te?",
    },
    {
      id: 3,
      name: "Domare 3",
      demands: ["Kräver te"],
      prompt: "Vad tycker du om kaffe?",
    },
  ]

  const questionThemes: QuestionTheme[] = [
    {
      id: "1",
      name: "string",
    },
    {
      id: "2",
      name: "stringg",
    },
    {
      id: "3",
      name: "stringg",
    },
  ]


  const questions: Question[] = [
    {
      id: "1",
      theme: questionThemes[0],
      content: "Vad är ditt namn?",
    },
    {
      id: "2",
      theme: questionThemes[1],
      content: "Vad är din ålder?",
    },
    {
      id: "3",
      theme: questionThemes[2],

      content: "Vad är din favoritfärg?",
    },
  ]

  return (
    <>
      <section className="h-full w-full p-6">
        <AdminMenu />

        {currentPath === "quiz" && <CreateQuiz />}
        {currentPath === "judges" && <Judges judges={judges} />}
        {currentPath === "questions" && <Questions questionsInput={questions} questionThemes={questionThemes} />}
        {currentPath === "settings" && (
          <h2 className="text-4xl font-bold">Inställningar</h2>
        )}
      </section>
    </>
  );
}
