import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { testimonials } from '../data/products';
import ScrollReveal from '../components/ScrollReveal';

export default function ReviewsPage() {
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
    <div id="reviews" className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-black/[0.04] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        
        {/* Page Header */}
        <ScrollReveal distance={16}>
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] font-medium tracking-[0.22em] text-neutral-400 uppercase">
              Client Words & Reveries
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171717] tracking-tight">
              Loved by Givers & Receivers
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed">
              Unfiltered stories from patrons who have gifted The Hamper Co. for newborn arrivals, private reserves, and milestone celebrations.
            </p>
          </div>
        </ScrollReveal>

        {/* Rating Metrics Scoreboard */}
        <ScrollReveal delay={100} distance={16}>
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 border border-neutral-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.02)] grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-neutral-100">
            <div className="space-y-1 pt-2 sm:pt-0">
              <div className="font-serif text-4xl font-normal text-neutral-900">5.0 ★</div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider font-medium">Average Patron Rating</p>
            </div>
            <div className="space-y-1 pt-4 sm:pt-0">
              <div className="font-serif text-4xl font-normal text-neutral-900">100%</div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider font-medium">Mint Condition Arrival</p>
            </div>
            <div className="space-y-1 pt-4 sm:pt-0">
              <div className="font-serif text-4xl font-normal text-neutral-900">2,400+</div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider font-medium">Delivered Nationwide</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Filter Pills and Write Review Button */}
        <ScrollReveal delay={150} distance={12}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-black/[0.04] pb-6">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
              {occasionFilters.map((tab) => {
                const isActive = selectedOccasion === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedOccasion(tab.id)}
                    className={`px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-smooth ${
                      isActive
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
              className="inline-flex items-center gap-2 bg-white border border-neutral-300 hover:border-neutral-900 text-neutral-800 hover:text-black px-6 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all shadow-sm shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Share Your Story</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Reviews Multi-Column Grid with Smooth Scale Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredReviews.map((item, index) => (
            <ScrollReveal key={item.id} delay={(index % 3) * 80} distance={18} className="h-full">
              <div
                className="bg-white rounded-2xl p-7 border border-neutral-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-6 hover:border-neutral-300 transition-smooth h-full"
              >
                <div className="space-y-4">
                  {/* Header Row: Stars and Occasion Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5">
                      {[...Array(item.stars || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#171717] text-[#171717]" />
                      ))}
                    </div>

                    {item.occasionLabel && (
                      <span className="text-[10px] tracking-wider uppercase font-medium px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600">
                        {item.occasionLabel}
                      </span>
                    )}
                  </div>

                  {/* Quote Text */}
                  <p className="font-serif text-lg text-[#171717] font-normal leading-relaxed">
                    {item.quote}
                  </p>
                </div>

                {/* Author, Hamper & Date Footer */}
                <div className="pt-4 border-t border-neutral-100 space-y-1.5 text-xs text-neutral-500 font-normal">
                  <div className="flex items-center justify-between text-neutral-800 font-medium">
                    <span>{item.author}</span>
                    <span className="text-neutral-400 uppercase font-normal">{item.location}</span>
                  </div>
                  {item.hamper && (
                    <p className="text-[11px] text-neutral-400 italic line-clamp-1">
                      {item.hamper} · {item.date || 'Verified Patron'}
                    </p>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>

      {/* Share Review Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div 
            onClick={() => setShowSubmitModal(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
          />
          <div className="relative bg-white rounded-3xl p-8 max-w-lg w-full border border-neutral-200/80 shadow-2xl z-10 animate-fade-in space-y-5">
            <h3 className="font-serif text-2xl font-normal text-neutral-900">
              Share Your Gifting Story
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed font-normal">
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
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Your City</label>
                  <input
                    type="text"
                    value={newReview.location}
                    onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                    placeholder="E.g. Pune"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
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
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">Rating</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-none"
                >
                  <option value="5">★★★★★ (5 / 5 Exceptional)</option>
                  <option value="4">★★★★☆ (4 / 5 Very Pleased)</option>
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
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-3 text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-5 py-2 rounded-full border border-neutral-200 text-xs font-medium text-neutral-600 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#171717] hover:bg-neutral-800 text-white px-6 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-1.5"
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
