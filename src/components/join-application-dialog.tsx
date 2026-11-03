'use client'

import { cn } from 'cn'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState, type FormEvent } from 'react'

import { NoteCallout } from '@/components/callout-banner'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogViewport
} from '@/components/ui/dialog'
import { Eyebrow } from '@/components/ui/eyebrow'
import { CheckboxCard, FieldLabel, TextareaInput, TextInput } from '@/components/ui/field'
import { heroDogImage, rejectedApplicationImage } from '@/lib/images'

export function JoinApplicationDialog({
  open,
  onOpenChange
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const t = useTranslations('JoinApplicationDialog')
  const [joinResult, setJoinResult] = useState<'requirements' | 'welcome' | null>(null)
  const [applicantName, setApplicantName] = useState('')
  const [applicantAge, setApplicantAge] = useState('')
  const [motivation, setMotivation] = useState('')
  const [hasAvailability, setHasAvailability] = useState(false)
  const [acceptsCommitment, setAcceptsCommitment] = useState(false)

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setJoinResult(null)
    }
    onOpenChange(nextOpen)
  }

  const submitJoinForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (
      !applicantName.trim() ||
      Number(applicantAge) < 18 ||
      motivation.trim().length < 20 ||
      !hasAvailability ||
      !acceptsCommitment
    ) {
      setJoinResult('requirements')
      return
    }

    setJoinResult('welcome')
  }

  return (
    <DialogRoot open={open} onOpenChange={handleOpenChange}>
      <DialogPortal>
        <DialogViewport>
          <DialogPopup>
            <DialogClose aria-label={t('closeForm')} />
            {!joinResult ? (
              <>
                <Eyebrow variant="section" tone="accent">
                  {t('officialPackApplication')}
                </Eyebrow>
                <DialogTitle id="join-dialog-title">
                  {t('letSSniffOut')}
                  <br />
                  {t('yourProfile')}
                </DialogTitle>
                <DialogDescription>
                  {t('completeTheChecklistChispitaTakesRecruitmentVerySeriously')}
                </DialogDescription>
                <form
                  className="mt-7 grid grid-cols-[1fr_1fr] gap-4.25 phone:grid-cols-[1fr]"
                  onSubmit={submitJoinForm}
                >
                  <FieldLabel>
                    <span>{t('yourName')}</span>
                    <TextInput
                      value={applicantName}
                      onChange={(event) => setApplicantName(event.target.value)}
                      maxLength={40}
                      placeholder={t('humanOrHeroicNickname')}
                    />
                  </FieldLabel>
                  <FieldLabel>
                    <span>{t('yourAge')}</span>
                    <TextInput
                      type="number"
                      min="0"
                      max="99"
                      value={applicantAge}
                      onChange={(event) => setApplicantAge(event.target.value)}
                      placeholder="18"
                    />
                  </FieldLabel>
                  <FieldLabel className="col-span-full phone:col-1">
                    <span>{t('whyDoYouWantToParticipate')}</span>
                    <TextareaInput
                      value={motivation}
                      onChange={(event) => setMotivation(event.target.value)}
                      maxLength={400}
                      placeholder={t('tellThePackWhatMotivatesYouToHelp')}
                    />
                    <small className="text-tiny tracking-normal normal-case opacity-62">
                      {t('minimum20Characters')}
                    </small>
                  </FieldLabel>
                  <CheckboxCard
                    checked={hasAvailability}
                    onChange={(event) => setHasAvailability(event.target.checked)}
                  >
                    {t('iAmAvailableOnEventDay')}
                  </CheckboxCard>
                  <CheckboxCard
                    checked={acceptsCommitment}
                    onChange={(event) => setAcceptsCommitment(event.target.checked)}
                  >
                    {t('iAgreeToWorkAsATeamAnd')}
                  </CheckboxCard>
                  <NoteCallout tone="secondary" title={t('chispitaSChecklist')}>
                    {t('text18AClearMotivationAvailabilityTeamCommitment')}
                  </NoteCallout>
                  <Button
                    type="submit"
                    className="col-span-full mt-1.25 w-max phone:col-1 phone:w-full"
                  >
                    {t('checkMyApplication')}
                  </Button>
                </form>
              </>
            ) : (
              <div className="grid justify-items-center pt-2.5 text-center">
                <Image
                  src={joinResult === 'welcome' ? heroDogImage : rejectedApplicationImage}
                  className={cn(
                    'mb-6 block max-h-67.5 w-[min(300px,80%)] -rotate-2 border-7 border-ink bg-brand shadow-card phone:w-[min(250px,78%)]',
                    joinResult === 'welcome'
                      ? 'rounded-circle object-contain'
                      : 'aspect-square rounded-3xl object-cover'
                  )}
                  alt={
                    joinResult === 'welcome'
                      ? t('happyDogWelcomingTheNewVolunteer')
                      : t('laughingDogReactingToTheApplication')
                  }
                />
                <Eyebrow variant="section" tone="accent">
                  {joinResult === 'welcome' ? t('registrationComplete') : t('almostHuman')}
                </Eyebrow>
                <DialogTitle id="join-dialog-title">
                  {joinResult === 'welcome'
                    ? t('welcomeApplicant', { name: applicantName.trim() })
                    : t('yourChecklistNeedsWork')}
                </DialogTitle>
                <DialogDescription>
                  {joinResult === 'welcome'
                    ? t('yourTimeAndMotivationCanFillManyBowls')
                    : t('youNeedToBe18ExplainYourMotivation')}
                </DialogDescription>
                <Button className="mt-3" onClick={() => setJoinResult(null)}>
                  {joinResult === 'welcome' ? t('reviewMyAnswers') : t('completeTheForm')}
                </Button>
              </div>
            )}
          </DialogPopup>
        </DialogViewport>
      </DialogPortal>
    </DialogRoot>
  )
}
