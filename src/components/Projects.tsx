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

  const categoryLabels = useMemo(() => ({
    ai: t('projects.ai'),
    data: t('projects.data'),
    speaking: t('projects.speaking'),
    desarrollo: t('projects.desarrollo'),
    all: t('projects.all')
  }), [t])

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
    },
    {
      id: 4,
      title: t('projects.p4.title'),
      description: t('projects.p4.description'),
      detailedDescription: t('projects.p4.details'),
      category: 'speaking',
      technologies: [t('projects.p4.tech1'), t('projects.p4.tech2'), t('projects.p4.tech3'), t('projects.p4.tech4')],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      images: [] // TODO: Add diploma image when available
    },
    {
      id: 5,
      title: t('projects.p5.title'),
      description: t('projects.p5.description'),
      detailedDescription: t('projects.p5.details'),
      category: 'desarrollo',
      technologies: [t('projects.p5.tech1'), t('projects.p5.tech2'), t('projects.p5.tech3'), t('projects.p5.tech4')],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      images: [
        '/proyectos/soep-dashboard-general.png',
        '/proyectos/soep-modelado-visual.png',
        '/proyectos/soep-configuracion-proceso.png',
        '/proyectos/soep-analisis-estadistico.png',
        '/proyectos/soep-resultados-kpi.png',
        '/proyectos/soep-analisis-economico.png',
        '/proyectos/soep-replicas-simulacion.png',
        '/proyectos/soep-graficos-resultados.png',
        '/proyectos/soep-interfaz-completa.png'
      ]
    },
    {
      id: 6,
      title: t('projects.p6.title'),
      description: t('projects.p6.description'),
      detailedDescription: t('projects.p6.details'),
      category: 'data',
      technologies: [t('projects.p6.tech1'), t('projects.p6.tech2'), t('projects.p6.tech3'), t('projects.p6.tech4')],
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
      images: [
        '/proyectos/cesca-automations.png',
        '/proyectos/cesca-dashboards.png',
        '/proyectos/cesca-segmentation.png'
      ]
    },
    {
      id: 7,
      title: t('projects.p7.title'),
      description: t('projects.p7.description'),
      detailedDescription: t('projects.p7.details'),
      category: 'desarrollo',
      technologies: [t('projects.p7.tech1'), t('projects.p7.tech2'), t('projects.p7.tech3'), t('projects.p7.tech4')],
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
      images: [] // TODO: Add concesionaria screenshots
    }
  ], [t])

  const filters: FilterOption[] = useMemo(() => [
    { id: 'all', label: t('projects.all'), icon: FiGlobe },
    { id: 'ai', label: t('projects.ai'), icon: FiCpu },
    { id: 'data', label: t('projects.data'), icon: FiDatabase },
    { id: 'desarrollo', label: t('projects.desarrollo'), icon: FiCode },
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
    <section id="projects" className="py-24 relative bg-dark-950">
      {/* Professional Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-500/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1890ff08_1px,transparent_1px),linear-gradient(to_bottom,#1890ff08_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="section-title text-center">
            {t('projects.title')}
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto text-center">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleFilterChange(filter.id)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20'
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
                className="group relative glass-card rounded-3xl overflow-hidden cursor-pointer h-[500px] flex flex-col"
                onClick={() => {
                  setSelectedProject(project)
                  trackProjectClick(project.title, project.category)
                }}
                whileHover={{ y: -10 }}
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent z-10 opacity-80" />
                  <div className="absolute inset-0 bg-neon-cyan/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                  <div className="absolute top-4 right-4 z-30 flex gap-2">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide border border-white/15 text-gray-100">
                      {categoryLabels[project.category] || project.category}
                    </span>
                  </div>

                  {project.images && project.images[0] ? (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-dark-900">
                      <FiCode className="w-16 h-16 text-gray-700 group-hover:text-neon-cyan transition-colors duration-500" />
                    </div>
                  )}

                  {project.featured && (
                    <div className="absolute top-4 left-4 z-30 bg-neon-cyan/90 backdrop-blur-md text-dark-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,243,255,0.5)]">
                      {t('projects.featured')}
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-8 flex flex-col flex-grow relative z-30">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-950/90 pointer-events-none" />

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors relative z-10">
                    {project.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-6 line-clamp-3 relative z-10 flex-grow">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/5 text-neon-cyan/80 rounded-full text-xs font-medium border border-white/10 group-hover:border-neon-cyan/30 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-white/5 text-gray-400 rounded-full text-xs font-medium border border-white/10">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10 relative z-10">
                    <span className="text-sm text-neon-cyan flex items-center gap-2 group-hover:gap-3 transition-all font-medium">
                      {t('projects.details')} <FiExternalLink />
                    </span>
                    {project.githubUrl !== '#' && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, color: '#fff' }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-500 hover:text-white transition-colors p-2"
                        onClick={(e) => {
                          e.stopPropagation()
                          trackSocialLinkClick('github')
                        }}
                      >
                        <FiGithub className="w-5 h-5" />
                      </motion.a>
                    )}
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