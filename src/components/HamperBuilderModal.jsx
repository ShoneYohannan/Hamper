import React, { useState } from 'react';
import { X, Check, Gift, ArrowRight, ArrowLeft } from 'lucide-react';
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
      badge: 'BESPOKE',
      badgeType: 'gold',
      quantity: 1
    };
    onAddCustomHamper(customHamper);
    onClose();
  };

  const baskets = [
    { name: 'Signature Handwoven Wicker', price: 850, desc: 'Classic woven willow hamper with brass clasp' },
    { name: 'Matte Charcoal Executive Trunk', price: 950, desc: 'Sleek luxury dark trunk with brushed hardware' },
    { name: 'Pastel Keepsake Nursery Basket', price: 750, desc: 'Soft-lined keepsake basket for baby arrivals' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
      />

      <div className="relative max-w-3xl mx-auto bg-white rounded-3xl border border-neutral-200/80 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-normal text-neutral-900">Bespoke Hamper Studio</h2>
            <p className="text-xs text-neutral-400 font-normal">Step {step} of 3</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wizard Step Indicator */}
        <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-100 flex items-center justify-between text-xs font-medium text-neutral-400">
          <span className={step >= 1 ? 'text-neutral-900' : ''}>1. Basket Base</span>
          <span>→</span>
          <span className={step >= 2 ? 'text-neutral-900' : ''}>2. Curated Inclusions</span>
          <span>→</span>
          <span className={step >= 3 ? 'text-neutral-900' : ''}>3. Ribbon & Card</span>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-normal text-neutral-900">Choose your foundation</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {baskets.map((b) => (
                  <div
                    key={b.name}
                    onClick={() => setSelectedBasket(b)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      selectedBasket.name === b.name
                        ? 'bg-[#171717] text-white border-[#171717] shadow-sm'
                        : 'bg-neutral-50/70 text-neutral-900 border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <Gift className={`w-4 h-4 ${selectedBasket.name === b.name ? 'text-white' : 'text-neutral-500'}`} />
                      <span className="text-xs font-medium">₹{b.price}</span>
                    </div>
                    <h4 className="font-serif text-base font-normal leading-snug">{b.name}</h4>
                    <p className={`text-xs mt-2 leading-relaxed ${selectedBasket.name === b.name ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {b.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-normal text-neutral-900">Select artisan treats & keepsakes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {buildableItems.map((item) => {
                  const isSelected = selectedItems.some(i => i.id === item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item)}
                      className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-neutral-100 border-[#171717] text-neutral-900'
                          : 'bg-neutral-50/60 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] font-medium tracking-wider text-neutral-400 uppercase">{item.category}</span>
                        <h4 className="font-serif text-sm font-normal text-neutral-900">{item.name}</h4>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-neutral-700">₹{item.price}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'bg-[#171717] border-[#171717] text-white' : 'border-neutral-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-white" />}
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
                <h3 className="font-serif text-xl font-normal text-neutral-900 mb-3">Finishing silk ribbon</h3>
                <div className="flex flex-wrap gap-2.5">
                  {ribbonOptions.map((r) => (
                    <button
                      key={r}
                      onClick={() => setSelectedRibbon(r)}
                      className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide border transition-all ${
                        selectedRibbon === r
                          ? 'bg-[#171717] text-white border-[#171717]'
                          : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif text-xl font-normal text-neutral-900 mb-2">Handwritten Gift Note (Optional)</h3>
                <textarea
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  placeholder="Write your personal message. We will transcribe it onto letterpress stationery..."
                  rows={3}
                  className="w-full bg-neutral-50/70 border border-neutral-200 rounded-xl p-4 text-xs font-normal text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900"
                />
              </div>
            </div>
          )}

        </div>

        {/* Footer controls & price total */}
        <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider">Calculated Total</span>
            <div className="font-serif text-2xl font-normal text-neutral-900">₹{totalPrice.toLocaleString()}</div>
          </div>

          <div className="flex items-center gap-3">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-full border border-neutral-300 text-xs font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                Back
              </button>
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="bg-[#171717] hover:bg-neutral-800 text-white px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="bg-[#171717] hover:bg-neutral-800 text-white px-7 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm active:scale-95"
              >
                <span>Add Bespoke Hamper to Basket</span>
                <Check className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
