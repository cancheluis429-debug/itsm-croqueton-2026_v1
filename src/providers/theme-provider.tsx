'use client'

import {
  createContext,
  useState,
  useMemo,
  useEffect,
  useSyncExternalStore,
  use,
  type ReactNode
} from 'react'

interface ThemeContextValue {
  theme: string
  setTheme: (theme: string) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  setTheme: () => void 0
})
const subscribe = () => () => {}
const clientSnapshot = () => true
const serverSnapshot = () => false

export function ThemeProvider({ children }: { children: ReactNode }) {
  const hydrated = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot)
  const [initialized, setInitialized] = useState(false)
  const [theme, setTheme] = useState('light')

  if (hydrated && !initialized) {
    const savedTheme = window.localStorage.getItem('croqueton-theme')
    if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme)
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme('dark')
    setInitialized(true)
  }

  useEffect(() => {
    if (!initialized) return
    window.localStorage.setItem('croqueton-theme', theme)
    document.documentElement.dataset.theme = theme
  }, [initialized, theme])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme: (theme: string) => setTheme(theme)
    }),
    [theme]
  )
  return <ThemeContext value={value}>{children}</ThemeContext>
}

export function useTheme() {
  return use(ThemeContext)
}
