// Servicio para obtener datos de Google Analytics 4
export interface AnalyticsData {
  pageViews: number
  cvDownloads: number
  contactForms: number
  projectClicks: number
  avgTimeOnPage: number
  bounceRate: number
  recentActivity: number[]
}

// Simulación de datos reales de GA4
// En producción, esto se conectaría con la API de Google Analytics
export const fetchAnalyticsData = async (): Promise<AnalyticsData> => {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Obtener datos del localStorage (simulando cache local)
  const cachedData = localStorage.getItem('analytics_cache')
  const cacheTime = localStorage.getItem('analytics_cache_time')
  
  // Si hay datos en cache y son recientes (menos de 1 hora), usarlos
  if (cachedData && cacheTime) {
    const timeDiff = Date.now() - parseInt(cacheTime)
    if (timeDiff < 3600000) { // 1 hora
      return JSON.parse(cachedData)
    }
  }
  
  // Simular datos reales basados en eventos trackeados
  const baseData = {
    pageViews: Math.floor(Math.random() * 500) + 100,
    cvDownloads: Math.floor(Math.random() * 50) + 10,
    contactForms: Math.floor(Math.random() * 30) + 5,
    projectClicks: Math.floor(Math.random() * 100) + 20,
    avgTimeOnPage: Math.floor(Math.random() * 180) + 60, // 1-4 minutos
    bounceRate: Math.floor(Math.random() * 30) + 20, // 20-50%
    recentActivity: Array.from({ length: 7 }, () => Math.floor(Math.random() * 50) + 10)
  }
  
  // Guardar en cache
  localStorage.setItem('analytics_cache', JSON.stringify(baseData))
  localStorage.setItem('analytics_cache_time', Date.now().toString())
  
  return baseData
}

// Función para obtener datos en tiempo real
export const getRealTimeData = (): Partial<AnalyticsData> => {
  // Obtener datos del sessionStorage (datos de la sesión actual)
  const sessionData = sessionStorage.getItem('session_analytics')
  if (sessionData) {
    return JSON.parse(sessionData)
  }
  
  return {
    pageViews: 1, // Al menos la vista actual
    cvDownloads: 0,
    contactForms: 0,
    projectClicks: 0
  }
}

// Función para actualizar datos de sesión
export const updateSessionData = (eventType: keyof AnalyticsData, value: number = 1) => {
  const currentData = getRealTimeData()
  const updatedData = {
    ...currentData,
    [eventType]: (currentData[eventType] as number || 0) + value
  }
  sessionStorage.setItem('session_analytics', JSON.stringify(updatedData))
}

// Función para obtener tendencias
export const getTrends = (currentValue: number, previousValue: number): string => {
  if (currentValue > previousValue) {
    const increase = ((currentValue - previousValue) / previousValue * 100).toFixed(0)
    return `+${increase}%`
  } else if (currentValue < previousValue) {
    const decrease = ((previousValue - currentValue) / previousValue * 100).toFixed(0)
    return `-${decrease}%`
  }
  return '0%'
}

// Función para formatear números
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Función para formatear tiempo
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
} 