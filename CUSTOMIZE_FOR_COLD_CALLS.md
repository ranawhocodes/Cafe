# ☕ Cold Calling & Pitch Customization Guide

This website has been configured so you can personalize it for **any cafe client in under 60 seconds**.

You **NEVER** have to hunt through different React components or touch complex code. Everything is managed in **one single file**:

👉 **[`src/cafeConfig.ts`](file:///c:/CafeDemoSite/src/cafeConfig.ts)**

---

## ⚡ The 4 Things You Need to Change

Open [`src/cafeConfig.ts`](file:///c:/CafeDemoSite/src/cafeConfig.ts) and edit the 4 clearly marked sections:

```
src/
└── cafeConfig.ts   <--- 🎯 ALL CHANGES ARE MADE HERE!
```

---

### 1️⃣ Cafe Name & Branding (Section 1)
Change the prospect's cafe name, tagline, and established year:

```ts
// src/cafeConfig.ts (Section 1)
name: 'Artisan Brew Lab',                     // Prospect's Cafe Name
tagline: 'specialty coffee & artisan bakes',  // Script font tagline in hero
badge: 'Artisan Roastery · Open Daily',       // Small top pill badge
sinceYear: '2019',                            // Badge on story collage
```

> **What gets updated automatically:**
> - Top Navigation Bar (desktop & mobile menu)
> - Hero Main Heading & browser tab title
> - "Our Story" section & badge
> - Photo Gallery captions & alt tags
> - Footer copyright and footer brand

---

### 2️⃣ Address & Phone Number (Section 2)
Change the phone number, address, and opening hours:

```ts
// src/cafeConfig.ts (Section 2)
contact: {
  address: '42 Indiranagar 100ft Road, Bengaluru 560038',
  phone: '+91 98765 00000',
  phoneRaw: '+919876500000',                  // Used for direct click-to-call
  email: 'contact@artisanbrewlab.com',
  hours: 'Open daily · 7:30 AM – 10:30 PM',
  googleMapsUrl: 'https://maps.google.com/?q=Artisan+Brew+Lab+Indiranagar',
}
```

> **What gets updated automatically:**
> - Footer Address (with clickable Google Maps link)
> - Footer Phone Number (with clickable `tel:` call link)
> - Operating hours

---

### 3️⃣ Ambience Images (Section 3)
Replace ambience photos (interior, garden, seating, vibe):

```ts
// src/cafeConfig.ts (Section 3)
ambienceImages: {
  // Main Hero background photo (high-res horizontal photo)
  heroBg: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24',

  // 3-photo collage in "Our Story"
  story: {
    main: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb',
    secondary: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31',
    accent: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
  },

  // 8 photos for the photo grid and fullscreen lightbox
  gallery: [
    'https://images.unsplash.com/...',
    // ... add up to 8 photo URLs
  ],
}
```

> 💡 **Image Source Tip:**
> - You can copy photo URLs directly from the client's **Google Maps listing** or **Instagram profile**!
> - Or drop local image files into `public/` and reference them as `'/my-photo.jpg'`.

---

### 4️⃣ Food & Drink Menu (Section 4)
Change food items, prices, descriptions, and dish photos:

```ts
// src/cafeConfig.ts (Section 4)
useConfigMenu: true,
menuItems: [
  {
    id: 'dish-1',
    category: 'brunch',                       // 'brunch' | 'mains' | 'coffee' | 'desserts' | 'drinks'
    name: 'Truffle Scrambled Eggs',
    description: 'Sourdough, shaved truffles, cultured butter',
    price: 390,
    image_url: 'https://images.unsplash.com/...',
    is_signature: true,                       // Shows the gold "Signature" pill
  },
  // ... more items
]
```

---

## 🎯 Pro Cold-Calling Pitch Strategy

1. **Before the Call (or right after finding their number):**
   - Look up the cafe on Google Maps / Instagram.
   - Grab their exact name, address, phone number, and 2-3 photos of their interior and top dish.
   - Paste them into [`src/cafeConfig.ts`](file:///c:/CafeDemoSite/src/cafeConfig.ts) (takes ~60 seconds).
   - Save the file (`Ctrl + S`). The site updates instantly.

2. **On the Call:**
   > *"Hi [Owner Name], I was looking at your cafe on [Location] and loved your [mention popular dish or patio]. I actually put together a live interactive demo preview of how a high-converting website with direct reservations and online menu would look specifically for [Cafe Name]. Can I WhatsApp or email you the link to check it out on your phone?"*

3. **When They Open The Link:**
   - They see **their exact cafe name**, **their real ambience**, **their address**, and **their actual dishes**.
   - Because it feels tailor-made specifically for them, your trust and close rate will be exponentially higher!
