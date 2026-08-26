import React from 'react';
import { X, Star, ShoppingBag, Check, ShieldCheck } from 'lucide-react';

export default function QuickViewModal({ product, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
      />

      <div className="relative w-full max-w-3xl bg-[#FFFDF8] rounded-3xl border border-[#153D32]/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 grid grid-cols-1 md:grid-cols-2">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#153D32] hover:bg-[#153D32]/10 rounded-full transition-colors bg-[#FFFDF8]/80 backdrop-blur-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="relative aspect-square md:aspect-auto bg-stone-200">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-[#153D32] text-[#FFFDF8]">
              {product.badge}
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-6 md:p-8 flex flex-col justify-between space-y-6 bg-[#F9F6F0]">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-500 text-xs font-semibold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-[#6E756B]">({product.reviewCount} customer reviews)</span>
            </div>

            <h2 className="font-serif text-3xl font-semibold text-[#153D32]">
              {product.name}
            </h2>

            <p className="text-xl font-bold text-[#B78A45]">
              {product.formattedPrice}
            </p>

            <p className="text-sm text-[#6E756B] leading-relaxed">
              {product.longDescription || product.description}
            </p>

            {/* Included Items List */}
            {product.items && (
              <div className="space-y-2 pt-2 border-t border-[#153D32]/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#153D32]">Included in this hamper:</h4>
                <ul className="space-y-1">
                  {product.items.map((item, i) => (
                    <li key={i} className="text-xs text-[#6E756B] flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#B78A45]" />
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
              className="w-full bg-[#153D32] hover:bg-[#1E5042] text-[#FFFDF8] py-3.5 rounded-full font-medium text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <span>Add to Cart - {product.formattedPrice}</span>
            </button>

            <p className="text-[11px] text-center text-[#6E756B] flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B78A45]" />
              Handcrafted with luxury ribbon wrapping & complimentary gift card
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
