type Camera = { name: string; location: string };

type Incident = {
  id: number;
  type: string;
  thumbnailUrl: string;
  tsStart: string | Date;
  tsEnd: string | Date;
  resolved: boolean;
  camera: Camera;
};

interface IncidentListProps {
  incidents: Incident[];
  onResolve: (id: number) => void;
}

const typeIcon = (type: string) => {
  if (type === 'Gun Threat')
    return <span className="bg-red-500 w-3 h-3 rounded-full mr-2 inline-block" />;
  if (type === 'Unauthorized Access')
    return <span className="bg-orange-400 w-3 h-3 rounded-full mr-2 inline-block" />;
  return <span className="bg-blue-500 w-3 h-3 rounded-full mr-2 inline-block" />;
};

function formatTime(ts: string | Date): string {
  const dt = typeof ts === 'string' ? new Date(ts) : ts;
  let hours = dt.getHours();
  const minutes = dt.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
}

export default function IncidentList({
  incidents,
  onResolve,
}: IncidentListProps) {
  return (
    <div className="rounded-lg bg-[#242730] shadow-lg p-4">
      <div className="font-bold text-lg mb-4 text-gray-100">Unresolved Incidents</div>
      {incidents.length === 0 && (
        <div className="text-gray-400 italic">No incidents to show</div>
      )}
      {incidents.map((inc) => (
        <div
          key={inc.id}
          className={`flex items-center p-3 mb-3 rounded border-l-4 ${
            inc.type === 'Gun Threat'
              ? 'border-red-500'
              : inc.type === 'Unauthorized Access'
              ? 'border-orange-400'
              : 'border-blue-500'
          } bg-[#181B1F]`}
        >
          <img
            src={inc.thumbnailUrl || '/fallback.png'}
            alt="Incident thumb"
            className="w-14 h-14 object-cover rounded mr-3 border border-gray-700"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/fallback.png'; }}
          />
          {typeIcon(inc.type)}
          <div className="flex-1">
            <div className="text-sm font-semibold">{inc.type}</div>
            <div className="text-xs text-gray-300">  {inc.camera.name} ·  {inc.camera.location}</div>
            <div className="text-xs text-gray-500">
              {formatTime(inc.tsStart)}–{formatTime(inc.tsEnd)}
            </div>
          </div>
          {!inc.resolved ? (
            <button
              onClick={() => onResolve(inc.id)}
              className="ml-4 bg-green-600 px-3 py-1 rounded text-white hover:bg-green-700 text-xs transition"
            >
              Resolve
            </button>
          ) : (
            <span className="ml-4 text-green-400 font-medium text-xs">Resolved</span>
          )}
        </div>
      ))}
    </div>
  );
}
