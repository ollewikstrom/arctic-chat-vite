import { useEffect, useRef, useState } from "react";
import { TeamScore } from "../../../../utils/types";
import Scores from "./Scores";

import Confetti from "react-confetti";

export default function EndState({
  teamScores,
  amtQuestions,
}: {
  teamScores: TeamScore[];
  amtQuestions: number;
}) {
  const { width, height } = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const videoRef = useRef<HTMLVideoElement>(null);
  const tadaRef = useRef<HTMLAudioElement>(null);
  const drumRollRef = useRef<HTMLAudioElement>(null);

  const [showDrumRoll, setShowDrumRoll] = useState<boolean>(false);

  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showWinner, setShowWinner] = useState<boolean>(false);
  const [winnerButton, setWinnerButton] = useState<boolean>(false);
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

  const playDrumRoll = () => {
    drumRollRef.current?.play();
    setShowDrumRoll(true);
    setTimeout(() => {
      setShowDrumRoll(false);
      setShowWinner(true);
    }, 5000);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onended = () => {
        setWinnerButton(true);
      };
    }
  }, []);

  useEffect(() => {
    if (showWinner) {
      tadaRef.current?.play();
      setTimeout(() => {
        setShowConfetti(true);
      }, 500);
    }
    return () => {
      setShowConfetti(false);
    };
  }, [showWinner]);

  return (
    <section className="flex-container items-center justify-center w-screen h-container relative">
      {!showWinner ? (
        <>
          <h1 className="text-4xl font-josefin font-bold">
            Dags för resultat...
          </h1>
          <video
            width="480"
            height="360"
            ref={videoRef}
            // onLoad={playVideo}
          >
            <source src="/olidligt.mp4" type="video/mp4" />
          </video>
          {showDrumRoll ? (
            <img src="/drumroll.gif" alt="drumroll"></img>
          ) : (
            <>
              <div className="flex gap-4">
                <button
                  className="btn btn-primary"
                  onClick={() => videoRef.current?.play()}
                >
                  Lyssna på Peter
                </button>
                {winnerButton && (
                  <button className="btn btn-secondary" onClick={playDrumRoll}>
                    Visa vinnare!
                  </button>
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <h1 className="text-4xl font-josefin font-bold">Vinnare!</h1>
          <h2 className="text-5xl font-josefin font-bold mb-8">
            {winner.teamName}
          </h2>
          <Scores teamScores={teamScores} amtQuestions={amtQuestions} />
          {showConfetti && (
            <div className="canvas-container w-full h-full absolute">
              <Confetti
                width={width}
                height={height}
                recycle={false}
                confettiSource={{ x: width / 2, y: height / 6, w: 5, h: 0 }}
              />
            </div>
          )}
        </>
      )}
      <audio
        src="/audio/output_drum-roll.mp3"
        controls
        className="hidden"
        ref={drumRollRef}
      ></audio>
      <audio
        src="/audio/output_tada_2.mp3"
        controls
        className="hidden"
        ref={tadaRef}
      ></audio>
    </section>
  );
}
