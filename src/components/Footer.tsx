import { MapPin, Phone, Clock, Instagram, Facebook, Twitter, Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="visit" className="relative border-t border-leaf/20 bg-ink text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand + socials */}
          <div>
            <a href="#top" className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-sage" />
              <span className="font-script text-4xl text-ivory pt-1">Kipling Cafe</span>
            </a>
            <p className="mt-4 max-w-xs font-body text-sm font-light leading-7 text-ivory/65">
              A garden café &amp; kitchen where the coffee is slow and the
              greenery is very real.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#top"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-ivory/70 transition-all duration-300 hover:border-sage hover:text-sage hover:-translate-y-1"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <ul className="space-y-3 font-body text-sm font-light text-ivory/75">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                <span>12 Willow Lane, Garden District, Bengaluru 560001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-sage" />
                <a href="tel:+919876543210" className="transition-colors hover:text-sage">+91 98765 43210</a>
              </li>
            </ul>
          </div>

          {/* Hours + quick links combined */}
          <div>
            <ul className="space-y-3 font-body text-sm font-light text-ivory/75">
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-sage" />
                <span>Open daily · 8:00 AM – 11:00 PM</span>
              </li>
              <li className="flex flex-wrap gap-x-5 gap-y-2">
                {[
                  { label: 'Menu', href: '#menu' },
                  { label: 'Brew Bar', href: '#brewbar' },
                  { label: 'Gallery', href: '#gallery' },
                  { label: 'Reserve', href: '#reserve' },
                ].map((l) => (
                  <a key={l.href} href={l.href} className="transition-colors hover:text-sage">
                    {l.label}
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-ivory/10 pt-6 md:flex-row">
          <p className="font-body text-xs font-light text-ivory/45">
            © {new Date().getFullYear()} Kipling Cafe. All rights reserved.
          </p>
          <p className="font-body text-xs font-light italic text-ivory/45">
            “Let the wild rumpus start — over coffee.”
          </p>
        </div>
      </div>
    </footer>
  );
}
