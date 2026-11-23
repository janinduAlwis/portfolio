import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { AwwwardsBadge } from './components/AwwwardsBadge';
import { Navbar, RoutePath } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatementSection } from './components/StatementSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ArtLabSection } from './components/ArtLabSection';
import { SkillsetSection } from './components/SkillsetSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseStudyView } from './pages/CaseStudyView';
import { StudioView } from './pages/StudioView';
import { ArtLabView } from './pages/ArtLabView';
import { ArtShopView } from './pages/ArtShopView';
import { LegalView } from './pages/LegalView';

export default function App() {
  const [route, setRoute] = useState<RoutePath>({ page: 'home' });
  const [menuOpen, setMenuOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis inertia smooth scrolling
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Pause Lenis scroll while fullscreen menu or preloader is active
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (menuOpen || !introDone) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [menuOpen, introDone]);

  const handleNavigate = (nextRoute: RoutePath) => {
    setRoute(nextRoute);
    setMenuOpen(false);

    if (nextRoute.page === 'home' && nextRoute.anchor) {
      window.setTimeout(() => {
        const target = nextRoute.anchor === 'top' ? 0 : `#${nextRoute.anchor}`;
        if (lenisRef.current) {
          lenisRef.current.start();
          lenisRef.current.scrollTo(target);
        } else {
          const el = document.getElementById(nextRoute.anchor!);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 40);
    } else {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    }
  };

  useEffect(() => {
    const pageTitleMap: Record<RoutePath['page'], string> = {
      home: 'Janindu Dilshan De Alwis — Software Engineering Portfolio',
      studio: 'Profile & Education — Janindu Dilshan De Alwis',
      'art-lab': 'Tech & Builds Lab — Janindu Dilshan De Alwis',
      shop: 'Certifications & CV — Janindu Dilshan De Alwis',
      work: 'Project Case Study — Janindu Dilshan De Alwis',
      privacy: 'Privacy Policy — Janindu Dilshan De Alwis',
      terms: 'Terms — Janindu Dilshan De Alwis',
    };
    document.title = pageTitleMap[route.page];
  }, [route]);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {!introDone && <Preloader onComplete={() => setIntroDone(true)} />}
      <CustomCursor />
      <AwwwardsBadge />

      {route.page === 'home' ? (
        <main id="main">
          <HeroSection
            menuOpen={menuOpen}
            onToggleMenu={() => setMenuOpen((o) => !o)}
            onNavigate={handleNavigate}
          />
          <StatementSection />
          <ProjectsSection onNavigate={handleNavigate} />
          <ArtLabSection onNavigate={handleNavigate} />
          <SkillsetSection />
          <ContactSection onNavigate={handleNavigate} />
        </main>
      ) : (
        <>
          <Navbar
            menuOpen={menuOpen}
            onToggleMenu={() => setMenuOpen((o) => !o)}
            onNavigate={handleNavigate}
          />
          <main id="main">
            {route.page === 'work' && (
              <CaseStudyView slug={route.slug} onNavigate={handleNavigate} />
            )}
            {route.page === 'studio' && <StudioView onNavigate={handleNavigate} />}
            {route.page === 'art-lab' && <ArtLabView onNavigate={handleNavigate} />}
            {route.page === 'shop' && <ArtShopView onNavigate={handleNavigate} />}
            {route.page === 'privacy' && (
              <LegalView type="privacy" onNavigate={handleNavigate} />
            )}
            {route.page === 'terms' && (
              <LegalView type="terms" onNavigate={handleNavigate} />
            )}
          </main>
        </>
      )}

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
