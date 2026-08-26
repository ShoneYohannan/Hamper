import React from 'react';
import { steps } from '../data/products';
import { Gift, HeartHandshake, Truck } from 'lucide-react';

export default function Features({ onOpenBuilder }) {
  const icons = [<Gift className="w-5 h-5 text-[#B78A45]" />, <HeartHandshake className="w-5 h-5 text-[#B78A45]" />, <Truck className="w-5 h-5 text-[#B78A45]" />];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-[#F9F6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs md:text-sm font-semibold tracking-widest text-[#B78A45] uppercase">
            GIFTING, MADE SIMPLE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#153D32] tracking-tight">
            A beautiful gesture in three steps
          </h2>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, idx) => (
            <div 
              key={step.number}
              className="bg-[#FFFDF8] rounded-3xl p-8 border border-[#153D32]/10 transition-all duration-300 hover:shadow-lg hover:border-[#B78A45]/40 flex flex-col justify-between group"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl font-bold text-[#B78A45]">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#F9F6F0] flex items-center justify-center border border-[#153D32]/10 group-hover:bg-[#153D32] group-hover:text-white transition-colors">
                    {icons[idx]}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-semibold text-[#153D32] group-hover:text-[#B78A45] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#6E756B] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="text-center pt-4">
          <button
            onClick={onOpenBuilder}
            className="inline-flex items-center gap-2 bg-[#153D32] hover:bg-[#1E5042] text-[#FFFDF8] px-8 py-3.5 rounded-full font-medium text-sm transition-all shadow-md active:scale-95"
          >
            <Gift className="w-4 h-4 text-[#D4AF37]" />
            Start Building Your Custom Hamper
          </button>
        </div>

      </div>
    </section>
  );
}
