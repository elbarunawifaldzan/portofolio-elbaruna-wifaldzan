import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useT } from '../i18n/LangContext'

const FIRST = 'ELBARUNA\u00A0\u00A0\u00A0\u00A0'
const LAST  = 'WIFALDZAN\u00A0\u00A0\u00A0\u00A0'

function MarqueeRow({ text, duration = 20, dark }) {
  const color = dark ? 'text-white' : 'text-black'
  const repeated = Array(10).fill(text)
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      {[0, 1].map((copy) => (
        <motion.span
          key={copy}
          aria-hidden={copy === 1}
          className={`flex shrink-0 whitespace-nowrap font-black uppercase tracking-tight ${color}`}
          style={{ fontSize: 'clamp(4rem, 13vw, 10rem)', lineHeight: 1 }}
          initial={{ x: 0 }}
          animate={{ x: '-50%' }}
          transition={{ duration, ease: 'linear', repeat: Infinity }}
        >
          {repeated.map((t, i) => <span key={i} className="mx-6">{t}</span>)}
          {repeated.map((t, i) => <span key={`b${i}`} className="mx-6">{t}</span>)}
        </motion.span>
      ))}
    </div>
  )
}

function Typewriter({ dark }) {
  const t = useT('hero')
  const words = t('typewriter')
  const [roleIdx, setRoleIdx]     = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting]   = useState(false)
  const [paused, setPaused]       = useState(false)

  useEffect(() => {
    const current = words[roleIdx]
    if (paused) {
      const id = setTimeout(() => { setPaused(false); setDeleting(true) }, 1800)
      return () => clearTimeout(id)
    }
    if (!deleting && displayed.length < current.length) {
      const id = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60)
      return () => clearTimeout(id)
    }
    if (!deleting && displayed.length === current.length) { setPaused(true); return }
    if (deleting && displayed.length > 0) {
      const id = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 35)
      return () => clearTimeout(id)
    }
    if (deleting && displayed.length === 0) { setDeleting(false); setRoleIdx((i) => (i + 1) % words.length) }
  }, [displayed, deleting, paused, roleIdx, words])

  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={`text-lg sm:text-xl md:text-2xl font-semibold tracking-wide mt-2 h-8 ${dark ? 'text-gray-400' : 'text-gray-500'}`}
    >
      {displayed}
      <span className={`inline-block w-0.5 h-5 ml-0.5 align-middle animate-pulse ${dark ? 'bg-gray-400' : 'bg-gray-500'}`} />
    </motion.p>
  )
}

// Badge floating
function Badge({ label, emoji, delay, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={`absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
        bg-white/90 backdrop-blur-sm text-black shadow-lg shadow-black/20 whitespace-nowrap ${className}`}
    >
      <span>{emoji}</span>
      <span>{label}</span>
    </motion.div>
  )
}

export default function Hero({ dark }) {
  const tr  = useT('hero')
  const bg  = dark ? 'bg-black' : 'bg-white'
  const tc  = dark ? 'text-white' : 'text-black'

  return (
    <section id="hero" className={`relative min-h-screen flex flex-col overflow-hidden ${bg} transition-colors duration-300`}>

      {/* Dot Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: dark
            ? 'radial-gradient(circle, rgba(255,255,255,0.2) 2px, transparent 2px)'
            : 'radial-gradient(circle, rgba(0,0,0,0.15) 2px, transparent 2px)',
          backgroundSize: '28px 28px',
          zIndex: 1,
        }}
      />

      {/* Marquee background */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none overflow-hidden gap-4 opacity-[0.045]" style={{ zIndex: 2 }}>
        <MarqueeRow text={FIRST} duration={40} dark={dark} />
        <MarqueeRow text={LAST}  duration={55} dark={dark} />
      </div>

      {/* ── DESKTOP (lg+) ── */}
      <div className="hidden lg:flex relative flex-col w-full min-h-screen" style={{ zIndex: 3 }}>

        {/* Heading — top center */}
        <div className="flex flex-col items-center text-center pt-20 px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`font-black leading-[0.88] tracking-tight text-4xl xl:text-5xl ${tc}`}
          >
            I'm Elbaruna Wifaldzan
          </motion.h1>
          <Typewriter dark={dark} />
        </div>

        {/* Center content: quote | image | stats — fills remaining space */}
        <div className="flex flex-1 items-end justify-between px-10 xl:px-16 pb-6 gap-4">

          {/* Left — Quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col justify-end w-[200px] xl:w-[240px] shrink-0 pb-4"
          >
            <span className={`text-5xl leading-none mb-2 ${dark ? 'text-white/40' : 'text-black/30'}`}>"</span>
            <p className={`text-sm xl:text-base leading-relaxed italic font-medium ${dark ? 'text-white' : 'text-black'}`}>
              {tr('quote')}
            </p>
            <p className={`text-xs xl:text-sm font-bold tracking-widest uppercase mt-3 ${dark ? 'text-white' : 'text-black'}`}>
              — Kent Beck
            </p>
            <p className={`text-xs tracking-wide mt-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              {tr('quoteAuthor')}
            </p>
          </motion.div>

          {/* Center — Image with badges */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex-1 flex justify-center items-end max-w-xl mx-auto"
          >
            {/* Semi-circle bg */}
            <div
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full w-[340px] xl:w-[420px] h-[280px] xl:h-[340px]
                ${dark ? 'bg-white/[0.06]' : 'bg-black/[0.05]'}`}
            />

            {/* Badges */}
            <Badge label="Innovative" emoji="💡" delay={0.8}
              className="top-2 left-1/2 -translate-x-1/2" />
            <Badge label="Creative"   emoji="🎨" delay={0.9}
              className="bottom-[42%] left-[8%]" />
            <Badge label="Problem Solver" emoji="🧩" delay={1.0}
              className="bottom-[42%] right-[6%]" />

            {/* Hero image */}
            <motion.img
              src={dark ? '/img/Hero/Hero4.png' : '/img/Hero/Hero3.png'}
              alt="Elbaruna Wifaldzan"
              className="relative z-10 w-[280px] xl:w-[360px] object-contain drop-shadow-2xl"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
            />
          </motion.div>

          {/* Right — Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col justify-end w-[160px] xl:w-[180px] shrink-0 items-end text-right pb-4"
          >
            <p className={`text-6xl xl:text-7xl font-black leading-none ${dark ? 'text-white' : 'text-black'}`}>4+</p>
            <p className={`text-sm font-bold tracking-widest uppercase mt-2 ${dark ? 'text-white' : 'text-black'}`}>Years</p>
            <p className={`text-sm font-bold tracking-widest uppercase ${dark ? 'text-white' : 'text-black'}`}>Coding</p>
            <p className={`text-sm font-bold tracking-widest uppercase ${dark ? 'text-white' : 'text-black'}`}>Experience</p>
            <div className={`w-8 h-px mt-4 ${dark ? 'bg-white/20' : 'bg-black/20'}`} />
          </motion.div>
        </div>
      </div>

      {/* ── TABLET (md–lg) ── */}
      <div className="hidden md:flex lg:hidden relative flex-col w-full min-h-screen" style={{ zIndex: 3 }}>
        {/* Heading */}
        <div className="flex flex-col items-center text-center pt-20 px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`font-black leading-[0.88] tracking-tight text-3xl md:text-4xl ${tc}`}
          >
            I'm Elbaruna Wifaldzan
          </motion.h1>
          <Typewriter dark={dark} />
        </div>

        <div className="flex flex-1 items-end justify-between px-8 pb-16 gap-4">
          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col justify-end w-[160px] shrink-0 pb-2"
          >
            <span className={`text-4xl leading-none mb-2 ${dark ? 'text-white/40' : 'text-black/30'}`}>"</span>
            <p className={`text-xs leading-relaxed italic font-medium ${dark ? 'text-white' : 'text-black'}`}>
              {tr('quote')}
            </p>
            <p className={`text-[10px] font-bold tracking-widest uppercase mt-2 ${dark ? 'text-white' : 'text-black'}`}>
              — Kent Beck
            </p>
            <p className={`text-[10px] tracking-wide mt-0.5 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              {tr('quoteAuthor')}
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative flex-1 flex justify-center items-end"
          >
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full w-[260px] h-[220px]
              ${dark ? 'bg-white/[0.06]' : 'bg-black/[0.05]'}`} />
            <Badge label="Innovative" emoji="💡" delay={0.8} className="top-4 left-1/2 -translate-x-1/2" />
            <Badge label="Creative"   emoji="🎨" delay={0.9} className="bottom-[45%] left-[4%]" />
            <Badge label="Problem Solver" emoji="🧩" delay={1.0} className="bottom-[45%] right-[2%]" />
            <motion.img
              src={dark ? '/img/Hero/Hero4.png' : '/img/Hero/Hero3.png'}
              alt="Elbaruna Wifaldzan"
              className="relative z-10 w-[220px] object-contain"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
            />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col justify-end w-[120px] shrink-0 items-end text-right pb-2"
          >
            <p className={`text-5xl font-black leading-none ${dark ? 'text-white' : 'text-black'}`}>4+</p>
            <p className={`text-xs font-bold tracking-widest uppercase mt-2 ${dark ? 'text-white' : 'text-black'}`}>Years</p>
            <p className={`text-xs font-bold tracking-widest uppercase ${dark ? 'text-white' : 'text-black'}`}>Coding</p>
            <p className={`text-xs font-bold tracking-widest uppercase ${dark ? 'text-white' : 'text-black'}`}>Experience</p>
          </motion.div>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="md:hidden relative flex flex-col w-full min-h-screen" style={{ zIndex: 3 }}>
        {/* Heading */}
        <div className="flex flex-col items-center text-center pt-20 px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`font-black leading-[0.9] tracking-tight text-2xl sm:text-3xl ${tc}`}
          >
            I'm Elbaruna Wifaldzan
          </motion.h1>
          <Typewriter dark={dark} />
        </div>

        {/* Image with badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative flex justify-center items-end mt-4 mx-4"
        >
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full w-[240px] h-[180px]
            ${dark ? 'bg-white/[0.06]' : 'bg-black/[0.05]'}`} />
          <Badge label="Innovative" emoji="💡" delay={0.8} className="top-0 left-1/2 -translate-x-1/2" />
          <Badge label="Creative"   emoji="🎨" delay={0.9} className="top-[35%] left-[2%]" />
          <Badge label="Problem Solver" emoji="🧩" delay={1.0} className="top-[35%] right-[1%]" />
          <motion.img
            src={dark ? '/img/Hero/Hero4.png' : '/img/Hero/Hero3.png'}
            alt="Elbaruna Wifaldzan"
            className="relative z-10 w-[200px] sm:w-[240px] object-contain"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
          />
        </motion.div>

        {/* Bottom row: quote + stats */}
        <div className="flex gap-3 px-4 mt-4 pb-28">
          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`flex-1 rounded-2xl p-4 border ${dark ? 'border-white/[0.07] bg-white/[0.03]' : 'border-black/[0.07] bg-black/[0.02]'}`}
          >
            <span className={`text-2xl leading-none ${dark ? 'text-white/30' : 'text-black/20'}`}>"</span>
            <p className={`text-[11px] leading-relaxed italic font-medium mt-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
              {tr('quote')}
            </p>
            <p className={`text-[10px] font-bold tracking-widest uppercase mt-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              — Kent Beck
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className={`w-[110px] shrink-0 rounded-2xl p-4 border flex flex-col justify-center items-center text-center
              ${dark ? 'border-white/[0.07] bg-white/[0.03]' : 'border-black/[0.07] bg-black/[0.02]'}`}
          >
            <p className={`text-4xl font-black leading-none ${dark ? 'text-white' : 'text-black'}`}>4+</p>
            <p className={`text-[10px] font-bold tracking-widest uppercase mt-1 ${dark ? 'text-white' : 'text-black'}`}>Years</p>
            <p className={`text-[10px] font-bold tracking-widest uppercase ${dark ? 'text-white' : 'text-black'}`}>Coding</p>
            <p className={`text-[10px] font-bold tracking-widest uppercase ${dark ? 'text-white' : 'text-black'}`}>Experience</p>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className={`w-px h-12 bg-gradient-to-b ${dark ? 'from-white/20' : 'from-black/20'} to-transparent`}
        />
      </motion.div>
    </section>
  )
}
