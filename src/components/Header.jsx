import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, Gift } from 'lucide-react';

export default function Header({ 
  cartCount, 
  onOpenCart, 
  onOpenSearch, 
  onOpenBuilder,
  currentPage = 'home',
  onNavigate
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'collections', label: 'Collections' },
    { id: 'reserve', label: 'The Reserve' },
    { id: 'reviews', label: 'Reviews' }
  ];

  const handleNavClick = (pageId, e) => {
    if (e) e.preventDefault();
    if (onNavigate) onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-black/[0.06] transition-all duration-300">
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        
        {/* Brand Logo - Navigates Home */}
        <button 
          onClick={(e) => handleNavClick('home', e)}
          className="flex items-center gap-3.5 group flex-shrink-0 text-left focus:outline-none"
        >
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
        </button>

        {/* Desktop Navigation Links - Active States with Clean Understated Styling */}
        <nav className="hidden md:flex items-center space-x-9">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(item.id, e)}
                className={`text-xs uppercase tracking-[0.14em] transition-all relative py-1 focus:outline-none ${
                  isActive
                    ? 'text-neutral-900 font-semibold'
                    : 'text-neutral-500 hover:text-neutral-900 font-medium'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#171717] rounded-full animate-fade-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
          <button
            onClick={onOpenSearch}
            className="p-2.5 text-neutral-700 hover:text-neutral-950 transition-colors rounded-full hover:bg-black/5 focus:outline-none"
            aria-label="Search hampers"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenBuilder}
            className="hidden sm:inline-flex items-center gap-2 bg-transparent hover:bg-neutral-900 hover:text-white text-neutral-800 border border-neutral-300 hover:border-neutral-900 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 active:scale-95"
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Custom Curation</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-[#171717] hover:bg-neutral-800 text-white px-4 py-2.5 rounded-full font-medium text-xs tracking-wider uppercase transition-all duration-300 active:scale-95 shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag ({cartCount})</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-neutral-950 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-black/[0.06] px-6 py-6 space-y-3 shadow-sm animate-fade-in">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(item.id, e)}
                className={`block w-full text-left py-2 text-sm uppercase tracking-wider transition-colors ${
                  isActive ? 'text-neutral-950 font-semibold pl-2 border-l-2 border-[#171717]' : 'text-neutral-600 hover:text-neutral-950'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenBuilder(); }}
            className="w-full text-center bg-[#171717] text-white py-3 rounded-full font-medium text-xs tracking-widest uppercase mt-4 shadow-sm"
          >
            Start Custom Curation
          </button>
        </div>
      )}
    </header>
  );
}
