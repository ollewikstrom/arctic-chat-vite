import "chart.js/auto";
import { Line } from "react-chartjs-2";
import { TeamScore } from "../../../../utils/types";

export default function Scores({
  teamScores,
  amtQuestions,
}: {
  teamScores: TeamScore[];
  amtQuestions: number;
}) {
  const getCumulativeScores = (scores: number[]) => {
    const cumulativeScores = [];
    let total = 0;
    for (const score of scores) {
      total += score;
      cumulativeScores.push(total);
    }
    return cumulativeScores;
  };

  const data = {
    labels: [
      "Start",
      ...Array.from({ length: amtQuestions }, (_, i) => `Question ${i + 1}`),
    ],
    datasets: teamScores.map((teamScore) => ({
      label: teamScore.teamName,
      data: [...getCumulativeScores(teamScore.scores)],
      fill: false,
      borderColor: teamScore.teamColor,
      tension: 0, // Adds slight curve to the lines for a smoother appearance
    })),
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true, // Starts y-axis at zero
        title: {
          display: true,
          text: "Score",
        },
      },
      x: {
        title: {
          display: true,
          text: "Questions",
        },
      },
    },
  };

  return (
    <section className="flex-container items-center justify-center w-screen">
      <h1 className="text-4xl font-josefin font-bold mb-8">
        Score Progression
      </h1>
      <div className="w-full max-w-5xl aspect-w-16 aspect-h-9 canvas-container">
        <Line data={data} options={options} className="w-screen" />
      </div>
    </section>
  );
}
