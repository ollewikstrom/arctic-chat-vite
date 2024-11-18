import { useState, useEffect } from "react";
import { Question } from "../../../utils/types";
import { QuestionTheme } from "../../../utils/types";

import {
    addQuestion,
    addQuiz,
    addTheme,
    getAllQuestions,
    getJudges,
    getQuizes,
    getThemes,
    removeQuiz,
    updateQuestion
} from "../../../services/api/apiService";
import { v4 as uuidv4 } from "uuid";



export default function Questions() {

    // Setup usestate for mapping question theme to visible suestions
    //const [questions, setQuestions] = useState<Question[]>(questionsInput);

    const defaultTheme: QuestionTheme = {
        id: "",
        name: "Välj ett tema",
    };

    const [currentQuestionTheme, setCurrentQuestionTheme] = useState<QuestionTheme>(defaultTheme);
    const [themeIsSet, setThemeIsSet] = useState<boolean>(false);

    //Setting up state for questions
    const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
    const [customQuestion, setCustomQuestion] = useState<string>("");

    // usestate for editing questions
    const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
    const [editingContent, setEditingContent] = useState<string>("");

    const [themes, setThemes] = useState<QuestionTheme[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);


    const fetchThemes = async () => {
        const questionThemes = await getThemes();
        setThemes(questionThemes);
    };

    useEffect(() => {
        fetchThemes();
    }, []);

    const fetchQuestions = async () => {
        const selectedQuestions = await getAllQuestions(currentQuestionTheme);
        setQuestions(selectedQuestions);
    };

    useEffect(() => {
        console.log("Selected theme changed");
        fetchQuestions();
    }, [currentQuestionTheme]);





    const handleAddQuestion = async () => {
        const newQuestion = {
            id: uuidv4(),
            theme: currentQuestionTheme,
            content: customQuestion,
        };

        setCustomQuestion("");
        await addQuestion(newQuestion);
    };

    const handleEditQuestion = (question: Question) => {
        setEditingQuestionId(question.id);
        setEditingContent(question.content);
    };

    const handleSaveEdit = (questionId: string) => {
        setQuestions(questions.map(q => q.id === questionId ? { ...q, content: editingContent } : q));
        setEditingQuestionId(null);
        setEditingContent("");
    };

    return (
        <>

            <div className="flex-container h-full w-full flex justify-center">

                <h2 className="text-4xl font-bold">Välj Tema</h2>

                <div className="flex justify-center">
                    <select
                        className="select select-bordered w-full max-w-lg drop-shadow-lg text-black"
                        name="questiontheme"
                        onChange={(e) => {
                            const selectedQuestionTheme: QuestionTheme = themes.find(
                                (themes) => themes.name === e.target.value
                            );
                            setCurrentQuestionTheme(selectedQuestionTheme);
                            setThemeIsSet(true);
                        }}
                    >
                        <option disabled selected>
                            Tema
                        </option>
                        {themes === undefined || themes.length === 0 ? (
                            <option>Loading...</option>
                        ) : (
                            <>
                                {themes.map((themess: { id: string; name: string }) => (
                                    <option key={themess.id}>{themess.name}</option>
                                ))}
                            </>
                        )}
                    </select>
                </div>
            </div >


            <section className="flex-container h-full w-full">
                <div className="flex justify-between">
                    <h2 className="text-4xl font-bold">Frågor</h2>
                    <label
                        className={
                            "input input-bordered flex items-between gap-2 drop-shadow-lg w-5/12" +
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
                            className="btn btn-primary btn-circle text-white text-xl"
                            onClick={handleAddQuestion}

                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="32px"
                                viewBox="0 -960 960 960"
                                width="32px"
                                fill="#ffffff"
                            >
                                <path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z" />
                            </svg>

                        </button>
                    </label>
                </div>
                <ul className="flex flex-wrap w-full justify-center items-center gap-6">
                    {questions.filter((q: Question) => q.theme === currentQuestionTheme).map((Questionn: Question) => (
                        <li key={Questionn.id}>
                            <div className="card bg-white w-96 shadow-xl">
                                <div className="card-body">
                                    {editingQuestionId === Questionn.id ? (
                                        <input
                                            type="text"
                                            value={editingContent}
                                            onChange={(e) => setEditingContent(e.target.value)}
                                            className="input input-bordered w-full"
                                        />
                                    ) : (
                                        <h2 className="card-title">{Questionn.content}</h2>
                                    )}
                                    <div className="card-actions justify-end">
                                        {editingQuestionId === Questionn.id ? (
                                            <button className="btn btn-primary" onClick={() => handleSaveEdit(Questionn.id)}>Spara</button>
                                        ) : (
                                            <button className="btn btn-primary" onClick={() => handleEditQuestion(Questionn)}>Ändra</button>
                                        )}
                                        <button className="btn btn-secondary">Ta bort</button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </>

    );
}
