import React, { useState } from 'react';
import { ShoppingBag, Check, ShieldCheck, CheckCircle2, Sparkles, Send, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import ScrollReveal from '../components/ScrollReveal';

export default function ReservePage({ onAddToCart, onQuickView }) {
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
    <div id="reserve" className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-black/[0.04] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-20">
        
        {/* Page Hero Header */}
        <ScrollReveal distance={16}>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-medium tracking-[0.25em] text-neutral-400 uppercase">
              Private Vault & Allocation
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#171717] tracking-tight leading-[1.08]">
              The Reserve
            </h1>
            <p className="text-base sm:text-lg text-neutral-500 font-normal leading-relaxed max-w-xl mx-auto">
              Our highest expression of luxury gifting. Individually assembled in limited batches for patrons seeking unmatched prestige.
            </p>
          </div>
        </ScrollReveal>

        {/* Flagship Product Showcase Card */}
        {reserveProduct && (
          <ScrollReveal delay={100} distance={20}>
            <div className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-neutral-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.02)] grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Grand Photography */}
              <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 group">
                <img
                  src={reserveProduct.image}
                  alt={reserveProduct.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] tracking-widest uppercase font-medium px-3.5 py-1.5 rounded-full bg-white/95 text-neutral-800 shadow-sm">
                    Limited Batch Allocation
                  </span>
                </div>
              </div>

              {/* Editorial Information */}
              <div className="lg:col-span-6 space-y-7">
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.22em] font-medium text-neutral-400">
                    Haute Curation 01
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717] leading-tight">
                    {reserveProduct.name}
                  </h2>
                  <p className="text-2xl font-normal text-neutral-900 pt-1">
                    {reserveProduct.formattedPrice}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-neutral-500 leading-relaxed font-normal">
                  {reserveProduct.longDescription}
                </p>

                {/* Certified Attributes */}
                <div className="pt-2 flex flex-wrap gap-6 text-xs text-neutral-600 font-normal border-t border-neutral-100">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-neutral-400" />
                    <span>White-Glove Temperature Controlled Dispatch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-neutral-400" />
                    <span>Personalized Calligraphy Card Included</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <button
                    onClick={handleAdd}
                    className={`px-8 py-3.5 rounded-full text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 flex items-center gap-2 shadow-sm active:scale-95 ${
                      isAdded
                        ? 'bg-emerald-800 text-white'
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
                    className="px-6 py-3.5 rounded-full border border-neutral-300 hover:border-neutral-900 text-xs font-medium uppercase tracking-[0.14em] text-neutral-800 transition-all bg-white"
                  >
                    Quick Inspection
                  </button>
                </div>

              </div>

            </div>
          </ScrollReveal>
        )}

        {/* Detailed Inclusions Exploration Grid */}
        <div className="space-y-10">
          <ScrollReveal distance={16}>
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-[11px] font-medium tracking-[0.2em] text-neutral-400 uppercase">
                Provenance & Sourcing
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#171717]">
                Every Element, Perfectly Considered
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reserveFeatures.map((item, idx) => (
              <ScrollReveal key={idx} delay={(idx % 3) * 80} distance={18}>
                <div
                  className="bg-white rounded-2xl p-7 border border-neutral-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-3"
                >
                  <span className="text-xs font-serif text-neutral-400 font-normal">
                    0{idx + 1}
                  </span>
                  <h4 className="font-serif text-xl font-normal text-[#171717]">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* VIP & Bespoke Concierge Section */}
        <ScrollReveal distance={20}>
          <div className="bg-[#141716] text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-neutral-800 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[11px] uppercase tracking-[0.22em] font-medium text-neutral-400">
                Private Concierge
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
                Bespoke Reserve Inquiries & Corporate Accounts
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                Planning gifting for C-suite executive boards, luxury weddings, or high-net-worth clientele? Our Master Sommelier and gifting curators will formulate private custom allocations.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form onSubmit={handleInquirySubmit} className="space-y-4 bg-neutral-900/90 p-6 sm:p-8 rounded-2xl border border-neutral-800">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={inquiryData.name}
                      onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                      placeholder="E.g. Vikram Singhania"
                      className="w-full bg-black/40 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-white"
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
                      className="w-full bg-black/40 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-white"
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
                    className="w-full bg-black/40 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-white"
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
                    className="w-full bg-black/40 border border-neutral-700 rounded-xl p-3 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white hover:bg-neutral-200 text-[#141716] py-3 rounded-full text-xs font-medium uppercase tracking-[0.14em] transition-all flex items-center justify-center gap-2"
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
