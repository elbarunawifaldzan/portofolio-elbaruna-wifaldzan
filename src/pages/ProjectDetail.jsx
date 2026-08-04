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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-sm"
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
        aria-label="Tutup"
      >
        <FiX size={18} />
      </button>

      {/* Counter */}
      <p className="absolute top-6 left-1/2 -translate-x-1/2 text-[11px] font-semibold tracking-widest uppercase text-white/40">
        {idx + 1} / {images.length}
      </p>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev() }}
          className="absolute left-4 md:left-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Sebelumnya"
        >
          <FiChevronLeft size={20} />
        </button>
      )}

      {/* Main image */}
      <motion.div
        key={idx}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.18 }}
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
          aria-label="Berikutnya"
        >
          <FiChevronRight size={20} />
        </button>
      )}

      {/* Strip bawah */}
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setIdx(i) }}
              className={`shrink-0 w-14 h-9 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                i === idx ? 'border-white opacity-100' : 'border-white/20 opacity-40 hover:opacity-70'
              }`}
              aria-label={`Gambar ${i + 1}`}
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
  const { slug } = useParams()
  const project  = projects.find((p) => p.slug === slug)

  const bg      = dark ? 'bg-black'                : 'bg-white'
  const tc      = dark ? 'text-white'              : 'text-black'
  const muted   = dark ? 'text-gray-500'           : 'text-gray-400'
  const border  = dark ? 'border-white/[0.07]'     : 'border-black/[0.07]'
  const cardBg  = dark ? 'bg-[#0a0a0a]'            : 'bg-[#f5f5f5]'
  const techBg  = dark ? 'border-white/[0.08] text-gray-500' : 'border-black/[0.08] text-gray-400'
  const badge   = dark ? 'border-white/20 text-gray-400'     : 'border-black/20 text-gray-500'
  const linkBtn = dark
    ? 'border-white/10 text-gray-400 hover:border-white/40 hover:text-white'
    : 'border-black/10 text-gray-500 hover:border-black/40 hover:text-black'
  const dotColor = dark ? 'bg-white' : 'bg-black'
  const divider  = dark ? 'bg-white/[0.07]' : 'bg-black/[0.07]'

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

  // Kumpulkan semua gambar: thumbnail dulu, lalu images
  const allImages = [
    ...(project.thumbnail ? [project.thumbnail] : []),
    ...(details.images || []),
  ]
  const hasImages = allImages.length > 0

  // State gambar aktif & lightbox
  const [activeImg,   setActiveImg]   = useState(allImages[0] ?? null)
  const [lightboxIdx, setLightboxIdx] = useState(null)

  const openLightbox = () => {
    if (!activeImg) return
    const i = allImages.indexOf(activeImg)
    setLightboxIdx(i >= 0 ? i : 0)
  }

  return (
    <>
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            images={allImages}
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

          {/* ── Image viewer: gambar besar + strip bawah ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-16"
          >
            {/* Gambar utama */}
            <div
              className={`w-full aspect-video rounded-2xl overflow-hidden border mb-3 ${border} ${activeImg ? 'cursor-zoom-in' : ''}`}
              onClick={openLightbox}
            >
              {activeImg ? (
                <motion.img
                  key={activeImg}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  src={activeImg}
                  alt={project.name}
                  className={`w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500 ${dark ? '' : 'grayscale hover:grayscale-0'}`}
                />
              ) : (
                <div className={`w-full h-full flex flex-col items-center justify-center gap-3 ${cardBg}`}>
                  <FiImage size={32} className={`${muted} opacity-30`} />
                  <p className={`text-[10px] font-semibold tracking-widest uppercase ${muted} opacity-40`}>
                    Thumbnail belum tersedia
                  </p>
                  <p className={`text-[9px] tracking-wide ${muted} opacity-25`}>
                    public/img/projects/{project.slug}/thumbnail.jpg
                  </p>
                </div>
              )}
            </div>

            {/* Strip thumbnail horizontal di bawah */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                {allImages.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(src)}
                    className={`shrink-0 w-24 aspect-video rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      activeImg === src
                        ? dark ? 'border-white opacity-100' : 'border-black opacity-100'
                        : dark ? 'border-white/10 opacity-45 hover:opacity-75' : 'border-black/10 opacity-45 hover:opacity-75'
                    }`}
                    aria-label={`Lihat gambar ${i + 1}`}
                  >
                    <img
                      src={src}
                      alt={`${project.name} ${i + 1}`}
                      className={`w-full h-full object-cover ${dark ? '' : 'grayscale'}`}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Hint kalau belum ada gambar */}
            {!hasImages && (
              <p className={`text-[10px] mt-2 ${muted} opacity-35`}>
                Taruh gambar di <code className="font-mono">public/img/projects/{project.slug}/</code> lalu update <code className="font-mono">thumbnail</code> dan <code className="font-mono">images</code> di <code className="font-mono">projects.js</code>
              </p>
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

              {/* Video */}
              {details.video && (
                <>
                  <div className={`w-full h-px ${divider}`} />
                  <div>
                    <h2 className={`text-xs font-bold tracking-widest uppercase mb-5 ${muted}`}>Demo Video</h2>
                    <div className={`w-full aspect-video rounded-2xl overflow-hidden border ${border}`}>
                      <iframe
                        src={details.video}
                        title="Demo Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </>
              )}
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
                  <div className={`flex items-center justify-between w-full border rounded-xl px-4 py-3 text-xs font-semibold tracking-widest uppercase cursor-not-allowed opacity-40 ${linkBtn} border`}>
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
