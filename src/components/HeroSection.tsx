import React, { useEffect, useRef } from 'react';
import {
  Bot,
  Code2,
  Cpu,
  Database,
  Radio,
  Smartphone,
  Terminal,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Navbar, RoutePath } from './Navbar';

interface HeroSectionProps {
  menuOpen: boolean;
  onToggleMenu: () => void;
  onNavigate: (route: RoutePath) => void;
}

interface TrailIconItem {
  id: string;
  label: string;
  Icon: LucideIcon;
  cardClass: string;
}

const TRAIL_ICONS: TrailIconItem[] = [
  {
    id: 'react-next',
    label: 'React / Next',
    Icon: Code2,
    cardClass: 'border-white/20 bg-night text-canvas',
  },
  {
    id: 'mobile-expo',
    label: 'Mobile',
    Icon: Smartphone,
    cardClass: 'border-ink/20 bg-canvas text-ink',
  },
  {
    id: 'ai-agents',
    label: 'AI Agents',
    Icon: Bot,
    cardClass: 'border-accent bg-accent text-white',
  },
  {
    id: 'iot-esp',
    label: 'IoT / ESP',
    Icon: Cpu,
    cardClass: 'border-white/20 bg-night text-canvas',
  },
  {
    id: 'databases',
    label: 'Databases',
    Icon: Database,
    cardClass: 'border-ink/20 bg-canvas text-ink',
  },
  {
    id: 'n8n-flow',
    label: 'n8n Flow',
    Icon: Workflow,
    cardClass: 'border-white/20 bg-night text-canvas',
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    Icon: Terminal,
    cardClass: 'border-accent bg-accent text-white',
  },
  {
    id: 'mqtt',
    label: 'MQTT',
    Icon: Radio,
    cardClass: 'border-ink/20 bg-canvas text-ink',
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
  const trailContainerRef = useRef<HTMLDivElement>(null);
  const personImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = trailContainerRef.current;
    const parent = personImageRef.current;
    if (
      !container ||
      !parent ||
      !window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches
    ) {
      return;
    }

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

    parent.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      parent.removeEventListener('pointermove', onPointerMove);
      slots.forEach((s) => s.anim?.cancel());
    };
  }, []);

  return (
    <section
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
            <img
              src={PORTFOLIO_DATA.assets.coverPortrait}
              alt={PORTFOLIO_DATA.brand.fullName}
              draggable={false}
              className="pointer-events-none block h-full w-auto max-w-none select-none object-contain object-bottom"
            />
          </div>

          <div
            ref={trailContainerRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10"
          >
            {TRAIL_ICONS.map(({ id, label, Icon, cardClass }) => (
              <div
                key={id}
                className="absolute left-0 top-0"
                style={{ width: 'calc(88 * var(--px))', height: 'calc(88 * var(--px))' }}
              >
                <div
                  data-trail-card="true"
                  className={`flex h-full w-full flex-col items-center justify-center gap-1.5 border opacity-0 shadow-2xl ${cardClass}`}
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
                  <Icon className="h-7 w-7" strokeWidth={1.6} />
                  <span className="font-space text-[9px] font-medium uppercase tracking-[0.08em] opacity-80">
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pointer-events-none relative z-20 flex w-full flex-col lg:max-w-[52%] lg:translate-y-[6vh]">
            <div className="pointer-events-auto">
            <h1
              data-hero-name="true"
              data-hero-3d-lines="true"
              className="-ml-[0.04em] w-full text-display font-medium text-ink"
              style={{ '--h3d': '140ms' } as React.CSSProperties}
            >
              <span className="block">{PORTFOLIO_DATA.brand.firstName}</span>
              <span className="block">{PORTFOLIO_DATA.brand.lastName}</span>
            </h1>

            <p
              data-hero-3d-lines="true"
              className="mt-4 text-body-lg text-ink lg:mt-[calc(16*var(--px))]"
              style={{ '--h3d': '340ms' } as React.CSSProperties}
            >
              <span className="block">{PORTFOLIO_DATA.brand.tagline}</span>
              <span className="block">{PORTFOLIO_DATA.brand.subTagline}</span>
            </p>

            <div data-hero-3d="true" style={{ '--h3d': '520ms' } as React.CSSProperties}>
              <div className="mt-7 flex max-w-[calc(500*var(--px))] flex-wrap gap-[calc(8*var(--px))] lg:mt-[calc(28*var(--px))]">
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
        </div>

        <div className="relative z-10 mx-auto w-full max-w-canvas px-6 sm:px-10 lg:px-margin">
          <div aria-hidden="true" className="h-[1.5px] w-full bg-[#B4B5B8]/70" />
        </div>
      </div>
    </section>
  );
};
