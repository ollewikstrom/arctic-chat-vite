import { useContext, useEffect, useRef, useState } from "react";
import { ChatbotMessage, Message, Team } from "../../utils/types";
import { FromMessage, ToMessage } from "../../components/experiment/Messages";
import { useParams } from "react-router-dom";
import { QuizContext } from "../../App";
import { chatWithChatbot } from "../../services/api/apiService";

export default function Experiment() {
  const quizContext = useContext(QuizContext);
  const { teamId } = useParams();
  const [team, setTeam] = useState<Team>();
  const [teamName, setTeamName] = useState<string>("");

  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [assistentRules, setAssistentRules] = useState<string[]>([]);
  const msgFormElement = useRef<HTMLFormElement>(null);
  const promptFormElement = useRef<HTMLFormElement>(null);

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(e.target.value);
  };

  const handlePromptSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //Ska hela lag-profilen skickas in i updateTeam? Eller det kanske räcker med updaterade fält?
    e.preventDefault();
    setMessages([]);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const prompt = formData.get("prompt") as string;
    setPrompt(prompt);
  };

  const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (prompt === "") {
      alert("Skapa en prompt först");
      form.reset();
      return;
    }

    const formData = new FormData(form);
    const message = formData.get("message") as string;
    // Check the checkboxes
    const msgObj: Message = {
      id: messages.length + 1,
      message,
      sender: "user",
    };
    console.log(msgObj);
    setMessages([...messages, msgObj]);

    const chatBotMsg: ChatbotMessage = {
      question: message,
      prompt,
    };

    const chatResponse = await chatWithChatbot(chatBotMsg);
    //Felhantering TODO

    const responseMsg: Message = {
      id: messages.length + 2,
      message: chatResponse,
      sender: "bot",
    };

    setMessages([...messages, msgObj, responseMsg]);

    // Clear the textarea
    form.reset();
  };

  const handleEnterKey = (e: any) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      return true;
    }
    return false;
  };

  useEffect(() => {
    const currentTeam = quizContext?.quiz?.teams.find(
      (team) => team.id === teamId
    );
    setTeam(currentTeam);
    setTeamName(currentTeam?.name || "");
    console.log(currentTeam);
    setAssistentRules([
      "Assistenten ska kunna svara på frågor",
      "Assistenten ska kunna ge förslag på aktiviteter",
      "Assistenten ska kunna ge förslag på maträtter",
    ]);
  }, []);

  return (
    <section className="grid grid-cols-2 h-container">
      <section className="flex-container col-span-1 border-r-4">
        <h2 className="text-2xl font-bold">Skapa din assistent här</h2>
        <form
          className="flex flex-col gap-4"
          ref={promptFormElement}
          onSubmit={handlePromptSubmit}
        >
          <label htmlFor="teamName" className="form-control text-xl font-bold">
            Lagnamn
            <input
              type="text"
              id="teamName"
              placeholder="Lagnamn"
              value={teamName}
              className="input input-bordered w-full max-w-xs bg-white font-normal"
              onChange={handleTeamNameChange}
            />
          </label>
          <label htmlFor="prompt" className="form-control font-bold">
            Prompt
            <textarea
              id="prompt"
              name="prompt"
              className="textarea textarea-bordered bg-white w-7/12 h-32 font-normal"
              placeholder="Skriv in en prompt..."
              onKeyDown={(e) =>
                handleEnterKey(e)
                  ? promptFormElement.current?.requestSubmit()
                  : null
              }
            ></textarea>
          </label>
          <button className="btn btn-secondary max-w-sm">Spara prompt</button>
        </form>
        <div className="divider divider-neutral"></div>
        <h3>Krav på assistenten</h3>
        <ul className=" list-decimal list-inside">
          {assistentRules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>
      <section className="col-span-1 flex-container overflow-hidden">
        <h2 className="text-2xl font-bold">Testa din assistent här</h2>
        <div className="w-full h-full flex flex-col bg-white relative rounded-md p-4 overflow-hidden">
          <div className="flex-border-2 flex-grow border-red-400 p-4 overflow-y-auto relative">
            {prompt !== "" ? (
              <>
                <div role="alert" className="alert sticky">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-info h-6 w-6 shrink-0"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>
                    Din prompt är: <br />
                    <span className="italic">"{prompt}"</span> <br />{" "}
                    {messages.length <= 0
                      ? " Skriv ett meddelande för att börja chatta! "
                      : ""}
                  </span>
                </div>
                {messages.map((message) =>
                  message.sender === "user" ? (
                    <ToMessage key={message.id} message={message} />
                  ) : (
                    <FromMessage key={message.id} message={message} />
                  )
                )}
              </>
            ) : (
              <div role="alert" className="alert">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-info h-6 w-6 shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>
                  Skapa en{" "}
                  <label htmlFor="prompt" className="underline font-bold">
                    prompt
                  </label>{" "}
                  för att chatta med din bot
                </span>
              </div>
            )}
          </div>
          <div className="divider divider-neutral"></div>
          <form
            className="w-full p-4 flex gap-4 justify-between items-center h-3/12"
            onSubmit={handleMessageSubmit}
            ref={msgFormElement}
          >
            <div className="flex flex-col gap-2 w-full h-full">
              <textarea
                name="message"
                placeholder="Skriv ett meddelande..."
                className="textarea textarea-bordered flex-1"
                onKeyDown={(e) =>
                  handleEnterKey(e)
                    ? msgFormElement.current?.requestSubmit()
                    : null
                }
              />
            </div>
            <button className="btn btn-primary text-white min-w-lg w-32">
              Skicka
            </button>
          </form>
        </div>
      </section>
    </section>
  );
}
