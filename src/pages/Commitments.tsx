import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';

export default function Commitments() {
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
          {isFr ? "Nos Engagements" : "Our Commitments"}
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8 font-body text-ash leading-relaxed text-sm max-w-2xl mx-auto"
        >
          <p>
            {isFr 
              ? "Nous sommes profondément engagés envers la durabilité, l'approvisionnement éthique et la réduction de notre empreinte écologique globale." 
              : "We are deeply committed to sustainability, ethical sourcing, and minimizing our overall environmental footprint."}
          </p>
          <p>
            {isFr 
              ? "L'artisanat responsable est au cœur de notre processus de création, garantissant un impact positif sur nos communautés et notre planète." 
              : "Responsible craftsmanship is at the heart of our creation process, ensuring a positive impact on both our communities and the planet."}
          </p>
          <p>
            {isFr 
              ? "En choisissant nos produits, vous rejoignez une vision où la qualité exceptionnelle s'aligne harmonieusement avec le respect de la nature." 
              : "By choosing our products, you join a vision where exceptional quality aligns harmoniously with the utmost respect for nature."}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
