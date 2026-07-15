import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiTailwindcss,
  SiLaravel, SiNodedotjs, SiExpress,
  SiMysql, SiMongodb,
  SiGit, SiGithub, SiPostman, SiVscodium, SiFigma,
} from 'react-icons/si'

const row1 = [
  { icon: SiReact,       color: '#61DAFB' },
  { icon: SiNodedotjs,   color: '#5FA04E' },
  { icon: SiLaravel,     color: '#FF2D20' },
  { icon: SiTypescript,  color: '#3178C6' },
  { icon: SiTailwindcss, color: '#06B6D4' },
  { icon: SiMongodb,     color: '#47A248' },
  { icon: SiGithub,      color: '#FFFFFF' },
  { icon: SiFigma,       color: '#F24E1E' },
]

const row2 = [
  { icon: SiHtml5,       color: '#E34F26' },
  { icon: SiCss,         color: '#1572B6' },
  { icon: SiJavascript,  color: '#F7DF1E' },
  { icon: SiExpress,     color: '#FFFFFF' },
  { icon: SiMysql,       color: '#4479A1' },
  { icon: SiGit,         color: '#F05032' },
  { icon: SiPostman,     color: '#FF6C37' },
  { icon: SiVscodium,    color: '#007ACC' },
]

function IconItem({ icon: Icon, color, dark }) {
  const [hovered, setHovered] = useState(false)
  const defaultColor = dark ? '#4b5563' : '#d1d5db'

  return (
    <Icon
      size={44}
      className="shrink-0 cursor-default transition-all duration-300"
      style={{
        color: hovered ? color : defaultColor,
        transform: hovered ? 'scale(1.2)' : 'scale(1)',
        filter: hovered ? `drop-shadow(0 0 8px ${color}60)` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  )
}

function MarqueeRow({ items, reverse = false, dark }) {
  const quadrupled = [...items, ...items, ...items, ...items]

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex items-center gap-14"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 35, ease: 'linear', repeat: Infinity }}
        style={{ width: 'max-content' }}
      >
        {quadrupled.map((item, i) => (
          <IconItem key={i} icon={item.icon} color={item.color} dark={dark} />
        ))}
      </motion.div>
    </div>
  )
}

export default function SkillStrip({ dark }) {
  const border = dark ? 'border-white/[0.06]' : 'border-black/[0.06]'

  return (
    <div className={`border-t border-b ${border} py-8 flex flex-col gap-6 overflow-hidden`}>
      <MarqueeRow items={row1} reverse={false} dark={dark} />
      <MarqueeRow items={row2} reverse={true}  dark={dark} />
    </div>
  )
}
