import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiEye, FiDownload, FiMail, FiUsers, FiTrendingUp, FiBarChart } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

interface MetricCard {
  title: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  color: string
  trend?: string
}

const AnalyticsDashboard = () => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [metrics, setMetrics] = useState<MetricCard[]>([
    {
      title: 'Vistas de página',
      value: '0',
      icon: FiEye,
      color: 'from-blue-500 to-cyan-500',
      trend: '+12%'
    },
    {
      title: 'Descargas CV',
      value: '0',
      icon: FiDownload,
      color: 'from-green-500 to-emerald-500',
      trend: '+8%'
    },
    {
      title: 'Formularios enviados',
      value: '0',
      icon: FiMail,
      color: 'from-purple-500 to-pink-500',
      trend: '+15%'
    },
    {
      title: 'Clicks en proyectos',
      value: '0',
      icon: FiUsers,
      color: 'from-orange-500 to-red-500',
      trend: '+20%'
    },
    {
      title: 'Tiempo en página',
      value: '0s',
      icon: FiTrendingUp,
      color: 'from-indigo-500 to-purple-500',
      trend: '+5%'
    },
    {
      title: 'Tasa de rebote',
      value: '0%',
      icon: FiBarChart,
      color: 'from-yellow-500 to-orange-500',
      trend: '-3%'
    }
  ])

  useEffect(() => {
    // Simular carga de datos reales de Analytics
    const loadMetrics = async () => {
      // En un entorno real, aquí harías una llamada a la API de Google Analytics
      // Por ahora, simulamos datos
      setTimeout(() => {
        setMetrics(prev => prev.map(metric => ({
          ...metric,
          value: Math.floor(Math.random() * 1000) + 100
        })))
        setIsVisible(true)
      }, 1000)
    }

    loadMetrics()
  }, [])

  if (!isVisible) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gradient-text">Dashboard Analytics</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Métricas y estadísticas del portfolio
          </p>
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
          <h3 className="text-2xl font-bold text-white mb-6">Actividad Reciente</h3>
          <div className="h-64 flex items-end justify-center space-x-2">
            {Array.from({ length: 7 }, (_, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: Math.random() * 100 + 20 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="w-8 bg-gradient-to-t from-primary-500 to-secondary-500 rounded-t-lg"
                style={{ height: `${Math.random() * 100 + 20}px` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-400 mt-4">
            <span>Hace 7 días</span>
            <span>Hoy</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AnalyticsDashboard 