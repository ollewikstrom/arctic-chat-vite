import { Answer } from "../../../utils/types";

export default function AnswerCard({
  answer,
  showMotivation,
}: {
  answer: Answer;
  showMotivation: boolean;
}) {
  return (
    <div className="flex-container items-center justify-center">
      <div className="card bg-secondary w-96 border-4 border-primary shadow-xl max-h-96 overflow-y-auto">
        <div className="card-body">
          <h2 className="card-title">{answer.team.name}</h2>
          <p>
            {answer.content} Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Nulla voluptatem corporis autem reprehenderit quas ducimus
            ipsum molestias doloremque, odit, nihil debitis maxime aliquid
            doloribus. Nam! Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Repudiandae omnis praesentium molestiae architecto. Dicta,
            beatae! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Dignissimos, eligendi ullam! Perferendis, officia porro! Ea eum
            labore, nam ullam perspiciatis sunt recusandae doloremque in!
            Inventore.
          </p>
        </div>
      </div>

      {showMotivation && (
        <div className="card bg-primary w-96 border-4 border-secondary shadow-xl max-h-48 overflow-y-auto">
          <div className="card-body">
            <div className=" flex items-center gap-4">
              <h2 className="card-title">Judgement</h2>
              <p>Score 8/10</p>
            </div>
            <p>
              {answer.content} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Nulla voluptatem corporis autem reprehenderit
              quas ducimus ipsum molestias doloremque, odit, nihil debitis
              maxime aliquid doloribus. Nam! Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Repudiandae omnis praesentium
              molestiae architecto. Dicta, beatae! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dignissimos, eligendi ullam!
              Perferendis, officia porro! Ea eum labore, nam ullam perspiciatis
              sunt recusandae doloremque in! Inventore.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
