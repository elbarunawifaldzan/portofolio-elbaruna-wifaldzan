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

// Typewriter component
function Typewriter({ dark }) {
  const t = useT('hero')
  const words = t('typewriter')
  const [roleIdx, setRoleIdx]   = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting]   = useState(false)
  const [paused, setPaused]       = useState(false)

  useEffect(() => {
    const current = words[roleIdx]

    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDeleting(true) }, 1800)
      return () => clearTimeout(t)
    }

    if (!deleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60)
      return () => clearTimeout(t)
    }

    if (!deleting && displayed.length === current.length) {
      setPaused(true)
      return
    }

    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 35)
      return () => clearTimeout(t)
    }

    if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIdx((i) => (i + 1) % words.length)
    }
  }, [displayed, deleting, paused, roleIdx, words])

  return (
    <motion.p
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={`text-xl md:text-2xl xl:text-3xl 2xl:text-4xl font-semibold tracking-wide mt-3 h-8 xl:h-10 2xl:h-12 ${dark ? 'text-gray-400' : 'text-gray-500'}`}
    >
      {displayed}
      {/* Blinking cursor */}
      <span className={`inline-block w-0.5 h-5 ml-0.5 align-middle animate-pulse ${dark ? 'bg-gray-400' : 'bg-gray-500'}`} />
    </motion.p>
  )
}

export default function Hero({ dark }) {
  const tr   = useT('hero')
  const bg   = dark ? 'bg-black' : 'bg-white'
  const tc   = dark ? 'text-white' : 'text-black'
  const body = dark ? 'text-gray-300' : 'text-gray-600'
  const border = dark ? 'border-white/[0.07]' : 'border-black/[0.07]'

  return (
    <section id="hero" className={`relative flex flex-col overflow-hidden ${bg} transition-colors duration-300`}>

      {/* ── Dot Grid ── */}
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

      {/* ── Marquee Background ── */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none select-none overflow-hidden gap-4 opacity-[0.045]" style={{ zIndex: 2 }}>
        <MarqueeRow text={FIRST} duration={40} dark={dark} />
        <MarqueeRow text={LAST}  duration={55} dark={dark} />
      </div>

      {/* ── Main layout: content top, image center ── */}
      <div className="relative flex flex-col items-center w-full pt-20 pb-8 lg:pb-12 2xl:pb-16" style={{ zIndex: 3 }}>

        {/* Text content — top center */}
        <div className="flex flex-col items-center text-center px-4 sm:px-6 mb-2 md:mb-4 xl:mb-6 2xl:mb-8">

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`font-black leading-[0.88] tracking-tight
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl ${tc}`}
          >
            I'm Elbaruna Wifaldzan
          </motion.h1>

          <Typewriter dark={dark} />
        </div>

        {/* Image + side text row — desktop: 3 kolom, mobile: 1 kolom */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          {/* Desktop layout: quote | image | stats */}
          <div className="hidden lg:flex items-end justify-between w-full px-12 xl:px-16 2xl:px-24 gap-4 xl:gap-8">
            {/* Left — Quote */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col justify-end w-[200px] xl:w-[260px] 2xl:w-[320px] pb-8 2xl:pb-12 shrink-0"
            >
              <span className={`text-5xl xl:text-6xl 2xl:text-7xl leading-none mb-2 ${dark ? 'text-white/40' : 'text-black/30'}`}>"</span>
              <p className={`text-sm xl:text-base 2xl:text-lg leading-relaxed italic font-medium ${dark ? 'text-white' : 'text-black'}`}>
                {tr('quote')}
              </p>
              <p className={`text-xs xl:text-sm 2xl:text-base font-bold tracking-widest uppercase mt-3 ${dark ? 'text-white' : 'text-black'}`}>
                — Kent Beck
              </p>
              <p className={`text-xs xl:text-sm tracking-wide mt-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                {tr('quoteAuthor')}
              </p>
            </motion.div>

            {/* Image */}
            <div className="relative w-full max-w-sm xl:max-w-xl 2xl:max-w-2xl rounded-3xl shrink-0 mx-auto">
              <motion.img
                src={dark ? '/img/Hero/Hero4.png' : '/img/Hero/Hero3.png'}
                alt="Elbaruna Wifaldzan"
                className="w-full object-cover rounded-3xl"
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
              />
            </div>

            {/* Right — Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-col justify-end w-[160px] xl:w-[220px] 2xl:w-[280px] pb-8 2xl:pb-12 shrink-0 items-end text-right"
            >
              <p className={`text-6xl xl:text-8xl 2xl:text-9xl font-black leading-none ${dark ? 'text-white' : 'text-black'}`}>4+</p>
              <p className={`text-sm xl:text-base 2xl:text-lg font-bold tracking-widest uppercase mt-2 ${dark ? 'text-white' : 'text-black'}`}>Years</p>
              <p className={`text-sm xl:text-base 2xl:text-lg font-bold tracking-widest uppercase ${dark ? 'text-white' : 'text-black'}`}>Coding</p>
              <p className={`text-sm xl:text-base 2xl:text-lg font-bold tracking-widest uppercase ${dark ? 'text-white' : 'text-black'}`}>Experience</p>
              <div className={`w-8 xl:w-12 h-px mt-4 ${dark ? 'bg-white/20' : 'bg-black/20'}`} />
            </motion.div>
          </div>

          {/* Tablet layout (md–lg): image + stats side by side */}
          <div className="hidden md:flex lg:hidden flex-col items-center w-full px-8 gap-6 pb-24">
            <div className="flex items-end gap-6 w-full max-w-2xl mx-auto">
              {/* Image */}
              <div className="flex-1 rounded-2xl overflow-hidden">
                <motion.img
                  src={dark ? '/img/Hero/Hero4.png' : '/img/Hero/Hero3.png'}
                  alt="Elbaruna Wifaldzan"
                  className="w-full object-cover rounded-2xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
                />
              </div>
              {/* Stats + Quote stacked */}
              <div className="flex flex-col gap-4 w-[160px] shrink-0 pb-4">
                <div className={`rounded-2xl p-4 border ${dark ? 'border-white/[0.07] bg-white/[0.03]' : 'border-black/[0.07] bg-black/[0.02]'}`}>
                  <p className={`text-5xl font-black leading-none ${dark ? 'text-white' : 'text-black'}`}>4+</p>
                  <p className={`text-xs font-bold tracking-widest uppercase mt-1 ${dark ? 'text-white' : 'text-black'}`}>Years Coding</p>
                  <p className={`text-xs font-bold tracking-widest uppercase ${dark ? 'text-white' : 'text-black'}`}>Experience</p>
                </div>
                <div className={`rounded-2xl p-4 border ${dark ? 'border-white/[0.07] bg-white/[0.03]' : 'border-black/[0.07] bg-black/[0.02]'}`}>
                  <span className={`text-2xl leading-none ${dark ? 'text-white/30' : 'text-black/20'}`}>"</span>
                  <p className={`text-[10px] leading-relaxed italic font-medium mt-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {tr('quote')}
                  </p>
                  <p className={`text-[9px] font-bold tracking-widest uppercase mt-2 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                    — Kent Beck
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile layout: 1 kolom */}
          <div className="md:hidden flex flex-col items-center w-full px-4 gap-5 pb-24">
            {/* Image full width */}
            <div className="w-full max-w-xs mx-auto rounded-2xl overflow-hidden">
              <motion.img
                src={dark ? '/img/Hero/Hero4.png' : '/img/Hero/Hero3.png'}
                alt="Elbaruna Wifaldzan"
                className="w-full object-cover rounded-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
              />
            </div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className={`w-full rounded-2xl p-4 border ${dark ? 'border-white/[0.07] bg-white/[0.03]' : 'border-black/[0.07] bg-black/[0.02]'}`}
            >
              <span className={`text-3xl leading-none ${dark ? 'text-white/30' : 'text-black/20'}`}>"</span>
              <p className={`text-sm leading-relaxed italic font-medium mt-1 ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                {tr('quote')}
              </p>
              <p className={`text-[11px] font-bold tracking-widest uppercase mt-3 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                — Kent Beck
              </p>
              <p className={`text-[10px] tracking-wide mt-0.5 ${dark ? 'text-gray-600' : 'text-gray-400'}`}>
                {tr('quoteAuthor')}
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className={`w-full flex items-center justify-center gap-2 rounded-2xl p-4 border ${dark ? 'border-white/[0.07] bg-white/[0.03]' : 'border-black/[0.07] bg-black/[0.02]'}`}
            >
              <p className={`text-5xl font-black leading-none ${dark ? 'text-white' : 'text-black'}`}>4+</p>
              <div className="flex flex-col ml-3">
                <p className={`text-sm font-bold tracking-widest uppercase ${dark ? 'text-white' : 'text-black'}`}>Years</p>
                <p className={`text-sm font-bold tracking-widest uppercase ${dark ? 'text-white' : 'text-black'}`}>Coding</p>
                <p className={`text-sm font-bold tracking-widest uppercase ${dark ? 'text-white' : 'text-black'}`}>Experience</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats row */}
        
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
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
