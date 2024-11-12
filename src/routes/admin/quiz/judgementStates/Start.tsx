import { Quiz, Team } from "../../../../utils/types";

export default function StartState({
  teams,
  quizName,
}: {
  teams: Team[];
  quizName: string;
}) {
  return (
    <section className="flex-container items-center justify-center">
      <h1 className="text-4xl font-josefin font-bold">Judgement day is here</h1>
      <img src="/Judge-Dredd.jpg" alt="" className="w-96" />
      <h2>
        Now judging <br />
        <span className="text-2xl font-josefin font-bold">{quizName}</span>
      </h2>
      <h3>De anklagade: </h3>
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            <span>{team.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
