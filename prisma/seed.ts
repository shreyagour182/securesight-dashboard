import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

async function main() {
  // Cameras
  const cameras = await prisma.camera.createMany({
    data: [
    { name: 'Camera 1', location: 'Vault' },
    { name: 'Camera 2', location: 'Shop Floor' },
    { name: 'Camera 3', location: 'Entrance' },
          ]
  });

  // 24-hour period reference
  const now = new Date();
  // Helper to offset by minutes/hours
  function addMinutes(date: Date, mins: number) {
    return new Date(date.getTime() + mins * 60000);
  }

  // 12 incidents, 3 types, distributed over 24h, 3+ cameras
  await prisma.incident.createMany({
    data: [
      // Shop Floor A
      {
        cameraId: 1, type: 'Unauthorized Access',
        tsStart: addMinutes(now, -60 * 1),
        tsEnd: addMinutes(now, -60 * 1 + 2),
        thumbnailUrl: '/safe.jpg',
        resolved: false
      },
      {
        cameraId: 1, type: 'Gun Threat',
        tsStart: addMinutes(now, -60 * 2),
        tsEnd: addMinutes(now, -60 * 2 + 1),
        thumbnailUrl: '/next.jpg',
        resolved: false
      },
      {
        cameraId: 1, type: 'Face Recognised',
        tsStart: addMinutes(now, -60 * 3),
        tsEnd: addMinutes(now, -60 * 3 + 1),
        thumbnailUrl: '/face1.jpg',
        resolved: true
      },
      // Vault
      {
        cameraId: 2, type: 'Unauthorized Access',
        tsStart: addMinutes(now, -60 * 4),
        tsEnd: addMinutes(now, -60 * 4 + 2),
        thumbnailUrl: '/vault1.jpg',
        resolved: false
      },
      {
        cameraId: 2, type: 'Gun Threat',
        tsStart: addMinutes(now, -60 * 5),
        tsEnd: addMinutes(now, -60 * 5 + 1),
        thumbnailUrl: '/vault2.jpg',
        resolved: false
      },
      {
        cameraId: 2, type: 'Face Recognised',
        tsStart: addMinutes(now, -60 * 6),
        tsEnd: addMinutes(now, -60 * 6 + 1),
        thumbnailUrl: '/face2.jpg',
        resolved: false
      },
      // Entrance
      {
        cameraId: 3, type: 'Unauthorized Access',
        tsStart: addMinutes(now, -60 * 7),
        tsEnd: addMinutes(now, -60 * 7 + 2),
        thumbnailUrl: '/entrance.jpg',
        resolved: true
      },
      {
        cameraId: 3, type: 'Gun Threat',
        tsStart: addMinutes(now, -60 * 8),
        tsEnd: addMinutes(now, -60 * 8 + 1),
        thumbnailUrl: '/entrance2.jpg',
        resolved: false
      },
      {
        cameraId: 3, type: 'Face Recognised',
        tsStart: addMinutes(now, -60 * 9),
        tsEnd: addMinutes(now, -60 * 9 + 1),
        thumbnailUrl: '/face3.jpg',
        resolved: true
      },
      // Extra (mix cameras)
      {
        cameraId: 1, type: 'Gun Threat',
        tsStart: addMinutes(now, -30),
        tsEnd: addMinutes(now, -28),
        thumbnailUrl: '/gun.jpg',
        resolved: false
      },
      {
        cameraId: 2, type: 'Unauthorized Access',
        tsStart: addMinutes(now, -90),
        tsEnd: addMinutes(now, -88),
        thumbnailUrl: '/unauth.jpg',
        resolved: false
      },
      {
        cameraId: 3, type: 'Face Recognised',
        tsStart: addMinutes(now, -10),
        tsEnd: addMinutes(now, -9),
        thumbnailUrl: '/face4.jpg',
        resolved: true
      }
    ]
  });
}
main().catch(e => { throw e }).finally(async () => { await prisma.$disconnect() });
