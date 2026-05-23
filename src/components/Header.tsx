import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Search, Menu, User as UserIcon } from "lucide-react";
import { useApp } from "../context/AppContext";

export function Header() {
  const { setCartOpen, setSearchOpen, setMenuOpen, cartItems, lang, setLang, currency, setCurrency, user } = useApp();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-30 transition-all duration-500 border-b border-transparent ${scrolled ? 'bg-noir/80 backdrop-blur-lg border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <button onClick={() => setMenuOpen(true)} className="text-bone hover:text-gold transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden lg:flex items-center space-x-4 font-accent text-[10px] tracking-widest text-ash">
            <div className="flex space-x-4 pr-4 border-r border-white/20">
              <button className={`${lang === 'EN' ? 'text-bone' : ''} hover:text-gold transition-colors`} onClick={() => setLang('EN')}>EN</button>
              <button className={`${lang === 'FR' ? 'text-bone' : ''} hover:text-gold transition-colors`} onClick={() => setLang('FR')}>FR</button>
            </div>
            <div className="flex space-x-4">
              <button className={`${currency === 'EUR' ? 'text-bone' : ''} hover:text-gold transition-colors`} onClick={() => setCurrency('EUR')}>EUR</button>
              <button className={`${currency === 'USD' ? 'text-bone' : ''} hover:text-gold transition-colors`} onClick={() => setCurrency('USD')}>USD</button>
            </div>
          </div>
        </div>
        
        <Link to="/" className="font-accent text-xl md:text-2xl lg:text-2xl tracking-[0.3em] uppercase absolute left-1/2 -translate-x-1/2 text-bone hover:text-gold transition-colors">
          Velour Noir
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link to={user?.role === 'admin' ? "/admin" : "/login"} className="text-bone hover:text-gold transition-colors flex items-center space-x-2">
            <UserIcon className="w-5 h-5" />
            <span className="hidden md:inline font-accent text-[10px] tracking-widest uppercase">{user ? user.username : 'LOGIN'}</span>
          </Link>
          <button onClick={() => setSearchOpen(true)} className="text-bone hover:text-gold transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button onClick={() => setCartOpen(true)} className="text-bone hover:text-gold transition-colors relative">
            <ShoppingBag className="w-5 h-5" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-noir text-[9px] font-accent w-4 h-4 rounded-full flex items-center justify-center">
                {cartItems.reduce((a,c) => a + c.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
