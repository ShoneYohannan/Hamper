import React, { useState } from 'react';
import { ShoppingBag, Check, ShieldCheck, CheckCircle2, Sparkles, Send, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import { useTheme } from '../context/ThemeContext';

export default function ReservePage({ onAddToCart, onQuickView }) {
  const { isGlass, isPremiumAnim } = useTheme();
  const [isAdded, setIsAdded] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryData, setInquiryData] = useState({ name: '', email: '', company: '', message: '' });

  const reserveProduct = products.find(p => p.id === 'premium-royal-reserve');

  const handleAdd = () => {
    if (reserveProduct) {
      onAddToCart(reserveProduct);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryData({ name: '', email: '', company: '', message: '' });
    }, 4000);
  };

  const reserveFeatures = [
    {
      title: 'Vintage Dom Pérignon Champagne',
      desc: '750ml cellar-aged champagne with luminous brioche, ripe stone fruit, and delicate bubbles.'
    },
    {
      title: 'Artisanal 24k Gold-Leaf Truffles',
      desc: 'Hand-dusted dark ganache truffles made by master European chocolatiers.'
    },
    {
      title: 'Raw Organic Wildflower Honeycomb',
      desc: '350g single-origin raw comb with artisanal wooden honeycomb dipper.'
    },
    {
      title: 'Botanical Bergamot & Smoked Oak Candle',
      desc: '45-hour hand-poured coconut-soy candle in a heavy matte glass vessel.'
    },
    {
      title: 'Slow-Roasted Truffle & Sea Salt Nuts',
      desc: 'Slow-batch roasted almonds and cashews infused with winter black truffle.'
    },
    {
      title: 'Handcrafted Forest Green Trunk',
      desc: 'Reinforced wood frame, vegan leather exterior, brass corners, and double gold clasp.'
    }
  ];

  return (
    <div id="reserve" className={`py-20 lg:py-28 scroll-mt-20 transition-colors duration-400 ${
      isGlass ? 'bg-transparent border-t border-white/10' : 'bg-[#FAF8F5] border-t border-black/[0.04]'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-20">
        
        {/* Page Hero Header */}
        <ScrollReveal distance={16}>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className={`text-[11px] font-medium tracking-[0.25em] uppercase ${
              isGlass ? 'text-[#D4AF37]' : 'text-neutral-400'
            }`}>
              Private Vault & Allocation
            </span>
            <h2 className={`font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-[1.08] ${
              isGlass ? 'text-white drop-shadow-md' : 'text-[#171717]'
            }`}>
              The Reserve
            </h2>
            <p className={`text-base sm:text-lg font-normal leading-relaxed max-w-xl mx-auto ${
              isGlass ? 'text-neutral-300' : 'text-neutral-500'
            }`}>
              Our highest expression of luxury gifting. Individually assembled in limited batches for patrons seeking unmatched prestige.
            </p>
          </div>
        </ScrollReveal>

        {/* Flagship Product Showcase Card with Interactive Tilt */}
        {reserveProduct && (
          <ScrollReveal delay={100} distance={20}>
            <TiltCard maxTilt={isPremiumAnim ? 4 : 0}>
              <div className={`rounded-3xl p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center transition-smooth image-zoom-container ${
                isGlass 
                  ? 'glass-panel text-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/15 hover:border-[#D4AF37]/40' 
                  : 'bg-white border border-neutral-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.07)]'
              }`}>
                
                {/* Grand Photography */}
                <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900/30 group">
                  <img
                    src={reserveProduct.image}
                    alt={reserveProduct.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`text-[10px] tracking-widest uppercase font-medium px-3.5 py-1.5 rounded-full shadow-sm transition-all ${
                      isGlass ? 'bg-black/60 backdrop-blur-md text-[#F3E5AB] border border-white/10' : 'bg-white/95 text-neutral-800'
                    }`}>
                      Limited Batch Allocation
                    </span>
                  </div>
                </div>

                {/* Editorial Information */}
                <div className="lg:col-span-6 space-y-7">
                  <div className="space-y-2">
                    <span className={`text-[11px] uppercase tracking-[0.22em] font-medium ${
                      isGlass ? 'text-[#D4AF37]' : 'text-neutral-400'
                    }`}>
                      Haute Curation 01
                    </span>
                    <h3 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight ${
                      isGlass ? 'text-white' : 'text-[#171717]'
                    }`}>
                      {reserveProduct.name}
                    </h3>
                    <p className={`text-2xl font-normal pt-1 ${
                      isGlass ? 'text-[#F3E5AB]' : 'text-neutral-900'
                    }`}>
                      {reserveProduct.formattedPrice}
                    </p>
                  </div>

                  <p className={`text-sm sm:text-base leading-relaxed font-normal ${
                    isGlass ? 'text-neutral-300' : 'text-neutral-500'
                  }`}>
                    {reserveProduct.longDescription}
                  </p>

                  {/* Certified Attributes */}
                  <div className={`pt-2 flex flex-wrap gap-6 text-xs font-normal border-t ${
                    isGlass ? 'border-white/10 text-neutral-300' : 'border-neutral-100 text-neutral-600'
                  }`}>
                    <div className="flex items-center gap-2 group">
                      <ShieldCheck className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${isGlass ? 'text-[#D4AF37]' : 'text-neutral-400'}`} />
                      <span>White-Glove Temperature Controlled Dispatch</span>
                    </div>
                    <div className="flex items-center gap-2 group">
                      <Sparkles className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${isGlass ? 'text-[#D4AF37]' : 'text-neutral-400'}`} />
                      <span>Personalized Calligraphy Card Included</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 flex flex-wrap items-center gap-4">
                    <button
                      onClick={handleAdd}
                      className={`interactive-btn px-8 py-3.5 rounded-full text-xs font-medium tracking-[0.14em] uppercase flex items-center gap-2 shadow-sm active:scale-95 ${
                        isAdded
                          ? 'bg-emerald-800 text-white'
                          : isGlass
                            ? 'bg-gradient-to-r from-[#D4AF37] to-[#B78A45] hover:brightness-110 text-[#0A0D0C] font-semibold shadow-[0_4px_25px_rgba(212,175,55,0.4)]'
                            : 'bg-[#171717] hover:bg-neutral-800 text-white'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Basket</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Claim Allocation · {reserveProduct.formattedPrice}</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onQuickView(reserveProduct)}
                      className={`interactive-btn px-6 py-3.5 rounded-full text-xs font-medium uppercase tracking-[0.14em] ${
                        isGlass
                          ? 'glass-pill border-white/20 text-white hover:border-[#D4AF37]'
                          : 'border border-neutral-300 hover:border-neutral-900 text-neutral-800 bg-white'
                      }`}
                    >
                      Quick Inspection
                    </button>
                  </div>

                </div>

              </div>
            </TiltCard>
          </ScrollReveal>
        )}

        {/* Detailed Inclusions Exploration Grid with 3D Tilt */}
        <div className="space-y-10">
          <ScrollReveal distance={16}>
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className={`text-[11px] font-medium tracking-[0.2em] uppercase ${
                isGlass ? 'text-[#D4AF37]' : 'text-neutral-400'
              }`}>
                Provenance & Sourcing
              </span>
              <h3 className={`font-serif text-3xl sm:text-4xl font-normal ${
                isGlass ? 'text-white' : 'text-[#171717]'
              }`}>
                Every Element, Perfectly Considered
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reserveFeatures.map((item, idx) => (
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

        {/* VIP & Bespoke Concierge Section */}
        <ScrollReveal distance={20}>
          <div className={`rounded-3xl p-8 sm:p-12 lg:p-16 border grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
            isGlass
              ? 'glass-panel border-white/20 text-white'
              : 'bg-[#141716] text-white border-neutral-800'
          }`}>
            <div className="lg:col-span-6 space-y-4">
              <span className={`text-[11px] uppercase tracking-[0.22em] font-medium ${
                isGlass ? 'text-[#D4AF37]' : 'text-neutral-400'
              }`}>
                Private Concierge
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
                Bespoke Reserve Inquiries & Corporate Accounts
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                Planning gifting for C-suite executive boards, luxury weddings, or high-net-worth clientele? Our Master Sommelier and gifting curators will formulate private custom allocations.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form onSubmit={handleInquirySubmit} className={`space-y-4 p-6 sm:p-8 rounded-2xl border ${
                isGlass
                  ? 'bg-black/30 backdrop-blur-md border-white/10'
                  : 'bg-neutral-900/90 border-neutral-800'
              }`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={inquiryData.name}
                      onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                      placeholder="E.g. Vikram Singhania"
                      className="w-full bg-black/40 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={inquiryData.email}
                      onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full bg-black/40 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Company / Occasion</label>
                  <input
                    type="text"
                    value={inquiryData.company}
                    onChange={(e) => setInquiryData({ ...inquiryData, company: e.target.value })}
                    placeholder="E.g. Annual Investor Milestone"
                    className="w-full bg-black/40 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Inquiry Details</label>
                  <textarea
                    rows={3}
                    required
                    value={inquiryData.message}
                    onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                    placeholder="Describe your desired quantity, target date, or custom requests..."
                    className="w-full bg-black/40 border border-neutral-700 rounded-xl p-3 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className={`interactive-btn w-full py-3 rounded-full text-xs font-medium uppercase tracking-[0.14em] flex items-center justify-center gap-2 ${
                    isGlass
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B78A45] hover:brightness-110 text-[#0A0D0C] font-semibold shadow-[0_4px_20px_rgba(212,175,55,0.3)]'
                      : 'bg-white hover:bg-neutral-200 text-[#141716]'
                  }`}
                >
                  {inquirySent ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Inquiry Transmitted to Concierge</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Connect with Private Concierge</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
