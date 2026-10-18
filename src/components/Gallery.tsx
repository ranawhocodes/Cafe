import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const PHOTOS = [
  '/kip.webp',
  '/kip2.webp',
  '/kip1.webp',
  '/kip3.webp',
  '/kip4.webp',
  'https://images.pexels.com/photos/14679166/pexels-photo-14679166.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'https://images.pexels.com/photos/6327536/pexels-photo-6327536.jpeg?auto=compress&cs=tinysrgb&w=1400',
  'https://images.pexels.com/photos/8412054/pexels-photo-8412054.jpeg?auto=compress&cs=tinysrgb&w=1400',
];

const SPANS = [
  'col-span-2 row-span-2',
  'row-span-2',
  '',
  '',
  'col-span-2',
  '',
  '',
  'col-span-2',
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { ref, visible } = useReveal();

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((v) => (v === null ? null : (v + 1) % PHOTOS.length));
      if (e.key === 'ArrowLeft') setLightbox((v) => (v === null ? null : (v - 1 + PHOTOS.length) % PHOTOS.length));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  return (
    <section id="gallery" className="relative py-24 md:py-36">
      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mx-auto max-w-7xl px-6 md:px-10`}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-body text-xs uppercase tracking-widest2 text-leaf">Gallery</p>
          <h2 className="mt-4 font-display text-4xl font-medium text-ink md:text-6xl">
            Moments from <span className="italic text-leaf">the green</span>
          </h2>
        </div>

        <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[210px] md:grid-cols-4">
          {PHOTOS.map((src, i) => (
            <button
              key={src}
              onClick={() => setLightbox(i)}
              className={`group relative overflow-hidden rounded-2xl shadow-md ${SPANS[i]}`}
              aria-label={`Open photo ${i + 1}`}
            >
              <img
                src={src}
                alt={`Kipling Cafe moment ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/25" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute right-6 top-6 rounded-full border border-ivory/25 p-2.5 text-ivory transition-colors hover:border-clay-soft hover:text-clay-soft"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-ivory/25 p-3 text-ivory transition-colors hover:border-clay-soft hover:text-clay-soft md:left-10"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox - 1 + PHOTOS.length) % PHOTOS.length);
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <img
            key={lightbox}
            src={PHOTOS[lightbox]}
            alt="Kipling Cafe"
            className="animate-fade-swap max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-ivory/25 p-3 text-ivory transition-colors hover:border-clay-soft hover:text-clay-soft md:right-10"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % PHOTOS.length);
            }}
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
}
