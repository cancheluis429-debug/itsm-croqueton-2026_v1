'use client'

import {
  createContext,
  use,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode
} from 'react'

// `Yua` is the ISO code for Maya
export type Language = 'en' | 'es' | 'yua'

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'es',
  setLanguage: () => void 0
})
const subscribe = () => () => {}
const clientSnapshot = () => true
const serverSnapshot = () => false

export function LanguageProvider({ children }: { children: ReactNode }) {
  const hydrated = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot)
  const [initialized, setInitialized] = useState(false)
  const [language, setLanguage] = useState<Language>('es')

  if (hydrated && !initialized) {
    const savedLanguage = window.localStorage.getItem('croqueton-language')
    if (savedLanguage === 'en' || savedLanguage === 'es' || savedLanguage === 'yua')
      setLanguage(savedLanguage)
    setInitialized(true)
  }

  useEffect(() => {
    if (!initialized) return
    window.localStorage.setItem('croqueton-language', language)
    document.documentElement.lang = language
  }, [initialized, language])

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage: (language) => setLanguage(language) }),
    [language]
  )

  return <LanguageContext value={value}>{children}</LanguageContext>
}

export function useLanguage() {
  const context = use(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider')
  return context
}
