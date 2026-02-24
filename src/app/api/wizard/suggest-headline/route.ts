import { NextResponse } from 'next/server'

const TEMPLATES: Record<string, string[]> = {
  prestige: [
    '{city}\'s Premier Jumbo Mortgage Specialist',
    'Exclusive Financing for Discerning Buyers in {state}',
    'Private Mortgage Counsel · {city} Luxury Market',
  ],
  'local-hero': [
    '{city}\'s Trusted Local Lender Since {year}',
    'Helping {city} Families Find Their Forever Home',
    'Your Neighbor, Your Lender · {city} Purchase Specialist',
  ],
  'modern-edge': [
    'Close Faster. Pay Less. {state}\'s #1 DTC Lender.',
    'Pre-Approved in 24 Hours — {city} Home Loans',
    'Stop Waiting. Start Closing. {state} Mortgage Expert.',
  ],
  'trust-builder': [
    '{name} · Verified {state} Mortgage Professional',
    'Rated 5★ by {city} Families — Your Local Loan Expert',
    'NMLS Licensed · {state} Mortgage Made Simple',
  ],
  'team-page': [
    '{company} · {state}\'s Full-Service Mortgage Team',
    'Your {city} Mortgage Team — Purchase, Refi & More',
    'Licensed Loan Officers Serving {state} & Beyond',
  ],
}

const DEFAULT_TEMPLATES = [
  'Fast Pre-Approvals for {city} Home Buyers',
  'Your {state} Mortgage Expert — {name}',
  'Competitive Rates & Personal Service in {city}',
]

export async function POST(req: Request) {
  const { name, licenseStates, title, templateKey } = await req.json()

  const firstName = (name as string)?.split(' ')[0] || 'I'
  const state1 = licenseStates?.[0] || 'your state'
  const city = 'your area'
  const year = new Date().getFullYear() - 5
  const company = 'LoanGraphs'

  const templates = (TEMPLATES[templateKey] ?? DEFAULT_TEMPLATES).map((t) =>
    t
      .replace('{name}', firstName)
      .replace('{city}', city)
      .replace('{state}', state1)
      .replace('{year}', String(year))
      .replace('{company}', company)
      .replace('{title}', title || 'Mortgage Loan Officer')
  )

  // If Anthropic API key is set, use Claude for better suggestions
  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const { Anthropic } = await import('@anthropic-ai/sdk')
      const client = new Anthropic()
      const msg = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 256,
        messages: [{
          role: 'user',
          content: `Generate 3 compelling homepage headline options for a mortgage loan officer named ${name}, licensed in ${(licenseStates as string[]).join(', ')}, using the "${templateKey}" visual theme (${title}). Each headline should be under 80 chars, specific to their market, and convert well. Return ONLY a JSON array of 3 strings, nothing else.`,
        }],
      })
      const raw = (msg.content[0] as { text: string }).text.trim()
      const aiSuggestions = JSON.parse(raw) as string[]
      if (Array.isArray(aiSuggestions) && aiSuggestions.length === 3) {
        return NextResponse.json({ suggestions: aiSuggestions })
      }
    } catch {
      // Fall through to template-based suggestions
    }
  }

  return NextResponse.json({ suggestions: templates })
}
