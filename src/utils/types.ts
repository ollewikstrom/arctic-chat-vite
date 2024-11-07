export interface Judge {
  id: number;
  name: string;
  demands: string[];
}
export interface Team {
  id: number;
  color: string;
}

export interface Message {
  id: number;
  message: string;
  sender: string;
  timestamp: string | null | undefined;
}
