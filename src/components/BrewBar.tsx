import { useRef, useState, useEffect } from 'react';
import { Coffee, GlassWater, Milk, CupSoda, FlaskConical, ChevronLeft, ChevronRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

/* Chalkboard brew wall — modeled on the hand-drawn boards in the cafe */
type Brew = { name: string; note: string; price: string; icon: React.ComponentType<{ className?: string }> };

const BREW_METHODS: Brew[] = [
  { name: 'Espresso', note: 'double shot · golden crema', price: '₹180', icon: Coffee },
  { name: 'Chemex', note: 'clean · bright · floral', price: '₹300', icon: FlaskConical },
  { name: 'Cold Drip', note: '18-hour slow drip', price: '₹340', icon: GlassWater },
  { name: 'French Press', note: 'full bodied · classic', price: '₹260', icon: Coffee },
  { name: 'Aeropress', note: 'punchy · aromatic', price: '₹280', icon: FlaskConical },
  { name: 'Ibrik · Turkish', note: 'thick · spiced · old world', price: '₹300', icon: Coffee },
];

const HOUSE_SPECIALS: Brew[] = [
  { name: 'Classic Cappuccino', note: 'espresso · steamed milk · foam', price: '₹240', icon: Milk },
  { name: 'Thai Cold Coffee', note: 'cardamom · condensed milk', price: '₹320', icon: CupSoda },
  { name: 'Shakeratto', note: 'espresso shaken to velvet foam', price: '₹300', icon: CupSoda },
  { name: 'Irish Cream Cold Coffee', note: 'cold brew · whipped cream', price: '₹360', icon: Milk },
  { name: 'Iceberg Coffee', note: 'ice cream floats on espresso', price: '₹350', icon: CupSoda },
  { name: 'House Blend Filter', note: 'our daily brew · filter coffee', price: '₹220', icon: Coffee },
];

function Board({
  title,
  subtitle,
  items,
  visible,
}: {
  title: string;
  subtitle: string;
  items: Brew[];
  visible: boolean;
}) {
  return (
    <div
      className={`wood-frame chalkboard relative h-full w-full shrink-0 snap-center rounded-sm p-8 transition-transform duration-500 md:p-10 ${
        visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}
    >
      {/* garland dots along the top, like the wreath on the real boards */}
      <div className="pointer-events-none absolute -top-2 left-0 right-0 flex justify-around px-6">
        {[...Array(8)].map((_, i) => (
          <span key={i} className="h-2.5 w-2.5 rounded-full bg-clay/80 shadow-[0_0_8px_rgba(201,107,74,0.6)]" />
        ))}
      </div>

      <h3 className="text-center font-chalk text-4xl font-bold text-chalk md:text-5xl">{title}</h3>
      <p className="mt-1 text-center font-chalk text-xl text-chalk/60">{subtitle}</p>
      <div className="mx-auto mt-4 h-px w-24 bg-chalk/30" />

      <ul className="mt-8 space-y-5">
        {items.map((brew) => (
          <li key={brew.name} className="group flex items-center gap-4 transition-transform duration-300 hover:translate-x-1.5">
            <brew.icon className="h-6 w-6 shrink-0 text-chalk/70 transition-colors group-hover:text-clay-soft" />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-chalk text-2xl font-semibold text-chalk md:text-[1.7rem]">{brew.name}</span>
                <span className="shrink-0 font-chalk text-2xl font-semibold text-clay-soft md:text-[1.7rem]">{brew.price}</span>
              </div>
              <p className="font-chalk text-base italic text-chalk/55 md:text-lg">{brew.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const BOARDS = [
  { title: 'Brew Methods', subtitle: '~ black coffee, done right ~', items: BREW_METHODS },
  { title: 'House Specials', subtitle: '~ signature pours ~', items: HOUSE_SPECIALS },
];

export default function BrewBar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const { ref, visible } = useReveal(0.1);

  const scrollToBoard = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(BOARDS.length - 1, index));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => setCurrent(Math.round(track.scrollLeft / track.clientWidth));
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="brewbar" className="relative overflow-hidden py-24 md:py-36">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-leaf/10 via-transparent to-leaf/10" />

      <div ref={ref} className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className={`reveal ${visible ? 'is-visible' : ''} mx-auto max-w-2xl text-center`}>
          <p className="font-body text-xs uppercase tracking-widest2 text-leaf">The Brew Board</p>
          <h2 className="mt-4 font-display text-4xl font-medium text-ink md:text-6xl">
            Chalked up <span className="italic text-leaf">daily</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-body text-base font-light leading-7 text-inklight">
            Every brew method we pour, written in chalk — swipe through the boards.
          </p>
        </div>

        {/* Horizontal snap-scroll track */}
        <div className="relative mt-14">
          <div
            ref={trackRef}
            className="no-scrollbar flex snap-x snap-mandatory gap-8 overflow-x-auto pb-4"
          >
            {BOARDS.map((board) => (
              <div key={board.title} className="w-[88%] shrink-0 sm:w-[70%] lg:w-[calc(50%-1rem)]">
                <Board title={board.title} subtitle={board.subtitle} items={board.items} visible={visible} />
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              onClick={() => scrollToBoard(current - 1)}
              disabled={current === 0}
              className="rounded-full border border-ink/20 bg-ivory p-3 text-ink transition-all duration-300 enabled:hover:border-leaf enabled:hover:bg-leaf enabled:hover:text-ivory disabled:opacity-30"
              aria-label="Previous board"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {BOARDS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToBoard(i)}
                  aria-label={`Go to board ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? 'w-9 bg-leaf' : 'w-2 bg-ink/20 hover:bg-ink/40'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => scrollToBoard(current + 1)}
              disabled={current === BOARDS.length - 1}
              className="rounded-full border border-ink/20 bg-ivory p-3 text-ink transition-all duration-300 enabled:hover:border-leaf enabled:hover:bg-leaf enabled:hover:text-ivory disabled:opacity-30"
              aria-label="Next board"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
