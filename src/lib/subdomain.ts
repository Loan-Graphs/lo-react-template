import { headers } from 'next/headers'

export async function getSlugFromRequest(): Promise<string> {
  const headersList = await headers()
  const host = headersList.get('host') ?? ''

  // e.g. "davidmordue.loangraphs.com"         → "davidmordue"
  // e.g. "davidmordue.lo-react-template.vercel.app" → "davidmordue"
  // e.g. "localhost:3000"                       → use default slug
  const parts = host.split('.')
  if (parts.length >= 3 && !host.includes('localhost')) {
    return parts[0]
  }

  // Fallback: read from NEXT_PUBLIC_LO_SLUG env var or hardcoded default
  return process.env.NEXT_PUBLIC_LO_SLUG ?? 'nathantschappler'
}
