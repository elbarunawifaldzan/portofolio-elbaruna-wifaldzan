import { motion } from 'framer-motion'
import { skills } from '../data/skills'

export default function Skills({ dark }) {
  const t = dark ? 'text-white' : 'text-black'
  const border = dark ? 'border-white/[0.07]' : 'border-black/[0.07]'
  const cardBg = dark
    ? 'bg-[#0a0a0a] border-white/[0.07] hover:border-white/20'
    : 'bg-[#f5f5f5] border-black/[0.07] hover:border-black/20'
  const nameText = dark ? 'text-gray-500 group-hover:text-gray-300' : 'text-gray-400 group-hover:text-gray-600'

  return (
    <section id="skills" className="section">
      <div className={`border-t ${border} mb-20`} />

      <div className="mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
          className={`text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none ${t}`}
        >
          Tech Stack
        </motion.h2>
      </div>

      {/* Categories */}
      <div className="space-y-12">
        {skills.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: gi * 0.08 }}
          >
            {/* Category label */}
            <p className="label mb-5">{group.category}</p>

            {/* Icon grid */}
            <div className="flex flex-wrap gap-3">
              {group.items.map((skill, si) => {
                const Icon = skill.icon
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: gi * 0.08 + si * 0.05 }}
                    whileHover={{ y: -4 }}
                    className={`group flex flex-col items-center gap-2 p-4 border rounded-2xl cursor-default transition-all duration-200 w-[80px] ${cardBg}`}
                  >
                    <Icon
                      size={28}
                      style={{ color: dark ? skill.color : skill.color }}
                      className="transition-transform duration-200 group-hover:scale-110"
                    />
                    <span className={`text-[9px] font-semibold tracking-widest uppercase text-center transition-colors duration-200 leading-tight ${nameText}`}>
                      {skill.name}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
