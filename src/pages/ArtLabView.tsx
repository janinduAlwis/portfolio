import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Move, RotateCcw, X } from 'lucide-react';
import { LabNodePiece, PORTFOLIO_DATA } from '../data/portfolioData';
import { RoutePath } from '../components/Navbar';
import { OptimizedImage } from '../components/OptimizedImage';

interface ArtLabViewProps {
  onNavigate: (route: RoutePath) => void;
}

export const ArtLabView: React.FC<ArtLabViewProps> = ({ onNavigate }) => {
  const [offset, setOffset] = useState({ x: -40, y: -20 });
  const [dragging, setDragging] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState<LabNodePiece | null>(null);
  const dragStartRef = useRef<{ x: number; y: number; origX: number; origY: number; moved: boolean }>({
    x: 0,
    y: 0,
    origX: 0,
    origY: 0,
    moved: false,
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (selectedPiece) {
        if (e.key === 'Escape') setSelectedPiece(null);
        return;
      }
      const step = 70;
      if (e.key === 'ArrowLeft') setOffset((o) => ({ ...o, x: o.x + step }));
      if (e.key === 'ArrowRight') setOffset((o) => ({ ...o, x: o.x - step }));
      if (e.key === 'ArrowUp') setOffset((o) => ({ ...o, y: o.y + step }));
      if (e.key === 'ArrowDown') setOffset((o) => ({ ...o, y: o.y - step }));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedPiece]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    setDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      origX: offset.x,
      origY: offset.y,
      moved: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    if (Math.hypot(dx, dy) > 6) {
      dragStartRef.current.moved = true;
    }
    setOffset({
      x: dragStartRef.current.origX + dx,
      y: dragStartRef.current.origY + dy,
    });
  };

  const handlePointerUp = () => setDragging(false);

  return (
    <section className="page-enter relative flex min-h-[calc(100vh-92px)] flex-col bg-canvas">
      <div className="relative z-20 mx-auto flex w-full max-w-canvas flex-wrap items-center justify-between gap-4 border-b border-rule px-6 py-5 sm:px-10 lg:px-margin">
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => onNavigate({ page: 'home', anchor: 'art-lab' })}
            className="inline-flex min-h-[44px] items-center gap-2 text-body text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
          <div>
            <h1 className="text-body-lg font-medium text-ink">Tech &amp; Builds Lab</h1>
            <p className="text-label text-muted">
              Interactive spatial map · web, mobile, AI agents &amp; ESP8266 IoT builds
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 font-archivo text-label uppercase tracking-[0.06em] text-muted">
            <Move className="h-3.5 w-3.5" />
            Drag anywhere or use arrow keys
          </span>
          <button
            type="button"
            onClick={() => setOffset({ x: -40, y: -20 })}
            className="inline-flex min-h-[40px] items-center gap-2 border border-ink/25 px-3 py-1.5 text-label uppercase text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Draggable 2D Field */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className={`relative flex-1 overflow-hidden select-none ${
          dragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          minHeight: '72vh',
          backgroundImage:
            'radial-gradient(rgba(10,10,10,0.12) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      >
        <div
          className="absolute left-0 top-0 will-change-transform"
          style={{
            transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
            width: '1400px',
            height: '720px',
          }}
        >
          {PORTFOLIO_DATA.labNodes.map((piece) => (
            <button
              key={piece.id}
              type="button"
              onClick={() => {
                if (!dragStartRef.current.moved) setSelectedPiece(piece);
              }}
              style={{
                left: piece.x,
                top: piece.y,
                width: piece.width,
                height: piece.height,
                backgroundColor: piece.bgColor,
              }}
              className="group absolute overflow-hidden border border-ink/15 text-left shadow-sm transition-transform duration-300 ease-out-soft hover:-translate-y-1 hover:shadow-xl"
            >
              {piece.image ? (
                <OptimizedImage
                  src={piece.image}
                  alt={piece.title}
                  sizes="360px"
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${
                    piece.imageFit === 'contain' ? 'object-contain' : 'object-cover'
                  }`}
                />
              ) : (
                <div className="flex h-full w-full flex-col justify-between p-6">
                  <span
                    className="font-space text-label uppercase"
                    style={{
                      color:
                        piece.bgColor === '#0D0D0B' || piece.bgColor === '#D12424'
                          ? '#FFFFFF'
                          : '#0A0A0A',
                    }}
                  >
                    {piece.category} · {piece.year}
                  </span>
                  <span
                    className="text-subhead font-medium leading-tight"
                    style={{
                      color:
                        piece.bgColor === '#0D0D0B' || piece.bgColor === '#D12424'
                          ? '#FFFFFF'
                          : '#0A0A0A',
                    }}
                  >
                    {piece.title}
                  </span>
                </div>
              )}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <p className="text-body font-medium text-white">{piece.title}</p>
                <p className="text-label text-white/80">
                  {piece.category} · {piece.year}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedPiece && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedPiece.title}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setSelectedPiece(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-canvas p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-label text-muted">
                  {selectedPiece.category} · {selectedPiece.year}
                </p>
                <h2 className="mt-1 text-subhead font-medium text-ink">
                  {selectedPiece.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPiece(null)}
                aria-label="Close detail preview"
                className="flex h-10 w-10 items-center justify-center border border-ink/20 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {selectedPiece.image ? (
              <OptimizedImage
                src={selectedPiece.image}
                alt={selectedPiece.title}
                sizes="(max-width: 639px) 92vw, 672px"
                loading="eager"
                decoding="async"
                referrerPolicy="no-referrer"
                className={`mt-6 max-h-[55vh] w-full ${
                  selectedPiece.imageFit === 'contain' ? 'object-contain' : 'object-cover'
                }`}
              />
            ) : (
              <div
                className="mt-6 flex h-64 w-full items-center justify-center p-8"
                style={{ backgroundColor: selectedPiece.bgColor }}
              >
                <p className="text-section font-medium text-white">
                  {selectedPiece.title}
                </p>
              </div>
            )}

            <p className="mt-5 text-body text-muted">{selectedPiece.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
};
