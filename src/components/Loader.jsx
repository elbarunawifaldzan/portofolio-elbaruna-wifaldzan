import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GREETINGS = [
  { word: 'Hello',       lang: 'English',    country: 'US' },
  { word: 'Halo',        lang: 'Indonesian', country: 'ID' },
  { word: 'こんにちは',   lang: 'Japanese',   country: 'JP' },
  { word: '안녕하세요',   lang: 'Korean',     country: 'KR' },
  { word: 'Bonjour',     lang: 'French',     country: 'FR' },
  { word: 'مرحبا',       lang: 'Arabic',     country: 'SA' },
  { word: 'Hola',        lang: 'Spanish',    country: 'ES' },
  { word: 'Ciao',        lang: 'Italian',    country: 'IT' },
  { word: 'Olá',         lang: 'Portuguese', country: 'BR' },
  { word: '你好',         lang: 'Chinese',    country: 'CN' },
  { word: 'Привет',      lang: 'Russian',    country: 'RU' },
  { word: 'Namaste',     lang: 'Hindi',      country: 'IN' },
]

// Durasi tiap greeting tampil (ms)
const STEP_MS   = 450
// Total durasi loader sebelum exit
const TOTAL_MS  = STEP_MS * GREETINGS.length + 600

export default function Loader({ onDone }) {
  const [index, setIndex]   = useState(0)
  const [exit, setExit]     = useState(false)
  const [progress, setProgress] = useState(0)

  // Cycle through greetings
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      if (i < GREETINGS.length) {
        setIndex(i)
      } else {
        clearInterval(interval)
      }
    }, STEP_MS)
    return () => clearInterval(interval)
  }, [])

  // Smooth progress bar
  useEffect(() => {
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / TOTAL_MS, 1)
      setProgress(p)
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [])

  // Trigger exit after all greetings shown
  useEffect(() => {
    const timer = setTimeout(() => {
      setExit(true)
      setTimeout(onDone, 700)
    }, TOTAL_MS)
    return () => clearTimeout(timer)
  }, [onDone])

  const current = GREETINGS[index]

  return (
    <AnimatePresence>
      {!exit ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Greeting word */}
          <div className="relative flex flex-col items-center select-none">
            <AnimatePresence mode="wait">
              <motion.h1
                key={current.word}
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
                exit={{    opacity: 0, y: -24, filter: 'blur(8px)' }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="font-black text-white leading-none text-center"
                style={{ fontSize: 'clamp(3.5rem, 14vw, 9rem)' }}
              >
                {current.word}
              </motion.h1>
            </AnimatePresence>

            {/* Language label */}
            <AnimatePresence mode="wait">
              <motion.p
                key={current.lang}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{    opacity: 0, y: -8 }}
                transition={{ duration: 0.28, delay: 0.06 }}
                className="text-[11px] font-semibold tracking-[0.3em] uppercase text-gray-500 mt-4"
              >
                {current.lang}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Name watermark bottom left */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute bottom-8 left-6 md:left-12 text-[11px] font-semibold tracking-[0.3em] uppercase text-white/20"
          >
            Elbaruna Wifaldzan
          </motion.p>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
            <motion.div
              className="h-full bg-white origin-left"
              style={{ scaleX: progress }}
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[100] bg-black"
          initial={{ y: 0 }}
          animate={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </AnimatePresence>
  )
}
