import { useState } from "react";
import Loader from "../components/Loader";
import { redirect, useNavigate } from "react-router-dom";

export default function WaitingRoom() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // setLoading(true);
    const roomCode = e.target.roomCode.value;
    const passcode = "1234";

    if (roomCode === passcode) {
      setLoading(false);
      navigate(`/room/${e.target.roomCode.value}`);
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center h-[calc(100vh-8rem)]">
      <h2 className="font-josefin font-bold text-5xl">Arktiska Väntrummet</h2>
      <form
        className="flex flex-col gap-4 items-center min-h-48"
        onSubmit={handleSubmit}
      >
        <fieldset>
          <label htmlFor="roomCode" className="text-2xl">
            Rumskod
          </label>
          <input
            autoComplete="off"
            type="text"
            name="roomCode"
            id="roomCode"
            placeholder="Type here"
            className="input input-bordered input-sogeti-blue w-full max-w-xs"
          />
        </fieldset>
        {loading ? (
          <Loader />
        ) : (
          <button className="btn btn-primary w-48">Gå med!</button>
        )}
      </form>
      {error && (
        <div
          role="alert"
          className="alert alert-error"
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
