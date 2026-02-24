import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // TODO: implement edit request logic — update article status,
  // queue for re-processing, notify content team
  const body = await req.json().catch(() => ({}))

  return NextResponse.json({
    success: true,
    message: `Edit request submitted for article ${id}`,
    feedback: body.feedback || '',
    status: 'pending',
  })
}
