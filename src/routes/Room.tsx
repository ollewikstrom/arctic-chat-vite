//Get room id from URL

import { useState } from "react";
import styles from "./room.module.css";
import { useParams } from "react-router-dom";
import TeamCard from "../components/teams/TeamCard";

export default function Room() {
  //Get roomId from path
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const numberOfTeams = 5;

  const handleMessageChange = (e: any) => {
    e.preventDefault();
    setMessage(e.target.message.value);
    console.log(e.target.message.value);
  };

  return (
    <>
      <h2>Rum {roomId}</h2>
      <section className="flex flex-wrap w-10/12 gap-5 py-4">
        {Array.from({ length: numberOfTeams }, (_, i) => (
          //Generate random colors for each team
          <TeamCard teamId={i + 1} />
        ))}
      </section>
    </>
  );
}
