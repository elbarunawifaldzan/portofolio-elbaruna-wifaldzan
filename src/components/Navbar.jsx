import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon, FiUser, FiBriefcase, FiCode, FiMail, FiHome } from 'react-icons/fi'
import { MdTranslate } from 'react-icons/md'
import { useT, useLang } from '../i18n/LangContext'

export default function Navbar({ dark, onToggleDark, lang, onToggleLang }) {
  const [scrolled, setScrolled]   = useState(false)
  const [hidden, setHidden]       = useState(false)
  const [lastY, setLastY]         = useState(0)
  const [activeNav, setActiveNav] = useState('home')
  const t = useT('nav')

  const links = [
    { key: 'about',      label: t('about'),      href: '#about' },
    { key: 'projects',   label: t('projects'),   href: '#projects' },
    { key: 'experience', label: t('experience'), href: '#experience' },
    { key: 'education',  label: t('education'),  href: '#education' },
    { key: 'contact',    label: t('contact'),    href: '#contact' },
  ]

  const mobileNav = [
    { key: 'home',       label: 'Home',           href: '#hero',       icon: FiHome },
    { key: 'about',      label: t('about'),       href: '#about',      icon: FiUser },
    { key: 'projects',   label: t('projects'),    href: '#projects',   icon: FiBriefcase },
    { key: 'experience', label: t('experience'),  href: '#experience', icon: FiCode },
    { key: 'contact',    label: t('contact'),     href: '#contact',    icon: FiMail },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > lastY && y > 120)
      setLastY(y)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastY])

  const iconBtn = `w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-200 ${
    dark
      ? 'border-white/10 text-gray-500 hover:border-white/30 hover:text-white'
      : 'border-black/10 text-gray-500 hover:border-black/30 hover:text-black'
  }`

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -80 : 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300
          ${scrolled
            ? dark ? 'bg-black/85 backdrop-blur-md border-b border-white/[0.06]'
                   : 'bg-white/90 backdrop-blur-md border-b border-black/[0.06]'
            : 'bg-transparent'}`}
      >
        <nav className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-14">
          {/* Logo */}
          <a href="#" className={`text-sm font-black tracking-widest uppercase transition-colors duration-300 ${dark ? 'text-white' : 'text-black'}`}>
            Elbaruna.W
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {links.map(({ key, label, href }) => (
              <li key={key}>
                <a href={href}
                  className={`text-[11px] font-medium tracking-widest uppercase transition-colors duration-200
                    ${dark ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'}`}>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Translate */}
            <button onClick={onToggleLang} aria-label="Toggle language" className={iconBtn}>
              <span className="flex items-center gap-0.5">
                <MdTranslate size={13} />
                <span className={`text-[9px] font-bold leading-none ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {lang === 'id' ? 'ID' : 'EN'}
                </span>
              </span>
            </button>

            {/* Dark/Light */}
            <button onClick={onToggleDark} aria-label="Toggle theme" className={iconBtn}>
              <AnimatePresence mode="wait" initial={false}>
                {dark ? (
                  <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <FiSun size={13} />
                  </motion.span>
                ) : (
                  <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <FiMoon size={13} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* CTA */}
            <a href="#contact"
              className={`hidden md:inline-flex items-center justify-center gap-2 px-5 py-2
                text-[11px] font-semibold tracking-widest uppercase rounded-full transition-all duration-200 ml-1
                ${dark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}`}>
              {t('hireMe')}
            </a>
          </div>
        </nav>
      </motion.header>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.nav
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto flex items-center gap-1 px-2 py-2 rounded-full shadow-2xl bg-[#1a1a1a] shadow-black/60"
        >
          {mobileNav.map(({ key, label, href, icon: Icon }) => {
            const isActive = activeNav === key
            return (
              <a key={key} href={href} onClick={() => setActiveNav(key)}
                className="relative flex flex-col items-center justify-center transition-all duration-200">
                <span className={`relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-full transition-all duration-300 ${isActive ? 'bg-white/10' : ''}`}>
                  {isActive && (
                    <motion.span layoutId="nav-bubble"
                      className="absolute inset-0 rounded-full bg-white/10"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }} />
                  )}
                  <Icon size={18} className={`relative z-10 transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span className={`relative z-10 text-[9px] font-semibold tracking-wider transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-600'}`}>
                    {label}
                  </span>
                </span>
              </a>
            )
          })}
        </motion.nav>
      </div>
    </>
  )
}
