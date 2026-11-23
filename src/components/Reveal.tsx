import React, { useLayoutEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Matches Pamidor's IntersectionObserver scroll-reveal:
 * elements start in data-reveal="waiting" (translated 13px down)
 * and settle smoothly to data-reveal="shown" upon entering viewport.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'ssr' | 'waiting' | 'shown'>('ssr');

  useLayoutEffect(() => {
    const el = ref.current;
    if (
      !el ||
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    setState('waiting');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown');
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={state}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  );
};
