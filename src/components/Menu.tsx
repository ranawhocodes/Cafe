import { useEffect, useMemo, useState } from 'react';
import { Leaf } from 'lucide-react';
import { fetchMenu, type MenuItem } from '@/lib/supabase';
import { useReveal } from '@/hooks/useReveal';

const TABS = [
  { id: 'brunch', label: 'Brunch' },
  { id: 'mains', label: 'Mains' },
  { id: 'coffee', label: 'Coffee' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'drinks', label: 'Bar' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export default function Menu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [active, setActive] = useState<TabId>('brunch');
  const { ref, visible } = useReveal();

  useEffect(() => {
    fetchMenu()
      .then(setItems)
      .catch(() => setError('We could not load the menu right now. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  const visibleItems = useMemo(() => items.filter((i) => i.category === active), [items, active]);

  return (
    <section id="menu" className="relative bg-paper py-24 md:py-36">
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-sage/30 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-clay-pale blur-[100px]" />

      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mx-auto max-w-7xl px-6 md:px-10`}>
        <div className="text-center">
          <p className="font-body text-xs uppercase tracking-widest2 text-leaf">The Menu</p>
          <h2 className="mt-4 font-display text-4xl font-medium text-ink md:text-6xl">
            Grown, plucked &amp; <span className="italic text-leaf">plated</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md font-body text-base font-light leading-7 text-inklight">
            Seasonal plates from a kitchen that follows the sun.
          </p>
        </div>

        {/* Tabs */}
        <div className="no-scrollbar mt-12 flex justify-start gap-2 overflow-x-auto md:justify-center">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`shrink-0 rounded-full border px-6 py-2.5 font-body text-xs uppercase tracking-widest2 transition-all duration-300 ${
                active === tab.id
                  ? 'border-leaf bg-leaf text-ivory shadow-[0_10px_25px_rgba(47,107,70,0.3)]'
                  : 'border-ink/20 bg-ivory text-inklight hover:border-leaf hover:text-leaf'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="mt-14 min-h-[26rem]">
          {loading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-72 animate-pulse rounded-3xl bg-sage/25" />
              ))}
            </div>
          )}

          {error && <p className="py-16 text-center font-body text-inklight">{error}</p>}

          {!loading && !error && (
            <div key={active} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleItems.map((item, i) => (
                <article
                  key={item.id}
                  className="animate-fade-swap group relative overflow-hidden rounded-3xl bg-ivory shadow-[0_10px_35px_rgba(28,51,37,0.1)] ring-1 ring-ink/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(28,51,37,0.18)]"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {item.is_signature && (
                      <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-clay px-3 py-1 font-body text-[10px] uppercase tracking-widest2 text-ivory">
                        <Leaf className="h-3 w-3" /> Signature
                      </span>
                    )}
                    <span className="absolute bottom-4 right-4 rounded-full bg-ivory/90 px-4 py-1.5 font-display text-lg font-semibold text-ink shadow-md backdrop-blur-sm">
                      ₹{item.price.toFixed(0)}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-semibold text-ink transition-colors group-hover:text-leaf">
                      {item.name}
                    </h3>
                    <p className="mt-2 font-body text-sm font-light leading-6 text-inklight">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
