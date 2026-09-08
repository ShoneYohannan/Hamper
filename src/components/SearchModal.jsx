import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { products } from '../data/products';

export default function SearchModal({ isOpen, onClose, onAddToCart, onQuickView }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleWhatsApp = (product, e) => {
    if (e) e.stopPropagation();
    const phone = product.whatsappNumber || '971501487453';
    const text = encodeURIComponent(
      product.whatsappMessage || `Hello! I would like to order the ${product.name} for ${product.formattedPrice} ${product.priceNote || ''}.`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
      />

      <div className="relative max-w-2xl mx-auto bg-white rounded-3xl border border-neutral-200/80 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Search input header */}
        <div className="p-6 border-b border-neutral-100 flex items-center gap-3">
          <Search className="w-4 h-4 text-neutral-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hampers, bouquets, baby keepsakes, or festive treats..."
            className="w-full bg-transparent text-neutral-900 placeholder:text-neutral-400 text-sm font-normal focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-800 rounded-full hover:bg-neutral-100 transition-colors"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="p-6 max-h-96 overflow-y-auto space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-neutral-500">
              <p className="text-sm font-medium text-neutral-700">No items found matching "{query}"</p>
              <p className="text-xs mt-1 text-neutral-400">Try searching "Bouquet", "Reserve", "Baby", or "Festive".</p>
            </div>
          ) : (
            filtered.map((product) => {
              const isBouquet = product.category === 'bouquets' || Boolean(product.whatsappNumber);
              return (
                <div
                  key={product.id}
                  onClick={() => { onClose(); onQuickView(product); }}
                  className="flex items-center justify-between p-3 rounded-xl bg-neutral-50/70 hover:bg-neutral-100 border border-neutral-200/60 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-neutral-100 shrink-0"
                    />
                    <div>
                      <h4 className="font-serif text-base font-normal text-neutral-900 group-hover:text-neutral-600 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs text-neutral-500 line-clamp-1">{product.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-xs font-medium text-neutral-900 block">{product.formattedPrice}</span>
                      {product.priceNote && (
                        <span className="text-[10px] text-neutral-500 block">{product.priceNote}</span>
                      )}
                    </div>
                    <button
                      onClick={(e) => handleWhatsApp(product, e)}
                      className="p-2 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full transition-all shadow-sm active:scale-95"
                      title="Order via WhatsApp (+971 501487453)"
                      aria-label={`Order ${product.name} on WhatsApp`}
                    >
                      <WhatsAppIcon className="w-4 h-4 shrink-0" variant="white" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
