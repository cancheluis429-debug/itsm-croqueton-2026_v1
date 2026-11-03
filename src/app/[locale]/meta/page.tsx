'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { GoalProgressCard } from '@/components/goal-progress-card'
import { PageHero, PolaroidFigure } from '@/components/page-hero'
import { PageShell } from '@/components/page-shell'
import { SectionIntro } from '@/components/section-intro'
import { Container } from '@/components/ui/container'
import { goalImage } from '@/lib/images'

const collectedKilograms = 640
const goalProgress = 64

export default function GoalPage() {
  const t = useTranslations('GoalPage')

  const [showGoal, setShowGoal] = useState(false)
  const goalRef = useRef(null)

  useEffect(() => {
    const goal = goalRef.current
    if (!goal) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowGoal(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(goal)
    return () => observer.disconnect()
  }, [])

  return (
    <PageShell surface="warm">
      <PageHero
        surface="soft"
        spacing="default"
        containerClassName="grid-cols-[1fr_0.75fr] gap-22.5"
        eyebrow={t('theGreatKibbleGoal')}
        title={t('letSFill')}
        accentTitle={t('everyBowl')}
        description={t('ourGoalIsToCollect1000Kg')}
        descriptionClassName="phone:text-base"
        aside={
          <PolaroidFigure
            src={goalImage}
            alt={t('happyGroupOfDogsCelebratingAmongDonatedFood')}
            caption={t('finalBossTheEmptyBowl')}
            className="relative mx-auto w-[min(100%,430px)] tablet:mt-7.5"
            imageClassName="aspect-[0.778]"
            captionClassName="phone:text-[13px]"
          />
        }
      />

      <section
        ref={goalRef}
        className="flex min-h-180 items-center bg-surface-team-goal py-25 phone:min-h-auto phone:py-18.75"
        aria-labelledby="croquette-goal-title"
      >
        <Container className="grid grid-cols-[0.8fr_1.2fr] items-center gap-20 tablet:grid-cols-[1fr] tablet:gap-8.75">
          <SectionIntro
            className="max-w-none"
            eyebrow={t('currentProgress')}
            titleId="croquette-goal-title"
            titleClassName="mb-6.25 min-[541px]:text-[clamp(48px,4.6vw,70px)]"
            title={
              <>
                1,000 kg
                <br />
                {t('ofKibble')}
              </>
            }
            description={t('progressDescription', {
              collected: collectedKilograms,
              remaining: Math.max(0, 1e3 - collectedKilograms)
            })}
            descriptionClassName="max-w-135 text-[18px] leading-[1.55]"
          />
          <GoalProgressCard
            collectedKilograms={collectedKilograms}
            goalProgress={goalProgress}
            showGoal={showGoal}
          />
        </Container>
      </section>
    </PageShell>
  )
}
