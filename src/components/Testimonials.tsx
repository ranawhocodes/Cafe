import { useEffect, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const TESTIMONIALS = [
  {
    quote: 'Sitting under the ferns with a flat white in hand, you forget the city exists. My favourite slow-Sunday spot in town.',
    name: 'Ananya Rao',
    role: 'Regular since 2019',
  },
  {
    quote: 'We booked the Greenhouse for my mother\'s birthday. Fairy lights, incredible food, and the staff treated us like family.',
    name: 'Rohan Mehta',
    role: 'Celebrated a birthday',
  },
  {
    quote: 'The shakshuka alone is worth the visit — but the courtyard at dusk is what keeps me coming back with everyone I know.',
    name: 'Priya Nair',
    role: 'Food blogger',
  },
  {
    quote: 'Best work-friendly cafe I have found. Quiet corners, endless cold brew, and enough green around me to think clearly.',
    name: 'Dev Shah',
    role: 'Freelance designer',
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { ref, visible } = useReveal();

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, [paused]);

  const t = TESTIMONIALS[index];

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage/25 blur-[130px]" />

      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} relative mx-auto max-w-3xl px-6 text-center`}>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-leaf/30 bg-sage/25">
          <Quote className="h-6 w-6 text-leaf" />
        </div>

        <div
          className="mt-10 min-h-[13rem]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div key={index} className="animate-fade-swap">
            <p className="font-display text-2xl font-light italic leading-relaxed text-ink/90 md:text-3xl">
              “{t.quote}”
            </p>
            <p className="mt-8 font-body text-sm uppercase tracking-widest2 text-leaf">{t.name}</p>
            <p className="mt-1 font-body text-xs font-light text-inklight/70">{t.role}</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            onClick={() => setIndex((index - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            className="rounded-full border border-ink/20 p-2 text-inklight transition-colors hover:border-leaf hover:text-leaf"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-8 bg-leaf' : 'w-1.5 bg-ink/20 hover:bg-ink/40'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setIndex((index + 1) % TESTIMONIALS.length)}
            className="rounded-full border border-ink/20 p-2 text-inklight transition-colors hover:border-leaf hover:text-leaf"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
