import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

const categories = ['All', 'Web Apps', 'Mobile Apps']

export default function Projects({ dark }) {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active)

  const t = dark ? 'text-white' : 'text-black'
  const muted = dark ? 'text-gray-500' : 'text-gray-400'
  const tabBase = `px-6 py-2 text-[10px] font-semibold tracking-widest uppercase rounded-full border transition-all duration-200`
  const tabInactive = dark
    ? `${tabBase} border-white/10 text-gray-500 hover:border-white/30 hover:text-gray-300`
    : `${tabBase} border-black/10 text-gray-400 hover:border-black/30 hover:text-gray-600`
  const tabActive = dark
    ? `${tabBase} bg-white text-black border-white`
    : `${tabBase} bg-black text-white border-black`

  return (
    <section id="projects" className="py-10 md:py-14 px-6 md:px-12 lg:px-20 max-w-screen-xl mx-auto">

      {/* Header */}
      <div className="mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-3 ${t}`}
        >
          Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
          className={`text-sm leading-relaxed max-w-md ${muted}`}
        >
          Kumpulan proyek yang telah saya kerjakan — mulai dari web apps hingga mobile apps.
        </motion.p>
      </div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ delay: 0.15 }}
        className="flex flex-wrap gap-2 mb-10"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={active === cat ? tabActive : tabInactive}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} dark={dark} />
        ))}
      </div>
    </section>
  )
}
