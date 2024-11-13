import {
  Answer,
  ChatbotMessage,
  Judge,
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

const addNewTeam = async (team: Team) => {
  const res = await fetch(baseUrl + "/api/addTeam", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(team),
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
  const quizId = uuidv4();

  const teams: Team[] = Array.from({ length: numOfTeams }).map((_, index) => {
    return {
      id: uuidv4(),
      name: `Lag ${index + 1}`,
      prompt: "",
      score: 0,
      color: getRandomTailWindBgColor(),
      quizId,
    };
  });

  await Promise.all(teams.map((team) => addNewTeam(team)));

  const newQuiz: Quiz = {
    id: quizId,
    name,
    judge,
    questions,
    roomCode: makeRoomCode(6),
    isActive: true,
    numberOfTeams: teams.length,
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

export const getTeamById = async (teamId: string) => {
  const res = await fetch(baseUrl + "/api/getTeamById/?teamId=" + teamId, {
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

export const getAllQuestions = async (theme: QuestionTheme) => {
  const res = await fetch(baseUrl + "/api/getQuestions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(theme),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      return [];
    });
  return res;
};

export const getTeamsForQuiz = async (quizId: string) => {
  const res = await fetch(baseUrl + "/api/getTeamsForQuiz/?quizId=" + quizId, {
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

export const updateTeam = async (
  team: Team,
  prompt: string,
  newName: string
) => {
  const res = await fetch(baseUrl + "/api/updateTeam", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ team, prompt, newName }),
  });
  return res;
};

export const getAnswersForAllTeams = async (
  questions: Question[],
  teams: Team[]
) => {
  const res = await fetch(baseUrl + "/api/getAnswersForAllTeams", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ questions, teams }),
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
    body: JSON.stringify({ id: theme.id, name: theme.name }),
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

export const getGeneratedAnswers = async (
  questions: Question[],
  teams: Team[]
) => {
  const res = await fetch(baseUrl + "/api/getGeneratedAnswers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ questions, teams }),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      return [];
    });
  return res;
};

export const getJudgements = async (teams: Team[]) => {
  const res = await fetch(baseUrl + "/api/getJudgements", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ teams }),
  })
    .then((res) => res.json())
    .catch((error) => {
      console.log(error);
      return [];
    });
  return res;
};

//Den gamla koden

export const judgeAnswers = async (answers: Answer[], judge: Judge) => {
  const res = await fetch(baseUrl + "/api/judgeAnswers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answers, judge }),
  }).then((response) => response.json());

  console.log(res);
  return res;
};
