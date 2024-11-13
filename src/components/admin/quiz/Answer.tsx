import { Answer, Judgement } from "../../../utils/types";

export default function AnswerCard({
  answer,
  judgement,
  teamName,
  showMotivation,
}: {
  answer: Answer;
  judgement: Judgement;
  teamName: string;
  showMotivation: boolean;
}) {
  return (
    <div className="flex-container items-center justify-center">
      <div className="card bg-secondary max-w-3xl max-h-5xl border-4 border-primary shadow-xl overflow-y-auto">
        <div className="card-body">
          <h2 className="card-title">{teamName}</h2>
          <p>{answer.content}</p>
        </div>
      </div>

      {showMotivation && (
        <div className="card bg-primary max-w-3xl border-4 border-secondary aspect-video shadow-xl overflow-y-auto">
          <div className="card-body">
            <div className=" flex items-center gap-4">
              <h2 className="card-title">Judgement</h2>
              <p>
                Score: <span className="font-bold">{judgement.score}</span>
              </p>
            </div>
            <p>{judgement.content}</p>
          </div>
        </div>
      )}
    </div>
  );
}
