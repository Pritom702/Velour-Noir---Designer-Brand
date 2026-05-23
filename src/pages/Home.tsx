import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const testimonials = [
  { text: "I have worn couture for thirty years. VELOUR NOIR is the only house that made me feel, not dressed.", author: "Amélie D., Paris" },
  { text: "The Cendre coat arrived wrapped in black tissue. I have not opened it in two weeks. I am not ready.", author: "Soraya K., Dubai" },
  { text: "They do not make clothing. They construct moods.", author: "James R., London" },
  { text: "Silence is expensive. Worth every centime.", author: "Elena V., Milan" }
];

import { Image } from "../components/Image";

export default function Home() {
  const { isFr, currency, addToCart, products } = useApp();
  const [testimonyIdx, setTestimonyIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setTestimonyIdx((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[100] bg-noir flex flex-col items-center justify-center text-bone"
          >
            <div className="font-accent text-2xl tracking-[0.4em] mb-4 overflow-hidden">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                VELOUR NOIR
              </motion.div>
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
              className="h-[1px] bg-gold"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="bg-noir text-bone overflow-hidden">
        {/* Sticky CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>
        <Link 
          to="/collections"
          className="fixed bottom-8 right-8 z-20 bg-obsidian border border-gold/40 px-6 py-4 font-accent uppercase tracking-widest text-xs text-bone hover:bg-gold hover:text-noir transition-colors shadow-2xl backdrop-blur-md"
        >
          {isFr ? "Découvrir" : "Discover"}
        </Link>
        </motion.div>

        {/* Hero Section */}
        <section className="relative w-full h-screen flex flex-col justify-center items-center mb-16 md:mb-32">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-10 mix-blend-screen pointer-events-none" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[60vw] h-[70vh] border border-gold opacity-15 rotate-[-3deg] pointer-events-none" />
           <div className="text-center z-10 relative mt-16 px-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.8 }} className="font-accent tracking-[0.4em] text-xs text-ash mb-6 uppercase">
                {isFr ? "La Nouvelle" : "The New"}
              </motion.div>
              <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3, duration: 2 }} className="font-display text-5xl md:text-9xl italic font-light tracking-tight mb-8">
                COLLECTION
              </motion.h1>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }} className="font-accent tracking-[0.2em] text-sm text-mist border-b border-mist/30 pb-2 inline-block">
                {isFr ? "Automne · Hiver 2025" : "Autumn · Winter 2025"}
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }} className="mt-12 font-body text-[10px] tracking-widest text-ash/60 uppercase">
                PARIS · MILAN · NEW YORK
              </motion.div>
           </div>
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5, duration: 1 }}
             className="absolute bottom-16 animate-bounce text-white/30"
           >
             <ArrowDown className="w-5 h-5" />
           </motion.div>
           <div className="absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t from-noir to-transparent pointer-events-none" />
        </section>

        {/* Editorial Statement */}
        <section className="py-24 md:py-48 px-6 md:px-12 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5 }}
              className="max-w-3xl text-center space-y-12"
            >
              <p className="font-display text-2xl md:text-4xl italic text-mist leading-relaxed break-words">
                "{isFr ? "Il y a des vêtements qui habillent le corps, et d'autres qui exposent l'âme." : "There are garments that clothe the body, and garments that expose the soul."}"
              </p>
              <p className="font-body text-sm text-ash font-light tracking-wide leading-loose">
                {isFr ? "VELOUR NOIR est né de ce silence. Un murmure audacieux, tissé d'ombres, façonné par les mains des artisans les plus obsédés de Paris. Ce n'est pas de la mode. C'est de l'architecture pour le corps humain." : "VELOUR NOIR was born from the silence between the two. A bold whisper, woven from shadows, framed by the hands of the most obsessed artisans in Paris. This is not fashion. It is architecture for the human form."}
              </p>
            </motion.div>
        </section>

        {/* Collections Grid */}
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-6">
                <div>
                  <h2 className="font-accent uppercase tracking-[0.3em] text-sm text-ash mb-4 px-1">{isFr ? "Chapitres" : "Chapters"}</h2>
                  <h3 className="font-display text-4xl md:text-5xl italic text-gold">The Collections</h3>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {[
                 { name: isFr ? "Prêt-à-Porter" : "Ready-to-Wear", filterCat: "Ready-to-Wear", code: "C.01", image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1500&auto=format&fit=crop" },
                 { name: isFr ? "Couture" : "Haute Couture", filterCat: "Haute Couture", code: "C.02", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1500&auto=format&fit=crop" },
                 { name: isFr ? "Horlogerie" : "Timepieces", filterCat: "Timepieces", code: "C.03", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1500&auto=format&fit=crop" },
                 { name: isFr ? "Joaillerie" : "Fine Jewellery", filterCat: "Fine Jewellery", code: "C.04", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=2000" },
                 { name: isFr ? "Parfums" : "Perfumes", filterCat: "Perfumes", code: "C.05", image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=2000" },
                 { name: isFr ? "Accessoires" : "Accessories", filterCat: "Accessories", code: "C.06", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=2000" }
               ].map((cat, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.2 }}
                   className="group relative aspect-square md:aspect-[4/3] bg-obsidian overflow-hidden border border-white/5 hover:border-gold/30 transition-colors duration-500 flex flex-col justify-end p-8"
                 >
                   <Image src={cat.image} fallbackText={cat.name} className="absolute inset-0 w-full h-full object-cover grayscale opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/60 to-transparent z-10" />
                   
                   <div className="relative z-20">
                     <span className="font-accent tracking-[0.2em] text-[10px] text-gold mb-2 block">{cat.code}</span>
                     <h4 className="font-display text-3xl italic text-mist mb-4">{cat.name}</h4>
                     <Link to={`/collections?category=${encodeURIComponent(cat.filterCat)}`} className="flex items-center space-x-4 text-xs font-accent tracking-widest uppercase text-ash group-hover:text-bone transition-colors w-fit">
                       <span>{isFr ? "Explorer" : "Explore"}</span>
                       <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                     </Link>
                   </div>
                 </motion.div>
               ))}
            </div>
        </section>

        {/* Featured Showcase Horizontal Scroll */}
        <section className="py-32 overflow-hidden bg-obsidian border-y border-white/5">
          <div className="max-w-[100rem] mx-auto px-6 md:px-12">
             <div className="flex justify-between items-center mb-16">
                <h3 className="font-display text-4xl italic text-mist">Vestiaire Intime</h3>
                <Link to="/collections" className="font-accent tracking-[0.2em] text-xs text-ash hover:text-gold transition-colors hidden md:block">
                  {isFr ? "Voir tout →" : "View All →"}
                </Link>
             </div>
             
             <div className="flex gap-8 overflow-x-auto hide-scrollbar pb-16 pt-8 snap-x snap-mandatory" style={{ WebkitOverflowScrolling: 'touch' }}>
                {products.map((prod, i) => (
                   <motion.div 
                     key={prod.id}
                     initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }}
                     className="min-w-[280px] md:min-w-[360px] snap-center shrink-0 flex flex-col glow-card p-6 bg-noir border border-white/5"
                   >
                     <Link to={`/product/${prod.id}`} className="block aspect-[3/4] w-full bg-obsidian mb-6 overflow-hidden relative group">
                        <Image src={prod.image} fallbackText={prod.name} className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" alt={prod.name} />
                     </Link>
                     <div className="flex flex-col flex-1">
                        <span className="font-accent tracking-widest text-[10px] text-ash uppercase mb-2">{prod.cat}</span>
                        <Link to={`/product/${prod.id}`}><h4 className="font-display text-2xl italic text-bone mb-6 hover:text-gold transition-colors">{prod.name}</h4></Link>
                        <div className="mt-auto flex items-center justify-between">
                           <span className="font-body text-mist text-lg font-light tracking-wide">{currency === 'EUR' ? '€' : '$'}{prod.price}</span>
                           <button 
                             onClick={() => addToCart(prod)}
                             className="text-xs font-accent tracking-widest text-gold uppercase hover:text-bone transition-colors"
                           >
                             {isFr ? "Ajouter" : "Add to Atelier"}
                           </button>
                        </div>
                     </div>
                   </motion.div>
                ))}
             </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-48 relative border-b border-white/10 flex justify-center text-center px-4">
           <div className="max-w-4xl space-y-12 z-10 relative">
             <div className="w-16 h-16 mx-auto border border-gold flex items-center justify-center font-display italic text-2xl text-gold mb-16">
               VN
             </div>
             <h2 className="font-display text-4xl md:text-6xl italic text-mist leading-tight">
               {isFr ? "Le luxe ne se possède pas." : "Luxury is not owned."}<br/>
               <span className="text-bone">{isFr ? "Il s'habite." : "It is inhabited."}</span>
             </h2>
           </div>
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-display text-[20vw] italic text-white/[0.02] pointer-events-none whitespace-nowrap">
             NOIR
           </div>
        </section>

        {/* Press */}
        <section className="py-24 border-b border-white/10 bg-noir">
           <div className="max-w-7xl mx-auto px-6">
             <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-1000">
               {["VOGUE", "HARPER'S BAZAAR", "LE FIGARO", "NUMÉRO", "DAZED"].map(press => (
                 <span key={press} className="font-display text-xl md:text-3xl tracking-widest uppercase">{press}</span>
               ))}
             </div>
           </div>
        </section>

        {/* Testimonials */}
        <section className="py-32 bg-obsidian flex justify-center text-center px-6">
          <div className="max-w-3xl w-full min-h-[250px] flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonyIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1 }}
                className="space-y-8"
              >
                <p className="font-display text-2xl md:text-4xl italic text-mist leading-relaxed break-words">
                  "{testimonials[testimonyIdx].text}"
                </p>
                <div className="font-accent text-xs tracking-widest text-gold uppercase before:content-['—'] before:mr-4">
                  {testimonials[testimonyIdx].author}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Newsletter & Boutiques */}
        <section id="boutiques" className="py-32 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-24 max-w-7xl mx-auto">
           <div>
             <h3 className="font-accent tracking-[0.3em] text-xs text-ash uppercase mb-6">{isFr ? "L'Agenda Privé" : "The Private Register"}</h3>
             <p className="font-body text-mist text-lg font-light leading-relaxed mb-12">
               {isFr ? "Inscrivez-vous pour être informé des pièces en édition limitée et des ouvertures d'archives secrètes." : "Subscribe to be notified of limited edition acquisitions and secret archive openings."}
             </p>
             <form className="flex border-b border-white/20 pb-4 focus-within:border-gold transition-colors" onSubmit={(e) => { e.preventDefault(); alert(isFr ? "Bienvenue." : "Welcome."); (e.target as HTMLFormElement).reset(); }}>
                <input type="email" placeholder={isFr ? "Entrez votre email" : "Enter your email address"} className="bg-transparent w-full font-body text-bone outline-none italic placeholder-white/30" required />
                <button type="submit" className="font-accent tracking-widest uppercase text-xs hover:text-gold transition-colors">
                  {isFr ? "Soumettre" : "Submit"}
                </button>
             </form>
           </div>
           <div>
             <h3 className="font-accent tracking-[0.3em] text-xs text-ash uppercase mb-8">{isFr ? "Les Maisons" : "The Boutiques"}</h3>
             <ul className="space-y-8 font-display italic text-2xl text-mist">
               <li className="flex justify-between items-end border-b border-white/5 pb-4 group cursor-none">
                 <span className="group-hover:text-gold transition-colors">Paris</span>
                 <span className="font-body text-xs font-light text-ash not-italic uppercase tracking-widest">31 Rue Cambon</span>
               </li>
               <li className="flex justify-between items-end border-b border-white/5 pb-4 group cursor-none">
                 <span className="group-hover:text-gold transition-colors">Milan</span>
                 <span className="font-body text-xs font-light text-ash not-italic uppercase tracking-widest">Via Monte Napoleone</span>
               </li>
               <li className="flex justify-between items-end border-b border-white/5 pb-4 group cursor-none">
                 <span className="group-hover:text-gold transition-colors">New York</span>
                 <span className="font-body text-xs font-light text-ash not-italic uppercase tracking-widest">Madison Avenue</span>
               </li>
             </ul>
           </div>
        </section>
      </main>
    </>
  );
}
