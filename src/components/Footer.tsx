import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, MessageCircle } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Wordmark } from './Wordmark';
import { HoverWaveText } from './HoverWaveText';
import { RoutePath } from './Navbar';

interface FooterProps {
  onNavigate: (route: RoutePath) => void;
}

const SocialIcon: React.FC<{ name: string }> = ({ name }) => {
  switch (name) {
    case 'LinkedIn':
      return <Linkedin className="h-4 w-4" />;
    case 'GitHub':
      return <Github className="h-4 w-4" />;
    default:
      return <MessageCircle className="h-4 w-4" />;
  }
};

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId = 0;
    let ticking = false;

    const updateClip = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const span = 0.6 * window.innerHeight;
      const raw = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / span));
      const n = 1 - (1 - Math.pow(1 - raw, 3));
      const topInset = (5 * n).toFixed(2);
      const sideInset = (7 * n).toFixed(2);
      el.style.clipPath = `inset(${topInset}% ${sideInset}% 0% ${sideInset}%)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(updateClip);
      }
    };

    updateClip();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="will-change-[clip-path]">
      <footer data-cursor-invert="true" className="relative w-full bg-night">
        <div className="mx-auto w-full max-w-canvas px-6 sm:px-10 lg:px-margin">
          <div aria-hidden="true" className="h-px w-full bg-white/10" />
        </div>

        <div className="mx-auto w-full max-w-canvas px-6 pt-16 sm:px-10 lg:px-margin lg:pt-[calc(104*var(--px))]">
          <Wordmark variant="light" className="h-auto w-full" />

          <div className="mt-12 flex flex-col gap-8 lg:mt-[calc(72*var(--px))] lg:flex-row lg:items-end lg:gap-0">
            <p className="text-subhead font-medium uppercase text-white lg:w-1/2">
              {PORTFOLIO_DATA.brand.footerMotto}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 lg:w-1/2 lg:justify-end lg:pl-5">
              <a
                data-hw="true"
                href={`mailto:${PORTFOLIO_DATA.brand.email}`}
                className="inline-flex min-h-[44px] items-center py-2 text-body-lg text-white transition-colors duration-200 [--hw-base:#fff] hover:text-accent"
              >
                <HoverWaveText text={PORTFOLIO_DATA.brand.email.toUpperCase()} />
              </a>

              <ul className="-mx-2 flex items-center" aria-label="Profiles">
                {PORTFOLIO_DATA.socials.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      title={social.name}
                      className="flex h-10 w-10 items-center justify-center text-white transition-colors duration-200 hover:text-accent"
                    >
                      <SocialIcon name={social.name} />
                    </a>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                data-hw="true"
                onClick={() => onNavigate({ page: 'privacy' })}
                className="inline-flex min-h-[44px] items-center py-2 text-body-lg text-white transition-colors duration-200 [--hw-base:#fff] hover:text-accent"
              >
                <HoverWaveText text="PRIVACY" />
              </button>

              <button
                type="button"
                data-hw="true"
                onClick={() => onNavigate({ page: 'terms' })}
                className="inline-flex min-h-[44px] items-center py-2 text-body-lg text-white transition-colors duration-200 [--hw-base:#fff] hover:text-accent"
              >
                <HoverWaveText text="TERMS" />
              </button>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-2 pb-10 text-body-lg text-white/80 lg:mt-[calc(60*var(--px))] lg:flex-row lg:items-baseline lg:justify-between lg:gap-8 lg:pb-[calc(28*var(--px))]">
            <p>© 2026 {PORTFOLIO_DATA.brand.fullName}. All rights reserved.</p>
            <p>
              {PORTFOLIO_DATA.brand.degree} · {PORTFOLIO_DATA.brand.location}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
