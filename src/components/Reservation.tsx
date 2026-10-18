import { useState } from 'react';
import { CalendarCheck, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { submitReservation } from '@/lib/supabase';
import { useReveal } from '@/hooks/useReveal';
import { cafeConfig } from '@/cafeConfig';

const TIME_SLOTS = ['Breakfast · 8–11 AM', 'Lunch · 12–3 PM', 'Evening · 4–7 PM', 'Dinner · 7–11 PM'];
const OCCASIONS = ['Just coffee', 'Birthday', 'Anniversary', 'Date', 'Work session', 'Family gathering'];

const inputClass =
  'w-full rounded-xl border border-ink/15 bg-ivory px-4 py-3.5 font-body text-sm text-ink placeholder:text-inklight/50 outline-none transition-all duration-300 focus:border-leaf focus:ring-2 focus:ring-leaf/20';

export default function Reservation() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time_slot: TIME_SLOTS[0],
    guests: 2,
    occasion: OCCASIONS[0],
    notes: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const { ref, visible } = useReveal();

  const set = (key: keyof typeof form, value: string | number) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');
    setErrorMsg('');
    try {
      await submitReservation(form);
      setStatus('done');
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong while sending your request. Please try again.');
    }
  };

  return (
    <section id="reserve" className="relative overflow-hidden py-24 md:py-36">
      <div className="pointer-events-none absolute -right-20 top-10 text-leaf opacity-[0.07]">
        <svg viewBox="0 0 24 24" className="h-80 w-80" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
        </svg>
      </div>

      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mx-auto max-w-5xl px-6 md:px-10`}>
        <div className="overflow-hidden rounded-[2.5rem] bg-ivory shadow-[0_30px_80px_rgba(28,51,37,0.18)] ring-1 ring-ink/10">
          <div className="grid lg:grid-cols-[1fr_1.3fr]">
            {/* Left panel */}
            <div className="relative bg-gradient-to-br from-leaf to-ink p-10 md:p-12">
              <img
                src={cafeConfig.ambienceImages.reservationBg}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-25"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="relative">
                <Sparkles className="h-8 w-8 text-clay-soft" />
                <h2 className="mt-6 font-display text-4xl font-medium leading-tight text-ivory md:text-5xl">
                  Reserve your
                  <span className="block italic text-sage">seat in the garden</span>
                </h2>
                <p className="mt-5 font-body text-sm font-light leading-7 text-ivory/80">
                  Tell us when you're coming — we'll confirm your table by email within a few hours.
                </p>
                <ul className="mt-10 space-y-4">
                  {['Courtyard, Fern Room & Greenhouse seating', 'Birthday & anniversary set-ups', 'Pet-friendly outdoor tables'].map(
                    (point) => (
                      <li key={point} className="flex items-center gap-3 font-body text-sm font-light text-ivory/90">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-clay-soft" />
                        {point}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="p-10 md:p-12">
              {status === 'done' ? (
                <div className="flex h-full min-h-[26rem] flex-col items-center justify-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-leaf/30 bg-sage/25">
                    <CheckCircle2 className="h-10 w-10 text-leaf" />
                  </div>
                  <h3 className="mt-8 font-display text-3xl font-semibold text-ink">
                    Request received, {form.name.split(' ')[0]}!
                  </h3>
                  <p className="mt-4 max-w-sm font-body text-sm font-light leading-7 text-inklight">
                    Your table for {form.guests} on {form.date} · {form.time_slot.split(' · ')[0]} is
                    being arranged. We will email you a confirmation shortly.
                  </p>
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setForm((f) => ({ ...f, name: '', email: '', phone: '', date: '', notes: '' }));
                    }}
                    className="mt-8 rounded-full border border-leaf px-7 py-3 font-body text-xs uppercase tracking-widest2 text-leaf transition-colors hover:bg-leaf hover:text-ivory"
                  >
                    Book another table
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block font-body text-xs uppercase tracking-widest2 text-inklight">Name</label>
                      <input required value={form.name} onChange={(e) => set('name', e.target.value)} className={inputClass} placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="mb-2 block font-body text-xs uppercase tracking-widest2 text-inklight">Phone</label>
                      <input required type="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} className={inputClass} placeholder="+91 ..." />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block font-body text-xs uppercase tracking-widest2 text-inklight">Email</label>
                    <input required type="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={inputClass} placeholder="you@example.com" />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block font-body text-xs uppercase tracking-widest2 text-inklight">Date</label>
                      <input required type="date" min={new Date().toISOString().split('T')[0]} value={form.date} onChange={(e) => set('date', e.target.value)} className={`${inputClass} [color-scheme:dark]`} />
                    </div>
                    <div>
                      <label className="mb-2 block font-body text-xs uppercase tracking-widest2 text-inklight">Guests</label>
                      <select value={form.guests} onChange={(e) => set('guests', Number(e.target.value))} className={inputClass}>
                        {[...Array(12)].map((_, i) => (
                          <option key={i + 1} value={i + 1} className="bg-ivory">{i + 1} {i === 0 ? 'guest' : 'guests'}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block font-body text-xs uppercase tracking-widest2 text-inklight">Time</label>
                    <div className="grid grid-cols-2 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => set('time_slot', slot)}
                          className={`rounded-xl border px-3 py-2.5 font-body text-xs transition-all duration-300 ${
                            form.time_slot === slot
                              ? 'border-leaf bg-sage/30 text-ink'
                              : 'border-ink/15 text-inklight hover:border-leaf/50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block font-body text-xs uppercase tracking-widest2 text-inklight">Occasion</label>
                    <div className="flex flex-wrap gap-2">
                      {OCCASIONS.map((occ) => (
                        <button
                          type="button"
                          key={occ}
                          onClick={() => set('occasion', occ)}
                          className={`rounded-full border px-4 py-1.5 font-body text-xs transition-all duration-300 ${
                            form.occasion === occ
                              ? 'border-leaf bg-leaf text-ivory'
                              : 'border-ink/15 text-inklight hover:border-leaf/50'
                          }`}
                        >
                          {occ}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block font-body text-xs uppercase tracking-widest2 text-inklight">Notes (optional)</label>
                    <textarea rows={2} value={form.notes} onChange={(e) => set('notes', e.target.value)} className={`${inputClass} resize-none`} placeholder="High chair, cake, quiet corner..." />
                  </div>

                  {status === 'error' && (
                    <p className="rounded-xl border border-clay/40 bg-clay-pale px-4 py-3 font-body text-sm text-clay">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-ink py-4 font-body text-sm uppercase tracking-widest2 text-ivory transition-all duration-300 hover:bg-leaf hover:shadow-[0_15px_40px_rgba(47,107,70,0.35)] disabled:opacity-70"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <CalendarCheck className="h-4 w-4" /> Request Reservation
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
