import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Button } from "./ui/button";

export function Overlays() {
  const { cartOpen, setCartOpen, searchOpen, setSearchOpen, menuOpen, setMenuOpen, cartItems, subtotal, isFr, currency, lang, setLang, setCurrency, updateQuantity } = useApp();
  const [exitOpen, setExitOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('exitIntent')) return;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 0) {
        setExitOpen(true);
        sessionStorage.setItem('exitIntent', 'true');
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const handleLink = (path: string) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} className="fixed inset-0 bg-noir/80 backdrop-blur-sm z-50" />
             <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.4 }} className="fixed top-0 right-0 h-full w-full max-w-sm bg-obsidian border-l border-white/5 shadow-2xl z-50 flex flex-col pt-12">
                <div className="flex justify-between items-center px-8 mb-12">
                   <h2 className="font-accent uppercase tracking-[0.2em] text-sm">{isFr ? "Atelier" : "Atelier (Cart)"}</h2>
                   <button onClick={() => setCartOpen(false)} className="text-white/50 hover:text-white transition-colors">
                     <X className="w-5 h-5" />
                   </button>
                </div>
                <div className="flex-1 overflow-y-auto px-8 space-y-8">
                   {cartItems.length === 0 ? (
                     <p className="font-body text-ash text-sm font-light text-center mt-12">{isFr ? "Votre panier est vide." : "Your atelier is empty."}</p>
                   ) : (
                     cartItems.map((item) => (
                       <div key={item.id} className="flex justify-between items-center border-b border-white/5 pb-4">
                          <div className="space-y-2">
                             <h3 className="font-display text-lg text-bone italic">{item.name}</h3>
                             <p className="font-body text-xs text-ash tracking-widest uppercase">{currency === 'EUR' ? '€' : '$'}{item.price}</p>
                          </div>
                          <div className="flex items-center space-x-4">
                             <button onClick={() => updateQuantity(item.id, -1)} className="text-ash hover:text-gold">-</button>
                             <span className="font-body text-sm">{item.quantity}</span>
                             <button onClick={() => updateQuantity(item.id, 1)} className="text-ash hover:text-gold">+</button>
                          </div>
                       </div>
                     ))
                   )}
                </div>
                <div className="p-8 border-t border-white/5 bg-noir mt-auto">
                   <div className="flex justify-between font-accent text-sm tracking-[0.1em] mb-6">
                      <span>{isFr ? "Sous-total" : "Subtotal"}</span>
                      <span>{currency === 'EUR' ? '€' : '$'}{subtotal}</span>
                   </div>
                   <button onClick={() => { setCartOpen(false); navigate('/checkout'); }} className="w-full bg-gold text-noir font-accent uppercase tracking-[0.2em] text-xs py-4 hover:bg-bone transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={cartItems.length === 0}>
                     {isFr ? "Finaliser la commande" : "Proceed to Checkout"}
                   </button>
                </div>
             </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-noir/95 backdrop-blur-md z-50 flex flex-col justify-center items-center px-6">
            <button onClick={() => setSearchOpen(false)} className="absolute top-12 right-12 text-white/50 hover:text-white transition-colors">
              <X className="w-8 h-8" />
            </button>
            <div className="w-full max-w-2xl">
              <div className="relative border-b border-white/20 pb-4 mb-8">
                <input autoFocus type="text" placeholder={isFr ? "Rechercher..." : "Search collections..."} className="w-full bg-transparent font-display text-3xl md:text-5xl text-bone placeholder-white/20 outline-none italic" />
                <Search className="absolute right-0 bottom-4 w-6 h-6 text-white/50" />
              </div>
              <div className="space-y-4">
                 <p className="font-accent tracking-[0.2em] text-xs text-ash uppercase">{isFr ? "Suggestions" : "Suggested searches"}</p>
                 <div className="flex flex-wrap gap-4">
                    {["Trench Coat", "Fine Jewellery", "Watches", "Cartier"].map(t => (
                      <button key={t} className="font-body font-light text-sm border border-white/10 px-4 py-2 hover:border-gold hover:text-gold transition-colors" onClick={() => { setSearchOpen(false); navigate('/collections'); }}>
                        {t}
                      </button>
                    ))}
                 </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex">
            {/* Sidebar */}
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: "tween", duration: 0.4, ease: "easeOut" }} className="w-full sm:w-[500px] h-full bg-obsidian border-r border-white/5 flex flex-col relative shadow-2xl">
               {/* Header */}
               <div className="flex items-center px-6 h-[80px]">
                 <button onClick={() => setMenuOpen(false)} className="text-white/50 p-2 -ml-2 hover:bg-white/5 hover:text-white rounded-md transition-colors">
                   <X className="w-6 h-6" strokeWidth={1} />
                 </button>
               </div>
               
               <div className="mx-6 border-t border-white/5"></div>

               {/* Links */}
               <div className="flex-1 overflow-y-auto relative pb-28 pt-6">
                 <div className="flex flex-col space-y-1 pl-2 pr-6">
                   {/* Main Links */}
                   <Button variant="ghost" className="w-full flex justify-between items-center py-8 px-4 text-[#f03b6e] hover:bg-white/5 hover:text-[#f03b6e] group rounded-none" onClick={() => handleLink('/maison')}>
                     <span className="font-display italic text-3xl font-light">{isFr ? "Maison" : "Maison"}</span>
                     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[#f03b6e]">
                       <path d="m9 18 6-6-6-6"/>
                     </svg>
                   </Button>
                   
                   <Button variant="ghost" className="w-full flex justify-between items-center py-8 px-4 text-bone/80 hover:bg-white/5 hover:text-bone group rounded-none" onClick={() => handleLink('/collections')}>
                     <span className="font-display italic text-3xl font-light">{isFr ? "Collections" : "Collections"}</span>
                     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 group-hover:text-white/70 transition-colors">
                       <path d="m9 18 6-6-6-6"/>
                     </svg>
                   </Button>

                   <Button variant="ghost" className="w-full flex justify-between items-center py-8 px-4 text-bone/80 hover:bg-white/5 hover:text-bone group rounded-none" onClick={() => { setMenuOpen(false); setCartOpen(true); }}>
                     <span className="font-display italic text-3xl font-light">{isFr ? "Atelier" : "Atelier"}</span>
                     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 group-hover:text-white/70 transition-colors">
                       <path d="m9 18 6-6-6-6"/>
                     </svg>
                   </Button>

                   <Button variant="ghost" className="w-full flex justify-between items-center py-8 px-4 text-bone/80 hover:bg-white/5 hover:text-bone group rounded-none" onClick={() => { setMenuOpen(false); navigate('/'); setTimeout(() => { document.getElementById('boutiques')?.scrollIntoView({ behavior: 'smooth' }); }, 300); }}>
                     <span className="font-display italic text-3xl font-light">{isFr ? "Boutiques" : "Boutiques"}</span>
                     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 group-hover:text-white/70 transition-colors">
                       <path d="m9 18 6-6-6-6"/>
                     </svg>
                   </Button>
                   
                   <Button variant="ghost" className="w-full flex justify-between items-center py-8 px-4 text-bone/80 hover:bg-white/5 hover:text-bone group rounded-none" onClick={() => handleLink('/commitments')}>
                     <span className="font-display italic text-3xl font-light">{isFr ? "Nos Engagements" : "Our Commitments"}</span>
                     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 group-hover:text-white/70 transition-colors">
                       <path d="m9 18 6-6-6-6"/>
                     </svg>
                   </Button>

                   {/* Line Dividers */}
                   <div className="mt-8 mb-4">
                     <div className="mx-4 border-t border-white/5"></div>
                   </div>

                   {/* Retained language/currency features seamlessly integrated */}
                   <div className="flex justify-between items-center px-4 py-8 text-bone/80">
                     <span className="font-accent tracking-[0.2em] text-xs uppercase">{isFr ? "Préférences" : "Preferences"}</span>
                     <div className="flex items-center gap-4 text-xs font-accent tracking-widest">
                       <button onClick={() => setLang(lang === 'FR' ? 'EN' : 'FR')} className="hover:text-gold uppercase transition-colors">{lang}</button>
                       <span className="text-white/20">|</span>
                       <button onClick={() => setCurrency(currency === 'EUR' ? 'USD' : 'EUR')} className="hover:text-gold uppercase transition-colors">{currency}</button>
                     </div>
                   </div>

                 </div>
               </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exit Intent Modal */}
      <AnimatePresence>
        {exitOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-noir/90 backdrop-blur-md z-[60] flex justify-center items-center px-4">
             <div className="bg-obsidian border border-gold/30 p-12 max-w-lg w-full text-center relative">
                <button onClick={() => setExitOpen(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">
                  <X className="w-5 h-5"/>
                </button>
                <h3 className="font-display text-3xl italic mb-4">{isFr ? "Ne partez pas en silence." : "Do not leave in silence."}</h3>
                <p className="font-body text-sm font-light text-ash mb-8">
                  {isFr ? "Rejoignez le monde confidentiel de VELOUR NOIR. Accédez à nos collections privées." : "Join the confidential world of VELOUR NOIR. Gain access to private collections."}
                </p>
                <div className="flex flex-col space-y-4">
                  <input type="email" placeholder={isFr ? "Votre email" : "Your email address"} className="bg-noir border border-white/20 p-4 font-body text-sm text-bone outline-none focus:border-gold transition-colors text-center" />
                  <button onClick={() => setExitOpen(false)} className="bg-gold text-noir font-accent uppercase tracking-[0.2em] text-xs py-4 hover:bg-bone transition-colors">
                    {isFr ? "Pénétrer la sélection" : "Enter the selection"}
                  </button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
