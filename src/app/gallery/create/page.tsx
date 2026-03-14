import { Metadata } from 'next'
import CreateWizard from '@/components/gallery/create/CreateWizard'

export const metadata: Metadata = {
  title: 'Create Your LO Website | LoanGraphs',
  description: 'Create your professional loan officer website in under 60 seconds. Choose a template, add your info, and go live.',
}

export default function CreatePage() {
  return <CreateWizard />
}
