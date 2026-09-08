const BASE = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) || '/Hamper/';

export const categories = [
  { id: 'all', label: 'All Hampers', icon: '✨' },
  { id: 'bouquets', label: 'Bouquets', icon: '💐' },
  { id: 'premium', label: 'Premium Luxury', icon: '👑' },
  { id: 'baby-girl', label: 'Baby Girl', icon: '🎀' },
  { id: 'baby-boy', label: 'Baby Boy', icon: '🧸' },
  { id: 'festive', label: 'Festive & Celebration', icon: '🥂' },
  { id: 'corporate', label: 'Corporate Gifting', icon: '💼' }
];

export const reserveProducts = [
  {
    id: 'grand-luxe-heart-acrylic-reserve',
    name: 'Grand Luxe Heart & Illuminated Acrylic Reserve Hamper',
    badge: 'THE RESERVE · 500 AED',
    badgeType: 'gold',
    price: 500,
    formattedPrice: '500 AED',
    priceNote: '(Delivery charges apply)',
    currency: 'AED',
    whatsappNumber: '971501487453',
    whatsappMessage: 'Hello! I would like to order the Grand Luxe Heart & Illuminated Acrylic Reserve Hamper for 500 AED (Delivery charges apply).',
    description: 'Dual-heart luxury red hamper, luxury fragrance mist, crystal illuminated acrylic box with Bento cake, designer watch, LED fairy lights & "I Love You" balloons.',
    longDescription: 'The pinnacle of celebratory romance and prestige. Features a handcrafted crimson dual-heart luxury display trunk with gold "Happy Birthday" topper, premium Japanese Cherry Blossom fragrance mist and luxury perfumes, golden Ferrero Rocher confections, and plush velvet roses. Accompanied by a crystal-clear illuminated acrylic keepsake case wrapped with silk ribbon and twinkling fairy LED lights, housing a custom pastel pink Bento celebration cake ("Just For You"), a designer quartz timepiece in a matte gift box, customized calendar plaque, and two floating red heart helium balloons with cursive "I Love You" script.',
    rating: 5.0,
    reviewCount: 38,
    image: `${BASE}images/grand_luxe_acrylic_heart_reserve.jpg`,
    category: 'reserve',
    items: [
      'Handcrafted Crimson Dual-Heart Luxury Display Trunk with Gold Plaque',
      'Illuminated Crystal-Clear Acrylic Keepsake Box with Fairy LED String Lights',
      'Custom Handcrafted Pastel Pink Bento Cake ("Just For You") with Gold Butterflies',
      'Designer Quartz Timepiece in Signature Matte Presentation Box with Ribbon',
      'Fine Fragrance Suite (Japanese Cherry Blossom Mist & Luxury Perfumes)',
      'Golden Ferrero Rocher Confections & Sweet Treats',
      'Fresh Silk Crimson & Blush Pink Velvet Roses with Baby’s Breath Florals',
      'Dual Floating Metallic Red Heart Balloons with "I Love You" Cursive Script',
      'Personalized Custom Date Plaque & Calligraphy Keepsake Card'
    ]
  },
  {
    id: 'eternal-oud-roses-anniversary-reserve',
    name: 'Eternal Romance Oud & Roses Anniversary Reserve Hamper',
    badge: 'THE RESERVE · 450 AED',
    badgeType: 'gold',
    price: 450,
    formattedPrice: '450 AED',
    priceNote: '(Delivery charges apply)',
    currency: 'AED',
    whatsappNumber: '971501487453',
    whatsappMessage: 'Hello! I would like to order the Eternal Romance Oud & Roses Anniversary Reserve Hamper for 450 AED (Delivery charges apply).',
    description: 'Ahmed Al Maghribi Oud & Roses perfume, Marj luxury travel case, gold acrylic "Happy Anniversary" script, heirloom blush roses & daisy florals in dual heart box.',
    longDescription: 'An heirloom-grade tribute to timeless love and devotion. Presented in a bespoke interconnected dual-heart crimson silhouette with gleaming mirror-polished gold "Happy Anniversary" script. Features an authentic flacon of Ahmed Al Maghribi’s legendary "Oud & Roses" luxury Eau De Parfum, a premium cylindrical Marj fragrance travel case, nestled among delicate blush pink heirloom roses, sunshine daisy blossoms, golden dried botanicals, and shimmering pearl accents. Includes a gold-embossed "Happy Anniversary" letterpress keepsake card with interlocking rings.',
    rating: 5.0,
    reviewCount: 49,
    image: `${BASE}images/eternal_oud_roses_anniversary_reserve.jpg`,
    category: 'reserve',
    items: [
      'Interconnected Dual-Heart Crimson Luxury Display Trunk with Gold Rim',
      'Ahmed Al Maghribi Signature "Oud & Roses" Luxury Eau De Parfum (60ml)',
      'Premium Marj Cylindrical Luxury Travel Case / Keepsake Scroll',
      'Mirror-Polished Gold Acrylic "Happy Anniversary" Laser-Cut Topper',
      'Fresh Silk Blush Pink Heirloom Roses & Sunshine Daisy Blossoms',
      'Golden Botanical Accents, Miniature Pearl Beads & Dried Autumn Flora',
      'Letterpress Gold-Foil "Happy Anniversary" Greeting Card with Interlocking Rings',
      'White-Glove Dispatch in Temperature-Controlled Velvet Protective Packaging'
    ]
  },
  {
    id: 'grand-car-trunk-surprise-reserve',
    name: 'Grand Car Trunk Celebration Surprise Experience',
    badge: 'THE RESERVE · 400 AED',
    badgeType: 'gold',
    price: 400,
    formattedPrice: '400 AED',
    priceNote: '(Delivery charges apply)',
    currency: 'AED',
    whatsappNumber: '971501487453',
    whatsappMessage: 'Hello! I would like to order the Grand Car Trunk Celebration Surprise Experience for 400 AED (Delivery charges apply).',
    description: 'Bespoke vehicle trunk celebration experience with custom birthday cake showcase, hanging memory Polaroids, dual confectionery bouquets, warm LED ambient lighting, and celebratory bunting.',
    longDescription: 'An extraordinary celebration surprise staged directly inside a luxury vehicle boot or trunk. Features an illuminated showcase displaying a handcrafted birthday cake, a custom crimson velvet rose bouquet, a deluxe Cadbury and Galaxy confectionery bouquet, hanging satin ribbon with personal Polaroid memories, "Happy Birthday" bunting, warm LED ambient candles and fairy lights, an ornate golden vanity mirror, and floating balloons over a plush white faux fur base.',
    rating: 5.0,
    reviewCount: 31,
    image: `${BASE}images/grand_car_trunk_surprise_reserve.jpg`,
    category: 'reserve',
    items: [
      'Complete Bespoke Luxury Vehicle Boot / Trunk Celebration Experience Setup',
      'Handcrafted Gourmet Celebration Cake in Illuminated Showcase Display',
      'Deluxe Cadbury & Galaxy Chocolate & Treat Bloom Bouquet',
      'Crimson Velvet Rose & Memory Photo Bloom Bouquet',
      'Hanging Ribbon Memory Polaroid Keepsake Prints & "Happy Birthday" Bunting',
      'Warm Amber LED Ambient Pillar & Fairy String Lighting',
      'Gleaming Ornate Vanity Mirror Accent & Helium Gold Balloons',
      'White Faux Fur Base Blanket with Complete On-Site Styling'
    ]
  }
];

export const products = [
  {
    id: 'baby-boy-luxury-trunk',
    name: 'Little Prince Deluxe Baby Boy Gift Trunk',
    badge: 'BABY BOY',
    badgeType: 'sky',
    price: 200,
    formattedPrice: '200 AED',
    priceNote: '(Delivery charges apply)',
    currency: 'AED',
    whatsappNumber: '971501487453',
    whatsappMessage: 'Hello! I would like to order the Little Prince Deluxe Baby Boy Gift Trunk for 200 AED (Delivery charges apply).',
    description: 'Luxe textured trunk with "It\'s A Boy" emblem, organic striped onesie, soft cotton garments, baby rattles, and sky-blue keepsake roses.',
    longDescription: 'A distinguished celebration hamper crafted to welcome a precious newborn baby boy. Encased in a deluxe textured woven keepsake trunk tied with a soft satin bow, featuring an embossed "It\'s A Boy" badge, organic cotton striped rompers and sleepsuits, plush booties, an interactive rattle toy set, and delicate sky-blue keepsake roses.',
    rating: 5.0,
    reviewCount: 29,
    image: `${BASE}images/baby_boy_luxury_hamper.jpg`,
    category: 'baby-boy',
    items: [
      'Deluxe Textured Keepsake Trunk with Satin Ribbon Bow',
      'Embossed "It\'s A Boy" Signature Badge',
      'Organic Cotton Striped Romper & Onesie Apparel',
      'Plush Cotton Baby Booties & Soft Cuddle Apparel',
      'Interactive Baby Rattle Set',
      'Sky-Blue Silk Keepsake Roses & Organza Ribbon Accents',
      'Personalized Welcome Baby Boy Greeting Card'
    ]
  },
  {
    id: 'shirt-and-half-kg-cake-hamper',
    name: "Gentleman's Shirt & Handcrafted Cake Acrylic Trunk",
    badge: 'BESTSELLER',
    badgeType: 'gold',
    price: 200,
    formattedPrice: '200 AED',
    priceNote: '(Delivery charges apply)',
    currency: 'AED',
    whatsappNumber: '971501487453',
    whatsappMessage: "Hello! I would like to order the Gentleman's Shirt & Handcrafted Cake Acrylic Trunk for 200 AED (Delivery charges apply).",
    description: 'Crystal-clear luxury acrylic trunk featuring a fine formal shirt, velvet red roses, Ferrero Rocher, personalized couple illustration card, and a separate round celebratory box with 1/2 kg gourmet heart-dusted cake.',
    longDescription: 'The quintessential celebration gift pairing exquisite confectionery with fine wardrobe attire. Presented in a crystal-clear acrylic keepsake case tied with gold-patterned burgundy ribbon, holding a premium men\'s formal shirt, deep crimson velvet roses, golden Ferrero Rocher truffles, a personalized couple portrait card, and accompanied by a separate cylindrical showcase box housing a 1/2 kg gourmet vanilla-cream cake decorated with ruby red hearts and golden "Happy Birthday" script.',
    rating: 5.0,
    reviewCount: 46,
    image: `${BASE}images/shirt_and_half_kg_cake_hamper.jpg`,
    category: 'festive',
    items: [
      'Crystal-Clear Acrylic Display Trunk with Satin Gold-Pattern Ribbon',
      'Handcrafted 1/2 kg Celebration Cake with Heart Accents in Round Showcase Box',
      'Premium Men\'s Formal Shirt / Attire Presentation',
      'Golden Ferrero Rocher Hazelnut Truffles (x2)',
      'Silk Velvet Crimson Roses with Gold "Happy Birthday" Laser-Cut Script',
      'Personalized Custom Couple Sketch / Keepsake Birthday Card',
      'Luxury Burgundy Satin Ribbon & Gold Foil Toppers'
    ]
  },
  {
    id: 'first-birthday-celebration-hamper',
    name: 'First Birthday Princess Celebration Hamper Basket',
    badge: '1ST BIRTHDAY',
    badgeType: 'rose',
    price: 200,
    formattedPrice: '200 AED',
    priceNote: '(Delivery charges apply)',
    currency: 'AED',
    whatsappNumber: '971501487453',
    whatsappMessage: 'Hello! I would like to order the First Birthday Princess Celebration Hamper Basket for 200 AED (Delivery charges apply).',
    description: 'Handwoven wicker basket adorned with pink satin bows, crowned "1" milestone badge, plush winged dragon companion, floral headbands, pastel baby apparel, and gold "Happy Birthday" script.',
    longDescription: 'Make a little one\'s first milestone unforgettable. Hand-arranged in a charcoal woven wicker basket finished with lace trim and pink gingham ribbon bows. Features a sparkling crowned rose-gold "1" milestone plaque, an ultra-soft plush pink winged dragon, a set of handmade floral and pearl baby headbands, soft mint and pink apparel, and elegant silk roses.',
    rating: 5.0,
    reviewCount: 38,
    image: `${BASE}images/first_birthday_celebration_hamper.jpg`,
    category: 'baby-girl',
    items: [
      'Handwoven Charcoal Basket with Delicate Lace Border & Pink Satin Bows',
      'Crowned Rose-Gold "1" Milestone Birthday Plaque',
      'Plush Pink Winged Dragon Keepsake Soft Toy',
      'Handmade Floral & Pearl Baby Headband Collection',
      'Organic Pastel Mint & Pink Cotton Apparel',
      'Silk Roses & Golden "Happy Birthday" Keepsake Topper',
      'Personalized 1st Birthday Wishes Greeting Card'
    ]
  },
  {
    id: 'personalized-memories-chocolate-bouquet',
    name: 'Personalized Photo & Chocolate Bloom Bouquet',
    badge: 'BOUQUET',
    badgeType: 'rose',
    price: 90,
    formattedPrice: '90 AED',
    priceNote: '(Delivery charges apply)',
    currency: 'AED',
    whatsappNumber: '971501487453',
    whatsappMessage: 'Hello! I would like to order the Personalized Photo & Chocolate Bloom Bouquet for 90 AED (Delivery charges apply).',
    description: 'Custom polaroid keepsake prints, Cadbury Dairy Milk, Galaxy chocolates, Kinder Joy treats, and red roses in blush wrapping.',
    longDescription: 'A heartfelt, personalized bouquet crafted with love and memories. Features custom mini polaroid memory prints arranged with Cadbury Dairy Milk chocolate, Galaxy silk bars, Kinder Joy surprise eggs, TimeOut bars, and fresh velvet red roses adorned with delicate baby’s breath in a blush pink bloom wrap with iridescent ribbon.',
    rating: 5.0,
    reviewCount: 42,
    image: `${BASE}images/custom_polaroid_chocolate_bouquet.jpg`,
    category: 'bouquets',
    items: [
      'Custom Mini Polaroid Keepsake Photos',
      'Cadbury Dairy Milk Chocolate Bar',
      'Galaxy Chocolate Silk Bars',
      'Kinder Joy Surprise Treats (x2)',
      'TimeOut Chocolate Crisp Bar',
      'Fresh Velvet Red Roses & Baby’s Breath',
      'Signature Daisy Blush Wrapping & Iridescent Ribbon',
      'Personalized Greeting Card'
    ]
  },
  {
    id: 'ruby-gold-deluxe-chocolate-bouquet',
    name: 'Ruby & Gold Deluxe Confectionery Bouquet',
    badge: 'BOUQUET',
    badgeType: 'gold',
    price: 100,
    formattedPrice: '100 AED',
    priceNote: '(plus delivery)',
    currency: 'AED',
    whatsappNumber: '971501487453',
    whatsappMessage: 'Hello! I would like to order the Ruby & Gold Deluxe Confectionery Bouquet for 100 AED (plus delivery).',
    description: 'Galaxy White bars, Kinder Bueno, Golden Twix, KitKat bars, and pearl-centered red roses in ruby & gold wrapping.',
    longDescription: 'An opulent luxury confectionery bouquet designed to amaze. Handcrafted with rich ruby red and metallic gold origami wrapping with a gold heart satin bow. Loaded with premium Galaxy Smooth White chocolate bars, crispy Kinder Bueno, golden Twix caramel bars, crispy KitKat, and luxury red roses centered with golden pearls and delicate white lace.',
    rating: 5.0,
    reviewCount: 56,
    image: `${BASE}images/ruby_gold_chocolate_bouquet.jpg`,
    category: 'bouquets',
    items: [
      'Galaxy Smooth White Chocolate Bars (x3)',
      'Kinder Bueno Crispy Hazelnut Bars (x2)',
      'Golden Twix Caramel & Biscuit Bars (x2)',
      'Crispy KitKat Chocolate Bars (x2)',
      'Velvet Red Roses with Golden Pearl Centers (x3)',
      'Delicate White Floral Lace Accent',
      'Opulent Ruby & Gold Paper with Gold-Heart Ribbon Bow'
    ]
  }
];

export const steps = [
  {
    number: '01',
    title: 'Choose Your Hamper Style',
    description: 'Pick from our curated Premium, Baby, Festive, or Corporate collections.'
  },
  {
    number: '02',
    title: 'Personalize Treats & Ribbons',
    description: 'Add artisan touches, select signature ribbons, and pen a handwritten message.'
  },
  {
    number: '03',
    title: 'Delivered in Mint Condition',
    description: 'Carefully wrapped and hand-packed with white-glove dispatch across India, UAE, and Qatar.'
  }
];

export const testimonials = [
  {
    id: 1,
    rating: '5 / 5',
    stars: 5,
    quote: '“The Baby Girl hamper we ordered was so gorgeous and soft. The new parents were in tears! The hand-stitched booties and delicate blanket felt truly heirloom quality.”',
    author: 'Pooja K.',
    location: 'Mumbai',
    occasion: 'baby',
    occasionLabel: 'Baby Arrival',
    hamper: 'Sweet Princess Baby Girl Hamper',
    date: 'February 2026'
  },
  {
    id: 2,
    rating: '5 / 5',
    stars: 5,
    quote: '“The Royal Reserve Premium hamper exceeded all expectations for our VIP clients. The matte dark trunk and vintage champagne made a colossal impression.”',
    author: 'Vikram S.',
    location: 'Bengaluru',
    occasion: 'reserve',
    occasionLabel: 'Executive Milestone',
    hamper: 'The Royal Reserve Luxury Hamper',
    date: 'January 2026'
  },
  {
    id: 3,
    rating: '5 / 5',
    stars: 5,
    quote: '“The Baby Boy gift basket looked straight out of a luxury magazine. Packaging was top notch and arrived impeccably fresh with crisp satin bows.”',
    author: 'Ananya R.',
    location: 'Delhi',
    occasion: 'baby',
    occasionLabel: 'Newborn Gift',
    hamper: 'Little Prince Baby Boy Hamper',
    date: 'January 2026'
  },
  {
    id: 4,
    rating: '5 / 5',
    stars: 5,
    quote: '“Ordered 25 corporate elegance trunks for our annual partner retreat. The embossed brass pens and leather journals were universally praised.”',
    author: 'Rajiv M.',
    location: 'Hyderabad',
    occasion: 'corporate',
    occasionLabel: 'Corporate Gifting',
    hamper: 'Executive Corporate Elegance',
    date: 'December 2025'
  },
  {
    id: 5,
    rating: '5 / 5',
    stars: 5,
    quote: '“The Festive Celebrations hamper was the highlight of our family Diwali reunion. The gourmet spiced treats and sparkling sip were divine.”',
    author: 'Meera & Dev',
    location: 'Chennai',
    occasion: 'festive',
    occasionLabel: 'Festive & Celebration',
    hamper: 'Festive Celebrations Hamper',
    date: 'November 2025'
  },
  {
    id: 6,
    rating: '5 / 5',
    stars: 5,
    quote: '“Customized a bespoke wicker basket with organic honey, Earl Grey tea, and botanical candle. The recipient called it the most tasteful gift she had ever received.”',
    author: 'Sunita P.',
    location: 'Kolkata',
    occasion: 'reserve',
    occasionLabel: 'Bespoke Curation',
    hamper: 'Bespoke Atelier Studio',
    date: 'February 2026'
  }
];

export const buildableItems = [
  { id: 'item-1', name: 'Artisanal Gold Chocolate Truffles', price: 450, category: 'Gourmet Treats' },
  { id: 'item-2', name: 'Raw Wildflower Honey Jar & Dipper', price: 380, category: 'Gourmet Treats' },
  { id: 'item-3', name: 'Plush Baby Keepsake Toy (Pink / Blue)', price: 650, category: 'Baby Essentials' },
  { id: 'item-4', name: 'Organic Cotton Baby Swaddle Blanket', price: 550, category: 'Baby Essentials' },
  { id: 'item-5', name: 'Spiced Botanical Soy Candle', price: 650, category: 'Luxury Living' },
  { id: 'item-6', name: 'Handcrafted Hammered Brass Mug', price: 550, category: 'Luxury Living' },
  { id: 'item-7', name: 'Organic Earl Grey Leaf Tea 125g', price: 320, category: 'Sips' },
  { id: 'item-8', name: 'Sparkling Vintage Rose Cider 375ml', price: 750, category: 'Sips' }
];

export const ribbonOptions = ['Forest Green Velvet', 'Warm Gold Silk', 'Dusty Rose Satin', 'Powder Blue Silk', 'Classic Ivory Satin'];

