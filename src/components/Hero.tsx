import { ChevronDown } from 'lucide-react';
import { useScrollY } from '@/hooks/useReveal';

const FLOATING_LEAVES = [
  { left: '8%', top: '18%', size: 26, delay: '0s', dur: '7s' },
  { left: '18%', top: '62%', size: 18, delay: '1.2s', dur: '8s' },
  { left: '76%', top: '22%', size: 30, delay: '0.6s', dur: '6.5s' },
  { left: '88%', top: '55%', size: 20, delay: '2s', dur: '7.5s' },
];

export default function Hero() {
  const scrollY = useScrollY();

  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink">
      {/* Real courtyard of the cafe, slightly darkened for readable text */}
      <div className="absolute inset-0" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
        <div
          className="absolute inset-0 bg-cover bg-center animate-hero-zoom"
          style={{ backgroundImage: "url('/kip2.webp')" }}
        />
        {/* even dark-green scrim — keeps the photo vivid but text crisp */}
        <div className="absolute inset-0 bg-ink/45" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/60 to-transparent" />
      </div>

      {/* Floating leaves */}
      {FLOATING_LEAVES.map((leaf, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="animate-drift pointer-events-none absolute z-[5] opacity-30"
          style={{
            left: leaf.left,
            top: leaf.top,
            width: leaf.size,
            animationDelay: leaf.delay,
            animationDuration: leaf.dur,
          }}
          fill="#faf7ef"
        >
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
        </svg>
      ))}

      {/* Content directly on the photo */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p
          className="animate-fade-swap mb-5 font-body text-xs font-medium uppercase tracking-widest2 text-sage md:text-sm"
          style={{ animationDelay: '0.35s' }}
        >
          Garden Café &amp; Kitchen · Open Daily
        </p>

        <h1
          className="animate-fade-swap font-script text-7xl leading-[1.05] text-ivory drop-shadow-[0_2px_18px_rgba(28,51,37,0.55)] sm:text-8xl md:text-[10rem]"
          style={{ animationDelay: '0.5s' }}
        >
          Kipling Cafe
        </h1>

        <div
          className="animate-fade-swap mx-auto mt-6 flex max-w-xl items-center gap-4"
          style={{ animationDelay: '0.8s' }}
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-sage/70" />
          <span className="font-display text-xl italic text-ivory/95 drop-shadow-[0_1px_10px_rgba(28,51,37,0.5)] md:text-2xl">
            where every meal blooms
          </span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-sage/70" />
        </div>

        <p
          className="animate-fade-swap mx-auto mt-5 max-w-xl font-body text-base font-normal leading-relaxed text-ivory/90 drop-shadow-[0_1px_10px_rgba(28,51,37,0.5)] md:text-lg"
          style={{ animationDelay: '1s' }}
        >
          Coffee brewed slowly, lunch served under a canopy of green.
        </p>

        <div
          className="animate-fade-swap mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ animationDelay: '1.2s' }}
        >
          <a
            href="#reserve"
            className="group relative overflow-hidden rounded-full bg-ivory px-9 py-4 font-body text-sm font-medium uppercase tracking-widest2 text-ink transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.35)]"
          >
            <span className="relative z-10">Reserve a Table</span>
            <span className="absolute inset-0 translate-y-full bg-sage transition-transform duration-300 group-hover:translate-y-0" />
          </a>
          <a
            href="#menu"
            className="rounded-full border-2 border-ivory/70 px-9 py-4 font-body text-sm font-medium uppercase tracking-widest2 text-ivory transition-all duration-300 hover:border-ivory hover:bg-ivory hover:text-ink"
          >
            Explore Menu
          </a>
        </div>
      </div>

      <a
        href="#story"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-ivory/90 transition-colors hover:text-ivory"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8 animate-bounce drop-shadow-[0_1px_8px_rgba(28,51,37,0.6)]" />
      </a>
    </section>
  );
}
