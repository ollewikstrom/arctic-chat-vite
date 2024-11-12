export interface Answer {
  id: string;
  teamName: string;
  content: string;
  question: Question;
}
export interface Judge {
  id: number;
  name: string;
  demands: string[];
  prompt: string;
}

export interface Judgement {
  id: string;
  team: string;
  content: string;
  question: string;
  score: number;
}

export interface Question {
  id: string;
  theme: QuestionTheme;
  content: string;
}
export interface Team {
  quizId: string;
  id: string;
  name: string;
  prompt: string;
  score: number;
  color: string;
}
export interface Quiz {
  id: string;
  name: string;
  judge: Judge;
  questions: Question[];
  roomCode: string;
  isActive: boolean;
  numberOfTeams: number;
}

export interface Message {
  id: number;
  message: string;
  sender: string;
}

export interface ChatbotMessage {
  question: string;
  prompt: string;
}

export interface EndGameObject {
  questions: Question[];
  teams: Team[];
  answers: Answer[];
}

export interface QuestionTheme {
  id: string;
  name: string;
}
