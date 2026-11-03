'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { SmallDogMascot } from '@/assets/icons/small-dog-mascot'
import {
  ColorSwatchGroup,
  CustomizerFieldset,
  TogglePillGroup
} from '@/components/customizer-controls'
import { CareAvatar } from '@/components/illustrations/care-avatar'
import { PageHero } from '@/components/page-hero'
import { PageShell } from '@/components/page-shell'
import { Container } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/eyebrow'
import { useCommunity } from '@/providers/community-provider'

export default function AvatarStudio() {
  const t = useTranslations('AvatarStudio')

  const { petFurColor, updatePet } = useCommunity()
  const [furColor, setFurColor] = useState('#d98a4e')
  const [shirtColor, setShirtColor] = useState('#ef6547')
  const [shortsColor, setShortsColor] = useState('#647fa1')
  const [shoesColor, setShoesColor] = useState('#fff8df')
  const [glassesColor, setGlassesColor] = useState('#202436')
  const [outfit, setOutfit] = useState('shirt')
  const [hair, setHair] = useState('none')

  return (
    <PageShell surface="mint">
      <PageHero
        surface="bar"
        spacing="studio"
        eyebrow={t('avatarPet')}
        title={t('buildYour')}
        accentTitle={t('animalTeam')}
        titleClassName="mt-2.5 mb-6.25 text-[clamp(66px,7.5vw,112px)] leading-[0.84] phone:text-[clamp(50px,16vw,60px)]"
        description={t('createAFullBodyAnthropomorphicDogChangeEvery')}
        descriptionClassName="mb-0 max-w-170 phone:text-base"
      />

      <section
        className="relative pt-25 pb-30 before:absolute before:inset-0 before:bg-[radial-gradient(var(--secondary)_2px,transparent_2px)] before:bg-size-[32px_32px] before:opacity-(--studio-dots-opacity) before:content-[''] phone:pt-17.5 phone:pb-22.5"
        aria-label={t('avatarCustomizerLabel')}
      >
        <Container className="grid grid-cols-[1fr_0.85fr] items-start gap-22.5 tablet:grid-cols-[1fr] phone:gap-15">
          <div className="sticky top-33.5 grid grid-cols-[1fr_200px] items-end gap-5 tablet:relative tablet:top-0 tablet:mx-auto tablet:max-w-170 phone:grid-cols-[1fr]">
            <div className="relative grid h-190 place-items-center before:absolute before:top-27.5 before:size-125 before:rounded-circle before:bg-brand before:shadow-[12px_14px_0_var(--ink-faint)] before:content-[''] phone:h-172.5 phone:before:top-41.25 phone:before:size-[min(92vw,320px)]">
              <span className="absolute top-17.5 left-0.75 z-4 -rotate-5 rounded-lg border-3 border-ink bg-accent px-3.75 py-2.5 font-heading text-[14px] font-black text-white shadow-[5px_5px_0_var(--ink)] phone:left-0">
                {t('yourCaretakerAvatar')}
              </span>
              <CareAvatar
                furColor={furColor}
                shirtColor={shirtColor}
                shortsColor={shortsColor}
                shoesColor={shoesColor}
                glassesColor={glassesColor}
                outfit={outfit}
                hair={hair}
              />
              <div className="absolute right-0 -bottom-2.5 z-5 w-55 rotate-2 rounded-card-sm border-3 border-ink bg-card px-4.25 py-3.25 shadow-pop phone:w-51.25">
                <strong className="block font-heading text-[20px]">{t('agentPaws')}</strong>
                <span className="block text-caption font-extrabold">
                  {t('editableFromPawsToEars')}
                </span>
              </div>
            </div>
            <div className="relative min-h-82.5 rotate-2 rounded-[110px_110px_25px_25px] border-4 border-ink bg-surface-warm px-5 pt-62.5 pb-5.5 text-center text-ink shadow-card phone:mt-11.25 phone:w-[min(240px,78vw)] phone:justify-self-center">
              <SmallDogMascot
                furColor={petFurColor}
                className="absolute top-1.25 left-1/2 w-46.25 -translate-x-1/2"
              />
              <div className="relative z-2">
                <span className="mx-auto mb-1.75 block w-max rounded-pill bg-ink px-2.5 py-1.25 text-caption font-black tracking-[0.12em] text-card uppercase">
                  {t('pet')}
                </span>
                <strong className="mt-0.75 block font-heading text-[28px]">Chispita</strong>
              </div>
            </div>
          </div>

          <div className="relative rounded-[30px] border-4 border-ink bg-card p-9.5 text-ink shadow-[10px_11px_0_var(--ink)] tablet:mx-auto tablet:max-w-170 phone:px-4.5 phone:py-6.25">
            <Eyebrow variant="section" tone="accent">
              {t('customizeWithNoFuss')}
            </Eyebrow>
            <h2 className="mb-8.75 min-[541px]:text-[clamp(50px,4.6vw,70px)]">
              {t('makeIt')}
              <br />
              {t('yours')}
            </h2>

            <CustomizerFieldset legend={t('outfitType')}>
              <TogglePillGroup
                value={outfit}
                onValueChange={setOutfit}
                options={[
                  { value: 'shirt', label: t('tShirtAndShorts') },
                  { value: 'dress', label: t('dress') },
                  { value: 'overalls', label: t('overalls') }
                ]}
              />
            </CustomizerFieldset>

            <CustomizerFieldset legend={t('hair')}>
              <TogglePillGroup
                value={hair}
                onValueChange={setHair}
                options={[
                  { value: 'none', label: t('noHair') },
                  { value: 'short', label: t('short') },
                  { value: 'long', label: t('long') }
                ]}
              />
            </CustomizerFieldset>

            <CustomizerFieldset legend={t('furColor')}>
              <ColorSwatchGroup
                value={furColor}
                onValueChange={setFurColor}
                options={[
                  { label: t('honey'), color: '#d98a4e' },
                  { label: t('cream'), color: '#efc88f' },
                  { label: 'Chocolate', color: '#805238' },
                  { label: t('gray'), color: '#8b929b' }
                ]}
              />
            </CustomizerFieldset>

            <CustomizerFieldset
              legend={
                outfit === 'dress'
                  ? t('dress')
                  : outfit === 'overalls'
                    ? t('overalls')
                    : t('tShirt')
              }
            >
              <ColorSwatchGroup
                value={shirtColor}
                onValueChange={setShirtColor}
                options={[
                  { label: 'Coral', color: '#ef6547' },
                  { label: t('mustard'), color: '#e7b62d' },
                  { label: t('turquoise'), color: '#72bbba' },
                  { label: t('blue'), color: '#647fa1' }
                ]}
              />
            </CustomizerFieldset>

            <CustomizerFieldset
              legend={
                outfit === 'dress'
                  ? t('dressDetail')
                  : outfit === 'overalls'
                    ? t('innerTShirt')
                    : 'Shorts'
              }
            >
              <ColorSwatchGroup
                value={shortsColor}
                onValueChange={setShortsColor}
                options={[
                  { label: t('denim'), color: '#647fa1' },
                  { label: 'Coral', color: '#ef6547' },
                  { label: t('olive'), color: '#77845b' },
                  { label: t('cream'), color: '#e3d6bf' }
                ]}
              />
            </CustomizerFieldset>

            <CustomizerFieldset legend={t('sneakers')}>
              <ColorSwatchGroup
                value={shoesColor}
                onValueChange={setShoesColor}
                options={[
                  { color: '#fff8df', label: t('cream') },
                  { color: '#72bbba', label: t('turquoise') },
                  { color: '#ef6547', label: 'Coral' }
                ]}
              />
            </CustomizerFieldset>

            <CustomizerFieldset legend={t('glasses')}>
              <ColorSwatchGroup
                value={glassesColor}
                onValueChange={setGlassesColor}
                options={[
                  { color: '#202436', label: t('darkBlue') },
                  { color: '#ef6547', label: 'Coral' },
                  { color: '#4f83bd', label: t('blue') }
                ]}
              />
            </CustomizerFieldset>

            <CustomizerFieldset legend={t('chispitaSFur')}>
              <ColorSwatchGroup
                value={petFurColor}
                onValueChange={updatePet}
                options={[
                  { color: '#efc88f', label: t('cream') },
                  { color: '#d98a4e', label: t('honey') },
                  { color: '#8b929b', label: t('gray') }
                ]}
              />
            </CustomizerFieldset>
            <p
              className="mt-4.5 rounded-xl bg-[#e7eee7] px-3.75 py-3.25 text-[12px] font-extrabold"
              aria-live="polite"
            >
              {t('changesApplyInstantlyZeroFormsZeroFleas')}
            </p>
          </div>
        </Container>
      </section>
    </PageShell>
  )
}
