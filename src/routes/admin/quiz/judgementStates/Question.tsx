import { Question } from "../../../../utils/types";

export default function QuestionState({
  question,
  questionIndex,
}: {
  question: Question | null;
  questionIndex: number;
}) {
  return (
    <section className="flex-container items-center justify-center">
      <h1 className="text-4xl font-josefin font-bold">
        Fråga {questionIndex + 1}
      </h1>
      <p>{question?.content}</p>
    </section>
  );
}
