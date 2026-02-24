import { NextResponse } from 'next/server'
import dns from 'dns/promises'

export async function POST(req: Request) {
  const { domain } = await req.json()
  if (!domain) return NextResponse.json({ verified: false, error: 'No domain provided' })

  try {
    const cleanDomain = (domain as string).replace(/^https?:\/\//, '').replace(/\/$/, '').split('/')[0]

    // Check A record points to Vercel
    const [aRecords] = await Promise.allSettled([dns.resolve4(cleanDomain)])
    const VERCEL_IPS = ['76.76.21.21', '76.76.21.22']

    if (aRecords.status === 'fulfilled') {
      const hasVercelA = aRecords.value.some((ip) => VERCEL_IPS.includes(ip))
      if (hasVercelA) return NextResponse.json({ verified: true })
    }

    // Check CNAME for www
    const [cname] = await Promise.allSettled([dns.resolveCname(`www.${cleanDomain}`)])
    if (cname.status === 'fulfilled' && cname.value.some((c) => c.includes('vercel'))) {
      return NextResponse.json({ verified: true })
    }

    return NextResponse.json({ verified: false, message: 'DNS records not yet propagated.' })
  } catch {
    return NextResponse.json({ verified: false, message: 'Could not resolve domain.' })
  }
}
