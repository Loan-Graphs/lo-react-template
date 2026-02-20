import { cache } from 'react'
import { getSlugFromRequest } from './subdomain'
import { getLOProfile } from './loProfile'

// React cache() deduplicates this across a single server request —
// so all pages/components calling getProfile() only hit the API once per render.
export const getProfile = cache(async () => {
  const slug = await getSlugFromRequest()
  return getLOProfile(slug)
})
