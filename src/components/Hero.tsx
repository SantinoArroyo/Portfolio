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
    <section id="home" ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden bg-dark-950 perspective-1000">
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div style={{ y: y1 }} className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-cyan/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse-slow" />
        <motion.div style={{ y: y2 }} className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neon-purple/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-2000" />

        {/* Cyber Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block px-6 py-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan font-mono text-sm mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(0,243,255,0.3)]"
          >
            <span className="animate-pulse mr-2">●</span>
            {t('hero.greeting')}
          </motion.div>

          {/* Name with Glitch Effect */}
          <div className="relative group">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-7xl md:text-9xl font-black tracking-tighter mb-4"
            >
              <span className="text-white relative inline-block">
                Santino
                <span className="absolute top-0 left-0 -z-10 w-full h-full text-neon-cyan opacity-0 group-hover:opacity-70 group-hover:animate-glitch group-hover:translate-x-[2px]">Santino</span>
                <span className="absolute top-0 left-0 -z-10 w-full h-full text-neon-purple opacity-0 group-hover:opacity-70 group-hover:animate-glitch group-hover:-translate-x-[2px] animation-delay-2000">Santino</span>
              </span>
              <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan animate-shimmer bg-300%"> Arroyo</span>
            </motion.h1>

            {/* Decorative Lines */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50" />
          </div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-2xl md:text-4xl text-gray-300 font-light tracking-wide font-mono"
          >
            <span className="text-neon-purple">&lt;</span>
            {t('hero.title')}
            <span className="text-neon-purple">/&gt;</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            {t('hero.description')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,243,255,0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
              className="btn-primary flex items-center space-x-3 group relative overflow-hidden"
            >
              <span className="relative z-10">{t('hero.viewProjects')}</span>
              <FiArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>

            <a href="/ArroyoSantino_Cv.pdf" download onClick={trackCVDownload}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(188,19,254,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="btn-secondary flex items-center space-x-3 group border-neon-purple/50 text-neon-purple hover:bg-neon-purple/10"
              >
                <FiDownload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                <span>{t('hero.downloadCV')}</span>
              </motion.button>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex justify-center space-x-8 pt-12"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                whileHover={{ scale: 1.2, y: -5, color: '#00f3ff' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => trackSocialLinkClick(social.label.toLowerCase())}
                className="p-4 glass-card rounded-full text-gray-400 hover:text-neon-cyan transition-all duration-300 group relative"
              >
                <div className="absolute inset-0 bg-neon-cyan/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <social.icon className="w-6 h-6 relative z-10" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={scrollToAbout}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-500 hover:text-neon-cyan transition-colors duration-300 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest opacity-50">Scroll</span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1 shadow-[0_0_10px_rgba(0,243,255,0.2)]">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-neon-cyan rounded-full shadow-[0_0_5px_#00f3ff]"
            />
          </div>
        </motion.button>
      </motion.div>
    </section>
  )
}

export default Hero