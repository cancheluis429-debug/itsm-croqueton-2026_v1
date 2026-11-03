'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { Cloud } from '@/assets/icons/cloud'
import { PageShell } from '@/components/page-shell'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Link } from '@/i18n/navigation'
import { errorDogImage } from '@/lib/images'

export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage')

  return (
    <PageShell surface="not-found">
      <div className="absolute top-[8%] -left-12.5 w-57.5 text-[#ffe982] opacity-80 [&_svg]:w-full">
        <Cloud />
      </div>
      <div className="absolute right-[3%] bottom-[4%] w-45 text-[#ffe982] opacity-80 [&_svg]:w-full">
        <Cloud />
      </div>
      <Container className="grid min-h-screen grid-cols-[0.9fr_1.1fr] items-center py-20 tablet:grid-cols-[1fr] tablet:pt-25 phone:pt-17.5 phone:pb-5">
        <div className="relative z-4">
          <Eyebrow>{t('eyebrow')}</Eyebrow>
          <p
            className="-mb-8.75 font-heading text-[clamp(130px,17vw,260px)] leading-[0.7] font-black -tracking-label-wide text-fg-not-found-code phone:-mb-4.5 phone:text-[120px]"
            aria-hidden="true"
          >
            404
          </p>
          <h1 className="mb-6.25 text-[clamp(60px,6vw,90px)] leading-display-tight font-extrabold phone:text-[62px]">
            {t('title')}
            <br />
            <span className="text-accent">{t('human')}</span>
          </h1>
          <p className="max-w-142.5 text-lg leading-loose font-extrabold phone:text-base">
            {t('description')}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5.5 phone:flex-col phone:items-start">
            <Button render={<Link href="/" />}>{t('back')}</Button>
            <Button
              variant="link-border"
              className="border-foreground pb-0"
              render={<Link href="/avatar-mascota" />}
            >
              {t('avatar')}
            </Button>
          </div>
          <small className="mt-7 block font-extrabold opacity-60">{t('footer')}</small>
        </div>
        <div className="relative min-h-162.5 tablet:min-h-140 phone:min-h-110">
          <span className="absolute top-10 right-0 size-130 rounded-circle bg-surface-not-found-burst before:absolute before:-inset-8.75 before:rounded-circle before:bg-[repeating-conic-gradient(transparent_0deg_12deg,rgba(255,255,255,0.38)_12deg_18deg)] before:content-[''] tablet:right-1/2 tablet:translate-x-1/2 phone:top-17.5 phone:size-82.5" />
          <Image
            src={errorDogImage}
            className="absolute right-5 bottom-16.25 z-3 w-115 max-w-[92%] rotate-2 rounded-card-lg border-9 border-card shadow-[14px_17px_0_rgba(32,36,54,0.25)] tablet:right-1/2 tablet:translate-x-1/2 phone:w-100"
            alt={t('imageAlt')}
          />
          <p className="absolute top-20 right-2.5 z-5 rotate-4 rounded-[22px_22px_5px_22px] border-3 border-ink bg-card px-4.5 py-3.5 text-center font-heading text-base leading-[1.2] font-black text-ink shadow-pop phone:top-11.25 phone:right-0 phone:text-small">
            {t('speechFirstLine')}
            <br />
            {t('speechSecondLine')}
          </p>
        </div>
      </Container>
    </PageShell>
  )
}
