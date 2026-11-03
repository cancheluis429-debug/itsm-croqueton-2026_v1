'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

import { SmallDogMascot } from '@/assets/icons/small-dog-mascot'
import { EmptyStateCard } from '@/components/empty-state-card'
import { CareAvatar } from '@/components/illustrations/care-avatar'
import { PageShell } from '@/components/page-shell'
import { PostCard } from '@/components/post-card'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/eyebrow'
import { FieldLabel, TextInput } from '@/components/ui/field'
import { Link } from '@/i18n/navigation'
import { redirect } from '@/i18n/navigation'
import { useNavigate } from '@/lib/navigation'
import { useCommunity } from '@/providers/community-provider'

export default function ProfilePage() {
  const t = useTranslations('ProfilePage')
  const language = useLocale()
  const { user, posts, petFurColor, updateProfile, updatePassword, signOut } = useCommunity()
  const navigate = useNavigate()
  const [name, setName] = useState(user?.name ?? '')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  if (!user) return redirect({ href: '/guaubook', locale: language })

  const userPosts = posts.filter((post) => post.author === user.name)

  return (
    <PageShell surface="mint" navigation="community">
      <Container as="section" className="pt-16.5 pb-27.5 phone:pt-10.5">
        <div className="grid grid-cols-[170px_1fr_auto] items-center gap-7 rounded-3xl border-4 border-ink bg-card p-6.25 shadow-card tablet:grid-cols-[140px_1fr] phone:grid-cols-[1fr] phone:p-4.75">
          <div className="h-41.25 overflow-hidden rounded-card-sm bg-brand phone:size-33.75 [&_.care-avatar]:-mt-10.5 [&_.care-avatar]:h-63.75 [&_.care-avatar]:w-full">
            <CareAvatar
              furColor="#d98a4e"
              shirtColor="#ef6547"
              shortsColor="#647fa1"
              shoesColor="#fff8df"
              glassesColor="#202436"
            />
          </div>
          <div>
            <Eyebrow>{t('myProfile')}</Eyebrow>
            <h1 className="mt-2.75 mb-5 text-[clamp(64px,7vw,104px)] leading-display">
              {user.name}
            </h1>
            <p className="m-0 font-extrabold opacity-65">{user.email}</p>
          </div>
          <div className="grid justify-items-center font-black tablet:col-span-full tablet:grid-cols-[auto_1fr] tablet:justify-start tablet:gap-2.5 phone:col-auto">
            <SmallDogMascot
              furColor={petFurColor}
              className="h-32.5 w-28.75 tablet:h-21.25 tablet:w-18.75"
            />
            <span>{t('pet')} · Chispita</span>
          </div>
        </div>
        <div className="mt-13 grid grid-cols-[minmax(300px,0.72fr)_minmax(0,1fr)] items-start gap-13.75 tablet:grid-cols-[1fr] tablet:gap-8.75 phone:mt-8.75">
          <section className="grid gap-6 rounded-3xl border-4 border-ink bg-card p-6.75 shadow-card phone:p-4.75">
            <h2 className="m-0 min-[541px]:text-[42px]">{t('yourSettings')}</h2>
            <form
              className="grid gap-3"
              onSubmit={(event) => {
                event.preventDefault()
                updateProfile(name)
                setMessage(t('profileUpdated'))
              }}
            >
              <FieldLabel>
                {t('name')}
                <TextInput
                  variant="control"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </FieldLabel>
              <Button type="submit">{t('editProfile')}</Button>
            </form>
            <form
              className="grid gap-3"
              onSubmit={(event) => {
                event.preventDefault()
                if (password.length >= 6) {
                  updatePassword(password)
                  setPassword('')
                  setMessage(t('passwordChanged'))
                }
              }}
            >
              <FieldLabel>
                {t('newPassword')}
                <TextInput
                  type="password"
                  variant="control"
                  minLength={6}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FieldLabel>
              <Button variant="underline" type="submit" className="text-ink">
                {t('changePassword')}
              </Button>
            </form>
            <Button
              variant="underline"
              className="text-left text-accent-deep"
              onClick={() => {
                signOut()
                navigate('/')
              }}
            >
              {t('signOut')}
            </Button>
            <small aria-live="polite" className="font-extrabold">
              {message}
            </small>
          </section>
          <section>
            <div className="mb-5 flex items-baseline justify-between">
              <h2 className="m-0 min-[541px]:text-[42px]">{t('yourPosts')}</h2>
              <Link href="/guaubook" className="font-black underline">
                {t('goToGuauBook')}
              </Link>
            </div>
            {userPosts.length ? (
              <div className="grid gap-5">
                {userPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <EmptyStateCard title={t('yourFirstPostWillAppearHere')} />
            )}
          </section>
        </div>
      </Container>
    </PageShell>
  )
}
