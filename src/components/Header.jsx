import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, Sparkles, Gift } from 'lucide-react';

export default function Header({ cartCount, onOpenCart, onOpenSearch, onOpenBuilder }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-black/[0.06] transition-all duration-300">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        
        {/* Brand Logo - Minimal, Elegant Editorial on the Left */}
        <a href="#" className="flex items-center gap-3.5 group flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-[#171717] text-white flex items-center justify-center font-serif text-base tracking-wider shadow-sm transition-transform duration-300 group-hover:scale-105">
            H
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-tight text-[#171717] transition-colors block leading-tight font-normal">
              The Hamper Co.
            </span>
            <span className="text-[9px] tracking-[0.25em] text-[#737373] uppercase font-medium block">
              Haute Gifting Atelier
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links - Clean, Spacious, Minimal */}
        <nav className="hidden md:flex items-center space-x-9">
          <a 
            href="#collections" 
            className="text-xs uppercase tracking-[0.14em] font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Collections
          </a>
          <a 
            href="#featured-luxury" 
            className="text-xs uppercase tracking-[0.14em] font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            The Reserve
          </a>
          <a 
            href="#how-it-works" 
            className="text-xs uppercase tracking-[0.14em] font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Atelier Process
          </a>
          <a 
            href="#testimonials" 
            className="text-xs uppercase tracking-[0.14em] font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Reviews
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
          <button
            onClick={onOpenSearch}
            className="p-2.5 text-neutral-700 hover:text-neutral-950 transition-colors rounded-full hover:bg-black/5"
            aria-label="Search hampers"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenBuilder}
            className="hidden sm:inline-flex items-center gap-2 bg-transparent hover:bg-neutral-900 hover:text-white text-neutral-800 border border-neutral-300 hover:border-neutral-900 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300"
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Custom Curation</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#171717] hover:bg-neutral-800 text-white px-4 py-2.5 rounded-full font-medium text-xs tracking-wider uppercase transition-all duration-300 active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag ({cartCount})</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-neutral-950 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-black/[0.06] px-6 py-6 space-y-4 shadow-sm animate-in slide-in-from-top-4 duration-200">
          <a 
            href="#collections" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-wider font-medium text-neutral-700 hover:text-neutral-950"
          >
            Collections
          </a>
          <a 
            href="#featured-luxury" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-wider font-medium text-neutral-700 hover:text-neutral-950"
          >
            The Reserve (Flagship)
          </a>
          <a 
            href="#how-it-works" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-wider font-medium text-neutral-700 hover:text-neutral-950"
          >
            The Atelier Process
          </a>
          <a 
            href="#testimonials" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm uppercase tracking-wider font-medium text-neutral-700 hover:text-neutral-950"
          >
            Reviews
          </a>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenBuilder(); }}
            className="w-full text-center bg-[#171717] text-white py-3 rounded-full font-medium text-xs tracking-widest uppercase mt-2"
          >
            Start Custom Curation
          </button>
        </div>
      )}
    </header>
  );
}


