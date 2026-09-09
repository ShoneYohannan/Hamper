import React, { useMemo, useState } from 'react';
import { Eye, ArrowDown, Star, CheckCircle2 } from 'lucide-react';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import { useTheme } from '../context/ThemeContext';
import { useCms } from '../context/CmsContext';

export default function BudgetFriendlyPage({ onQuickView, onNavigate }) {
  const { isGlass, isPremiumAnim } = useTheme();
  const { products, siteSettings } = useCms();
  const [clickedCardId, setClickedCardId] = useState(null);

  // Filter and sort the budget friendly hampers (100 AED, 120 AED, 150 AED)
  const budgetProducts = useMemo(() => {
    const list = products.filter((p) => 
      p.category === 'budget-friendly' || 
      p.badge?.toUpperCase().includes('BUDGET') ||
      p.id?.includes('stone-bouquet') ||
      (Array.isArray(p.categories) && p.categories.includes('budget-friendly'))
    );
    return [...list].sort((a, b) => (a.price || 0) - (b.price || 0));
  }, [products]);

  const handleWhatsAppOrder = (product, e) => {
    if (e) e.stopPropagation();
    const phone = product.whatsappNumber || siteSettings.whatsappNumber || '971501487453';
    const defaultMsg = `Hello! I would like to order the ${product.name} for ${product.formattedPrice} ${product.priceNote || ''}.`;
    const text = encodeURIComponent(product.whatsappMessage || defaultMsg);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const handleCardClick = (product, e) => {
    if (e && e.target.closest('button, a')) return;
    setClickedCardId(product.id);
    setTimeout(() => setClickedCardId(null), 380);
    setTimeout(() => {
      if (onQuickView) onQuickView(product);
    }, 160);
  };

  const getTierMeta = (price) => {
    if (price === 100) {
      return {
        tierName: 'Tier I · Heartfelt Keepsake',
        badgeColor: 'from-rose-500/20 to-amber-500/20 border-rose-400/40 text-rose-200',
        glowColor: 'bg-rose-500/15',
        featuredTag: 'Anniversary Special',
        highlight: 'Single Heirloom Rose & Cake'
      };
    } else if (price === 120) {
      return {
        tierName: 'Tier II · Romance & Indulgence',
        badgeColor: 'from-amber-500/20 to-purple-500/20 border-amber-400/40 text-amber-200',
        glowColor: 'bg-purple-500/15',
        featuredTag: 'Tabletop Mirror Keepsake',
        highlight: 'KitKat Bouquet & Memory Mirror'
      };
    } else {
      return {
        tierName: 'Tier III · Signature Celebration',
        badgeColor: 'from-amber-400/30 to-amber-600/30 border-[#D4AF37]/60 text-[#F3E5AB]',
        glowColor: 'bg-[#D4AF37]/20',
        featuredTag: '⭐ Most Popular',
        highlight: 'Kinder Bueno & Celebration Cake'
      };
    }
  };

  if (budgetProducts.length === 0) return null;

  return (
    <section
      id="budget"
      className={`py-16 sm:py-24 relative scroll-mt-16 overflow-hidden transition-colors duration-500 ${
        isGlass 
          ? 'bg-transparent border-t border-white/10' 
          : 'bg-[#F7F5F0] border-t border-black/[0.05]'
      }`}
    >
      {/* Ambient background glow orbs for depth and subtle motion */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-[100px] budget-ambient-orb" />
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 rounded-full bg-rose-600/10 blur-[110px] budget-ambient-orb" style={{ animationDelay: '-5s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10 space-y-12 sm:space-y-16">
        
        {/* Section Header with refined luxury typography */}
        <ScrollReveal distance={20} duration={600}>
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className={`text-[11px] font-medium tracking-[0.25em] uppercase ${
              isGlass ? 'text-[#D4AF37]' : 'text-neutral-500'
            }`}>
              {siteSettings?.budgetBadge || 'Petite Milestone Collection'}
            </span>

            <h2 className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight ${
              isGlass ? 'text-white drop-shadow-md' : 'text-[#171717]'
            }`}>
              {siteSettings?.budgetHeadline || 'Budget-Friendly Hampers'}
            </h2>

            <p className={`text-sm sm:text-base font-normal leading-relaxed ${
              isGlass ? 'text-neutral-300' : 'text-neutral-600'
            }`}>
              {siteSettings?.budgetSubtitle || 'Handcrafted celebration stone bouquets pairing fresh gourmet celebration cakes, velvet roses, and fine chocolates — thoughtful gifting made accessible without compromise.'}
            </p>
          </div>
        </ScrollReveal>

        {/* ── Responsive 3-Card Showcase Grid (Mobile, Tablet & Desktop) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {budgetProducts.map((product, idx) => {
            const meta = getTierMeta(product.price);
            const isPopular = product.price === 150;

            return (
              <ScrollReveal
                key={product.id}
                delay={idx * 120}
                distance={28}
                duration={600}
                className="h-full"
              >
                <TiltCard
                  onClick={(e) => handleCardClick(product, e)}
                  maxTilt={isPremiumAnim ? 7 : 0}
                  className="h-full"
                >
                  <div
                    className={`budget-tier-card rounded-3xl p-6 sm:p-7 cursor-pointer flex flex-col justify-between group h-full relative overflow-hidden hamper-card-interactive ${
                      clickedCardId === product.id ? 'hamper-click-animated' : ''
                    } ${
                      isGlass
                        ? `glass-panel border-white/20 hover:border-[#D4AF37]/70 text-white ${isPopular ? 'ring-1 ring-[#D4AF37]/50 shadow-[0_0_30px_rgba(212,175,55,0.18)]' : ''}`
                        : `bg-white border ${isPopular ? 'border-[#D4AF37]/70 shadow-[0_12px_36px_rgba(212,175,55,0.12)]' : 'border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)]'} hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]`
                    }`}
                  >
                    {/* Ambient card hover glow */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${meta.glowColor} blur-2xl -z-10`} />

                    <div>
                      {/* Top banner: Only popular card has badge; min-height keeps image and text perfectly aligned */}
                      <div className="flex items-center justify-end gap-2 mb-4 min-h-[26px]">
                        {isPopular && (
                          <span className="text-[11px] font-medium text-[#D4AF37] uppercase tracking-widest flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-current text-[#D4AF37]" />
                            <span>Most Popular</span>
                          </span>
                        )}
                      </div>

                      {/* Image Showcase with contoured frame & price badge */}
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-neutral-900/20 shadow-inner">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                        />
                        <div className="absolute top-3.5 left-3.5">
                          <span className={`font-serif text-sm font-medium px-4 py-1.5 rounded-full shadow-lg backdrop-blur-md ${
                            isGlass
                              ? 'bg-black/75 text-[#F3E5AB] border border-[#D4AF37]/50'
                              : 'bg-white/95 text-neutral-900 border border-neutral-200/90 font-semibold'
                          }`}>
                            {product.formattedPrice}
                          </span>
                        </div>
                      </div>

                      {/* Title & Narrative */}
                      <div className="space-y-2">
                        <h3 className={`font-serif text-xl sm:text-2xl font-normal leading-snug transition-colors ${
                          isGlass
                            ? 'text-white group-hover:text-[#F3E5AB]'
                            : 'text-[#171717] group-hover:text-neutral-700'
                        }`}>
                          {product.name}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed line-clamp-2 ${
                          isGlass ? 'text-neutral-300' : 'text-neutral-500'
                        }`}>
                          {product.description}
                        </p>
                      </div>

                      {/* Inclusions Checklist */}
                      {product.items && (
                        <div className="mt-4 pt-4 border-t border-black/[0.05] dark:border-white/10 space-y-1.5">
                          <span className={`text-[10.5px] uppercase tracking-wider font-medium ${
                            isGlass ? 'text-neutral-400' : 'text-neutral-400'
                          }`}>
                            Curated Inclusions:
                          </span>
                          <div className="space-y-1.5 pt-1">
                            {product.items.slice(0, 3).map((item, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-neutral-400">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                                <span className={`line-clamp-1 ${isGlass ? 'text-neutral-300' : 'text-neutral-600'}`}>
                                  {item}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Price & Order Bar */}
                    <div className={`pt-6 mt-6 border-t flex items-center justify-between gap-3 ${
                      isGlass ? 'border-white/10' : 'border-neutral-100'
                    }`}>
                      <div>
                        <span className={`text-lg font-serif font-medium ${
                          isGlass ? 'text-[#F3E5AB]' : 'text-neutral-900'
                        }`}>
                          {product.formattedPrice}
                        </span>
                        {product.priceNote && (
                          <span className={`block text-[11px] leading-tight font-normal ${
                            isGlass ? 'text-amber-200/70' : 'text-neutral-500'
                          }`}>
                            {product.priceNote}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
                          className={`p-2.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 ${
                            isGlass
                              ? 'text-neutral-300 hover:text-white hover:bg-white/10'
                              : 'text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100'
                          }`}
                          title="Quick View"
                          aria-label={`Quick view ${product.name}`}
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={(e) => handleWhatsAppOrder(product, e)}
                          className={`interactive-btn px-4 sm:px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase flex items-center gap-1.5 shadow-sm active:scale-95 transition-all ${
                            isGlass
                              ? 'bg-emerald-600/90 hover:bg-emerald-500 text-white font-semibold border border-emerald-400/40 shadow-[0_2px_12px_rgba(16,185,129,0.35)]'
                              : 'bg-[#25D366] hover:bg-[#20ba5a] text-white font-medium shadow-sm'
                          }`}
                          title="Order via WhatsApp"
                        >
                          <WhatsAppIcon className="w-4 h-4 shrink-0" variant="white" />
                          <span>Order</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>

        {/* ── Exploration Bridge: Smoothly guides user to explore the full catalog ── */}
        <ScrollReveal delay={160} distance={18} duration={600}>
          <div className={`rounded-3xl p-7 sm:p-9 md:p-11 border transition-all text-center space-y-4 max-w-4xl mx-auto shadow-sm relative overflow-hidden ${
            isGlass 
              ? 'glass-panel border-white/15 bg-white/[0.02]' 
              : 'bg-white border-neutral-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)]'
          }`}>
            <span className={`text-[11px] font-medium tracking-[0.25em] uppercase ${
              isGlass ? 'text-[#D4AF37]' : 'text-neutral-400'
            }`}>
              {siteSettings?.budgetBridgeBadge || 'Explore The Full Storefront'}
            </span>
            
            <h3 className={`font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-snug ${
              isGlass ? 'text-white' : 'text-[#171717]'
            }`}>
              {siteSettings?.budgetBridgeHeadline || 'Looking for Signature Keepsakes, Newborn Sets & Deluxe Trunks?'}
            </h3>

            <p className={`text-xs sm:text-sm max-w-xl mx-auto leading-relaxed ${
              isGlass ? 'text-neutral-300' : 'text-neutral-500'
            }`}>
              {siteSettings?.budgetBridgeSubtitle || 'Discover our complete collection featuring Gentleman\'s formal shirt trunks, Little Prince & Princess keepsakes, and custom photo chocolate blooms.'}
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('collections');
                  } else {
                    const el = document.getElementById('collections');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`inline-flex items-center gap-2 px-7 sm:px-9 py-3.5 rounded-full text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 shadow-sm active:scale-95 cursor-pointer ${
                  isGlass
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B78A45] hover:brightness-110 text-[#0A0D0C] font-semibold shadow-[0_4px_24px_rgba(212,175,55,0.35)]'
                    : 'bg-[#171717] hover:bg-neutral-800 text-white'
                }`}
              >
                <span>{siteSettings?.budgetBridgeButtonText || 'Explore All Collections'}</span>
                <ArrowDown className="w-3.5 h-3.5 -rotate-90" />
              </button>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
