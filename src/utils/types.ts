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
  id: number;
  name: string;
  prompt: string;
  score: number;
  color: string;
}

export interface Message {
  id: number;
  message: string;
  sender: string;
  timestamp: string | null | undefined;
}
