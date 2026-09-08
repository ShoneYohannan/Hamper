import React, { useState, useMemo, useRef } from 'react';
import { Eye, ShoppingBag, Check, SlidersHorizontal, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import WhatsAppIcon from '../components/icons/WhatsAppIcon';
import ScrollReveal from '../components/ScrollReveal';
import TiltCard from '../components/TiltCard';
import { useTheme } from '../context/ThemeContext';
import { useCms } from '../context/CmsContext';

export default function CollectionsPage({ onAddToCart, onQuickView }) {
  const { isGlass, isPremiumAnim } = useTheme();
  const { products, categories, siteSettings } = useCms();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedIds, setAddedIds] = useState({});
  const sliderRef = useRef(null);

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth * 0.82;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleWhatsAppOrder = (product, e) => {
    if (e) e.stopPropagation();
    const phone = product.whatsappNumber || siteSettings.whatsappNumber || '971501487453';
    const defaultMsg = `Hello! I would like to order the ${product.name} for ${product.formattedPrice} ${product.priceNote || ''}.`;
    const text = encodeURIComponent(product.whatsappMessage || defaultMsg);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };


  const handleAdd = (product, e) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let list = products.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-low') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list = [...list].sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <div id="collections" className={`py-20 lg:py-28 scroll-mt-20 transition-colors duration-400 ${
      isGlass ? 'bg-transparent border-t border-white/10' : 'bg-[#FAF8F5] border-t border-black/[0.04]'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        
        {/* Page Header */}
        <ScrollReveal distance={16}>
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className={`text-[11px] font-medium tracking-[0.22em] uppercase ${
              isGlass ? 'text-[#D4AF37]' : 'text-neutral-400'
            }`}>
              The Atelier Catalog
            </span>
            <h2 className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight ${
              isGlass ? 'text-white drop-shadow-md' : 'text-[#171717]'
            }`}>
              Curated Collections
            </h2>
            <p className={`text-sm sm:text-base font-normal leading-relaxed ${
              isGlass ? 'text-neutral-300' : 'text-neutral-500'
            }`}>
              From heirloom newborn keepsakes to vintage celebration reserves, discover gift hampers crafted with uncompromising attention to detail.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Pill Filter Bar - Mobile Swipeable & Laptop Flex-Wrap */}
        <ScrollReveal delay={80} distance={12}>
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar sm:flex-wrap sm:justify-center py-1 px-1 -mx-4 sm:mx-0 px-4 sm:px-0">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-smooth interactive-btn whitespace-nowrap shrink-0 sm:shrink ${
                    isGlass
                      ? isActive
                        ? 'glass-pill-active'
                        : 'glass-pill'
                      : isActive
                        ? 'bg-[#171717] text-white shadow-sm border border-[#171717]'
                        : 'bg-white text-neutral-600 border border-neutral-200/90 hover:border-neutral-400 hover:text-neutral-900'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Search, Sort, and Item Count Controls Bar */}
        <ScrollReveal delay={120} distance={12}>
          <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t ${
            isGlass ? 'border-white/10' : 'border-black/[0.04]'
          }`}>
            <div className="relative w-full sm:w-72">
              <Search className={`w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                isGlass ? 'text-neutral-400' : 'text-neutral-400'
              }`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by keyword..."
                className={`w-full pl-9 pr-4 py-2 rounded-full text-xs font-normal transition-colors focus:outline-none ${
                  isGlass
                    ? 'bg-white/5 border border-white/15 text-white placeholder:text-neutral-400 focus:border-[#D4AF37]'
                    : 'bg-white border border-neutral-200/80 text-neutral-800 placeholder:text-neutral-400 focus:border-neutral-400'
                }`}
              />
            </div>

            <div className={`flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto text-xs font-normal ${
              isGlass ? 'text-neutral-300' : 'text-neutral-500'
            }`}>
              <span>Showing {filteredAndSortedProducts.length} of {products.length} hampers</span>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3 h-3 text-neutral-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`rounded-full px-3 py-1.5 text-xs focus:outline-none cursor-pointer ${
                    isGlass
                      ? 'bg-[#1c0827] border border-white/20 text-white focus:border-[#D4AF37]'
                      : 'bg-white border border-neutral-200/80 text-neutral-700 focus:border-neutral-400'
                  }`}
                >
                  <option value="featured" className={isGlass ? 'bg-[#1c0827]' : ''}>Featured</option>
                  <option value="price-low" className={isGlass ? 'bg-[#1c0827]' : ''}>Price: Low to High</option>
                  <option value="price-high" className={isGlass ? 'bg-[#1c0827]' : ''}>Price: High to Low</option>
                  <option value="rating" className={isGlass ? 'bg-[#1c0827]' : ''}>Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Empty State */}
        {filteredAndSortedProducts.length === 0 && (
          <div className={`text-center py-20 rounded-3xl p-8 space-y-3 ${
            isGlass ? 'glass-panel text-white' : 'bg-white border border-neutral-200/60'
          }`}>
            <p className="font-serif text-2xl font-normal">No hampers match your filters</p>
            <p className={`text-xs ${isGlass ? 'text-neutral-400' : 'text-neutral-400'}`}>Try clearing your search query or selecting "All Hampers".</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className={`px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider mt-2 interactive-btn ${
                isGlass ? 'bg-[#D4AF37] text-black font-semibold' : 'bg-[#171717] text-white'
              }`}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Mobile Swipe Hint & Navigation Controls */}
        {filteredAndSortedProducts.length > 1 && (
          <div className="flex md:hidden items-center justify-between px-1 -mb-6 text-xs">
            <span className={`text-[11px] font-medium tracking-wider uppercase flex items-center gap-1.5 ${
              isGlass ? 'text-[#D4AF37]' : 'text-neutral-500'
            }`}>
              <span>Swipe left & right to browse</span>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollSlider('left')}
                className={`p-2 rounded-full border transition-all active:scale-95 ${
                  isGlass 
                    ? 'bg-white/5 border-white/15 text-white hover:border-[#D4AF37]' 
                    : 'bg-white border-neutral-200 text-neutral-800 shadow-sm'
                }`}
                aria-label="Previous hamper"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => scrollSlider('right')}
                className={`p-2 rounded-full border transition-all active:scale-95 ${
                  isGlass 
                    ? 'bg-white/5 border-white/15 text-white hover:border-[#D4AF37]' 
                    : 'bg-white border-neutral-200 text-neutral-800 shadow-sm'
                }`}
                aria-label="Next hamper"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* On Mobile: Horizontal card rail with left-to-right swipe (snap-x). On Desktop (md+): Multi-Column Grid */}
        <div 
          ref={sliderRef}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 lg:gap-10 overflow-x-auto md:overflow-x-visible pb-6 md:pb-0 pt-2 px-4 -mx-4 sm:px-6 sm:-mx-6 md:px-0 md:mx-0 snap-x snap-mandatory scroll-smooth no-scrollbar"
        >
          {filteredAndSortedProducts.map((product, index) => (
            <ScrollReveal 
              key={product.id} 
              delay={(index % 3) * 80} 
              distance={20}
              className="h-full shrink-0 w-[84vw] max-w-[325px] sm:w-[340px] snap-center md:w-auto md:max-w-none md:shrink md:snap-align-none"
            >
              <TiltCard
                onClick={() => onQuickView(product)}
                maxTilt={isPremiumAnim ? 7 : 0}
                className="h-full"
              >
                <div
                  className={`rounded-2xl p-6 sm:p-7 cursor-pointer flex flex-col justify-between group h-full transition-smooth image-zoom-container ${
                    isGlass 
                      ? 'glass-panel glass-panel-hover text-white' 
                      : 'bg-white border border-neutral-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-neutral-300 hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)]'
                  }`}
                >
                  <div>
                    {/* Product Image */}
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-neutral-900/20">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-3.5 left-3.5">
                        <span className={`text-[10px] font-medium tracking-widest uppercase px-3 py-1 rounded-full shadow-sm transition-all duration-300 ${
                          isGlass 
                            ? 'bg-black/60 backdrop-blur-md text-[#F3E5AB] border border-white/10 group-hover:border-[#D4AF37]/50' 
                            : 'bg-white/95 text-neutral-600'
                        }`}>
                          {product.badge}
                        </span>
                      </div>
                    </div>

                    {/* Title & Info */}
                    <div className="space-y-2">
                      <h3 className={`font-serif text-xl sm:text-2xl font-normal leading-snug transition-colors ${
                        isGlass 
                          ? 'text-white group-hover:text-[#F3E5AB]' 
                          : 'text-[#171717] group-hover:text-neutral-700'
                      }`}>
                        {product.name}
                      </h3>
                      
                      <p className={`text-xs sm:text-sm leading-relaxed line-clamp-2 ${
                        isGlass ? 'text-neutral-300' : 'text-neutral-500'
                      }`}>
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Price & Action Row */}
                  <div className={`pt-6 mt-6 border-t flex items-center justify-between gap-2 ${
                    isGlass ? 'border-white/10' : 'border-neutral-100'
                  }`}>
                    <div>
                      <span className={`text-base font-normal ${
                        isGlass ? 'text-[#F3E5AB] font-medium' : 'text-neutral-900 font-medium'
                      }`}>
                        {product.formattedPrice}
                      </span>
                      {product.priceNote && (
                        <span className={`block text-[11px] leading-tight font-normal ${
                          isGlass ? 'text-amber-200/70' : 'text-neutral-500'
                        }`}>
                          {product.priceNote}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickView(product);
                        }}
                        className={`p-2.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 ${
                          isGlass
                            ? 'text-neutral-300 hover:text-white hover:bg-white/10'
                            : 'text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100'
                        }`}
                        title="Quick View"
                        aria-label={`Quick view ${product.name}`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {product.category === 'bouquets' || product.whatsappNumber ? (
                        <button
                          onClick={(e) => handleWhatsAppOrder(product, e)}
                          className={`interactive-btn px-4 sm:px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase flex items-center gap-1.5 shadow-sm active:scale-95 transition-all ${
                            isGlass
                              ? 'bg-emerald-600/90 hover:bg-emerald-500 text-white font-semibold border border-emerald-400/40 shadow-[0_2px_12px_rgba(16,185,129,0.35)]'
                              : 'bg-[#25D366] hover:bg-[#20ba5a] text-white font-medium shadow-sm'
                          }`}
                          title={`Order via WhatsApp (+971 501487453)`}
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                          <span>WhatsApp</span>
                        </button>
                      ) : (
                        <button
                          onClick={(e) => handleAdd(product, e)}
                          className={`interactive-btn px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase flex items-center gap-1.5 shadow-sm active:scale-95 ${
                            addedIds[product.id]
                              ? 'bg-emerald-800 text-white'
                              : isGlass
                                ? 'bg-gradient-to-r from-[#D4AF37] to-[#B78A45] hover:brightness-110 text-[#0A0D0C] font-semibold shadow-[0_2px_12px_rgba(212,175,55,0.3)]'
                                : 'bg-[#171717] hover:bg-neutral-800 text-white'
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
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </div>
  );
}
