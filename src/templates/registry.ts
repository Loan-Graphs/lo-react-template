import * as template1 from './template-1'
import * as template2 from './template-2'
import * as template3 from './template-3'
import * as template4 from './template-4'
import * as template5 from './template-5'
import * as template6 from './template-6'
import * as template7 from './template-7'
import * as template8 from './template-8'
import * as template9 from './template-9'
import * as template10 from './template-10'
import * as template11 from './template-11'
import * as templateClassic from './template-classic'
import * as templateModern from './template-modern'
import * as templateBold from './template-bold'
import * as templateMinimal from './template-minimal'
import * as templateProfessional from './template-professional'
import * as templateWarm from './template-warm'
import type { TemplateProps } from './types'

export interface TemplateEntry {
  LOView: React.ComponentType<TemplateProps>
  CompanyView: React.ComponentType<TemplateProps>
  templateMeta: { id: string; name: string; description: string }
}

export const templates: Record<string, TemplateEntry> = {
  'template-1': template1,
  'template-2': template2,
  'template-3': template3,
  'template-4': template4,
  'template-5': template5,
  'template-6': template6,
  'template-7': template7,
  'template-8': template8,
  'template-9': template9,
  'template-10': template10,
  'template-11': template11,
  'template-classic': templateClassic,
  'template-modern': templateModern,
  'template-bold': templateBold,
  'template-minimal': templateMinimal,
  'template-professional': templateProfessional,
  'template-warm': templateWarm,
}

export const templateList = Object.values(templates).map(t => t.templateMeta)
