import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const resolved = searchParams.get('resolved') === 'true';
  const incidents = await prisma.incident.findMany({
    where: { resolved },
    orderBy: { tsStart: 'desc' },
    include: { camera: true },
  });
  return NextResponse.json(incidents);
}
