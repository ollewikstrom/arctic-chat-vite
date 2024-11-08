//Get room id from URL

import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TeamCard from "../../components/teams/TeamCard";
import { getRandomTailWindBgColors } from "../../utils/utils";
import { Quiz, Team } from "../../utils/types";
import { QuizContext } from "../../App";

export default function Room() {
  //Get roomId from path
  const { roomId } = useParams();
  const quizContext = useContext(QuizContext);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [teams, setTeams] = useState<Team[]>(quizContext?.quiz?.teams || []);
  const navigate = useNavigate();

  const handleTeamCardClick = (teamId: string) => {
    setSelectedTeamId(teamId);
    navigate(`/room/${roomId}/team/${teamId}`);
    console.log("Team selected: ", teamId);
  };

  return (
    <>
      <section className="flex flex-col w-full gap-5 p-6 h-[calc(100vh-8rem)] items-center justify-center">
        <h2 className="text-4xl font-bold">{quizContext?.quiz?.name}</h2>
        <ul className="flex flex-wrap w-full justify-center items-center gap-6">
          {teams.map((team, index) => (
            <TeamCard
              key={index}
              team={team}
              color={team.color}
              selected={selectedTeamId === team.id}
              onClick={() => handleTeamCardClick(team.id)}
            />
          ))}
        </ul>
      </section>
    </>
  );
}
