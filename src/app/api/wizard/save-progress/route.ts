import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, state, step } = await req.json()
  if (!email) return NextResponse.json({ ok: false, error: 'No email' }, { status: 400 })

  // In production: generate a signed token, store {token → {state, step}} in DB/KV,
  // and send email with resume link: /onboarding?resume={token}
  // For now: log and return ok so the client can show the "check your inbox" message.
  console.log(`[wizard/save-progress] ${email} at step ${step} — state keys: ${Object.keys(state).join(', ')}`)

  return NextResponse.json({ ok: true })
}
