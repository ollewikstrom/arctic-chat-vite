import { Judge } from "../../../utils/types";

export default function CreateQuiz({ judges }: { judges: Judge[] }) {
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
    <section className="flex flex-col h-full w-full p-6 gap-6">
      <h2 className="text-4xl font-bold">Skapa ett nytt quiz</h2>
      <div className="divider divider-secondary" />
      <div className="w-full flex justify-center">
        <form
          className="max-w-md flex flex-col gap-4 bg-secondary p-6 rounded-md border-sogeti-blue border-2"
          onSubmit={handleSubmit}
        >
          <h3 className="text-2xl font-bold text-slate-100 drop-shadow-[0px_2px_2px_rgba(0,0,0,0.8)]">
            Skapa quiz
          </h3>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Namn"
              name="name"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="number"
              className="grow"
              placeholder="Antal deltagare"
              name="participants"
              min="0"
            />
          </label>

          <select
            className="select select-bordered w-full max-w-md"
            name="judge"
          >
            <option disabled selected>
              Domare
            </option>
            {judges.map((judge) => (
              <option key={judge.id}>{judge.name}</option>
            ))}
          </select>
          <button className="btn btn-primary border-slate-700 text-slate-200 max-w-md">
            Skapa nytt quiz
          </button>
        </form>
      </div>
    </section>
  );
}
