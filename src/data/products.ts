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
  },
  {
    id: 15,
    name: "Dior Sauvage",
    cat: "Perfumes",
    price: 155,
    image: "https://thumbs.dreamstime.com/b/bottle-toilet-water-sauvage-white-background-christian-dior-st-petersburg-russia-march-product-209983532.jpg",
    description: "A radically fresh composition. Notes of Calabrian bergamot and Pepper; Sichuan Pepper, Lavender, Pink Pepper, Vetiver, Patchouli; Ambroxan, Cedar."
  },
  {
    id: 16,
    name: "YSL Y Eau de Parfum",
    cat: "Perfumes",
    price: 148,
    image: "https://wallpapers.com/images/hd/ysl-pictures-jjuvz29vwkl8f1n1.jpg",
    description: "A deeply fresh and masculine scent. Notes of Apple, Ginger, Bergamot; Sage, Juniper Berries, Geranium; Amberwood, Tonka Bean, Cedar, Vetiver."
  },
  {
    id: 17,
    name: "Davidoff Cool Water",
    cat: "Perfumes",
    price: 60,
    image: "https://www.vhv.rs/dpng/d/456-4566932_cool-water-by-davidoff-for-men-cosmetics-store.png",
    description: "Inspired by the freshness of the ocean. Notes of Sea water, Lavender, Mint, Green Notes, Rosemary; Sandalwood, Jasmine, Neroli; Musk, Vetiver, Cedar, Tobacco."
  },
  {
    id: 18,
    name: "Versace Eros",
    cat: "Perfumes",
    price: 130,
    image: "https://c8.alamy.com/comp/WHHDKC/a-bottle-of-versace-eros-eau-de-toilette-aftershave-for-men-on-a-white-background-WHHDKC.jpg",
    description: "Love, passion, beauty, and desire. Notes of Mint, Green Apple, Lemon; Tonka Bean, Ambroxan, Geranium; Madagascar Vanilla, Virginian Cedar, Vetiver, Oakmoss."
  },
  {
    id: 19,
    name: "Bleu de Chanel",
    cat: "Perfumes",
    price: 165,
    image: "https://thumbs.dreamstime.com/b/bottle-bleu-de-chanel-perfume-bangkok-thailand-dec-bottle-bleu-de-chanel-perfume-white-background-264301254.jpg",
    description: "A profoundly sensual trail. Notes of Grapefruit, Lemon, Mint, Pink Pepper; Ginger, Nutmeg, Jasmine; Incense, Vetiver, Cedar, Sandalwood."
  },
  {
    id: 20,
    name: "Acqua Di Gio",
    cat: "Perfumes",
    price: 110,
    image: "https://assets.armani.com/image/upload/f_auto,q_auto:good,w_1125,h_1428,c_fill/v1729106666/LE316300_NLP_100ML_F_FW2024.jpg",
    description: "Capturing the Mediterranean sea. Notes of Lime, Lemon, Bergamot, Jasmine, Orange, Mandarin; Sea Notes, Calone, Peach, Freesia; Cedar, White Musk, Patchouli."
  },
  {
    id: 21,
    name: "Creed Aventus",
    cat: "Perfumes",
    price: 495,
    image: "https://manzara-eg.com/cdn/shop/files/CREED.jpg?v=1752092853",
    description: "Celebrating strength, power, and success. Notes of Pineapple, Bergamot, Black Currant, Apple; Birch, Patchouli, Moroccan Jasmine, Rose; Musk, oak moss, Ambergris."
  },
  {
    id: 22,
    name: "Tom Ford Oud Wood",
    cat: "Perfumes",
    price: 295,
    image: "https://sdcdn.io/tf/tf_sku_TAJK01_2000x2000_0.png",
    description: "A pioneering exotic composition. Notes of Agarwood (Oud), Brazilian Rosewood, Cardamom, Sandalwood, Vanilla, Sichuan Pepper, Vetiver, Tonka Bean."
  },
  {
    id: 23,
    name: "Jo Malone Wood Sage & Sea Salt",
    cat: "Perfumes",
    price: 165,
    image: "https://www.jomalone.com.au/media/export/cms/products/1000x1000/jo_sku_L41501_1000x1000_0.png",
    description: "Escape the everyday along the windswept shore. Notes of Ambrette (Musk Mallow), Sea Salt, Sage, Seaweed, and Grapefruit."
  },
  {
    id: 24,
    name: "Paco Rabanne 1 Million",
    cat: "Perfumes",
    price: 120,
    image: "https://media.cosmeticexpress.com/prod-public/media/09/72/d8/1755695928/3349668566372.jpg?ts=1755695928",
    description: "The scent of success. Notes of Blood Mandarin, Grapefruit, Mint; Cinnamon, Spicy Notes, Rose; Amber, Leather, Woody Notes, Indian Patchouli."
  }
];
