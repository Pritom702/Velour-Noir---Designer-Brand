import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useApp } from "../context/AppContext";
import { ArrowLeft } from "lucide-react";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFr, currency, addToCart, products } = useApp();
  const [qty, setQty] = React.useState(1);

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-noir flex items-center justify-center pt-32">
        <div className="text-center">
           <p className="font-display text-4xl italic text-mist mb-8">Product not found.</p>
           <button onClick={() => navigate('/collections')} className="font-accent text-xs tracking-widest text-gold uppercase hover:text-bone">Return to Collections</button>
        </div>
      </div>
    );
  }

  const otherProducts = products.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <main className="bg-noir text-bone min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <button onClick={() => navigate(-1)} className="flex items-center space-x-4 font-accent text-[10px] tracking-widest text-ash uppercase hover:text-gold transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" />
          <span>{isFr ? "Retour" : "Back"}</span>
        </button>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 mb-32">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="flex-1">
            <div className="aspect-[3/4] bg-obsidian relative overflow-hidden border border-white/5">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 hover:scale-105 transition-all duration-1000 ease-out" />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }} className="flex-1 flex flex-col justify-center">
            <span className="font-accent tracking-widest text-xs text-ash uppercase mb-4 block">{product.cat}</span>
            <h1 className="font-display text-4xl md:text-6xl italic text-bone mb-8">{product.name}</h1>
            <div className="font-body text-xl text-mist font-light tracking-wide mb-12">
              {currency === 'EUR' ? '€' : '$'}{product.price}
            </div>
            
            <p className="font-body text-sm text-ash font-light leading-loose max-w-md mb-16">
              {product.description}
            </p>

            <div className="flex items-center space-x-6 mb-8 border border-white/10 w-fit">
              <button 
                onClick={() => setQty(Math.max(1, qty - 1))} 
                className="px-4 py-3 text-ash hover:text-gold transition-colors font-body"
              >
                -
              </button>
              <span className="font-body text-bone min-w-[2ch] text-center">{qty}</span>
              <button 
                onClick={() => setQty(qty + 1)} 
                className="px-4 py-3 text-ash hover:text-gold transition-colors font-body"
              >
                +
              </button>
            </div>

            <button 
              onClick={() => addToCart(product, qty)}
              className="w-full max-w-sm bg-gold text-noir font-accent uppercase tracking-[0.2em] text-xs py-5 hover:bg-bone transition-colors"
            >
              {isFr ? "Ajouter à l'Atelier" : "Add to Atelier"}
            </button>

            <div className="mt-16 pt-8 border-t border-white/5 space-y-4">
              <div className="flex justify-between font-accent text-[10px] tracking-widest uppercase text-ash">
                <span>Shipping</span>
                <span className="text-mist">Complimentary</span>
              </div>
              <div className="flex justify-between font-accent text-[10px] tracking-widest uppercase text-ash">
                <span>Returns</span>
                <span className="text-mist">14 Days</span>
              </div>
              <div className="flex justify-between font-accent text-[10px] tracking-widest uppercase text-ash">
                <span>Packaging</span>
                <span className="text-mist">Signature Box</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Other Products */}
        <div className="border-t border-white/10 pt-24">
          <h3 className="font-display text-3xl italic text-mist mb-12 text-center">{isFr ? "Ces pièces pourraient vous intriguer" : "These pieces might intrigue you"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherProducts.map((prod, i) => (
              <motion.div 
                key={prod.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group border border-white/5 bg-obsidian p-4 glow-card flex flex-col"
              >
                <Link to={`/product/${prod.id}`} className="aspect-square bg-noir mb-6 overflow-hidden">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                </Link>
                <div className="px-2 pb-2 text-center">
                  <span className="font-accent tracking-[0.2em] text-[9px] text-ash uppercase mb-2 block">{prod.cat}</span>
                  <Link to={`/product/${prod.id}`}>
                    <h4 className="font-display text-xl italic text-bone mb-4 hover:text-gold transition-colors">{prod.name}</h4>
                  </Link>
                  <span className="font-body text-sm font-light text-mist">{currency === 'EUR' ? '€' : '$'}{prod.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link to="/collections" className="font-accent tracking-widest text-xs text-gold uppercase hover:text-bone transition-colors border-b border-gold/30 pb-1 hover:border-bone">
              {isFr ? "Voir la collection complète" : "View Complete Collection"}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
