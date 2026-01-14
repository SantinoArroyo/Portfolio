import { motion, useScroll, useTransform } from 'framer-motion'
import { FiArrowDown, FiGithub, FiLinkedin, FiDownload } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import { useAnalytics } from '../hooks/useAnalytics'
import { useRef } from 'react'

const Hero = () => {
  const { t } = useTranslation();
  const { trackCVDownload, trackSocialLinkClick, trackScrollToSection } = useAnalytics();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const scrollToAbout = () => {
    const element = document.querySelector('#about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    trackScrollToSection('about')
  }

  const scrollToProjects = () => {
    const element = document.querySelector('#projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    trackScrollToSection('projects')
  }

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/santinoarroyo', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com/in/santino-arroyo-628090239', label: 'LinkedIn' },
  ]

  return (
    <section id="home" ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark-950">
      {/* Professional Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1890ff08_1px,transparent_1px),linear-gradient(to_bottom,#1890ff08_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Gradient Overlays */}
        <motion.div 
          style={{ y: y1 }} 
          className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary-500/10 rounded-full mix-blend-screen filter blur-[120px]" 
        />
        <motion.div 
          style={{ y: y2 }} 
          className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-secondary-500/10 rounded-full mix-blend-screen filter blur-[120px]" 
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Professional Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full border border-primary-500/20 bg-primary-500/5 backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-primary-500 rounded-full mr-3 animate-pulse"></span>
            <span className="text-primary-400 font-medium text-sm tracking-wide">
              {t('hero.greeting')}
            </span>
          </motion.div>

          {/* Name - Professional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4">
              Santino Arroyo
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
          </motion.div>

          {/* Title - Clean */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-500"
          >
            {t('hero.title')}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg text-gray-400 max-w-2xl leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          {/* CTA Buttons - Professional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 pt-6"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToProjects}
              className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40"
            >
              {t('hero.viewProjects')}
            </motion.button>

            <a href="/ArroyoSantino_Cv.pdf" download onClick={trackCVDownload}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border-2 border-gray-700 hover:border-primary-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <FiDownload className="w-5 h-5" />
                {t('hero.downloadCV')}
              </motion.button>
            </a>
          </motion.div>

          {/* Social Links - Minimalist */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex gap-4 pt-8"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, color: '#1890ff' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => trackSocialLinkClick(social.label.toLowerCase())}
                className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary-500/50 text-gray-400 transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToAbout}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-500 hover:text-primary-500 transition-colors duration-300"
        >
          <FiArrowDown className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </section>
  )
}

export default Hero