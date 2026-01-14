import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FiEye, FiDownload, FiMail, FiUsers, FiTrendingUp, FiBarChart, FiRefreshCw } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { fetchAnalyticsData, getRealTimeData, formatNumber, formatTime, AnalyticsData } from '../services/analyticsService'

interface MetricCard {
  title: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  color: string
  trend?: string
  key: keyof AnalyticsData
}

const AnalyticsDashboard = () => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [metrics, setMetrics] = useState<MetricCard[]>([
    {
      title: t('analytics.pageViews'),
      value: '0',
      icon: FiEye,
      color: 'from-blue-500 to-cyan-500',
      trend: '+12%',
      key: 'pageViews'
    },
    {
      title: t('analytics.cvDownloads'),
      value: '0',
      icon: FiDownload,
      color: 'from-green-500 to-emerald-500',
      trend: '+8%',
      key: 'cvDownloads'
    },
    {
      title: t('analytics.contactForms'),
      value: '0',
      icon: FiMail,
      color: 'from-purple-500 to-pink-500',
      trend: '+15%',
      key: 'contactForms'
    },
    {
      title: t('analytics.projectClicks'),
      value: '0',
      icon: FiUsers,
      color: 'from-orange-500 to-red-500',
      trend: '+20%',
      key: 'projectClicks'
    },
    {
      title: t('analytics.avgTimeOnPage'),
      value: '0s',
      icon: FiTrendingUp,
      color: 'from-indigo-500 to-purple-500',
      trend: '+5%',
      key: 'avgTimeOnPage'
    },
    {
      title: t('analytics.bounceRate'),
      value: '0%',
      icon: FiBarChart,
      color: 'from-yellow-500 to-orange-500',
      trend: '-3%',
      key: 'bounceRate'
    }
  ])

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const loadAnalyticsData = useCallback(async () => {
    setIsRefreshing(true)
    setErrorMessage('')
    try {
      const data = await fetchAnalyticsData()
      setAnalyticsData(data)
      setLastUpdated(new Date())
      setMetrics(prev => prev.map(metric => {
        let value: string | number = 0
        switch (metric.key) {
          case 'pageViews':
            value = formatNumber(data.pageViews)
            break
          case 'cvDownloads':
            value = formatNumber(data.cvDownloads)
            break
          case 'contactForms':
            value = formatNumber(data.contactForms)
            break
          case 'projectClicks':
            value = formatNumber(data.projectClicks)
            break
          case 'avgTimeOnPage':
            value = formatTime(data.avgTimeOnPage)
            break
          case 'bounceRate':
            value = `${data.bounceRate}%`
            break
        }
        return { ...metric, value }
      }))
      setIsVisible(true)
    } catch (error) {
      console.error('Error loading analytics data:', error)
      setErrorMessage(t('analytics.error'))
      setIsVisible(true)
    } finally {
      setIsRefreshing(false)
    }
  }, [t])

  useEffect(() => {
    loadAnalyticsData()
  }, [loadAnalyticsData])

  // Actualizar títulos de métricas cuando cambie el idioma
  useEffect(() => {
    setMetrics(prev => prev.map(metric => ({
      ...metric,
      title: (() => {
        switch (metric.key) {
          case 'pageViews':
            return t('analytics.pageViews')
          case 'cvDownloads':
            return t('analytics.cvDownloads')
          case 'contactForms':
            return t('analytics.contactForms')
          case 'projectClicks':
            return t('analytics.projectClicks')
          case 'avgTimeOnPage':
            return t('analytics.avgTimeOnPage')
          case 'bounceRate':
            return t('analytics.bounceRate')
          default:
            return metric.title
        }
      })()
    })))
  }, [t])

  // Actualizar datos en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      const realTimeData = getRealTimeData()
      if (analyticsData) {
                 setMetrics(prev => prev.map(metric => {
           const realTimeValue = realTimeData[metric.key]
           if (realTimeValue !== undefined && typeof realTimeValue === 'number') {
             let value: string | number = 0
             
             switch (metric.key) {
               case 'pageViews':
                 value = formatNumber(realTimeValue)
                 break
               case 'cvDownloads':
                 value = formatNumber(realTimeValue)
                 break
               case 'contactForms':
                 value = formatNumber(realTimeValue)
                 break
               case 'projectClicks':
                 value = formatNumber(realTimeValue)
                 break
             }
             
             return { ...metric, value }
           }
           return metric
         }))
      }
    }, 5000) // Actualizar cada 5 segundos

    return () => clearInterval(interval)
  }, [analyticsData])

  if (!isVisible) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <section id="analytics" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              <span className="gradient-text">{t('analytics.title')}</span>
            </h2>
            <motion.button
              onClick={loadAnalyticsData}
              disabled={isRefreshing}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-white hover:text-primary-400 transition-colors disabled:opacity-50"
            >
              <FiRefreshCw className={`w-6 h-6 ${isRefreshing ? 'animate-spin' : ''}`} />
            </motion.button>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-4">
            {t('analytics.subtitle')}
          </p>
          {errorMessage && (
            <div className="mx-auto mb-6 max-w-xl rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-red-100 text-sm">
              {errorMessage}
            </div>
          )}
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400">{t('analytics.realTimeData')}</span>
            {lastUpdated && (
              <span className="text-xs text-gray-500 ml-4">
                {t('analytics.lastUpdate')} {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 card-hover"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                {metric.trend && (
                  <span className={`text-sm font-medium ${
                    metric.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {metric.trend}
                  </span>
                )}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">
                {metric.value}
              </h3>
              <p className="text-gray-400 text-sm">
                {metric.title}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Gráfico de actividad */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 glass rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-6">{t('analytics.recentActivity')}</h3>
          <div className="h-64 flex items-end justify-center space-x-2">
            {analyticsData?.recentActivity.map((value, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: (value / Math.max(...analyticsData.recentActivity)) * 200 + 20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="w-8 bg-gradient-to-t from-primary-500 to-secondary-500 rounded-t-lg"
                style={{ height: `${(value / Math.max(...analyticsData.recentActivity)) * 200 + 20}px` }}
              />
            )) || Array.from({ length: 7 }, (_, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: 20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="w-8 bg-gradient-to-t from-primary-500 to-secondary-500 rounded-t-lg"
                style={{ height: '20px' }}
              />
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-400 mt-4">
            <span>{t('analytics.daysAgo')}</span>
            <span>{t('analytics.today')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AnalyticsDashboard 