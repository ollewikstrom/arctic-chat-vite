import { useState } from "react";
import { Judge } from "../../../utils/types";

export default function CreateQuiz({ judges }: { judges: Judge[] }) {
  const [loading, isLoading] = useState(false);
  const [quizes, setQuizes] = useState(["Quiz 1", "Quiz 2", "Quiz 3"]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const participants = formData.get("participants") as string;
    const judge = formData.get("judge") as string;
    console.log(name, participants, judge);
  };

  const handleFinishButton = (quiz: string) => {
    alert("Avslutar quiz " + quiz);
  };

  return (
    <section className="grid grid-cols-2 h-full w-full overflow-hidden">
      <section className="col-span-1 w-full flex-container border-r-2 overflow-y-auto">
        <h2 className="text-4xl font-bold">Aktiva Quiz</h2>
        {quizes.length === 0 ? (
          <div role="alert" className="alert alert-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>Inga aktiva quiz</span>
          </div>
        ) : (
          <ul className=" list-decimal list-inside flex flex-col gap-2">
            {quizes.map((quiz) => (
              <div className="card bg-base-100 w-96 shadow-xl" key={quiz}>
                <div className="card-body">
                  <h2 className="card-title">{quiz}</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn bg-red-600"
                      onClick={() => handleFinishButton(quiz)}
                    >
                      Avsluta
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        )}
      </section>
      <section className="col-span-1 w-full flex-container">
        <h2 className="text-4xl font-bold">Skapa ett nytt quiz</h2>

        <div className="w-full flex justify-center h-full">
          <form
            className="flex flex-col gap-8 bg-secondary items-center p-6 rounded-md max-w-xl w-full h-96 border-sogeti-blue border-2 shadow-lg"
            onSubmit={handleSubmit}
          >
            <h3 className="text-2xl font-bold text-slate-100">Skapa quiz</h3>
            <label className="input input-bordered flex items-center gap-2 drop-shadow-lg w-full">
              <input
                type="text"
                className="grow"
                placeholder="Namn"
                name="name"
              />
            </label>
            <div className="flex justify-between w-full gap-4">
              <label className="input input-bordered flex items-center gap-2 drop-shadow-lg w-full">
                <input
                  type="number"
                  className="grow"
                  placeholder="Antal deltagare"
                  name="participants"
                  min="0"
                />
              </label>

              <select
                className="select select-bordered w-full max-w-lg drop-shadow-lg"
                name="judge"
              >
                <option disabled selected>
                  Domare
                </option>
                {judges.map((judge) => (
                  <option key={judge.id}>{judge.name}</option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary border-slate-700 text-slate-200 drop-shadow-lg w-full max-w-lg">
              Skapa nytt quiz
            </button>
          </form>
        </div>
      </section>
    </section>
  );
}
