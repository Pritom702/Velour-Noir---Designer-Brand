import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, products as initialProducts } from "../data/products";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

interface CartItem extends Product {
  quantity: number;
}

interface User {
  role: 'admin' | 'customer';
  username: string;
}

interface AppContextType {
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  cartItems: CartItem[];
  addToCart: (product: Product, qty: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  lang: string;
  setLang: (lang: string) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  isFr: boolean;
  subtotal: number;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  clearCart: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [lang, setLang] = useState('EN');
  const [currency, setCurrency] = useState('EUR');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const isAdmin = firebaseUser.email === 'pritomhamid.ph@gmail.com' || firebaseUser.email === 'pritomhamid.ph@gamil.com';
        setUser({ 
          role: isAdmin ? 'admin' : 'customer', 
          username: firebaseUser.displayName || (isAdmin ? 'Admin' : 'Customer') 
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const isFr = lang === 'FR';

  const addToCart = (product: Product, qty: number = 1) => {
    setCartItems(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + qty } : p);
      return [...prev, { ...product, quantity: qty }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(p => {
      if (p.id === id) return { ...p, quantity: Math.max(0, p.quantity + delta) };
      return p;
    }).filter(p => p.quantity > 0));
  };

  const clearCart = () => setCartItems([]);

  const subtotal = cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  return (
    <AppContext.Provider value={{
      cartOpen, setCartOpen,
      searchOpen, setSearchOpen,
      menuOpen, setMenuOpen,
      cartItems, addToCart, updateQuantity,
      lang, setLang,
      currency, setCurrency,
      isFr, subtotal,
      products, setProducts,
      user, setUser, clearCart
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
