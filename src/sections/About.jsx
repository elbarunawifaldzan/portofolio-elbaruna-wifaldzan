import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import UnicornScene from 'unicornstudio-react'
import { useT } from '../i18n/LangContext'

export default function About({ dark }) {
  const tr = useT('about')
  const tc = dark ? 'text-white' : 'text-black'
  const body = dark ? 'text-gray-300' : 'text-gray-600'
  const muted = dark ? 'text-gray-500' : 'text-gray-400'
  const border = dark ? 'border-white/[0.07]' : 'border-black/[0.07]'
  const valueText = dark ? 'text-gray-300' : 'text-gray-700'
  const sceneWrapperRef = useRef(null)
  const sceneInnerRef = useRef(null)

  // Resize observer agar scene selalu mengisi container
  useEffect(() => {
    const wrapper = sceneWrapperRef.current
    const inner   = sceneInnerRef.current
    if (!wrapper || !inner) return

    const update = () => {
      const scale = wrapper.offsetWidth / 1440
      inner.style.transform = `scale(${scale})`
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(wrapper)
    return () => ro.disconnect()
  }, [])

  return (
    <section id="about" className="py-10 md:py-14 px-6 md:px-12 lg:px-20 max-w-screen-xl mx-auto">

      <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Unicorn Studio Scene */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full rounded-2xl overflow-hidden bg-black"
        >
          {/* Aspect ratio wrapper */}
          <div
            ref={sceneWrapperRef}
            style={{ position: 'relative', width: '100%', paddingTop: `${(900 / 1440) * 100}%` }}
          >
            <div
              ref={sceneInnerRef}
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '1440px',
                height: '900px',
                transformOrigin: 'top left',
              }}
            >
              <UnicornScene
                projectId="xMrfcc08K9Ia4fR4YUFb"
                width="1440px"
                height="900px"
                scale={1}
                dpi={1.5}
              />
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className={`text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-10 ${tc}`}
          >
            {tr('title')}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-4 mb-10"
          >
            <p className={`leading-relaxed text-base ${body}`}>
              Saya adalah Full Stack Web Developer dan Mobile Developer yang passionate terhadap pembuatan aplikasi web dan mobile modern, clean, dan performant. Saya percaya kode yang baik adalah yang mudah dibaca dan dipelihara.
            </p>
            <p className={`leading-relaxed text-sm ${muted}`}>
              Dengan pengalaman di React, React Native, Laravel, dan berbagai teknologi modern, saya fokus membangun solusi digital yang memberikan nilai nyata bagi pengguna.
            </p>
          </motion.div>

          {/* Info table */}
          <motion.div
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.25 }}
            className="space-y-0 mb-10"
          >
            {[
              { label: 'Location', value: 'Indonesia' },
              { label: 'Availability', value: 'Open to Work' },
              { label: 'Focus', value: 'Full Stack Web Development dan Mobile Developer' },
              { label: 'Education', value: 'Computer Science' },
            ].map(({ label, value }) => (
              <div key={label} className={`flex items-center justify-between py-3 border-b ${border}`}>
                <span className="label">{label}</span>
                <span className={`text-xs ${valueText}`}>{value}</span>
              </div>
            ))}
          </motion.div>

          <motion.a
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
            href="/dok/CV_Elbaruna Wifaldzan_Bahasa Indonesia.pdf"
            download="CV_Elbaruna Wifaldzan_Bahasa Indonesia.pdf"
            className={`inline-flex items-center justify-center px-7 py-2.5 text-[11px] font-semibold tracking-widest uppercase rounded-full transition-all duration-200
              ${dark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}
          >
            Download CV
          </motion.a>
        </div>
      </div>
    </section>
  )
}
