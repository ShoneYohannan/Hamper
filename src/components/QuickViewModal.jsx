import React from 'react';
import { X, Star, ShoppingBag, Check, ShieldCheck } from 'lucide-react';

export default function QuickViewModal({ product, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
      />

      <div className="relative w-full max-w-3xl bg-white rounded-3xl border border-neutral-200/80 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 grid grid-cols-1 md:grid-cols-2">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors bg-white/80 backdrop-blur-sm"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Image */}
        <div className="relative aspect-square md:aspect-auto bg-neutral-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="text-[10px] font-medium tracking-widest uppercase px-3 py-1 rounded-full bg-white/95 text-neutral-700 shadow-sm">
              {product.badge}
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-6 md:p-8 flex flex-col justify-between space-y-6 bg-white">
          <div className="space-y-4">
            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#171717] text-[#171717]" />
                ))}
              </div>
              <span className="ml-1 text-neutral-400">({product.reviewCount} reviews)</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#171717] leading-tight">
              {product.name}
            </h2>

            <p className="text-xl font-normal text-neutral-900">
              {product.formattedPrice}
            </p>

            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-normal">
              {product.longDescription || product.description}
            </p>

            {/* Included Items List */}
            {product.items && (
              <div className="space-y-2 pt-3 border-t border-neutral-100">
                <h4 className="text-[11px] font-medium uppercase tracking-wider text-neutral-400">
                  Included Inclusions:
                </h4>
                <ul className="space-y-1.5">
                  {product.items.map((item, i) => (
                    <li key={i} className="text-xs text-neutral-600 flex items-center gap-2">
                      <Check className="w-3 h-3 text-neutral-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="pt-4 space-y-3">
            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="w-full bg-[#171717] hover:bg-neutral-800 text-white py-3.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 shadow-sm active:scale-95 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-neutral-300" />
              <span>Add to Bag · {product.formattedPrice}</span>
            </button>

            <p className="text-[11px] text-center text-neutral-400 font-normal flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
              Includes signature gift packaging & handwritten card
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
