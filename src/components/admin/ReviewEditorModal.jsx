import React, { useState, useEffect } from 'react';
import { X, Star, Check, Trash2 } from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { useTheme } from '../../context/ThemeContext';


export default function ReviewEditorModal({ isOpen, onClose, reviewToEdit = null }) {
  const { addTestimonial, updateTestimonial, deleteTestimonial, products, reserveProducts } = useCms();
  const { isGlass } = useTheme();

  const allHampers = [...products, ...reserveProducts];
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const [formData, setFormData] = useState({
    author: '',
    location: 'Dubai, UAE',
    occasion: 'reserve',
    occasionLabel: 'Bespoke Milestone',
    hamper: '',
    stars: 5,
    quote: '',
    date: new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date())
  });

  useEffect(() => {
    if (reviewToEdit) {
      setFormData({
        author: reviewToEdit.author || '',
        location: reviewToEdit.location || 'Dubai, UAE',
        occasion: reviewToEdit.occasion || 'reserve',
        occasionLabel: reviewToEdit.occasionLabel || 'Bespoke Milestone',
        hamper: reviewToEdit.hamper || (allHampers[0]?.name || 'Luxury Hamper'),
        stars: reviewToEdit.stars || 5,
        quote: reviewToEdit.quote || '',
        date: reviewToEdit.date || new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date())
      });
    } else {
      setFormData({
        author: '',
        location: 'Dubai, UAE',
        occasion: 'reserve',
        occasionLabel: 'Celebration Milestone',
        hamper: allHampers[0]?.name || 'Grand Luxe Heart & Illuminated Acrylic Reserve Hamper',
        stars: 5,
        quote: '',
        date: new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date())
      });
    }
    setIsConfirmingDelete(false);
  }, [reviewToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.author.trim() || !formData.quote.trim()) {
      alert('Please provide author name and testimonial review text.');
      return;
    }

    if (reviewToEdit) {
      updateTestimonial(reviewToEdit.id, formData);
    } else {
      addTestimonial(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center animate-fade-in">
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity" 
      />

      <div className={`relative rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl z-10 border transition-all ${
        isGlass ? 'glass-panel border-white/20 text-white' : 'bg-[#FAF8F5] border-neutral-200 text-neutral-900'
      }`}>
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 p-2 rounded-full transition-colors ${
            isGlass ? 'hover:bg-white/10 text-neutral-400 hover:text-white' : 'hover:bg-neutral-200 text-neutral-500'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isGlass ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-neutral-900 text-white'
          }`}>
            <Star className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-normal">
              {reviewToEdit ? 'Edit Patron Review' : 'Add Client Review'}
            </h3>
            <p className={`text-xs ${isGlass ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Feature real customer feedback on the website
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Client Name / Initials *
            </label>
            <input
              type="text"
              required
              value={formData.author}
              onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
              placeholder="e.g. Fatima A. or Dr. Sarah Jenkins"
              className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none ${
                isGlass 
                  ? 'bg-white/5 border-white/10 focus:border-[#D4AF37] text-white' 
                  : 'bg-white border-neutral-200 focus:border-neutral-900 text-neutral-900'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="e.g. Dubai, Abu Dhabi, Mumbai"
                className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none ${
                  isGlass 
                    ? 'bg-white/5 border-white/10 focus:border-[#D4AF37] text-white' 
                    : 'bg-white border-neutral-200 focus:border-neutral-900 text-neutral-900'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Star Rating
              </label>
              <div className="flex items-center gap-1.5 pt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, stars: star }))}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star className={`w-5 h-5 ${
                      star <= formData.stars 
                        ? 'text-[#D4AF37] fill-[#D4AF37]' 
                        : 'text-neutral-600'
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Occasion / Tag
            </label>
            <input
              type="text"
              value={formData.occasionLabel}
              onChange={(e) => setFormData(prev => ({ ...prev, occasionLabel: e.target.value }))}
              placeholder="e.g. Anniversary Surprise, Baby Shower, Festive Gift"
              className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none ${
                isGlass 
                  ? 'bg-white/5 border-white/10 focus:border-[#D4AF37] text-white' 
                  : 'bg-white border-neutral-200 focus:border-neutral-900 text-neutral-900'
              }`}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Associated Hamper
            </label>
            <input
              type="text"
              value={formData.hamper}
              onChange={(e) => setFormData(prev => ({ ...prev, hamper: e.target.value }))}
              placeholder="e.g. Grand Luxe Heart & Illuminated Acrylic Reserve Hamper"
              className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none ${
                isGlass 
                  ? 'bg-white/5 border-white/10 focus:border-[#D4AF37] text-white' 
                  : 'bg-white border-neutral-200 focus:border-neutral-900 text-neutral-900'
              }`}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Review Quote *
            </label>
            <textarea
              required
              rows={3}
              value={formData.quote}
              onChange={(e) => setFormData(prev => ({ ...prev, quote: e.target.value }))}
              placeholder="“The hamper exceeded all expectations...”"
              className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none ${
                isGlass 
                  ? 'bg-white/5 border-white/10 focus:border-[#D4AF37] text-white' 
                  : 'bg-white border-neutral-200 focus:border-neutral-900 text-neutral-900'
              }`}
            />
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            {reviewToEdit ? (
              isConfirmingDelete ? (
                <div className="flex items-center gap-2 animate-fade-in">
                  <span className="text-xs text-rose-400 font-medium">Delete review?</span>
                  <button
                    type="button"
                    onClick={() => {
                      deleteTestimonial(reviewToEdit.id);
                      setIsConfirmingDelete(false);
                      onClose();
                    }}
                    className="px-3 py-1 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow transition-all"
                  >
                    Yes, Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsConfirmingDelete(false)}
                    className="px-2 py-1 rounded-xl text-xs text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsConfirmingDelete(true)}
                  className="px-3.5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-rose-400 hover:text-white hover:bg-rose-500/20 border border-rose-500/30 flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Review</span>
                </button>
              )
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase ${
                  isGlass ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg ${
                  isGlass
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#B78A45] hover:brightness-110 text-black'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>{reviewToEdit ? 'Update Review' : 'Add Review'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
