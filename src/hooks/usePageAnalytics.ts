import { useEffect, useRef } from 'react'
import { useAnalytics } from './useAnalytics'

export const usePageAnalytics = () => {
  const { trackEvent, trackPageView } = useAnalytics()
  const startTimeRef = useRef<number>(Date.now())
  const maxScrollRef = useRef<number>(0)

  useEffect(() => {
    // Trackear tiempo en página cuando el usuario sale
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000)
      trackEvent({
        action: 'time_on_page',
        category: 'engagement',
        value: timeSpent
      })
    }

    // Trackear scroll depth
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )
      
      if (scrollPercent > maxScrollRef.current) {
        maxScrollRef.current = scrollPercent
        
        // Trackear en puntos específicos (25%, 50%, 75%, 100%)
        if ([25, 50, 75, 100].includes(maxScrollRef.current)) {
          trackEvent({
            action: 'scroll_depth',
            category: 'engagement',
            value: maxScrollRef.current
          })
        }
      }
    }

    // Trackear cuando la página se vuelve visible/invisible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000)
        trackEvent({
          action: 'page_hidden',
          category: 'engagement',
          value: timeSpent
        })
      } else {
        startTimeRef.current = Date.now()
        trackEvent({
          action: 'page_visible',
          category: 'engagement'
        })
      }
    }

    // Agregar event listeners
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Trackear vista de página inicial
    trackEvent({
      action: 'page_view',
      category: 'navigation',
      label: window.location.pathname
    })

    trackPageView({
      page_title: document.title,
      page_location: window.location.href
    })

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [trackEvent, trackPageView])

  return {
    startTime: startTimeRef.current,
    maxScroll: maxScrollRef.current
  }
} 