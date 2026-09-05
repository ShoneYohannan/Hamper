const BASE = import.meta.env.BASE_URL || '/';

export const categories = [
  { id: 'all', label: 'All Hampers', icon: '✨' },
  { id: 'premium', label: 'Premium Luxury', icon: '👑' },
  { id: 'baby-girl', label: 'Baby Girl', icon: '🎀' },
  { id: 'baby-boy', label: 'Baby Boy', icon: '🧸' },
  { id: 'festive', label: 'Festive & Celebration', icon: '🥂' },
  { id: 'corporate', label: 'Corporate Gifting', icon: '💼' }
];

export const products = [
  {
    id: 'premium-royal-reserve',
    name: 'The Royal Reserve Luxury Hamper',
    badge: 'PREMIUM LUXURY',
    badgeType: 'gold',
    price: 4500,
    formattedPrice: 'From ₹4,500',
    description: 'Vintage Dom Pérignon champagne, gold-leaf truffles, raw organic honeycomb, and a botanical candle in a handcrafted dark emerald trunk.',
    longDescription: 'Our hallmark luxury hamper crafted for unmatched sophistication. Encased in a handcrafted matte forest green trunk with gold hardware, featuring vintage Dom Pérignon champagne, artisanal gold-dusted chocolate truffles, organic honeycomb with wooden dipper, slow-roasted gourmet nuts, and an aromatic bergamot oak candle.',
    rating: 5.0,
    reviewCount: 84,
    image: `${BASE}images/premium_luxury_hamper.jpg`,
    category: 'premium',
    items: ['Vintage Champagne 750ml', 'Artisanal Gold Chocolate Truffles Box', 'Organic Raw Honeycomb 350g', 'Gourmet Roasted Salted Nuts Jar', 'Botanical Bergamot & Oak Candle', 'Gold Foil Keepsake Box with Satin Bow']
  },
  {
    id: 'baby-girl-welcome',
    name: 'Sweet Princess Baby Girl Hamper',
    badge: 'BABY GIRL',
    badgeType: 'rose',
    price: 3200,
    formattedPrice: 'From ₹3,200',
    description: 'Soft pastel pink plush bunny, organic floral swaddle, knit baby booties, and natural soothing organic baby balm.',
    longDescription: 'A tender, heartwarming welcome for a newborn baby girl. Beautifully presented in a natural handwoven keepsake basket with dusty rose satin ribbon. Includes an ultra-soft plush pink bunny companion, 100% organic cotton floral swaddle blanket, handmade cozy knit booties, and hypoallergenic botanical baby balm.',
    rating: 5.0,
    reviewCount: 52,
    image: `${BASE}images/baby_girl_hamper.jpg`,
    category: 'baby-girl',
    items: ['Pastel Pink Plush Bunny Toy', '100% Organic Floral Cotton Swaddle', 'Handmade Soft Knit Pink Booties', 'Botanical Organic Baby Balm 50ml', 'Natural Woven Willow Basket', 'Embossed Welcome Baby Girl Card']
  },
  {
    id: 'baby-boy-welcome',
    name: 'Little Prince Baby Boy Hamper',
    badge: 'BABY BOY',
    badgeType: 'sky',
    price: 3200,
    formattedPrice: 'From ₹3,200',
    description: 'Pastel sky-blue plush teddy bear, pure cotton cable knit blanket, soft booties, and gentle organic baby lotion.',
    longDescription: 'Celebrate the sweetest new arrival with our charming Little Prince Hamper. Nestled inside a custom-lined willow gift basket with powder blue silk bow, featuring a cuddly sky-blue plush bear, luxurious pure cotton cable knit blanket, delicate knit booties, and pure organic chamomile baby lotion.',
    rating: 4.9,
    reviewCount: 47,
    image: `${BASE}images/baby_boy_hamper.jpg`,
    category: 'baby-boy',
    items: ['Sky Blue Plush Teddy Bear', 'Pure Cotton Cable Knit Baby Blanket', 'Handcrafted Powder Blue Booties', 'Gentle Organic Chamomile Baby Lotion 100ml', 'Handwoven Willow Basket with Fabric Liner', 'Gold Letterpress Baby Boy Card']
  },
  {
    id: 'festive-celebrations',
    name: 'Festive Celebrations Hamper',
    badge: 'BESTSELLER',
    badgeType: 'gold',
    price: 2500,
    formattedPrice: 'From ₹2,500',
    description: 'A joyful keepsake of sparkling sips, spiced gingerbread, and celebratory artisanal treats.',
    longDescription: 'Curated for grand milestones and sparkling moments. Features a bottle of premium sparkling beverage, gold-wrapped artisanal truffles, spiced gingerbread biscuits, and hand-rolled festive cinnamon treats.',
    rating: 5.0,
    reviewCount: 48,
    image: `${BASE}images/festive_celebrations.jpg`,
    category: 'festive',
    items: ['Premium Sparkling Celebration Sip 375ml', 'Gold Truffles Luxury Box', 'Festive Shortbread Tin', 'Gourmet Spiced Panettone', 'Cinnamon Sticks Jar']
  },
  {
    id: 'artisanal-delights',
    name: 'Artisanal Gourmet Delights',
    badge: 'GOURMET',
    badgeType: 'sage',
    price: 1850,
    formattedPrice: 'From ₹1,850',
    description: 'Small-batch pleasures and pantry treasures, wrapped to impress.',
    longDescription: 'Gathered from independent master crafters. Packed with small-batch raw wildflower honey, handmade raspberry rose preserve, organic earl grey leaf tea, oat & cranberry biscuits, and rosemary sea salt almonds.',
    rating: 4.9,
    reviewCount: 36,
    image: `${BASE}images/artisanal_delights.jpg`,
    category: 'premium',
    items: ['Small-Batch Raw Wildflower Honey 250g', 'Raspberry & Rose Preserve 220g', 'Organic Earl Grey Tea 125g', 'Handmade Oat Cookies', 'Roasted Sea Salt Almonds']
  },
  {
    id: 'corporate-elegance',
    name: 'Executive Corporate Elegance',
    badge: 'FOR TEAMS & CLIENTS',
    badgeType: 'green',
    price: 3200,
    formattedPrice: 'From ₹3,200',
    description: 'Premium gifting made effortless for clients, colleagues, and executive milestones.',
    longDescription: 'Designed to leave an unforgettable professional impression. Features a handcrafted forest green leather journal, weighted brass executive pen, single-origin Peru 75% dark chocolate, matte green insulated flask, and hammered copper mug.',
    rating: 5.0,
    reviewCount: 62,
    image: `${BASE}images/corporate_elegance.jpg`,
    category: 'corporate',
    items: ['Green Vegan Leather Executive Journal', 'Solid Weighted Brass Pen', 'Single-Origin 75% Cacao Chocolate', 'Matte Insulated Tumbler', 'Hammered Copper Mug']
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
    description: 'Carefully wrapped and hand-packed for immediate nationwide courier dispatch.'
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

