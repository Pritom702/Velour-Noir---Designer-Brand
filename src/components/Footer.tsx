import React from "react";
import { useApp } from "../context/AppContext";
import { Link } from "react-router-dom";

export function Footer() {
  const { isFr } = useApp();
  
  return (
    <footer className="bg-noir border-t border-white/10 pt-24 pb-12 px-6 md:px-12 text-center md:text-left">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
        <div className="flex flex-col items-center md:items-start space-y-6">
            <div className="font-accent text-2xl tracking-[0.3em] uppercase text-bone">Velour Noir</div>
            <div className="font-body text-xs text-ash font-light uppercase tracking-widest">Paris, France · Depuis 1947</div>
        </div>
        <div className="grid grid-cols-2 gap-16 font-body font-light text-xs tracking-widest uppercase text-ash">
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-gold transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Pinterest</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Spotify</a></li>
            </ul>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-gold transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Contact</a></li>
              <li><Link to="/login" className="hover:text-gold transition-colors block mt-4">Admin Access</Link></li>
            </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24 border-t border-white/5 pt-8 flex justify-center items-center font-body text-[10px] text-white/30 uppercase tracking-[0.3em]">
        &copy; {new Date().getFullYear()} Velour Noir. {isFr ? "Tous droits réservés." : "All rights reserved."}
      </div>
    </footer>
  );
}
