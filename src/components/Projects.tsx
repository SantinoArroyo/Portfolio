import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiGithub, FiCode, FiDatabase, FiGlobe, FiCpu, FiMic } from 'react-icons/fi'
import ProjectModal from './ProjectModal'

interface Project {
  id: number;
  title: string;
  description: string;
  detailedDescription: string;
  category: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  images: string[];
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      id: 1,
      title: 'Investigación y Desarrollo en IA',
      description: 'Participo en la investigación y desarrollo de soluciones innovadoras basadas en modelos de IA.',
      detailedDescription: 'Como miembro del grupo GISAI (Grupo de Investigación en Señales, Sistemas e Inteligencia Artificial), mi rol se centra en la investigación y aplicación de algoritmos de Machine Learning y Deep Learning para resolver problemas complejos. Esto incluye análisis de datos, procesamiento de imágenes y desarrollo de modelos predictivos en diversos dominios, contribuyendo al avance de la tecnología y la ciencia de datos en la región.',
      category: 'ai',
      technologies: ['Python', 'Machine Learning', 'Análisis de Datos', 'Deep Learning'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      images: ['/proyectos/ia-investigacion.jpg', '/proyectos/ia-ml.jpg', '/proyectos/ia-analisis.jpg']
    },
    {
      id: 2,
      title: 'Análisis y Visualización de Datos',
      description: 'Desarrollo y gestión de bases de datos, y creación de dashboards interactivos.',
      detailedDescription: 'En mi rol en DataStatLab, soy responsable de todo el ciclo de vida de los datos. Desde la recolección y limpieza inicial, pasando por el almacenamiento y la gestión en bases de datos SQL y NoSQL, hasta el procesamiento y la transformación para análisis. Finalmente, creo dashboards e informes interactivos utilizando herramientas como Power BI y Tableau para facilitar la toma de decisiones basada en datos.',
      category: 'data',
      technologies: ['Power BI', 'SQL', 'Bases de Datos', 'ETL'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      images: ['/proyectos/dashboard-powerbi.jpg', '/proyectos/analisis-datos.jpg']
    },
    {
      id: 3,
      title: 'Disertante en Seminario Smart Grids & IA',
      description: 'Presentación sobre la aplicación de la IA en redes eléctricas inteligentes.',
      detailedDescription: 'Tuve el honor de ser invitado como disertante en el seminario interno sobre Redes Eléctricas Inteligentes (Smart Grids) e Inteligencia Artificial en la UTN - Facultad Regional Córdoba. Nuestra presentación se centró en cómo los algoritmos de IA pueden ser utilizados para realizar predicciones de producción de energía eléctrica. Junto al grupo GISAI, presentamos nuestros modelos de predicción (SARIMA, Holt-Winters y LSTM) para realizar 1 año de predicciones de producción fotovoltaica de una agrupación de paneles solares, compartiendo conocimientos y casos de estudio con profesionales del sector.',
      category: 'speaking',
      technologies: ['Inteligencia Artificial', 'Smart Grids', 'Oratoria'],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      images: ['/proyectos/SI1_Arroyo_car.png']
    }
  ]

  const filters = [
    { id: 'all', label: 'Todos', icon: FiGlobe },
    { id: 'ai', label: 'IA', icon: FiCpu },
    { id: 'data', label: 'Datos', icon: FiDatabase },
    { id: 'speaking', label: 'Disertaciones', icon: FiMic }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mis <span className="gradient-text">Proyectos</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Una muestra de mi trabajo y las tecnologías que utilizo para crear soluciones innovadoras
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'gradient-border text-white'
                  : 'glass text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <filter.icon className="w-4 h-4" />
              <span>{filter.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-2xl overflow-hidden card-hover cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FiCode className="w-16 h-16 text-primary-400/50" />
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Destacado
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6 flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed flex-grow">{project.description}</p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex space-x-4 mt-auto">
                    <div
                      className="flex items-center space-x-2 text-primary-400"
                    >
                      <FiExternalLink className="w-4 h-4" />
                      <span>Ver Detalles</span>
                    </div>
                    {project.githubUrl !== '#' &&
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiGithub className="w-4 h-4" />
                        <span>Código</span>
                      </motion.a>
                    }
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}

export default Projects 