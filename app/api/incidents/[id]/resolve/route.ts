import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  const incident = await prisma.incident.update({
    where: { id },
    data: { resolved: true },
  });
  return NextResponse.json(incident);
}
