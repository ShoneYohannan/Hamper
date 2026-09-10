import React from 'react';

const BASE = import.meta.env.BASE_URL || '/';

export default function Footer({ onNavigate }) {
  const handleNav = (page, e) => {
    if (e) e.preventDefault();
    if (onNavigate) onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0d0213] text-white">
      {/* ─── Minimalist Premium Footer ─── */}
      <div>
        <div className="max-w-[1720px] mx-auto px-6 sm:px-8 lg:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-500 font-normal">
          
          {/* Brand mark & copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D4AF37]/50 bg-[#340b49] shrink-0">
                <img src={`${BASE}images/logo.png`} alt="Dazzling Hampers" className="w-full h-full object-cover" />
              </div>
              <button 
                onClick={(e) => handleNav('home', e)}
                className="font-serif text-lg text-white font-normal hover:text-[#D4AF37] transition-colors"
              >
                Dazzling Hampers
              </button>
            </div>
            <span className="hidden sm:inline text-neutral-600">·</span>
            <span className="text-[#F3E5AB]/90 font-medium tracking-wide">Delivering across India · UAE · Qatar</span>
            <span className="hidden sm:inline text-neutral-600">·</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>

          {/* Clean Navigation Links */}
          <div className="flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-wider text-neutral-400">
            <button onClick={(e) => handleNav('home', e)} className="hover:text-white transition-colors">Home</button>
            <button onClick={(e) => handleNav('budget', e)} className="hover:text-white transition-colors">Budget Friendly</button>
            <button onClick={(e) => handleNav('collections', e)} className="hover:text-white transition-colors">Collections</button>
            <button onClick={(e) => handleNav('reserve', e)} className="hover:text-white transition-colors">The Reserve</button>
            <button onClick={(e) => handleNav('reviews', e)} className="hover:text-white transition-colors">Reviews</button>
          </div>

        </div>
      </div>
    </footer>
  );
}

