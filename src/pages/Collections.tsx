import React, { useMemo } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Collections() {
  const { isFr, currency, addToCart, products } = useApp();

  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.cat)));
  }, []);

  return (
    <main className="bg-noir text-bone min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mb-24 text-center">
          <h1 className="font-display text-5xl md:text-7xl italic text-bone mb-6">Collections</h1>
          <p className="font-body text-ash font-light tracking-wide max-w-xl mx-auto">
            {isFr 
              ? "Une exploration de la forme, de la fonction et de l'absence de couleur. Chaque pièce est un manifeste silencieux."
              : "An exploration of form, function, and the absence of color. Every piece is a silent manifesto."}
          </p>
        </motion.div>

        {categories.map((cat, catIdx) => {
          const categoryProducts = products.filter(p => p.cat === cat);
          return (
            <div key={cat} className="mb-32">
              <div className="border-b border-white/10 pb-4 mb-12 flex items-end justify-between">
                <h2 className="font-display text-3xl italic text-mist">{cat}</h2>
                <span className="font-accent text-xs tracking-[0.2em] text-ash/50 uppercase">CH.{catIdx + 1}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryProducts.map((prod, i) => (
                  <motion.div 
                    key={prod.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="flex flex-col group block bg-obsidian border border-white/5 glow-card"
                  >
                    <Link to={`/product/${prod.id}`} className="block aspect-[3/4] w-full overflow-hidden relative">
                      <img src={prod.image} alt={prod.name} className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    </Link>
                    <div className="p-6 flex flex-col flex-1">
                      <Link to={`/product/${prod.id}`}>
                        <h3 className="font-display text-2xl italic text-bone mb-4 hover:text-gold transition-colors">{prod.name}</h3>
                      </Link>
                      <p className="font-body text-xs text-ash font-light leading-relaxed mb-6 flex-1 line-clamp-2">
                        {prod.description}
                      </p>
                      <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4">
                        <span className="font-body text-mist font-light tracking-wide">{currency === 'EUR' ? '€' : '$'}{prod.price}</span>
                        <button onClick={() => addToCart(prod)} className="text-[10px] font-accent tracking-widest text-gold uppercase hover:text-bone transition-colors">
                          {isFr ? "Ajouter" : "Add to Atelier"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
