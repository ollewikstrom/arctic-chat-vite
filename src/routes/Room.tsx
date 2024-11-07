//Get room id from URL

import { useState } from "react";
import styles from "./room.module.css";
import { useParams } from "react-router-dom";
import TeamCard from "../components/teams/TeamCard";
import { getRandomTailWindBgColors } from "../utils/utils";

export default function Room() {
  //Get roomId from path
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const numberOfTeams = 5;
  const randomColors = getRandomTailWindBgColors(numberOfTeams);

  const handleMessageChange = (e: any) => {
    e.preventDefault();
    setMessage(e.target.message.value);
    console.log(e.target.message.value);
  };

  return (
    <>
      <section className="flex flex-col w-full gap-5 p-6 h-[calc(100vh-8rem)] items-center justify-center">
        <h2 className="text-4xl font-bold">Rum {roomId}</h2>
        <ul className="flex flex-wrap w-full justify-center items-center gap-6">
          {Array.from({ length: numberOfTeams }, (_, i) => (
            <li>
              <TeamCard teamId={i + 1} color={randomColors[i]} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
