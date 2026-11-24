import React, { useEffect, useRef, useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

const SKILL_PREVIEWS = [
  '/assets/aistudio/1.png',
  '/assets/aistudio/2.png',
  '/assets/aistudio/3.png',
  '/assets/aistudio/4.png',
];

// Initial horizontal staircase offsets (in vw) matching the scroll-in motion
const STAGGER_X_VW = [12, 34, 8, 28];
const THUMB_TILTS = ['-3deg', '2.5deg', '-2deg', '3deg'];

type ScrollSpotlight = number | 'all' | null;

export const SkillsetSection: React.FC = () => {
  const [scrollSpotlight, setScrollSpotlight] = useState<ScrollSpotlight>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [canHover, setCanHover] = useState(false);

  const outerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastSpotlightRef = useRef<ScrollSpotlight>(null);

  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  // Scroll-pinned choreography on desktop:
  // 1) Section pins in viewport (sticky top-0 h-screen)
  // 2) Rows glide horizontally from staggered X offsets to left-aligned 0
  // 3) Continued scrolling steps spotlight through skills 0 -> 1 -> 2 -> 3
  // 4) All 4 skills illuminate together in white (matching reference), then section unpins to scroll down
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const mqDesktop = window.matchMedia('(min-width: 1024px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      rowRefs.current.forEach((row) => {
        if (!row) return;
        row.style.transform = 'translate3d(0, 0, 0)';
        row.style.opacity = '1';
      });
      setScrollSpotlight('all');
      return;
    }

    let rafId = 0;
    let scheduled = false;

    const update = () => {
      scheduled = false;
      const vh = window.innerHeight;
      const isDesktop = mqDesktop.matches;

      if (!isDesktop) {
        rowRefs.current.forEach((row) => {
          if (!row) return;
          row.style.transform = 'translate3d(0, 0, 0)';
          row.style.opacity = '1';
        });
        if (lastSpotlightRef.current !== 'all') {
          lastSpotlightRef.current = 'all';
          setScrollSpotlight('all');
        }
        return;
      }

      const rect = outer.getBoundingClientRect();
      const travel = Math.max(1, rect.height - vh);
      const pinRatio = Math.min(1, Math.max(0, -rect.top / travel));

      // Phase 1: Horizontal staircase alignment spans entry into viewport through first 16% of pin travel
      const alignStart = vh * 0.85;
      const alignEndDist = alignStart + travel * 0.16;
      const alignRaw = Math.min(1, Math.max(0, (alignStart - rect.top) / alignEndDist));
      const alignEased = 1 - Math.pow(1 - alignRaw, 3);

      rowRefs.current.forEach((row, idx) => {
        if (!row) return;
        const offsetVw = (1 - alignEased) * (STAGGER_X_VW[idx] ?? 16);
        row.style.transform = `translate3d(${offsetVw.toFixed(3)}vw, 0, 0)`;
        row.style.opacity = `${(0.45 + 0.55 * alignEased).toFixed(3)}`;
      });

      // Phase 2: Sequential spotlight (0.16 -> 0.76), then all 4 lit white together (0.76 -> 1.0) before unpinning
      const totalSkills = PORTFOLIO_DATA.skillset.length;
      let nextSpotlight: ScrollSpotlight = null;

      if (pinRatio >= 0.76) {
        nextSpotlight = 'all';
      } else if (pinRatio >= 0.16) {
        const stepProgress = Math.min(0.9999, Math.max(0, (pinRatio - 0.16) / (0.76 - 0.16)));
        nextSpotlight = Math.min(totalSkills - 1, Math.floor(stepProgress * totalSkills));
      }

      if (nextSpotlight !== lastSpotlightRef.current) {
        lastSpotlightRef.current = nextSpotlight;
        setScrollSpotlight(nextSpotlight);
      }
    };

    const onScroll = () => {
      setHoveredIdx((prev) => (prev !== null ? null : prev));
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
  }, []);

  return (
    <section
      id="skillset"
      data-cursor-invert="true"
      className="relative w-full bg-night"
    >
      <div
        ref={outerRef}
        className="lg:[height:calc(100vh+var(--travel))]"
        style={{ '--travel': '280vh' } as React.CSSProperties}
      >
        <div className="flex min-h-[100svh] flex-col justify-center overflow-hidden py-20 lg:sticky lg:top-0 lg:h-screen lg:min-h-0 lg:py-0">
          <div className="relative mx-auto w-full max-w-canvas px-6 sm:px-10 lg:px-margin">
            <p className="text-label uppercase tracking-[0.08em] text-night-muted">
              SKILLSET
            </p>

            <ul className="mt-6 flex flex-col lg:mt-[calc(22*var(--px))]">
              {PORTFOLIO_DATA.skillset.map((skill, idx) => {
                const isActive = canHover
                  ? hoveredIdx !== null
                    ? hoveredIdx === idx
                    : scrollSpotlight === 'all' || scrollSpotlight === idx
                  : true;
                const previewSrc = SKILL_PREVIEWS[idx % SKILL_PREVIEWS.length];

                return (
                  <li key={skill.index}>
                    <div
                      ref={(el) => {
                        rowRefs.current[idx] = el;
                      }}
                      className="will-change-transform"
                    >
                      <button
                        type="button"
                        onMouseMove={
                          canHover
                            ? () => {
                                if (hoveredIdx !== idx) setHoveredIdx(idx);
                              }
                            : undefined
                        }
                        onMouseLeave={canHover ? () => setHoveredIdx(null) : undefined}
                        onFocus={canHover ? () => setHoveredIdx(idx) : undefined}
                        onBlur={canHover ? () => setHoveredIdx(null) : undefined}
                        className="group inline-flex w-fit max-w-full flex-col py-3.5 text-left lg:py-[calc(11*var(--px))]"
                      >
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 lg:flex-nowrap lg:gap-x-[calc(24*var(--px))]">
                          <span
                            className={`font-medium leading-[1.03] tracking-[-0.025em] transition-colors duration-[400ms] ease-out-soft ${
                              isActive ? 'text-canvas' : 'text-canvas/20'
                            }`}
                            style={{
                              fontSize: 'clamp(2.25rem, 5.7vw, 5.35rem)',
                            }}
                          >
                            {skill.title}
                          </span>

                          <span
                            aria-hidden="true"
                            className={`inline-block h-[calc(52*var(--px))] w-[calc(88*var(--px))] shrink-0 overflow-hidden bg-white/10 shadow-2xl transition-[opacity,transform] duration-[380ms] ease-out-soft sm:h-[calc(68*var(--px))] sm:w-[calc(114*var(--px))] ${
                              isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
                            }`}
                            style={{
                              transform: isActive
                                ? `rotate(${THUMB_TILTS[idx % THUMB_TILTS.length]}) scale(1)`
                                : `rotate(${THUMB_TILTS[idx % THUMB_TILTS.length]}) scale(0.72)`,
                            }}
                          >
                            <img
                              src={previewSrc}
                              alt=""
                              referrerPolicy="no-referrer"
                              className="h-full w-full object-cover"
                            />
                          </span>
                        </div>

                        <div
                          className={`grid transition-[grid-template-rows,opacity] duration-[400ms] ease-out-soft ${
                            isActive ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                          }`}
                        >
                          <div className="min-h-0 overflow-hidden">
                            <p className="pt-2 text-body text-night-body lg:pt-[calc(8*var(--px))] lg:text-body-lg">
                              {skill.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
