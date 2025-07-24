type Incident = {
  id: number;
  type: string;
  tsStart: string | Date;
};

const getHourPercent = (date: Date): number => (date.getHours() * 60 + date.getMinutes()) / (24 * 60);

const markerColor = (type: string) =>
  type === 'Gun Threat'
    ? 'bg-red-500'
    : type === 'Unauthorized Access'
    ? 'bg-orange-400'
    : 'bg-blue-500';

export default function Timeline({ incidents }: { incidents: Incident[] }) {
  return (
    <div className="bg-[#181B1F] p-3 rounded-lg mt-2 border border-gray-800">
      <div className="relative h-7 w-full">
        {/* 24 hour ruler */}
        <div className="absolute top-4 left-0 w-full border-t border-gray-700"></div>
        {[...Array(25)].map((_, h) => (
          <span
            key={h}
            className="absolute text-xs text-gray-400"
            style={{ left: `${(h / 24) * 100}%`, top: 0, transform: 'translateX(-50%)' }}
          >
            {h}:00
          </span>
        ))}
        {/* Incident markers */}
        {incidents.map(inc => {
          const ts = new Date(inc.tsStart);
          const percent = getHourPercent(ts) * 100;
          return (
            <span
              key={inc.id}
              className={`absolute w-3 h-3 ${markerColor(inc.type)} rounded-full border-2 border-gray-900`}
              style={{
                left: `calc(${percent}% - 6px)`,
                top: '18px',
              }}
              title={inc.type}
            />
          );
        })}
      </div>
    </div>
  );
}
