import React from 'react';
import { ArrowDown, Gift, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useTheme } from '../context/ThemeContext';

export default function Hero({ onOpenBuilder }) {
  const { isGlass, isPremiumAnim } = useTheme();

  const scrollToCollections = () => {
    const elem = document.getElementById('collections');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={`relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 scroll-mt-20 transition-colors duration-400 ${
      isGlass 
        ? 'bg-transparent border-b border-white/10' 
        : 'bg-[#FAF8F5] border-b border-black/[0.05]'
    }`}>
      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10 text-center space-y-9">
        
        {/* Floating Interactive Badge */}
        <ScrollReveal delay={0} distance={12}>
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 ${
            isPremiumAnim ? 'animate-float-subtle' : ''
          } ${
            isGlass
              ? 'glass-pill border-white/20 text-[#F3E5AB] shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]'
              : 'bg-white border border-neutral-200/80 text-neutral-500 shadow-[0_1px_3px_rgba(0,0,0,0.02)]'
          }`}>
            <Sparkles className={`w-3.5 h-3.5 ${isGlass ? 'text-[#D4AF37]' : 'text-neutral-400'} ${isPremiumAnim ? 'animate-pulse' : ''}`} />
            <span>Curated Haute Hampers · Hand-Packed in India</span>
          </div>
        </ScrollReveal>

        {/* Hero Main Headline */}
        <ScrollReveal delay={100} distance={18}>
          <h1 className={`font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal tracking-[-0.025em] leading-[1.08] max-w-4xl mx-auto transition-colors duration-300 ${
            isGlass
              ? 'text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]'
              : 'text-[#171717]'
          }`}>
            The art of gifting, elevated for life’s{' '}
            <span className={isGlass ? 'text-gradient-gold' : ''}>sweetest milestones.</span>
          </h1>
        </ScrollReveal>

        {/* Subtitle */}
        <ScrollReveal delay={180} distance={16}>
          <p className={`text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-normal transition-colors duration-300 ${
            isGlass ? 'text-neutral-300' : 'text-neutral-500'
          }`}>
            From heirloom newborn keepsakes to vintage grand reserves, explore handcrafted hampers designed to evoke wonder from the very first ribbon pull.
          </p>
        </ScrollReveal>

        {/* Action Buttons with Interactive Shimmer & Magnetic feel */}
        <ScrollReveal delay={260} distance={14}>
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={scrollToCollections}
              className={`interactive-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 shadow-sm active:scale-95 ${
                isGlass
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B78A45] hover:brightness-110 text-[#0A0D0C] font-semibold shadow-[0_4px_25px_rgba(212,175,55,0.35)]'
                  : 'bg-[#171717] hover:bg-neutral-800 text-white'
              }`}
            >
              <span>Explore Collections</span>
              <ArrowDown className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5 ${isGlass ? 'text-[#0A0D0C]' : 'text-neutral-400'}`} />
            </button>

            <button
              onClick={onOpenBuilder}
              className={`interactive-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 shadow-sm active:scale-95 ${
                isGlass
                  ? 'glass-pill border-white/20 text-white hover:border-[#D4AF37]'
                  : 'bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 hover:border-neutral-400'
              }`}
            >
              <Gift className={`w-3.5 h-3.5 ${isGlass ? 'text-[#D4AF37]' : 'text-neutral-400'}`} />
              <span>Bespoke Studio</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Category Milestone Line */}
        <ScrollReveal delay={340} distance={10}>
          <div className={`pt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] font-medium uppercase tracking-[0.2em] border-t max-w-xl mx-auto transition-colors duration-300 ${
            isGlass
              ? 'text-neutral-400 border-white/10'
              : 'text-neutral-400 border-black/[0.04]'
          }`}>
            <span className="hover:text-[#D4AF37] transition-colors cursor-pointer" onClick={scrollToCollections}>The Reserve</span>
            <span className={`w-1 h-1 rounded-full ${isGlass ? 'bg-[#D4AF37]/50' : 'bg-neutral-300'}`} />
            <span className="hover:text-[#D4AF37] transition-colors cursor-pointer" onClick={scrollToCollections}>Newborn Keepsakes</span>
            <span className={`w-1 h-1 rounded-full ${isGlass ? 'bg-[#D4AF37]/50' : 'bg-neutral-300'}`} />
            <span className="hover:text-[#D4AF37] transition-colors cursor-pointer" onClick={scrollToCollections}>Festive & Pantry</span>
            <span className={`w-1 h-1 rounded-full ${isGlass ? 'bg-[#D4AF37]/50' : 'bg-neutral-300'}`} />
            <span className="hover:text-[#D4AF37] transition-colors cursor-pointer" onClick={scrollToCollections}>Corporate</span>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}