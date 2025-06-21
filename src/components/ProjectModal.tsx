import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiGithub, FiExternalLink } from 'react-icons/fi';

const ProjectModal = ({ project, onClose }: { project: any, onClose: () => void }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-[#1a202c] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-64 md:h-80 w-full">
            {/* Main Image */}
            <img 
              src={project.images[0] || 'https://via.placeholder.com/800x400'} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            {/* Close Button */}
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/75 transition-colors"
            >
              <FiX />
            </button>
          </div>

          <div className="p-8 overflow-y-auto">
            <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech: any) => (
                <span key={tech} className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>

            <div className="prose prose-invert max-w-none text-gray-300 mb-8">
              <p>{project.detailedDescription}</p>
            </div>
            
            {/* Image Gallery */}
            {project.images && project.images.length > 1 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Galería</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.images.map((img: any, index: any) => (
                    <motion.div key={index} whileHover={{ scale: 1.05 }} className="rounded-lg overflow-hidden">
                       <img src={img} alt={`${project.title} screenshot ${index + 1}`} className="w-full h-full object-cover"/>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              {project.liveUrl && project.liveUrl !== '#' && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 text-primary-400 hover:text-primary-300 transition-colors duration-200"
                >
                  <FiExternalLink />
                  <span>Ver Demo</span>
                </motion.a>
              )}
              {project.githubUrl && project.githubUrl !== '#' && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <FiGithub />
                  <span>Ver Código</span>
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal; 