import { useState, useEffect, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LangContext } from './i18n/LangContext'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import SkillStrip from './sections/SkillStrip'
import Experience from './sections/Experience'
import Education from './sections/Education'
import Certificates from './sections/Certificates'
import MusicPlayer from './components/MusicPlayer'
import Contact from './sections/Contact'
import ProjectDetail from './pages/ProjectDetail'

function HomePage({ dark, lang }) {
  return (
    <main>
      <Hero dark={dark} lang={lang} />
      <SkillStrip dark={dark} />
      <About dark={dark} lang={lang} />
      <Projects dark={dark} lang={lang} />
      <Experience dark={dark} lang={lang} />
      <Education dark={dark} lang={lang} />
      <Certificates dark={dark} />
      <Contact dark={dark} lang={lang} />
    </main>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [dark, setDark]       = useState(false)
  const [lang, setLang]       = useState('en')

  const handleLoaderDone = useCallback(() => setLoading(false), [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <BrowserRouter>
      {loading && <Loader onDone={handleLoaderDone} />}
      <LangContext.Provider value={lang}>
        <div className={`${dark ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen transition-colors duration-300`}>
          <Navbar
            dark={dark}
            onToggleDark={() => setDark((d) => !d)}
            lang={lang}
            onToggleLang={() => setLang((l) => (l === 'id' ? 'en' : 'id'))}
          />

          <Routes>
            <Route path="/" element={<HomePage dark={dark} lang={lang} />} />
            <Route path="/projects/:slug" element={<ProjectDetail dark={dark} />} />
          </Routes>

          <Footer dark={dark} />
          <MusicPlayer dark={dark} />
        </div>
      </LangContext.Provider>
    </BrowserRouter>
  )
}
