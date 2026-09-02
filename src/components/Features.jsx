import React from 'react';
import { steps } from '../data/products';
import { Gift, HeartHandshake, Truck } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

export default function Features({ onOpenBuilder }) {
  const icons = [
    <Gift className="w-4 h-4 text-neutral-500" />,
    <HeartHandshake className="w-4 h-4 text-neutral-500" />,
    <Truck className="w-4 h-4 text-neutral-500" />
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-[#FAF8F5] border-t border-black/[0.04]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        
        {/* Section Header */}
        <ScrollReveal distance={16}>
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-[11px] font-medium tracking-[0.22em] text-neutral-400 uppercase">
              The Atelier Process
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#171717] tracking-tight">
              A thoughtful gesture in three steps
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed">
              Every hamper is individually arranged, inspected, and presented like a piece of fine art.
            </p>
          </div>
        </ScrollReveal>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <ScrollReveal key={step.number} delay={idx * 100} distance={20} className="h-full">
              <div 
                className="bg-white rounded-2xl p-8 sm:p-9 border border-neutral-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-8 h-full"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl text-neutral-300 font-normal">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                    {icons[idx]}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#171717]">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Action Button */}
        <ScrollReveal delay={200} distance={12}>
          <div className="text-center pt-2">
            <button
              onClick={onOpenBuilder}
              className="inline-flex items-center gap-2 bg-[#171717] hover:bg-neutral-800 text-white px-7 py-3.5 rounded-full text-xs font-medium tracking-[0.14em] uppercase transition-all duration-300 shadow-sm active:scale-95"
            >
              <Gift className="w-3.5 h-3.5 text-neutral-400" />
              <span>Design A Custom Hamper</span>
            </button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
