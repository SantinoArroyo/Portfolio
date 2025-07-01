import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiHome, FiUser, FiCode, FiBriefcase, FiMail } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t, i18n } = useTranslation()
  const [langMenu, setLangMenu] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
    setLangMenu(false)
  }

  const navItems = [
    { name: t('navbar.home'), href: '#home', icon: FiHome },
    { name: t('navbar.about'), href: '#about', icon: FiUser },
    { name: t('navbar.skills'), href: '#skills', icon: FiCode },
    { name: t('navbar.projects'), href: '#projects', icon: FiBriefcase },
    { name: t('navbar.contact'), href: '#contact', icon: FiMail },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold gradient-text">Santino</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.href)}
                className="flex items-center space-x-2 text-white hover:text-primary-400 transition-colors duration-200"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </motion.button>
            ))}
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenu(!langMenu)}
                aria-label="Cambiar idioma"
                aria-expanded={langMenu}
                aria-haspopup="true"
                className="ml-4 px-3 py-2 rounded-lg bg-gray-800 text-white hover:bg-primary-400 hover:text-white transition-colors duration-200"
              >
                {i18n.language === 'es' ? 'ES' : 'EN'} ▼
              </button>
              {langMenu && (
                <div className="absolute right-0 mt-2 w-24 bg-white rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => changeLanguage('es')}
                    className="block w-full px-4 py-2 text-left hover:bg-primary-100 text-gray-800"
                  >
                    Español
                  </button>
                  <button
                    onClick={() => changeLanguage('en')}
                    className="block w-full px-4 py-2 text-left hover:bg-primary-100 text-gray-800"
                  >
                    English
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-primary-400 transition-colors duration-200"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 glass rounded-lg overflow-hidden"
            >
              <div className="px-4 py-2 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    onClick={() => scrollToSection(item.href)}
                    className="flex items-center space-x-3 w-full text-left text-white hover:text-primary-400 transition-colors duration-200 py-2"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar 