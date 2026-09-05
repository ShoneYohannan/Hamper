import React from 'react';
import { steps } from '../data/products';
import { Gift, HeartHandshake, Truck } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';
import { useTheme } from '../context/ThemeContext';

export default function Features({ onOpenBuilder }) {
  const { isGlass, isPremiumAnim } = useTheme();

  const icons = [
    <Gift className={`w-4 h-4 ${isGlass ? 'text-[#D4AF37]' : 'text-neutral-500'}`} />,
    <HeartHandshake className={`w-4 h-4 ${isGlass ? 'text-[#D4AF37]' : 'text-neutral-500'}`} />,
    <Truck className={`w-4 h-4 ${isGlass ? 'text-[#D4AF37]' : 'text-neutral-500'}`} />
  ];

  return (
    <section id="how-it-works" className={`py-20 lg:py-32 scroll-mt-20 transition-colors duration-400 ${
      isGlass ? 'bg-transparent border-t border-white/10' : 'bg-[#FAF8F5] border-t border-black/[0.04]'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        
        {/* Section Header */}
        <ScrollReveal distance={16}>
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className={`text-[11px] font-medium tracking-[0.22em] uppercase ${
              isGlass ? 'text-[#D4AF37]' : 'text-neutral-400'
            }`}>
              The Atelier Process
            </span>
            <h2 className={`font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight ${
              isGlass ? 'text-white' : 'text-[#171717]'
            }`}>
              A thoughtful gesture in three steps
            </h2>
            <p className={`text-sm sm:text-base font-normal leading-relaxed ${
              isGlass ? 'text-neutral-300' : 'text-neutral-500'
            }`}>
              Every hamper is individually arranged, inspected, and presented like a piece of fine art.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Step Cards Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <ScrollReveal key={step.number} delay={idx * 100} distance={20} className="h-full">
              <TiltCard maxTilt={isPremiumAnim ? 6 : 0} className="h-full">
                <div 
                  className={`step-card-interactive rounded-2xl p-8 sm:p-9 flex flex-col justify-between space-y-8 h-full transition-smooth ${
                    isGlass
                      ? 'glass-panel glass-panel-hover text-white'
                      : 'bg-white border border-neutral-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-neutral-300 hover:shadow-[0_8px_25px_rgba(0,0,0,0.05)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`step-number-interactive font-serif text-3xl font-normal transition-all duration-300 ${
                      isGlass ? 'text-white/40' : 'text-neutral-300'
                    }`}>
                      {step.number}
                    </span>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                      isGlass ? 'bg-white/10 border border-white/10' : 'bg-neutral-100'
                    }`}>
                      {icons[idx]}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`font-serif text-xl sm:text-2xl font-normal ${
                      isGlass ? 'text-white' : 'text-[#171717]'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed font-normal ${
                      isGlass ? 'text-neutral-300' : 'text-neutral-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Action Button */}
        <ScrollReveal delay={200} distance={12}>
          <div className="text-center pt-2">
            <button
              onClick={onOpenBuilder}
              className={`interactive-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 shadow-sm active:scale-95 ${
                isGlass
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B78A45] hover:brightness-110 text-[#0A0D0C] font-semibold shadow-[0_4px_25px_rgba(212,175,55,0.35)]'
                  : 'bg-[#171717] hover:bg-neutral-800 text-white'
              }`}
            >
              <Gift className={`w-3.5 h-3.5 ${isGlass ? 'text-[#0A0D0C]' : 'text-neutral-400'}`} />
              <span>Design A Custom Hamper</span>
            </button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
