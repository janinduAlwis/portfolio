import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowUpRight, FileText } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { RoutePath } from '../components/Navbar';
import { OptimizedImage } from '../components/OptimizedImage';

interface ArtShopViewProps {
  onNavigate: (route: RoutePath) => void;
}

type CategoryFilter = 'All' | 'Google' | 'Cisco & IBM' | 'Play Academy';

export const ArtShopView: React.FC<ArtShopViewProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<CategoryFilter>('All');

  const visibleItems = useMemo(() => {
    const filtered =
      filter === 'All'
        ? PORTFOLIO_DATA.certifications
        : PORTFOLIO_DATA.certifications.filter((item) => item.category === filter);
    return [...filtered].sort((a, b) => b.dateOrder - a.dateOrder);
  }, [filter]);

  return (
    <section className="page-enter bg-canvas pt-6 pb-20 lg:pt-12 lg:pb-32">
      <div className="mx-auto w-full max-w-canvas px-6 sm:px-10 lg:px-margin">
        <button
          type="button"
          onClick={() => onNavigate({ page: 'home', anchor: 'art-lab' })}
          className="inline-flex min-h-[44px] items-center gap-2 text-body text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <p className="text-label text-muted">(CERTIFICATIONS &amp; CV)</p>
            <h1 className="mt-3 text-display font-medium uppercase text-ink">
              Credentials
            </h1>
            <p className="mt-5 text-body-lg text-muted">
              Verified 2026 certifications from Google, IBM SkillsBuild, Google Play Academy,
              and Cisco — alongside BICT (Hons) Software Technology coursework and banking
              traineeship experience.
            </p>
          </div>

          <a
            href={PORTFOLIO_DATA.brand.cvPdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-3 border border-ink bg-ink px-5 py-3 text-body font-medium text-white transition-colors hover:bg-transparent hover:text-ink"
          >
            <FileText className="h-4 w-4" />
            <span>Download Full CV (PDF)</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* Filter Controls */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-rule py-4">
          <div className="flex flex-wrap items-center gap-2">
            {(['All', 'Google', 'Cisco & IBM', 'Play Academy'] as CategoryFilter[]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`min-h-[40px] border px-4 py-1.5 font-archivo text-label font-medium uppercase transition-colors ${
                  filter === cat
                    ? 'border-ink bg-ink text-white'
                    : 'border-chip bg-transparent text-ink hover:border-ink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="font-archivo text-label uppercase tracking-[0.06em] text-muted">
            {visibleItems.length} VERIFIED CREDENTIALS · 2026
          </span>
        </div>

        {/* Certifications Grid */}
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col border border-rule bg-canvas p-5 transition-colors duration-200 hover:border-ink"
            >
              <div
                className={`relative aspect-[16/10] overflow-hidden ${
                  item.imageFit === 'contain' ? 'bg-white' : 'bg-night/5'
                }`}
              >
                <OptimizedImage
                  src={item.image}
                  alt={item.title}
                  sizes="(max-width: 639px) 92vw, (max-width: 1023px) 45vw, 30vw"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className={`h-full w-full transition-transform duration-700 ease-out-soft group-hover:scale-[1.03] ${
                    item.imageFit === 'contain' ? 'object-contain p-1' : 'object-cover'
                  }`}
                />
              </div>

              <div className="mt-5 flex items-baseline justify-between gap-4">
                <span className="font-space text-label uppercase text-accent">
                  {item.issuer}
                </span>
                <span className="font-space text-label tabular-nums text-muted">
                  {item.year}
                </span>
              </div>

              <h2 className="mt-2 text-body-lg font-medium text-ink">
                {item.title}
              </h2>
              <p className="mt-1.5 text-body text-muted">{item.focus}</p>
            </div>
          ))}
        </div>

        {/* Experience & Education Strip */}
        <div className="mt-20 grid grid-cols-1 gap-8 border-t border-rule pt-12 md:grid-cols-2">
          <div className="border border-rule p-6">
            <p className="text-label text-muted">(EDUCATION)</p>
            <h2 className="mt-3 text-subhead font-medium text-ink">
              {PORTFOLIO_DATA.profile.education.degree}
            </h2>
            <p className="mt-2 text-body text-ink">
              {PORTFOLIO_DATA.profile.education.institution}
            </p>
            <p className="mt-1 text-label text-muted">
              {PORTFOLIO_DATA.profile.education.field} ·{' '}
              {PORTFOLIO_DATA.profile.education.period} ·{' '}
              {PORTFOLIO_DATA.profile.education.location}
            </p>
          </div>

          <div className="border border-rule p-6">
            <p className="text-label text-muted">(WORK EXPERIENCE)</p>
            <h2 className="mt-3 text-subhead font-medium text-ink">
              {PORTFOLIO_DATA.profile.experience.role}
            </h2>
            <p className="mt-2 text-body text-ink">
              {PORTFOLIO_DATA.profile.experience.organization}
            </p>
            <p className="mt-1 text-label tabular-nums text-muted">
              {PORTFOLIO_DATA.profile.experience.period} ·{' '}
              {PORTFOLIO_DATA.profile.experience.location}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
