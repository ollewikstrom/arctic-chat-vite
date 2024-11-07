import { useLocation, useParams } from "react-router-dom";
import AdminMenu from "../../components/admin/AdminMenu";
import Judges from "./judges/Judges";
import CreateQuiz from "./quiz/CreateQuiz";

export default function Admin() {
  const location = useLocation();
  console.log(location.pathname);
  const judges = [
    { id: 1, name: "Domare 1" },
    { id: 2, name: "Domare 2" },
    { id: 3, name: "Domare 3" },
  ];

  //Regex to match the last part of the URL
  const currentPath = location.pathname.match(/[^/]+$/)![0];

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
