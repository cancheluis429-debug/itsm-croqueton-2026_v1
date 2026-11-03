'use client'

import { cn } from 'cn'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { Close } from '@/assets/icons/close'
import { Menu } from '@/assets/icons/menu'
import { Paw } from '@/assets/icons/paw'
import { User } from '@/assets/icons/user'
import { Logo } from '@/components/layout/logo'
import { Link } from '@/i18n/navigation'
import { useLocation } from '@/lib/navigation'
import { useCommunity } from '@/providers/community-provider'

function SiteNavigation({
  home = false,
  isScrolled = false
}: {
  home?: boolean
  isScrolled?: boolean
}) {
  const t = useTranslations('Navigation')

  const { user } = useCommunity()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigationRef = useRef<HTMLElement>(null)

  const navigationItems = [
    {
      to: '/#historia',
      label: t('story'),
      active: location.pathname === '/'
    },
    { to: '/meta', label: t('goal'), active: location.pathname === '/meta' },
    { to: '/guaubook', label: 'GuauBook', active: location.pathname === '/guaubook' },
    {
      to: '/unirme',
      label: t('join'),
      active: location.pathname === '/unirme'
    },
    {
      to: '/donadores',
      label: t('donors'),
      active: location.pathname === '/donadores'
    },
    {
      to: '/manada',
      label: t('pack'),
      active: location.pathname === '/manada'
    }
  ]

  useEffect(() => {
    if (!isMenuOpen) return

    const closeMobileMenu = (event: MouseEvent) => {
      if (!navigationRef.current?.contains(event.target as Node)) setIsMenuOpen(false)
    }

    const closeMobileMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    document.addEventListener('mousedown', closeMobileMenu)
    document.addEventListener('keydown', closeMobileMenuOnEscape)
    return () => {
      document.removeEventListener('mousedown', closeMobileMenu)
      document.removeEventListener('keydown', closeMobileMenuOnEscape)
    }
  }, [isMenuOpen])

  return (
    <>
      <header
        className={
          home
            ? isScrolled
              ? 'fixed top-0 left-0 z-50 w-full border-b border-stroke-nav-scrolled bg-surface-nav-scrolled shadow-nav-scrolled backdrop-blur-[14px] [transition:background_0.28s_ease,border-color_0.28s_ease,box-shadow_0.28s_ease]'
              : 'fixed top-0 left-0 z-50 w-full border-b border-transparent bg-transparent [transition:background_0.28s_ease,border-color_0.28s_ease,box-shadow_0.28s_ease]'
            : 'fixed top-0 left-0 z-50 w-full border-b-3 border-stroke bg-surface-bar'
        }
      >
        <nav
          ref={navigationRef}
          className={cn(
            'relative z-2 mx-auto flex w-[min(1240px,calc(100%-96px))] items-center [transition:height_0.28s_ease,min-height_0.28s_ease,padding_0.28s_ease] tablet:w-[min(100%-36px,680px)] phone:w-[min(100%-28px,680px)] phone:gap-2 laptop:w-[min(100%-48px,1040px)] phone:[&_.logo]:text-sub phone:[&_.logo-mark]:size-9.5',
            home && isScrolled
              ? 'h-19.5 gap-7 tablet:h-auto tablet:min-h-19.5 tablet:gap-3 tablet:py-2.5'
              : 'h-26 gap-7 tablet:h-auto tablet:min-h-20.5 tablet:gap-3 tablet:py-3.25'
          )}
          aria-label={t('mainNavigation')}
        >
          {home ? (
            <Logo />
          ) : (
            <Link
              href="/"
              className="logo inline-flex w-max items-center gap-2.5 font-heading text-title-sm font-extrabold tracking-heading"
              aria-label={t('backToCroqueton')}
            >
              <span className="logo-mark grid size-10.75 place-items-center rounded-circle bg-surface-inverse text-fg-control-active [&_svg]:size-6.25">
                <Paw />
              </span>
              <span>Croquetón</span>
            </Link>
          )}
          <div
            id="mobile-navigation-menu"
            className={cn(
              'flex flex-1 justify-center gap-5.5 text-body-sm font-extrabold tablet:absolute tablet:top-[calc(100%+8px)] tablet:right-0 tablet:left-0 tablet:w-full tablet:gap-1.75 tablet:rounded-dialog-sm tablet:border-3 tablet:p-3.5 laptop:gap-2.5 laptop:text-[12px]',
              isMenuOpen ? 'tablet:grid' : 'tablet:hidden',
              home && isScrolled
                ? 'tablet:border-ink tablet:bg-card tablet:text-ink tablet:shadow-[7px_8px_0_var(--ink)]'
                : 'tablet:border-stroke tablet:bg-surface-floating tablet:text-foreground tablet:shadow-nav-menu phone:top-[calc(100%+5px)]'
            )}
          >
            {navigationItems.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                className={cn(
                  "relative rounded-pill px-2.75 py-1.75 [transition:background_0.2s_ease,color_0.2s_ease,transform_0.2s_ease] after:absolute after:-bottom-1.75 after:left-0 after:h-0.75 after:rounded-[3px] after:bg-current after:content-[''] after:[transition:width_0.25s_ease] tablet:flex tablet:min-h-10.75 tablet:items-center tablet:rounded-xl tablet:border-2 tablet:border-stroke tablet:px-3.5 tablet:py-0 tablet:text-small tablet:after:hidden phone:min-h-10 phone:px-2.75 phone:text-[12px]",
                  item.active
                    ? 'transform-[rotate(-1deg)] bg-surface-inverse text-fg-inverse after:w-full'
                    : 'after:w-0 hover:after:w-full'
                )}
                aria-current={item.active ? 'page' : void 0}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-3.25 phone:absolute phone:top-3 phone:right-0">
            <button
              className="mobile-menu-button hidden size-11.5 flex-none place-items-center rounded-field border-3 border-stroke bg-surface-menu-button p-0 text-fg-control shadow-icon-button in-data-[theme='dark']:shadow-icon-button! tablet:grid [&_svg]:size-6.25"
              type="button"
              aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation-menu"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <Close /> : <Menu />}
            </button>
            <Link
              className={cn(
                'user-login-button grid size-12.5 flex-none place-items-center rounded-circle border-3 border-stroke [transition:transform_0.2s_ease,box-shadow_0.2s_ease] hover:transform-[translateY(-3px)_rotate(2deg)] active:transform-[translateY(3px)] tablet:size-11.5 [&_svg]:size-6.25',
                location.pathname === '/iniciar-sesion' || location.pathname === '/mi-perfil'
                  ? 'bg-surface-inverse text-fg-control-active shadow-[0_5px_0_var(--accent)]!'
                  : "bg-surface-floating text-fg-control shadow-icon-button active:shadow-none in-data-[theme='dark']:shadow-icon-button!"
              )}
              href={user ? '/mi-perfil' : '/iniciar-sesion'}
              aria-current={
                location.pathname === '/iniciar-sesion' || location.pathname === '/mi-perfil'
                  ? 'page'
                  : void 0
              }
              aria-label={user ? t('myProfile') : t('userSignIn')}
              title={user ? t('myProfile') : t('signIn')}
            >
              <User />
            </Link>
          </div>
        </nav>
      </header>
      {!home && (
        <div className="page-nav-spacer h-26 bg-surface-bar tablet:h-20.5" aria-hidden="true" />
      )}
    </>
  )
}

export { SiteNavigation }
