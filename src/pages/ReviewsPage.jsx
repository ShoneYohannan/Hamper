import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import { useTheme } from '../context/ThemeContext';
import { useCms } from '../context/CmsContext';

export default function ReviewsPage() {
  const { isGlass, isPremiumAnim } = useTheme();
  const { testimonials, siteSettings } = useCms();

  const dummyAuthors = ['Pooja K.', 'Vikram S.', 'Ananya R.', 'Rajiv M.', 'Meera & Dev', 'Sunita P.'];
  const activeReviews = (testimonials || []).filter(r => !dummyAuthors.includes(r.author));

  return (
    <div id="reviews" className={`py-20 lg:py-28 scroll-mt-20 transition-colors duration-400 ${
      isGlass ? 'bg-transparent border-t border-white/10' : 'bg-[#FAF8F5] border-t border-black/[0.04]'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        
        {/* Page Header */}
        <ScrollReveal distance={16}>
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className={`text-[11px] font-medium tracking-[0.22em] uppercase ${
              isGlass ? 'text-[#D4AF37]' : 'text-neutral-400'
            }`}>
              {siteSettings?.reviewsBadge || 'Client Words & Reveries'}
            </span>
            <h2 className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight ${
              isGlass ? 'text-white drop-shadow-md' : 'text-[#171717]'
            }`}>
              {siteSettings?.reviewsHeadline || 'Loved by Givers & Receivers'}
            </h2>
            <p className={`text-sm sm:text-base font-normal leading-relaxed ${
              isGlass ? 'text-neutral-300' : 'text-neutral-500'
            }`}>
              {siteSettings?.reviewsSubtitle || 'Unfiltered stories from patrons who have gifted Dazzling Hampers for newborn arrivals, private reserves, and milestone celebrations.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Rating Metrics Scoreboard with Interactive 3D Tilt */}
        <ScrollReveal delay={100} distance={16}>
          <TiltCard maxTilt={isPremiumAnim ? 3 : 0} className="max-w-4xl mx-auto">
            <div className={`rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x transition-smooth ${
              isGlass
                ? 'glass-panel border-white/15 divide-white/10 text-white hover:border-[#D4AF37]/30'
                : 'bg-white border border-neutral-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.02)] divide-neutral-100 hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)]'
            }`}>
              <div className="space-y-1 pt-2 sm:pt-0">
                <div className={`font-serif text-4xl font-normal ${isGlass ? 'text-[#F3E5AB]' : 'text-neutral-900'}`}>5.0 ★</div>
                <p className={`text-xs uppercase tracking-wider font-medium ${isGlass ? 'text-neutral-300' : 'text-neutral-400'}`}>Average Patron Rating</p>
              </div>
              <div className="space-y-1 pt-4 sm:pt-0">
                <div className={`font-serif text-4xl font-normal ${isGlass ? 'text-[#F3E5AB]' : 'text-neutral-900'}`}>100%</div>
                <p className={`text-xs uppercase tracking-wider font-medium ${isGlass ? 'text-neutral-300' : 'text-neutral-400'}`}>Mint Condition Arrival</p>
              </div>
              <div className="space-y-1 pt-4 sm:pt-0">
                <div className={`font-serif text-4xl font-normal ${isGlass ? 'text-[#F3E5AB]' : 'text-neutral-900'}`}>2,400+</div>
                <p className={`text-xs uppercase tracking-wider font-medium ${isGlass ? 'text-neutral-300' : 'text-neutral-400'}`}>Delivered across India, UAE & Qatar</p>
              </div>
            </div>
          </TiltCard>
        </ScrollReveal>

        {/* Reviews Multi-Column Grid with 3D TiltCards */}
        <div className={`grid grid-cols-1 ${activeReviews.length <= 2 ? 'md:grid-cols-2 max-w-5xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
          {activeReviews.map((item, index) => (
            <ScrollReveal key={item.id} delay={(index % 3) * 80} distance={18} className="h-full">
              <TiltCard maxTilt={isPremiumAnim ? 6 : 0} className="h-full">
                <div
                  className={`review-card-interactive rounded-2xl p-7 flex flex-col justify-between space-y-6 transition-smooth h-full ${
                    isGlass
                      ? 'glass-panel glass-panel-hover text-white'
                      : 'bg-white border border-neutral-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-neutral-300 hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)]'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header Row: Stars and Verified Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5">
                        {[...Array(item.stars || 5)].map((_, i) => (
                          <Star key={i} className={`star-icon w-3.5 h-3.5 ${isGlass ? 'fill-[#D4AF37] text-[#D4AF37]' : 'fill-[#171717] text-[#171717]'}`} />
                        ))}
                      </div>

                      <span className={`inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full font-medium ${
                        isGlass 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' 
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>WhatsApp Verified</span>
                      </span>
                    </div>

                    {/* Quote Text */}
                    <p className={`font-serif text-lg sm:text-xl font-normal leading-relaxed ${
                      isGlass ? 'text-white' : 'text-[#171717]'
                    }`}>
                      {item.quote}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </div>
  );
}
