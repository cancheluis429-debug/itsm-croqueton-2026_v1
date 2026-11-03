'use client'

import { useTranslations } from 'next-intl'

import { CalloutBanner } from '@/components/callout-banner'
import { StepCard } from '@/components/feature-card'
import { PageHero, PolaroidFigure } from '@/components/page-hero'
import { PageShell } from '@/components/page-shell'
import { SectionIntro } from '@/components/section-intro'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import {
  donationMemeImage,
  chooseFoodImage,
  eventDeliveryImage,
  checkDateImage
} from '@/lib/images'

export default function DonationPage() {
  const t = useTranslations('DonationPage')

  return (
    <PageShell surface="warm">
      <PageHero
        surface="bar"
        spacing="donation"
        containerClassName="grid-cols-[1fr_0.85fr] gap-20"
        eyebrow={t('howToDonate')}
        title={t('oneLittleKibble')}
        accentTitle={t('please')}
        titleClassName="mt-3"
        description={t('noComplicatedQuestsHereBringASealedBag')}
        descriptionClassName="phone:text-base"
        aside={
          <PolaroidFigure
            tapes
            src={donationMemeImage}
            alt={t('maskedDogDemandingEveryBagOfKibble')}
            caption={t('handOverAllTheKibble')}
            className="relative mx-auto mt-5 w-[min(100%,390px)] tablet:mt-7.5"
            imageClassName="aspect-[0.753] rounded-[22px] shadow-[15px_18px_0_rgba(32,36,54,0.25)]"
            captionClassName="-mt-3.75 max-w-[90%] px-4.25 text-[17px] phone:text-[14px]"
          />
        }
      />

      <section
        className="pt-27.5 pb-30 phone:pt-18.75 phone:pb-22.5"
        aria-labelledby="donation-guide-title"
      >
        <Container>
          <SectionIntro
            className="mb-13.75 phone:mb-9.5"
            eyebrow={t('threeEasySteps')}
            titleId="donation-guide-title"
            titleClassName="mb-0"
            title={
              <>
                {t('donateWithout')}
                <br />
                {t('gettingLost')}
              </>
            }
          />
          <div className="group/steps grid grid-cols-[repeat(3,1fr)] items-stretch gap-5.5 phone:grid-cols-[1fr]">
            <StepCard
              step="01"
              title={t('chooseTheFood')}
              description={t('anySizeOfDryDogFoodBagHelps')}
              imageSrc={chooseFoodImage}
              imageAlt={t('dogCarefullyChoosingFoodInFrontOfA')}
              imageClassName="aspect-[1.33] rotate-[-1.5deg]"
            />
            <StepCard
              step="02"
              title={t('checkTheDate')}
              description={t('makeSureItHasNotExpiredAndThat')}
              imageSrc={checkDateImage}
              imageAlt={t('dogWithGlassesCarefullyCheckingABagOf')}
              imageClassName="aspect-square rotate-[0.75deg]"
            />
            <StepCard
              step="03"
              title={t('bringItToTheEvent')}
              description={t('saturdayOctober26From1000To17')}
              imageSrc={eventDeliveryImage}
              imageAlt={t('smallDeliveryDogCarryingAnOrangeBackpack')}
              imageClassName="aspect-[1.05] rotate-[1.5deg]"
            />
          </div>

          <CalloutBanner
            tone="coral"
            eyebrow={t('stillHaveQuestions')}
            title={t('letSTalk')}
            description={t('writeToUsAndWeLlHelpYou')}
            action={
              <Button
                variant="card-cta"
                className="mt-2.5"
                render={<a href="mailto:croqueton@tecnologico.edu.mx" />}
              >
                {t('sendAnEmail')} <span>→</span>
              </Button>
            }
          />
        </Container>
      </section>
    </PageShell>
  )
}
