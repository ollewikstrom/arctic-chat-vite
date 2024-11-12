import { Line } from "react-chartjs-2";

interface TeamScore {
  team: string;
  scores: number[];
  teamColor: string;
}

export default function Scores({
  teamScores,
  amtQuestions,
}: {
  teamScores: TeamScore[];
  amtQuestions: number;
}) {
  const data = {
    labels: [...Array(amtQuestions).keys()].map((i) => `Question ${i + 1}`),
    datasets: teamScores.map((teamScore) => ({
      label: teamScore.team,
      data: teamScore.scores,
      fill: false,
      borderColor: teamScore.teamColor,
    })),
  };
  const config = {
    type: "line",
    data: data,
  };

  return (
    <section className="flex-container items-center justify-center">
      <h1 className="text-4xl font-josefin font-bold mb-8">
        Score Progression
      </h1>
      <div className="max-w-5xl">
        <Line data={data} className="w-screen" />
      </div>
    </section>
  );
}
