import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiGithub, FiLinkedin, FiInstagram, FiCheck, FiAlertCircle, FiLoader } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import emailjs from '@emailjs/browser'
import ParticlesBg from '../components/ParticlesBg'

// ── EmailJS config ──────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_zrgstic'
const EMAILJS_TEMPLATE_ID = 'template_j4m7b7r'
const EMAILJS_PUBLIC_KEY  = '8GbPrVEHZquMcahZv'
// ────────────────────────────────────────────────────────────

// ── Anti-spam config ────────────────────────────────────────
const COOLDOWN_SECONDS  = 60        // detik antar pengiriman
const MAX_SENDS_PER_DAY = 5         // batas kirim per hari
const MIN_FILL_TIME_MS  = 3000      // minimal 3 detik mengisi form (anti-bot)
const STORAGE_KEY       = 'contact_sends'

function getStoredSends() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const arr = JSON.parse(raw)
    // Hapus data yang sudah lebih dari 24 jam
    const cutoff = Date.now() - 24 * 60 * 60 * 1000
    return arr.filter((ts) => ts > cutoff)
  } catch { return [] }
}

function recordSend() {
  const arr = [...getStoredSends(), Date.now()]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr))
}

// Sanitasi input: strip tag HTML & trim
function sanitize(str) {
  return str.replace(/<[^>]*>/g, '').trim()
}

// Validasi email format
const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/

const socials = [
  { icon: FiMail,      label: 'Email',     value: 'elbarunawifaldzan@gmail.com',        href: 'mailto:elbarunawifaldzan@gmail.com' },
  { icon: FiLinkedin,  label: 'LinkedIn',  value: 'linkedin.com/in/elbaruna-wifaldzan', href: 'https://www.linkedin.com/in/elbaruna-wifaldzan/' },
  { icon: FiGithub,    label: 'GitHub',    value: 'github.com/elbarunawifaldzan',       href: 'https://github.com/elbarunawifaldzan' },
  { icon: FaWhatsapp,  label: 'WhatsApp',  value: '+62 838-2979-4354',                  href: 'https://wa.me/6283829794354' },
  { icon: FiInstagram, label: 'Instagram', value: '@elbaruna_wifaldzan',                href: 'https://www.instagram.com/elbaruna_wifaldzan/' },
]

export default function Contact({ dark }) {
  const formRef     = useRef(null)
  const formStartTs = useRef(null)               // kapan form mulai diisi
  const [form, setForm]         = useState({ name: '', email: '', message: '' })
  const [honeypot, setHoneypot] = useState('')   // anti-bot hidden field
  const [status, setStatus]     = useState('idle')
  const [cooldownLeft, setCooldownLeft] = useState(0)
  const [spamMsg, setSpamMsg]   = useState('')

  // Catat waktu form mulai disentuh
  const handleFocus = () => {
    if (!formStartTs.current) formStartTs.current = Date.now()
  }

  // Cooldown timer
  useEffect(() => {
    if (cooldownLeft <= 0) return
    const id = setInterval(() => {
      setCooldownLeft((s) => {
        if (s <= 1) { clearInterval(id); return 0 }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [cooldownLeft])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 1. Honeypot: jika diisi, pasti bot
    if (honeypot) {
      setStatus('idle')
      return
    }

    // 2. Cek waktu pengisian form terlalu cepat (bot)
    const fillTime = Date.now() - (formStartTs.current || Date.now())
    if (fillTime < MIN_FILL_TIME_MS) {
      setSpamMsg('Anda mengisi form terlalu cepat. Tunggu sebentar.')
      setStatus('error')
      setTimeout(() => { setStatus('idle'); setSpamMsg('') }, 3000)
      return
    }

    // 3. Rate limit: cek cooldown dari pengiriman terakhir
    const sends = getStoredSends()
    if (sends.length > 0) {
      const lastSend = sends[sends.length - 1]
      const elapsed  = (Date.now() - lastSend) / 1000
      if (elapsed < COOLDOWN_SECONDS) {
        const remaining = Math.ceil(COOLDOWN_SECONDS - elapsed)
        setCooldownLeft(remaining)
        setSpamMsg(`Tunggu ${remaining} detik sebelum mengirim lagi.`)
        setStatus('error')
        setTimeout(() => { setStatus('idle'); setSpamMsg('') }, 3500)
        return
      }
    }

    // 4. Rate limit: max kiriman per hari
    if (sends.length >= MAX_SENDS_PER_DAY) {
      setSpamMsg('Batas pengiriman harian (5x) tercapai. Coba lagi besok.')
      setStatus('error')
      setTimeout(() => { setStatus('idle'); setSpamMsg('') }, 4000)
      return
    }

    // 5. Validasi format email
    if (!EMAIL_REGEX.test(form.email)) {
      setSpamMsg('Format email tidak valid.')
      setStatus('error')
      setTimeout(() => { setStatus('idle'); setSpamMsg('') }, 3000)
      return
    }

    // 6. Sanitasi input sebelum dikirim
    const cleanName    = sanitize(form.name)
    const cleanEmail   = sanitize(form.email)
    const cleanMessage = sanitize(form.message)

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setSpamMsg('Semua field harus diisi.')
      setStatus('error')
      setTimeout(() => { setStatus('idle'); setSpamMsg('') }, 3000)
      return
    }

    setStatus('loading')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  cleanName,
          from_email: cleanEmail,
          message:    cleanMessage,
          to_email:   'elbarunawifaldzan@gmail.com',
        },
        EMAILJS_PUBLIC_KEY
      )
      recordSend()
      formStartTs.current = null
      setStatus('success')
      setForm({ name: '', email: '', message: '' })
      setCooldownLeft(COOLDOWN_SECONDS)
      setTimeout(() => setStatus('idle'), 4000)
    } catch (err) {
      console.error(err)
      setStatus('error')
      setSpamMsg('')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  const t          = dark ? 'text-white' : 'text-black'
  const border     = dark ? 'border-white/[0.07]' : 'border-black/[0.07]'
  const muted      = dark ? 'text-gray-500' : 'text-gray-500'
  const iconBorder = dark
    ? 'border-white/10 text-gray-600 group-hover:text-white group-hover:border-white/30'
    : 'border-black/10 text-gray-400 group-hover:text-black group-hover:border-black/30'
  const linkHover  = dark ? 'hover:border-white/20' : 'hover:border-black/20'
  const inputBg    = dark
    ? 'bg-[#0a0a0a] border-white/[0.08] text-white placeholder-gray-700 focus:border-white/30'
    : 'bg-[#f5f5f5] border-black/[0.08] text-black placeholder-gray-400 focus:border-black/30'
  const valueHover = dark ? 'text-gray-400 group-hover:text-white' : 'text-gray-500 group-hover:text-black'

  const btnLabel = {
    idle:    cooldownLeft > 0 ? `Tunggu ${cooldownLeft}s` : 'Send Message',
    loading: 'Sending...',
    success: 'Message Sent!',
    error:   spamMsg ? 'Blocked' : 'Failed, Try Again',
  }

  const btnStyle = {
    idle:    dark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800',
    loading: dark ? 'bg-white/60 text-black cursor-not-allowed' : 'bg-black/60 text-white cursor-not-allowed',
    success: 'bg-green-500 text-white cursor-default',
    error:   'bg-red-500 text-white',
  }

  return (
    <section id="contact" className="relative py-10 md:py-14 px-6 md:px-12 lg:px-20 max-w-screen-xl mx-auto overflow-hidden">
      {/* Particles background */}
      <ParticlesBg dark={dark} />
      <div className="relative z-10 grid lg:grid-cols-2 gap-10 md:gap-16">

        {/* Left */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.1 }}
            className={`text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none mb-6 md:mb-8 ${t}`}
          >
            Get In<br />Touch
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2 }}
            className={`text-sm md:text-base leading-relaxed max-w-xs mb-8 md:mb-10 ${muted}`}
          >
            Have an interesting project or want to collaborate? Feel free to reach out.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="space-y-0"
          >
            {socials.map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className={`flex items-center gap-4 group py-3.5 border-b transition-colors duration-200 ${border} ${linkHover}`}
              >
                <span className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 shrink-0 ${iconBorder}`}>
                  <Icon size={14} />
                </span>
                <div>
                  <p className="label">{label}</p>
                  <p className={`text-xs transition-colors duration-200 ${valueHover}`}>{value}</p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Form */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {/* Honeypot — hidden dari user, bot akan mengisi ini */}
          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none', tabIndex: -1 }}>
            <label htmlFor="website">Website</label>
            <input
              id="website" name="website" type="text"
              value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
              autoComplete="off" tabIndex={-1}
            />
          </div>

          {[
            { name: 'name',  label: 'Name',  type: 'text',  placeholder: 'Your name' },
            { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
          ].map((f) => (
            <div key={f.name}>
              <label className="label block mb-2" htmlFor={f.name}>{f.label}</label>
              <input
                id={f.name} name={f.name} type={f.type}
                placeholder={f.placeholder} value={form[f.name]}
                onChange={handleChange} onFocus={handleFocus} required
                disabled={status === 'loading'}
                className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors duration-200 ${inputBg}`}
              />
            </div>
          ))}

          <div>
            <label className="label block mb-2" htmlFor="message">Message</label>
            <textarea
              id="message" name="message" rows={5}
              placeholder="Tell me about your project..."
              value={form.message} onChange={handleChange} onFocus={handleFocus} required
              disabled={status === 'loading'}
              className={`w-full border rounded-xl px-4 py-3 text-sm resize-none focus:outline-none transition-colors duration-200 ${inputBg}`}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading' || status === 'success' || cooldownLeft > 0}
            className={`w-full inline-flex items-center justify-center gap-2 px-7 py-3
              text-[11px] font-semibold tracking-widest uppercase rounded-full transition-all duration-300
              ${btnStyle[status]}`}
          >
            {status === 'loading' && (
              <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                <FiLoader size={13} />
              </motion.span>
            )}
            {status === 'success' && <FiCheck size={13} />}
            {status === 'error'   && <FiAlertCircle size={13} />}
            {btnLabel[status]}
          </button>

          {/* Status message */}
          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className="text-xs text-green-500 text-center tracking-wide"
            >
              Pesan berhasil terkirim ke elbarunawifaldzan@gmail.com
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-500 text-center tracking-wide"
            >
              {spamMsg || 'Gagal mengirim pesan. Pastikan EmailJS sudah dikonfigurasi.'}
            </motion.p>
          )}
          {/* Cooldown info saat idle */}
          {status === 'idle' && cooldownLeft > 0 && (
            <motion.p
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              className="text-xs text-yellow-500 text-center tracking-wide"
            >
              Bisa kirim lagi dalam {cooldownLeft} detik.
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  )
}
