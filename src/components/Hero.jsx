import React from 'react';
import { ArrowDown, Gift, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Hero({ onOpenBuilder }) {
  const scrollToCollections = () => {
    const elem = document.getElementById('collections');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative overflow-hidden bg-[#FAF8F5] pt-16 pb-24 md:pt-24 md:pb-32 border-b border-black/[0.05] scroll-mt-20">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 relative z-10 text-center space-y-9">
        
        {/* Understated Minimalist Badge */}
        <ScrollReveal delay={0} distance={12}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-neutral-200/80 text-neutral-500 text-[11px] font-medium tracking-[0.2em] uppercase shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
            <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
            <span>Curated Haute Hampers · Hand-Packed in India</span>
          </div>
        </ScrollReveal>

        {/* Hero Main Headline - Sophisticated Editorial Serif */}
        <ScrollReveal delay={100} distance={18}>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal tracking-[-0.025em] text-[#171717] leading-[1.08] max-w-4xl mx-auto">
            The art of gifting, elevated for life’s sweetest milestones.
          </h1>
        </ScrollReveal>

        {/* Subtitle - Soft Muted Gray with Generous Line Spacing */}
        <ScrollReveal delay={180} distance={16}>
          <p className="text-base sm:text-lg text-neutral-500 max-w-xl mx-auto leading-relaxed font-normal">
            From heirloom newborn keepsakes to vintage grand reserves, explore handcrafted hampers designed to evoke wonder from the very first ribbon pull.
          </p>
        </ScrollReveal>

        {/* Action Buttons - Compact Pill Design */}
        <ScrollReveal delay={260} distance={14}>
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={scrollToCollections}
              className="inline-flex items-center gap-2 bg-[#171717] hover:bg-neutral-800 text-white px-7 py-3.5 rounded-full text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 shadow-sm active:scale-95"
            >
              <span>Explore Collections</span>
              <ArrowDown className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            <button
              onClick={onOpenBuilder}
              className="inline-flex items-center gap-2 bg-white hover:bg-neutral-50 text-neutral-800 border border-neutral-200 hover:border-neutral-400 px-7 py-3.5 rounded-full text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 shadow-sm active:scale-95"
            >
              <Gift className="w-3.5 h-3.5 text-neutral-400" />
              <span>Bespoke Studio</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Minimal Category Milestone Line */}
        <ScrollReveal delay={340} distance={10}>
          <div className="pt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] font-medium text-neutral-400 uppercase tracking-[0.2em] border-t border-black/[0.04] max-w-xl mx-auto">
            <span>The Reserve</span>
            <span className="w-1 h-1 rounded-full bg-neutral-300" />
            <span>Newborn Keepsakes</span>
            <span className="w-1 h-1 rounded-full bg-neutral-300" />
            <span>Festive & Pantry</span>
            <span className="w-1 h-1 rounded-full bg-neutral-300" />
            <span>Corporate</span>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}