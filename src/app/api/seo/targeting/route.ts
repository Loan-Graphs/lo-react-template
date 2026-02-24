import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'fs/promises'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data', 'seo-targeting')

interface TargetingConfig {
  loSlug: string
  primaryCity: string
  primaryState: string
  secondaryCities: string[]
  topics: string[]
  articleLength: 'standard' | 'long-form'
  brandVoice: 'professional' | 'friendly' | 'educational'
  updatedAt: string
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { loSlug, primaryCity, primaryState, secondaryCities, topics, articleLength, brandVoice } = body

    if (!loSlug || !primaryCity || !primaryState) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const config: TargetingConfig = {
      loSlug,
      primaryCity,
      primaryState,
      secondaryCities: (secondaryCities || []).slice(0, 5),
      topics: topics || [],
      articleLength: articleLength || 'standard',
      brandVoice: brandVoice || 'professional',
      updatedAt: new Date().toISOString(),
    }

    await mkdir(DATA_DIR, { recursive: true })
    await writeFile(path.join(DATA_DIR, `${loSlug}.json`), JSON.stringify(config, null, 2), 'utf-8')

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get('slug')
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 })
    }

    const filePath = path.join(DATA_DIR, `${slug}.json`)
    const raw = await readFile(filePath, 'utf-8')
    return NextResponse.json(JSON.parse(raw))
  } catch {
    return NextResponse.json({ error: 'Targeting config not found' }, { status: 404 })
  }
}
