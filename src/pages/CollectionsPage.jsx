import React, { useState, useMemo } from 'react';
import { Eye, ShoppingBag, Check, SlidersHorizontal, Search } from 'lucide-react';
import { products, categories } from '../data/products';
import ScrollReveal from '../components/ScrollReveal';

export default function CollectionsPage({ onAddToCart, onQuickView }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedIds, setAddedIds] = useState({});

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
    <div id="collections" className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-black/[0.04] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        
        {/* Page Header */}
        <ScrollReveal distance={16}>
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] font-medium tracking-[0.22em] text-neutral-400 uppercase">
              The Atelier Catalog
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171717] tracking-tight">
              Curated Collections
            </h2>
            <p className="text-sm sm:text-base text-neutral-500 font-normal leading-relaxed">
              From heirloom newborn keepsakes to vintage celebration reserves, discover gift hampers crafted with uncompromising attention to detail.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Pill Filter Bar */}
        <ScrollReveal delay={80} distance={12}>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase transition-smooth ${
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
        </ScrollReveal>

        {/* Search, Sort, and Item Count Controls Bar */}
        <ScrollReveal delay={120} distance={12}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-black/[0.04]">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by keyword..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-neutral-200/80 rounded-full text-xs font-normal text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-400 transition-colors"
              />
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto text-xs text-neutral-500 font-normal">
              <span>Showing {filteredAndSortedProducts.length} of {products.length} hampers</span>

              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3 h-3 text-neutral-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-neutral-200/80 rounded-full px-3 py-1.5 text-xs text-neutral-700 focus:outline-none focus:border-neutral-400 cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Empty State */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-neutral-200/60 p-8 space-y-3">
            <p className="font-serif text-2xl text-neutral-800 font-normal">No hampers match your filters</p>
            <p className="text-xs text-neutral-400">Try clearing your search query or selecting "All Hampers".</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-6 py-2.5 rounded-full bg-[#171717] text-white text-xs font-medium uppercase tracking-wider mt-2"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Spacious Multi-Column Responsive Grid with Smooth Card Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredAndSortedProducts.map((product, index) => (
            <ScrollReveal 
              key={product.id} 
              delay={(index % 3) * 80} 
              distance={20}
              className="h-full"
            >
              <div
                onClick={() => onQuickView(product)}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-neutral-300 transition-smooth cursor-pointer flex flex-col justify-between group h-full"
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
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#171717] group-hover:text-neutral-700 transition-colors leading-snug">
                      {product.name}
                    </h3>
                    
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
            </ScrollReveal>
          ))}
        </div>

      </div>
    </div>
  );
}
