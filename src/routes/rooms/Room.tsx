//Get room id from URL

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TeamCard from "../../components/teams/TeamCard";
import { Team } from "../../utils/types";
import { QuizContext } from "../../App";
import { getTeamsForQuiz } from "../../services/api/apiService";
import Loader from "../../components/Loader";

export default function Room() {
  //Get roomId from path
  const { roomId } = useParams();
  const quizContext = useContext(QuizContext);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [teams, setTeams] = useState<Team[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleTeamCardClick = (teamId: string) => {
    setSelectedTeamId(teamId);
    navigate(`/room/${roomId}/team/${teamId}`);
    console.log("Team selected: ", teamId);
  };

  useEffect(() => {
    const fetchTeams = async () => {
      if (!quizContext?.quiz) return;
      const res = await getTeamsForQuiz(quizContext?.quiz.id);
      setTeams(res);
      setIsLoading(false);
    };
    fetchTeams();
  }, [quizContext]);

  return (
    <>
      <section className="flex flex-col w-full gap-5 p-6 h-[calc(100vh-8rem)] items-center justify-center">
        <h2 className="text-4xl font-bold">{quizContext?.quiz?.name}</h2>
        {isLoading ? (
          <Loader />
        ) : teams && teams.length > 0 ? (
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
        ) : (
          <p>No teams available</p>
        )}
      </section>
    </>
  );
}
