import { useState, useEffect } from 'react'

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const calculateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) {
        setScrollProgress(0)
        return
      }

      const scrollPercent = scrollTop / docHeight
      setScrollProgress(scrollPercent * 100)
    }

    // Calcular progreso inicial
    calculateScrollProgress()

    // Event listener para scroll
    window.addEventListener('scroll', calculateScrollProgress, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener('scroll', calculateScrollProgress)
    }
  }, [])

  return scrollProgress
} 