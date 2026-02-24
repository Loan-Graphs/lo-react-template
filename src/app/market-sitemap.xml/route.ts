import { NextResponse } from 'next/server'

const TOPICS = [
  'mortgage-rates-today',
  'fha-loan-limits',
  'va-loan-requirements',
  'how-much-can-i-afford',
  'home-price-trends',
]

const SAMPLE_DATA: { state: string; county: string; cities: string[] }[] = [
  { state: 'arizona', county: 'maricopa', cities: ['phoenix', 'scottsdale'] },
  { state: 'arizona', county: 'pima', cities: ['tucson', 'oro-valley'] },
  { state: 'california', county: 'los-angeles', cities: ['los-angeles', 'pasadena'] },
  { state: 'california', county: 'san-diego', cities: ['san-diego', 'carlsbad'] },
  { state: 'texas', county: 'harris', cities: ['houston', 'katy'] },
  { state: 'texas', county: 'travis', cities: ['austin', 'round-rock'] },
]

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.loangraphs.com'

  const urls: string[] = []
  for (const { state, county, cities } of SAMPLE_DATA) {
    for (const city of cities) {
      for (const topic of TOPICS) {
        urls.push(`${baseUrl}/market/${state}/${county}/${city}/${topic}`)
      }
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
