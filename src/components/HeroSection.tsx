import React, { useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Navbar, RoutePath } from './Navbar';
import { OptimizedImage } from './OptimizedImage';

interface HeroSectionProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
  onNavigate: (route: RoutePath) => void;
}

interface TrailIconItem {
  id: string;
  src: string;
}

const TRAIL_ICONS: TrailIconItem[] = [
  {
    id: 'symbol-1',
    src: '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_34_54_AM-1_be18f3c9.png',
  },
  {
    id: 'symbol-2',
    src: '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_35_01_AM-2_4f81eec5.png',
  },
  {
    id: 'symbol-4',
    src: '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_35_05_AM-4_34ac1c20.png',
  },
  {
    id: 'symbol-5',
    src: '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_35_08_AM-5_838f22ff.png',
  },
  {
    id: 'symbol-6',
    src: '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_35_11_AM-6_453fb98d.png',
  },
  {
    id: 'symbol-7',
    src: '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_35_14_AM-7_28e2bf50.png',
  },
  {
    id: 'symbol-8',
    src: '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_35_16_AM-8_8cfe7366.png',
  },
  {
    id: 'symbol-9',
    src: '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_35_21_AM-9_caeab0c1.png',
  },
  {
    id: 'symbol-10',
    src: '/assets/aistudio/ChatGPT_Image_Nov_26__2026__10_35_22_AM-10_805e193f.png',
  },
];

const POOL_SIZE = TRAIL_ICONS.length;
const MAX_ACTIVE_TRAIL = 4;

// Cropping region [47%..95%] of the 1704x923 cover asset excludes left baked text and right ribbon
export const HeroSection: React.FC<HeroSectionProps> = ({
  menuOpen,
  onToggleMenu,
  onNavigate,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const trailContainerRef = useRef<HTMLDivElement>(null);
  const personImageRef = useRef<HTMLDivElement>(null);
  const portraitImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = trailContainerRef.current;
    const person = personImageRef.current;
    const img = portraitImgRef.current;
    if (
      !section ||
      !container ||
      !person ||
      !img ||
      !window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches
    ) {
      return;
    }

    // Pixel-accurate alpha silhouette mask so symbols only trigger on the person (head + body), never background
    let maskData: Uint8ClampedArray | null = null;
    let maskW = 0;
    let maskH = 0;

    const buildAlphaMask = () => {
      if (!img.naturalWidth || !img.naturalHeight) return;
      const targetW = 192;
      const targetH = Math.max(1, Math.round((img.naturalHeight / img.naturalWidth) * targetW));
      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, targetW, targetH);
      maskData = ctx.getImageData(0, 0, targetW, targetH).data;
      maskW = targetW;
      maskH = targetH;
    };

    if (img.complete && img.naturalWidth > 0) {
      buildAlphaMask();
    } else {
      img.addEventListener('load', buildAlphaMask, { once: true });
    }

    const isOverPerson = (clientX: number, clientY: number) => {
      if (!maskData || !maskW || !maskH) return false;
      const iRect = img.getBoundingClientRect();
      if (iRect.width <= 0 || iRect.height <= 0) return false;
      const u = (clientX - iRect.left) / iRect.width;
      const v = (clientY - iRect.top) / iRect.height;
      if (u < 0 || u >= 1 || v < 0 || v >= 1) return false;
      const px = Math.min(maskW - 1, Math.max(0, Math.floor(u * maskW)));
      const py = Math.min(maskH - 1, Math.max(0, Math.floor(v * maskH)));
      const alpha = maskData[(py * maskW + px) * 4 + 3];
      return alpha > 20;
    };

    const slots = Array.from(container.children).map((el) => ({
      el: el as HTMLDivElement,
      card: el.querySelector('[data-trail-card]') as HTMLDivElement,
      anim: null as Animation | null,
    }));

    let slotCursor = 0;
    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;
    const active: typeof slots = [];

    const accelerateOldest = (slot: (typeof slots)[number]) => {
      if (slot.anim && slot.anim.currentTime !== null) {
        slot.anim.currentTime = Math.max(Number(slot.anim.currentTime), 520);
        slot.anim.playbackRate = 2.4;
      }
    };

    const spawn = (x: number, y: number) => {
      const slot = slots[slotCursor];
      slotCursor = (slotCursor + 1) % POOL_SIZE;

      if (active.length >= MAX_ACTIVE_TRAIL) {
        const oldest = active.shift();
        if (oldest) accelerateOldest(oldest);
      }

      if (slot.anim) slot.anim.cancel();

      const tilt = (Math.random() - 0.5) * 9;
      slot.el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${tilt}deg)`;
      slot.card.style.opacity = '1';

      // Diagonal linear-gradient mask wipe matching pamidordesign.co
      slot.anim = slot.card.animate(
        [
          { maskPosition: '100% 0%', opacity: 0.95, transform: 'scale(0.92)' },
          { maskPosition: '40% 0%', opacity: 1, transform: 'scale(1)', offset: 0.35 },
          { maskPosition: '35% 0%', opacity: 1, transform: 'scale(1)', offset: 0.65 },
          { maskPosition: '-60% 0%', opacity: 0, transform: 'scale(0.96)' },
        ],
        {
          duration: 840,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'forwards',
        }
      );

      active.push(slot);
      slot.anim.onfinish = () => {
        slot.card.style.opacity = '0';
        const idx = active.indexOf(slot);
        if (idx !== -1) active.splice(idx, 1);
      };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      if ((e.target as HTMLElement | null)?.closest('button, a')) return;
      if (!isOverPerson(e.clientX, e.clientY)) return;

      const now = performance.now();
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const dist = Math.hypot(x - lastX, y - lastY);

      if (now - lastTime < 70 || dist < 32) return;
      lastTime = now;
      lastX = x;
      lastY = y;
      spawn(x, y);
    };

    section.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      section.removeEventListener('pointermove', onPointerMove);
      img.removeEventListener('load', buildAlphaMask);
      slots.forEach((s) => s.anim?.cancel());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 74% 88% at 70% 45%, #F2F2F2 0%, #E3E4E6 54%, #D0D1D4 100%)',
      }}
    >
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-canvas flex-col">
        <Navbar
          menuOpen={menuOpen}
          onToggleMenu={onToggleMenu}
          onNavigate={onNavigate}
          overlay
        />

        <div className="relative flex min-h-0 flex-1 items-start px-6 pb-16 pt-12 sm:px-10 lg:items-center lg:px-margin lg:pb-24 lg:pt-0">
          <div
            ref={personImageRef}
            className="pointer-events-auto absolute bottom-0 right-[-8%] z-[1] h-[68svh] w-auto sm:right-[-2%] sm:h-[76svh] lg:right-[0%] lg:h-[100svh]"
          >
            <OptimizedImage
              ref={portraitImgRef}
              src={PORTFOLIO_DATA.assets.coverPortrait}
              alt={PORTFOLIO_DATA.brand.fullName}
              sizes="(max-width: 639px) 60vw, 45vw"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              draggable={false}
              className="pointer-events-none block h-full w-auto max-w-none select-none object-contain object-bottom"
            />
          </div>

          <div
            ref={trailContainerRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10"
          >
            {TRAIL_ICONS.map(({ id, src }) => (
              <div
                key={id}
                className="absolute left-0 top-0"
                style={{ width: 'calc(84 * var(--px))', height: 'calc(84 * var(--px))' }}
              >
                <div
                  data-trail-card="true"
                  className="flex h-full w-full items-center justify-center opacity-0"
                  style={{
                    WebkitMaskImage:
                      'linear-gradient(105deg, #000 45%, rgba(0, 0, 0, 0) 62%)',
                    maskImage:
                      'linear-gradient(105deg, #000 45%, rgba(0, 0, 0, 0) 62%)',
                    WebkitMaskSize: '280% 100%',
                    maskSize: '280% 100%',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: '100% 0%',
                    maskPosition: '100% 0%',
                  }}
                >
                  <OptimizedImage
                    src={src}
                    alt=""
                    sizes="120px"
                    draggable={false}
                    loading="eager"
                    decoding="async"
                    className="h-full w-full select-none object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pointer-events-none relative z-20 flex w-full flex-col lg:max-w-[52%] lg:translate-y-[6vh]">
            <h1
              data-hero-name="true"
              data-hero-3d-lines="true"
              className="pointer-events-auto -ml-[0.04em] w-fit text-display font-medium text-ink"
              style={{ '--h3d': '140ms' } as React.CSSProperties}
            >
              <span className="block w-fit">{PORTFOLIO_DATA.brand.firstName}</span>
              <span className="block w-fit">{PORTFOLIO_DATA.brand.lastName}</span>
            </h1>

            <p
              data-hero-3d-lines="true"
              className="pointer-events-auto mt-4 w-fit text-body-lg text-ink lg:mt-[calc(16*var(--px))]"
              style={{ '--h3d': '340ms' } as React.CSSProperties}
            >
              <span className="block">{PORTFOLIO_DATA.brand.tagline}</span>
              <span className="block">{PORTFOLIO_DATA.brand.subTagline}</span>
            </p>

            <div data-hero-3d="true" style={{ '--h3d': '520ms' } as React.CSSProperties}>
              <div className="pointer-events-auto mt-7 flex w-fit max-w-[calc(500*var(--px))] flex-wrap gap-[calc(8*var(--px))] lg:mt-[calc(28*var(--px))]">
                {PORTFOLIO_DATA.disciplines.map((discipline) => (
                  <span
                    key={discipline}
                    className="inline-flex min-h-[calc(44*var(--px))] items-center border border-[#A2A3A6] bg-white/15 px-5 py-[calc(10*var(--px))] text-center font-archivo text-[14px] font-medium tracking-[-0.01em] text-ink"
                  >
                    {discipline}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-canvas px-6 sm:px-10 lg:px-margin">
          <div aria-hidden="true" className="h-[1.5px] w-full bg-[#B4B5B8]/70" />
        </div>
      </div>
    </section>
  );
};
