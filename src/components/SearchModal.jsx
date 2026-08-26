import React, { useState } from 'react';
import { Search, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { products } from '../data/products';

export default function SearchModal({ isOpen, onClose, onAddToCart, onQuickView }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
      />

      <div className="relative max-w-2xl mx-auto bg-[#FFFDF8] rounded-3xl border border-[#153D32]/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Search input header */}
        <div className="p-6 border-b border-[#153D32]/10 flex items-center gap-3 bg-[#F9F6F0]">
          <Search className="w-5 h-5 text-[#B78A45]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hampers, occasions, or artisanal treats..."
            className="w-full bg-transparent text-[#153D32] placeholder:text-[#6E756B] text-base focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-[#153D32]/60 hover:text-[#153D32] rounded-full hover:bg-[#153D32]/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="p-6 max-h-96 overflow-y-auto space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-[#6E756B]">
              <p className="text-sm font-medium">No gift hampers found matching "{query}"</p>
              <p className="text-xs mt-1">Try searching "Festive", "Artisanal", or "Corporate".</p>
            </div>
          ) : (
            filtered.map((product) => (
              <div
                key={product.id}
                onClick={() => { onClose(); onQuickView(product); }}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F9F6F0] hover:bg-[#153D32]/5 border border-[#153D32]/5 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-[#153D32] group-hover:text-[#B78A45] transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#6E756B] line-clamp-1">{product.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-[#B78A45]">{product.formattedPrice}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="p-2 bg-[#153D32] hover:bg-[#1E5042] text-[#FFFDF8] rounded-full transition-all"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
