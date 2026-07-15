import { motion } from 'framer-motion'

export default function SectionTitle({ label, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <p className="label mb-3">{label}</p>
      <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none">
        {title}
      </h2>
    </motion.div>
  )
}
