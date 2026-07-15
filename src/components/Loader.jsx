import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onDone }) {
  const [count, setCount] = useState(0)
  const [exit, setExit] = useState(false)

  // Count up 0 → 100
  useEffect(() => {
    let start = null
    const duration = 2000 // ms

    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * 100))
      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        // pause a beat then exit
        setTimeout(() => {
          setExit(true)
          setTimeout(onDone, 800)
        }, 300)
      }
    }

    requestAnimationFrame(step)
  }, [onDone])

  return (
    <AnimatePresence>
      {!exit ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Name */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] font-semibold tracking-[0.3em] uppercase text-gray-500 mb-6"
          >
            Elbaruna Wifaldzan
          </motion.p>

          {/* Counter */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="font-black text-[clamp(5rem,18vw,12rem)] leading-none text-white tabular-nums"
          >
            {count}
          </motion.span>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
            <motion.div
              className="h-full bg-white origin-left"
              style={{ scaleX: count / 100 }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </motion.div>
      ) : (
        // Curtain slide up on exit
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[100] bg-black"
          initial={{ y: 0 }}
          animate={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </AnimatePresence>
  )
}
