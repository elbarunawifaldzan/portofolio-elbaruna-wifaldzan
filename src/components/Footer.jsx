import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiArrowUp } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const socials = [
  { icon: FiGithub,    href: 'https://github.com/elbarunawifaldzan',            label: 'GitHub' },
  { icon: FiLinkedin,  href: 'https://www.linkedin.com/in/elbaruna-wifaldzan/', label: 'LinkedIn' },
  { icon: FiInstagram, href: 'https://www.instagram.com/elbaruna_wifaldzan/',   label: 'Instagram' },
  { icon: FiMail,      href: 'mailto:elbarunawifaldzan@gmail.com',              label: 'Email' },
  { icon: FaWhatsapp,  href: 'https://wa.me/6283829794354',                     label: 'WhatsApp' },
]

const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education',  href: '#education' },
  { label: 'Contact',    href: '#contact' },
]

export default function Footer({ dark }) {
  const border  = dark ? 'border-white/[0.07]' : 'border-black/[0.07]'
  const t       = dark ? 'text-white' : 'text-black'
  const muted   = dark ? 'text-gray-600' : 'text-gray-400'
  const hover   = dark ? 'hover:text-white' : 'hover:text-black'
  const iconBtn = dark
    ? 'border-white/10 text-gray-600 hover:border-white/30 hover:text-white'
    : 'border-black/10 text-gray-400 hover:border-black/30 hover:text-black'
  const copy    = dark ? 'text-gray-800' : 'text-gray-300'

  return (
    <footer className={`border-t ${border} mt-16`}>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-3xl font-black uppercase tracking-tight mb-3 ${t}`}
            >
              Elbaruna<br />Wifaldzan
            </motion.h3>
            <p className={`text-xs leading-relaxed max-w-[200px] ${muted}`}>
              Full Stack Web Developer &amp; Mobile Developer based in Indonesia.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className={`label mb-5 ${muted}`}>Navigation</p>
            <ul className="space-y-3">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href}
                    className={`text-xs font-medium tracking-widest uppercase transition-colors duration-200 ${muted} ${hover}`}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className={`label mb-5 ${muted}`}>Get In Touch</p>
            <a href="mailto:elbarunawifaldzan@gmail.com"
              className={`text-xs font-medium mb-6 block transition-colors duration-200 ${muted} ${hover}`}>
              elbarunawifaldzan@gmail.com
            </a>
            <div className="flex items-center gap-3 mt-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-200 ${iconBtn}`}>
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={`border-t ${dark ? 'border-white/[0.04]' : 'border-black/[0.04]'}`}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 py-5 flex items-center justify-between gap-4">
          <p className={`text-[10px] tracking-widest uppercase ${copy}`}>
            © {new Date().getFullYear()} Elbaruna.W. All rights reserved.
          </p>
          <p className={`text-[10px] tracking-widest uppercase ${copy} hidden md:block`}>
            Built with React, Tailwind CSS &amp; Framer Motion
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-200 shrink-0 ${iconBtn}`}>
            <FiArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  )
}
