import React, { useEffect, useRef, useState } from 'react';

/**
 * Desktop-only precision cursor that follows pointer via GPU translate3d,
 * reacts to pointerdown ([data-cursor="down"]), expands on interactive elements,
 * and inverts automatically over dark [data-cursor-invert="true"] sections.
 */
export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [inverted, setInverted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || reducedMotion) return;

    setEnabled(true);

    let rafId = 0;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const onDown = () => document.documentElement.setAttribute('data-cursor', 'down');
    const onUp = () => document.documentElement.removeAttribute('data-cursor');

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) setVisible(true);

      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
      if (el) {
        const isDark = Boolean(el.closest('[data-cursor-invert="true"]'));
        setInverted(isDark);
        const isInteractive = Boolean(
          el.closest('a, button, input, select, textarea, [role="button"], [data-cursor-hover="true"]')
        );
        setHovering(isInteractive);
      }
    };

    const onLeave = () => setVisible(false);

    const tick = () => {
      currentX += (targetX - currentX) * 0.28;
      currentY += (targetY - currentY) * 0.28;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    window.addEventListener('blur', onUp);
    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      window.removeEventListener('blur', onUp);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeAttribute('data-cursor');
      cancelAnimationFrame(rafId);
    };
  }, [visible]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[95] -ml-2 -mt-2 hidden lg:block"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 180ms ease',
      }}
    >
      <div
        id="custom-cursor-ring"
        className="rounded-full transition-all duration-200 ease-out-soft"
        style={{
          width: hovering ? '26px' : '12px',
          height: hovering ? '26px' : '12px',
          marginLeft: hovering ? '-7px' : '0px',
          marginTop: hovering ? '-7px' : '0px',
          backgroundColor: hovering
            ? 'rgba(209, 36, 36, 0.22)'
            : inverted
            ? '#EFEEEB'
            : '#0A0A0A',
          border: hovering ? '1.5px solid #D12424' : '1.5px solid transparent',
        }}
      />
    </div>
  );
};
