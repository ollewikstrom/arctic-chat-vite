import { useState } from "react";
import { Judge } from "../../../utils/types";

export default function CreateQuiz({ judges }: { judges: Judge[] }) {
  const [loading, isLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const participants = formData.get("participants") as string;
    const judge = formData.get("judge") as string;
    console.log(name, participants, judge);
  };

  return (
    <section className="flex-container h-full w-full">
      <h2 className="text-4xl font-bold">Skapa ett nytt quiz</h2>
      <div className="divider divider-secondary" />
      <div className="w-full flex justify-center h-full">
        <form
          className="flex flex-col gap-8 bg-secondary items-center p-6 rounded-md max-w-xl w-full border-sogeti-blue border-2 max-h-xl h-full shadow-lg"
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
  );
}
