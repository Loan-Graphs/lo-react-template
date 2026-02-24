import { readFile, writeFile, mkdir } from 'fs/promises'
import path from 'path'

export interface TargetingConfig {
  primaryCity: string
  primaryState: string
  secondaryCities: string[]
  topics: string[]
  articleLength: 'standard' | 'long-form'
  brandVoice: 'professional' | 'friendly' | 'educational'
}

export interface ResearchBrief {
  geos: string[]
  topics: string[]
  marketContext: string
}

export interface ArticleDraft {
  id: string
  loSlug: string
  title: string
  slug: string
  content: string
  metaDescription: string
  wordCount: number
  topic: string
  date: string
  author: string
  image: string
  imagePrompt: string
  tags: string[]
  internalLinks: string[]
  status: 'draft' | 'approved' | 'published'
  scheduledPublish: string
  createdAt: string
}

export type ArticleResult = ArticleDraft

export async function runArticlePipeline(loSlug: string): Promise<ArticleResult> {
  // Step A — RESEARCH: load targeting config, build research brief
  const targeting = await loadTargetingConfig(loSlug)
  const geos = [
    `${targeting.primaryCity}, ${targeting.primaryState}`,
    ...targeting.secondaryCities.map((c) => c.trim()).filter(Boolean),
  ]
  const researchBrief: ResearchBrief = {
    geos,
    topics: targeting.topics,
    marketContext: 'placeholder', // TODO: integrate Gemini Deep Research
  }

  // Step B — WRITING: generate article scaffold
  const topic = researchBrief.topics[0] || 'local-market-updates'
  const city = targeting.primaryCity
  const state = targeting.primaryState
  const title = `${formatTopic(topic)} in ${city}, ${state} (${new Date().getFullYear()})`
  const slug = slugify(title)
  const wordCount = targeting.articleLength === 'long-form' ? 2200 : 1500
  const content = 'placeholder content' // TODO: integrate AI writing agent

  // Step C — HERO IMAGE: placeholder
  const image = '/placeholder-hero.jpg'
  const imagePrompt = `generated from title: ${title}` // TODO: integrate Nano Banana Pro

  // Step D — FORMAT SWEEP: convert to MDX frontmatter format
  const metaDescription = `Learn about ${formatTopic(topic).toLowerCase()} in ${city}, ${state}. Expert insights from your local loan officer.`
  const date = new Date().toISOString().split('T')[0]
  const tags = [topic, city.toLowerCase(), state.toLowerCase()]

  // Step E — LINK SWEEP: placeholder internal links
  const internalLinks: string[] = [] // TODO: integrate internal link agent

  // Step F — SAVE AS DRAFT
  const scheduledPublish = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
  const id = `art_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

  const draft: ArticleDraft = {
    id,
    loSlug,
    title,
    slug,
    content,
    metaDescription,
    wordCount,
    topic,
    date,
    author: loSlug,
    image,
    imagePrompt,
    tags,
    internalLinks,
    status: 'draft',
    scheduledPublish,
    createdAt: new Date().toISOString(),
  }

  const draftDir = path.join(process.cwd(), 'data', 'articles', 'drafts', loSlug)
  await mkdir(draftDir, { recursive: true })
  await writeFile(path.join(draftDir, `${slug}.json`), JSON.stringify(draft, null, 2), 'utf-8')

  return draft
}

async function loadTargetingConfig(loSlug: string): Promise<TargetingConfig> {
  const filePath = path.join(process.cwd(), 'data', 'seo-targeting', `${loSlug}.json`)
  const raw = await readFile(filePath, 'utf-8')
  return JSON.parse(raw)
}

function formatTopic(topic: string): string {
  const map: Record<string, string> = {
    'first-time-homebuyer': 'First-Time Homebuyer Guide',
    'va-loans': 'VA Loan Guide',
    'fha-loans': 'FHA Loan Guide',
    'jumbo-loans': 'Jumbo Loan Guide',
    'investment-property': 'Investment Property Guide',
    refinance: 'Refinance Strategies',
    'local-market-updates': 'Local Market Update',
    'down-payment-assistance': 'Down Payment Assistance Programs',
    'credit-repair': 'Credit Repair & Mortgage Readiness',
    'self-employed': 'Self-Employed Mortgage Guide',
  }
  return map[topic] || topic.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
