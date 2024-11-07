export default function TeamCard({
  teamId,
  color,
}: {
  teamId: number;
  color: string;
}) {
  return (
    <div className={`card ${color} w-96 shadow-xl`}>
      <div className="card-body">
        <h2 className="card-title">Lag {teamId}</h2>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Gå med!</button>
        </div>
      </div>
    </div>
  );
}
