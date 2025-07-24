import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PATCH /api/incidents/[id]/resolve
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const incident = await prisma.incident.update({
    where: { id: parseInt(id, 10) },
    data: { resolved: true },
  });
  return NextResponse.json(incident);
}
