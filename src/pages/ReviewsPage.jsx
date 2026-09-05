import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { testimonials } from '../data/products';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import { useTheme } from '../context/ThemeContext';

export default function ReviewsPage() {
  const { isGlass, isPremiumAnim } = useTheme();
  const [selectedOccasion, setSelectedOccasion] = useState('all');
  const [reviewsList, setReviewsList] = useState(testimonials);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [newReview, setNewReview] = useState({ author: '', location: '', hamper: '', quote: '', rating: '5' });
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const occasionFilters = [
    { id: 'all', label: 'All Stories' },
    { id: 'baby', label: 'Newborn Keepsakes' },
    { id: 'reserve', label: 'The Reserve' },
    { id: 'corporate', label: 'Corporate Gifting' },
    { id: 'festive', label: 'Festive & Pantry' }
  ];

  const filteredReviews = selectedOccasion === 'all'
    ? reviewsList
    : reviewsList.filter(r => r.occasion === selectedOccasion);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.author && newReview.quote) {
      const added = {
        id: Date.now(),
        rating: `${newReview.rating} / 5`,
        stars: Number(newReview.rating),
        quote: `“${newReview.quote}”`,
        author: newReview.author,
        location: newReview.location || 'India',
        occasion: 'reserve',
        occasionLabel: 'Verified Patron',
        hamper: newReview.hamper || 'Curated Hamper',
        date: 'Just now'
      };
      setReviewsList([added, ...reviewsList]);
      setSubmittedSuccess(true);
      setTimeout(() => {
        setSubmittedSuccess(false);
        setShowSubmitModal(false);
        setNewReview({ author: '', location: '', hamper: '', quote: '', rating: '5' });
      }, 2000);
    }
  };

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
              Client Words & Reveries
            </span>
            <h2 className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight ${
              isGlass ? 'text-white drop-shadow-md' : 'text-[#171717]'
            }`}>
              Loved by Givers & Receivers
            </h2>
            <p className={`text-sm sm:text-base font-normal leading-relaxed ${
              isGlass ? 'text-neutral-300' : 'text-neutral-500'
            }`}>
              Unfiltered stories from patrons who have gifted The Hamper Co. for newborn arrivals, private reserves, and milestone celebrations.
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
                <p className={`text-xs uppercase tracking-wider font-medium ${isGlass ? 'text-neutral-300' : 'text-neutral-400'}`}>Delivered Nationwide</p>
              </div>
            </div>
          </TiltCard>
        </ScrollReveal>

        {/* Filter Pills and Write Review Button */}
        <ScrollReveal delay={150} distance={12}>
          <div className={`flex flex-col sm:flex-row items-center justify-between gap-6 border-b pb-6 ${
            isGlass ? 'border-white/10' : 'border-black/[0.04]'
          }`}>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              {occasionFilters.map((tab) => {
                const isActive = selectedOccasion === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedOccasion(tab.id)}
                    className={`interactive-btn px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-smooth ${
                      isGlass
                        ? isActive
                          ? 'glass-pill-active'
                          : 'glass-pill'
                        : isActive
                          ? 'bg-[#171717] text-white border border-[#171717] shadow-sm'
                          : 'bg-white text-neutral-600 border border-neutral-200/90 hover:border-neutral-400 hover:text-neutral-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              className={`interactive-btn inline-flex items-center gap-2 px-6 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all shadow-sm shrink-0 ${
                isGlass
                  ? 'glass-pill border-white/20 text-white hover:border-[#D4AF37]'
                  : 'bg-white border border-neutral-300 hover:border-neutral-900 text-neutral-800 hover:text-black'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Share Your Story</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Reviews Multi-Column Grid with 3D TiltCards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReviews.map((item, index) => (
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
                    {/* Header Row: Stars and Occasion Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5">
                        {[...Array(item.stars || 5)].map((_, i) => (
                          <Star key={i} className={`star-icon w-3.5 h-3.5 ${isGlass ? 'fill-[#D4AF37] text-[#D4AF37]' : 'fill-[#171717] text-[#171717]'}`} />
                        ))}
                      </div>

                      {item.occasionLabel && (
                        <span className={`text-[10px] tracking-wider uppercase font-medium px-2.5 py-1 rounded-full ${
                          isGlass ? 'bg-white/10 text-[#F3E5AB] border border-white/10' : 'bg-neutral-100 text-neutral-600'
                        }`}>
                          {item.occasionLabel}
                        </span>
                      )}
                    </div>

                    {/* Quote Text */}
                    <p className={`font-serif text-lg font-normal leading-relaxed ${
                      isGlass ? 'text-white' : 'text-[#171717]'
                    }`}>
                      {item.quote}
                    </p>
                  </div>

                  {/* Author, Hamper & Date Footer */}
                  <div className={`pt-4 border-t space-y-1.5 text-xs font-normal ${
                    isGlass ? 'border-white/10 text-neutral-300' : 'border-neutral-100 text-neutral-500'
                  }`}>
                    <div className={`flex items-center justify-between font-medium ${
                      isGlass ? 'text-white' : 'text-neutral-800'
                    }`}>
                      <span>{item.author}</span>
                      <span className={`uppercase font-normal ${isGlass ? 'text-neutral-400' : 'text-neutral-400'}`}>{item.location}</span>
                    </div>
                    {item.hamper && (
                      <p className={`text-[11px] italic line-clamp-1 ${isGlass ? 'text-[#D4AF37]/80' : 'text-neutral-400'}`}>
                        {item.hamper} · {item.date || 'Verified Patron'}
                      </p>
                    )}
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

      </div>

      {/* Share Review Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div 
            onClick={() => setShowSubmitModal(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
          />
          <div className={`relative rounded-3xl p-8 max-w-lg w-full z-10 animate-fade-in space-y-5 ${
            isGlass
              ? 'glass-panel border-white/20 text-white shadow-2xl'
              : 'bg-white border border-neutral-200/80 shadow-2xl'
          }`}>
            <h3 className={`font-serif text-2xl font-normal ${isGlass ? 'text-white' : 'text-neutral-900'}`}>
              Share Your Gifting Story
            </h3>
            <p className={`text-xs leading-relaxed font-normal ${isGlass ? 'text-neutral-300' : 'text-neutral-500'}`}>
              Tell us how the hamper was received and the feeling it brought to the occasion.
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReview.author}
                    onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                    placeholder="E.g. Priya M."
                    className={`w-full rounded-xl px-4 py-2 text-xs focus:outline-none ${
                      isGlass
                        ? 'bg-black/30 border border-white/20 text-white focus:border-[#D4AF37]'
                        : 'bg-neutral-50 border border-neutral-200 text-neutral-900 focus:border-neutral-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Your City</label>
                  <input
                    type="text"
                    value={newReview.location}
                    onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                    placeholder="E.g. Pune"
                    className={`w-full rounded-xl px-4 py-2 text-xs focus:outline-none ${
                      isGlass
                        ? 'bg-black/30 border border-white/20 text-white focus:border-[#D4AF37]'
                        : 'bg-neutral-50 border border-neutral-200 text-neutral-900 focus:border-neutral-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Hamper Ordered</label>
                <input
                  type="text"
                  value={newReview.hamper}
                  onChange={(e) => setNewReview({ ...newReview, hamper: e.target.value })}
                  placeholder="E.g. The Royal Reserve or Baby Girl Hamper"
                  className={`w-full rounded-xl px-4 py-2 text-xs focus:outline-none ${
                    isGlass
                      ? 'bg-black/30 border border-white/20 text-white focus:border-[#D4AF37]'
                      : 'bg-neutral-50 border border-neutral-200 text-neutral-900 focus:border-neutral-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Rating</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                  className={`w-full rounded-xl px-3 py-2 text-xs focus:outline-none ${
                    isGlass
                      ? 'bg-[#121816] border border-white/20 text-white'
                      : 'bg-neutral-50 border border-neutral-200 text-neutral-800'
                  }`}
                >
                  <option value="5" className={isGlass ? 'bg-[#121816]' : ''}>★★★★★ (5 / 5 Exceptional)</option>
                  <option value="4" className={isGlass ? 'bg-[#121816]' : ''}>★★★★☆ (4 / 5 Very Pleased)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Your Review</label>
                <textarea
                  rows={3}
                  required
                  value={newReview.quote}
                  onChange={(e) => setNewReview({ ...newReview, quote: e.target.value })}
                  placeholder="Describe the packaging, unboxing reaction, and details..."
                  className={`w-full rounded-xl p-3 text-xs focus:outline-none ${
                    isGlass
                      ? 'bg-black/30 border border-white/20 text-white focus:border-[#D4AF37]'
                      : 'bg-neutral-50 border border-neutral-200 text-neutral-900 focus:border-neutral-900'
                  }`}
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className={`px-5 py-2 rounded-full text-xs font-medium ${
                    isGlass
                      ? 'border border-white/20 text-neutral-300 hover:bg-white/10'
                      : 'border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`interactive-btn px-6 py-2 rounded-full text-xs font-medium uppercase tracking-wider flex items-center gap-1.5 ${
                    isGlass
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B78A45] hover:brightness-110 text-[#0A0D0C] font-semibold shadow-[0_2px_12px_rgba(212,175,55,0.4)]'
                      : 'bg-[#171717] hover:bg-neutral-800 text-white'
                  }`}
                >
                  {submittedSuccess ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Submitted!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Post Review</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
