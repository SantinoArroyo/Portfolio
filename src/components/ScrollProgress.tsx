import { motion } from 'framer-motion'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { ScrollProgressProps } from '../types'

const ScrollProgress = ({ 
  height = 'md', 
  showPercentage = false, 
  position = 'top' 
}: ScrollProgressProps) => {
  const scrollProgress = useScrollProgress()

  const heightClasses = {
    sm: 'h-0.5',
    md: 'h-1',
    lg: 'h-1.5'
  }

  const positionClasses = {
    top: 'top-0',
    bottom: 'bottom-0'
  }

  return (
    <div className={`fixed ${positionClasses[position]} left-0 right-0 z-50 ${heightClasses[height]} bg-gray-800/20 backdrop-blur-sm`}>
      <motion.div
        className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600 shadow-lg"
        style={{ width: `${scrollProgress}%` }}
        initial={{ width: 0 }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
      />
      
      {showPercentage && scrollProgress > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute right-4 top-2 bg-gray-800/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm"
        >
          {Math.round(scrollProgress)}%
        </motion.div>
      )}
    </div>
  )
}

export default ScrollProgress 