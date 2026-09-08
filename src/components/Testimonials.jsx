import React from 'react';
import { testimonials } from '../data/products';
import { Star } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-black/[0.04]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-[11px] font-medium tracking-[0.22em] text-neutral-400 uppercase">
            Client Words
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#171717]">
            Loved by people who love to give
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed">
            Real stories from patrons celebrating milestone moments across India.
          </p>
        </div>

        {/* Testimonials 2 Grid */}
        <div className={`grid grid-cols-1 ${testimonials.length <= 2 ? 'md:grid-cols-2 max-w-5xl mx-auto' : 'md:grid-cols-3'} gap-8`}>
          {testimonials.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl p-8 border border-neutral-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                {/* 5 Clean Minimal Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(item.stars || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#171717] text-[#171717]" />
                    ))}
                  </div>
                  {item.occasionLabel && (
                    <span className="text-[10px] tracking-wider uppercase font-medium px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-600">
                      {item.occasionLabel}
                    </span>
                  )}
                </div>

                {/* Quote Text */}
                <p className="font-serif text-base sm:text-lg text-[#171717] font-normal leading-relaxed">
                  {item.quote}
                </p>
              </div>

              {/* Author & Location Footer */}
              <div className="pt-4 border-t border-neutral-100 space-y-1 text-xs">
                <div className="flex items-center justify-between font-medium text-neutral-800">
                  <span className="font-semibold text-neutral-900">{item.author}</span>
                  <span className="tracking-wider uppercase text-[11px] text-neutral-500 font-medium">{item.location}</span>
                </div>
                {item.hamper && (
                  <p className="text-[11px] text-neutral-500 font-normal">
                    {item.hamper}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
