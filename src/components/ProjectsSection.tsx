import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { HoverWaveText } from './HoverWaveText';
import { RoutePath } from './Navbar';
import { OptimizedImage } from './OptimizedImage';
import { Reveal } from './Reveal';

interface ProjectsSectionProps {
  onNavigate: (route: RoutePath) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onNavigate }) => {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [scrollSlug, setScrollSlug] = useState<string>(PORTFOLIO_DATA.projects[0].slug);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const lastScrollSlugRef = useRef<string>(PORTFOLIO_DATA.projects[0].slug);

  // Scroll-active tracking: whichever project row sits closest to the upper-mid viewport highlights automatically
  useEffect(() => {
    const mqDesktop = window.matchMedia('(min-width: 1024px)');
    let rafId = 0;
    let scheduled = false;

    const updateActive = () => {
      scheduled = false;
      if (!mqDesktop.matches) return;
      const targetY = window.innerHeight * 0.45;
      let bestSlug = PORTFOLIO_DATA.projects[0].slug;
      let bestDist = Infinity;

      rowRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height * 0.5;
        const dist = Math.abs(center - targetY);
        if (dist < bestDist) {
          bestDist = dist;
          bestSlug = PORTFOLIO_DATA.projects[idx].slug;
        }
      });

      if (bestSlug !== lastScrollSlugRef.current) {
        lastScrollSlugRef.current = bestSlug;
        setScrollSlug(bestSlug);
      }
    };

    const onScroll = () => {
      if (!scheduled) {
        scheduled = true;
        rafId = requestAnimationFrame(updateActive);
      }
    };

    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const activeSlug = hoveredSlug ?? scrollSlug;

  return (
    <section
      id="projects"
      className="relative flex min-h-[100svh] w-full flex-col justify-center bg-canvas py-16 lg:pb-44 lg:pt-28"
    >
      <div className="relative mx-auto w-full max-w-canvas px-6 sm:px-10 lg:px-margin">
        <Reveal>
          <h2 className="text-section font-medium text-ink">Selected Projects</h2>
        </Reveal>

        <div aria-hidden="true" className="mt-8 h-[1.5px] w-full bg-rule lg:mt-[calc(24*var(--px))]" />

        <ul className="flex flex-col" onMouseLeave={() => setHoveredSlug(null)}>
          {PORTFOLIO_DATA.projects.map((project, idx) => {
            const isActive = activeSlug === project.slug;

            return (
              <li
                key={project.slug}
                ref={(el) => {
                  rowRefs.current[idx] = el;
                }}
                onMouseEnter={() => setHoveredSlug(project.slug)}
                onMouseMove={() => {
                  if (hoveredSlug !== project.slug) setHoveredSlug(project.slug);
                }}
                onFocus={() => setHoveredSlug(project.slug)}
                className="relative"
              >
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'work', slug: project.slug })}
                  aria-label={`${project.title} — ${project.subtitle}`}
                  className={`group block w-full py-8 text-left lg:overflow-hidden lg:py-[calc(32*var(--px))] lg:transition-[height] lg:duration-[450ms] lg:ease-out-soft ${
                    isActive ? 'lg:h-[calc(238*var(--px))]' : 'lg:h-[calc(128*var(--px))]'
                  }`}
                >
                  <div className="grid grid-cols-1 items-start lg:grid-cols-[1fr_calc(276*var(--px))] lg:gap-x-10">
                    <div className="min-w-0 lg:relative">
                      <div className="flex flex-col items-start gap-y-4 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-x-6">
                        <h3
                          data-hw="true"
                          data-hw-controlled="true"
                          data-hw-on={isActive ? 'true' : undefined}
                          className={`text-project font-medium transition-colors duration-[450ms] ease-out-soft [--hw-base:rgba(10,10,10,0.28)] ${
                            isActive ? 'text-accent' : 'text-ink/28'
                          }`}
                        >
                          <HoverWaveText text={project.title} />
                        </h3>

                        <span
                          data-hw="true"
                          data-hw-controlled="true"
                          data-hw-on={isActive ? 'true' : undefined}
                          className={`inline-flex shrink-0 items-center gap-3 border px-[calc(15*var(--px))] py-[calc(9*var(--px))] text-body font-medium leading-[1.5] transition-[color,border-color,background-color] duration-[450ms] ease-out-soft ${
                            isActive
                              ? 'border-ink bg-transparent text-ink [--hw-base:#0A0A0A]'
                              : 'border-ink/20 bg-transparent text-ink/28 [--hw-base:rgba(10,10,10,0.28)]'
                          }`}
                        >
                          <HoverWaveText text="Jump To Project" />
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>

                      <dl
                        className={`mt-5 grid grid-cols-2 gap-4 transition-[clip-path,opacity] duration-[450ms] ease-out-soft sm:grid-cols-4 lg:mt-[calc(24*var(--px))] lg:flex lg:flex-wrap lg:gap-x-10 lg:gap-y-2 ${
                          isActive ? 'lg:opacity-100' : 'lg:pointer-events-none lg:opacity-0'
                        }`}
                        style={{
                          clipPath: isActive ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
                        }}
                      >
                        <div>
                          <dt className="text-label text-muted">ROLE</dt>
                          <dd className="mt-1 text-body text-ink">{project.role}</dd>
                        </div>
                        <div>
                          <dt className="text-label text-muted">TIMELINE</dt>
                          <dd className="mt-1 text-body text-ink">{project.timeline}</dd>
                        </div>
                        <div>
                          <dt className="text-label text-muted">YEAR</dt>
                          <dd className="mt-1 text-body tabular-nums text-ink">{project.year}</dd>
                        </div>
                        <div>
                          <dt className="text-label text-muted">TEAM</dt>
                          <dd className="mt-1 text-body text-ink">{project.team}</dd>
                        </div>
                      </dl>
                    </div>

                    <div
                      className={`lg:col-start-2 lg:transition-[opacity,transform] lg:duration-[450ms] lg:ease-out-soft ${
                        isActive
                          ? 'lg:scale-100 lg:opacity-100'
                          : 'lg:pointer-events-none lg:scale-[0.97] lg:opacity-0'
                      }`}
                    >
                      <div className="group/cover relative mt-6 aspect-[16/10] w-full overflow-hidden bg-night lg:mt-0 lg:w-[calc(276*var(--px))]">
                        <OptimizedImage
                          src={project.coverImage}
                          alt={project.coverAlt}
                          sizes="(max-width: 1023px) 92vw, 320px"
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover transition-transform duration-700 ease-out-soft group-hover/cover:scale-[1.03]"
                        />
                      </div>
                    </div>
                  </div>
                </button>

                <div aria-hidden="true" className="h-[1.5px] w-full bg-rule" />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
