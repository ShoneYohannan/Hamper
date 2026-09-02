import React, { useState } from 'react';
import { Eye, ShoppingBag, Check, CheckCircle2 } from 'lucide-react';
import { products, categories } from '../data/products';

export default function ProductGrid({ onAddToCart, onQuickView }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [addedIds, setAddedIds] = useState({});

  const handleAdd = (product, e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const flagshipProduct = products.find(p => p.id === 'premium-royal-reserve');

  return (
    <section id="collections" className="py-20 lg:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        
        {/* Section Header with Refined Typography */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] font-medium tracking-[0.22em] text-neutral-400 uppercase">
            Curated Gifting
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#171717] tracking-tight">
            Handcrafted Keepsakes & Grand Reserves
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed">
            Thoughtfully assembled gift hampers celebrating life’s purest joys and finest celebrations.
          </p>
        </div>

        {/* Pill-Style Category Filter Bar matching Reference Design */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? 'bg-[#171717] text-white shadow-sm border border-[#171717]'
                    : 'bg-white text-neutral-600 border border-neutral-200/90 hover:border-neutral-400 hover:text-neutral-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Flagship Editorial Feature (The Royal Reserve) */}
        {(selectedCategory === 'all' || selectedCategory === 'premium') && flagshipProduct && (
          <div id="featured-luxury" className="bg-white rounded-3xl p-8 sm:p-10 lg:p-12 border border-neutral-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Image Showcase */}
              <div 
                onClick={() => onQuickView(flagshipProduct)}
                className="lg:col-span-6 cursor-pointer group relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100"
              >
                <img
                  src={flagshipProduct.image}
                  alt={flagshipProduct.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] tracking-widest uppercase font-medium px-3 py-1.5 rounded-full bg-white/95 text-neutral-700 shadow-sm">
                    {flagshipProduct.badge}
                  </span>
                </div>
              </div>

              {/* Editorial Narrative */}
              <div className="lg:col-span-6 space-y-6">
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-neutral-400">
                    Flagship Presentation
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal leading-tight">
                    {flagshipProduct.name}
                  </h3>
                  <p className="text-xl font-normal text-neutral-900 pt-1">
                    {flagshipProduct.formattedPrice}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-neutral-500 leading-relaxed font-normal">
                  {flagshipProduct.longDescription}
                </p>

                {/* Inclusions List */}
                <div className="space-y-2.5 pt-2 border-t border-neutral-100">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
                    Hand-Selected Inclusions:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {flagshipProduct.items.slice(0, 4).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={(e) => handleAdd(flagshipProduct, e)}
                    className={`px-7 py-3 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300 flex items-center gap-2 shadow-sm active:scale-95 ${
                      addedIds[flagshipProduct.id]
                        ? 'bg-emerald-800 text-white'
                        : 'bg-[#171717] hover:bg-neutral-800 text-white'
                    }`}
                  >
                    {addedIds[flagshipProduct.id] ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Bag</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onQuickView(flagshipProduct)}
                    className="px-6 py-3 rounded-full border border-neutral-200 hover:border-neutral-400 text-xs font-medium tracking-wider uppercase text-neutral-800 bg-white hover:bg-neutral-50 transition-all"
                  >
                    View Details
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Spacious Multi-Column Responsive Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onQuickView(product)}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-neutral-300 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Product Image */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-neutral-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute top-3.5 left-3.5">
                    <span className="text-[10px] font-medium tracking-widest uppercase px-3 py-1 rounded-full bg-white/95 text-neutral-600 shadow-sm">
                      {product.badge}
                    </span>
                  </div>
                </div>

                {/* Title & Info */}
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="font-serif text-xl sm:text-2xl font-normal text-[#171717] group-hover:text-neutral-700 transition-colors">
                      {product.name}
                    </h4>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="pt-6 mt-6 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-base font-normal text-neutral-900">
                  {product.formattedPrice}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickView(product);
                    }}
                    className="p-2.5 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                    title="Quick View"
                    aria-label={`Quick view ${product.name}`}
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={(e) => handleAdd(product, e)}
                    className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-1.5 shadow-sm ${
                      addedIds[product.id]
                        ? 'bg-emerald-800 text-white'
                        : 'bg-[#171717] hover:bg-neutral-800 text-white active:scale-95'
                    }`}
                  >
                    {addedIds[product.id] ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
