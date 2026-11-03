'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { Paw } from '@/assets/icons/paw'
import { EmptyStateCard } from '@/components/empty-state-card'
import { PageHero } from '@/components/page-hero'
import { PageShell } from '@/components/page-shell'
import { SectionIntro } from '@/components/section-intro'
import { Container } from '@/components/ui/container'
import { packGenerationImage } from '@/lib/images'

export default function PackPage() {
  const t = useTranslations('PackPage')

  return (
    <PageShell surface="mint">
      <PageHero
        surface="soft"
        spacing="compact"
        className="relative overflow-hidden"
        eyebrow={t('theCroquetonPack')}
        title={t('everyGeneration')}
        accentTitle={t('leavesPawPrints')}
        description={t('ourGroupAlbumKeepsTheVolunteersLaughsAnd')}
        descriptionClassName="max-w-175"
        backdrop={
          <div
            className="pointer-events-none absolute top-5 right-[5%] z-1 h-82.5 w-107.5 phone:top-8.75 phone:-right-21.25 phone:h-62.5 phone:w-77.5 phone:origin-top-left phone:scale-78"
            aria-hidden="true"
          >
            {Array.from({ length: 7 }, (_, index) => (
              <span
                className="absolute block size-14.5 text-[#a67b5b] nth-1:bottom-2.5 nth-1:left-4.5 nth-1:-rotate-12 nth-2:bottom-12 nth-2:left-24 nth-2:rotate-13 nth-3:bottom-29 nth-3:left-36.25 nth-3:-rotate-10 nth-4:bottom-36.25 nth-4:left-56.25 nth-4:rotate-15 nth-5:bottom-53.25 nth-5:left-66.5 nth-5:-rotate-14 nth-6:bottom-58.75 nth-6:left-86.5 nth-6:rotate-11 nth-7:bottom-73.75 nth-7:left-91.5 nth-7:-rotate-12 [&_svg]:size-full [&_svg]:transform-[scale(0.9)] [&_svg]:animate-[pack-paw-mark_0.6s_ease-in-out_forwards] [&_svg]:opacity-0 nth-2:[&_svg]:[animation-delay:0.4s] nth-3:[&_svg]:[animation-delay:0.8s] nth-4:[&_svg]:[animation-delay:1.2s] nth-5:[&_svg]:[animation-delay:1.6s] nth-6:[&_svg]:[animation-delay:2s] nth-7:[&_svg]:[animation-delay:2.4s] motion-reduce:[&_svg]:transform-[scale(1)] motion-reduce:[&_svg]:animate-none! motion-reduce:[&_svg]:opacity-80"
                key={index}
              >
                <Paw />
              </span>
            ))}
          </div>
        }
      />

      <section
        className="pt-27.5 pb-31.25 phone:pt-18.75 phone:pb-22.5"
        aria-labelledby="pack-gallery-title"
      >
        <Container>
          <SectionIntro
            className="max-w-180"
            eyebrow={t('croquetonGenerations')}
            titleId="pack-gallery-title"
            title={
              <>
                {t('thePackS')}
                <br />
                {t('groupAlbum')}
              </>
            }
            description={t('aHomeForEachGenerationSOfficialGroup')}
          />
          <div className="mt-11.25 grid grid-cols-[1.2fr_0.9fr_0.9fr] gap-5.5 tablet:grid-cols-[1fr]">
            <figure className="-rotate-1 overflow-hidden rounded-3xl bg-card text-ink shadow-card">
              <Image
                src={packGenerationImage}
                className="block aspect-[1.35] w-full object-cover"
                alt={t('croqueton2025TeamPosingWithDonatedPetFood')}
              />
              <figcaption className="px-5 py-4.5">
                <strong className="block font-heading text-lead-lg">{t('generation2025')}</strong>
                <span className="block text-[12px] font-extrabold opacity-60">
                  {t('theFoundingPack')}
                </span>
              </figcaption>
            </figure>
            <EmptyStateCard
              variant="generation"
              className="rotate-1"
              iconClassName="text-secondary"
              title={t('nextGroupPhoto')}
              description={t('reservedForTheNextGenerationOfCroquetones')}
            />
            <EmptyStateCard
              variant="generation"
              className="rotate-[-1.5deg]"
              iconClassName="text-accent"
              title={t('yourTeamCouldBeHere')}
              description={t('joinHelpAndSmileForTheCamera')}
            />
          </div>
        </Container>
      </section>
    </PageShell>
  )
}
