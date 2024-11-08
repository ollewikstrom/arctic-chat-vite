import { useContext, useState } from "react";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { checkRoomPassword } from "../services/api/apiService";
import { QuizContext } from "../App";

export default function WaitingRoom() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const quizContext = useContext(QuizContext);

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const roomCode = e.target.roomCode.value;

    //Responds with the quiz if the room exists, otherwise responds with "Room not found"
    try {
      const response = await checkRoomPassword(roomCode);

      if (quizContext) {
        quizContext.setQuiz(response[0]);
      }
      setLoading(false);
      navigate(`/room/${e.target.roomCode.value}`);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error(error);
    }
  };

  return (
    <div className="flex-container items-center justify-center h-container">
      <h2 className="font-josefin font-bold text-5xl">Arktiska Väntrummet</h2>
      <form
        className="flex flex-col gap-6 max-w-lg w-full h-72 items-center justify-center min-h-48 bg-slate-300 rounded-lg border-sogeti-blue border-2 py-6 px-12 shadow-lg"
        onSubmit={handleSubmit}
      >
        <fieldset className="w-full text-center">
          <label htmlFor="roomCode" className="text-2xl font-bold">
            Rumskod
          </label>
          <input
            autoComplete="off"
            type="text"
            name="roomCode"
            id="roomCode"
            placeholder="Type here"
            className="input input-bordered input-primary max-w-sm w-full mt-2"
          />
        </fieldset>
        {loading ? (
          <Loader />
        ) : (
          <button className="btn btn-primary w-full max-w-sm text-lg text-white">
            Gå med!
          </button>
        )}
      </form>
      {error && (
        <div
          role="alert"
          className="alert alert-error max-w-lg"
          onClick={() => setError(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Rummet kunde inte hittas</span>
        </div>
      )}
    </div>
  );
}
