import {
  Answer,
  ChatbotMessage,
  EndGameObject,
  Judge,
  Judgement,
  Question,
  QuestionTheme,
  Quiz,
  Team,
} from "../../utils/types";
import { v4 as uuidv4 } from "uuid";
import { getRandomTailWindBgColor, makeRoomCode } from "../../utils/utils";

const test = true;
const baseUrl = test
  ? "http://localhost:7247"
  : "https://hack-genai.azurewebsites.net";

export const getJudges = async () => {
  const res = await fetch(baseUrl + "/api/getJudges", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      return [];
    });
  return res;
};

export const checkRoomPassword = async (password: string) => {
  const res = await fetch(
    baseUrl + "/api/getQuizByPasscode?passcode=" + password,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      throw new Error("Room not found");
    });
  return res;
};

export const getQuizes = async () => {
  const res = await fetch(baseUrl + "/api/getQuizes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      return [];
    });
  return res;
};

export const addQuiz = async ({
  name,
  numOfTeams,
  judge,
  questions,
}: {
  name: string;
  numOfTeams: number;
  judge: Judge;
  questions: Question[];
}) => {
  const newQuiz: Quiz = {
    id: uuidv4(),
    name,
    teams: Array.from({ length: numOfTeams }).map((_, index) => {
      return {
        id: uuidv4(),
        name: `Lag ${index + 1}`,
        prompt: "",
        score: 0,
        color: getRandomTailWindBgColor(),
      };
    }),
    judge,
    questions,
    roomCode: makeRoomCode(6),
    isActive: true,
  };

  const res = await fetch(baseUrl + "/api/addQuiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newQuiz),
  });
  return res;
};

export const chatWithChatbot = async (message: ChatbotMessage) => {
  const res = await fetch(baseUrl + "/api/chatPlayground", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log(error);
      return new Error("Chatbot not available");
    });
  return res;
};

export const removeQuiz = async (quiz: Quiz) => {
  const res = await fetch(baseUrl + "/api/deleteQuiz", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quiz),
  });
  return res;
};

export const getAllQuestions = async () => {
  const res = await fetch(baseUrl + "/api/getQuestions", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      return [];
    });
  return res;
};

export const getQuestionsTeamsAndAnswers = async (
  quiz: Quiz
): Promise<EndGameObject> => {
  const res = await fetch(baseUrl + "/api/getQuestionsTeamsAndAnswers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quiz),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      return [];
    });
  return res;
};

export const updateTeam = async (team: Team) => {
  const res = await fetch(baseUrl + "/api/updateTeam", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(team),
  });
  return res;
};

export const getAnswersForAllTeams = async (quiz: Quiz) => {
  const res = await fetch(baseUrl + "/api/getAnswersForAllTeams", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quiz),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      return [];
    });
  return res;
};

export const addQuestion = async (question: Question) => {
  return fetch(baseUrl + "/api/addQuestion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(question),
  });
};

export const addTheme = async (theme: QuestionTheme) => {
  return fetch(baseUrl + "/api/addTheme", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ theme }),
  });
};

export const getThemes = async () => {
  const res = await fetch(baseUrl + "/api/getThemes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      return [];
    });
  return res;
};

//Den gamla koden

export const askQuestions = async (questions: Question[], team: Team) => {
  // const res = await Promise.all(
  //     teams.map(team => axios.post(baseUrl + "/api/Chat", { questions: questions, team: team }))
  // );

  const res = await fetch(baseUrl + "/api/Chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ questions: questions, team: team }),
  }).then((response) => response.json());

  console.log(res);
};

export const judgeAnswers = async (answers: Answer[]) => {
  //const res = await axios.post("http://localhost:7247/api/judge", answers);
  const res = await axios.post(baseUrl + "/api/judge", answers);

  console.log(res);
};

export const getTeamAnswers = async (question: Question[], teams: Team[]) => {
  const res = await axios.get(baseUrl + "/api/getAnswers", {
    params: { question: question },
  });

  console.log(res);
  let updated = [...teams];
  console.log(updated.length);

  for (let i = 0; i < updated.length; ++i) {
    let answer = res.data.filter((item) => item.team === updated[i].name)[0];
    updated[i].answer = answer.content;
    updated[i].motivation = "";
    console.log(updated[i].answer);
  }

  console.log(updated);
  return updated;
};

export const getAllAnswers = async () => {
  const res = await fetch(baseUrl + "/api/getAnswers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

export const getTeamScores = async (question: Question, teams: Team[]) => {
  //const res = await axios.get("http://localhost:7247/api/getJudgements", {params: {"question": question}});
  const res = await fetch(baseUrl + "/api/getJudgements", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question: question }),
  }).then((response) => response.json());

  console.log(res);
  let updated = [...teams];
  console.log(updated.length);

  for (let i = 0; i < updated.length; ++i) {
    let judgement = res.data.filter(
      (j: Judgement) => j.team === updated[i].name
    )[0];
    let points = parseInt(
      judgement.content.match(/Poäng: \d+/g)[0].match(/\d+/g)[0]
    );
    let prev = 0;
    let length = updated[i].score.length;
    if (length > 0) {
      prev = updated[i].score[length - 1];
    }

    updated[i].score = [...updated[i].score, points + prev];
    updated[i].motivation = judgement.content;
  }

  console.log(updated);
  return updated;
};

export const getQuestions = async () => {
  try {
    const response = await axios.get(baseUrl + "/api/getQuestions");

    return response.data;
  } catch (error) {
    return error;
  }
};

export const addTeam = async (team: Team) => {
  try {
    const response = await axios.post(baseUrl + "/api/addTeam", team);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getTeams = async () => {
  try {
    const response = await axios.get(baseUrl + "/api/getTeams");

    return response.data;
  } catch (error) {
    return error;
  }
};
