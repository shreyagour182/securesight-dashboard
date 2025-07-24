'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import IncidentPlayer from '../components/IncidentPlayer';
import IncidentList from '../components/IncidentList';
import Timeline from '../components/Timeline';

// Camera definitions
const cameras = [
  { id: 1, name: 'Camera - 01', location: 'Vault' },
  { id: 2, name: 'Camera - 02', location: 'Shop Floor' },
  { id: 3, name: 'Camera - 03', location: 'Entrance' },
];

// Incidents with three cameras
const sampleIncidents = [
  {
    id: 1,
    type: 'Unauthorized Access',
    thumbnailUrl: 'https://media.gettyimages.com/id/103245781/photo/chinese-workers-wait-for-customers-at-a-gold-shop-in-beijing-on-august-4-2010-china-has-moved.jpg?s=612x612&w=0&k=20&c=KiOV3Gwd6JDnq7-dDgQFcaw45T7QvSkeGyngSJ1S5bs=',
    tsStart: '2025-06-15T03:12:37',
    tsEnd: '2025-06-15T03:15:37',
    resolved: false,
    camera: cameras[0], // Camera 1
  },
  {
    id: 2,
    type: 'Gun Threat',
    thumbnailUrl: 'https://media.istockphoto.com/id/664237866/photo/gold-shop.jpg?s=612x612&w=0&k=20&c=e9MZ5q8XsbEQn8ZNo_05IIXR8dTRaVC1KaN0FDjHnyg=',
    tsStart: '2025-07-07T14:36:00',
    tsEnd: '2025-07-07T14:37:00',
    resolved: false,
    camera: cameras[1], // Camera 2
  },
  {
    id: 3,
    type: 'Face Recognised',
    thumbnailUrl: 'https://media.istockphoto.com/id/1406447764/photo/jewellery.jpg?s=612x612&w=0&k=20&c=39-AmuE-fhcXY0cFz71kRdYAqSC2JnI9S5jJgXLgsh8=',
    tsStart: '2025-07-07T15:10:00',
    tsEnd: '2025-07-07T15:11:00',
    resolved: false,
    camera: cameras[2], // Camera 3
  },
  {
    id: 4,
    type: 'Unauthorized Access',
    thumbnailUrl:'https://d1muy2ct2wkbaz.cloudfront.net/video/688000/687720/270x150/0.jpg',
    tsStart: '2025-07-07T16:00:00',
    tsEnd: '2025-07-07T16:03:00',
    resolved: false,
    camera: cameras[1], // Camera 2
  },
  // Add more incidents as needed ...
];

export default function Page() {
  const [incidents, setIncidents] = useState(sampleIncidents);
  const selectedIncident = incidents[0];
  const otherIncidents = incidents.slice(1, 3);

  const handleResolve = (id: number) => {
    setIncidents(current =>
      current.map(inc =>
        inc.id === id ? { ...inc, resolved: true } : inc
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#181B1F] text-white">
      <Navbar />
      <div className="flex px-6 pb-6 gap-6 mt-6">
        <div className="w-7/12">
          <div className="rounded-lg bg-[#242730] p-5 shadow-lg flex flex-col">
            <IncidentPlayer selectedIncident={selectedIncident} otherIncidents={otherIncidents} />
            <div className="mt-4">
              <Timeline incidents={incidents} />
            </div>
          </div>
        </div>
        <div className="w-5/12">
          <IncidentList incidents={incidents} onResolve={handleResolve} />
        </div>
      </div>
    </div>
  );
}
