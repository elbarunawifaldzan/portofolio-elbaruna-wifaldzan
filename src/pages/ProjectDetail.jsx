import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiGithub, FiExternalLink, FiCalendar, FiUser, FiLayers } from 'react-icons/fi'
import { projects } from '../data/projects'

export default function ProjectDetail({ dark }) {
  const { slug } = useParams()
  const project  = projects.find((p) => p.slug === slug)

  const bg      = dark ? 'bg-black'          : 'bg-white'
  const tc      = dark ? 'text-white'        : 'text-black'
  const muted   = dark ? 'text-gray-500'     : 'text-gray-400'
  const border  = dark ? 'border-white/[0.07]' : 'border-black/[0.07]'
  const cardBg  = dark ? 'bg-[#0a0a0a]'     : 'bg-[#f5f5f5]'
  const techBg  = dark ? 'border-white/[0.08] text-gray-500' : 'border-black/[0.08] text-gray-400'
  const badge   = dark ? 'border-white/20 text-gray-400' : 'border-black/20 text-gray-500'
  const linkBtn = dark
    ? 'border-white/10 text-gray-400 hover:border-white/40 hover:text-white'
    : 'border-black/10 text-gray-500 hover:border-black/40 hover:text-black'
  const dotColor = dark ? 'bg-white' : 'bg-black'

  // 404 state
  if (!project) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center ${bg} ${tc}`}>
        <p className="text-6xl font-black mb-4">404</p>
        <p className={`text-sm mb-8 ${muted}`}>Project tidak ditemukan.</p>
        <Link
          to="/"
          className={`flex items-center gap-2 text-xs font-semibold tracking-widest uppercase border rounded-full px-5 py-2 transition-all duration-200 ${linkBtn}`}
        >
          <FiArrowLeft size={13} />
          Kembali
        </Link>
      </div>
    )
  }

  const { details } = project

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300`}>

      {/* ── Dot Grid background ── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: dark
            ? 'radial-gradient(circle, rgba(255,255,255,0.1) 2px, transparent 2px)'
            : 'radial-gradient(circle, rgba(0,0,0,0.07) 2px, transparent 2px)',
          backgroundSize: '28px 28px',
          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-screen-lg mx-auto px-6 md:px-12 lg:px-20 pt-28 pb-24">

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/#projects"
            className={`inline-flex items-center gap-2 text-[10px] font-semibold tracking-widest uppercase border rounded-full px-4 py-2 transition-all duration-200 mb-12 ${linkBtn} border`}
          >
            <FiArrowLeft size={12} />
            Back to Projects
          </Link>
        </motion.div>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          {/* Category badge */}
          <span className={`inline-block text-[10px] font-medium tracking-widest uppercase border rounded-full px-3 py-0.5 mb-4 ${badge}`}>
            {project.category}
          </span>

          {/* Title */}
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-6 ${tc}`}>
            {project.name}
          </h1>

          {/* Description */}
          <p className={`text-base leading-relaxed max-w-2xl ${muted}`}>
            {project.description}
          </p>
        </motion.div>

        {/* ── Thumbnail / placeholder ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={`w-full aspect-video rounded-2xl overflow-hidden mb-16 border ${border}`}
        >
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.name}
              className={`w-full h-full object-cover ${dark ? '' : 'grayscale'}`}
            />
          ) : (
            <div className={`w-full h-full flex items-center justify-center ${cardBg}`}>
              <div className="grid grid-cols-6 gap-2 opacity-10">
                {Array(18).fill(0).map((_, i) => (
                  <div key={i} className={`w-10 h-7 rounded ${dark ? 'bg-white' : 'bg-black'}`} />
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Content grid ── */}
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">

          {/* Left — main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2 space-y-10"
          >
            {/* Overview */}
            <div>
              <h2 className={`text-xs font-bold tracking-widest uppercase mb-4 ${muted}`}>Overview</h2>
              <p className={`text-sm leading-relaxed ${tc}`}>{details.overview}</p>
            </div>

            {/* Divider */}
            <div className={`w-full h-px ${dark ? 'bg-white/[0.07]' : 'bg-black/[0.07]'}`} />

            {/* Challenges */}
            <div>
              <h2 className={`text-xs font-bold tracking-widest uppercase mb-4 ${muted}`}>Challenges</h2>
              <p className={`text-sm leading-relaxed ${tc}`}>{details.challenges}</p>
            </div>

            {/* Divider */}
            <div className={`w-full h-px ${dark ? 'bg-white/[0.07]' : 'bg-black/[0.07]'}`} />

            {/* Features */}
            <div>
              <h2 className={`text-xs font-bold tracking-widest uppercase mb-5 ${muted}`}>Key Features</h2>
              <ul className="space-y-3">
                {details.features.map((feat, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
                    <span className={`text-sm leading-relaxed ${tc}`}>{feat}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Gallery — tampil kalau ada images */}
            {details.images && details.images.length > 0 && (
              <>
                <div className={`w-full h-px ${dark ? 'bg-white/[0.07]' : 'bg-black/[0.07]'}`} />
                <div>
                  <h2 className={`text-xs font-bold tracking-widest uppercase mb-5 ${muted}`}>Gallery</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {details.images.map((src, i) => (
                      <div key={i} className={`aspect-video rounded-xl overflow-hidden border ${border}`}>
                        <img
                          src={src}
                          alt={`${project.name} screenshot ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </motion.div>

          {/* Right — sidebar info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >

            {/* Info card */}
            <div className={`rounded-2xl border p-6 space-y-5 ${cardBg} ${border}`}>

              {/* Role */}
              <div className="flex items-start gap-3">
                <FiUser size={14} className={`mt-0.5 shrink-0 ${muted}`} />
                <div>
                  <p className={`text-[10px] font-semibold tracking-widest uppercase mb-1 ${muted}`}>Role</p>
                  <p className={`text-xs font-medium ${tc}`}>{details.role}</p>
                </div>
              </div>

              <div className={`w-full h-px ${dark ? 'bg-white/[0.07]' : 'bg-black/[0.07]'}`} />

              {/* Year */}
              <div className="flex items-start gap-3">
                <FiCalendar size={14} className={`mt-0.5 shrink-0 ${muted}`} />
                <div>
                  <p className={`text-[10px] font-semibold tracking-widest uppercase mb-1 ${muted}`}>Periode</p>
                  <p className={`text-xs font-medium ${tc}`}>{details.year}</p>
                </div>
              </div>

              <div className={`w-full h-px ${dark ? 'bg-white/[0.07]' : 'bg-black/[0.07]'}`} />

              {/* Stack */}
              <div className="flex items-start gap-3">
                <FiLayers size={14} className={`mt-0.5 shrink-0 ${muted}`} />
                <div>
                  <p className={`text-[10px] font-semibold tracking-widest uppercase mb-2 ${muted}`}>Tech Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span key={tech}
                        className={`text-[10px] font-medium tracking-widest uppercase border rounded px-2 py-0.5 ${techBg}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between w-full border rounded-xl px-4 py-3 text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${linkBtn} border`}
                >
                  <span className="flex items-center gap-2">
                    <FiGithub size={14} />
                    GitHub Repository
                  </span>
                  <FiExternalLink size={11} />
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between w-full border rounded-xl px-4 py-3 text-xs font-semibold tracking-widest uppercase transition-all duration-200 ${
                    dark
                      ? 'bg-white text-black border-white hover:bg-gray-100'
                      : 'bg-black text-white border-black hover:bg-gray-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FiExternalLink size={14} />
                    Live Demo
                  </span>
                  <FiExternalLink size={11} />
                </a>
              )}
            </div>

            {/* Other projects */}
            <div>
              <p className={`text-[10px] font-semibold tracking-widest uppercase mb-4 ${muted}`}>Other Projects</p>
              <div className="space-y-2">
                {projects
                  .filter((p) => p.slug !== slug)
                  .slice(0, 4)
                  .map((p) => (
                    <Link
                      key={p.slug}
                      to={`/projects/${p.slug}`}
                      className={`flex items-center justify-between w-full border rounded-xl px-4 py-3 transition-all duration-200 group ${border} ${cardBg} hover:border-opacity-50`}
                    >
                      <span className={`text-[11px] font-medium tracking-wide ${tc}`}>{p.name}</span>
                      <FiArrowLeft size={11} className={`rotate-180 ${muted} group-hover:translate-x-1 transition-transform duration-200`} />
                    </Link>
                  ))}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  )
}
