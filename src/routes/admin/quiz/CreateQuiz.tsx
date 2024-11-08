import { useEffect, useState } from "react";
import { Judge, Quiz } from "../../../utils/types";
import {
  addQuiz,
  getJudges,
  getQuizes,
} from "../../../services/api/apiService";
import Loader from "../../../components/Loader";
import { v4 as uuidv4 } from "uuid";
import { Link, Navigate } from "react-router-dom";

export default function CreateQuiz() {
  const [pageLoading, setIsPageLoading] = useState(true);
  const [updateQuizLoading, setUpdateQuizLoading] = useState(false);
  const [judges, setJudges] = useState<Judge[]>();
  const [quizes, setQuizes] = useState<Quiz[]>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setUpdateQuizLoading(true);
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const numOfTeams = formData.get("numOfTeams") as string;
    const judgeName = formData.get("judge") as string;

    if (name === "" || numOfTeams === "" || judgeName === null) {
      throw new Error("Alla fält måste fyllas i");
    }
    try {
      parseInt(numOfTeams);
    } catch (error) {
      alert("Antal deltagare måste vara ett nummer");
      throw new Error("Antal deltagare måste vara ett nummer");
    }

    const judge = judges?.find((judge) => judge.name === judgeName);
    if (judge === undefined) {
      throw new Error("Domaren finns inte");
    }
    console.log(name, numOfTeams, judge);

    const res = await addQuiz({
      name,
      numOfTeams: parseInt(numOfTeams),
      judge,
    });

    if (res.status === 200) {
      const quiz = await res.json();
      setQuizes([...(quizes || []), quiz]);
      setUpdateQuizLoading(false);
      form.reset();
    } else {
      setUpdateQuizLoading(false);
      alert("Något gick fel: " + res.status + " " + res.statusText);
      throw new Error("Något gick fel: " + res.status + " " + res.statusText);
    }
  };

  const handleFinishButton = (quiz: string) => {
    alert("Avslutar quiz " + quiz);
  };

  const handleGradingQuiz = (quiz: string) => {
    alert("Rättar quiz " + quiz);
  };

  const fetchJudges = async () => {
    setIsPageLoading(true);
    const judges = await getJudges();
    setJudges(judges);
    setIsPageLoading(false);
  };
  const fetchQuizes = async () => {
    setIsPageLoading(true);
    const quizes = await getQuizes();
    setQuizes(quizes);
    setIsPageLoading(false);
  };
  useEffect(() => {
    fetchJudges();
    fetchQuizes();
  }, []);

  return (
    <>
      {pageLoading ? (
        <div className="h-96 w-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <section className="grid grid-cols-2 h-full w-full overflow-hidden">
          <section className="col-span-1 w-full flex-container border-r-2 overflow-y-auto">
            <h2 className="text-4xl font-bold">Aktiva Quiz</h2>
            {quizes === undefined || quizes.length === 0 ? (
              <div role="alert" className="alert alert-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 shrink-0 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>Inga aktiva quiz</span>
              </div>
            ) : (
              <ul className=" list-decimal list-inside flex flex-col gap-2">
                {quizes.map((quiz) => (
                  <div
                    className="card bg-base-100 w-96 shadow-xl border-2"
                    key={quiz.id}
                  >
                    <div className="card-body">
                      <h2 className="card-title">{quiz.name}</h2>
                      <p>
                        <span className="font-bold">Domare: </span>
                        {quiz.judge.name}
                      </p>
                      <p>
                        <span className="font-bold">Antal lag: </span>
                        {quiz.teams.length}
                      </p>
                      <p className="flex gap-2 items-center italic">
                        <span className="font-bold">Kod: </span>
                        {quiz.roomCode}
                        <div className="tooltip" data-tip="Kopiera rumskod">
                          <button
                            onClick={() =>
                              navigator.clipboard.writeText(quiz.roomCode)
                            }
                            className="btn btn-ghost"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 -960 960 960"
                              width="24px"
                              fill="#5f6368"
                            >
                              <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                            </svg>
                          </button>
                        </div>
                      </p>

                      <div className="card-actions justify-end">
                        <Link
                          to={"/quiz/" + quiz.id + "/judgement"}
                          className="btn bg-blue-600 text-white"
                        >
                          Rätta
                        </Link>
                        <button
                          className="btn bg-red-600"
                          onClick={() => handleFinishButton(quiz.id)}
                        >
                          Avsluta
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            )}
          </section>
          <section className="col-span-1 w-full flex-container">
            <h2 className="text-4xl font-bold text-black">
              Skapa ett nytt quiz
            </h2>

            <div className="w-full flex justify-center h-full">
              {updateQuizLoading ? (
                <Loader />
              ) : (
                <form
                  className="flex flex-col gap-8 bg-secondary items-center p-6 rounded-md max-w-xl w-full h-96  border-2 shadow-lg"
                  onSubmit={handleSubmit}
                >
                  <h3 className="text-2xl font-bold">Skapa quiz</h3>
                  <label className="input input-bordered flex items-center gap-2 drop-shadow-lg w-full">
                    <input
                      type="text"
                      className="grow"
                      placeholder="Namn"
                      name="name"
                    />
                  </label>
                  <div className="flex justify-between w-full gap-4">
                    <label className="input input-bordered flex items-center gap-2 drop-shadow-lg w-full">
                      <input
                        type="number"
                        className="grow"
                        placeholder="Antal deltagare"
                        name="numOfTeams"
                        min="0"
                      />
                    </label>
                    <select
                      className="select select-bordered w-full max-w-lg drop-shadow-lg"
                      name="judge"
                    >
                      <option disabled selected>
                        Domare
                      </option>
                      {judges === undefined || judges.length === 0 ? (
                        <option>Loading...</option>
                      ) : (
                        <>
                          {judges.map((judge) => (
                            <option key={judge.id}>{judge.name}</option>
                          ))}
                        </>
                      )}
                    </select>
                  </div>
                  <button className="btn btn-accent border-2 drop-shadow-lg w-full max-w-lg">
                    Skapa nytt quiz
                  </button>
                </form>
              )}
            </div>
          </section>
        </section>
      )}
    </>
  );
}
