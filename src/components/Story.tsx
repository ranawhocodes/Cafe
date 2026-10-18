import { Coffee, TreePalm, Users, Star } from 'lucide-react';
import { useReveal, useCountUp } from '@/hooks/useReveal';

const MARQUEE_WORDS = ['GARDEN FRESH', 'SLOW COFFEE', 'SUNDAY BRUNCH', 'FAIRY-LIT EVENINGS', 'HOMEMADE BAKES'];

export function Marquee() {
  const row = [...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <div className="relative overflow-hidden border-y border-leaf/20 bg-leaf py-4">
      <div className="animate-marquee flex w-max items-center gap-10">
        {row.map((word, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-body text-xs uppercase tracking-widest2 text-ivory">{word}</span>
            <span className="h-1.5 w-1.5 rotate-45 bg-clay-soft" />
          </span>
        ))}
      </div>
    </div>
  );
}

function RevealBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''}`}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

const STATS = [
  { value: 10, suffix: '+', label: 'Years in bloom', icon: TreePalm },
  { value: 40, suffix: '+', label: 'Garden seats', icon: Users },
  { value: 12, suffix: '', label: 'Brew methods', icon: Coffee },
  { value: 4.9, suffix: '', label: 'Guest rating', icon: Star, decimal: true },
];

const TIMELINE = [
  { year: '2016', title: 'A kiosk & three tables' },
  { year: '2019', title: 'The garden grew' },
  { year: '2022', title: 'The brew bar' },
  { year: 'Today', title: 'Your corner of green' },
];

export default function Story() {
  const { ref, visible } = useReveal(0.2);

  return (
    <>
      <Marquee />
      <section id="story" className="relative overflow-hidden py-24 md:py-32">
        <div className="animate-drift pointer-events-none absolute -left-24 top-24 text-leaf opacity-[0.06]">
          <svg viewBox="0 0 24 24" className="h-96 w-96" fill="currentColor">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
          </svg>
        </div>

        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <RevealBlock>
                <p className="font-body text-xs uppercase tracking-widest2 text-leaf">Our Story</p>
                <h2 className="mt-4 font-display text-4xl font-medium leading-tight text-ink md:text-6xl">
                  A living room
                  <span className="block italic text-leaf">built by nature</span>
                </h2>
                <p className="mt-6 max-w-md font-body text-base font-light leading-7 text-inklight md:text-lg">
                  A tiny garden kiosk in 2016 — now a leafy hideaway for slow
                  coffee and seasonal plates.
                </p>
              </RevealBlock>

              {/* Timeline as compact chips */}
              <div className="mt-10 space-y-3 border-l-2 border-leaf/30 pl-6">
                {TIMELINE.map((item, i) => (
                  <RevealBlock key={item.year} delay={i * 110}>
                    <div className="group flex items-baseline gap-4 transition-transform duration-300 hover:translate-x-1.5">
                      <span className="font-chalk text-2xl font-bold text-clay">{item.year}</span>
                      <span className="font-display text-xl text-ink transition-colors group-hover:text-leaf md:text-2xl">
                        {item.title}
                      </span>
                    </div>
                  </RevealBlock>
                ))}
              </div>
            </div>

            {/* Collage */}
            <RevealBlock>
              <div className="relative pb-10 pr-4">
                <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-sage/50 via-transparent to-clay-pale blur-2xl" />
                <div className="relative">
                  <img
                    src="/kip.webp"
                    alt="Kipling Cafe signboard over the garden seating"
                    className="relative z-10 h-72 w-full rotate-1 rounded-3xl object-cover shadow-2xl transition-transform duration-500 hover:rotate-0 hover:scale-[1.02] md:h-96"
                    loading="lazy"
                  />
                  <img
                    src="/kip3.webp"
                    alt="Fairy-lit pathway in the evening"
                    className="absolute -bottom-2 -left-4 z-20 h-40 w-44 -rotate-6 rounded-2xl object-cover shadow-xl ring-4 ring-ivory transition-transform duration-500 hover:rotate-0 hover:scale-105 md:h-52 md:w-60"
                    loading="lazy"
                  />
                  <img
                    src="/kip1.webp"
                    alt="Palms and warm lamps after sunset"
                    className="absolute -right-2 bottom-16 z-20 h-40 w-44 rotate-6 rounded-2xl object-cover shadow-xl ring-4 ring-ivory transition-transform duration-500 hover:rotate-0 hover:scale-105 md:h-52 md:w-60"
                    loading="lazy"
                  />
                  <div className="animate-drift absolute -top-7 right-6 z-30 rounded-2xl bg-clay px-5 py-4 text-center shadow-xl">
                    <p className="font-display text-2xl font-bold text-ivory">since</p>
                    <p className="font-display text-3xl font-bold text-ivory">2016</p>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Stats */}
          <div ref={ref} className="mt-20 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <div key={stat.label} className={visible ? 'animate-fade-swap' : 'opacity-0'} style={{ animationDelay: `${i * 120}ms` }}>
                <StatCard stat={stat} index={i} visible={visible} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function StatCard({ stat, index, visible }: { stat: (typeof STATS)[number]; index: number; visible: boolean }) {
  const value = useCountUp(stat.value, visible, 1400 + index * 200);
  return (
    <div className="group rounded-3xl bg-paper p-6 text-center ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1.5 hover:bg-ivory hover:shadow-[0_20px_45px_rgba(28,51,37,0.14)]">
      <stat.icon className="mx-auto h-5 w-5 text-clay transition-transform duration-300 group-hover:scale-125" />
      <p className="mt-3 font-display text-4xl font-bold text-ink md:text-5xl">
        {stat.decimal ? value.toFixed(1) : Math.round(value)}
        {stat.suffix}
      </p>
      <p className="mt-1 font-body text-[11px] uppercase tracking-widest2 text-inklight">{stat.label}</p>
    </div>
  );
}
