import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import { products } from '../data/products';
import { ArrowRight, ShoppingBag, Eye, Check } from 'lucide-react';

export default function HomePage({ onOpenBuilder, onNavigate, onAddToCart, onQuickView }) {
  const [addedIds, setAddedIds] = React.useState({});

  const handleAdd = (product, e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  // Preview of 3 featured hampers for the homepage
  const featuredPreview = products.slice(0, 3);

  return (
    <div className="animate-fade-in space-y-0">
      {/* Editorial Hero */}
      <Hero 
        onOpenBuilder={onOpenBuilder} 
      />

      {/* Highlights Teaser Section */}
      <section className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-black/[0.04]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-14">
          
          {/* Section Header with Navigation Link */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-black/[0.04] pb-8">
            <div className="space-y-2 max-w-xl">
              <span className="text-[11px] font-medium tracking-[0.22em] text-neutral-400 uppercase">
                Curated Highlights
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal tracking-tight">
                Hallmarks of The Atelier
              </h2>
            </div>

            <button
              onClick={() => onNavigate('collections')}
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-neutral-800 hover:text-black transition-colors group"
            >
              <span>Explore All Collections</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* 3 Featured Preview Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPreview.map((product) => (
              <div
                key={product.id}
                onClick={() => onQuickView(product)}
                className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-neutral-300 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-neutral-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-medium tracking-widest uppercase px-3 py-1 rounded-full bg-white/95 text-neutral-600 shadow-sm">
                        {product.badge}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-normal text-[#171717] group-hover:text-neutral-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-neutral-500 line-clamp-2 mt-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-base font-normal text-neutral-900">
                    {product.formattedPrice}
                  </span>

                  <button
                    onClick={(e) => handleAdd(product, e)}
                    className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                      addedIds[product.id]
                        ? 'bg-emerald-800 text-white'
                        : 'bg-[#171717] hover:bg-neutral-800 text-white'
                    }`}
                  >
                    {addedIds[product.id] ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
                    <span>{addedIds[product.id] ? 'Added' : 'Add'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* The Atelier Process */}
      <Features onOpenBuilder={onOpenBuilder} />

      {/* Reviews Preview with Link */}
      <div className="relative">
        <Testimonials />
        <div className="text-center pb-20 bg-[#FAF8F5]">
          <button
            onClick={() => onNavigate('reviews')}
            className="inline-flex items-center gap-2 border border-neutral-300 hover:border-neutral-900 px-7 py-3 rounded-full text-xs font-medium uppercase tracking-[0.14em] text-neutral-800 hover:text-black transition-all group bg-white shadow-sm"
          >
            <span>Read All Client Reviews ({6})</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
