import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { HoverWaveText } from './HoverWaveText';
import { RoutePath } from './Navbar';
import { Reveal } from './Reveal';

interface ProjectsSectionProps {
  onNavigate: (route: RoutePath) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onNavigate }) => {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [scrollSlug, setScrollSlug] = useState<string>(PORTFOLIO_DATA.projects[0].slug);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);

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

      setScrollSlug(bestSlug);
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
                onFocus={() => setHoveredSlug(project.slug)}
                className={`relative transition-all duration-500 ease-out-soft ${
                  isActive ? 'lg:min-h-[calc(270*var(--px))]' : 'lg:min-h-[calc(118*var(--px))]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onNavigate({ page: 'work', slug: project.slug })}
                  aria-label={`${project.title} — ${project.subtitle}`}
                  className="group block w-full py-8 text-left lg:py-[calc(24*var(--px))]"
                >
                  <div className="grid grid-cols-1 items-start lg:grid-cols-[1fr_calc(330*var(--px))] lg:gap-x-10">
                    <div className="min-w-0 lg:relative">
                      <div className="flex flex-col items-start gap-y-4 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-x-6">
                        <h3
                          data-hw="true"
                          data-hw-on={isActive ? 'true' : undefined}
                          className={`text-project font-medium transition-colors duration-300 [--hw-base:#0A0A0A] ${
                            isActive ? 'text-accent' : 'text-ink group-hover:text-accent'
                          }`}
                        >
                          <HoverWaveText text={project.title} />
                        </h3>

                        <span
                          data-hw="true"
                          className={`inline-flex shrink-0 items-center gap-3 border px-[calc(15*var(--px))] py-[calc(9*var(--px))] text-body font-medium leading-[1.5] transition-[background-color,color,border-color] duration-300 ease-out-soft ${
                            isActive
                              ? 'border-ink bg-ink text-white [--hw-base:#fff]'
                              : 'border-ink text-ink [--hw-base:#0A0A0A] group-hover:bg-ink group-hover:text-white'
                          }`}
                        >
                          <HoverWaveText text="Jump To Project" />
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>

                      <dl
                        className={`mt-5 grid grid-cols-2 gap-4 transition-all duration-500 ease-out-soft sm:grid-cols-4 lg:mt-[calc(28*var(--px))] lg:flex lg:flex-wrap lg:gap-x-12 lg:gap-y-2 ${
                          isActive
                            ? 'lg:translate-y-0 lg:opacity-100'
                            : 'lg:pointer-events-none lg:hidden lg:translate-y-2 lg:opacity-0'
                        }`}
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
                      className={`transition-all duration-500 ease-out-soft lg:col-start-2 ${
                        isActive ? 'lg:opacity-100' : 'lg:opacity-45 group-hover:lg:opacity-100'
                      }`}
                    >
                      <div className="group/cover relative mt-6 aspect-[16/10] w-full overflow-hidden bg-night lg:mt-0 lg:aspect-[3/2] lg:w-[calc(330*var(--px))]">
                        <img
                          src={project.coverImage}
                          alt={project.coverAlt}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
                        />
                        <div
                          className="absolute inset-0 hidden flex-col justify-end opacity-0 transition-opacity duration-300 ease-out-soft group-hover:opacity-100 lg:flex"
                          style={{
                            backgroundImage:
                              'linear-gradient(180deg, rgba(4,4,4,0) 19%, rgba(4,4,4,0.92) 100%)',
                          }}
                        >
                          <div className="flex translate-y-1.5 flex-wrap gap-[calc(7*var(--px))] p-[calc(14*var(--px))] transition-transform duration-300 ease-out-soft group-hover:translate-y-0">
                            <span className="border border-white/20 bg-[var(--night-chip)] px-2.5 py-1.5 text-label leading-none text-white">
                              {project.title}
                            </span>
                            <span className="max-w-full truncate border border-white/20 bg-[var(--night-chip)] px-2.5 py-1.5 text-label leading-none text-white">
                              {project.role}
                            </span>
                          </div>
                        </div>
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
