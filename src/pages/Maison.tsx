import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export default function Maison() {
  const { isFr } = useApp();

  return (
    <div className="min-h-screen bg-obsidian pt-40 pb-24 px-6 md:px-12 text-bone">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-display italic text-5xl md:text-7xl mb-12"
        >
          {isFr ? "La Maison" : "The House"}
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8 font-body text-ash leading-relaxed text-sm max-w-2xl mx-auto"
        >
          <p>
            {isFr 
              ? "Fondée à Paris, notre Maison incarne l'élégance intemporelle et la quête incessante de l'excellence dans l'artisanat de luxe." 
              : "Founded in Paris, our House embodies timeless elegance and a relentless pursuit of excellence in luxury craftsmanship."}
          </p>
          <p>
            {isFr 
              ? "Chaque création est une ode à la beauté, fusionnant des techniques traditionnelles avec une vision avant-gardiste du design moderne." 
              : "Each creation is an ode to beauty, fusing traditional techniques with an avant-garde vision of modern design."}
          </p>
          <p>
            {isFr 
              ? "Des matières premières exquises à la précision de nos artisans, la Maison continue de redéfinir les standards de l'élégance mondiale." 
              : "From the most exquisite raw materials to the precision of our artisans, the House continues to redefine the standards of global elegance."}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
