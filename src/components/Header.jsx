import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, Gift, Sparkles, Feather, Wand2, RefreshCw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Header({ 
  cartCount, 
  onOpenCart, 
  onOpenSearch, 
  onOpenBuilder,
  currentPage = 'home',
  onNavigate
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, isGlass, animIntensity, toggleAnimIntensity, isPremiumAnim } = useTheme();

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
        : 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-black/[0.06]'
    }`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 lg:gap-8">
        
        {/* Brand Logo - Navigates Home */}
        <button 
          onClick={(e) => handleNavClick('home', e)}
          className="flex items-center gap-3 group flex-shrink-0 text-left focus:outline-none"
        >
          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-serif text-base tracking-wider shadow-sm transition-transform duration-300 group-hover:scale-105 ${
            isGlass
              ? 'bg-gradient-to-tr from-[#B78A45] to-[#F3E5AB] text-[#0A0D0C] font-semibold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
              : 'bg-[#171717] text-white'
          }`}>
            H
          </div>
          <div className="flex flex-col">
            <span className={`font-serif text-xl sm:text-2xl tracking-tight transition-colors block leading-tight font-normal whitespace-nowrap ${
              isGlass ? 'text-white' : 'text-[#171717]'
            }`}>
              The Hamper Co.
            </span>
            <span className={`text-[8.5px] tracking-[0.25em] uppercase font-medium block whitespace-nowrap ${
              isGlass ? 'text-[#D4AF37]' : 'text-[#737373]'
            }`}>
              Haute Gifting Atelier
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links - Shown on lg (1024px+) with clean spacing */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 flex-shrink-0">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(item.id, e)}
                className={`text-xs uppercase tracking-[0.14em] transition-all relative py-1 focus:outline-none whitespace-nowrap ${
                  isActive
                    ? isGlass ? 'text-white font-semibold' : 'text-neutral-900 font-semibold'
                    : isGlass ? 'text-neutral-400 hover:text-white font-medium' : 'text-neutral-500 hover:text-neutral-900 font-medium'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className={`absolute -bottom-1 left-0 right-0 h-[1.5px] rounded-full animate-fade-in transition-all duration-300 ${
                    isGlass ? 'bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]' : 'bg-[#171717]'
                  }`} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions, Animation Mode Toggle & Theme Switcher */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          
          {/* Dual Style Theme Toggle Switch */}
          <button
            onClick={toggleTheme}
            title={isGlass ? 'Switch back to Editorial Minimalist style' : 'Switch to Luxe Glassmorphism style'}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-medium transition-all duration-300 border ${
              isGlass
                ? 'bg-white/10 hover:bg-white/15 border-white/20 text-[#F3E5AB] shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                : 'bg-white hover:bg-neutral-100 border-neutral-300 text-neutral-700 shadow-sm'
            }`}
          >
            {isGlass ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse shrink-0" />
                <span className="hidden xl:inline">Luxe Glass</span>
                <span className="xl:hidden">Glass</span>
              </>
            ) : (
              <>
                <Feather className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span className="hidden xl:inline">Minimal</span>
                <span className="xl:hidden">Min</span>
              </>
            )}
          </button>

          {/* Animation Intensity Switch: High-End FX vs Classic Minimal (1-Click Revert Guarantee) */}
          <button
            onClick={toggleAnimIntensity}
            title={isPremiumAnim ? 'Revert to previous smooth minimal animations' : 'Activate high-end element animations (3D tilt, magnetic glow)'}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-medium transition-all duration-300 border ${
              isPremiumAnim
                ? isGlass
                  ? 'bg-amber-500/20 border-[#D4AF37]/50 text-[#F3E5AB] shadow-[0_0_10px_rgba(212,175,55,0.25)]'
                  : 'bg-amber-50 border-amber-300 text-amber-900 shadow-sm'
                : isGlass
                  ? 'bg-white/5 border-white/10 text-neutral-400'
                  : 'bg-neutral-100 border-neutral-200 text-neutral-600'
            }`}
          >
            {isPremiumAnim ? (
              <>
                <Wand2 className="w-3 h-3 text-[#D4AF37] shrink-0" />
                <span className="hidden xl:inline">FX: High-End</span>
                <span className="xl:hidden">FX</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-3 h-3 text-neutral-400 shrink-0" />
                <span className="hidden xl:inline">FX: Previous</span>
                <span className="xl:hidden">Classic</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenSearch}
            className={`p-2 transition-colors rounded-full focus:outline-none ${
              isGlass 
                ? 'text-neutral-300 hover:text-white hover:bg-white/10' 
                : 'text-neutral-700 hover:text-neutral-950 hover:bg-black/5'
            }`}
            aria-label="Search hampers"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenBuilder}
            className={`hidden 2xl:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 active:scale-95 interactive-btn whitespace-nowrap ${
              isGlass
                ? 'glass-pill border-white/20 text-white hover:border-[#D4AF37]'
                : 'bg-transparent hover:bg-neutral-900 hover:text-white text-neutral-800 border border-neutral-300 hover:border-neutral-900'
            }`}
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Custom Curation</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full font-medium text-xs tracking-wider uppercase transition-all duration-300 active:scale-95 shadow-sm interactive-btn whitespace-nowrap ${
              isGlass
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B78A45] hover:brightness-110 text-[#0A0D0C] font-semibold shadow-[0_0_16px_rgba(212,175,55,0.35)]'
                : 'bg-[#171717] hover:bg-neutral-800 text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Bag ({cartCount})</span>
          </button>

          {/* Mobile Menu Trigger (shown up to lg 1024px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors focus:outline-none ${
              isGlass ? 'text-white' : 'text-neutral-700'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-6 py-6 space-y-3 shadow-lg animate-fade-in ${
          isGlass 
            ? 'bg-[#0F1413]/95 backdrop-blur-xl border-white/10 text-white' 
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

          <div className="pt-3 border-t border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-neutral-400">
              <span>Theme Style:</span>
              <button
                onClick={toggleTheme}
                className="font-semibold text-[#D4AF37]"
              >
                {isGlass ? '✨ Luxe Glass' : '📜 Minimal'}
              </button>
            </div>
            
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-neutral-400">
              <span>Animation Level:</span>
              <button
                onClick={toggleAnimIntensity}
                className="font-semibold text-[#D4AF37]"
              >
                {isPremiumAnim ? '🪄 High-End (Active)' : '🌿 Classic Minimal'}
              </button>
            </div>
          </div>

          <button
            onClick={() => { setMobileMenuOpen(false); onOpenBuilder(); }}
            className={`w-full text-center py-3 rounded-full font-medium text-xs tracking-widest uppercase mt-4 shadow-sm interactive-btn ${
              isGlass
                ? 'bg-[#D4AF37] text-black font-semibold'
                : 'bg-[#171717] text-white'
            }`}
          >
            Start Custom Curation
          </button>
        </div>
      )}
    </header>
  );
}
