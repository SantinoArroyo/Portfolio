// Configuración de Google Analytics 4
export const ANALYTICS_CONFIG = {
  // ID de medición de Google Analytics
  MEASUREMENT_ID: 'G-HFDSZY22DD',
  
  // Configuración de eventos personalizados
  EVENTS: {
    PROJECT_CLICK: 'project_click',
    CV_DOWNLOAD: 'cv_download',
    CONTACT_FORM_SUBMIT: 'contact_form_submit',
    SOCIAL_LINK_CLICK: 'social_link_click',
    PROJECT_FILTER_CHANGE: 'project_filter_change',
    SCROLL_TO_SECTION: 'scroll_to_section',
    PAGE_VIEW: 'page_view'
  },
  
  // Categorías de eventos
  CATEGORIES: {
    ENGAGEMENT: 'engagement',
    NAVIGATION: 'navigation',
    CONVERSION: 'conversion'
  },
  
  // Configuración de parámetros personalizados
  CUSTOM_PARAMETERS: {
    PROJECT_CATEGORY: 'project_category',
    PROJECT_TITLE: 'project_title',
    SOCIAL_PLATFORM: 'social_platform',
    SECTION_NAME: 'section_name',
    FORM_STATUS: 'form_status'
  }
}

// Función para inicializar Google Analytics
export const initializeAnalytics = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Configuración inicial
    window.gtag('config', 'G-HFDSZY22DD', {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: {
        'custom_parameter_1': ANALYTICS_CONFIG.CUSTOM_PARAMETERS.PROJECT_CATEGORY,
        'custom_parameter_2': ANALYTICS_CONFIG.CUSTOM_PARAMETERS.PROJECT_TITLE,
        'custom_parameter_3': ANALYTICS_CONFIG.CUSTOM_PARAMETERS.SOCIAL_PLATFORM,
        'custom_parameter_4': ANALYTICS_CONFIG.CUSTOM_PARAMETERS.SECTION_NAME,
        'custom_parameter_5': ANALYTICS_CONFIG.CUSTOM_PARAMETERS.FORM_STATUS
      }
    })
  }
}

// Función para enviar eventos personalizados
export const sendAnalyticsEvent = (
  eventName: string,
  parameters: Record<string, unknown> = {}
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

// Función para trackear tiempo en página
export const trackTimeOnPage = () => {
  const startTime = Date.now()
  
  window.addEventListener('beforeunload', () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000)
    sendAnalyticsEvent('time_on_page', {
      value: timeSpent,
      event_category: ANALYTICS_CONFIG.CATEGORIES.ENGAGEMENT
    })
  })
}

// Función para trackear scroll depth
export const trackScrollDepth = () => {
  let maxScroll = 0
  
  window.addEventListener('scroll', () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    )
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent
      
      // Trackear en puntos específicos (25%, 50%, 75%, 100%)
      if ([25, 50, 75, 100].includes(maxScroll)) {
        sendAnalyticsEvent('scroll_depth', {
          value: maxScroll,
          event_category: ANALYTICS_CONFIG.CATEGORIES.ENGAGEMENT
        })
      }
    }
  })
} 