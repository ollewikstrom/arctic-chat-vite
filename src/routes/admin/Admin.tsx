import { useLocation, useParams } from "react-router-dom";
import AdminMenu from "../../components/admin/AdminMenu";
import Judges from "./judges/Judges";
import CreateQuiz from "./quiz/CreateQuiz";

export default function Admin() {
  const { currentPath } = useParams();
  const judges = [
    { id: 1, name: "Domare 1", demands: ["Kräver kaffe", "Kräver te"] },
    { id: 2, name: "Domare 2", demands: ["Kräver kaffe"] },
    { id: 3, name: "Domare 3", demands: ["Kräver te"] },
  ];

  return (
    <>
      <section className="h-full w-full p-6">
        <AdminMenu />

        {currentPath === "quiz" && <CreateQuiz judges={judges} />}
        {currentPath === "judges" && <Judges judges={judges} />}
        {currentPath === "settings" && (
          <h2 className="text-4xl font-bold">Inställningar</h2>
        )}
      </section>
    </>
  );
}
