import React, { useEffect, useMemo, useRef } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Reveal } from './Reveal';

export const StatementSection: React.FC = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const mobileTravelRef = useRef<HTMLDivElement>(null);
  const waveTextRef = useRef<HTMLParagraphElement>(null);

  const words = useMemo(() => PORTFOLIO_DATA.bioStatement.split(' '), []);

  useEffect(() => {
    const outer = outerRef.current;
    const textEl = waveTextRef.current;
    if (!outer || !textEl) return;

    const chars = Array.from(textEl.querySelectorAll<HTMLElement>('[data-char]'));
    const total = chars.length;
    if (total === 0) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      chars.forEach((c) => c.setAttribute('data-lit', 'true'));
      return;
    }

    let litCount = 0;
    let rafId = 0;
    let scheduled = false;
    const mqDesktop = window.matchMedia('(min-width: 1024px)');

    const update = () => {
      scheduled = false;
      const targetEl = mqDesktop.matches ? outer : mobileTravelRef.current ?? outer;
      const rect = targetEl.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const ratio =
        travel > 0
          ? Math.min(1, Math.max(0, -rect.top / travel))
          : Math.min(1, Math.max(0, (0.85 * window.innerHeight - rect.top) / (0.6 * window.innerHeight)));

      const nextCount = Math.round(ratio * total);
      if (nextCount !== litCount) {
        if (nextCount > litCount) {
          for (let i = litCount; i < nextCount; i++) {
            chars[i].setAttribute('data-lit', 'true');
          }
        } else {
          for (let i = litCount - 1; i >= nextCount; i--) {
            chars[i].removeAttribute('data-lit');
          }
        }
        litCount = nextCount;
      }
    };

    const onScroll = () => {
      if (!scheduled) {
        scheduled = true;
        rafId = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    mqDesktop.addEventListener('change', onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      mqDesktop.removeEventListener('change', onScroll);
    };
  }, [words]);

  return (
    <section
      id="studio"
      className="relative flex min-h-[100svh] w-full flex-col justify-center bg-canvas py-16 lg:block lg:min-h-0 lg:py-0"
    >
      <div className="relative mx-auto w-full max-w-canvas px-6 sm:px-10 lg:px-margin">
        <div
          ref={outerRef}
          className="lg:[height:calc(100vh+var(--travel))]"
          style={{ '--travel': '135vh' } as React.CSSProperties}
        >
          <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center">
            <div ref={mobileTravelRef} className="[height:calc(100svh+var(--travel))] lg:h-auto">
              <div className="sticky top-0 flex min-h-[100svh] flex-col justify-center lg:static lg:block lg:min-h-0">
                <p
                  ref={waveTextRef}
                  data-wave="true"
                  className="mt-6 max-w-[calc(1129*var(--px))] text-lead font-medium text-ink lg:mt-[calc(40*var(--px))]"
                >
                  <span
                    aria-hidden="true"
                    className="mb-6 block w-[42%] sm:float-right sm:mb-2 sm:ml-8 sm:mt-2 sm:w-[26%] sm:max-w-[calc(206*var(--px))] lg:ml-10 lg:w-[19%]"
                  >
                    <span className="pointer-events-none relative flex aspect-square -rotate-[6deg] flex-col items-center justify-center overflow-hidden bg-night p-4 shadow-[0_18px_40px_-12px_rgba(10,10,10,0.28)]">
                      <img
                        src={PORTFOLIO_DATA.assets.portrait}
                        alt="Janindu Dilshan De Alwis"
                        referrerPolicy="no-referrer"
                        className="h-24 w-24 rounded-full border border-white/20 object-cover sm:h-28 sm:w-28"
                      />
                      <span className="mt-3 font-space text-[10px] uppercase tracking-[0.12em] text-night-muted">
                        Colombo · USJ
                      </span>
                    </span>
                  </span>

                  {words.map((word, wIdx) => (
                    <React.Fragment key={`${word}-${wIdx}`}>
                      <span data-word="true" className="inline-block">
                        {Array.from(word).map((ch, cIdx) => (
                          <span key={cIdx} data-char="true">
                            {ch}
                          </span>
                        ))}
                      </span>
                      {wIdx < words.length - 1 ? ' ' : ''}
                    </React.Fragment>
                  ))}
                </p>

                <div aria-hidden="true" className="mt-12 h-[1.5px] w-full bg-rule lg:mt-[calc(64*var(--px))]" />

                <div className="pt-8 lg:flex lg:gap-x-[calc(45*var(--px))] lg:pt-[calc(20*var(--px))]">
                  <Reveal className="hidden lg:block lg:w-[calc(305*var(--px))] lg:shrink-0">
                    <div className="group relative aspect-[640/372] w-full overflow-hidden rounded-[2px] bg-night">
                      <img
                        src={PORTFOLIO_DATA.projects[1].coverImage}
                        alt="Full-Stack, AI & IoT Projects"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover opacity-85 transition-transform duration-700 ease-out-soft group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/80 via-transparent to-transparent p-3">
                        <span className="font-archivo text-[11px] uppercase tracking-[0.08em] text-white/90">
                          Web · Mobile · AI · IoT
                        </span>
                        <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                      </div>
                    </div>
                  </Reveal>

                  <div className="min-w-0 lg:flex-1 lg:pt-[calc(24*var(--px))]">
                    <p className="text-label text-muted">(STACK &amp; TECHNOLOGIES)</p>

                    <div className="relative mt-6 flex flex-col gap-5 lg:mt-[calc(18*var(--px))] lg:gap-[calc(22*var(--px))]">
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#EFEEEB] to-transparent"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#EFEEEB] to-transparent"
                      />

                      <div className="marquee-wrapper h-[calc(32*var(--px))]">
                        <div
                          className="marquee-track h-[calc(32*var(--px))] items-center"
                          style={{ animationDuration: '38s', animationDirection: 'normal' }}
                        >
                          {[0, 1].map((dup) => (
                            <div
                              key={dup}
                              aria-hidden={dup === 1}
                              className="flex h-[calc(32*var(--px))] shrink-0 items-center gap-[calc(44*var(--px))] pr-[calc(44*var(--px))]"
                            >
                              {PORTFOLIO_DATA.stackRowOne.map((tech) => (
                                <span
                                  key={`${dup}-${tech}`}
                                  className="font-space text-[15px] font-semibold uppercase tracking-[0.06em] text-ink/60 transition-colors duration-200 hover:text-ink"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="marquee-wrapper h-[calc(32*var(--px))]">
                        <div
                          className="marquee-track h-[calc(32*var(--px))] items-center"
                          style={{ animationDuration: '46s', animationDirection: 'reverse' }}
                        >
                          {[0, 1].map((dup) => (
                            <div
                              key={dup}
                              aria-hidden={dup === 1}
                              className="flex h-[calc(32*var(--px))] shrink-0 items-center gap-[calc(44*var(--px))] pr-[calc(44*var(--px))]"
                            >
                              {PORTFOLIO_DATA.stackRowTwo.map((tech) => (
                                <span
                                  key={`${dup}-${tech}`}
                                  className="font-archivo text-[15px] font-medium tracking-[0.04em] text-ink/60 transition-colors duration-200 hover:text-ink"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
