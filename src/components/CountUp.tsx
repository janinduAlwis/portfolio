import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  value: string;
  className?: string;
}

const NUM_RE = /^(\D*?)(\d+(?:[.,]\d+)?)([\s\S]*)$/;

/**
 * Matches Pamidor's 900ms cubic ease-out numeric count-up triggered on viewport entry.
 */
export const CountUp: React.FC<CountUpProps> = ({ value, className = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const playedRef = useRef(false);
  const [display, setDisplay] = useState<string | null>(null);
  const [affixes, setAffixes] = useState<[string, string]>(['', '']);

  useEffect(() => {
    const el = ref.current;
    if (!el || playedRef.current) return;
    const match = value.match(NUM_RE);
    if (!match || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const target = Number(match[2].replace(/,/g, ''));
    if (!Number.isFinite(target)) return;

    const decimals = (match[2].split(/[.,]/)[1] ?? '').length;
    const padLength = match[2].length >= 2 && match[2].startsWith('0') ? match[2].length : 0;
    let rafId = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        playedRef.current = true;
        setAffixes([match[1], match[3]]);

        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min(1, (now - start) / 900);
          const eased = 1 - Math.pow(1 - progress, 3);
          let formatted = (target * eased).toFixed(decimals);
          if (padLength > 0 && decimals === 0) {
            formatted = formatted.padStart(padLength, '0');
          }
          setDisplay(formatted);

          if (progress < 1) {
            rafId = requestAnimationFrame(step);
          } else {
            setDisplay(null);
          }
        };

        rafId = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display === null ? (
        value
      ) : (
        <>
          <span aria-hidden="true">
            {affixes[0]}
            {display}
            {affixes[1]}
          </span>
          <span className="sr-only">{value}</span>
        </>
      )}
    </span>
  );
};
