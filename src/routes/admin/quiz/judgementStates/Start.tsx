export default function StartState({ quizId }: { quizId: string }) {
  return (
    <section className="flex-container items-center justify-center">
      <h1 className="text-4xl font-josefin font-bold">Judgement day is here</h1>
      <img src="/Judge-Dredd.jpg" alt="" className="w-96" />
      <h2>
        Now judging <br />
        Quiz ID: {quizId}
      </h2>
    </section>
  );
}
