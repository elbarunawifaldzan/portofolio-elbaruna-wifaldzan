import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { educations } from '../data/education'
import { FiBookOpen } from 'react-icons/fi'

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
      <div className={`absolute inset-0 ${dark ? 'bg-white/[0.07]' : 'bg-black/[0.07]'}`} />
      <motion.div
        className="absolute top-0 left-0 right-0 origin-top"
        style={{ scaleY, backgroundColor: lineColor, height: '100%' }}
      />
    </div>
  )
}

export default function Education({ dark }) {
  const t         = dark ? 'text-white' : 'text-black'
  const muted     = dark ? 'text-gray-500' : 'text-gray-400'
  const border    = dark ? 'border-white/[0.07]' : 'border-black/[0.07]'

  return (
    <section id="education" className="py-10 md:py-14 px-6 md:px-12 lg:px-20 max-w-screen-xl mx-auto">

      <motion.h2
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-12 ${t}`}
      >
        Education
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-16 items-start">

        {/* Left — Timeline */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-8"
          >
            <FiBookOpen size={14} className={muted} />
            <p className="label">Riwayat Pendidikan</p>
          </motion.div>

          <div className="relative">
            <AnimatedLine dark={dark} />
            <div className="space-y-10 pl-8">
              {educations.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative"
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className={`absolute -left-[34px] top-1.5 w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
                      i === 0
                        ? dark ? 'bg-white border-white' : 'bg-black border-black'
                        : dark ? 'bg-black border-white/30' : 'bg-white border-black/30'
                    }`}
                  />
                  <p className="label mb-1">{edu.year}</p>
                  <div className="flex items-center gap-3 mb-1">
                    {edu.logo && (
                      <img src={edu.logo} alt={edu.institution}
                        className="w-8 h-8 rounded-lg object-contain shrink-0" />
                    )}
                    <h3 className={`text-base font-bold uppercase tracking-wider ${t}`}>
                      {edu.degree}
                    </h3>
                  </div>
                  <p className={`text-xs font-semibold tracking-widest uppercase mb-2 ${muted}`}>
                    {edu.institution}
                  </p>
                  <p className={`text-xs leading-relaxed ${muted}`}>{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Photo */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="hidden lg:block"
        >
          <div className="aspect-[3/4] overflow-hidden rounded-2xl max-w-sm relative">
            <img
              src="/img/Education/img-06.jpeg"
              alt="Education"
              className={`w-full h-full object-cover transition-all duration-700 ${dark ? 'grayscale-0' : 'grayscale'}`}
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${dark ? 'from-black/60' : 'from-white/60'} via-transparent to-transparent`} />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
