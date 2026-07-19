import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { experiences } from '../data/experience'
import ShapeGrid from '../components/ShapeGrid'

// Animated vertical line that grows as user scrolls
function AnimatedLine({ dark }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])
  const lineColor = dark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)'

  return (
    <div ref={ref} className="absolute left-0 top-0 bottom-0 w-px overflow-hidden">
      {/* base faint line */}
      <div className={`absolute inset-0 ${dark ? 'bg-white/[0.07]' : 'bg-black/[0.07]'}`} />
      {/* animated fill */}
      <motion.div
        className="absolute top-0 left-0 right-0 origin-top"
        style={{ scaleY, backgroundColor: lineColor, height: '100%' }}
      />
    </div>
  )
}

export default function Experience({ dark }) {
  const t         = dark ? 'text-white' : 'text-black'
  const muted     = dark ? 'text-gray-500' : 'text-gray-400'
  const cardBg    = dark ? 'bg-[#0a0a0a] border-white/[0.07]' : 'bg-[#f5f5f5] border-black/[0.07]'
  const cardTitle = dark ? 'text-white' : 'text-black'
  const fade      = dark ? 'from-black/70' : 'from-white/70'
  const dotActive = dark ? 'bg-white border-white' : 'bg-black border-black'
  const dotInactive = dark ? 'bg-black border-white/30' : 'bg-white border-black/30'

  return (
    <section id="experience" className="relative py-10 md:py-14 px-6 md:px-12 lg:px-20 max-w-screen-xl mx-auto overflow-hidden">
      <ShapeGrid dark={dark} />
      <div className="relative z-10 grid lg:grid-cols-2 gap-10 md:gap-16 items-start">

        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative hidden lg:block"
        >
          <div className="aspect-[3/4] overflow-hidden rounded-2xl max-w-sm relative">
            <img
              src="/img/img-03.jpeg"
              alt="Experience"
              className={`w-full h-full object-cover transition-all duration-700 ${dark ? 'grayscale-0' : 'grayscale'}`}
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${fade} via-transparent to-transparent`} />
          </div>
          <div className="absolute bottom-8 left-6 right-6">
            <div className={`border rounded-2xl p-4 md:p-5 ${cardBg}`}>
              <p className="label mb-1">Currently</p>
              <p className={`text-sm font-bold uppercase tracking-wide ${cardTitle}`}>Full Stack Developer</p>
              <p className={`text-xs mt-0.5 ${muted}`}>Freelance · 2024 — Present</p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1 }}
            className={`text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-10 md:mb-12 ${t}`}
          >
            Experience
          </motion.h2>

          <div className="relative">
            <AnimatedLine dark={dark} />
            <div className="space-y-8 md:space-y-10 pl-8">
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative"
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className={`absolute -left-[34px] top-1.5 w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
                      i === 0 ? dotActive : dotInactive
                    }`}
                  />
                  <p className="label mb-1">{exp.year}</p>
                  <h3 className={`text-sm md:text-base font-bold uppercase tracking-wider mb-0.5 ${t}`}>
                    {exp.position}
                  </h3>
                  <p className={`text-[11px] font-semibold tracking-widest uppercase mb-2 ${muted}`}>
                    {exp.company}
                  </p>
                  <p className={`text-xs leading-relaxed ${muted}`}>{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
