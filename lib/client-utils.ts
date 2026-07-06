'use client'

/**
 * Client-side utilities for interactive features
 * Optimized for React 19 and modern browser APIs
 */

/**
 * Copy text to clipboard with fallback support
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      document.body.appendChild(textArea)
      textArea.select()
      const success = document.execCommand('copy')
      textArea.remove()
      return success
    }
  } catch (error) {
    console.error('[v0] Copy to clipboard error:', error)
    return false
  }
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null

  return function debounced(...args: Parameters<T>) {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Throttle function for event handlers
 */
export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return function throttled(...args: Parameters<T>) {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Safe localStorage operations with error handling
 */
export const safeLocalStorage = {
  getItem: (key: string, fallback: string = ''): string => {
    try {
      return typeof window !== 'undefined' && localStorage.getItem(key) || fallback
    } catch {
      return fallback
    }
  },

  setItem: (key: string, value: string): boolean => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, value)
        return true
      }
      return false
    } catch {
      return false
    }
  },

  removeItem: (key: string): boolean => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(key)
        return true
      }
      return false
    } catch {
      return false
    }
  },
}

/**
 * Track analytics events safely
 */
export function trackEvent(eventName: string, eventData?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    try {
      ;(window as any).gtag('event', eventName, eventData)
    } catch (error) {
      console.error('[v0] Analytics tracking error:', error)
    }
  }
}
