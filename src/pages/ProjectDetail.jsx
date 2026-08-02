import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiArrowLeft, FiGithub, FiExternalLink,
  FiCalendar, FiUser, FiLayers,
  FiX, FiChevronLeft, FiChevronRight, FiImage,
} from 'react-icons/fi'
import { projects } from '../data/projects'

// ── Lightbox ──────────────────────────────────────────────
function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex)

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length)
  const next = () => setIdx((i) => (i + 1) % images.length)

  // keyboard navigation
  const handleKey = (e) => {
    if (e.key === 'ArrowLeft')  prev()
    if (e.key === 'ArrowRight') next()
    if (e.key === 'Escape')     onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      onKeyDown={handleKey}
      tabIndex={0}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close"
      >
        <FiX size={18} />
      </button>

      {/* Counter */}
      <p className="absolute top-6 left-1/2 -translate-x-1/2 text-[11px] font-semibold tracking-widest uppercase text-white/50">
        {idx + 1} / {images.length}
      </p>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev() }}
          className="absolute left-4 md:left-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Previous image"
        >
          <FiChevronLeft size={20} />
        </button>
      )}

      {/* Image */}
      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2 }}
        className="max-w-5xl max-h-[80vh] w-full mx-16 md:mx-24"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[idx]}
          alt={`Screenshot ${idx + 1}`}
          className="w-full h-full object-contain rounded-xl"
        />
      </motion.div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next() }}
          className="absolute right-4 md:right-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Next image"
        >
          <FiChevronRight size={20} />
        </button>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setIdx(i) }}
              className={`w-12 h-8 rounded overflow-hidden border-2 transition-all duration-200 ${
                i === idx ? 'border-white opacity-100' : 'border-white/20 opacity-40 hover:opacity-70'
              }`}
              aria-label={`Go to image ${i + 1}`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  )
}

// ── Main page ─────────────────────────────────────────────
export default function ProjectDetail({ dark }) {
  const { slug }              = useParams()
  const project               = projects.find((p) => p.slug === slug)
  const [lightboxIdx, setLightboxIdx] = useState(null) // null = tutup

  const bg      = dark ? 'bg-black'              : 'bg-white'
  const tc      = dark ? 'text-white'            : 'text-black'
  const muted   = dark ? 'text-gray-500'         : 'text-gray-400'
  const border  = dark ? 'border-white/[0.07]'   : 'border-black/[0.07]'
  const cardBg  = dark ? 'bg-[#0a0a0a]'          : 'bg-[#f5f5f5]'
  const techBg  = dark ? 'border-white/[0.08] text-gray-500' : 'border-black/[0.08] text-gray-400'
  const badge   = dark ? 'border-white/20 text-gray-400'     : 'border-black/20 text-gray-500'
  const linkBtn = dark
    ? 'border-white/10 text-gray-400 hover:border-white/40 hover:text-white'
    : 'border-black/10 text-gray-500 hover:border-black/40 hover:text-black'
  const dotColor = dark ? 'bg-white' : 'bg-black'
  const divider  = dark ? 'bg-white/[0.07]'      : 'bg-black/[0.07]'

  // 404
  if (!project) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center ${bg} ${tc}`}>
        <p className="text-6xl font-black mb-4">404</p>
        <p className={`text-sm mb-8 ${muted}`}>Project tidak ditemukan.</p>
        <Link
          to="/"
          className={`flex items-center gap-2 text-xs font-semibold tracking-widest uppercase border rounded-full px-5 py-2 transition-all duration-200 ${linkBtn} border`}
        >
          <FiArrowLeft size={13} />
          Kembali
        </Link>
      </div>
    )
  }

  const { details } = project
  const hasImages   = details.images && details.images.length > 0

  return (
    <>
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            images={details.images}
            startIndex={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
          />
        )}
      </AnimatePresence>

      <div className={`min-h-screen ${bg} transition-colors duration-300`}>
        <div className="max-w-screen-lg mx-auto px-6 md:px-12 lg:px-20 pt-28 pb-24">

          {/* Back */}
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
            <span className={`inline-block text-[10px] font-medium tracking-widest uppercase border rounded-full px-3 py-0.5 mb-4 ${badge}`}>
              {project.category}
            </span>
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-6 ${tc}`}>
              {project.name}
            </h1>
            <p className={`text-base leading-relaxed max-w-2xl ${muted}`}>
              {project.description}
            </p>
          </motion.div>

          {/* ── Thumbnail ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className={`w-full aspect-video rounded-2xl overflow-hidden mb-16 border ${border} ${project.thumbnail ? 'cursor-zoom-in' : ''}`}
            onClick={() => {
              // klik thumbnail buka lightbox di index 0 jika ada images
              if (project.thumbnail && hasImages) setLightboxIdx(0)
            }}
          >
            {project.thumbnail ? (
              <img
                src={project.thumbnail}
                alt={project.name}
                className={`w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02] ${dark ? '' : 'grayscale hover:grayscale-0'}`}
              />
            ) : (
              <div className={`w-full h-full flex flex-col items-center justify-center gap-3 ${cardBg}`}>
                <FiImage size={32} className={`${muted} opacity-30`} />
                <p className={`text-[10px] font-semibold tracking-widest uppercase ${muted} opacity-40`}>
                  Thumbnail belum tersedia
                </p>
                <p className={`text-[9px] tracking-wide ${muted} opacity-25`}>
                  Taruh file di: public/img/projects/{project.slug}/thumbnail.jpg
                </p>
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

              <div className={`w-full h-px ${divider}`} />

              {/* Challenges */}
              <div>
                <h2 className={`text-xs font-bold tracking-widest uppercase mb-4 ${muted}`}>Challenges</h2>
                <p className={`text-sm leading-relaxed ${tc}`}>{details.challenges}</p>
              </div>

              <div className={`w-full h-px ${divider}`} />

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

              {/* Gallery */}
              <div className={`w-full h-px ${divider}`} />
              <div>
                <h2 className={`text-xs font-bold tracking-widest uppercase mb-5 ${muted}`}>
                  Gallery
                  {hasImages && (
                    <span className={`ml-2 font-normal normal-case tracking-normal text-[10px] ${muted}`}>
                      — klik gambar untuk memperbesar
                    </span>
                  )}
                </h2>

                {hasImages ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {details.images.map((src, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.07 }}
                        className={`aspect-video rounded-xl overflow-hidden border cursor-zoom-in group relative ${border}`}
                        onClick={() => setLightboxIdx(i)}
                      >
                        <img
                          src={src}
                          alt={`${project.name} screenshot ${i + 1}`}
                          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${dark ? '' : 'grayscale group-hover:grayscale-0'}`}
                        />
                        {/* overlay hint */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30">
                          <FiImage size={20} className="text-white" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  /* Placeholder grid kalau belum ada gambar */
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`aspect-video rounded-xl border flex flex-col items-center justify-center gap-2 ${border} ${cardBg}`}
                      >
                        <FiImage size={20} className={`${muted} opacity-20`} />
                        <p className={`text-[9px] font-semibold tracking-widest uppercase ${muted} opacity-25`}>
                          {String(i + 1).padStart(2, '0')}.jpg
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Petunjuk path file */}
                {!hasImages && (
                  <p className={`text-[10px] mt-3 ${muted} opacity-40`}>
                    Taruh gambar di: <code className="font-mono">public/img/projects/{project.slug}/01.jpg</code>, <code className="font-mono">02.jpg</code>, dst — lalu update array <code className="font-mono">images</code> di <code className="font-mono">projects.js</code>
                  </p>
                )}
              </div>
            </motion.div>

            {/* Right — sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Info card */}
              <div className={`rounded-2xl border p-6 space-y-5 ${cardBg} ${border}`}>
                <div className="flex items-start gap-3">
                  <FiUser size={14} className={`mt-0.5 shrink-0 ${muted}`} />
                  <div>
                    <p className={`text-[10px] font-semibold tracking-widest uppercase mb-1 ${muted}`}>Role</p>
                    <p className={`text-xs font-medium ${tc}`}>{details.role}</p>
                  </div>
                </div>
                <div className={`w-full h-px ${divider}`} />
                <div className="flex items-start gap-3">
                  <FiCalendar size={14} className={`mt-0.5 shrink-0 ${muted}`} />
                  <div>
                    <p className={`text-[10px] font-semibold tracking-widest uppercase mb-1 ${muted}`}>Periode</p>
                    <p className={`text-xs font-medium ${tc}`}>{details.year}</p>
                  </div>
                </div>
                <div className={`w-full h-px ${divider}`} />
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

                {project.live ? (
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
                      {project.category === 'Mobile Apps' ? 'Live Mobile' : 'Live Website'}
                    </span>
                    <FiExternalLink size={11} />
                  </a>
                ) : (
                  <div
                    className={`flex items-center justify-between w-full border rounded-xl px-4 py-3 text-xs font-semibold tracking-widest uppercase cursor-not-allowed opacity-40 ${linkBtn} border`}
                  >
                    <span className="flex items-center gap-2">
                      <FiExternalLink size={14} />
                      {project.category === 'Mobile Apps' ? 'Live Mobile' : 'Live Website'}
                    </span>
                    <span className="text-[9px] normal-case font-normal tracking-normal">Coming Soon</span>
                  </div>
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
                        className={`flex items-center justify-between w-full border rounded-xl px-4 py-3 transition-all duration-200 group ${border} ${cardBg}`}
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
    </>
  )
}
