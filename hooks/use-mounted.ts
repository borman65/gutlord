'use client'

import { useEffect, useState } from 'react'

/**
 * Hook to check if component is mounted on client
 * Useful for hydration mismatch prevention
 */
export function useMounted() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted
}
