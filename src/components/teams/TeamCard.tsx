export default function TeamCard({
  teamId,
  color,
  selected,
  onClick,
}: {
  teamId: number;
  color: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`card ${color} w-96 shadow-xl relative ${
        selected ? " border-2 border-slate-400" : " "
      }`}
    >
      <div className="card-body">
        <h2 className="card-title">Lag {teamId}</h2>
        <div className="card-actions justify-end">
          {selected ? (
            <button className="btn btn-primary" disabled={true}>
              Du är med!
              <span className="rounded-full aspect-square bg-white border-2 border-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#5f6368"
                >
                  <path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" />
                </svg>
              </span>
            </button>
          ) : (
            <button className="btn btn-primary" onClick={onClick}>
              Gå med!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
