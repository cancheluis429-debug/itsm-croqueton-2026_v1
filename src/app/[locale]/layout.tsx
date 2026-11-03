import type { Metadata } from 'next'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Baloo_2, Nunito, Space_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'

import { MayaTranslationNotice } from '@/components/layout/maya-translation-notice'
import { routing } from '@/i18n/routing'
import { CommunityProvider } from '@/providers/community-provider'
import { ThemeProvider } from '@/providers/theme-provider'

import '../globals.css'

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    title: { default: t('title'), template: '%s - Croquetón 2026' },
    description: t('description')
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const baloo2 = Baloo_2({ subsets: ['latin'], variable: '--font-baloo-2' })
const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' })
const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700']
})

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  return (
    <html
      lang={locale}
      className={`${baloo2.variable} ${nunito.variable} ${spaceMono.variable} antialiased synthesize-none`}
    >
      <body>
        <NextIntlClientProvider>
          <CommunityProvider>
            <ThemeProvider>
              <MayaTranslationNotice />
              <div className="isolate">{children}</div>
            </ThemeProvider>
          </CommunityProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
