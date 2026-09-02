import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const freeShippingThreshold = 5000;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-neutral-200/80 shadow-xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-neutral-800" />
              <h2 className="font-serif text-2xl font-normal text-neutral-900">Your Basket</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-100 text-xs flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-neutral-600 font-normal">
              <span>
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-emerald-700 font-medium">
                    Complimentary White-Glove Delivery unlocked
                  </span>
                ) : (
                  `Add ₹${(freeShippingThreshold - subtotal).toLocaleString()} more for Complimentary Delivery`
                )}
              </span>
              <span className="text-neutral-400">{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="w-full h-1 bg-neutral-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-neutral-900 transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-neutral-500">
                <div className="w-14 h-14 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-200/60">
                  <ShoppingBag className="w-6 h-6 text-neutral-400" />
                </div>
                <div>
                  <p className="font-serif text-xl font-normal text-neutral-900">Your basket is empty</p>
                  <p className="text-xs text-neutral-400 mt-1 font-normal">Explore our collections to select a hamper.</p>
                </div>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-neutral-50/60 border border-neutral-200/60">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-18 rounded-lg object-cover bg-neutral-100 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-serif text-base font-normal text-neutral-900 leading-snug">
                          {item.name}
                        </h4>
                        <p className="text-xs text-neutral-500 mt-0.5 font-normal">
                          ₹{item.price.toLocaleString()} each
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-3">
                      <div className="flex items-center border border-neutral-200 rounded-full bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-neutral-600 hover:text-neutral-900 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-medium text-neutral-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-neutral-600 hover:text-neutral-900 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-normal text-sm text-neutral-900">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout button */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-neutral-50/50 border-t border-neutral-100 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-neutral-500 font-normal">
                  <span>Subtotal</span>
                  <span className="font-medium text-neutral-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-500 font-normal">
                  <span>Standard Shipping</span>
                  <span className="text-neutral-700 font-medium">Calculated at checkout</span>
                </div>
                <div className="flex items-center justify-between text-sm font-medium text-neutral-900 pt-2 border-t border-neutral-200/60">
                  <span>Estimated Total</span>
                  <span className="text-base font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full bg-[#171717] hover:bg-neutral-800 text-white py-3.5 rounded-full text-xs font-medium uppercase tracking-[0.14em] transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
