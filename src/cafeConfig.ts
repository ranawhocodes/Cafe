/**
 * ============================================================================
 * ☕ CAFE DEMO CONFIGURATION FILE (Cold Calling & Pitch Customization)
 * ============================================================================
 * 
 * QUICK START GUIDE:
 * To customize this demo website for a new client before or after a cold call:
 * 
 * 1. CAFE NAME: Change `name`, `tagline`, and `badge` in SECTION 1.
 * 2. ADDRESS & PHONE: Change `address`, `phone`, and `hours` in SECTION 2.
 * 3. AMBIENCE IMAGES: Update the image links in SECTION 3 (Hero, Story, Gallery).
 * 4. FOOD & MENU: Update dish names, prices, and photos in SECTION 4.
 * 
 * TIP: You can use:
 * - Local files stored in the /public folder (e.g. '/kip2.webp', '/my-cafe.jpg')
 * - OR direct web URLs from the cafe's Instagram, Google Maps, or Pexels/Unsplash.
 * ============================================================================
 */

export interface MenuItemConfig {
  id: string;
  category: 'brunch' | 'mains' | 'coffee' | 'desserts' | 'drinks';
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_signature: boolean;
  sort_order?: number;
}

export interface CafeConfig {
  // 1. Cafe Name & Brand
  name: string;
  logo?: string; // Optional: logo image URL or local path (e.g. '/logo.jpg'). If empty, stylish written name is used!
  tagline: string;
  subtitle: string;
  badge: string;
  sinceYear: string;
  storyHeadline: string;
  storyHighlight: string;
  storyDescription: string;
  shortDescription: string;
  footerQuote: string;

  // 2. Contact & Location
  contact: {
    address: string;
    phone: string;
    phoneRaw: string; // Used for click-to-call link, e.g. "+919876543210"
    email: string;
    hours: string;
    googleMapsUrl?: string;
    social: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
    };
  };

  // 3. Ambience Images (Atmosphere, seating, interior, exterior)
  ambienceImages: {
    heroBg: string;
    story: {
      main: string;
      secondary: string;
      accent: string;
    };
    reservationBg: string;
    gallery: string[];
  };

  // 4. Food & Drinks Menu
  useConfigMenu: boolean; // Set to true to use these items directly (recommended for quick pitches!)
  menuItems: MenuItemConfig[];
}

export const cafeConfig: CafeConfig = {
  // ==========================================================================
  // 🏷️ SECTION 1: CAFE NAME & BRANDING
  // ==========================================================================
  name: 'Your Cafe Name',
  logo: '', // Put logo image URL or path here (leave empty '' to use stylish written name)
  tagline: 'where every cup tells a story',
  subtitle: 'Specialty coffee, all-day brunch, and handcrafted plates served in a warm, sunlit space.',
  badge: 'Artisanal Café & Kitchen · Open Daily',
  sinceYear: '2024',
  storyHeadline: 'A sunlit sanctuary',
  storyHighlight: 'crafted for slow moments',
  storyDescription:
    'Born from a passion for specialty coffee and scratch-made comfort food, our café welcomes you into a serene hideaway built for unhurried mornings, creative afternoons, and warm evening conversations.',
  shortDescription:
    'Your neighborhood artisanal café & kitchen where specialty coffee meets unhurried hospitality.',
  footerQuote: '“Good food, great coffee, and even better company.”',

  // ==========================================================================
  // 📍 SECTION 2: ADDRESS & PHONE NUMBER
  // ==========================================================================
  contact: {
    address: '123 High Street, Central District, Your City 100001',
    phone: '+91 98765 43210',
    phoneRaw: '+919876543210',
    email: 'hello@yourcafename.com',
    hours: 'Open daily · 8:00 AM – 10:30 PM',
    googleMapsUrl: 'https://maps.google.com',
    social: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
    },
  },

  // ==========================================================================
  // 🌿 SECTION 3: AMBIENCE IMAGES (Cafe Interior & Exterior)
  // Put any image URL or local /public/ image path here
  // ==========================================================================
  ambienceImages: {
    // Main full-screen background image behind the hero header
    heroBg:
      'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1600',

    // 3 overlapping photos for the "Our Story" section
    story: {
      main: 'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1400',      // Large top photo (sunlit cafe interior & counter)
      secondary: 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=1200', // Left fairy-lit / evening patio vibe
      accent: 'https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&w=1200',      // Right warm lamps / cozy wooden seating
    },

    // Background image behind the "Reserve a table" card
    reservationBg:
      'https://images.pexels.com/photos/30665054/pexels-photo-30665054.jpeg?auto=compress&cs=tinysrgb&w=1200',

    // 8 photos for the photo grid gallery & fullscreen lightbox
    gallery: [
      'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/683039/pexels-photo-683039.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/14679166/pexels-photo-14679166.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/6327536/pexels-photo-6327536.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/8412054/pexels-photo-8412054.jpeg?auto=compress&cs=tinysrgb&w=1400',
    ],
  },

  // ==========================================================================
  // 🍽️ SECTION 4: FOOD & DRINKS MENU (Dishes, Prices & Photos)
  // Set useConfigMenu to true so you can customize food dishes right here!
  // ==========================================================================
  useConfigMenu: true,
  menuItems: [
    // --- BRUNCH ---
    {
      id: 'brunch-1',
      category: 'brunch',
      name: 'Artisanal Avocado Toast',
      description: 'Toasted country sourdough, smashed hass avocado, whipped feta, micro greens, chilli oil',
      price: 360,
      image_url: 'https://images.pexels.com/photos/1351238/pexels-photo-1351238.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      is_signature: true,
      sort_order: 1,
    },
    {
      id: 'brunch-2',
      category: 'brunch',
      name: 'Classic Sunrise Shakshuka',
      description: 'Slow-simmered spiced tomato & bell pepper ragout, poached eggs, crumbled feta, warm focaccia',
      price: 390,
      image_url: 'https://images.pexels.com/photos/6275158/pexels-photo-6275158.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      is_signature: false,
      sort_order: 2,
    },
    {
      id: 'brunch-3',
      category: 'brunch',
      name: 'Caramelized Brioche French Toast',
      description: 'Thick-cut brioche, berry compote, mascarpone chantilly, toasted almonds, pure maple drizzle',
      price: 350,
      image_url: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      is_signature: true,
      sort_order: 3,
    },

    // --- MAINS ---
    {
      id: 'mains-1',
      category: 'mains',
      name: 'Wild Mushroom & Truffle Risotto',
      description: 'Creamy arborio rice, roasted cremini & shiitake mushrooms, aged parmesan, white truffle oil',
      price: 540,
      image_url: 'https://images.pexels.com/photos/6287525/pexels-photo-6287525.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      is_signature: true,
      sort_order: 1,
    },
    {
      id: 'mains-2',
      category: 'mains',
      name: 'Artisanal Burrata & Basil Pizza',
      description: 'Hand-stretched sourdough crust, San Marzano tomato sauce, fresh burrata, sweet basil, extra virgin olive oil',
      price: 590,
      image_url: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      is_signature: true,
      sort_order: 2,
    },
    {
      id: 'mains-3',
      category: 'mains',
      name: 'Herb-Crusted Grilled Chicken',
      description: 'Free-range grilled chicken breast, salsa verde, buttery mash, charred seasonal vegetables',
      price: 560,
      image_url: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      is_signature: false,
      sort_order: 3,
    },
    {
      id: 'mains-4',
      category: 'mains',
      name: 'Pesto Genovese Handmade Pasta',
      description: 'Fresh basil & pine nut pesto, sun-dried tomatoes, bocconcini pearls, garlic sourdough crumb',
      price: 480,
      image_url: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      is_signature: false,
      sort_order: 4,
    },

    // --- COFFEE ---
    {
      id: 'coffee-1',
      category: 'coffee',
      name: 'Signature House Espresso',
      description: 'Double shot of 100% Arabica estate beans with a rich, velvety golden crema',
      price: 170,
      image_url: 'https://images.pexels.com/photos/302897/pexels-photo-302897.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      is_signature: false,
      sort_order: 1,
    },
    {
      id: 'coffee-2',
      category: 'coffee',
      name: 'Classic Cappuccino',
      description: 'Equal parts double espresso, textured steamed milk, and airy micro-foam dusted with cocoa',
      price: 230,
      image_url: 'https://images.pexels.com/photos/38591656/pexels-photo-38591656.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      is_signature: false,
      sort_order: 2,
    },
    {
      id: 'coffee-3',
      category: 'coffee',
      name: 'Velvet Cafe Latte',
      description: 'Silky steamed milk poured over a double espresso shot with delicate rosetta latte art',
      price: 250,
      image_url: 'https://images.pexels.com/photos/34452163/pexels-photo-34452163.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      is_signature: true,
      sort_order: 3,
    },
    {
      id: 'coffee-4',
      category: 'coffee',
      name: 'Spanish Condensed Iced Latte',
      description: 'Bold espresso shaken with sweet condensed milk and textured cold milk over crystal ice',
      price: 310,
      image_url: 'https://images.pexels.com/photos/9454726/pexels-photo-9454726.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      is_signature: true,
      sort_order: 4,
    },
    {
      id: 'coffee-5',
      category: 'coffee',
      name: '18-Hour Slow Cold Brew',
      description: 'Single-origin grounds steeped for 18 hours, served over clear block ice with an orange twist',
      price: 290,
      image_url: 'https://images.pexels.com/photos/7658124/pexels-photo-7658124.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      is_signature: true,
      sort_order: 5,
    },
    {
      id: 'coffee-6',
      category: 'coffee',
      name: 'Classic Shakerato',
      description: 'Freshly pulled espresso vigorously shaken with raw demerara sugar into a chilled frothy pour',
      price: 280,
      image_url: 'https://images.pexels.com/photos/4921568/pexels-photo-4921568.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      is_signature: false,
      sort_order: 6,
    },
    {
      id: 'coffee-7',
      category: 'coffee',
      name: 'Irish Cream Cold Coffee',
      description: 'House cold brew blended with non-alcoholic Irish cream notes and topped with whipped cream',
      price: 340,
      image_url: 'https://images.pexels.com/photos/3752647/pexels-photo-3752647.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      is_signature: false,
      sort_order: 7,
    },
    {
      id: 'coffee-8',
      category: 'coffee',
      name: 'Affogato / Iceberg Coffee',
      description: 'Madagascar vanilla bean gelato drowned in a piping hot double shot of espresso over ice',
      price: 320,
      image_url: 'https://images.pexels.com/photos/4790055/pexels-photo-4790055.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      is_signature: false,
      sort_order: 8,
    },

    // --- DESSERTS ---
    {
      id: 'dessert-1',
      category: 'desserts',
      name: 'Russian Honey & Berry Cake',
      description: 'Caramelized wildflower honey sponge layers, whipped mascarpone cream, fresh redcurrants',
      price: 340,
      image_url: 'https://images.pexels.com/photos/1639564/pexels-photo-1639564.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      is_signature: true,
      sort_order: 1,
    },
    {
      id: 'dessert-2',
      category: 'desserts',
      name: '70% Dark Chocolate Hazelnut Tart',
      description: 'Silky dark chocolate ganache in a buttery shortcrust shell with roasted hazelnuts and sea salt',
      price: 330,
      image_url: 'https://images.pexels.com/photos/19781763/pexels-photo-19781763.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      is_signature: false,
      sort_order: 2,
    },
    {
      id: 'dessert-3',
      category: 'desserts',
      name: 'Belgian Chocolate Meringue Gateau',
      description: 'Rich Belgian chocolate mousse layered with flourless sponge and torched Swiss meringue',
      price: 380,
      image_url: 'https://images.pexels.com/photos/13735441/pexels-photo-13735441.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      is_signature: false,
      sort_order: 3,
    },
    {
      id: 'dessert-4',
      category: 'desserts',
      name: 'Baked Strawberry Cheesecake',
      description: 'New York-style baked vanilla bean cheesecake topped with house-made strawberry compote',
      price: 360,
      image_url: 'https://images.pexels.com/photos/34193460/pexels-photo-34193460.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      is_signature: true,
      sort_order: 4,
    },

    // --- DRINKS / BAR ---
    {
      id: 'drink-1',
      category: 'drinks',
      name: 'Wild Berry Botanical Cooler',
      description: 'Muddled mixed berries, fresh garden mint, lime, sparkling tonic, and edible botanicals',
      price: 290,
      image_url: 'https://images.pexels.com/photos/36630828/pexels-photo-36630828.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      is_signature: true,
      sort_order: 1,
    },
    {
      id: 'drink-2',
      category: 'drinks',
      name: 'Blood Orange & Rosemary Spritz',
      description: 'Fresh blood orange reduction, house-infused rosemary syrup, sparkling water over citrus ice',
      price: 280,
      image_url: 'https://images.pexels.com/photos/18032217/pexels-photo-18032217.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      is_signature: false,
      sort_order: 2,
    },
    {
      id: 'drink-3',
      category: 'drinks',
      name: 'Signature Artisanal Cooler Flight',
      description: 'Three chilled tasting pours from our seasonal botanical & cold-brewed artisanal bar menu',
      price: 420,
      image_url: 'https://images.pexels.com/photos/6327536/pexels-photo-6327536.jpeg?auto=compress&cs=tinysrgb&w=1400',
      is_signature: false,
      sort_order: 3,
    },
  ],
};