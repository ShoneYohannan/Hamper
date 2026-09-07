import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Gift } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { useTheme } from '../context/ThemeContext';

const BASE = import.meta.env.BASE_URL || '/';

export default function Header({ 
  cartCount, 
  onOpenCart, 
  onOpenCustomWhatsApp,
  onOpenBuilder,
  currentPage = 'home',
  onNavigate
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isGlass } = useTheme();

  const handleCustomCuration = () => {
    if (onOpenCustomWhatsApp) {
      onOpenCustomWhatsApp();
    } else if (onOpenBuilder) {
      onOpenBuilder();
    } else {
      const phone = '971501487453';
      const msg = encodeURIComponent('Hello Dazzling Hampers! I would like to inquire about a custom hamper curation tailored for my special occasion.');
      window.open(`https://wa.me/${phone}?text=${msg}`, '_blank', 'noopener,noreferrer');
    }
  };

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
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      isGlass 
        ? 'glass-header' 
        : 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-black/[0.06]'
    }`}>
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 h-18 sm:h-22 flex items-center justify-between gap-3 lg:gap-8">
        
        {/* Brand Logo - Navigates Home */}
        <button 
          onClick={(e) => handleNavClick('home', e)}
          className="flex items-center gap-2.5 sm:gap-3.5 group flex-shrink-0 text-left focus:outline-none"
        >
          {/* Circular Luxury Medallion Logo */}
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden p-0.5 flex items-center justify-center transition-all duration-500 group-hover:scale-105 shrink-0 ${
            isGlass
              ? 'bg-gradient-to-tr from-[#B78A45] via-[#F3E5AB] to-[#4a0e4e] shadow-[0_0_20px_rgba(212,175,55,0.4)] border border-[#D4AF37]/50'
              : 'bg-[#171717] border border-neutral-300 shadow-sm'
          }`}>
            <img 
              src={`${BASE}images/logo.png`} 
              alt="Dazzling Hampers" 
              className="w-full h-full object-cover rounded-full bg-[#340b49]"
            />
          </div>

          <div className="flex flex-col">
            <span className={`font-serif text-lg sm:text-2xl md:text-[25px] tracking-tight transition-colors block leading-tight font-normal whitespace-nowrap ${
              isGlass ? 'text-white group-hover:text-[#F3E5AB]' : 'text-[#171717] group-hover:text-neutral-700'
            }`}>
              Dazzling Hampers
            </span>
            <span className={`text-[7.5px] sm:text-[9px] tracking-[0.22em] uppercase font-medium block whitespace-nowrap ${
              isGlass ? 'text-[#D4AF37]' : 'text-[#737373]'
            }`}>
              Haute Gifting Atelier
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-9 flex-shrink-0">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(item.id, e)}
                className={`text-xs uppercase tracking-[0.15em] transition-all relative py-1 focus:outline-none whitespace-nowrap ${
                  isActive
                    ? isGlass ? 'text-white font-semibold' : 'text-neutral-900 font-semibold'
                    : isGlass ? 'text-neutral-400 hover:text-white font-medium' : 'text-neutral-500 hover:text-neutral-900 font-medium'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className={`absolute -bottom-1 left-0 right-0 h-[2px] rounded-full animate-fade-in transition-all duration-300 ${
                    isGlass ? 'bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.9)]' : 'bg-[#171717]'
                  }`} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: WhatsApp Custom Curation & Cart */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          
          {/* Custom Curation -> WhatsApp (Shows on tablet/laptop, and in mobile menu on phones) */}
          <button
            onClick={handleCustomCuration}
            title="Inquire about Custom Hamper Curation on WhatsApp"
            className={`hidden sm:inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 active:scale-95 interactive-btn whitespace-nowrap ${
              isGlass
                ? 'glass-pill border-[#D4AF37]/40 text-[#F3E5AB] hover:border-[#D4AF37] hover:bg-white/10 shadow-[0_0_12px_rgba(212,175,55,0.15)]'
                : 'bg-transparent hover:bg-neutral-900 hover:text-white text-neutral-800 border border-neutral-300 hover:border-neutral-900'
            }`}
          >
            <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
            <span>Custom Curation</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full font-medium text-xs tracking-wider uppercase transition-all duration-300 active:scale-95 shadow-sm interactive-btn whitespace-nowrap ${
              isGlass
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B78A45] hover:brightness-110 text-[#0A0D0C] font-semibold shadow-[0_0_16px_rgba(212,175,55,0.35)]'
                : 'bg-[#171717] hover:bg-neutral-800 text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag ({cartCount})</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-full transition-colors focus:outline-none ${
              isGlass ? 'text-white hover:bg-white/10' : 'text-neutral-700 hover:bg-black/5'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-6 py-6 space-y-3 shadow-2xl animate-fade-in ${
          isGlass 
            ? 'bg-[#14041d]/95 backdrop-blur-2xl border-[#D4AF37]/20 text-white' 
            : 'bg-white border-black/[0.06]'
        }`}>
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(item.id, e)}
                className={`block w-full text-left py-2.5 text-sm uppercase tracking-wider transition-colors ${
                  isActive 
                    ? isGlass 
                    ? 'text-[#D4AF37] font-semibold pl-2 border-l-2 border-[#D4AF37]' 
                    : 'text-neutral-950 font-semibold pl-2 border-l-2 border-[#171717]'
                  : isGlass
                    ? 'text-neutral-400 hover:text-white'
                    : 'text-neutral-600 hover:text-neutral-950'
              }`}
              >
                {item.label}
              </button>
            );
          })}

          <button
            onClick={() => { setMobileMenuOpen(false); handleCustomCuration(); }}
            className={`w-full text-center py-3.5 rounded-full font-medium text-xs tracking-widest uppercase mt-4 shadow-md interactive-btn flex items-center justify-center gap-2 ${
              isGlass
                ? 'bg-[#D4AF37] text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                : 'bg-[#171717] text-white'
            }`}
          >
            <WhatsAppIcon className="w-4 h-4 fill-current" />
            <span>Customise on WhatsApp</span>
          </button>
        </div>
      )}
    </header>
  );
}
