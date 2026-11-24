import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { HoverWaveText } from './HoverWaveText';
import { RoutePath } from './Navbar';
import { Reveal } from './Reveal';

interface ContactSectionProps {
  onNavigate: (route: RoutePath) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('Software Engineering Internship');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      return;
    }
    video.play().catch(() => {});
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Please enter your name and email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="relative bg-canvas">
      <section
        id="start-project"
        className="relative flex min-h-[100dvh] w-full flex-col justify-center overflow-hidden py-8 sm:py-12 lg:h-[100dvh] lg:min-h-0 lg:py-6"
      >
        <video
          ref={videoRef}
          src={PORTFOLIO_DATA.assets.contactSkyVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={PORTFOLIO_DATA.assets.contactSky}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#0D0D0B]/35"
        />

        <div className="relative mx-auto w-full max-w-canvas px-6 sm:px-10 lg:px-margin">
          <div
            data-cursor-invert="true"
            className="relative bg-night px-6 py-6 shadow-[0_18px_40px_-12px_rgba(10,10,10,0.45)] sm:px-9 sm:py-7 lg:mx-auto lg:w-[64%] lg:min-w-[calc(680*var(--px))] lg:px-[calc(46*var(--px))] lg:py-[calc(28*var(--px))]"
          >
            <Reveal>
              <p className="text-label text-night-muted">(LEAVE YOUR DETAILS)</p>

              <h2 className="mt-2 font-medium uppercase leading-[0.98] tracking-[-0.02em] text-white text-[clamp(1.85rem,4.4vw,4.1rem)] lg:mt-[calc(10*var(--px))]">
                LET&apos;S WORK TOGETHER.
              </h2>

              <p className="mt-2 text-body text-night-body">
                Or write directly:{' '}
                <a
                  href={`mailto:${PORTFOLIO_DATA.brand.email}`}
                  className="text-white underline underline-offset-4 transition-colors hover:text-accent"
                >
                  {PORTFOLIO_DATA.brand.email}
                </a>{' '}
                ·{' '}
                <a
                  href={PORTFOLIO_DATA.brand.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white underline underline-offset-4 transition-colors hover:text-accent"
                >
                  {PORTFOLIO_DATA.brand.phone}
                </a>
              </p>
            </Reveal>

            {submitted ? (
              <div className="mt-10 border border-white/15 bg-white/[0.03] p-6 sm:p-8">
                <div className="flex items-center gap-3 text-white">
                  <span className="flex h-8 w-8 items-center justify-center bg-accent text-white">
                    <Check className="h-4 w-4" />
                  </span>
                  <h3 className="text-subhead font-medium">Details received, {name}.</h3>
                </div>
                <p className="mt-3 text-body text-night-body">
                  Thank you for reaching out regarding{' '}
                  <span className="text-white">{reason}</span>. Janindu will reply to{' '}
                  <span className="text-white">{email}</span> promptly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setEmail('');
                    setPhone('');
                    setMessage('');
                  }}
                  className="mt-6 border border-white/25 px-4 py-2 text-body text-white transition-colors hover:border-white hover:bg-white hover:text-night"
                >
                  Send another note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-5 sm:mt-6">
                <Reveal className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5">
                  <div>
                    <label htmlFor="lead-name" className="block text-label text-night-muted">
                      NAME
                    </label>
                    <input
                      id="lead-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 min-h-[38px] w-full border-b border-white/25 bg-transparent pb-1.5 text-body-lg text-white outline-none transition-colors duration-300 placeholder:text-white/45 focus:border-white/75 sm:pb-2"
                    />
                  </div>

                  <div>
                    <label htmlFor="lead-email" className="block text-label text-night-muted">
                      EMAIL
                    </label>
                    <input
                      id="lead-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 min-h-[38px] w-full border-b border-white/25 bg-transparent pb-1.5 text-body-lg text-white outline-none transition-colors duration-300 placeholder:text-white/45 focus:border-white/75 sm:pb-2"
                    />
                  </div>
                </Reveal>

                <Reveal delay={60} className="grid grid-cols-[2fr_3fr] gap-x-4 gap-y-4 pt-3.5 sm:gap-y-5 sm:pt-4 lg:grid-cols-2 lg:gap-x-8 lg:pt-[calc(18*var(--px))]">
                  <div>
                    <label htmlFor="lead-phone" className="block text-label text-night-muted">
                      PHONE
                    </label>
                    <input
                      id="lead-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="+94"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="mt-1 min-h-[38px] w-full border-b border-white/25 bg-transparent pb-1.5 text-body-lg text-white outline-none transition-colors duration-300 placeholder:text-white/45 focus:border-white/75 sm:pb-2"
                    />
                  </div>

                  <div>
                    <label htmlFor="lead-reason" className="block text-label text-night-muted">
                      REASON
                    </label>
                    <select
                      id="lead-reason"
                      name="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="mt-1 min-h-[38px] w-full cursor-pointer border-b border-white/25 bg-transparent pb-1.5 text-body-lg text-white outline-none transition-colors duration-300 focus:border-white/75 sm:pb-2 [&>option]:text-ink"
                    >
                      <option value="Software Engineering Internship">
                        Software Engineering Internship
                      </option>
                      <option value="Project / Freelance Collaboration">
                        Project / Freelance Collaboration
                      </option>
                      <option value="Just saying hi">Just saying hi</option>
                    </select>
                  </div>
                </Reveal>

                <Reveal delay={120} className="pt-3.5 sm:pt-4 lg:pt-[calc(18*var(--px))]">
                  <label htmlFor="lead-message" className="block text-label text-night-muted">
                    MESSAGE
                  </label>
                  <input
                    id="lead-message"
                    name="message"
                    type="text"
                    placeholder="Role details or project overview"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-1 min-h-[38px] w-full border-b border-white/25 bg-transparent pb-1.5 text-body-lg text-white outline-none transition-colors duration-300 placeholder:text-white/45 focus:border-white/75 sm:pb-2"
                  />
                </Reveal>

                {error && (
                  <p role="alert" className="mt-3 text-label text-accent">
                    {error}
                  </p>
                )}

                <Reveal delay={160} className="flex flex-wrap items-center gap-4 pb-1 pt-5 sm:gap-8 sm:pt-6">
                  <button
                    type="submit"
                    data-hw="true"
                    className="group/btn inline-flex min-h-[44px] w-fit shrink-0 items-center gap-3 whitespace-nowrap border border-white bg-white px-[calc(15*var(--px))] py-[calc(9*var(--px))] text-body font-medium leading-[1.5] text-night transition-[background-color,color,border-color] duration-300 ease-out-soft [--hw-base:#0D0D0B] hover:bg-transparent hover:text-white"
                  >
                    <HoverWaveText text="Send Details" />
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>

                  <p className="text-label text-night-muted" aria-live="polite">
                    Colombo, Sri Lanka · Open to software engineering internships.
                  </p>
                </Reveal>

                <p className="mt-2 text-label text-night-muted">
                  Sent details land directly in my inbox -{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate({ page: 'privacy' })}
                    className="underline underline-offset-4 transition-colors hover:text-white"
                  >
                    privacy policy
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
