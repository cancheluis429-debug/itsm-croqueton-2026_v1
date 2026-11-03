'use client'

import { useTranslations } from 'next-intl'

import { EmptyStateCard } from '@/components/empty-state-card'
import { PageHero, PolaroidFigure } from '@/components/page-hero'
import { PageShell } from '@/components/page-shell'
import { SectionIntro } from '@/components/section-intro'
import { Container } from '@/components/ui/container'
import { donationMemeImage } from '@/lib/images'

const officialDonors: { name: string; contribution: string }[] = []

export default function DonorsPage() {
  const t = useTranslations('DonorsPage')

  return (
    <PageShell surface="mint">
      <PageHero
        surface="bar"
        spacing="compact"
        containerClassName="grid-cols-[1fr_0.7fr] gap-21.25"
        eyebrow={t('officialDonorWall')}
        title={t('humansWith')}
        accentTitle={t('aBigHeart')}
        titleClassName="text-[clamp(60px,6vw,90px)] leading-[0.85]"
        description={t('thisWallCelebratesConfirmedDonationsOnlyTheCroqueton')}
        aside={
          <PolaroidFigure
            src={donationMemeImage}
            alt={t('dogDemandingKibbleDonations')}
            caption={t('yourNameCouldBeHereNoPressure')}
            className="tablet:mx-auto tablet:mt-7.5 tablet:w-[min(100%,430px)]"
            imageClassName="rounded-[22px] border-9 shadow-[14px_16px_0_rgba(32,36,54,0.24)]"
            captionClassName="-mt-3 max-w-[90%] rounded-tag px-3.5 py-2.25"
          />
        }
      />

      <section
        className="min-h-175 bg-surface-donor-wall pt-27.5 pb-31.25 phone:pt-18.75 phone:pb-22.5"
        aria-labelledby="official-donors-title"
      >
        <Container>
          <SectionIntro
            className="max-w-180"
            eyebrow={t('verifiedByThePack')}
            titleId="official-donors-title"
            title={
              <>
                {t('theGoodHuman')}
                <br />
                {t('honorRoll')}
              </>
            }
            description={t('namesAppearAfterTheAdminTeamConfirmsThe')}
            descriptionClassName="max-w-162.5"
          />

          <div className="mt-12 min-h-97.5 rounded-card-lg border-4 border-stroke bg-card p-8 text-ink shadow-panel phone:min-h-85 phone:px-4.5 phone:py-5.5">
            {officialDonors.length > 0 ? (
              <ol className="mt-5.5 grid list-none gap-2.25 p-0">
                {officialDonors.map((donor) => (
                  <li
                    key={donor.name}
                    className="flex items-center justify-between gap-4.5 rounded-chip bg-surface-chip px-3.5 py-3 font-extrabold before:text-accent before:content-['✦']"
                  >
                    <span className="flex-1 wrap-anywhere">{donor.name}</span>
                    <strong className="whitespace-nowrap text-accent">{donor.contribution}</strong>
                  </li>
                ))}
              </ol>
            ) : (
              <EmptyStateCard
                variant="donor-wall"
                title={t('theAdminIsSharpeningThePencil')}
                description={t('confirmedDonorNamesWillAppearHereSoon')}
              />
            )}
          </div>
        </Container>
      </section>
    </PageShell>
  )
}
