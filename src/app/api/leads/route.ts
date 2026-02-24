/**
 * POST /api/leads
 *
 * Receives a lead from the LeadForm client component, validates it,
 * and forwards it to the LoanGraphs leads API via submitLead().
 *
 * Env vars used (server-side):
 *   LO_ID                     — slug/ID of this LO in LoanGraphs
 *   LOANGRAPHS_LEADS_API_KEY  — API key for the LoanGraphs leads endpoint
 *   NEXT_PUBLIC_LOANGRAPHS_API_URL — base URL for the LoanGraphs API
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { submitLead } from '@/lib/loangraphs-client'

// ---------------------------------------------------------------------------
// Validation schema (mirrors LeadForm client schema)
// ---------------------------------------------------------------------------

const LOAN_TYPES = [
  'Purchase',
  'Refinance',
  'VA Loan',
  'FHA Loan',
  'DSCR / Investment',
  'Jumbo',
  'Pre-Approval',
  'Other',
] as const

const LeadRequestSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(10).max(30),
  loanType: z.enum(LOAN_TYPES),
  message: z.string().max(500).optional(),
  consent: z.literal(true),
})

// ---------------------------------------------------------------------------
// Rate limiting (simple in-memory; replace with Upstash/Redis in production)
// ---------------------------------------------------------------------------

const submissionsPerIP = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5          // max submissions
const RATE_WINDOW_MS = 60_000 // per 60 seconds

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = submissionsPerIP.get(ip)
  if (!entry || now > entry.resetAt) {
    submissionsPerIP.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }
  if (entry.count >= RATE_LIMIT) return true
  entry.count++
  return false
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  // Rate limit by IP
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests. Please wait a moment and try again.' },
      { status: 429 }
    )
  }

  // Parse body
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON body' },
      { status: 400 }
    )
  }

  // Validate
  const result = LeadRequestSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Validation failed',
        details: result.error.flatten().fieldErrors,
      },
      { status: 422 }
    )
  }

  const { name, email, phone, loanType, message, consent } = result.data
  const loId = process.env.LO_ID ?? ''

  // Forward to LoanGraphs
  // NOTE: The /leads endpoint in LoanGraphs may not be live yet.
  // If it returns a non-OK response, we still return 200 to the user
  // (we don't want lead capture to fail just because the upstream is unavailable).
  // Alex will confirm the real endpoint before we change this behavior.
  const { ok, error } = await submitLead({
    loId,
    name,
    email,
    phone,
    loanType,
    message,
    consent,
  })

  if (!ok) {
    // Log but don't expose upstream error details to the client
    console.error('[leads] upstream error:', error)

    // TODO (Phase 3 follow-up): store lead locally / send email notification
    // as a fallback when the LoanGraphs API is unavailable.
  }

  // Always return success to the user — even if upstream is down,
  // the LO will follow up via email notification or manual check.
  return NextResponse.json({ ok: true }, { status: 200 })
}
