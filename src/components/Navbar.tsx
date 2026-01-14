import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiHome, FiUser, FiCode, FiBriefcase, FiMail } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { t, i18n } = useTranslation()
  const [langMenu, setLangMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setLangMenu(false)
  }

  const navItems = useMemo(() => ([
    { id: 'home', name: t('navbar.home'), href: '#home', icon: FiHome },
    { id: 'about', name: t('navbar.about'), href: '#about', icon: FiUser },
    { id: 'skills', name: t('navbar.skills'), href: '#skills', icon: FiCode },
    { id: 'projects', name: t('navbar.projects'), href: '#projects', icon: FiBriefcase },
    { id: 'contact', name: t('navbar.contact'), href: '#contact', icon: FiMail },
  ]), [t])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0.2 }
    )

    navItems.forEach(item => {
      const section = document.getElementById(item.id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [navItems])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none`}
    >
      <div
        className={`
          pointer-events-auto
          relative flex items-center justify-between 
          w-full max-w-4xl px-6 py-3 rounded-full transition-all duration-500
          ${scrolled || isOpen ? 'glass-dark shadow-[0_0_30px_rgba(0,0,0,0.5)] border-white/10' : 'bg-transparent border-transparent'}
          backdrop-blur-xl
        `}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => scrollToSection('#home')}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-neon-cyan to-neon-blue rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,243,255,0.6)] transition-all duration-300">
            <span className="text-dark-950 font-black text-xl font-sans">S</span>
          </div>
          <span className={`text-lg font-bold tracking-tight ${scrolled || isOpen ? 'text-white' : 'text-white/90'}`}>
            Santino<span className="text-neon-cyan">.</span>
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1 bg-white/5 rounded-full p-1.5 border border-white/5 backdrop-blur-sm">
          {navItems.map((item) => (
            <motion.button
              key={item.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(item.href)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSection === item.id
                  ? 'text-white bg-white/15 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.name}
            </motion.button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenu(!langMenu)}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-sm text-gray-300 transition-all hover:border-neon-cyan/30"
            >
              <span>{i18n.language === 'es' ? '🇪🇸' : '🇺🇸'}</span>
              <span className="text-xs ml-1">▼</span>
            </button>

            <AnimatePresence>
              {langMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-32 glass-dark rounded-2xl overflow-hidden shadow-xl border border-white/10"
                >
                  <button
                    onClick={() => changeLanguage('es')}
                    className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-neon-cyan/10 hover:text-neon-cyan flex items-center space-x-2 transition-colors"
                  >
                    <span>🇪🇸</span> <span>Español</span>
                  </button>
                  <button
                    onClick={() => changeLanguage('en')}
                    className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-neon-cyan/10 hover:text-neon-cyan flex items-center space-x-2 transition-colors"
                  >
                    <span>🇺🇸</span> <span>English</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => changeLanguage(i18n.language === 'es' ? 'en' : 'es')}
            className="text-xl hover:scale-110 transition-transform"
          >
            {i18n.language === 'es' ? '🇪🇸' : '🇺🇸'}
          </button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/5"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-4 px-4 md:hidden pointer-events-auto"
          >
            <div className="glass-dark rounded-3xl p-4 space-y-2 shadow-2xl border border-white/10 backdrop-blur-xl">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center space-x-4 w-full p-3 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-white transition-all group"
                >
                  <div className="p-2 rounded-xl bg-white/5 text-neon-cyan group-hover:bg-neon-cyan/20 transition-colors">
                    <item.icon size={18} />
                  </div>
                  <span className="font-medium">{item.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar