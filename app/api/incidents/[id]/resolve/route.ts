import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const incident = await prisma.incident.update({
    where: { id: parseInt(id, 10) },
    data: { resolved: true },
  });
  return NextResponse.json(incident);
}
