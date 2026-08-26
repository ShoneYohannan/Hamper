import React, { useState } from 'react';
import { Star, Eye, ShoppingBag, Check } from 'lucide-react';
import { products } from '../data/products';

export default function ProductGrid({ onAddToCart, onQuickView }) {
  const [addedIds, setAddedIds] = useState({});

  const handleAdd = (product, e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <section id="collections" className="py-16 md:py-24 bg-[#FFFDF8] border-t border-b border-[#153D32]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 md:mb-16">
          <span className="text-xs md:text-sm font-semibold tracking-widest text-[#B78A45] uppercase">
            A CONSIDERED GESTURE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#153D32] tracking-tight">
            Gifts for every kind of gathering
          </h2>
        </div>

        {/* 3 Product Cards Grid matching Framer layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {products.map((product) => {
            const isJustAdded = addedIds[product.id];

            return (
              <div
                key={product.id}
                onClick={() => onQuickView(product)}
                className="group relative bg-[#F9F6F0] rounded-3xl p-4 sm:p-5 border border-[#153D32]/10 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Image Container with Badge */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-200 mb-5">
                    {/* Badge Overlay */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className={`text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full backdrop-blur-md shadow-sm ${
                        product.badgeType === 'gold' 
                          ? 'bg-[#B78A45] text-[#FFFDF8]' 
                          : product.badgeType === 'sage'
                          ? 'bg-[#6E756B] text-[#FFFDF8]'
                          : 'bg-[#153D32] text-[#FFFDF8]'
                      }`}>
                        {product.badge}
                      </span>
                    </div>

                    {/* Image */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Quick View overlay button */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
                        className="bg-[#FFFDF8] text-[#153D32] text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Quick View
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2 px-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-2xl font-semibold text-[#153D32] group-hover:text-[#B78A45] transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    <p className="text-sm text-[#6E756B] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Footer Price & Add to Cart button */}
                <div className="pt-6 px-1 flex items-center justify-between mt-4 border-t border-[#153D32]/5">
                  <span className="text-sm font-semibold text-[#B78A45]">
                    {product.formattedPrice}
                  </span>

                  <button
                    onClick={(e) => handleAdd(product, e)}
                    className={`px-5 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                      isJustAdded
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#153D32] hover:bg-[#1E5042] text-[#FFFDF8] active:scale-95'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Added
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
