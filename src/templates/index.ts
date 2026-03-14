// Template registry — maps template_id integer → LOView component
import type { TemplateProps } from './types'
import type React from 'react'

import { LOView as T1 } from './template-1'
import { LOView as T2 } from './template-2'
import { LOView as T3 } from './template-3'
import { LOView as T4 } from './template-4'
import { LOView as T5 } from './template-5'
import { LOView as T6 } from './template-6'
import { LOView as T7 } from './template-7'
import { LOView as T8 } from './template-8'
import { LOView as T9 } from './template-9'
import { LOView as T10 } from './template-10'
import { LOView as T11 } from './template-11'

export const templateRegistry: Record<number, React.ComponentType<TemplateProps>> = {
  1: T1, 2: T2, 3: T3, 4: T4, 5: T5,
  6: T6, 7: T7, 8: T8, 9: T9, 10: T10, 11: T11
}

export function getTemplateById(id?: number): React.ComponentType<TemplateProps> | null {
  if (!id) return null
  return templateRegistry[id] ?? null
}
