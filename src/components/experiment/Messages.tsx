import { useEffect, useRef } from "react";
import { Message } from "../../utils/types";

export function ToMessage({ message }: { message: Message }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);

  return (
    <div ref={ref} className="chat chat-end">
      <div className="chat-header">{message.sender}</div>
      <div className="chat-bubble chat-bubble-primary">{message.message}</div>
    </div>
  );
}

export function FromMessage({ message }: { message: Message }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, []);
  return (
    <div ref={ref} className="chat chat-start">
      <div className="chat-header">{message.sender}</div>
      <div className="chat-bubble chat-bubble-secondary">
        <pre className="break-words w-full whitespace-pre-wrap font-inter">
          {message.message}
        </pre>
      </div>
    </div>
  );
}
