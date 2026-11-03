'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState, type FormEvent } from 'react'

import { Paw } from '@/assets/icons/paw'
import { EmptyStateCard } from '@/components/empty-state-card'
import { PageHero } from '@/components/page-hero'
import { PageShell } from '@/components/page-shell'
import { PostCard } from '@/components/post-card'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/eyebrow'
import { FieldLabel, TextareaInput } from '@/components/ui/field'
import { Link } from '@/i18n/navigation'
import { assessPostRelevance } from '@/lib/content'
import { useCommunity } from '@/providers/community-provider'

export default function GuauBookPage() {
  const t = useTranslations('GuauBookPage')

  const { user, posts, addPost, requestPostReview } = useCommunity()
  const [body, setBody] = useState('')
  const [image, setImage] = useState<string>()
  const [notice, setNotice] = useState('')

  const handleSelectPostImage = (file: File | undefined) => {
    if (!file) return

    const reader = new FileReader()

    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') setImage(reader.result)
    })
    reader.readAsDataURL(file)
  }

  const handlePublish = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!body.trim() && !image) return

    const relevance = assessPostRelevance(body.trim(), !!image)
    if (relevance === 'blocked') {
      setNotice(t('thisPostDoesNotAppearToBeRelated'))
      return
    }

    if (relevance === 'review') {
      requestPostReview(body.trim())
      setNotice(t('weCouldNotConfirmTheTopicAddDetails'))
      return
    }

    addPost(body.trim(), image)
    setBody('')
    setImage(void 0)
    setNotice(t('yourPostIsNowInGuauBook'))
  }

  return (
    <PageShell surface="mint">
      <PageHero
        surface="soft"
        spacing="guaubook"
        eyebrow="GuauBook"
        title={t('storiesFrom')}
        accentTitle={t('thePack')}
        titleClassName="mt-2.75 mb-5 text-[clamp(64px,7vw,104px)] leading-[0.8] font-normal phone:text-[56px]"
        description={t('shareAMomentAPhotoOrALittle')}
        descriptionClassName="m-0 text-[18px] leading-[1.55]"
      />
      <Container
        as="section"
        className="grid grid-cols-[minmax(300px,0.72fr)_minmax(0,1fr)] items-start gap-13.75 pt-18 pb-27.5 tablet:grid-cols-[1fr] tablet:gap-8.75 phone:pt-10.5"
      >
        {user ? (
          <form
            className="sticky top-31.5 grid gap-3.75 rounded-3xl border-4 border-ink bg-card p-6.25 shadow-card tablet:relative tablet:top-0 phone:p-4.75"
            onSubmit={handlePublish}
          >
            <FieldLabel htmlFor="post-body">{t('whatDoYouWantToShare')}</FieldLabel>
            <TextareaInput
              id="post-body"
              variant="control"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder={t('writeSomethingKind')}
            />
            <small className="-mt-1.75 block text-[12px] leading-label font-extrabold text-[#526165]">
              {t('pleaseSharePetsCareFoodAnimalHealthAdoption')}
            </small>
            {image && (
              <Image
                className="block max-h-90 w-full rounded-control object-cover"
                src={image}
                alt={t('selectedPostPreview')}
              />
            )}
            <div className="flex items-center justify-between gap-3">
              <label className="cursor-(--paw-cursor) text-small font-black underline">
                <input
                  type="file"
                  className="absolute size-px opacity-0"
                  accept="image/*"
                  onChange={(event) => handleSelectPostImage(event.target.files?.[0])}
                />
                {t('addPhoto')}
              </label>
              <Button size="sm" type="submit">
                {t('publish')}
              </Button>
            </div>
            <small
              className="block min-h-4.5 text-[12px] leading-label font-extrabold text-[#9e3b28]"
              aria-live="polite"
            >
              {notice}
            </small>
          </form>
        ) : (
          <aside className="sticky top-31.5 grid justify-items-start gap-3.25 rounded-3xl border-4 border-ink bg-card p-6.75 text-ink shadow-card tablet:relative tablet:top-0 phone:p-4.75">
            <Paw className="w-13.5 text-accent" />
            <Eyebrow>{t('yourProfile')}</Eyebrow>
            <h2 className="m-0 min-[541px]:text-[42px]">{t('joinTheConversation')}</h2>
            <p className="mb-2 leading-normal font-extrabold">
              {t('everyoneCanReadThePackSStoriesCreate')}
            </p>
            <Button render={<Link href="/iniciar-sesion" />}>{t('joinOrSignIn')}</Button>
          </aside>
        )}
        <div className="grid gap-5" aria-live="polite">
          {posts.length ? (
            posts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <EmptyStateCard title={t('thePackSFirstStoryWillAppearHere')} />
          )}
        </div>
      </Container>
    </PageShell>
  )
}
