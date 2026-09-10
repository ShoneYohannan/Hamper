import React, { useState } from 'react';
import { Lock, KeyRound, X, Sparkles, AlertCircle } from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { useTheme } from '../../context/ThemeContext';

export default function AdminLoginModal() {
  const { isLoginModalOpen, setIsLoginModalOpen, login } = useCms();
  const { isGlass } = useTheme();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const res = login(pin);
      if (!res.success) {
        setError(res.error || 'Invalid PIN');
        setPin('');
      } else {
        setPin('');
        setError('');
      }
      setIsSubmitting(false);
    }, 200);
  };

  const handleKeypad = (digit) => {
    if (pin.length < 6) {
      setPin(prev => prev + digit);
      setError('');
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center animate-fade-in">
      {/* Backdrop */}
      <div 
        onClick={() => setIsLoginModalOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity" 
      />

      {/* Modal Box */}
      <div className={`relative rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl z-10 border transition-all duration-300 ${
        isGlass
          ? 'glass-panel border-white/20 text-white shadow-[0_20px_60px_rgba(0,0,0,0.8)]'
          : 'bg-[#FAF8F5] border-neutral-200 text-neutral-900 shadow-xl'
      }`}>
        {/* Close Button */}
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className={`absolute top-5 right-5 p-2 rounded-full transition-colors ${
            isGlass ? 'hover:bg-white/10 text-neutral-400 hover:text-white' : 'hover:bg-neutral-200 text-neutral-500'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="text-center space-y-3">
          <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center shadow-lg transition-transform hover:scale-105 ${
            isGlass
              ? 'bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] text-black shadow-[0_0_25px_rgba(212,175,55,0.4)]'
              : 'bg-[#171717] text-[#D4AF37]'
          }`}>
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase font-semibold tracking-[0.2em] text-[#D4AF37]">
              <Sparkles className="w-3 h-3" />
              <span>Atelier Concierge CMS</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal mt-1 tracking-tight">
              Client Portal Login
            </h3>
            <p className={`text-xs mt-1 ${isGlass ? 'text-neutral-300' : 'text-neutral-500'}`}>
              Enter your Atelier security PIN to edit products, prices & images.
            </p>
          </div>
        </div>

        {/* PIN Input & Keypad */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* PIN Dots Display */}
          <div className="flex justify-center items-center gap-3 my-4">
            {[0, 1, 2, 3].map((idx) => {
              const filled = pin.length > idx;
              return (
                <div
                  key={idx}
                  className={`w-4 h-4 rounded-full transition-all duration-200 ${
                    filled
                      ? isGlass
                        ? 'bg-[#D4AF37] scale-110 shadow-[0_0_10px_rgba(212,175,55,0.8)]'
                        : 'bg-[#171717] scale-110'
                      : isGlass
                        ? 'bg-white/10 border border-white/20'
                        : 'bg-neutral-200 border border-neutral-300'
                  }`}
                />
              );
            })}
          </div>

          {error && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400 bg-rose-500/10 py-2 px-3 rounded-lg border border-rose-500/20 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Keypad */}
          <div className="grid grid-cols-3 gap-2.5 max-w-[260px] mx-auto">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                type="button"
                key={num}
                onClick={() => handleKeypad(String(num))}
                className={`h-12 rounded-xl text-lg font-medium transition-all active:scale-95 ${
                  isGlass
                    ? 'bg-white/5 hover:bg-white/15 text-white border border-white/10 hover:border-[#D4AF37]/50'
                    : 'bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200 shadow-sm'
                }`}
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPin('')}
              className={`h-12 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 ${
                isGlass ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => handleKeypad('0')}
              className={`h-12 rounded-xl text-lg font-medium transition-all active:scale-95 ${
                isGlass
                  ? 'bg-white/5 hover:bg-white/15 text-white border border-white/10 hover:border-[#D4AF37]/50'
                  : 'bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200 shadow-sm'
              }`}
            >
              0
            </button>
            <button
              type="button"
              onClick={handleBackspace}
              className={`h-12 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 ${
                isGlass ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Del
            </button>
          </div>

          {/* Unlock Button */}
          <button
            type="submit"
            disabled={pin.length < 4 || isSubmitting}
            className={`w-full py-3.5 rounded-full text-xs font-medium tracking-[0.16em] uppercase transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed ${
              isGlass
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B78A45] hover:brightness-110 text-black font-semibold'
                : 'bg-[#171717] hover:bg-neutral-800 text-white'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>{isSubmitting ? 'Verifying...' : 'Unlock CMS Atelier'}</span>
          </button>


        </form>
      </div>
    </div>
  );
}
