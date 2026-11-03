import type { ClassValue } from 'cn'
import { useTranslations } from 'next-intl'

import { StoryPolaroid } from '@/components/home/story-polaroid'
import { Dog } from '@/components/illustrations/dog'

function MemePlaceholder({
  alt,
  className,
  label,
  mood,
  note
}: {
  alt: string
  className?: ClassValue
  label: string
  mood: string
  note: string
}) {
  const t = useTranslations('MemePlaceholder')
  return (
    <StoryPolaroid
      className={['[&>div]:grid [&>div]:place-items-center [&>div]:bg-[#f2c65e]', className]}
      label={label}
      frameProps={{ role: 'img', 'aria-label': alt }}
    >
      <span className="absolute top-4.5 left-1/2 z-2 w-[90%] -translate-x-1/2 text-center font-heading text-[20px] leading-[1.05] font-black uppercase">
        {note}
      </span>
      <Dog mood={mood} className="size-[82%] self-end" />
      <span className="absolute right-3 bottom-3 z-2 rounded-pill bg-ink px-2.5 py-1.5 text-center font-heading text-tiny font-black tracking-label text-white uppercase">
        {t('cheemsPlaceholder')}
      </span>
    </StoryPolaroid>
  )
}

export { MemePlaceholder }
