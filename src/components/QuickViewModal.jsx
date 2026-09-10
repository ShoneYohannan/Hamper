import React from 'react';
import { X, Star, Check, ShieldCheck } from 'lucide-react';
import WhatsAppIcon from './icons/WhatsAppIcon';
import { useTheme } from '../context/ThemeContext';

export default function QuickViewModal({ product, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !product) return null;

  const { isGlass } = useTheme();
  const isReserve = product.category === 'reserve' || product.id?.includes('reserve') || product.badge?.includes('RESERVE');
  const whatsappUrl = `https://wa.me/${product.whatsappNumber || '971501487453'}?text=${encodeURIComponent(
    product.whatsappMessage || `Hello! I would like to order the ${product.name} for ${product.formattedPrice} ${product.priceNote || ''}.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200" 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden animate-in zoom-in-95 duration-200 grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto bg-[#14031e]/95 backdrop-blur-2xl border border-[#D4AF37]/30 shadow-[0_25px_80px_rgba(0,0,0,0.85)] text-white group">
        
        {/* Ambient Glow Aura */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/20 via-purple-700/20 to-emerald-500/20 rounded-3xl blur-2xl pointer-events-none -z-10" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 text-neutral-300 hover:text-white hover:bg-white/15 rounded-full transition-colors bg-black/40 backdrop-blur-md border border-white/10 active:scale-95 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Image Column */}
        <div className="relative aspect-square md:aspect-auto bg-black/35 border-b md:border-b-0 md:border-r border-white/10 min-h-[280px] flex items-center justify-center p-6 overflow-hidden">
          {/* Subtle Champagne Backlight Glow */}
          <div className="absolute w-52 h-52 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full max-h-[460px] object-contain relative z-10 drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
          />

          {product.badge && (
            <div className="absolute top-4 left-4 z-10">
              <span className="text-[10px] font-medium tracking-widest uppercase px-3.5 py-1 rounded-full bg-[#1c0827]/90 text-[#F3E5AB] border border-[#D4AF37]/40 shadow-md backdrop-blur-md">
                {product.badge}
              </span>
            </div>
          )}
        </div>

        {/* Product Details Column */}
        <div className="p-6 md:p-8 flex flex-col justify-between space-y-6 bg-transparent overflow-y-auto">
          <div className="space-y-4">
            {/* Rating & Verified Tag */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
                <span className="ml-1 text-xs font-medium text-amber-200">5.0</span>
              </div>
              <span className="text-[10px] tracking-wider uppercase font-medium px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
                WhatsApp Verified
              </span>
            </div>

            {/* Product Title */}
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white leading-tight tracking-tight">
              {product.name}
            </h2>

            {/* Price & Currency */}
            <div className="flex items-baseline gap-2 pt-0.5">
              <span className="font-serif text-2xl sm:text-3xl font-normal text-[#F3E5AB]">
                {product.formattedPrice}
              </span>
              {product.priceNote && (
                <span className="text-xs text-amber-200/70 font-normal">
                  {product.priceNote}
                </span>
              )}
            </div>

            {/* Long Description */}
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
              {product.longDescription || product.description}
            </p>

            {/* Included Items List */}
            {product.items && (
              <div className="space-y-2.5 pt-4 border-t border-white/10">
                <h4 className="text-[11px] font-medium uppercase tracking-wider text-[#D4AF37]">
                  Included Inclusions:
                </h4>
                <ul className="space-y-2">
                  {product.items.map((item, i) => (
                    <li key={i} className="text-xs text-neutral-200 flex items-start gap-2 leading-snug">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-4 space-y-3 border-t border-white/10">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:brightness-110 text-white py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-[0_4px_25px_rgba(16,185,129,0.35)] active:scale-95 flex items-center justify-center gap-2 border border-emerald-400/30"
            >
              <WhatsAppIcon className="w-4.5 h-4.5 shrink-0" variant="white" />
              <span>
                {isReserve
                  ? 'Reserve via WhatsApp (+971 501487453)'
                  : `Order on WhatsApp · ${product.formattedPrice}`}
              </span>
            </a>

            <p className="text-[11px] text-center text-neutral-400 font-normal flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Includes signature gift packaging & handwritten card</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
