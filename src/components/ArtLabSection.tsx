import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { HoverWaveText } from './HoverWaveText';
import { RoutePath } from './Navbar';
import { OptimizedImage } from './OptimizedImage';
import { Reveal } from './Reveal';

interface ArtLabSectionProps {
  onNavigate: (route: RoutePath) => void;
}

export const ArtLabSection: React.FC<ArtLabSectionProps> = ({ onNavigate }) => {
  return (
    <section
      id="art-lab"
      className="relative flex min-h-[100svh] w-full flex-col justify-center bg-canvas py-16 lg:py-40"
    >
      <div className="relative mx-auto w-full max-w-canvas px-6 sm:px-10 lg:px-margin">
        <Reveal>
          <h2 className="text-section font-medium text-ink">
            {PORTFOLIO_DATA.credentialsHome.heading}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:mt-[calc(40*var(--px))] lg:gap-y-[calc(30*var(--px))]">
          <Reveal className="hidden sm:flex sm:flex-col">
            <div className="overflow-hidden bg-night/5">
              <OptimizedImage
                src={PORTFOLIO_DATA.assets.labVisualOne}
                alt="Software Technology education and People's Bank trainee experience"
                sizes="(min-width: 640px) 46vw, 1px"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="aspect-[686/450] h-auto w-full object-cover transition-transform duration-700 ease-out-soft hover:scale-[1.02]"
              />
            </div>
            <p className="mt-5 text-body text-muted lg:mt-[calc(24*var(--px))]">
              {PORTFOLIO_DATA.credentialsHome.paragraphOne}
            </p>
          </Reveal>

          <Reveal delay={90} className="flex flex-col">
            <div className="overflow-hidden bg-night/5">
              <OptimizedImage
                src={PORTFOLIO_DATA.assets.labVisualTwo}
                alt="2026 certifications from Google, Cisco, Google Play Academy, and IBM SkillsBuild"
                sizes="(max-width: 639px) 92vw, 46vw"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="aspect-[686/450] h-auto w-full object-cover transition-transform duration-700 ease-out-soft hover:scale-[1.02]"
              />
            </div>
            <p className="mt-5 text-body text-muted lg:mt-[calc(24*var(--px))]">
              {PORTFOLIO_DATA.credentialsHome.paragraphTwo}
            </p>
          </Reveal>
        </div>

        <Reveal delay={140} className="mt-10 flex flex-wrap gap-4 lg:mt-[calc(40*var(--px))]">
          <button
            type="button"
            data-hw="true"
            onClick={() => onNavigate({ page: 'art-lab' })}
            className="group/btn inline-flex min-h-[44px] w-fit items-center gap-3 border border-ink bg-ink px-[calc(15*var(--px))] py-[calc(9*var(--px))] text-body font-medium leading-[1.5] text-white transition-[background-color,color,border-color] duration-300 ease-out-soft [--hw-base:#fff] hover:bg-transparent hover:text-ink"
          >
            <HoverWaveText text="Explore Tech Lab" />
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>

          <button
            type="button"
            data-hw="true"
            onClick={() => onNavigate({ page: 'shop' })}
            className="group/btn inline-flex min-h-[44px] w-fit items-center gap-3 border border-ink/25 bg-transparent px-[calc(15*var(--px))] py-[calc(9*var(--px))] text-body font-medium leading-[1.5] text-ink transition-[background-color,color,border-color] duration-300 ease-out-soft [--hw-base:#0A0A0A] hover:border-ink hover:bg-ink hover:text-white"
          >
            <HoverWaveText text="Certifications & CV" />
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>
        </Reveal>
      </div>
    </section>
  );
};
