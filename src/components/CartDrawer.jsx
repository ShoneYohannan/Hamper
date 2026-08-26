import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

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
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF8] border-l border-[#153D32]/10 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-[#153D32]/10 flex items-center justify-between bg-[#F9F6F0]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#153D32]" />
              <h2 className="font-serif text-2xl font-semibold text-[#153D32]">Your Shopping Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#153D32]/60 hover:text-[#153D32] hover:bg-[#153D32]/5 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#153D32] text-[#FFFDF8] px-6 py-3 text-xs flex flex-col gap-1.5">
            <div className="flex items-center justify-between font-medium">
              <span>
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-[#D4AF37] font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4" /> You unlocked Free Luxury Delivery!
                  </span>
                ) : (
                  `Add ₹${(freeShippingThreshold - subtotal).toLocaleString()} more for Free Delivery`
                )}
              </span>
              <span>{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#0D2921] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#B78A45] to-[#D4AF37] transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-[#6E756B]">
                <div className="w-16 h-16 rounded-full bg-[#F9F6F0] flex items-center justify-center border border-[#153D32]/10">
                  <ShoppingBag className="w-8 h-8 text-[#B78A45]" />
                </div>
                <div>
                  <p className="font-serif text-xl font-semibold text-[#153D32]">Your cart is empty</p>
                  <p className="text-xs text-[#6E756B] mt-1">Explore our hampers to find the perfect gift.</p>
                </div>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-[#F9F6F0] border border-[#153D32]/5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover bg-stone-200"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-serif text-lg font-semibold text-[#153D32] leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#B78A45] font-semibold mt-0.5">
                          ₹{item.price.toLocaleString()} each
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#6E756B] hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#153D32]/20 rounded-full bg-[#FFFDF8]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-[#153D32] hover:text-[#B78A45] transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-[#153D32]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-[#153D32] hover:text-[#B78A45] transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="font-semibold text-sm text-[#153D32]">
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
            <div className="p-6 bg-[#F9F6F0] border-t border-[#153D32]/10 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-[#6E756B]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#153D32]">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-[#6E756B]">
                  <span>Estimated Taxes & Shipping</span>
                  <span className="text-[#B78A45] font-medium">Calculated at checkout</span>
                </div>
                <div className="flex items-center justify-between text-base font-bold text-[#153D32] pt-2 border-t border-[#153D32]/10">
                  <span>Total</span>
                  <span className="font-serif text-xl text-[#153D32]">₹{subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full bg-[#153D32] hover:bg-[#1E5042] text-[#FFFDF8] py-3.5 rounded-full font-medium text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Proceed to Luxury Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
