export interface Answer {
  id: string;
  team: string;
  content: string;
  question: string;
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
}

export interface Question {
  id: string;
  type: string;
  content: string;
}
export interface Team {
  id: string;
  name: string;
  prompt: string;
  score: number;
  color: string;
}
export interface Quiz {
  id: string;
  name: string;
  teams: Team[];
  judge: Judge;
  questions: Question[];
  roomCode: string;
  isActive: boolean;
}

export interface Message {
  id: number;
  message: string;
  sender: string;
  timestamp: string | null | undefined;
}
