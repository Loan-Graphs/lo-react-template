import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'fs/promises'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'customization-requests.json')

interface CustomizationRequest {
  id: string
  timestamp: string
  loSlug: string
  name: string
  email: string
  request: string
  status: 'pending'
}

async function getRequests(): Promise<CustomizationRequest[]> {
  try {
    const raw = await readFile(DATA_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return []
  }
}

async function saveRequests(requests: CustomizationRequest[]) {
  await mkdir(DATA_DIR, { recursive: true })
  await writeFile(DATA_FILE, JSON.stringify(requests, null, 2), 'utf-8')
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, request, loSlug } = body

    if (!name || !email || !request || !loSlug) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const entry: CustomizationRequest = {
      id: `cr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      timestamp: new Date().toISOString(),
      loSlug,
      name,
      email,
      request,
      status: 'pending',
    }

    const requests = await getRequests()
    requests.push(entry)
    await saveRequests(requests)

    return NextResponse.json({ success: true, id: entry.id })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
