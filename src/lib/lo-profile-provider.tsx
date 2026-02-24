'use client'

/**
 * lo-profile-provider.tsx
 * React context that makes LOProfile available throughout the component tree.
 *
 * Usage (server component):
 *   import { LOProfileProvider } from '@/lib/lo-profile-provider'
 *   import { getLOProfile } from '@/lib/loangraphs-client'
 *   const profile = await getLOProfile()
 *   <LOProfileProvider profile={profile}>{children}</LOProfileProvider>
 *
 * Usage (client component):
 *   import { useLOProfile } from '@/lib/lo-profile-provider'
 *   const profile = useLOProfile()
 */

import React, { createContext, useContext } from 'react'
import type { LOProfile } from '@/types/lo-profile'

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const LOProfileContext = createContext<LOProfile | null>(null)

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

interface LOProfileProviderProps {
  profile: LOProfile
  children: React.ReactNode
}

/**
 * Wrap the app (or a subtree) with this provider after fetching the profile
 * server-side via `getLOProfile()`. All client components can then call
 * `useLOProfile()` without additional fetches.
 */
export function LOProfileProvider({ profile, children }: LOProfileProviderProps) {
  return (
    <LOProfileContext.Provider value={profile}>
      {children}
    </LOProfileContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Returns the LOProfile from context.
 * Must be used inside <LOProfileProvider>.
 */
export function useLOProfile(): LOProfile {
  const ctx = useContext(LOProfileContext)
  if (!ctx) {
    throw new Error(
      '[useLOProfile] No LOProfile found in context. ' +
        'Make sure <LOProfileProvider> wraps this component.'
    )
  }
  return ctx
}

/**
 * Safe version — returns null instead of throwing if used outside the provider.
 * Useful for components that render in multiple contexts (e.g. standalone previews).
 */
export function useLOProfileSafe(): LOProfile | null {
  return useContext(LOProfileContext)
}
