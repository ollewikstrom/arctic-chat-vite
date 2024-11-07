import { Answer, Judgement, Question, Team } from "../../utils/types";

const test = true;
const baseUrl = test
  ? "http://localhost:7247"
  : "https://hack-genai.azurewebsites.net";

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
  const res = await axios.get(baseUrl + "/api/getJudgements", {
    params: { question: question },
  });

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

export const addQuestion = async (question: Question) => {
  try {
    const response = await axios.post(baseUrl + "/api/addQuestion", question);

    return response.data;
  } catch (error) {
    return error;
  }
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
