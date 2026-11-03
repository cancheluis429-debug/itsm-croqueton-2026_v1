'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { CalloutBanner } from '@/components/callout-banner'
import { FeatureCard } from '@/components/feature-card'
import { JoinApplicationDialog } from '@/components/join-application-dialog'
import { PageHero, PolaroidFigure } from '@/components/page-hero'
import { PageShell } from '@/components/page-shell'
import { SectionIntro } from '@/components/section-intro'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { recruitmentDogImage } from '@/lib/images'

export default function JoinPage() {
  const t = useTranslations('JoinPage')

  const [showJoinForm, setShowJoinForm] = useState(false)

  const openJoinForm = () => {
    setShowJoinForm(true)
  }

  return (
    <PageShell surface="mint">
      <PageHero
        surface="soft"
        spacing="default"
        containerClassName="grid-cols-[0.9fr_1.1fr] gap-20"
        eyebrow={t('joinThePack')}
        title={t('bePartOfThe')}
        accentTitle={t('croquetones')}
        description={t('youDonTNeedSuperpowersALittleTime')}
        descriptionClassName="max-w-147.5 phone:text-base"
        actions={
          <>
            <Button
              className="mt-3.5 in-data-[theme='dark']:bg-[#ffc929] in-data-[theme='dark']:text-[#202436] in-data-[theme='dark']:shadow-[0_7px_0_#9f592f]!"
              onClick={openJoinForm}
            >
              {t('iWantToJoin')}
            </Button>
            <small className="mt-4.75 block font-extrabold opacity-62">
              {t('opensYourEmailNoSecretInitiationRituals')}
            </small>
          </>
        }
        aside={
          <PolaroidFigure
            src={recruitmentDogImage}
            alt={t('dogWearingGlassesAndUsingALaptopTo')}
            caption={t('recruitmentManagerPaidInKibble')}
            speechBubble={t('wantToLendAPawLeaveMeYour')}
            className="relative mx-auto mt-10 w-[min(100%,340px)] pt-8.75 tablet:mt-13.75"
            imageClassName="aspect-[0.593] bg-white object-contain"
            captionClassName="phone:text-[13px]"
          />
        }
      />

      <section
        className="pt-27.5 pb-30 phone:pt-18.75 phone:pb-22.5"
        aria-labelledby="join-experience-title"
      >
        <Container>
          <SectionIntro
            eyebrow={t('theCroquetonExperience')}
            titleId="join-experience-title"
            titleClassName="mb-6"
            title={
              <>
                {t('whatAwaitsYou')}
                <br />
                {t('inThePack')}
              </>
            }
            description={t('goodPeopleWaggingTailsAndTheStrangeSatisfaction')}
            descriptionClassName="max-w-150 text-[18px] leading-[1.55]"
          />
          <div className="mt-12.5 grid grid-cols-[repeat(3,1fr)] gap-5.5 tablet:grid-cols-[1fr]">
            <FeatureCard
              iconTone="brand"
              title={t('leaveAPawPrint')}
              description={t('seeHowYourTimeTurnsIntoFullBowls')}
            />
            <FeatureCard
              iconTone="accent"
              title={t('meetYourPack')}
              description={t('shareLaughsIdeasAndPossiblyTooManyDog')}
            />
            <FeatureCard
              iconTone="secondary"
              title={t('unlockGoodMemories')}
              description={t('takePartInAnExperienceWorthRememberingAnd')}
            />
          </div>

          <CalloutBanner
            tone="ink"
            eyebrow={t('packPromise')}
            title={t('yourHelpMatters')}
            description={t('weOrganizeTasksRespectYourTimeAndShare')}
            action={
              <Button variant="card-cta" className="mt-2.5" onClick={openJoinForm}>
                {t('joinTheTeam')} <span>→</span>
              </Button>
            }
          />
        </Container>
      </section>

      <JoinApplicationDialog open={showJoinForm} onOpenChange={setShowJoinForm} />
    </PageShell>
  )
}
