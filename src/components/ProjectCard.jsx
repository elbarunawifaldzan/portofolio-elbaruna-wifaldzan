import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi'

export default function ProjectCard({ project, index, dark }) {
  const cardBg    = dark ? 'bg-[#0a0a0a] border-white/[0.07]' : 'bg-[#f5f5f5] border-black/[0.07]'
  const title     = dark ? 'text-white' : 'text-black'
  const desc      = dark ? 'text-gray-500' : 'text-gray-500'
  const techBorder= dark ? 'border-white/[0.08] text-gray-600' : 'border-black/[0.08] text-gray-400'
  const badge     = dark ? 'border-white/20 text-gray-400' : 'border-black/20 text-gray-500'
  const divider   = dark ? 'border-white/[0.07]' : 'border-black/[0.07]'
  const linkBase  = `flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase transition-colors duration-200`
  const linkColor = dark ? 'text-gray-600 hover:text-white' : 'text-gray-400 hover:text-black'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`border rounded-2xl overflow-hidden group flex flex-col ${cardBg}`}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden aspect-video bg-gray-900">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.name}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105
              ${dark ? 'grayscale-0' : 'grayscale'}`}
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${dark ? 'bg-[#0d0d0d]' : 'bg-[#e8e8e8]'}`}>
            <div className="grid grid-cols-4 gap-1 opacity-20">
              {Array(12).fill(0).map((_, i) => (
                <div key={i} className={`w-8 h-6 rounded ${dark ? 'bg-white/20' : 'bg-black/20'}`} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className={`text-sm font-bold uppercase tracking-wider leading-tight ${title}`}>
            {project.name}
          </h3>
          <span className={`inline-block text-[10px] font-medium tracking-widest uppercase border rounded-full px-3 py-0.5 shrink-0 ${badge}`}>
            {project.category}
          </span>
        </div>

        <p className={`text-xs leading-relaxed mb-4 ${desc}`}>{project.description}</p>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.map((tech) => (
            <span key={tech}
              className={`text-[10px] font-medium tracking-widest uppercase border rounded px-2 py-0.5 ${techBorder}`}>
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className={`flex items-center gap-4 pt-4 border-t mt-auto ${divider}`}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              aria-label="GitHub" className={`${linkBase} ${linkColor}`}>
              <FiGithub size={13} />
              <span>GitHub</span>
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              aria-label="Live" className={`${linkBase} ${linkColor}`}>
              <FiExternalLink size={13} />
              <span>{project.category === 'Mobile Apps' ? 'Live Mobile' : 'Live Website'}</span>
            </a>
          )}
          {/* Detail — selalu tampil karena semua project punya slug */}
          <Link
            to={`/projects/${project.slug}`}
            aria-label="Detail"
            className={`${linkBase} ${linkColor} ml-auto`}
          >
            <span>Detail</span>
            <FiArrowRight size={13} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
