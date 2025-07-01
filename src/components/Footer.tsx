import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear()
  
  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/santinoarroyo', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com/in/santino-arroyo-628090239', label: 'LinkedIn' },
    { icon: FiMail, href: 'mailto:josesantinoarroyo01@gmail.com', label: 'Email' },
  ]

  const quickLinks = [
    { name: t('navbar.home'), href: '#home' },
    { name: t('navbar.about'), href: '#about' },
    { name: t('navbar.skills'), href: '#skills' },
    { name: t('navbar.projects'), href: '#projects' },
    { name: t('navbar.contact'), href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative py-16 bg-gradient-to-t from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold gradient-text">Santino</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              {t('footer.student')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center text-white hover:text-primary-400 transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-white mb-4">Contacto</h3>
            <div className="space-y-3">
              <p className="text-gray-400">
                <span className="text-primary-400">{t('footer.email')}</span><br />
                josesantinoarroyo01@gmail.com
              </p>
              <p className="text-gray-400">
                <span className="text-primary-400">{t('footer.phone')}</span><br />
                +54 3576 448401
              </p>
              <p className="text-gray-400">
                <span className="text-primary-400">{t('footer.location')}</span><br />
                Arroyito, Córdoba, Argentina
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center text-center md:text-left"
        >
          <p className="text-gray-400 mb-4 md:mb-0">
            © {currentYear} Santino Arroyo. {t('footer.rights')}
          </p>
          <p className="text-gray-400 flex items-center space-x-1">
            <span>{t('footer.madeWith')}</span>
            <FiHeart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>{t('footer.inArgentina')}</span>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer 