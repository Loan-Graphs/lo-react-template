import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // TODO: implement approval logic — update article status to 'approved',
  // trigger publish workflow, send confirmation email to LO
  return NextResponse.json({
    success: true,
    message: `Article ${id} approved`,
    status: 'approved',
  })
}
