'use client'

import { cn } from 'cn'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'

import { Paw } from '@/assets/icons/paw'
import { Link } from '@/i18n/navigation'
import { assessPostRelevance } from '@/lib/content'
import { useNavigate } from '@/lib/navigation'
import { useCommunity, type CommunityPost } from '@/providers/community-provider'

export function PostCard({ post }: { post: CommunityPost }) {
  const t = useTranslations('PostCard')

  const { user, editPost, deletePost, toggleLike, addComment } = useCommunity()
  const navigate = useNavigate()
  const [comment, setComment] = useState('')
  const [editedBody, setEditedBody] = useState(post.body)
  const [editNotice, setEditNotice] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const commentInputRef = useRef<HTMLInputElement>(null)

  const hasLiked = !!user && post.likedBy.includes(user.email)
  const isOwner =
    !!user && (post.authorEmail ? post.authorEmail === user.email : post.author === user.name)

  function saveEdit() {
    const nextBody = editedBody.trim()

    if (!nextBody) {
      setEditNotice(t('thePostCannotBeEmpty'))
      return
    }

    if (assessPostRelevance(nextBody, !!post.image) !== 'approved') {
      setEditNotice(t('addAClearReferenceToPetsAdoptionAnimal'))
      return
    }

    editPost(post.id, nextBody)
    setEditNotice('')
    setIsEditing(false)
  }

  return (
    <article className="rounded-3xl border-4 border-ink bg-card p-5.5 shadow-card phone:p-4.75">
      <div className="flex items-start justify-between gap-3.75">
        <div className="flex items-center gap-3">
          <span className="grid size-11.25 place-items-center rounded-circle bg-brand [&_svg]:w-6.25">
            <Paw />
          </span>
          <div>
            <strong className="block font-heading text-[20px]">{post.author}</strong>
            <small className="block font-extrabold opacity-55">{post.createdAt}</small>
          </div>
        </div>
        {isOwner && (
          <div className="flex flex-wrap justify-end gap-1.75">
            {isConfirmingDelete ? (
              <>
                <button
                  type="button"
                  className="rounded-pill border-2 border-ink bg-accent px-2.25 py-1.5 text-caption font-black text-white"
                  onClick={() => deletePost(post.id)}
                >
                  {t('confirm')}
                </button>
                <button
                  type="button"
                  className="rounded-pill border-2 border-ink bg-surface-warm px-2.25 py-1.5 text-caption font-black text-ink"
                  onClick={() => setIsConfirmingDelete(false)}
                >
                  {t('cancel')}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="rounded-pill border-2 border-ink bg-surface-warm px-2.25 py-1.5 text-caption font-black text-ink"
                  onClick={() => {
                    setEditedBody(post.body)
                    setEditNotice('')
                    setIsEditing(true)
                  }}
                >
                  {t('edit')}
                </button>
                <button
                  type="button"
                  className="rounded-pill border-2 border-ink bg-accent px-2.25 py-1.5 text-caption font-black text-white"
                  onClick={() => setIsConfirmingDelete(true)}
                >
                  {t('delete')}
                </button>
              </>
            )}
          </div>
        )}
      </div>
      {isEditing ? (
        <div className="my-4.5 grid gap-2.5">
          <textarea
            value={editedBody}
            className="min-h-28.75 w-full resize-y rounded-field border-3 border-ink bg-white p-3.25 leading-normal font-bold text-ink"
            onChange={(event) => setEditedBody(event.target.value)}
            aria-label={t('editPost')}
          />
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              className="relative inline-flex min-h-10 items-center justify-center gap-3.5 rounded-full border-3 border-current bg-ink px-4.25 font-black text-white shadow-[0_7px_0_var(--button-drop)] [transition:transform_0.2s_ease,box-shadow_0.2s_ease] after:inline-grid after:size-7.5 after:flex-none after:place-items-center after:rounded-circle after:bg-white/18 after:text-lg after:leading-none after:content-['→'] after:[transition:transform_0.2s_ease] hover:transform-[translateY(-3px)_rotate(-1deg)] hover:after:transform-[translateX(3px)] active:transform-[translateY(4px)] active:shadow-none!"
              onClick={saveEdit}
            >
              {t('save')}
            </button>
            <button
              type="button"
              className="rounded-pill border-2 border-ink bg-surface-warm px-2.25 py-1.5 text-caption font-black text-ink"
              onClick={() => {
                setIsEditing(false)
                setEditedBody(post.body)
                setEditNotice('')
              }}
            >
              {t('cancel')}
            </button>
          </div>
          <small aria-live="polite" className="min-h-4.25 font-extrabold text-[#9e3b28]">
            {editNotice}
          </small>
        </div>
      ) : (
        <p className="mt-4.5 mb-4.5 leading-copy font-bold whitespace-pre-wrap">{post.body}</p>
      )}
      {post.image && (
        <img
          src={post.image}
          alt=""
          loading="lazy"
          decoding="async"
          className="block max-h-90 w-full rounded-control object-cover"
        />
      )}
      <div className="mt-4.5 flex items-center gap-3.5 border-t-2 border-dashed border-divider pt-3.5 text-small font-black">
        <button
          type="button"
          className={cn(
            'rounded-pill border-2 border-ink px-2.75 py-1.75 font-black disabled:cursor-not-allowed disabled:opacity-55',
            hasLiked ? 'bg-accent text-white' : 'bg-surface-warm text-ink'
          )}
          onClick={() => (user ? toggleLike(post.id) : navigate('/iniciar-sesion'))}
          aria-pressed={hasLiked}
        >
          {t('love')} <span>{post.likedBy.length || ''}</span>
        </button>
        <button
          type="button"
          className="rounded-pill border-2 border-ink bg-surface-warm px-2.75 py-1.75 font-black text-ink disabled:cursor-not-allowed disabled:opacity-55"
          onClick={() => (user ? commentInputRef.current?.focus() : navigate('/iniciar-sesion'))}
        >
          {t('comment')}
        </button>
        <span>{post.comments.length ? `${post.comments.length} ${t('comments')}` : ''}</span>
      </div>
      {post.comments.length > 0 && (
        <div className="mt-3.75 grid gap-2">
          {post.comments.map((item) => (
            <p
              key={item.id}
              className="m-0 rounded-chip bg-surface-chip px-2.75 py-2.25 text-small font-bold"
            >
              <strong className="mr-1.75 font-heading text-[16px]">{item.author}</strong>
              {item.body}
            </p>
          ))}
        </div>
      )}
      {user ? (
        <form
          className="mt-3.5 flex gap-2.25"
          onSubmit={(event) => {
            event.preventDefault()
            if (comment.trim()) {
              addComment(post.id, comment.trim())
              setComment('')
            }
          }}
        >
          <input
            ref={commentInputRef}
            className="min-h-10 min-w-0 flex-1 rounded-pill border-2 border-ink bg-white px-3 font-bold text-ink"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder={t('writeAComment')}
          />
          <button
            type="submit"
            className="rounded-pill border-0 bg-ink px-3.5 font-black text-white"
          >
            {t('comment')}
          </button>
        </form>
      ) : (
        <p className="mt-3.75 text-small font-extrabold">
          {t('loveThisStoryOrWantToReply')}
          <Link href="/iniciar-sesion" className="underline">
            {t('joinThePack')}
          </Link>
          .
        </p>
      )}
    </article>
  )
}
