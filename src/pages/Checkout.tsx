import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Checkout() {
  const { isFr, cartItems, subtotal, currency, clearCart, user } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
    else if (step === 2) {
      clearCart();
      setStep(3);
    }
  };

  if (!user && cartItems.length > 0) {
    return (
      <div className="min-h-screen bg-noir flex items-center justify-center pt-32 text-center text-mist px-6">
        <div className="max-w-md w-full bg-obsidian border border-white/10 p-12 glow-card">
          <h2 className="font-display text-4xl italic mb-6">Login Required</h2>
          <p className="font-body text-ash text-sm mb-8">
            {isFr ? "Veuillez vous connecter pour finaliser votre achat." : "Please log in with your account to complete your purchase."}
          </p>
          <Link to="/login" className="block w-full text-center bg-gold text-noir py-4 uppercase font-accent text-xs tracking-widest hover:bg-bone transition-colors relative">
            {isFr ? "Aller à la connexion" : "Go to Login"}
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen bg-noir flex items-center justify-center pt-32 text-center text-mist px-6">
        <div>
          <h2 className="font-display text-4xl italic mb-6">Your atelier is empty.</h2>
          <button onClick={() => navigate('/collections')} className="text-gold uppercase tracking-widest font-accent text-xs">Return to Collections</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-noir pt-32 pb-24 px-6 md:px-12 text-bone">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Form area */}
        <div>
          <h2 className="font-display text-4xl italic text-mist mb-8">
            {step === 3 ? (isFr ? "Commande Confirmée" : "Order Confirmed") : (step === 1 ? (isFr ? "Livraison" : "Shipping") : (isFr ? "Paiement" : "Payment"))}
          </h2>
          
          {step === 3 ? (
            <div className="space-y-6">
              <p className="font-body text-ash font-light leading-relaxed">
                {isFr ? "Merci pour votre commande. Un email de confirmation vous a été envoyé." : "Thank you for your order. A confirmation email has been dispatched."}
              </p>
              <button onClick={() => navigate('/')} className="block w-full text-center bg-gold text-noir py-4 uppercase font-accent text-xs tracking-widest hover:bg-bone transition-colors">
                {isFr ? "Retour à la Maison" : "Return to Maison"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleCheckout} className="space-y-6">
              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-accent tracking-widest text-ash mb-2">First Name</label>
                      <input type="text" required className="w-full bg-obsidian border border-white/10 p-4 text-bone outline-none focus:border-gold" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-accent tracking-widest text-ash mb-2">Last Name</label>
                      <input type="text" required className="w-full bg-obsidian border border-white/10 p-4 text-bone outline-none focus:border-gold" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-accent tracking-widest text-ash mb-2">Email</label>
                    <input type="email" required className="w-full bg-obsidian border border-white/10 p-4 text-bone outline-none focus:border-gold" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-accent tracking-widest text-ash mb-2">Address</label>
                    <input type="text" required className="w-full bg-obsidian border border-white/10 p-4 text-bone outline-none focus:border-gold" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-accent tracking-widest text-ash mb-2">City</label>
                      <input type="text" required className="w-full bg-obsidian border border-white/10 p-4 text-bone outline-none focus:border-gold" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-accent tracking-widest text-ash mb-2">Postal Code</label>
                      <input type="text" required className="w-full bg-obsidian border border-white/10 p-4 text-bone outline-none focus:border-gold" />
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="mb-6 space-y-3">
                    <label className="flex items-center gap-4 p-4 border border-gold bg-gold/5 cursor-pointer">
                      <input type="radio" name="payment_method" value="card" defaultChecked className="accent-gold w-4 h-4" />
                      <span className="font-accent tracking-widest text-xs uppercase text-bone">{isFr ? "Carte de crédit / débit" : "Credit / Debit Card"}</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-accent tracking-widest text-ash mb-2">Card Number</label>
                    <input type="text" placeholder="XXXX XXXX XXXX XXXX" required className="w-full bg-obsidian border border-white/10 p-4 text-bone outline-none focus:border-gold" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase font-accent tracking-widest text-ash mb-2">Expiry Date</label>
                      <input type="text" placeholder="MM/YY" required className="w-full bg-obsidian border border-white/10 p-4 text-bone outline-none focus:border-gold" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-accent tracking-widest text-ash mb-2">CVV</label>
                      <input type="text" placeholder="123" required className="w-full bg-obsidian border border-white/10 p-4 text-bone outline-none focus:border-gold" />
                    </div>
                  </div>
                </>
              )}

              <button type="submit" className="w-full bg-gold text-noir py-5 uppercase font-accent text-xs tracking-widest hover:bg-bone transition-colors mt-8">
                {step === 1 ? (isFr ? "Continuer vers le paiement" : "Continue to Payment") : (isFr ? "Confirmer la commande" : "Confirm Order")}
              </button>
            </form>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-obsidian border border-white/5 p-8 h-fit">
          <h3 className="font-accent tracking-widest uppercase text-xs text-ash mb-8 border-b border-white/10 pb-4">
             {isFr ? "Résumé de la commande" : "Order Summary"}
          </h3>
          {step === 3 ? (
             <div className="text-center py-12 text-mist italic font-display text-2xl">
                {isFr ? "Commande finalisée" : "Order Complete"}
             </div>
          ) : (
            <div className="space-y-6 flex-1 max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 aspect-[3/4] bg-noir overflow-hidden shrink-0">
                    <img src={item.image} className="w-full h-full object-cover grayscale opacity-80" alt={item.name} />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="font-display italic text-lg text-bone leading-tight">{item.name}</h4>
                       <span className="font-body text-mist text-sm tabular-nums shrink-0 ml-4">{currency === 'EUR' ? '€' : '$'}{item.price}</span>
                    </div>
                    <span className="font-accent text-[10px] text-ash uppercase tracking-widest">Qty: {item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {step !== 3 && (
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex justify-between items-center mb-4 text-sm font-body text-mist">
                 <span>Subtotal</span>
                 <span>{currency === 'EUR' ? '€' : '$'}{subtotal}</span>
              </div>
              <div className="flex justify-between items-center mb-6 text-sm font-body text-mist">
                 <span>Shipping</span>
                 <span>{isFr ? "Complimentaire" : "Complimentary"}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-display italic text-gold">
                 <span>Total</span>
                 <span>{currency === 'EUR' ? '€' : '$'}{subtotal}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
