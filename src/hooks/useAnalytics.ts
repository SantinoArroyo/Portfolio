import { useCallback } from 'react'
import { updateSessionData } from '../services/analyticsService'
import { ANALYTICS_CONFIG } from '../config/analytics'

// Tipos para los eventos de Analytics
interface AnalyticsEvent {
  action: string
  category: string
  label?: string
  value?: number
}

interface PageViewEvent {
  page_title: string
  page_location: string
}

// Declaración global para gtag
declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void
  }
}

const getGtag = () => (typeof window !== 'undefined' ? window.gtag : undefined)

const withGtag = (
  command: 'event' | 'config' | 'set',
  targetId: string,
  config?: Record<string, unknown>
) => {
  const gtag = getGtag()
  if (!gtag) return false
  gtag(command, targetId, config)
  return true
}

export const useAnalytics = () => {
  // Función para enviar eventos personalizados
  const trackEvent = useCallback((event: AnalyticsEvent) => {
    withGtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value
    })
  }, [])

  // Función para trackear vistas de página
  const trackPageView = useCallback((pageView: PageViewEvent) => {
    const measurementId = ANALYTICS_CONFIG.MEASUREMENT_ID
    withGtag('config', measurementId, {
      page_title: pageView.page_title,
      page_location: pageView.page_location
    })
    updateSessionData('pageViews')
  }, [])

  // Eventos específicos del portfolio
  const trackProjectClick = useCallback((projectTitle: string, projectCategory: string) => {
    trackEvent({
      action: 'project_click',
      category: 'engagement',
      label: `${projectCategory}: ${projectTitle}`
    })
    updateSessionData('projectClicks')
  }, [trackEvent])

  const trackCVDownload = useCallback(() => {
    trackEvent({
      action: 'cv_download',
      category: 'engagement',
      label: 'CV Download'
    })
    updateSessionData('cvDownloads')
  }, [trackEvent])

  const trackContactFormSubmit = useCallback((success: boolean) => {
    trackEvent({
      action: 'contact_form_submit',
      category: 'engagement',
      label: success ? 'success' : 'error'
    })
    if (success) {
      updateSessionData('contactForms')
    }
  }, [trackEvent])

  const trackSocialLinkClick = useCallback((platform: string) => {
    trackEvent({
      action: 'social_link_click',
      category: 'engagement',
      label: platform
    })
  }, [trackEvent])

  const trackFilterChange = useCallback((filter: string) => {
    trackEvent({
      action: 'project_filter_change',
      category: 'engagement',
      label: filter
    })
  }, [trackEvent])

  const trackScrollToSection = useCallback((section: string) => {
    trackEvent({
      action: 'scroll_to_section',
      category: 'navigation',
      label: section
    })
  }, [trackEvent])

  return {
    trackEvent,
    trackPageView,
    trackProjectClick,
    trackCVDownload,
    trackContactFormSubmit,
    trackSocialLinkClick,
    trackFilterChange,
    trackScrollToSection
  }
} 