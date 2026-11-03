import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
import { useTranslations } from 'next-intl'
import type { ReactNode, RefObject } from 'react'

import { Paw } from '@/assets/icons/paw'
import { NoteCallout } from '@/components/callout-banner'
import { StoryImage } from '@/components/home/story-image'
import { Logo } from '@/components/layout/logo'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Link } from '@/i18n/navigation'
import { chapterFiveImage, chapterSixImage } from '@/lib/images'

const storyChapterVariants = cva('relative isolate flex items-center', {
  variants: {
    theme: {
      'good-life':
        "min-h-212.5 bg-surface-soft text-foreground before:absolute before:top-22.5 before:-left-45 before:size-117.5 before:rounded-circle before:bg-surface-good-life-orb before:opacity-65 before:content-[''] tablet:min-h-280 phone:min-h-242.5",
      rainy: 'min-h-212.5 bg-[#25334c] text-[#eef4ff] tablet:min-h-300',
      sinking:
        "min-h-207.5 bg-surface-sinking text-foreground before:absolute before:top-30 before:-left-32.5 before:size-80 before:rounded-circle before:border-3 before:border-dashed before:border-stroke-sinking-ring before:content-[''] tablet:min-h-312.5",
      'rock-bottom': 'min-h-212.5 bg-[#566c82] text-[#eef4f7] tablet:min-h-312.5'
    }
  },
  defaultVariants: {
    theme: 'good-life'
  }
})

export type StoryChapterProps = VariantProps<typeof storyChapterVariants> & {
  id?: string
  backdrop?: ReactNode
  bottomDivider?: ReactNode
  containerClassName?: string
  mediaWrapperClassName?: string
  contentWrapperClassName?: string
  reverseOnDesktop?: boolean
  eyebrow: ReactNode
  eyebrowTone?: 'accent' | 'brand'
  title: ReactNode
  titleClassName?: string
  media: ReactNode
  children: ReactNode
}

export function StoryChapter({
  id,
  theme = 'good-life',
  backdrop,
  bottomDivider,
  containerClassName,
  mediaWrapperClassName,
  contentWrapperClassName,
  reverseOnDesktop = false,
  eyebrow,
  eyebrowTone = 'accent',
  title,
  titleClassName,
  media,
  children
}: StoryChapterProps) {
  const mediaColumn = <div className={cn('relative', mediaWrapperClassName)}>{media}</div>
  const contentColumn = (
    <div className={cn('relative z-4', contentWrapperClassName)}>
      <Eyebrow variant="section" tone={eyebrowTone}>
        {eyebrow}
      </Eyebrow>
      <h2 className={titleClassName}>{title}</h2>
      {children}
    </div>
  )

  return (
    <section id={id} className={storyChapterVariants({ theme })}>
      {backdrop}
      <Container
        className={cn(
          'grid min-h-[inherit] items-center tablet:grid-cols-[1fr]',
          containerClassName
        )}
      >
        {reverseOnDesktop ? (
          <>
            {contentColumn}
            {mediaColumn}
          </>
        ) : (
          <>
            {mediaColumn}
            {contentColumn}
          </>
        )}
      </Container>
      {bottomDivider}
    </section>
  )
}

const eventBadgeVariants = cva(
  'grid size-12.5 flex-none place-items-center rounded-control font-heading text-[20px] font-black',
  {
    variants: {
      badgeTone: {
        accent: 'bg-accent text-white',
        ink: 'bg-ink text-brand'
      }
    },
    defaultVariants: {
      badgeTone: 'ink'
    }
  }
)

export type EventDetailItemProps = VariantProps<typeof eventBadgeVariants> & {
  badge: ReactNode
  title: ReactNode
  subtitle: ReactNode
}

export function EventDetailItem({
  badge,
  badgeTone = 'ink',
  title,
  subtitle
}: EventDetailItemProps) {
  return (
    <article className="flex items-center gap-4 rounded-[8px_18px_18px_8px] border-l-5 border-stroke bg-surface-event-detail px-4 py-3 shadow-none">
      <span className={eventBadgeVariants({ badgeTone })}>{badge}</span>
      <div>
        <strong className="block text-[16px]">{title}</strong>
        <small className="mt-0.5 block leading-tight-copy font-bold opacity-65">{subtitle}</small>
      </div>
    </article>
  )
}

export function HomeRescueSection({
  sparkleRescue,
  sectionRef
}: {
  sparkleRescue: boolean
  sectionRef: RefObject<HTMLElement | null>
}) {
  const t = useTranslations('HomeRescueSection')
  return (
    <section
      ref={sectionRef}
      id="evento"
      className="relative isolate flex min-h-230 items-center bg-surface-rescue text-foreground before:absolute before:inset-0 before:bg-[linear-gradient(145deg,var(--rescue-glow)_0%,transparent_var(--rescue-glow-stop))] before:content-[''] tablet:min-h-375"
    >
      <div className="pointer-events-none absolute inset-0 z-1 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 10 }, (_, index) => (
          <span
            className={cn(
              "absolute size-7 text-card opacity-0 filter-[drop-shadow(0_0_7px_rgba(255,255,255,0.9))] before:block before:text-[28px] before:leading-none before:content-['✦'] nth-1:top-[12%] nth-1:left-[5%] nth-1:[animation-delay:0.1s]! nth-10:top-[47%] nth-10:left-[38%] nth-10:transform-[scale(0.5)] nth-10:text-white nth-10:[animation-delay:2.2s]! nth-2:top-[67%] nth-2:left-[18%] nth-2:transform-[scale(0.7)] nth-2:text-accent nth-2:[animation-delay:1.2s]! nth-3:top-[20%] nth-3:left-[31%] nth-3:transform-[scale(0.55)] nth-3:[animation-delay:2.1s]! nth-4:top-[78%] nth-4:left-[43%] nth-4:text-secondary nth-4:[animation-delay:0.7s]! nth-5:top-[9%] nth-5:left-[54%] nth-5:transform-[scale(0.7)] nth-5:[animation-delay:1.7s]! nth-6:top-[55%] nth-6:left-[65%] nth-6:transform-[scale(0.55)] nth-6:text-accent nth-6:[animation-delay:2.5s]! nth-7:top-[17%] nth-7:left-[76%] nth-7:[animation-delay:0.4s]! nth-8:top-[73%] nth-8:left-[87%] nth-8:transform-[scale(0.65)] nth-8:text-secondary nth-8:[animation-delay:1.4s]! nth-9:top-[34%] nth-9:left-[94%] nth-9:transform-[scale(0.5)] nth-9:[animation-delay:2.8s]! motion-reduce:animate-none!",
              sparkleRescue && 'animate-[rescue-twinkle_3.2s_ease-in-out_infinite]'
            )}
            key={index}
          />
        ))}
      </div>
      <div className="absolute top-12.5 -right-25 size-75 rounded-circle bg-surface-warm-orb opacity-(--warm-orb-opacity)" />
      <div className="absolute bottom-25 -left-22.5 size-45 rounded-circle bg-surface-warm-orb opacity-(--warm-orb-opacity)" />
      <Container className="grid min-h-[inherit] grid-cols-[0.92fr_1.08fr] items-center tablet:grid-cols-[1fr] tablet:pt-25">
        <div className="pl-7 tablet:pl-0">
          <Eyebrow variant="section" tone="accent">
            {t('chapter05TheWayOut')}
          </Eyebrow>
          <h2 className="mb-4.5 min-[541px]:text-[clamp(66px,6.5vw,104px)]">
            {t('heIsNot')}
            <br />
            <span className="text-accent">{t('alone')}</span>
          </h2>
          <p className="mb-7 text-lg leading-normal font-extrabold">
            {t('whenFriendsArriveSoDoLaughs')}
            <br />
            {t('andLotsAndLotsOfKibble')}
          </p>
          <p className="-mt-3 mb-6 max-w-118.75 text-[14px] font-extrabold opacity-72">
            {t('youDonTNeedToDonateAMountain')}
          </p>
          <div className="grid max-w-123.75 gap-2.75">
            <EventDetailItem
              badgeTone="accent"
              badge="26"
              title={t('saturdayOctober26')}
              subtitle={t('text1000To1700')}
            />
            <EventDetailItem
              badgeTone="ink"
              badge="●"
              title={t('mainPlaza')}
              subtitle={t('higherTechnologicalInstitute')}
            />
            <EventDetailItem
              badgeTone="ink"
              badge="▰"
              title={t('bringSealedDogFood')}
              subtitle={t('kibbleBagsOfAnySize')}
            />
          </div>
          <NoteCallout tone="accent" title={t('noFinePrint')}>
            {t('weReceiveSealedFoodCheckItsDateAnd')}
          </NoteCallout>
        </div>
        <div className="relative h-175 tablet:min-h-170 phone:min-h-162.5">
          <span className="absolute top-10 left-2.5 text-[46px] font-black text-accent">✦</span>
          <span className="absolute top-17.5 right-12.5 text-[46px] font-black text-[#54a5a5]">
            ●
          </span>
          <span className="absolute top-1.25 left-[48%] text-[46px] font-black text-ink">◆</span>
          <StoryImage
            src={chapterFiveImage}
            alt={t('rescueDogsAlt')}
            label={t('rescuePlanFriendsKibble')}
            className="top-26.25 left-1/2 w-140 -translate-x-1/2 rotate-3 phone:w-[min(88vw,420px)] phone:rotate-2 [&_figcaption]:bg-accent [&_figcaption]:text-white [&>div]:aspect-[1.5]"
          />
        </div>
      </Container>
    </section>
  )
}

export function HomeFinaleSection({
  celebrateFinale,
  sectionRef
}: {
  celebrateFinale: boolean
  sectionRef: RefObject<HTMLElement | null>
}) {
  const t = useTranslations('HomeFinaleSection')
  return (
    <section
      ref={sectionRef}
      id="donar"
      className="relative isolate flex min-h-220 items-center bg-[#f2673f] text-[#fff9e8] tablet:min-h-330"
    >
      <div className="pointer-events-none absolute inset-0 z-3 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <span
            className={cn(
              'absolute -top-11.25 h-3.5 w-5 rounded-circle border-3 border-ink bg-kibble-dark opacity-0 shadow-[inset_3px_2px_0_rgba(255,255,255,0.25)] nth-1:left-[6%] nth-1:transform-[rotate(18deg)] nth-1:[animation-delay:0.1s]! nth-10:left-[84%] nth-10:size-4 nth-10:[animation-delay:1.9s]! nth-11:left-[91%] nth-11:bg-kibble-light nth-11:[animation-delay:0.95s]! nth-12:left-[96%] nth-12:h-3 nth-12:w-3.75 nth-12:[animation-delay:2.45s]! nth-2:left-[14%] nth-2:size-4 nth-2:bg-brand nth-2:[animation-delay:1.1s]! nth-3:left-[23%] nth-3:bg-kibble-light nth-3:[animation-delay:0.45s]! nth-4:left-[34%] nth-4:h-3 nth-4:w-4.25 nth-4:[animation-delay:1.7s]! nth-5:left-[43%] nth-5:bg-[#ffdc5e] nth-5:[animation-delay:0.8s]! nth-6:left-[52%] nth-6:size-3.75 nth-6:[animation-delay:2.1s]! nth-7:left-[61%] nth-7:bg-[#d98a4e] nth-7:[animation-delay:0.25s]! nth-8:left-[69%] nth-8:h-3.25 nth-8:w-4.5 nth-8:[animation-delay:1.4s]! nth-9:left-[76%] nth-9:bg-brand nth-9:[animation-delay:0.65s]! motion-reduce:animate-none!',
              celebrateFinale && 'animate-[croquette-fall_5.4s_linear_infinite]'
            )}
            key={index}
          />
        ))}
      </div>
      <Paw className="absolute top-[8%] right-[2%] w-40 rotate-23 text-[#d84f31] opacity-60" />
      <Paw className="absolute right-[38%] bottom-[3%] w-27.5 -rotate-20 text-[#d84f31] opacity-60" />
      <Container className="grid min-h-[inherit] grid-cols-[0.9fr_1.1fr] items-center tablet:grid-cols-[1fr] tablet:py-20">
        <div className="relative h-175 tablet:order-2 phone:min-h-172.5">
          <span className="absolute top-25 -left-2.5 size-122.5 max-h-[94%] max-w-[94%] rounded-circle bg-brand before:absolute before:-inset-10 before:rounded-circle before:bg-[repeating-conic-gradient(from_0deg,transparent_0deg_12deg,rgba(255,255,255,0.35)_12deg_18deg)] before:content-['']" />
          <StoryImage
            src={chapterSixImage}
            alt={t('finaleDogAlt')}
            label={t('goodEndingVeryStrongDog')}
            className="top-5 left-13.75 w-98.75 -rotate-3 phone:left-1/2 phone:w-[min(88vw,420px)] phone:-translate-x-1/2 phone:-rotate-2 [&>div]:aspect-[0.778] [&>div]:border-[#fff3c1]"
          />
        </div>
        <div className="relative z-4 pl-8.75 tablet:pl-0">
          <Eyebrow className="text-[#fff9e8]">{t('happyEndingUnlocked')}</Eyebrow>
          <h2 className="mt-4.25 mb-6.75 min-[541px]:text-[clamp(55px,5.6vw,86px)]">
            {t('togetherWeCan')}
            <br />
            {t('makeA')}
            <span className="text-brand">{t('difference')}</span>
          </h2>
          <p className="max-w-150 text-lead leading-loose font-extrabold">
            {t('beforeAnEmptyBowlAfterFriendsFoodAnd')}
          </p>
          <Button variant="card-cta" className="mt-2.5" render={<Link href="/como-donar" />}>
            {t('iWantToDonate')} <span>→</span>
          </Button>
          <small className="mt-5.25 block font-extrabold opacity-75">
            {t('opensYourEmailNoEndlessFormsDogS')}
          </small>
          <div className="mt-6 flex flex-wrap gap-2" aria-label={t('commitmentsLabel')}>
            <span className="rounded-md bg-[rgba(255,255,255,0.14)] px-2.75 py-1.75 text-[12px] leading-note font-black tracking-[0.04em]">
              {t('sealedFood')}
            </span>
            <span className="rounded-md bg-[rgba(255,255,255,0.14)] px-2.75 py-1.75 text-[12px] leading-note font-black tracking-[0.04em]">
              {t('responsibleDelivery')}
            </span>
            <span className="rounded-md bg-[rgba(255,255,255,0.14)] px-2.75 py-1.75 text-[12px] leading-note font-black tracking-[0.04em]">
              {t('sharedImpact')}
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}

export function SiteFooter() {
  const t = useTranslations('SiteFooter')
  return (
    <footer className="[&_.logo-mark]:bg-brand [&_.logo-mark]:text-ink">
      <Container className="grid grid-cols-[1.3fr_0.7fr_1fr_1fr] items-start gap-11.25 tablet:grid-cols-[1fr_1fr] phone:grid-cols-[1fr]">
        <div>
          <Logo />
          <p className="mt-4.25 text-[14px] leading-copy text-[#9fa6b6]">
            {t('kibbleByKibble')}
            <br />
            {t('weChangeAStory')}
          </p>
        </div>
        <div className="flex flex-col gap-2.25 text-body-sm leading-label text-[#abb1c0] shadow-none outline-0 [&_a]:wrap-anywhere [&_a]:shadow-none! [&_a]:outline-0! [&_a]:hover:text-brand">
          <strong className="mb-1.75 text-small tracking-[0.12em] text-white uppercase">
            {t('followUs')}
          </strong>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a
            className="facebook-link"
            href="https://www.facebook.com/share/1CN9Dqyy2W/"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
          <a href="https://www.tiktok.com/" target="_blank" rel="noreferrer">
            TikTok
          </a>
        </div>
        <div className="flex flex-col gap-2.25 text-body-sm leading-label text-[#abb1c0] [&_a]:wrap-anywhere [&_a]:hover:text-brand">
          <strong className="mb-1.75 text-small tracking-[0.12em] text-white uppercase">
            {t('contact')}
          </strong>
          <a href="mailto:croqueton@tecnologico.edu.mx">croqueton@tecnologico.edu.mx</a>
          <a href="tel:+0001234567">(000) 123 4567</a>
        </div>
        <div className="flex items-center gap-3.25 justify-self-end tablet:justify-self-start">
          <span className="grid size-14 place-items-center rounded-circle border-2 border-brand font-black text-brand">
            ITS
          </span>
          <p className="m-0 text-small leading-tight font-extrabold">
            {t('higher')}
            <br />
            {t('technologicalInstitute')}
          </p>
        </div>
      </Container>
      <Container className="mt-13.75 flex justify-between border-t border-[#393e51] pt-5.5 text-[13px] text-[#858c9d] phone:flex-col phone:gap-2">
        <span>{t('madeWithLoveAndLotsOfKibble')}</span>
        <span>© 2026 Croquetón</span>
      </Container>
    </footer>
  )
}
