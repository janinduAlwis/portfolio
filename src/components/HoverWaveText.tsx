import React, { useMemo } from 'react';

interface HoverWaveTextProps {
  text: string;
  className?: string;
}

/**
 * Splits text into word/character spans matching Pamidor's [data-hw="true"]
 * staggered tomato-red (#D12424) character hover wave.
 */
export const HoverWaveText: React.FC<HoverWaveTextProps> = React.memo(({ text, className = '' }) => {
  const wordsWithOffsets = useMemo(() => {
    let charIndex = 0;
    return text.split(' ').map((word) => {
      const chars = Array.from(word).map((ch) => ({ ch, idx: charIndex++ }));
      return { word, chars };
    });
  }, [text]);

  return (
    <span className={className} aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {wordsWithOffsets.map(({ word, chars }, wIdx) => (
          <React.Fragment key={`${word}-${wIdx}`}>
            <span className="inline-block whitespace-nowrap">
              {chars.map(({ ch, idx }, cIdx) => (
                <span
                  key={`${idx}-${cIdx}`}
                  data-hw-char="true"
                  data-ch={ch}
                  className="inline-block"
                  style={{ '--hwi': idx } as React.CSSProperties}
                />
              ))}
            </span>
            {wIdx < wordsWithOffsets.length - 1 ? ' ' : ''}
          </React.Fragment>
        ))}
      </span>
    </span>
  );
});

HoverWaveText.displayName = 'HoverWaveText';
