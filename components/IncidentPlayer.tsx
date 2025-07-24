type Incident = {
  id: number;
  thumbnailUrl: string;
  camera: { name: string };
};

interface IncidentPlayerProps {
  selectedIncident: Incident | null;
  otherIncidents: Incident[];
}

export default function IncidentPlayer({ selectedIncident, otherIncidents }: IncidentPlayerProps) {
  return (
    <>
      <div className="flex gap-4">
        <img
          src={selectedIncident?.thumbnailUrl || '/fallback.png'}
          alt="Current incident"
          className="object-cover w-full rounded-lg border border-gray-700 h-72"
        />
        <div className="flex flex-col gap-2">
          {otherIncidents.map(inc => (
            <img
              key={inc.id}
              src={inc.thumbnailUrl}
              alt="Mini"
              className="w-20 h-16 object-cover rounded border border-gray-800"
            />
          ))}
        </div>
      </div>
      <div className="mt-3">
        <div className="text-gray-300 text-sm">{selectedIncident?.camera?.name}</div>
      </div>
    </>
  );
}
