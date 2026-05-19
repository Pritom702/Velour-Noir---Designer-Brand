import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Overlays } from "./components/Overlays";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import Maison from "./pages/Maison";
import Commitments from "./pages/Commitments";

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('input')) {
        setHover(true);
      } else {
        setHover(false);
      }
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  return (
    <div
      className={`custom-cursor border-gold ${hover ? 'hover' : ''}`}
      style={{ left: pos.x, top: pos.y }}
    />
  );
}

export default function App() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Cursor />
      <Header />
      <Overlays />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/maison" element={<Maison />} />
        <Route path="/commitments" element={<Commitments />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </>
  );
}
