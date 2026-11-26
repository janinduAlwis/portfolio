import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Plus, Minus, FileText } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { HoverWaveText } from '../components/HoverWaveText';
import { RoutePath } from '../components/Navbar';
import { OptimizedImage } from '../components/OptimizedImage';

interface StudioViewProps {
  onNavigate: (route: RoutePath) => void;
}

export const StudioView: React.FC<StudioViewProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="page-enter bg-canvas pt-6 pb-20 lg:pt-12 lg:pb-32">
      <div className="mx-auto w-full max-w-canvas px-6 sm:px-10 lg:px-margin">
        <button
          type="button"
          onClick={() => onNavigate({ page: 'home', anchor: 'top' })}
          className="inline-flex min-h-[44px] items-center gap-2 text-body text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-label text-muted">(SOFTWARE TECHNOLOGY · USJ SRI LANKA)</p>
            <h1 className="mt-3 text-display font-medium text-ink">Profile</h1>
          </div>

          <a
            href={PORTFOLIO_DATA.brand.cvPdfPath}
            target="_blank"
            rel="noopener noreferrer"
            data-hw="true"
            className="inline-flex min-h-[44px] items-center gap-3 border border-ink bg-ink px-5 py-2.5 text-body font-medium text-white transition-colors [--hw-base:#fff] hover:bg-transparent hover:text-ink"
          >
            <FileText className="h-4 w-4" />
            <HoverWaveText text="Open Full CV (PDF)" />
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        {/* Key Facts Row */}
        <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-rule py-6 sm:grid-cols-4 lg:mt-14">
          {PORTFOLIO_DATA.profile.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-label uppercase text-muted">{fact.label}</dt>
              <dd className="mt-1.5 text-subhead font-medium tabular-nums text-ink">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Bio & Portrait */}
        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex flex-col items-center justify-center bg-night p-10 text-center text-white">
              <OptimizedImage
                src={PORTFOLIO_DATA.assets.portrait}
                alt={PORTFOLIO_DATA.brand.fullName}
                sizes="192px"
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                className="h-48 w-48 rounded-full border-2 border-white/25 object-cover"
              />
              <p className="mt-6 text-subhead font-medium text-white">
                {PORTFOLIO_DATA.brand.fullName}
              </p>
              <p className="mt-1.5 text-body text-night-body">
                {PORTFOLIO_DATA.brand.degree}
              </p>
              <p className="mt-1 text-label uppercase tracking-[0.08em] text-night-muted">
                {PORTFOLIO_DATA.brand.location}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-label text-muted">(SUMMARY)</p>
            <h2 className="mt-4 text-lead font-medium text-ink">
              {PORTFOLIO_DATA.profile.introLead}
            </h2>

            <div className="mt-6 flex flex-col gap-5 text-body-lg text-muted">
              {PORTFOLIO_DATA.profile.bodyParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <blockquote className="mt-10 border-t border-rule pt-6 text-subhead font-medium text-ink">
              “{PORTFOLIO_DATA.profile.manifesto}”
            </blockquote>
          </div>
        </div>

        {/* Education, Experience, & Referee */}
        <div className="mt-20 grid grid-cols-1 gap-10 border-t border-rule pt-12 md:grid-cols-3">
          <div>
            <p className="text-label text-muted">(EDUCATION)</p>
            <h3 className="mt-3 text-body-lg font-medium text-ink">
              {PORTFOLIO_DATA.profile.education.degree}
            </h3>
            <p className="mt-1 text-body text-ink">
              {PORTFOLIO_DATA.profile.education.institution}
            </p>
            <p className="mt-2 text-label text-muted">
              {PORTFOLIO_DATA.profile.education.field} ·{' '}
              {PORTFOLIO_DATA.profile.education.period}
            </p>
            <a
              href={PORTFOLIO_DATA.profile.education.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-label underline underline-offset-4 hover:text-accent"
            >
              www.sjp.ac.lk
            </a>
          </div>

          <div>
            <p className="text-label text-muted">(EXPERIENCE)</p>
            <h3 className="mt-3 text-body-lg font-medium text-ink">
              {PORTFOLIO_DATA.profile.experience.role}
            </h3>
            <p className="mt-1 text-body text-ink">
              {PORTFOLIO_DATA.profile.experience.organization}
            </p>
            <p className="mt-2 text-label tabular-nums text-muted">
              {PORTFOLIO_DATA.profile.experience.period} ·{' '}
              {PORTFOLIO_DATA.profile.experience.location}
            </p>
          </div>

          <div>
            <p className="text-label text-muted">(PROFESSIONAL REFEREE)</p>
            <h3 className="mt-3 text-body-lg font-medium text-ink">
              {PORTFOLIO_DATA.profile.referee.name}
            </h3>
            <p className="mt-1 text-body text-muted">
              {PORTFOLIO_DATA.profile.referee.title}
            </p>
            <p className="mt-1 text-label text-muted">
              {PORTFOLIO_DATA.profile.referee.faculty}
            </p>
            <p className="mt-3 text-label tabular-nums text-ink">
              {PORTFOLIO_DATA.profile.referee.phone} ·{' '}
              <a
                href={`mailto:${PORTFOLIO_DATA.profile.referee.email}`}
                className="underline underline-offset-4 hover:text-accent"
              >
                {PORTFOLIO_DATA.profile.referee.email}
              </a>
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 border-t border-rule pt-12">
          <p className="text-label text-muted">(QUESTIONS &amp; AVAILABILITY)</p>
          <div className="mt-6 divide-y divide-rule border-b border-rule">
            {PORTFOLIO_DATA.profile.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q} className="py-5">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 text-left"
                  >
                    <span className="text-body-lg font-medium text-ink">{faq.q}</span>
                    {isOpen ? (
                      <Minus className="h-5 w-5 shrink-0 text-accent" />
                    ) : (
                      <Plus className="h-5 w-5 shrink-0 text-ink" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="mt-3 max-w-[68ch] text-body text-muted">{faq.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12">
          <button
            type="button"
            data-hw="true"
            onClick={() => onNavigate({ page: 'home', anchor: 'start-project' })}
            className="inline-flex min-h-[44px] items-center gap-3 border border-ink bg-ink px-5 py-3 text-body font-medium text-white transition-colors [--hw-base:#fff] hover:bg-transparent hover:text-ink"
          >
            <HoverWaveText text="Get In Touch" />
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
