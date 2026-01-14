import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiGithub, FiExternalLink } from 'react-icons/fi'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Project } from '../types'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  const [zoomImg, setZoomImg] = useState<string | null>(null)
  const { t } = useTranslation()
  if (!project) return null

  // Función para convertir saltos de línea y negritas en HTML
  function markdownToHtml(text: string) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-neon-cyan">$1</strong>')
      .replace(/\n/g, '<br/>')
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-dark-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={() => {
          if (!zoomImg) onClose();
        }}
      >
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-dark-900 border border-white/10 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-72 md:h-96 w-full shrink-0">
            {/* Main Image */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent z-10" />
            <img
              src={project.images[0] || 'https://via.placeholder.com/800x400'}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-neon-cyan hover:text-black transition-all duration-300 z-20 border border-white/10"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
              <div>
                <h2 className="text-4xl font-bold text-white mb-4">{project.title}</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-4 py-1.5 bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 shrink-0">
                {project.liveUrl && project.liveUrl !== '#' && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center space-x-2 px-6 py-2 text-sm"
                  >
                    <FiExternalLink />
                    <span>{t('projects.demo')}</span>
                  </motion.a>
                )}
                {project.githubUrl && project.githubUrl !== '#' && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    className="btn-secondary flex items-center space-x-2 px-6 py-2 text-sm"
                  >
                    <FiGithub />
                    <span>{t('projects.code')}</span>
                  </motion.a>
                )}
              </div>
            </div>

            <div className="prose prose-invert max-w-none text-gray-300 mb-12 leading-relaxed text-lg">
              <div dangerouslySetInnerHTML={{ __html: markdownToHtml(project.detailedDescription) }} />
            </div>

            {/* Image Gallery */}
            {project.images && project.images.length > 1 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-1 h-8 bg-neon-purple rounded-full" />
                  {t('projects.gallery')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.images.map((img: string, index: number) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="rounded-2xl overflow-hidden cursor-pointer border border-white/10 shadow-lg group relative aspect-video"
                      onClick={() => setZoomImg(img)}
                    >
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                        <span className="text-white font-medium px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">Ver imagen</span>
                      </div>
                      <img src={img} alt={`${project.title} screenshot ${index + 1}`} className="w-full h-full object-cover" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Modal de imagen ampliada */}
        {zoomImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-4"
            onClick={(e) => {
              e.stopPropagation();
              setZoomImg(null);
            }}
          >
            <img src={zoomImg} alt="Imagen ampliada" className="max-w-full max-h-[90vh] rounded-lg shadow-2xl border border-white/10" />
            <button
              onClick={() => setZoomImg(null)}
              className="absolute top-8 right-8 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors text-2xl backdrop-blur-md"
            >
              <FiX />
            </button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;