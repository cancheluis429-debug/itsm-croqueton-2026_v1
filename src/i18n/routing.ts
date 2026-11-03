import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['es', 'en', 'yua'],
  defaultLocale: 'es',
  localePrefix: 'always',
  localeDetection: false
})
