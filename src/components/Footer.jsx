import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Footer({ onSubscribe, onNavigate }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      if (onSubscribe) onSubscribe(email);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleNav = (page, e) => {
    if (e) e.preventDefault();
    if (onNavigate) onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141716] text-white">
      {/* ─── Premium Dark CTA / Newsletter Section ─── */}
      <ScrollReveal distance={20}>
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-20 lg:py-28 text-center space-y-6">
          <div className="space-y-3">
            <span className="text-[11px] font-medium tracking-[0.22em] text-neutral-400 uppercase">
              Stay Connected
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white">
              A thoughtful experience, in your inbox.
            </h3>
            <p className="text-sm sm:text-base text-neutral-400 max-w-md mx-auto leading-relaxed font-normal">
              Enjoy 10% off your first curation, plus private invitations to seasonal reserve drops.
            </p>
          </div>

        <form onSubmit={handleSubmit} className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full bg-neutral-900/80 border border-neutral-700/80 text-white placeholder:text-neutral-500 px-5 py-3.5 rounded-full text-xs font-normal focus:outline-none focus:border-white transition-colors"
          />
          <button
            type="submit"
            className="w-full sm:w-auto whitespace-nowrap bg-white hover:bg-neutral-200 text-[#141716] px-7 py-3.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 shadow-sm"
          >
            {subscribed ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Subscribed</span>
              </>
            ) : (
              'Subscribe'
            )}
          </button>
        </form>
      </div>
      </ScrollReveal>

      {/* ─── Minimalist Premium Footer ─── */}
      <div className="border-t border-neutral-800/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-500 font-normal">
          
          {/* Brand mark & copyright */}
          <div className="flex items-center gap-4">
            <button 
              onClick={(e) => handleNav('home', e)}
              className="font-serif text-lg text-white font-normal hover:text-neutral-300 transition-colors"
            >
              The Hamper Co.
            </button>
            <span className="text-neutral-600">·</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>

          {/* Clean Navigation Links */}
          <div className="flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-wider text-neutral-400">
            <button onClick={(e) => handleNav('home', e)} className="hover:text-white transition-colors">Home</button>
            <button onClick={(e) => handleNav('collections', e)} className="hover:text-white transition-colors">Collections</button>
            <button onClick={(e) => handleNav('reserve', e)} className="hover:text-white transition-colors">The Reserve</button>
            <button onClick={(e) => handleNav('reviews', e)} className="hover:text-white transition-colors">Reviews</button>
          </div>

        </div>
      </div>
    </footer>
  );
}
