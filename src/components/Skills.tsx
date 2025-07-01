import { motion } from 'framer-motion'
import { 
  FiCode, FiDatabase, FiGitBranch, FiAward
} from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

const Skills = () => {
  const { t } = useTranslation();

  const skillCategories = [
    {
      title: 'Data & Inteligencia Artificial',
      icon: FiDatabase,
      skills: [
        { name: t('skills.teamwork'), level: 80, color: 'from-blue-500 to-cyan-500' },
        { name: 'Machine Learning', level: 75, color: 'from-purple-500 to-pink-500' },
        { name: 'Power BI & Tableau', level: 75, color: 'from-yellow-400 to-orange-500' },
        { name: t('skills.predictiveModels'), level: 70, color: 'from-indigo-500 to-purple-500' },
        { name: 'Prompt Engineering', level: 85, color: 'from-green-400 to-blue-500' },
      ]
    },
    {
      title: 'Lenguajes & Bases de Datos',
      icon: FiCode,
      skills: [
        { name: 'Python', level: 80, color: 'from-blue-500 to-yellow-500' },
        { name: 'SQL', level: 80, color: 'from-cyan-500 to-blue-600' },
        { name: 'C', level: 70, color: 'from-gray-500 to-gray-600' },
        { name: 'R', level: 60, color: 'from-blue-400 to-blue-500' },
      ]
    },
    {
      title: 'Herramientas y Desarrollo',
      icon: FiGitBranch,
      skills: [
        { name: 'Git & GitHub', level: 80, color: 'from-orange-500 to-red-500' },
        { name: t('skills.algorithms'), level: 90, color: 'from-green-500 to-teal-500' },
        { name: 'Microsoft Office', level: 85, color: 'from-blue-600 to-blue-800' },
      ]
    },
    {
      title: 'Certificaciones',
      icon: FiAward,
      skills: [
        { name: 'Fundamentos de Data & IA (Platzi)', level: 100, color: 'from-green-500 to-green-600' },
        { name: 'Python for Data Science & AI (IBM)', level: 100, color: 'from-blue-500 to-blue-600' },
        { name: 'Databases & SQL for Data Science (IBM)', level: 100, color: 'from-cyan-500 to-blue-700' },
        { name: 'Data, Data, Everywhere (Google)', level: 100, color: 'from-red-500 to-yellow-500' },
      ]
    }
  ]

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('skills.title')}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 card-hover"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mr-4">
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                      <span className="text-primary-400 font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                        viewport={{ once: true }}
                        className={`h-2 rounded-full bg-gradient-to-r ${skill.color} ${skill.level === 100 ? '' : 'pr-2'}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            {t('skills.additional')}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              t('skills.teamwork'), t('skills.problemSolving'), t('skills.proactivity'), t('skills.adaptability'),
              t('skills.logicalThinking'), t('skills.accountingKnowledge')
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass rounded-xl p-4 text-center card-hover"
              >
                <span className="text-white font-medium">{tech}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills 