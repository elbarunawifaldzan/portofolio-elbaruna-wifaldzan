import { motion } from 'framer-motion'
import GridMotion from '../components/GridMotion'
import { certificates } from '../data/certificates'

export default function Certificates({ dark }) {
  const t     = dark ? 'text-white' : 'text-black'
  const muted = dark ? 'text-gray-500' : 'text-gray-400'

  return (
    <section id="certificates" className="py-10 md:py-14 overflow-hidden">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 max-w-screen-xl mx-auto mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-3 ${t}`}
        >
          Certificates
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
          className={`text-sm ${muted}`}
        >
          {certificates.length}+ sertifikat dari berbagai platform dan lembaga.
        </motion.p>
      </div>

      {/* Grid Motion */}
      <GridMotion items={certificates} dark={dark} />
    </section>
  )
}
