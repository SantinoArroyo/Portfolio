import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { ScrollProgressProps } from '../types'
import { useEffect } from 'react'

const ScrollProgressEnhanced = ({ 
  height = 'md', // barra más delgada
  showPercentage = false, 
  position = 'top' 
}: ScrollProgressProps) => {
  const scrollProgress = useScrollProgress()
  
  // Motion values para animaciones más suaves
  const progressMotion = useMotionValue(scrollProgress)
  const scaleX = useTransform(progressMotion, [0, 100], [0, 1])
  const opacity = useTransform(progressMotion, [0, 10, 90, 100], [0, 1, 1, 0.8])

  // Sincronizar motion value con scrollProgress
  useEffect(() => {
    progressMotion.set(scrollProgress)
  }, [scrollProgress, progressMotion])

  const heightClasses = {
    sm: 'h-0.5',
    md: 'h-1', // 4px
    lg: 'h-2'  // 8px
  }

  const positionClasses = {
    top: 'top-0',
    bottom: 'bottom-0'
  }

  // Sección actual
  let section = '🏠 Inicio'
  if (scrollProgress >= 25 && scrollProgress < 50) section = '👤 Sobre Mí'
  else if (scrollProgress >= 50 && scrollProgress < 75) section = '💻 Habilidades'
  else if (scrollProgress >= 75 && scrollProgress < 90) section = '🚀 Proyectos'
  else if (scrollProgress >= 90) section = '📧 Contacto'

  return (
    <motion.div 
      className={`fixed ${positionClasses[position]} left-0 right-0 z-[999] ${heightClasses[height]} bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-primary-600/10 backdrop-blur-[2px] shadow-lg`}
      style={{ opacity }}
    >
      {/* Barra de progreso principal */}
      <motion.div
        className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600 rounded-full shadow-md"
        style={{ scaleX, transformOrigin: 'left' }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
      />
      
      {/* Porcentaje minimalista a la izquierda */}
      {showPercentage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute left-4 top-2 bg-white/70 text-primary-700 text-sm px-3 py-1 rounded-full shadow backdrop-blur-md font-semibold tracking-wide border border-white/30"
          style={{ zIndex: 100, fontFamily: 'Inter, sans-serif', letterSpacing: '0.02em' }}
        >
          {Math.round(scrollProgress)}%
        </motion.div>
      )}
      
      {/* Indicador de sección minimalista a la derecha */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute right-4 top-2 bg-white/70 text-primary-700 text-sm px-4 py-1 rounded-full shadow backdrop-blur-md font-semibold tracking-wide border border-white/30 flex items-center gap-2"
        style={{ zIndex: 100, fontFamily: 'Inter, sans-serif', letterSpacing: '0.02em' }}
      >
        <span>{section}</span>
      </motion.div>
    </motion.div>
  )
}

export default ScrollProgressEnhanced 