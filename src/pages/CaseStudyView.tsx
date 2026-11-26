import React from 'react';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { PORTFOLIO_DATA, ProjectCaseStudy } from '../data/portfolioData';
import { HoverWaveText } from '../components/HoverWaveText';
import { RoutePath } from '../components/Navbar';
import { OptimizedImage } from '../components/OptimizedImage';

interface CaseStudyViewProps {
  slug: string;
  onNavigate: (route: RoutePath) => void;
}

export const CaseStudyView: React.FC<CaseStudyViewProps> = ({ slug, onNavigate }) => {
  const projectIndex = PORTFOLIO_DATA.projects.findIndex((p) => p.slug === slug);
  const project: ProjectCaseStudy =
    PORTFOLIO_DATA.projects[projectIndex >= 0 ? projectIndex : 0];
  const nextProject =
    PORTFOLIO_DATA.projects[(projectIndex + 1) % PORTFOLIO_DATA.projects.length];

  return (
    <article className="page-enter bg-canvas pt-6 pb-20 lg:pt-12 lg:pb-32">
      <div className="mx-auto w-full max-w-canvas px-6 sm:px-10 lg:px-margin">
        <button
          type="button"
          onClick={() => onNavigate({ page: 'home', anchor: 'projects' })}
          className="inline-flex min-h-[44px] items-center gap-2 text-body text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Selected Projects</span>
        </button>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-label uppercase text-muted">
              (CASE STUDY · {project.index})
            </p>
            <h1 className="mt-3 text-display font-medium uppercase text-ink">
              {project.title}
            </h1>
          </div>

          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-hw="true"
            className="inline-flex min-h-[44px] items-center gap-3 border border-ink bg-ink px-5 py-2.5 text-body font-medium text-white transition-colors [--hw-base:#fff] hover:bg-transparent hover:text-ink"
          >
            <Github className="h-4 w-4" />
            <HoverWaveText text="View Repository" />
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2.5">
          {project.disciplines.map((d) => (
            <li
              key={d}
              className="border-[1.2px] border-chip px-3.5 py-1.5 font-archivo text-label font-medium text-ink"
            >
              {d}
            </li>
          ))}
        </ul>

        {/* Cover Image */}
        <div className="mt-10 overflow-hidden bg-night lg:mt-14">
          <OptimizedImage
            src={project.coverImage}
            alt={project.coverAlt}
            sizes="(max-width: 639px) 92vw, (max-width: 1023px) 90vw, 1312px"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            referrerPolicy="no-referrer"
            className="aspect-[16/9] w-full object-cover"
          />
        </div>

        {/* Overview + Specs */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-lead font-medium text-ink">{project.overview}</p>
          </div>

          <dl className="grid grid-cols-2 gap-6 border-t border-rule pt-6 lg:col-span-4 lg:col-start-9 lg:border-t-0 lg:pt-0">
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

        <div aria-hidden="true" className="my-14 h-[1.5px] w-full bg-rule lg:my-20" />

        {/* My Role & Context */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-label text-muted">(MY CONTRIBUTIONS)</p>
            <ul className="mt-5 flex flex-col gap-4">
              {project.myRole.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-body text-ink">
                  <span className="font-space text-label tabular-nums text-accent">
                    0{idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-label text-muted">{project.problemOrContext.kicker}</p>
            <h2 className="mt-4 text-subhead font-medium text-ink">
              {project.problemOrContext.heading}
            </h2>
            <p className="mt-4 text-body-lg text-muted">
              {project.problemOrContext.body}
            </p>
          </div>
        </div>

        <div aria-hidden="true" className="my-14 h-[1.5px] w-full bg-rule lg:my-20" />

        {/* Engineering Approach */}
        <div>
          <p className="text-label text-muted">(ENGINEERING APPROACH)</p>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            {project.approach.map((step) => (
              <div key={step.number} className="border-t border-ink/20 pt-5">
                <span className="font-space text-label tabular-nums text-accent">
                  {step.number}
                </span>
                <h3 className="mt-3 text-body-lg font-medium text-ink">{step.title}</h3>
                <p className="mt-2.5 text-body text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Architecture Specimen */}
        <div
          data-cursor-invert="true"
          className="mt-16 bg-night p-6 text-white sm:p-10 lg:mt-24 lg:p-14"
        >
          <p className="text-label text-night-muted">(ARCHITECTURE &amp; STACK)</p>
          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-label text-night-muted">PRIMARY STACK</p>
              <p className="mt-2 text-subhead font-medium text-white">
                {project.systemSpecs.primaryFont}
              </p>
              <p className="mt-1 font-archivo text-body text-night-body">
                Paired with {project.systemSpecs.secondaryFont}
              </p>

              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/15 pt-6">
                {project.systemSpecs.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="text-subhead font-medium tabular-nums text-white">{m.value}</p>
                    <p className="mt-1 text-label text-night-muted">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-label text-night-muted">SYSTEM TOKENS</p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {project.systemSpecs.palette.map((swatch) => (
                  <div key={swatch.hex} className="border border-white/15 p-2.5">
                    <div
                      className="h-16 w-full"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <p className="mt-2.5 text-label text-white">{swatch.name}</p>
                    <p className="font-space text-label tabular-nums text-night-muted">
                      {swatch.hex}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Next Project */}
        <div className="mt-16 border-t border-rule pt-10 lg:mt-24">
          <p className="text-label text-muted">(NEXT PROJECT)</p>
          <button
            type="button"
            data-hw="true"
            onClick={() => onNavigate({ page: 'work', slug: nextProject.slug })}
            className="group mt-3 flex w-full items-center justify-between text-left"
          >
            <span className="text-section font-medium text-ink transition-colors group-hover:text-accent">
              <HoverWaveText text={nextProject.title} />
            </span>
            <ArrowUpRight className="h-8 w-8 text-ink transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
          </button>
        </div>
      </div>
    </article>
  );
};
