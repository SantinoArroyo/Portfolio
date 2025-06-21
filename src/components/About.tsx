import { motion } from 'framer-motion'
import { FiUser, FiMapPin, FiMail, FiPhone, FiCalendar } from 'react-icons/fi'

const About = () => {
  const personalInfo = [
    { icon: FiMapPin, label: 'Ubicación', value: 'Arroyito, Córdoba, Argentina' },
    { icon: FiMail, label: 'Email', value: 'josesantinoarroyo01@gmail.com' },
    { icon: FiPhone, label: 'Teléfono', value: '+54 3576 448401' },
    { icon: FiCalendar, label: 'Edad', value: '20 años' },
  ]

  const experiences = [
    {
      year: '2024 - Actualidad',
      title: 'Disertante en "Cursos para la SECU"',
      company: 'Universidad Tecnológica Nacional',
      description: 'Disertante en el Laboratorio de Ingeniería en Sistemas.'
    },
    {
      year: '2024 - Actualidad',
      title: 'Miembro del Laboratorio de Estadística',
      company: 'UTN FRSFCO - DataStatLab',
      description: 'Gestión de bases de datos, procesamiento de información y visualización con herramientas como Power BI.'
    },
    {
      year: '2022 - Actualidad',
      title: 'Investigador y Docente en IA',
      company: 'UTN / Grupo GISAI',
      description: 'Como Docente Investigador (Cat. G) y miembro del grupo GISAI, participo en proyectos de I+D aplicando IA y Machine Learning, y contribuyo a la formación en tecnologías emergentes.'
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
            Sobre <span className="gradient-text">Mí</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Apasionado desarrollador con experiencia en crear soluciones digitales innovadoras
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
                Información Personal
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
              <h3 className="text-2xl font-bold text-white mb-6">Mi Historia</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Comencé mi carrera en la Universidad Tecnológica Nacional, donde mi interés por la inteligencia artificial y el análisis de datos me llevó a unirme al grupo de investigación GISAI y al laboratorio DataStatLab.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Mi objetivo es aplicar mis conocimientos para desarrollar soluciones tecnológicas innovadoras y eficientes, combinando el desarrollo de software con las últimas tendencias en IA.
              </p>
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
            <h3 className="text-2xl font-bold text-white mb-8">Mi Trayectoria</h3>
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