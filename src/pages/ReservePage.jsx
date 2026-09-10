import React, { useState, useRef, useMemo } from 'react';
import { Check, ShieldCheck, CheckCircle2, Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import { useTheme } from '../context/ThemeContext';
import { useCms } from '../context/CmsContext';

export default function ReservePage({ onAddToCart, onQuickView }) {
  const { isGlass, isPremiumAnim } = useTheme();
  const { reserveProducts, siteSettings } = useCms();
  // Always start with first Reserve hamper (index 0)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addedIds, setAddedIds] = useState({});

  // Touch swipe handling
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Guarantee strict Reserve order: 500 AED first, then 450 AED, then 400 AED
  const sortedReserveProducts = useMemo(() => {
    const priority = [500, 450, 400];
    return [...reserveProducts].sort((a, b) => {
      const aIdx = priority.indexOf(Number(a.price));
      const bIdx = priority.indexOf(Number(b.price));
      if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
      if (aIdx !== -1) return -1;
      if (bIdx !== -1) return 1;
      return (Number(b.price) || 0) - (Number(a.price) || 0);
    });
  }, [reserveProducts]);

  const safeIndex = Math.min(currentIndex, Math.max(0, sortedReserveProducts.length - 1));
  const currentProduct = sortedReserveProducts[safeIndex] || sortedReserveProducts[0] || null;

  const handleNext = () => {
    if (sortedReserveProducts.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % sortedReserveProducts.length);
  };

  const handlePrev = () => {
    if (sortedReserveProducts.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + sortedReserveProducts.length) % sortedReserveProducts.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleAdd = (product) => {
    if (product) {
      onAddToCart(product);
      setAddedIds(prev => ({ ...prev, [product.id]: true }));
      setTimeout(() => {
        setAddedIds(prev => ({ ...prev, [product.id]: false }));
      }, 2000);
    }
  };

  const handleWhatsAppOrder = (product) => {
    if (!product) return;
    const phone = product.whatsappNumber || siteSettings.whatsappNumber || '971501487453';
    const text = encodeURIComponent(
      product.whatsappMessage || `Hello! I would like to order the ${product.name} for ${product.formattedPrice} ${product.priceNote || ''}.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };



  const reserveCraftsmanship = [
    {
      title: 'Handcrafted Dual-Heart Silhouette',
      desc: 'Bespoke interconnecting red heart frame architecture, designed as a lasting heirloom keepsake.'
    },
    {
      title: 'Ahmed Al Maghribi & Fine Fragrances',
      desc: 'Authentic high-concentration Eau De Parfum (Oud & Roses) and designer body mist suites.'
    },
    {
      title: 'Illuminated Acrylic Presentation',
      desc: 'Crystal-clear keepsake case wrapped with delicate pink silk ribbon and warm ambient LED fairy lights.'
    },
    {
      title: 'Artisanal Bento Celebration Cake',
      desc: 'Hand-frosted pastel pink cake with pearl bead details and custom handwritten celebration script.'
    },
    {
      title: 'Fresh Silk Botanicals & Florals',
      desc: 'Velvet crimson and heirloom blush roses paired with sunshine daisies and golden autumn accents.'
    },
    {
      title: 'White-Glove Dispatch & Packaging',
      desc: 'Temperature-controlled protective packaging dispatched across India, UAE, and Qatar.'
    }
  ];

  return (
    <div id="reserve" className={`py-20 lg:py-28 scroll-mt-20 transition-colors duration-400 ${
      isGlass ? 'bg-transparent border-t border-white/10' : 'bg-[#FAF8F5] border-t border-black/[0.04]'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16 sm:space-y-20">
        
        {/* Page Hero Header */}
        <ScrollReveal distance={16}>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className={`text-[11px] font-medium tracking-[0.25em] uppercase ${
              isGlass ? 'text-[#D4AF37]' : 'text-neutral-400'
            }`}>
              {siteSettings?.reserveBadge || 'Private Vault & Allocation'}
            </span>
            <h2 className={`font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-[1.08] ${
              isGlass ? 'text-white drop-shadow-md' : 'text-[#171717]'
            }`}>
              {siteSettings?.reserveHeadline || 'The Reserve'}
            </h2>
            <p className={`text-base sm:text-lg font-normal leading-relaxed max-w-2xl mx-auto ${
              isGlass ? 'text-neutral-300' : 'text-neutral-500'
            }`}>
              {siteSettings?.reserveSubtitle || 'Our highest expression of luxury gifting. Individually assembled with bespoke artisan detailing, authentic perfumery, illuminated acrylic cases, and white-glove dispatch.'}
            </p>
          </div>
        </ScrollReveal>


        {/* Interactive Luxury Carousel Stage */}
        <ScrollReveal delay={120} distance={20}>
          <div 
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Previous Button (Desktop Floating Side Arrow) */}
            <button
              onClick={handlePrev}
              className={`hidden md:flex absolute -left-5 lg:-left-7 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full items-center justify-center transition-all duration-300 shadow-xl active:scale-95 ${
                isGlass
                  ? 'bg-black/80 hover:bg-[#D4AF37] text-white hover:text-black border border-white/20 hover:border-[#D4AF37]'
                  : 'bg-white hover:bg-neutral-900 text-neutral-800 hover:text-white border border-neutral-200 shadow-lg'
              }`}
              title="Previous Creation"
              aria-label="Previous Creation"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Next Button (Desktop Floating Side Arrow) */}
            <button
              onClick={handleNext}
              className={`hidden md:flex absolute -right-5 lg:-right-7 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full items-center justify-center transition-all duration-300 shadow-xl active:scale-95 ${
                isGlass
                  ? 'bg-black/80 hover:bg-[#D4AF37] text-white hover:text-black border border-white/20 hover:border-[#D4AF37]'
                  : 'bg-white hover:bg-neutral-900 text-neutral-800 hover:text-white border border-neutral-200 shadow-lg'
              }`}
              title="Next Creation"
              aria-label="Next Creation"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Main Active Carousel Card with 3D Tilt */}
            {currentProduct && (
              <TiltCard maxTilt={isPremiumAnim ? 3 : 0} className="w-full">
                <div 
                  key={currentProduct.id}
                  className={`rounded-3xl p-6 sm:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center transition-all duration-500 animate-fade-in image-zoom-container ${
                    isGlass 
                      ? 'glass-panel text-white shadow-[0_20px_60px_rgba(0,0,0,0.55)] border-white/15 hover:border-[#D4AF37]/40' 
                      : 'bg-white border border-neutral-200/70 shadow-[0_4px_25px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]'
                  }`}
                >
                  
                  {/* Grand Product Photo Showcase - Full Uncut Image Display */}
                  <div className="lg:col-span-6 relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/15 group">
                    <img
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      className="w-full h-auto block rounded-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                    
                    {/* Badge Overlay */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[10px] tracking-widest uppercase font-semibold px-3.5 py-1.5 rounded-full shadow-md bg-black/85 backdrop-blur-md text-[#F3E5AB] border border-[#D4AF37]/40">
                        {currentProduct.badge}
                      </span>
                    </div>

                    {/* Pagination Badge Overlay - placed at top right so it never obstructs the cake/hamper at the bottom */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="text-[10px] tracking-wider uppercase font-medium px-3 py-1.5 rounded-full shadow-md backdrop-blur-md bg-black/85 text-[#F3E5AB] border border-[#D4AF37]/30">
                        0{currentIndex + 1} / 0{sortedReserveProducts.length}
                      </span>
                    </div>
                  </div>

                  {/* Editorial & Ordering Narrative */}
                  <div className="lg:col-span-6 space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] uppercase tracking-[0.22em] font-semibold ${
                          isGlass ? 'text-[#D4AF37]' : 'text-neutral-400'
                        }`}>
                          Haute Reserve 0{currentIndex + 1}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#F3E5AB] border border-[#D4AF37]/30">
                          {currentProduct?.price === 500 ? '500 AED Flagship Reserve' : currentProduct?.price === 450 ? '450 AED Anniversary Reserve' : '400 AED Celebration Experience'}
                        </span>
                      </div>
                      <h3 className={`font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-tight ${
                        isGlass ? 'text-white' : 'text-[#171717]'
                      }`}>
                        {currentProduct.name}
                      </h3>
                      <div className="flex items-baseline gap-2.5 pt-1">
                        <span className={`text-3xl font-normal ${
                          isGlass ? 'text-[#F3E5AB] font-medium' : 'text-neutral-900 font-medium'
                        }`}>
                          {currentProduct.formattedPrice}
                        </span>
                        {currentProduct.priceNote && (
                          <span className={`text-xs ${isGlass ? 'text-amber-200/70' : 'text-neutral-500'}`}>
                            {currentProduct.priceNote}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className={`text-xs sm:text-sm leading-relaxed font-normal ${
                      isGlass ? 'text-neutral-300' : 'text-neutral-500'
                    }`}>
                      {currentProduct.longDescription}
                    </p>

                    {/* Inclusions Highlights */}
                    {currentProduct.items && (
                      <div className={`space-y-2 pt-3 border-t ${
                        isGlass ? 'border-white/10' : 'border-neutral-100'
                      }`}>
                        <span className={`text-[11px] font-semibold uppercase tracking-wider ${
                          isGlass ? 'text-[#D4AF37]' : 'text-neutral-500'
                        }`}>
                          Artisan Inclusions:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {currentProduct.items.slice(0, 6).map((item, i) => (
                            <div key={i} className={`flex items-center gap-2 ${
                              isGlass ? 'text-neutral-300' : 'text-neutral-600'
                            }`}>
                              <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${
                                isGlass ? 'text-[#D4AF37]' : 'text-neutral-400'
                              }`} />
                              <span className="truncate">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Certified Attributes */}
                    <div className={`pt-2 flex flex-wrap gap-4 sm:gap-6 text-xs font-normal border-t ${
                      isGlass ? 'border-white/10 text-neutral-300' : 'border-neutral-100 text-neutral-600'
                    }`}>
                      <div className="flex items-center gap-2 group">
                        <ShieldCheck className={`w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110 ${isGlass ? 'text-[#D4AF37]' : 'text-neutral-400'}`} />
                        <span>White-Glove Dispatch across India, UAE & Qatar</span>
                      </div>
                      <div className="flex items-center gap-2 group">
                        <Sparkles className={`w-4 h-4 shrink-0 transition-transform duration-300 group-hover:scale-110 ${isGlass ? 'text-[#D4AF37]' : 'text-neutral-400'}`} />
                        <span>Calligraphy Keepsake Included</span>
                      </div>
                    </div>

                    {/* Action Buttons: Exclusive Concierge WhatsApp Reservation (No checkout / cart option) */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => handleWhatsAppOrder(currentProduct)}
                        className={`interactive-btn w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-semibold tracking-[0.14em] uppercase flex items-center justify-center gap-2.5 shadow-lg active:scale-95 transition-all ${
                          isGlass
                            ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:brightness-110 text-white shadow-[0_4px_25px_rgba(16,185,129,0.35)]'
                            : 'bg-[#25D366] hover:bg-[#20ba5a] text-white'
                        }`}
                        title="Reserve directly on WhatsApp"
                      >
                        <WhatsAppIcon className="w-4.5 h-4.5 shrink-0" variant="white" />
                        <span>Reserve on WhatsApp</span>
                      </button>

                      <button
                        onClick={() => onQuickView(currentProduct)}
                        className={`interactive-btn w-full sm:w-auto px-6 py-3.5 rounded-full text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 shadow-sm flex items-center justify-center gap-2 active:scale-95 ${
                          isGlass
                            ? 'glass-pill border-white/20 text-white hover:border-[#D4AF37] hover:bg-white/10'
                            : 'bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 hover:border-neutral-400'
                        }`}
                      >
                        <span>Explore Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                </div>
              </TiltCard>
            )}

            {/* Mobile Carousel Navigation Controls */}
            <div className="flex md:hidden items-center justify-between pt-6 px-2">
              <button
                onClick={handlePrev}
                className={`px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 transition-all ${
                  isGlass ? 'glass-pill text-white border-white/20' : 'bg-white border border-neutral-200 text-neutral-700'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              <div className="flex items-center gap-2">
                {sortedReserveProducts.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx 
                        ? isGlass ? 'w-8 bg-[#D4AF37]' : 'w-8 bg-[#171717]'
                        : isGlass ? 'w-2 bg-white/25' : 'w-2 bg-neutral-300'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className={`px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium flex items-center gap-1.5 transition-all ${
                  isGlass ? 'glass-pill text-white border-white/20' : 'bg-white border border-neutral-200 text-neutral-700'
                }`}
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Desktop Slide Indicator Dots */}
            <div className="hidden md:flex items-center justify-center gap-2.5 pt-8">
              {sortedReserveProducts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-400 ${
                    currentIndex === idx 
                      ? isGlass ? 'w-10 bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.6)]' : 'w-10 bg-[#171717]'
                      : isGlass ? 'w-2.5 bg-white/20 hover:bg-white/40' : 'w-2.5 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>
        </ScrollReveal>

        {/* Detailed Provenance & Craftsmanship Grid */}
        <div className="space-y-10">
          <ScrollReveal distance={16}>
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className={`text-[11px] font-medium tracking-[0.2em] uppercase ${
                isGlass ? 'text-[#D4AF37]' : 'text-neutral-400'
              }`}>
                Provenance & Craftsmanship
              </span>
              <h3 className={`font-serif text-3xl sm:text-4xl font-normal ${
                isGlass ? 'text-white' : 'text-[#171717]'
              }`}>
                Every Element, Perfectly Considered
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reserveCraftsmanship.map((item, idx) => (
              <ScrollReveal key={idx} delay={(idx % 3) * 80} distance={18}>
                <TiltCard maxTilt={isPremiumAnim ? 6 : 0} className="h-full">
                  <div
                    className={`rounded-2xl p-7 space-y-3 transition-smooth h-full ${
                      isGlass
                        ? 'glass-panel glass-panel-hover text-white'
                        : 'bg-white border border-neutral-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-neutral-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)]'
                    }`}
                  >
                    <span className={`text-xs font-serif font-normal transition-colors duration-300 ${
                      isGlass ? 'text-[#D4AF37]' : 'text-neutral-400'
                    }`}>
                      0{idx + 1}
                    </span>
                    <h4 className={`font-serif text-xl font-normal ${
                      isGlass ? 'text-white' : 'text-[#171717]'
                    }`}>
                      {item.title}
                    </h4>
                    <p className={`text-xs sm:text-sm leading-relaxed font-normal ${
                      isGlass ? 'text-neutral-300' : 'text-neutral-500'
                    }`}>
                      {item.desc}
                    </p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* VIP WhatsApp Concierge & Custom Curation Showcase */}
        <ScrollReveal distance={20}>
          <div className={`relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-16 border ${
            isGlass
              ? 'glass-panel border-white/20 text-white'
              : 'bg-gradient-to-br from-[#180422] via-[#141716] to-[#0D100F] text-white border-white/10 shadow-2xl'
          }`}>
            {/* Background Ambient Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Brand Story & Perks */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-medium tracking-[0.22em] uppercase bg-gradient-to-r from-[#D4AF37]/20 to-transparent border border-[#D4AF37]/30 text-[#F3E5AB]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Private Concierge & Custom Orders</span>
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight tracking-tight">
                    Have a Unique Celebration Vision in Mind?
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal max-w-xl">
                    Whether it’s a romantic car boot surprise, bespoke anniversary trunk, luxury wedding allocation, or custom perfume pairings — connect directly with our private gifting atelier on WhatsApp for instant assistance.
                  </p>
                </div>

                {/* Micro-Perks Badges */}
                {/* Location Badge */}
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 text-xs text-neutral-300 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>India · UAE · Qatar</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Aesthetic WhatsApp Action Card */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl p-6 sm:p-8 bg-black/40 backdrop-blur-xl border border-white/15 shadow-2xl space-y-6">
                  {/* Status row with pulsing green indicator */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                      <span className="text-xs font-medium text-emerald-400 tracking-wide uppercase">
                        Concierge Online Now
                      </span>
                    </div>
                    <span className="text-[11px] text-neutral-400 tracking-wider">
                      Quick reply
                    </span>
                  </div>

                  {/* Pre-composed message preview card */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-xs text-neutral-300 space-y-1.5">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#D4AF37]">
                      Pre-filled WhatsApp Request
                    </span>
                    <p className="italic text-neutral-200 leading-relaxed font-serif text-sm">
                      “Hello Dazzling Hampers! I would like to discuss a custom luxury hamper curation for my special occasion.”
                    </p>
                  </div>

                  {/* Direct WhatsApp Button */}
                  <button
                    onClick={() => {
                      const phone = siteSettings.whatsappNumber || '971501487453';
                      const msg = encodeURIComponent(
                        siteSettings.whatsappMessage ||
                        'Hello Dazzling Hampers! I would like to discuss a custom luxury hamper curation for my special occasion.'
                      );
                      window.open(`https://wa.me/${phone}?text=${msg}`, '_blank', 'noopener,noreferrer');
                    }}
                    className="interactive-btn w-full py-4 px-6 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white hover:brightness-110 shadow-[0_4px_25px_rgba(16,185,129,0.35)] transition-all group cursor-pointer"
                  >
                    <WhatsAppIcon className="w-5 h-5 fill-white shrink-0" />
                    <span>Chat on WhatsApp</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
