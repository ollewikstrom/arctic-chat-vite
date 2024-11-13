import { TeamScore } from "../../../../utils/types";
import Scores from "./Scores";

export default function EndState({
  teamScores,
  amtQuestions,
}: {
  teamScores: TeamScore[];
  amtQuestions: number;
}) {
  const getWinningTeam = () => {
    return teamScores.reduce((topTeam, currentTeam) => {
      // Calculate total score for the current team
      const currentTeamScore = currentTeam.scores.reduce(
        (acc, score) => acc + score,
        0
      );

      // Calculate total score for the current top team
      const topTeamScore = topTeam.scores.reduce(
        (acc, score) => acc + score,
        0
      );

      // Compare scores, update top team if current team has a higher score
      return currentTeamScore > topTeamScore ? currentTeam : topTeam;
    });
  };
  console.log(getWinningTeam());
  const winner = getWinningTeam();

  return (
    <section className="flex-container items-center justify-center w-screen">
      <h1 className="text-4xl font-josefin font-bold">Vinnare!</h1>
      <h2 className="text-4xl font-josefin font-bold mb-8">{winner.team}</h2>
      <Scores teamScores={teamScores} amtQuestions={amtQuestions} />
    </section>
  );
}
