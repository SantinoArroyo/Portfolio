import { motion } from 'framer-motion'
import { FiUser, FiMapPin, FiMail, FiPhone, FiCalendar } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

const About = () => {
  const { t } = useTranslation();

  const personalInfo = [
    { icon: FiMapPin, label: t('about.location'), value: t('about.locationValue') },
    { icon: FiMail, label: t('about.email'), value: 'josesantinoarroyo01@gmail.com' },
    { icon: FiPhone, label: t('about.phone'), value: '+54 3576 448401' },
    { icon: FiCalendar, label: t('about.age'), value: t('about.ageValue') },
  ]

  const experiences = [
    {
      year: t('about.exp1.year'),
      title: t('about.exp1.title'),
      company: t('about.exp1.company'),
      description: t('about.exp1.description')
    },
    {
      year: t('about.exp2.year'),
      title: t('about.exp2.title'),
      company: t('about.exp2.company'),
      description: t('about.exp2.description')
    },
    {
      year: t('about.exp3.year'),
      title: t('about.exp3.title'),
      company: t('about.exp3.company'),
      description: t('about.exp3.description')
    }
  ]

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('about.title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FiUser className="w-6 h-6 mr-3 text-primary-400" />
                {t('about.personalInfo')}
              </h3>
              <div className="space-y-4">
                {personalInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                      <info.icon className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{info.label}</p>
                      <p className="text-white font-medium">{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">{t('about.historyTitle')}</h3>
              <p className="text-gray-300 leading-relaxed mb-4">{t('about.history1')}</p>
              <p className="text-gray-300 leading-relaxed mb-4">{t('about.history2')}</p>
              <p className="text-gray-300 leading-relaxed">{t('about.history3')}</p>
            </div>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-8">{t('about.experienceTitle')}</h3>
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="glass rounded-xl p-6 card-hover">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white">{exp.title}</h4>
                      <p className="text-primary-400 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-400 bg-primary-500/20 px-3 py-1 rounded-full">
                      {exp.year}
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                </div>
                
                {index < experiences.length - 1 && (
                  <div className="absolute left-6 top-full w-0.5 h-6 bg-gradient-to-b from-primary-500 to-transparent" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About 