import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { RoutePath } from '../components/Navbar';

interface LegalViewProps {
  type: 'privacy' | 'terms';
  onNavigate: (route: RoutePath) => void;
}

export const LegalView: React.FC<LegalViewProps> = ({ type, onNavigate }) => {
  const isPrivacy = type === 'privacy';

  return (
    <section className="page-enter bg-canvas pt-6 pb-24 lg:pt-12 lg:pb-36">
      <div className="mx-auto w-full max-w-canvas px-6 sm:px-10 lg:px-margin">
        <button
          type="button"
          onClick={() => onNavigate({ page: 'home', anchor: 'top' })}
          className="inline-flex min-h-[44px] items-center gap-2 text-body text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>

        <div className="mt-8 max-w-2xl">
          <p className="text-label text-muted">(LEGAL)</p>
          <h1 className="mt-3 text-section font-medium text-ink">
            {isPrivacy ? 'Privacy Policy' : 'Terms of Use'}
          </h1>

          <div className="mt-8 flex flex-col gap-5 text-body-lg text-muted">
            {isPrivacy ? (
              <>
                <p>
                  Details submitted through the inquiry form (name, email, phone, and
                  message) are used strictly to respond to software engineering internship
                  or project collaboration inquiries.
                </p>
                <p>
                  No personal details are sold or shared with third parties.
                </p>
                <p>
                  For any inquiries, email{' '}
                  <a
                    href={`mailto:${PORTFOLIO_DATA.brand.email}`}
                    className="text-ink underline underline-offset-4 hover:text-accent"
                  >
                    {PORTFOLIO_DATA.brand.email}
                  </a>
                  .
                </p>
              </>
            ) : (
              <>
                <p>
                  All project case studies, technical specifications, and portfolio assets
                  presented on this site belong to © 2026 {PORTFOLIO_DATA.brand.fullName}
                  and respective academic or open-source project contributors.
                </p>
                <p>
                  Source repositories linked on GitHub remain governed by their respective
                  repository licenses.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
