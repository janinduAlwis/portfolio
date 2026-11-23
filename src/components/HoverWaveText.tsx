import React from 'react';

interface HoverWaveTextProps {
  text: string;
  className?: string;
}

/**
 * Splits text into word/character spans matching Pamidor's [data-hw="true"]
 * staggered tomato-red (#D12424) character hover wave.
 */
export const HoverWaveText: React.FC<HoverWaveTextProps> = ({ text, className = '' }) => {
  let charIndex = 0;
  const words = text.split(' ');

  return (
    <span className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wIdx) => (
          <React.Fragment key={`${word}-${wIdx}`}>
            <span className="inline-block whitespace-nowrap">
              {Array.from(word).map((ch, cIdx) => {
                const idx = charIndex++;
                return (
                  <span
                    key={`${idx}-${cIdx}`}
                    data-hw-char="true"
                    data-ch={ch}
                    className="inline-block"
                    style={{ '--hwi': idx } as React.CSSProperties}
                  />
                );
              })}
            </span>
            {wIdx < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        ))}
      </span>
    </span>
  );
};
