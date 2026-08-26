import React from 'react';
import { testimonials } from '../data/products';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-[#153D32] text-[#FFFDF8] relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#1E5042] rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#B78A45] rounded-full blur-3xl opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#FFFDF8]">
            Loved by people who love to give
          </h2>
        </div>

        {/* Testimonials 3 Grid matching Screenshot 5 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item) => (
            <div 
              key={item.id}
              className="bg-[#0D2921]/80 backdrop-blur-md rounded-3xl p-8 border border-[#1E5042] flex flex-col justify-between space-y-6 hover:border-[#B78A45]/50 transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Rating Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-[#B78A45] bg-[#153D32] px-2.5 py-1 rounded-md border border-[#1E5042]">
                    {item.rating}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <p className="font-serif text-xl sm:text-2xl text-[#FFFDF8] leading-snug group-hover:text-[#D4AF37] transition-colors">
                  {item.quote}
                </p>
              </div>

              {/* Author & Location */}
              <div className="pt-4 border-t border-[#1E5042]/60">
                <span className="text-xs font-medium text-[#FFFDF8]/70">
                  {item.author} · {item.location}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
