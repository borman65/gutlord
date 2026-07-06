'use client'

import { useEffect, useState, useCallback } from 'react'

interface AsyncState<T> {
  status: 'idle' | 'pending' | 'success' | 'error'
  data: T | null
  error: Error | null
}

/**
 * Hook for handling async operations with proper state management
 * Follows React 19 patterns with automatic cleanup
 */
export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true,
  deps: unknown[] = []
) {
  const [state, setState] = useState<AsyncState<T>>({
    status: 'idle',
    data: null,
    error: null,
  })

  const execute = useCallback(async () => {
    setState({ status: 'pending', data: null, error: null })

    try {
      const result = await asyncFunction()
      setState({ status: 'success', data: result, error: null })
      return result
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error))
      setState({ status: 'error', data: null, error: err })
      throw err
    }
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate, ...deps])

  return { ...state, execute }
}
