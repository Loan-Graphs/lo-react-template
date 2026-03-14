import stockData from '@/data/stock-data.json'
import Link from 'next/link'
import { templates } from '@/templates/registry'
import type { TemplateProps } from '@/templates/types'

interface PageProps {
  params: Promise<{
    'template-name': string
    viewMode: string
  }>
}

export default async function TemplatePreviewPage({ params }: PageProps) {
  const { 'template-name': templateName, viewMode } = await params
  const template = stockData.templates.find(t => t.id === templateName)
  const templateEntry = templates[templateName]
  const isLOView = viewMode === 'loan-officer'

  if (!template || !templateEntry) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Template not found</h1>
        <p className="text-gray-600 mt-2">The template you&apos;re looking for doesn&apos;t exist yet.</p>
        <Link href="/" className="text-primary hover:underline mt-4 inline-block">Back to home</Link>
      </div>
    )
  }

  const props: TemplateProps = {
    loanOfficer: stockData.loanOfficer as TemplateProps['loanOfficer'],
    company: stockData.company as TemplateProps['company'],
    blogPosts: stockData.content.blogPosts as TemplateProps['blogPosts'],
  }

  const View = isLOView ? templateEntry.LOView : templateEntry.CompanyView
  return <View {...props} />
}
