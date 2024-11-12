import { Question } from "../../../utils/types";
import { Judge } from "../../../utils/types";

export default function Questions({ questions }: { questions: Question[] }) {

    console.log(questions);
    const handleAddQuestions = () => {
        // open an alert that says "feauture not implemented"
        alert("Feature not implemented");
    };

    const judges: { id: number; name: string }[] = []; // Define the judges array

    return (
        <>
            <div>
                <select
                    className="select select-bordered w-full max-w-lg drop-shadow-lg"
                    name="judge"
                >
                    <option disabled selected>
                        Tema
                    </option>
                    {judges === undefined || judges.length === 0 ? (
                        <option>Loading...</option>
                    ) : (
                        <>
                            {judges.map((judge: { id: number; name: string }) => (
                                <option key={judge.id}>{judge.name}</option>
                            ))}
                        </>
                    )}
                </select>
            </div>
            <section className="flex-container h-full w-full">
                <div className="flex justify-between">
                    <h2 className="text-4xl font-bold">Fråga</h2>
                    <button
                        className="btn btn-primary text-white text-xl"
                        onClick={handleAddQuestions}
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
                        Skapa en ny fråga
                    </button>
                </div>
                <ul className="flex flex-wrap w-full justify-center items-center gap-6">
                    {questions.map((Questionn) => (
                        <li key={Questionn.id}>
                            <div className="card bg-white w-96 shadow-xl">
                                <div className="card-body">
                                    <h2 className="card-title">{Questionn.content}</h2>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">Ändra</button>
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
