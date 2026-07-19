import { createContext, useContext } from 'react'
import { translations } from './translations'

export const LangContext = createContext('en')

export function useLang() {
  return useContext(LangContext)
}

// t(section, key) — returns translated string
export function useT(section) {
  const lang = useLang()
  return (key) => {
    const entry = translations[section]?.[key]
    if (!entry) return key
    const val = entry[lang] ?? entry['en']
    return val
  }
}
