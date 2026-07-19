import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Security headers untuk dev server & build preview
const securityHeaders = {
  // Cegah clickjacking
  'X-Frame-Options': 'DENY',
  // Cegah MIME sniffing
  'X-Content-Type-Options': 'nosniff',
  // Paksa HTTPS (HSTS)
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  // Referrer policy
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  // Permissions policy — matikan fitur browser yang tidak dipakai
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  // Content Security Policy
  'Content-Security-Policy': [
    "default-src 'self'",
    // EmailJS + UnicornStudio SDK via jsDelivr
    "script-src 'self' 'unsafe-inline' https://cdn.emailjs.com https://cdn.jsdelivr.net",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    // EmailJS API + UnicornStudio project data
    "connect-src 'self' https://api.emailjs.com https://cdn.jsdelivr.net https://api.unicorn.studio https://*.unicorn.studio",
    // Gambar same-origin, data URI, blob, dan UnicornStudio assets
    "img-src 'self' data: blob: https://*.unicorn.studio https://cdn.jsdelivr.net",
    // Worker untuk UnicornStudio (WebGL/canvas)
    "worker-src 'self' blob:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '),
}

export default defineConfig({
  plugins: [react()],
  server: {
    headers: securityHeaders,
  },
  preview: {
    headers: securityHeaders,
  },
})
