import React, { useState } from 'react';
import { X, Check, Gift, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { buildableItems, ribbonOptions } from '../data/products';

export default function HamperBuilderModal({ isOpen, onClose, onAddCustomHamper }) {
  const [step, setStep] = useState(1);
  const [selectedBasket, setSelectedBasket] = useState({ name: 'Signature Handwoven Wicker', price: 850 });
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedRibbon, setSelectedRibbon] = useState(ribbonOptions[0]);
  const [giftNote, setGiftNote] = useState('');

  if (!isOpen) return null;

  const toggleItem = (item) => {
    if (selectedItems.some(i => i.id === item.id)) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const totalPrice = selectedBasket.price + selectedItems.reduce((sum, i) => sum + i.price, 0);

  const handleFinish = () => {
    const customHamper = {
      id: `custom-${Date.now()}`,
      name: `Bespoke Hamper (${selectedBasket.name})`,
      price: totalPrice,
      formattedPrice: `₹${totalPrice.toLocaleString()}`,
      description: `Custom hamper with ${selectedItems.length} curated treats, tied with ${selectedRibbon}.`,
      image: '/images/hero_hamper.jpg',
      badge: 'CUSTOM',
      badgeType: 'gold',
      quantity: 1
    };
    onAddCustomHamper(customHamper);
    onClose();
  };

  const baskets = [
    { name: 'Signature Handwoven Wicker', price: 850, desc: 'Classic woven willow hamper with brass clasp' },
    { name: 'Matte Emerald Executive Box', price: 700, desc: 'Sleek dark green box with magnetic closure' },
    { name: 'Luxury Burgundy Velvet Trunk', price: 1100, desc: 'Sumptuous lined trunk for heirloom keepsakes' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
      />

      <div className="relative max-w-3xl mx-auto bg-[#FFFDF8] rounded-3xl border border-[#153D32]/10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-[#153D32] text-[#FFFDF8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <h2 className="font-serif text-2xl font-semibold">Build Your Custom Hamper</h2>
              <p className="text-xs text-[#FFFDF8]/70">Step {step} of 3</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#FFFDF8]/70 hover:text-[#FFFDF8] hover:bg-[#1E5042] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Step Indicator */}
        <div className="bg-[#F9F6F0] px-6 py-3 border-b border-[#153D32]/10 flex items-center justify-between text-xs font-semibold text-[#153D32]">
          <span className={step >= 1 ? 'text-[#B78A45]' : 'opacity-40'}>1. Choose Basket Base</span>
          <span>→</span>
          <span className={step >= 2 ? 'text-[#B78A45]' : 'opacity-40'}>2. Select Artisan Treats</span>
          <span>→</span>
          <span className={step >= 3 ? 'text-[#B78A45]' : 'opacity-40'}>3. Ribbon & Note</span>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-semibold text-[#153D32]">Select your preferred hamper basket</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {baskets.map((b) => (
                  <div
                    key={b.name}
                    onClick={() => setSelectedBasket(b)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      selectedBasket.name === b.name
                        ? 'bg-[#153D32] text-[#FFFDF8] border-[#B78A45] shadow-lg'
                        : 'bg-[#F9F6F0] text-[#153D32] border-[#153D32]/10 hover:border-[#B78A45]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Gift className={`w-5 h-5 ${selectedBasket.name === b.name ? 'text-[#D4AF37]' : 'text-[#B78A45]'}`} />
                      <span className="text-xs font-bold font-mono">₹{b.price}</span>
                    </div>
                    <h4 className="font-serif text-lg font-semibold leading-tight">{b.name}</h4>
                    <p className={`text-xs mt-2 ${selectedBasket.name === b.name ? 'text-[#FFFDF8]/70' : 'text-[#6E756B]'}`}>
                      {b.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-semibold text-[#153D32]">Pick gourmet artisan items to fill your hamper</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {buildableItems.map((item) => {
                  const isSelected = selectedItems.some(i => i.id === item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item)}
                      className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#153D32]/5 border-[#153D32] text-[#153D32]'
                          : 'bg-[#F9F6F0] border-[#153D32]/5 hover:border-[#B78A45]'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] font-bold tracking-wider text-[#B78A45] uppercase">{item.category}</span>
                        <h4 className="font-serif text-base font-semibold">{item.name}</h4>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold">₹{item.price}</span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'bg-[#153D32] border-[#153D32] text-white' : 'border-[#153D32]/30'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#153D32] mb-3">Choose finishing ribbon</h3>
                <div className="flex flex-wrap gap-3">
                  {ribbonOptions.map((r) => (
                    <button
                      key={r}
                      onClick={() => setSelectedRibbon(r)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
                        selectedRibbon === r
                          ? 'bg-[#153D32] text-[#FFFDF8] border-[#B78A45]'
                          : 'bg-[#F9F6F0] text-[#153D32] border-[#153D32]/10'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif text-xl font-semibold text-[#153D32] mb-2">Handwritten Gift Note (Optional)</h3>
                <textarea
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Write your personal message here. We will print it on a gold-embossed card..."
                  rows={3}
                  className="w-full bg-[#F9F6F0] border border-[#153D32]/10 rounded-2xl p-4 text-sm text-[#153D32] placeholder:text-[#6E756B] focus:outline-none focus:border-[#B78A45]"
                />
              </div>
            </div>
          )}

        </div>

        {/* Footer controls & price total */}
        <div className="p-6 bg-[#F9F6F0] border-t border-[#153D32]/10 flex items-center justify-between">
          <div>
            <span className="text-xs text-[#6E756B]">Calculated Total</span>
            <div className="font-serif text-2xl font-bold text-[#153D32]">₹{totalPrice.toLocaleString()}</div>
          </div>

          <div className="flex items-center gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 py-2.5 rounded-full border border-[#153D32]/20 text-xs font-semibold text-[#153D32] hover:bg-[#153D32]/5"
              >
                Back
              </button>
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="bg-[#153D32] hover:bg-[#1E5042] text-[#FFFDF8] px-6 py-2.5 rounded-full text-xs font-semibold transition-all flex items-center gap-2"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="bg-[#B78A45] hover:bg-[#D4AF37] text-[#153D32] font-bold px-6 py-2.5 rounded-full text-xs transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <span>Add Custom Hamper to Cart</span>
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
