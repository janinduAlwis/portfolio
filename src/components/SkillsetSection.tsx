import React, { useEffect, useRef, useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Reveal } from './Reveal';

const SKILL_PREVIEWS = [
  PORTFOLIO_DATA.projects[0].coverImage,
  PORTFOLIO_DATA.projects[1].coverImage,
  PORTFOLIO_DATA.projects[2].coverImage,
  PORTFOLIO_DATA.projects[3].coverImage,
];

export const SkillsetSection: React.FC = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [canHover, setCanHover] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const floatRef = useRef<HTMLDivElement>(null);
  const pointerPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const hasPointer = useRef(false);

  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  // Scroll-linked row stagger: each row gently settles vertically based on scroll progress into the dark section
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId = 0;
    let scheduled = false;

    const updateStagger = () => {
      scheduled = false;
      const vh = window.innerHeight;
      rowRefs.current.forEach((row, idx) => {
        if (!row) return;
        const rect = row.getBoundingClientRect();
        // Progress 0 before entering bottom of viewport -> 1 when settled inside upper-mid viewport
        const raw = Math.min(1, Math.max(0, (vh * 0.98 - rect.top) / (vh * 0.35)));
        const eased = 1 - Math.pow(1 - raw, 3);
        const yOffset = (1 - eased) * (18 + idx * 10);
        row.style.transform = `translate3d(0, ${yOffset.toFixed(2)}px, 0)`;
        row.style.opacity = `${(0.35 + 0.65 * eased).toFixed(3)}`;
      });
    };

    const onScroll = () => {
      if (!scheduled) {
        scheduled = true;
        rafId = requestAnimationFrame(updateStagger);
      }
    };

    updateStagger();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Smooth interpolated floating preview card tracking pointer over rows
  useEffect(() => {
    if (!canHover || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId = 0;
    const loop = () => {
      if (hasPointer.current && floatRef.current) {
        currentPos.current.x += (pointerPos.current.x - currentPos.current.x) * 0.16;
        currentPos.current.y += (pointerPos.current.y - currentPos.current.y) * 0.16;
        floatRef.current.style.transform = `translate3d(${currentPos.current.x + 28}px, ${
          currentPos.current.y - 95
        }px, 0)`;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [canHover]);

  return (
    <section
      ref={sectionRef}
      id="skillset"
      data-cursor-invert="true"
      className="relative flex min-h-[100svh] w-full flex-col justify-center bg-night py-16 lg:py-40"
    >
      {/* Floating Cursor-Tracked Preview Card (Desktop) */}
      {canHover && (
        <div
          ref={floatRef}
          aria-hidden="true"
          className={`pointer-events-none fixed left-0 top-0 z-30 hidden w-[260px] overflow-hidden border border-white/20 bg-night shadow-2xl transition-opacity duration-300 lg:block ${
            hoveredIdx !== null ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative aspect-[16/10] w-full">
            {SKILL_PREVIEWS.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                referrerPolicy="no-referrer"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                  hoveredIdx === i ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
          </div>
          {hoveredIdx !== null && (
            <div className="border-t border-white/15 bg-night px-3 py-2">
              <p className="font-space text-[11px] uppercase tracking-[0.06em] text-night-muted">
                {PORTFOLIO_DATA.skillset[hoveredIdx]?.index} ·{' '}
                {PORTFOLIO_DATA.skillset[hoveredIdx]?.title}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="relative mx-auto w-full max-w-canvas px-6 sm:px-10 lg:px-margin">
        <Reveal>
          <h2 className="text-section font-medium text-canvas">Skillset</h2>
        </Reveal>

        <div
          aria-hidden="true"
          className="mt-8 h-[1.5px] w-full bg-[var(--night-hr)] lg:mt-[calc(24*var(--px))]"
        />

        <ul
          className="overflow-hidden"
          onMouseMove={
            canHover
              ? (e) => {
                  pointerPos.current = { x: e.clientX, y: e.clientY };
                  if (!hasPointer.current) {
                    currentPos.current = { ...pointerPos.current };
                    hasPointer.current = true;
                  }
                }
              : undefined
          }
          onMouseLeave={canHover ? () => setHoveredIdx(null) : undefined}
        >
          {PORTFOLIO_DATA.skillset.map((skill, idx) => {
            const dimmed = hoveredIdx !== null && hoveredIdx !== idx;

            return (
              <li
                key={skill.index}
                onMouseEnter={canHover ? () => setHoveredIdx(idx) : undefined}
              >
                <div
                  ref={(el) => {
                    rowRefs.current[idx] = el;
                  }}
                  className="will-change-transform"
                >
                  <div
                    className={`grid grid-cols-1 items-baseline gap-y-3 py-7 transition-opacity duration-300 lg:grid-cols-5 lg:gap-0 lg:py-[calc(32*var(--px))] ${
                      dimmed ? 'lg:opacity-40' : 'lg:opacity-100'
                    }`}
                  >
                    <span className="text-label tabular-nums text-night-muted lg:pt-[calc(10*var(--px))] lg:text-body">
                      {skill.index}
                    </span>
                    <span className="text-subhead font-medium text-canvas lg:col-span-2 lg:-ml-[calc(140*var(--px))]">
                      {skill.title}
                    </span>
                    <span className="max-w-[46ch] text-body text-night-body lg:col-span-2 lg:max-w-none lg:pt-[calc(12*var(--px))]">
                      {skill.description}
                    </span>
                  </div>
                </div>

                <div aria-hidden="true" className="h-[1.5px] w-full bg-[var(--night-hr)]" />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
