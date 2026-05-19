export interface Product {
  id: number;
  name: string;
  cat: string;
  price: number;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Classic Beige Overcoat",
    cat: "Ready-to-Wear",
    price: 1800,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=2000",
    description: "A heritage-inspired overcoat updated with modern proportions, crafted from breathable and water-resistant gabardine."
  },
  {
    id: 2,
    name: "Signature Leather Biker Jacket",
    cat: "Ready-to-Wear",
    price: 3600,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=2000",
    description: "An iconic motorcycle jacket featuring classic epaulets, zip pockets, and an asymmetric closure. Crafted in supple lambskin."
  },
  {
    id: 3,
    name: "Delicate Diamond Necklace",
    cat: "Fine Jewellery",
    price: 2500,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=2000",
    description: "An exquisite diamond pendant resting on an elegant chain, offering timeless sophistication for everyday wear or evening affairs."
  },
  {
    id: 4,
    name: "Gold Chain Bracelet",
    cat: "Fine Jewellery",
    price: 1200,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=2000",
    description: "A delicately crafted gold chain bracelet, featuring subtle interlaced links perfectly reflecting light with every movement."
  },
  {
    id: 5,
    name: "Contemporary Gold Earrings",
    cat: "Fine Jewellery",
    price: 850,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=2000",
    description: "An avant-garde approach to fine jewelry. These earrings reflect a bold, confident, and modern spirit through their unexpected structural design."
  },
  {
    id: 6,
    name: "Mechanical Chronograph Watch",
    cat: "Watches",
    price: 6500,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=2000",
    description: "A legendary timepiece engineered for unparalleled precision, featuring a complex mechanical movement and a durable brushed case."
  },
  {
    id: 7,
    name: "Minimalist Crossbody Bag",
    cat: "Bags",
    price: 180,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=2000",
    description: "A sleek, minimalist crossbody bag crafted from smooth leather, featuring clean lines and a refined silhouette."
  },
  {
    id: 8,
    name: "Double-Breasted Wool Coat",
    cat: "Ready-to-Wear",
    price: 2300,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=2000",
    description: "An iconic structured coat crafted in wool and cashmere beaver, featuring dramatic lapels and graceful kimono sleeves."
  },
  {
    id: 9,
    name: "Silk-Crepe Evening Gown",
    cat: "Ready-to-Wear",
    price: 1450,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=2000",
    description: "Fluid and graceful, this exquisite gown is defined by its immaculate floor-sweeping drape and precisely tailored bodice."
  },
  {
    id: 10,
    name: "Artisanal Woody Fragrance",
    cat: "Fragrance",
    price: 230,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=2000",
    description: "A captivating unisex signature scent. Smoky, botanical, and leathery notes create a comforting yet distinctive atmosphere."
  },
  {
    id: 11,
    name: "Hydrating Lip Treatment",
    cat: "Beauty",
    price: 40,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=2000",
    description: "A luxurious balm that revives natural color with a subtle, custom glow while delivering up to 24 hours of deep hydration."
  },
  {
    id: 12,
    name: "Textured Silk Necktie",
    cat: "Accessories",
    price: 250,
    image: "https://images.unsplash.com/photo-1589756823695-278bc923f962?auto=format&fit=crop&q=80&w=2000",
    description: "Expertly crafted in Italy from luxurious pure silk. This subtly textured tie brings an air of ultimate refinement."
  },
  {
    id: 13,
    name: "Signature Silk Square Scarf",
    cat: "Accessories",
    price: 495,
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=2000",
    description: "The iconic 90cm silk square. An essential, versatile accessory featuring vibrant hand-rolled edges and intricate motifs."
  },
  {
    id: 14,
    name: "Woven Leather Bi-fold Wallet",
    cat: "Accessories",
    price: 550,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=2000",
    description: "A masterful bi-fold wallet, tightly woven using signature interlaced leather techniques for durability and timeless style."
  }
];
