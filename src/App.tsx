import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import ScrollProgressEnhanced from './components/ScrollProgressEnhanced'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import AnalyticsDashboard from './components/AnalyticsDashboard'
import Footer from './components/Footer'
import { usePageAnalytics } from './hooks/usePageAnalytics'

function App() {
  // Inicializar analytics de página
  usePageAnalytics()

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <ScrollProgressEnhanced showPercentage={true} />
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Contact />
                <AnalyticsDashboard />
                <Footer />
              </motion.div>
            } />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  )
}

export default App 