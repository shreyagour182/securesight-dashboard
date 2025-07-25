import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const updatedIncident = await prisma.incident.update({
    where: { id: parseInt(id, 10) },
    data: { resolved: true },
  });
  return NextResponse.json(updatedIncident);
}
