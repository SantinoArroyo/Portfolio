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
        { name: 'Prompt Engineering', level: 85, color: 'from-neon-cyan to-neon-blue' },
        { name: 'Generative AI Tools', level: 85, color: 'from-neon-purple to-neon-pink' },
        { name: 'Machine Learning', level: 75, color: 'from-neon-purple to-neon-blue' },
        { name: 'Power BI, Tableau, Looker', level: 75, color: 'from-yellow-400 to-orange-500' },
        { name: t('skills.predictiveModels'), level: 70, color: 'from-neon-blue to-neon-purple' },
        { name: 'Deep Learning (LSTM)', level: 70, color: 'from-neon-cyan to-neon-purple' },
      ]
    },
    {
      title: 'Lenguajes & Bases de Datos',
      icon: FiCode,
      skills: [
        { name: 'Python', level: 80, color: 'from-neon-blue to-neon-cyan' },
        { name: 'SQL', level: 80, color: 'from-neon-cyan to-neon-blue' },
        { name: 'C', level: 70, color: 'from-gray-400 to-gray-500' },
        { name: 'R', level: 60, color: 'from-blue-400 to-blue-600' },
      ]
    },
    {
      title: 'Herramientas y Desarrollo',
      icon: FiGitBranch,
      skills: [
        { name: 'Git & GitHub', level: 80, color: 'from-orange-500 to-red-500' },
        { name: 'n8n (Automatización)', level: 75, color: 'from-neon-pink to-red-500' },
        { name: t('skills.algorithms'), level: 90, color: 'from-neon-cyan to-green-400' },
        { name: 'Microsoft Office', level: 85, color: 'from-blue-600 to-blue-800' },
      ]
    },
    {
      title: 'Certificaciones',
      icon: FiAward,
      skills: [
        { name: 'Fundamentos de Data & IA (Platzi)', level: 100, color: 'from-green-400 to-neon-cyan' },
        { name: 'Python for Data Science & AI (IBM)', level: 100, color: 'from-blue-500 to-neon-blue' },
        { name: 'Databases & SQL for Data Science (IBM)', level: 100, color: 'from-neon-cyan to-blue-600' },
        { name: 'Data, Data, Everywhere (Google)', level: 100, color: 'from-red-500 to-yellow-500' },
      ]
    }
  ]

  return (
    <section id="skills" className="py-32 relative bg-dark-950">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-purple/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="section-title">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple">
              {t('skills.title')}
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
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
              whileHover={{ y: -10 }}
              className="glass-card rounded-3xl p-8 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-center mb-8 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl flex items-center justify-center mr-4 border border-white/10 group-hover:border-neon-cyan/50 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.3)] group-hover:shadow-[0_0_20px_rgba(0,243,255,0.2)]">
                  <category.icon className="w-7 h-7 text-gray-300 group-hover:text-neon-cyan transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors">{category.title}</h3>
              </div>

              <div className="space-y-6 relative z-10">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: (categoryIndex * 0.2) + (skillIndex * 0.1) }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 font-medium text-sm group-hover:text-gray-200 transition-colors">{skill.name}</span>
                      <span className="text-neon-cyan font-bold text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-dark-900/50 rounded-full h-1.5 overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: (categoryIndex * 0.2) + (skillIndex * 0.1), ease: "easeOut" }}
                        viewport={{ once: true }}
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color} shadow-[0_0_10px_rgba(0,243,255,0.4)] relative`}
                      >
                        <div className="absolute top-0 right-0 bottom-0 w-1 bg-white/50 blur-[1px]" />
                      </motion.div>
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
          className="mt-24"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-12 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-neon-purple" />
            {t('skills.additional')}
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-neon-purple" />
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
                whileHover={{ scale: 1.05, y: -5, borderColor: 'rgba(188, 19, 254, 0.5)' }}
                className="glass-card rounded-2xl p-6 text-center border border-white/5 hover:bg-neon-purple/5 transition-all duration-300 group"
              >
                <span className="text-gray-400 font-medium text-sm group-hover:text-neon-purple transition-colors">{tech}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills