//Get room id from URL

import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TeamCard from "../../components/teams/TeamCard";
import { getRandomTailWindBgColors } from "../../utils/utils";
import { Quiz } from "../../utils/types";
import { QuizContext } from "../../App";

export default function Room() {
  //Get roomId from path
  const { roomId } = useParams();
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const quizContext = useContext(QuizContext);
  const numberOfTeams = 5;
  const [randomColors, setRandomColors] = useState<string[]>(
    getRandomTailWindBgColors(numberOfTeams)
  );
  const navigate = useNavigate();

  const handleTeamCardClick = (teamId: number) => {
    setSelectedTeamId(teamId);
    navigate(`/room/${roomId}/team/${teamId}`);
    console.log("Team selected: ", teamId);
  };

  return (
    <>
      <section className="flex flex-col w-full gap-5 p-6 h-[calc(100vh-8rem)] items-center justify-center">
        <h2 className="text-4xl font-bold">Rum {roomId}</h2>
        <h3>{quizContext?.quiz?.name}</h3>
        <ul className="flex flex-wrap w-full justify-center items-center gap-6">
          {Array.from({ length: numberOfTeams }, (_, i) => (
            <li key={i}>
              <TeamCard
                teamId={i + 1}
                color={randomColors[i]}
                selected={selectedTeamId === i + 1}
                onClick={() => handleTeamCardClick(i + 1)}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
