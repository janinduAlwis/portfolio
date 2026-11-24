import React, { useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Wordmark } from './Wordmark';
import { HoverWaveText } from './HoverWaveText';

export type RoutePath =
  | { page: 'home'; anchor?: string }
  | { page: 'studio' }
  | { page: 'art-lab' }
  | { page: 'shop' }
  | { page: 'work'; slug: string }
  | { page: 'privacy' }
  | { page: 'terms' };

interface NavbarProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
  onNavigate: (route: RoutePath) => void;
  overlay?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  menuOpen,
  onToggleMenu,
  onNavigate,
  overlay = false,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        onToggleMenu();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, onToggleMenu]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      menuRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleLink = (route: RoutePath) => {
    if (menuOpen) onToggleMenu();
    onNavigate(route);
  };

  return (
    <>
      <div
        className={`${
          overlay ? 'relative z-40 w-full lg:flex lg:h-[8.2%] lg:items-center' : 'relative z-40 w-full bg-canvas'
        }`}
      >
        <div className="relative mx-auto w-full max-w-canvas px-6 sm:px-10 lg:px-margin">
          <nav
            aria-label="Primary"
            className={`flex items-center justify-between ${
              overlay
                ? 'pt-10 lg:h-[calc(26*var(--px))] lg:translate-y-[calc(20*var(--px))] lg:pt-0'
                : 'py-6 lg:py-8'
            }`}
          >
            <button
              type="button"
              onClick={() => handleLink({ page: 'home', anchor: 'top' })}
              className="-my-2 -ml-2 inline-flex min-h-[calc(44*var(--px))] items-center px-2 text-body-lg"
              aria-label="Janindu Alwis Home"
            >
              <Wordmark variant="ink" className="h-[1.05em] w-auto" />
            </button>

            <button
              type="button"
              onClick={onToggleMenu}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="relative z-50 -my-4 -mr-2 flex min-h-[44px] w-[calc(56*var(--px))] flex-col items-end justify-center gap-[8px] px-2 py-4"
            >
              <span
                className={`block h-[2px] w-[calc(40*var(--px))] bg-ink transition-transform duration-300 ease-out-soft ${
                  menuOpen ? 'translate-y-[5px] rotate-45' : ''
                }`}
              />
              <span
                className={`block h-[2px] w-[calc(40*var(--px))] bg-ink transition-transform duration-300 ease-out-soft ${
                  menuOpen ? '-translate-y-[5px] -rotate-45' : ''
                }`}
              />
            </button>
          </nav>
        </div>
      </div>

      {/* Menu Scrim */}
      <div
        aria-hidden="true"
        data-menu-scrim={menuOpen ? 'open' : 'closed'}
        onClick={onToggleMenu}
        className="fixed inset-0 z-20 bg-ink/25"
      />

      {/* Fullscreen Menu Drawer */}
      <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
        <div
          id="site-menu"
          ref={menuRef}
          tabIndex={-1}
          aria-hidden={!menuOpen}
          data-menu={menuOpen ? 'open' : 'closed'}
          data-lenis-prevent="true"
          className="pointer-events-auto absolute inset-0 overflow-y-auto overscroll-contain bg-canvas pt-28 outline-none will-change-transform lg:pt-36"
        >
          <div className="mx-auto flex w-full max-w-canvas flex-col px-6 pb-16 sm:px-10 lg:px-margin">
            <ul className="flex flex-col">
              {[
                { label: 'Home', route: { page: 'home', anchor: 'top' } as RoutePath },
                { label: 'Profile', route: { page: 'studio' } as RoutePath },
                { label: 'Projects', route: { page: 'home', anchor: 'projects' } as RoutePath },
                { label: 'Tech Lab', route: { page: 'art-lab' } as RoutePath },
                { label: 'Certifications', route: { page: 'shop' } as RoutePath },
              ].map((item, idx) => (
                <li key={item.label} data-menu-item="true" style={{ '--menu-i': idx } as React.CSSProperties}>
                  <button
                    type="button"
                    tabIndex={menuOpen ? 0 : -1}
                    data-hw="true"
                    onClick={() => handleLink(item.route)}
                    className="block w-full py-3 text-left text-project font-medium text-ink transition-colors duration-200 [--hw-base:#0A0A0A] hover:text-accent"
                  >
                    <HoverWaveText text={item.label} />
                  </button>
                </li>
              ))}
            </ul>

            <div data-menu-item="true" style={{ '--menu-i': 5 } as React.CSSProperties} className="mt-12">
              <div className="flex flex-wrap items-center gap-x-10 gap-y-4 sm:gap-x-14">
                <a
                  tabIndex={menuOpen ? 0 : -1}
                  data-hw="true"
                  href={`mailto:${PORTFOLIO_DATA.brand.email}`}
                  className="inline-flex min-h-[44px] items-center py-2 text-body text-muted underline underline-offset-4 transition-colors [--hw-base:#6B6862] hover:text-ink"
                >
                  <HoverWaveText text={PORTFOLIO_DATA.brand.email.toUpperCase()} />
                </a>

                <a
                  tabIndex={menuOpen ? 0 : -1}
                  href={PORTFOLIO_DATA.brand.cvPdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center border border-ink px-4 py-2 text-body font-medium text-ink transition-colors hover:bg-ink hover:text-white"
                >
                  View CV (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
