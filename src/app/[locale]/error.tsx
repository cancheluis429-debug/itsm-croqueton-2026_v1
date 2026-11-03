'use client'

import { useTranslations } from 'next-intl'

export default function ErrorPage({ retry }: { error: unknown; retry: () => void }) {
  const t = useTranslations('Error')

  return (
    <main className="grid min-h-screen place-content-center gap-4 text-center">
      <h1>{t('title')}</h1>
      <button type="button" onClick={retry}>
        {t('retry')}
      </button>
    </main>
  )
}
