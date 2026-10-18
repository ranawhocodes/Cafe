import { useEffect, useState } from 'react';
import { Menu, X, Leaf, ArrowUp } from 'lucide-react';

const links = [
  { label: 'Story', href: '#story' },
  { label: 'Menu', href: '#menu' },
  { label: 'Brew Bar', href: '#brewbar' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Book a Table', href: '#reserve' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      setShowTop(window.scrollY > 700);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* reading progress */}
      <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-leaf via-leaf-light to-clay transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled && !open
            ? 'bg-ivory/90 backdrop-blur-md border-b border-leaf/15 py-3 shadow-[0_8px_30px_rgba(28,51,37,0.08)]'
            : 'bg-transparent py-6'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
          <a href="#top" className="group flex items-center gap-2" onClick={() => setOpen(false)}>
            <Leaf className="h-5 w-5 text-sage transition-all duration-500 group-hover:rotate-12 group-hover:text-ivory" />
            <span
              className={`font-script text-3xl md:text-4xl leading-none pt-1 transition-colors duration-500 ${
                scrolled && !open ? 'text-ink' : 'text-ivory drop-shadow-[0_1px_8px_rgba(28,51,37,0.5)]'
              }`}
            >
              Kipling Cafe
            </span>
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {links.slice(0, 4).map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`group relative font-body text-sm uppercase tracking-widest2 transition-colors duration-300 ${
                    scrolled ? 'text-inklight hover:text-leaf' : 'text-ivory/90 hover:text-ivory'
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${
                      scrolled ? 'bg-leaf' : 'bg-ivory'
                    }`}
                  />
                </a>
              </li>
            ))}
            <li>
              <a
                href="#reserve"
                className="rounded-full bg-ivory px-6 py-2.5 font-body text-sm font-medium uppercase tracking-widest2 text-ink transition-all duration-300 hover:bg-sage hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              >
                Book a Table
              </a>
            </li>
          </ul>

          <button
            className="text-ivory drop-shadow-[0_1px_6px_rgba(28,51,37,0.5)] lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </nav>
      </header>

      {/* Full-screen mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[70] flex flex-col bg-ink transition-all duration-500 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5 md:px-10">
          <span className="font-script text-3xl text-ivory">Kipling Cafe</span>
          <button
            className="text-ivory"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-7 w-7" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col items-start justify-center gap-2 px-8">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`group flex items-baseline gap-4 py-2 transition-all duration-500 ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: open ? `${150 + i * 80}ms` : '0ms' }}
            >
              <span className="font-chalk text-xl text-clay-soft">0{i + 1}</span>
              <span className="font-display text-4xl font-medium text-ivory transition-colors duration-300 group-hover:text-sage md:text-5xl">
                {l.label}
              </span>
            </a>
          ))}
        </nav>

        <div
          className={`px-8 pb-10 transition-all delay-500 duration-500 ${
            open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="font-body text-xs uppercase tracking-widest2 text-sage">
            Garden Café &amp; Kitchen · Open Daily
          </p>
        </div>
      </div>
    </>
  );
}
