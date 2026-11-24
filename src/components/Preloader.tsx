import React, { useCallback, useEffect, useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface PreloaderProps {
  onComplete: () => void;
}

const CHIP_IMAGES = [
  PORTFOLIO_DATA.projects[0].coverImage,
  PORTFOLIO_DATA.projects[1].coverImage,
  PORTFOLIO_DATA.projects[2].coverImage,
  PORTFOLIO_DATA.projects[3].coverImage,
  PORTFOLIO_DATA.assets.labVisualOne,
  PORTFOLIO_DATA.assets.labVisualTwo,
];

interface LoaderLetterProps {
  char: string;
  index: number;
  leaving: boolean;
}

const LoaderLetter: React.FC<LoaderLetterProps> = ({ char, index, leaving }) => (
  <span className="-mx-[0.06em] block overflow-hidden px-[0.06em]">
    <span
      className="block will-change-transform"
      style={{
        animation: leaving
          ? `loader-letter-out 420ms cubic-bezier(0.65, 0, 0.2, 1) ${26 * index}ms both`
          : `loader-letter-in 620ms cubic-bezier(0.22, 1, 0.36, 1) ${45 * index}ms both`,
      }}
    >
      {char}
    </span>
  </span>
);

/**
 * Fullscreen Pamidor-style letter-reveal curtain displaying
 * JANINDU [cycling image chip] ALWIS before unlocking the 3D Hero entrance.
 */
export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>('in');
  const [chipIndex, setChipIndex] = useState(0);

  const finish = useCallback(() => {
    document.documentElement.removeAttribute('data-loading');
    document.body.style.overflow = '';
    setPhase('done');
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish();
      return;
    }

    document.documentElement.setAttribute('data-loading', 'true');
    document.body.style.overflow = 'hidden';

    // Cycle preview thumbnails inside the center chip
    const cycleTimer = window.setInterval(() => {
      setChipIndex((prev) => (prev + 1) % CHIP_IMAGES.length);
    }, 210);

    // Begin letter-out phase
    const outTimer = window.setTimeout(() => {
      setPhase('out');
    }, 1550);

    // Unlock Hero 3D entrance right as curtain letters finish exiting
    const doneTimer = window.setTimeout(() => {
      window.clearInterval(cycleTimer);
      finish();
    }, 2200);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        window.clearInterval(cycleTimer);
        window.clearTimeout(outTimer);
        window.clearTimeout(doneTimer);
        finish();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.clearInterval(cycleTimer);
      window.clearTimeout(outTimer);
      window.clearTimeout(doneTimer);
      window.removeEventListener('keydown', onKeyDown);
      document.documentElement.removeAttribute('data-loading');
      document.body.style.overflow = '';
    };
  }, [finish]);

  if (phase === 'done') return null;

  const leftLetters = 'JANINDU'.split('');
  const rightLetters = 'ALWIS'.split('');
  const leaving = phase === 'out';

  return (
    <div
      role="status"
      aria-label="Loading Janindu Alwis portfolio"
      onClick={finish}
      className="fixed inset-0 z-[100] flex cursor-pointer select-none items-center justify-center bg-canvas px-6 transition-opacity duration-500 ease-out-soft"
      style={{
        opacity: leaving ? 0 : 1,
        transitionDelay: leaving ? '240ms' : '0ms',
      }}
    >
      <div className="flex flex-wrap items-center justify-center gap-x-[0.22em] text-display font-medium uppercase tracking-[-0.03em] text-ink">
        <span className="flex items-center">
          {leftLetters.map((ch, i) => (
            <LoaderLetter key={`l-${i}`} char={ch} index={i} leaving={leaving} />
          ))}
        </span>

        {/* Animated Cycling Preview Chip */}
        <span
          className="relative mx-[0.06em] inline-block h-[1.08em] w-[1.45em] overflow-hidden bg-night align-middle"
          style={{
            animation: leaving
              ? 'loader-letter-out 360ms cubic-bezier(0.65, 0, 0.2, 1) 120ms both'
              : 'loader-chip 380ms cubic-bezier(0.22, 1, 0.36, 1) 420ms both',
          }}
        >
          {CHIP_IMAGES.map((src, idx) => (
            <img
              key={`${src}-${idx}`}
              src={src}
              alt=""
              referrerPolicy="no-referrer"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-150 ${
                idx === chipIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </span>

        <span className="flex items-center">
          {rightLetters.map((ch, i) => (
            <LoaderLetter
              key={`r-${i}`}
              char={ch}
              index={leftLetters.length + i}
              leaving={leaving}
            />
          ))}
        </span>
      </div>

      <span className="sr-only">Click or press Escape to skip intro</span>
    </div>
  );
};
