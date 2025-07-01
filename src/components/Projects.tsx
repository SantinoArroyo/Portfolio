import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiGithub, FiCode, FiDatabase, FiGlobe, FiCpu, FiMic } from 'react-icons/fi'
import ProjectModal from './ProjectModal'
import { useTranslation } from 'react-i18next'
import { Project, FilterOption } from '../types'
import { useAnalytics } from '../hooks/useAnalytics'

const Projects = () => {
  const { t } = useTranslation();
  const { trackProjectClick, trackFilterChange, trackSocialLinkClick } = useAnalytics();
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Memoizar los proyectos para evitar re-renders innecesarios
  const projects: Project[] = useMemo(() => [
    {
      id: 1,
      title: t('projects.p1.title'),
      description: t('projects.p1.description'),
      detailedDescription: t('projects.p1.details'),
      category: 'ai',
      technologies: [t('projects.p1.tech1'), t('projects.p1.tech2'), t('projects.p1.tech3'), t('projects.p1.tech4')],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      images: [
        '/proyectos/ia-sarima-lstm-resultados.png',
        '/proyectos/ia-boxplot-anual.png',
        '/proyectos/ia-patron-intradiario.png'
      ]
    },
    {
      id: 2,
      title: t('projects.p2.title'),
      description: t('projects.p2.description'),
      detailedDescription: t('projects.p2.details'),
      category: 'data',
      technologies: [t('projects.p2.tech1'), t('projects.p2.tech2'), t('projects.p2.tech3'), t('projects.p2.tech4')],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      images: ['/proyectos/dashboard-powerbi.jpg', '/proyectos/analisis-datos.jpg']
    },
    {
      id: 3,
      title: t('projects.p3.title'),
      description: t('projects.p3.description'),
      detailedDescription: t('projects.p3.details'),
      category: 'speaking',
      technologies: [t('projects.p3.tech1'), t('projects.p3.tech2'), t('projects.p3.tech3')],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      images: ['/proyectos/SI1_Arroyo_car.png']
    }
  ], [t])

  const filters: FilterOption[] = useMemo(() => [
    { id: 'all', label: t('projects.all'), icon: FiGlobe },
    { id: 'ai', label: t('projects.ai'), icon: FiCpu },
    { id: 'data', label: t('projects.data'), icon: FiDatabase },
    { id: 'speaking', label: t('projects.speaking'), icon: FiMic }
  ], [t])

  const filteredProjects = useMemo(() => 
    activeFilter === 'all' 
      ? projects 
      : projects.filter(project => project.category === activeFilter),
    [projects, activeFilter]
  )

  const handleFilterChange = useCallback((filterId: string) => {
    setActiveFilter(filterId)
    trackFilterChange(filterId)
  }, [trackFilterChange])

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
            {t('projects.title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('projects.subtitle')}
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
              onClick={() => handleFilterChange(filter.id)}
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
                onClick={() => {
                  setSelectedProject(project)
                  trackProjectClick(project.title, project.category)
                }}
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-primary-500/20 to-secondary-500/20">
                  {project.images && project.images[0] ? (
                    <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FiCode className="w-16 h-16 text-primary-400/50" />
                    </div>
                  )}
                  {project.featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {t('projects.featured')}
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
                      <span>{t('projects.details')}</span>
                    </div>
                    {project.githubUrl !== '#' &&
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
                        onClick={(e) => {
                          e.stopPropagation()
                          trackSocialLinkClick('github')
                        }}
                      >
                        <FiGithub className="w-4 h-4" />
                        <span>{t('projects.code')}</span>
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