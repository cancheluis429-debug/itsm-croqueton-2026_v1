'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

import { Paw } from '@/assets/icons/paw'
import { AdminPanelCard, AdminSidebar, AdminStatCard } from '@/components/admin-dashboard'
import AdminIcon from '@/components/admin-icon'
import { PageShell } from '@/components/page-shell'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Link } from '@/i18n/navigation'
import { useNavigate } from '@/lib/navigation'
import { useCommunity } from '@/providers/community-provider'

export default function AdminPage() {
  const t = useTranslations('AdminPage')
  const locale = useLocale()
  const {
    user,
    posts,
    postReviewRequests,
    accountCount,
    approvePostReview,
    rejectPostReview,
    adminDeletePost,
    signOut
  } = useCommunity()
  const navigate = useNavigate()
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null)

  const isAdmin = user?.email === 'admin@croqueton.mx'
  const totalReactions = posts.reduce(
    (total, post) => total + post.likedBy.length + post.comments.length,
    0
  )

  if (!user || !isAdmin) {
    return (
      <PageShell surface="mint" navigation="community" showToggles={false}>
        <Container
          as="section"
          className="grid min-h-[calc(100vh-82px)] content-center justify-items-center gap-3 text-center"
        >
          <Paw className="w-18 text-accent" />
          <Eyebrow>{t('restrictedAccess')}</Eyebrow>
          <h1 className="m-0 text-[62px] phone:text-[47px]">{t('adminPanel')}</h1>
          <p className="max-w-125 font-extrabold">{t('signInAsAdmin')}</p>
          <Button render={<Link href="/iniciar-sesion" />}>{t('goToSignIn')}</Button>
        </Container>
      </PageShell>
    )
  }

  const today = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(new Date())

  return (
    <PageShell surface="admin" navigation="none">
      <div className="grid min-h-screen grid-cols-[250px_minmax(0,1fr)] tablet:grid-cols-[1fr]">
        <AdminSidebar
          userEmail={user.email}
          pendingCount={postReviewRequests.length}
          onSignOut={() => {
            signOut()
            navigate('/')
          }}
        />

        <div className="min-w-0">
          <header className="flex min-h-18 items-center justify-between gap-5 border-b border-stroke-admin-topbar bg-surface-admin-topbar px-[clamp(24px,4vw,56px)] backdrop-blur-md tablet:px-6 phone:min-h-15.5 phone:px-3.5">
            <div className="flex items-baseline gap-3 phone:grid phone:gap-0">
              <span className="font-heading text-body font-black phone:text-body-sm">
                {t('adminPanel')}
              </span>
              <small className="text-caption font-extrabold text-[#7a7e89] capitalize">
                {today}
              </small>
            </div>
            <Link
              href="/guaubook"
              className="flex items-center gap-2 rounded-chip border border-stroke-admin-topbar-link bg-surface-panel px-3.25 py-2.25 text-caption font-black phone:p-2 phone:text-[0px]"
            >
              {t('openPublicSite')} <span className="text-body-sm phone:text-[16px]">↗</span>
            </Link>
          </header>

          <section
            className="mx-auto max-w-345 px-[clamp(24px,4vw,56px)] pt-11.5 pb-22.5 phone:px-3.5 phone:pt-8.75 phone:pb-18.75"
            id="resumen"
          >
            <div className="mb-7.5 flex items-end justify-between gap-8.75 tablet:flex-col tablet:items-start">
              <div>
                <Eyebrow>{t('generalOverview')}</Eyebrow>
                <h1 className="mt-1.5 mb-2 text-[clamp(48px,5vw,68px)] leading-[0.9] phone:text-[48px]">
                  {t('greeting')}
                </h1>
                <p className="m-0 max-w-162.5 text-body-sm font-extrabold text-fg-admin-welcome">
                  {t('welcomeDescription')}
                </p>
              </div>
              <div className="flex min-w-61.25 items-center gap-2.75 rounded-control border border-stroke-card-admin bg-surface-panel px-4 py-3.25 text-foreground tablet:w-full">
                <span className="size-2.5 flex-none rounded-circle bg-[#38a879] shadow-[0_0_0_4px_#dff3e9]" />
                <div>
                  <strong className="block text-[12px]">{t('protectedAccount')}</strong>
                  <small className="mt-px block text-tiny font-bold text-muted-foreground">
                    {t('activeAdminSession')}
                  </small>
                </div>
              </div>
            </div>

            {postReviewRequests.length > 0 && (
              <a
                className="mb-5 grid grid-cols-[46px_1fr_auto] items-center gap-3.5 rounded-2xl border border-stroke-admin-priority bg-surface-admin-priority px-4.5 py-3.75 [transition:transform_0.2s_ease,box-shadow_0.2s_ease] hover:transform-[translateY(-2px)] hover:shadow-[0_6px_18px_rgba(32,36,54,0.08)] phone:grid-cols-[42px_1fr]"
                href="#moderacion"
              >
                <span className="grid size-10.5 place-items-center rounded-xl bg-brand [&_svg]:w-5.75">
                  <AdminIcon type="review" />
                </span>
                <div>
                  <strong className="block text-small">
                    {t('pendingRequests', { count: postReviewRequests.length })}
                  </strong>
                  <small className="mt-0.5 block text-caption font-bold text-fg-admin-priority-meta">
                    {t('reviewRequestsDescription')}
                  </small>
                </div>
                <span className="text-caption font-black phone:col-2">{t('reviewNow')} →</span>
              </a>
            )}

            <section
              className="mb-5.5 grid grid-cols-4 gap-3.5 tablet:grid-cols-[1fr_1fr] phone:grid-cols-[1fr]"
              aria-label={t('communityOverview')}
            >
              <AdminStatCard
                icon="posts"
                label={t('posts')}
                value={posts.length}
                meta={t('publishedContent')}
              />
              <AdminStatCard
                icon="review"
                label={t('toReview')}
                value={postReviewRequests.length}
                meta={postReviewRequests.length ? t('needsAttention') : t('allCaughtUp')}
              />
              <AdminStatCard
                icon="users"
                label={t('members')}
                value={accountCount}
                meta={t('registeredAccounts')}
              />
              <AdminStatCard
                icon="heart"
                label={t('interactions')}
                value={totalReactions}
                meta={t('totalReactions')}
              />
            </section>

            <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(330px,0.9fr)] items-start gap-4.5 tablet:grid-cols-[1fr]">
              <AdminPanelCard
                as="section"
                id="moderacion"
                eyebrow={t('workQueue')}
                title={t('moderation')}
                description={t('moderationDescription')}
                badge={postReviewRequests.length}
              >
                {postReviewRequests.length ? (
                  <div className="grid">
                    {postReviewRequests.map((request) => (
                      <article
                        key={request.id}
                        className="border-b border-stroke-divider px-5.75 py-5.25 last:border-0 phone:p-4.5"
                      >
                        <div className="grid grid-cols-[42px_1fr_auto] items-center gap-2.75 phone:grid-cols-[38px_1fr]">
                          <div className="grid size-10.5 place-items-center rounded-xl bg-surface-note text-ink phone:size-9.5 [&_svg]:w-5.75">
                            <Paw />
                          </div>
                          <div>
                            <strong className="block font-heading text-[16px]">
                              {request.author}
                            </strong>
                            <small className="block text-micro font-extrabold text-[#7b7f8d]">
                              {t('submittedOn', {
                                date: new Intl.DateTimeFormat(locale, {
                                  dateStyle: 'medium'
                                }).format(new Date(request.requestedAt))
                              })}
                            </small>
                          </div>
                          <span className="rounded-pill bg-surface-note px-2 py-1.25 text-[8px] font-black tracking-label-wide text-[#765700] uppercase phone:col-2 phone:w-max">
                            {t('pending')}
                          </span>
                        </div>
                        <p className="mt-3.5 mb-3.5 rounded-chip bg-surface-admin-review-note px-3.75 py-3.25 text-[12px] leading-normal font-bold text-fg-admin-review-note">
                          {request.body || t('visualPostPendingReview')}
                        </p>
                        <div className="flex gap-2 phone:flex-col">
                          <button
                            type="button"
                            className="min-h-8.75 rounded-[9px] border border-stroke bg-surface-inverse px-3 text-tiny font-black text-fg-admin-approve"
                            onClick={() => approvePostReview(request.id)}
                          >
                            {t('approvePost')}
                          </button>
                          <button
                            type="button"
                            className="min-h-8.75 rounded-[9px] border border-stroke-admin-action bg-surface-panel px-3 text-tiny font-black text-foreground"
                            onClick={() => rejectPostReview(request.id)}
                          >
                            {t('discard')}
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="grid min-h-78.75 place-items-center content-center gap-1.75 p-7.5 text-center">
                    <span className="grid size-14.5 place-items-center rounded-[17px] bg-surface-note text-[#9a7000] [&_svg]:size-7.75">
                      <AdminIcon type="review" />
                    </span>
                    <strong className="mt-1.25 font-heading text-lead">{t('queueCaughtUp')}</strong>
                    <p className="m-0 max-w-75 text-caption font-bold text-muted-foreground">
                      {t('emptyQueueDescription')}
                    </p>
                  </div>
                )}
              </AdminPanelCard>

              <AdminPanelCard
                as="aside"
                id="comunidad"
                eyebrow={t('recentActivity')}
                title={t('community')}
                description={t('recentPostsDescription')}
                footer={
                  <Link
                    className="flex min-h-12.5 items-center justify-between border-t border-stroke-divider px-5 text-tiny font-black text-fg-admin-view-all"
                    href="/guaubook"
                  >
                    {t('manageCommunity')} <span className="text-[18px]">→</span>
                  </Link>
                }
              >
                {posts.length ? (
                  <div className="grid">
                    {posts.slice(0, 5).map((post) => (
                      <article
                        key={post.id}
                        className="grid grid-cols-[38px_minmax(0,1fr)_auto] items-start gap-2.5 border-b border-stroke-divider px-4.5 py-3.75 phone:grid-cols-[38px_minmax(0,1fr)] phone:px-4.25"
                      >
                        <span className="grid size-9.5 place-items-center rounded-circle bg-brand [&_svg]:w-5.25">
                          <Paw />
                        </span>
                        <div>
                          <strong className="block font-heading text-[14px]">{post.author}</strong>
                          <small className="block text-[8px] font-extrabold text-[#7b7f8d]">
                            {post.createdAt}
                          </small>
                          <p className="mt-0.75 overflow-hidden text-tiny font-bold text-ellipsis whitespace-nowrap text-fg-admin-post-excerpt">
                            {post.body || t('imagePost')}
                          </p>
                        </div>
                        {deletingPostId === post.id ? (
                          <div className="grid grid-cols-[auto_auto] justify-items-end gap-1 phone:col-2 phone:justify-self-start">
                            <span className="col-span-full text-micro font-black text-danger">
                              {t('confirmDelete')}
                            </span>
                            <button
                              type="button"
                              className="rounded-md border border-stroke-admin-danger-action bg-danger px-1.5 py-0.75 text-micro font-black text-fg-admin-danger-action"
                              onClick={() => {
                                adminDeletePost(post.id)
                                setDeletingPostId(null)
                              }}
                            >
                              {t('yes')}
                            </button>
                            <button
                              type="button"
                              className="rounded-md border border-stroke-admin-action-alt bg-surface-panel px-1.5 py-0.75 text-micro font-black text-foreground"
                              onClick={() => setDeletingPostId(null)}
                            >
                              {t('no')}
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="border-0 bg-transparent px-1.25 py-1 text-micro font-black text-danger underline phone:col-2 phone:justify-self-start"
                            onClick={() => setDeletingPostId(post.id)}
                            aria-label={t('deletePostBy', { author: post.author })}
                          >
                            {t('delete')}
                          </button>
                        )}
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="grid min-h-62.5 place-items-center content-center gap-1.75 p-7.5 text-center">
                    <Paw className="size-7.75 text-[#d2c9b3]" />
                    <strong className="mt-1.25 font-heading text-lead">{t('noPostsYet')}</strong>
                    <p className="m-0 max-w-75 text-caption font-bold text-muted-foreground">
                      {t('emptyCommunityDescription')}
                    </p>
                  </div>
                )}
              </AdminPanelCard>
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  )
}
