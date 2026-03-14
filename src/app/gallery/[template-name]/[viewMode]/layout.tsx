import { TemplateSwitcher } from '@/components/gallery/TemplateSwitcher'
import { CtaBanner } from '@/components/gallery/CtaBanner'

export default async function TemplateLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ 'template-name': string; viewMode: string }>
}) {
  const { 'template-name': templateName, viewMode } = await params
  return (
    <div className="min-h-screen bg-gray-50">
      <CtaBanner />
      <TemplateSwitcher currentTemplate={templateName} viewMode={viewMode} />
      <div className="bg-white">
        {children}
      </div>
    </div>
  )
}
