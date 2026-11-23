import React from 'react';

interface WordmarkProps {
  variant?: 'ink' | 'light';
  className?: string;
}

/**
 * Geometric SVG wordmark for JANINDU.STUDIO® matching the crisp top-left studio lockup.
 */
export const Wordmark: React.FC<WordmarkProps> = ({ variant = 'ink', className = '' }) => {
  const fill = variant === 'light' ? '#FFFFFF' : '#0A0A0A';

  return (
    <svg
      viewBox="0 0 800 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="JANINDU ALWIS"
    >
      <text
        x="0"
        y="78"
        fill={fill}
        fontFamily="var(--font-archivo), var(--font-funnel), 'Helvetica Neue', Arial, sans-serif"
        fontWeight="700"
        fontSize="100"
        letterSpacing="1.5"
      >
        JANINDU ALWIS
      </text>
    </svg>
  );
};
