import React from 'react';

export const AwwwardsBadge: React.FC = () => {
  return (
    <div id="awwwards" className="fixed right-0 top-1/2 z-[15] hidden -translate-y-1/2 sm:block">
      <a
        href="https://www.awwwards.com/sites/pamidor-design-2"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Awwwards Nominee — Pamidor Design inspiration"
        className="group block bg-ink px-3 py-4 text-white transition-colors duration-200 hover:bg-accent"
      >
        <div className="flex flex-col items-center gap-6">
          <span className="font-space text-[15px] font-bold tracking-tight">W.</span>
          <span
            className="font-archivo text-[11px] font-medium tracking-[0.06em]"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Nominee
          </span>
        </div>
      </a>
    </div>
  );
};
