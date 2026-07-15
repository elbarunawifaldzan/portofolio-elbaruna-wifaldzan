import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlay, FiPause, FiMusic } from 'react-icons/fi'

export default function MusicPlayer({ dark }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.5
    audio.loop   = true

    // Try immediate autoplay
    const tryPlay = async () => {
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        // Browser blocked — wait for first user interaction anywhere on page
        const playOnInteraction = async () => {
          try {
            await audio.play()
            setPlaying(true)
          } catch {}
          // Remove all listeners after first success
          document.removeEventListener('click',     playOnInteraction)
          document.removeEventListener('touchstart', playOnInteraction)
          document.removeEventListener('keydown',   playOnInteraction)
          document.removeEventListener('scroll',    playOnInteraction)
        }
        document.addEventListener('click',     playOnInteraction, { once: true })
        document.addEventListener('touchstart', playOnInteraction, { once: true })
        document.addEventListener('keydown',   playOnInteraction, { once: true })
        document.addEventListener('scroll',    playOnInteraction, { once: true, passive: true })
      }
    }
    tryPlay()

    return () => {}
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play()
      setPlaying(true)
    }
  }

  const bg     = dark ? 'bg-black/80 border-white/10 text-white' : 'bg-white/90 border-black/10 text-black'
  const subTxt = dark ? 'text-gray-500' : 'text-gray-400'
  const btnBg  = dark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10'

  return (
    <>
      <audio ref={audioRef} src="/music/wonderwall.mp3" preload="auto" />

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed z-40 flex items-center gap-3 px-3 py-2 md:px-4 md:py-3
              backdrop-blur-md border rounded-2xl shadow-2xl ${bg}
              bottom-[110px] right-3
              md:bottom-6 md:right-6`}
            style={{ maxWidth: 220 }}
          >
            {/* Icon */}
            <div className={`relative flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ${btnBg}`}>
              <FiMusic size={15} />
              {/* Equalizer bars when playing */}
              {playing && (
                <span className="absolute -top-1 -right-1 flex gap-0.5 items-end h-3">
                  {[1, 2, 3].map((b) => (
                    <motion.span
                      key={b}
                      className={`w-0.5 rounded-full ${dark ? 'bg-white' : 'bg-black'}`}
                      animate={{ height: ['4px', '10px', '4px'] }}
                      transition={{ duration: 0.6, delay: b * 0.15, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  ))}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold truncate">Wonderwall</p>
              <p className={`text-[10px] truncate ${subTxt}`}>Oasis</p>
            </div>

            {/* Play / Pause */}
            <button
              onClick={toggle}
              aria-label={playing ? 'Pause' : 'Play'}
              className={`w-8 h-8 flex items-center justify-center rounded-full shrink-0 transition-all duration-200 ${btnBg}`}
            >
              {playing ? <FiPause size={13} /> : <FiPlay size={13} />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
