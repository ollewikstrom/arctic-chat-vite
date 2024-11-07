import { Message } from "../../utils/types";

export function ToMessage({ message }: { message: Message }) {
  return (
    <div className="chat chat-end">
      <div className="chat-header">{message.sender}</div>
      <div className="chat-bubble chat-bubble-primary">{message.message}</div>
    </div>
  );
}

export function FromMessage({ message }: { message: Message }) {
  return (
    <div className="chat chat-start">
      <div className="chat-header">{message.sender}</div>
      <div className="chat-bubble chat-bubble-secondary">{message.message}</div>
    </div>
  );
}
