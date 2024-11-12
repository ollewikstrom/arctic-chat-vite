import { useContext, useEffect, useRef, useState } from "react";
import { Judge, Question, QuestionTheme, Quiz } from "../../../utils/types";
import {
  addQuestion,
  addQuiz,
  addTheme,
  getAllQuestions,
  getJudges,
  getQuizes,
  getThemes,
  removeQuiz,
} from "../../../services/api/apiService";
import Loader from "../../../components/Loader";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../../../App";

export default function CreateQuiz() {
  //Quiz context contains "quiz" state and "setQuiz" function
  const quizContext = useContext(QuizContext);
  if (!quizContext) {
    throw new Error("Quiz context is not defined");
  }

  const navigate = useNavigate();

  //Loading states
  const [pageLoading, setIsPageLoading] = useState(false);
  const [updateQuizLoading, setUpdateQuizLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //State for fetched data
  const [judges, setJudges] = useState<Judge[]>();
  const [quizes, setQuizes] = useState<Quiz[]>();
  const [questions, setQuestions] = useState<Question[]>();

  //Setting up state for questions
  const [numOfQuestions, setNumOfQuestions] = useState<number>(0);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [customQuestion, setCustomQuestion] = useState<string>("");
  const [themeIsSet, setThemeIsSet] = useState<boolean>(false);

  //Setting up state for question themes
  const defaultTheme: QuestionTheme = {
    id: "",
    name: "Välj ett tema",
  };
  const [selectedTheme, setSelectedTheme] =
    useState<QuestionTheme>(defaultTheme);
  const [newThemeName, setNewThemeName] = useState<string>("");
  const [questionThemes, setQuestionThemes] = useState<QuestionTheme[]>([]);

  //Refs for modals
  const modalRefs = useRef<Map<string, HTMLDialogElement>>(new Map());
  const gradingModalRef = useRef<HTMLDialogElement>(null);
  const questionThemesRef = useRef<HTMLDialogElement>(null);

  const [currGradingquiz, setCurrGradingQuiz] = useState<Quiz>();

  const handleQuizFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      questions: selectedQuestions,
    });

    if (res.status === 200) {
      const quiz = await res.json();

      //Clean up
      setNumOfQuestions(0);
      setSelectedQuestions([]);

      setQuizes([quiz, ...(quizes || [])]);
      setUpdateQuizLoading(false);
      form.reset();
    } else {
      setUpdateQuizLoading(false);
      alert("Något gick fel: " + res.status + " " + res.statusText);
      throw new Error("Något gick fel: " + res.status + " " + res.statusText);
    }
  };

  const handleModalOpen = (quizId: string) => {
    const modal = modalRefs.current.get(quizId);
    if (modal) {
      modal.showModal();
    }
  };

  const handleCreateTheme = async () => {
    if (newThemeName === "") {
      return;
    }
    const newTheme: QuestionTheme = {
      id: uuidv4(),
      name: newThemeName,
    };
    setQuestionThemes([...questionThemes, newTheme]);
    questionThemesRef.current?.close();
    await addTheme(newTheme);
  };

  const handleAddQuestion = async () => {
    const newQuestion = {
      id: uuidv4(),
      content: customQuestion,
      theme: selectedTheme,
    };

    setSelectedQuestions([...selectedQuestions, newQuestion]);
    setNumOfQuestions(selectedQuestions.length + 1);
    setCustomQuestion("");
    await addQuestion(newQuestion);
  };

  const handleFinishButton = (quiz: string) => {
    alert("Avslutar quiz " + quiz);
  };

  const handleGradingQuiz = async (quiz: Quiz) => {
    // const result = confirm("Vill du rätta quiz " + quiz.name + "?");
    // if (!result) {
    //   return;
    // }
    gradingModalRef.current?.showModal();
    setCurrGradingQuiz(quiz);

    //Set the global quiz state
    quizContext.setQuiz(quiz);
    //Navigate to the grading page
    // navigate("/quiz/" + quiz.id + "/judgement");
  };

  const handleRemoveQuiz = async (quiz: Quiz) => {
    const result = confirm("Vill du verkligen ta bort quiz " + quiz.name + "?");
    const name = quiz.name;
    if (!result) {
      return;
    }
    // Remove quiz from list
    const newQuizes = quizes?.filter((q) => q.id !== quiz.id);
    setQuizes(newQuizes);

    const res = await removeQuiz(quiz);

    if (res.status === 200) {
      alert("Quiz " + name + " borttaget");
    } else {
      alert("Något gick fel: " + res.status + " " + res.statusText);
    }
  };

  //Fetching data from the API

  const fetchJudges = async () => {
    setIsPageLoading(true);
    const judges = await getJudges();
    setJudges(judges);
    setIsPageLoading(false);
  };
  const fetchQuizes = async () => {
    setIsPageLoading(true);
    const quizes = await getQuizes();
    //Reverse the order of the quizes
    quizes.reverse();
    setQuizes(quizes);
    setIsPageLoading(false);
  };
  const fetchQuestions = async () => {
    setIsPageLoading(false);
    const questions = await getAllQuestions(selectedTheme);
    setQuestions(questions);
  };

  const fetchThemes = async () => {
    const themes = await getThemes();
    setQuestionThemes(themes);
  };
  useEffect(() => {
    fetchJudges();
    fetchQuizes();
    fetchThemes();
  }, []);

  useEffect(() => {
    console.log("Selected theme changed");
    fetchQuestions();
  }, [selectedTheme]);

  return (
    <>
      {pageLoading ? (
        <div className="h-96 w-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <section className="grid grid-cols-2 h-full w-full">
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
                    className="card bg-base-100 w-96 shadow-xl border-2 relative"
                    key={quiz.id}
                  >
                    <div className="card-body">
                      <h2 className="card-title">{quiz.name}</h2>
                      <p>
                        <span className="font-bold">Domare: </span>
                        {quiz.judge.name}
                      </p>
                      <button
                        className="btn btn-warning absolute right-5 top-5"
                        onClick={() => handleRemoveQuiz(quiz)}
                      >
                        Ta bort
                      </button>
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

                      <button
                        className="btn"
                        onClick={() => handleModalOpen(quiz.id)}
                      >
                        Visa frågor
                      </button>
                      <dialog
                        id="my_modal_1"
                        className="modal"
                        ref={(el) => {
                          if (el) {
                            modalRefs.current.set(quiz.id, el);
                          }
                        }}
                      >
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Frågor</h3>
                          <ul>
                            {quiz.questions.length === 0 && (
                              <li>{quiz.name} har inga frågor</li>
                            )}
                            {quiz.questions.map((question) => (
                              <li key={question.id} className=" list-disc">
                                {question.content}
                              </li>
                            ))}
                          </ul>
                          <div className="modal-action">
                            <form method="dialog">
                              <button className="btn">Close</button>
                            </form>
                          </div>
                        </div>
                      </dialog>

                      <div className="card-actions justify-end">
                        <button
                          className="btn bg-blue-600 text-white"
                          onClick={() => handleGradingQuiz(quiz)}
                        >
                          Rätta
                        </button>
                        <div
                          className="tooltip"
                          data-tip="Du måste rätta quizet innan du kan visa resultat"
                        >
                          <button
                            className="btn bg-red-600"
                            disabled={quiz.isActive}
                            onClick={() => handleFinishButton(quiz.id)}
                          >
                            Visa Resultat
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            )}
            <dialog className="modal" ref={gradingModalRef}>
              <div className="modal-box w-11/12 max-w-5xl">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg">Rättning av quiz</h3>
                <p className="py-4">Click the button below to close</p>
                <div className="modal-action"></div>
              </div>
            </dialog>
          </section>
          <section className="col-span-1 w-full flex-container">
            <h2 className="text-4xl font-bold text-black">
              Skapa ett nytt quiz
            </h2>

            <div className="w-full flex justify-center h-full max-h-fit">
              {updateQuizLoading ? (
                <Loader />
              ) : (
                <form
                  className="flex flex-col gap-8 bg-secondary items-center p-6 rounded-md max-w-xl w-full border-2 shadow-lg"
                  onSubmit={handleQuizFormSubmit}
                >
                  <h3 className="text-2xl font-bold">Skapa quiz</h3>
                  <div className="flex justify-between w-full gap-4">
                    <label className="input input-bordered flex items-center gap-2 drop-shadow-lg w-full">
                      <input
                        type="text"
                        className="grow"
                        placeholder="Namn"
                        name="name"
                      />
                    </label>
                  </div>
                  <div className="flex justify-between w-full gap-4">
                    <label className="input input-bordered flex items-center gap-2 drop-shadow-lg w-full">
                      <input
                        type="number"
                        className=""
                        placeholder="Antal deltagare"
                        name="numOfTeams"
                        min="0"
                      />
                    </label>
                    <details
                      className="dropdown w-full"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      open={isDropdownOpen}
                    >
                      <summary className="btn m-1 w-full">
                        {selectedTheme.name}
                      </summary>
                      <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-full p-2 shadow">
                        {questionThemes.map((theme) => (
                          <li key={theme.id}>
                            <a
                              onClick={() => {
                                setSelectedTheme(() => theme);
                                setThemeIsSet(true);
                                setIsDropdownOpen(() => false);
                              }}
                            >
                              {theme.name}
                            </a>
                          </li>
                        ))}

                        <div className="divider"></div>
                        <li>
                          <button
                            type="button"
                            onClick={() =>
                              questionThemesRef.current?.showModal()
                            }
                          >
                            +Skapa ett nytt tema
                          </button>
                        </li>
                      </ul>
                    </details>
                    <dialog className="modal" ref={questionThemesRef}>
                      <div className="modal-box gap-6">
                        <h3 className="font-bold text-lg mb-4">
                          Skapa ett nytt tema
                        </h3>
                        <label className="input input-bordered flex items-center gap-4 drop-shadow-lg w-full">
                          <input
                            type="text"
                            className=""
                            placeholder="Namn på temat"
                            value={newThemeName}
                            onChange={(e) => setNewThemeName(e.target.value)}
                            name="themeName"
                          />
                        </label>
                        <div className="modal-action">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleCreateTheme}
                          >
                            Skapa
                          </button>

                          <form method="dialog" className="flex gap-4">
                            <button className="btn">Avbryt</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </div>
                  <select
                    className="select select-bordered w-full max-w-lg drop-shadow-lg"
                    name="judge"
                    disabled={!themeIsSet}
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

                  <div className="flex flex-col gap-2 w-full">
                    <h3 className="w-full font-bold">
                      Valda frågor: {numOfQuestions}
                    </h3>
                    <ul className="flex flex-wrap gap-2 justify-center">
                      {selectedQuestions.length === 0 && (
                        <li className="p-4 h-fit">Inga frågor valda</li>
                      )}
                      {selectedQuestions.map((question) => (
                        <li key={question.id}>
                          <div
                            className="badge badge-neutral p-4 h-fit"
                            onClick={() => {
                              setSelectedQuestions(
                                selectedQuestions.filter(
                                  (q) => q.id !== question.id
                                )
                              );
                              setQuestions([...(questions || []), question]);
                              setNumOfQuestions(selectedQuestions.length - 1);
                            }}
                          >
                            {question.content}
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="divider w-full"></div>
                    <details
                      className={
                        "dropdown w-full" +
                        (themeIsSet === false
                          ? " btn-disabled opacity-50"
                          : " ")
                      }
                      aria-disabled={!themeIsSet}
                    >
                      <summary className="btn m-1 w-full">Välj frågor!</summary>
                      <ul className="menu dropdown-content bg-base-100 rounded-box gap-2 z-[1] p-2 shadow w-full">
                        {questions === undefined &&
                        selectedQuestions.length === 0 ? (
                          <li>Loading...</li>
                        ) : (questions ?? []).length === 0 &&
                          selectedQuestions.length !== 0 ? (
                          <li>Inga fler frågor</li>
                        ) : (
                          <>
                            {(questions ?? []).map((question, i) => (
                              <li
                                key={i}
                                onClick={() => {
                                  setSelectedQuestions([
                                    ...selectedQuestions,
                                    question,
                                  ]);
                                  setQuestions(
                                    (questions ?? []).filter(
                                      (q) => q.id !== question.id
                                    )
                                  );
                                  setNumOfQuestions(
                                    selectedQuestions.length + 1
                                  );
                                }}
                              >
                                <a>{question.content}</a>
                              </li>
                            ))}
                          </>
                        )}
                      </ul>
                    </details>
                    <label
                      className={
                        "input input-bordered flex items-center gap-2 drop-shadow-lg w-full" +
                        (!themeIsSet ? " opacity-50" : "")
                      }
                    >
                      <input
                        type="text"
                        className={"grow"}
                        placeholder="Lägg till en ny fråga"
                        name="name"
                        autoComplete="off"
                        onChange={(e) => setCustomQuestion(e.target.value)}
                        value={customQuestion}
                        disabled={!themeIsSet}
                      />
                      <button
                        type="button"
                        onClick={handleAddQuestion}
                        className="btn btn-primary btn-circle min-h-10 h-10 w-10 text-3xl justify-center items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#5f6368"
                        >
                          <path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z" />
                        </svg>
                      </button>
                    </label>
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
