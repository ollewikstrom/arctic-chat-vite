export default function TeamCard({ teamId }: { teamId: number }) {
  return (
    <div className={`card bg-secondary w-96 shadow-xl`}>
      <div className="card-body">
        <h2 className="card-title">Lag {teamId}</h2>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Gå med!</button>
        </div>
      </div>
    </div>
  );
}
