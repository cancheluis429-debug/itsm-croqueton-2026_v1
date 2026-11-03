'use client'

import { useLocale, useTranslations } from 'next-intl'

function MayaTranslationNotice() {
  const language = useLocale()
  const t = useTranslations('MayaTranslationNotice')

  if (language !== 'yua') return null

  return (
    <aside
      className="fixed right-5 bottom-22 z-89 w-[min(340px,calc(100vw-28px))] rounded-[8px_16px_16px_8px] border-l-5 border-stroke-notice bg-surface-floating px-3.75 py-3 text-[12px] leading-tight-copy text-foreground shadow-notice phone:right-3.5 phone:bottom-18"
      role="status"
    >
      <strong className="block font-heading text-[16px]">Maaya t&apos;aan</strong>
      <span className="block">{t('description')}</span>
    </aside>
  )
}

export { MayaTranslationNotice }
