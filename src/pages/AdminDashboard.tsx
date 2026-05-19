import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Navigate } from "react-router-dom";
import { Product } from "../data/products";
import { Plus, Edit2, Check, X } from "lucide-react";

export default function AdminDashboard() {
  const { user, products, setProducts, isFr, currency } = useApp();
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  
  const [isAdding, setIsAdding] = useState(false);
  const [addForm, setAddForm] = useState<Partial<Product>>({
    name: "", cat: "Ready-to-Wear", price: 0, image: "", description: ""
  });

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const handleEdit = (prod: Product) => {
    setEditingId(prod.id);
    setEditForm(prod);
  };

  const saveEdit = () => {
    if (editingId && editForm.name && editForm.price !== undefined) {
      setProducts(prev => prev.map(p => p.id === editingId ? { ...p, ...editForm } as Product : p));
    }
    setEditingId(null);
  };

  const handleAdd = () => {
    if (addForm.name && addForm.price !== undefined && addForm.image && addForm.description) {
      const newProduct: Product = {
        id: Math.max(...products.map(p => p.id), 0) + 1,
        ...addForm
      } as Product;
      setProducts([...products, newProduct]);
      setIsAdding(false);
      setAddForm({ name: "", cat: "Ready-to-Wear", price: 0, image: "", description: "" });
    }
  };

  return (
    <div className="min-h-screen bg-noir pt-32 pb-24 px-6 md:px-12 text-bone">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
           <h1 className="font-display text-4xl italic text-mist">Admin Dashboard</h1>
           <button onClick={() => setIsAdding(!isAdding)} className="flex items-center space-x-2 text-gold hover:text-bone transition-colors font-accent tracking-widest uppercase text-xs">
             {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
             <span>{isAdding ? "Cancel" : "Add Product"}</span>
           </button>
        </div>

        {isAdding && (
          <div className="bg-obsidian border border-gold/30 p-8 mb-12 glow-card">
            <h2 className="font-accent tracking-[0.2em] text-xs text-ash uppercase mb-6">New Product</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[10px] uppercase font-accent tracking-widest text-ash mb-2">Name</label>
                <input type="text" value={addForm.name} onChange={e => setAddForm({...addForm, name: e.target.value})} className="w-full bg-noir border border-white/10 p-3 text-sm text-bone outline-none focus:border-gold" />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-accent tracking-widest text-ash mb-2">Category</label>
                <select value={addForm.cat} onChange={e => setAddForm({...addForm, cat: e.target.value})} className="w-full bg-noir border border-white/10 p-3 text-sm text-bone outline-none focus:border-gold">
                  <option value="Ready-to-Wear">Ready-to-Wear</option>
                  <option value="Fine Jewellery">Fine Jewellery</option>
                  <option value="Watches">Watches</option>
                  <option value="Fragrance">Fragrance</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Bags">Bags</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-accent tracking-widest text-ash mb-2">Price ({currency})</label>
                <input type="number" value={addForm.price} onChange={e => setAddForm({...addForm, price: Number(e.target.value)})} className="w-full bg-noir border border-white/10 p-3 text-sm text-bone outline-none focus:border-gold" />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-accent tracking-widest text-ash mb-2">Image URL</label>
                <input type="text" value={addForm.image} onChange={e => setAddForm({...addForm, image: e.target.value})} className="w-full bg-noir border border-white/10 p-3 text-sm text-bone outline-none focus:border-gold" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[10px] uppercase font-accent tracking-widest text-ash mb-2">Description</label>
                <textarea value={addForm.description} onChange={e => setAddForm({...addForm, description: e.target.value})} className="w-full bg-noir border border-white/10 p-3 text-sm text-bone outline-none focus:border-gold min-h-[100px]" />
              </div>
            </div>
            <button onClick={handleAdd} className="bg-gold text-noir px-8 py-3 text-xs font-accent tracking-widest uppercase hover:bg-bone transition-colors">
              Save Product
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(prod => (
            <div key={prod.id} className="bg-obsidian border border-white/5 p-6 flex flex-col group">
              {editingId === prod.id ? (
                <div className="space-y-4 flex-1">
                  <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="w-full bg-noir border border-white/10 p-2 text-sm text-bone outline-none focus:border-gold" placeholder="Name" />
                  <input type="text" value={editForm.cat} onChange={e => setEditForm({...editForm, cat: e.target.value})} className="w-full bg-noir border border-white/10 p-2 text-sm text-bone outline-none focus:border-gold" placeholder="Category" />
                  <input type="number" value={editForm.price} onChange={e => setEditForm({...editForm, price: Number(e.target.value)})} className="w-full bg-noir border border-white/10 p-2 text-sm text-bone outline-none focus:border-gold" placeholder="Price" />
                  <textarea value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} className="w-full bg-noir border border-white/10 p-2 text-sm text-bone outline-none focus:border-gold h-24" placeholder="Description" />
                  <input type="text" value={editForm.image} onChange={e => setEditForm({...editForm, image: e.target.value})} className="w-full bg-noir border border-white/10 p-2 text-sm text-bone outline-none focus:border-gold" placeholder="Image URL" />
                  
                  <div className="flex space-x-4 pt-4">
                    <button onClick={saveEdit} className="text-green-500 hover:text-green-400 p-2 border border-green-500/30 rounded flex-1 flex justify-center"><Check className="w-4 h-4" /></button>
                    <button onClick={() => setEditingId(null)} className="text-red-500 hover:text-red-400 p-2 border border-red-500/30 rounded flex-1 flex justify-center"><X className="w-4 h-4" /></button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="aspect-[4/3] bg-noir mb-6 overflow-hidden relative border border-white/5">
                     <img src={prod.image} alt={prod.name} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="font-display italic text-xl text-bone pr-4">{prod.name}</h3>
                       <button onClick={() => handleEdit(prod)} className="text-ash hover:text-gold p-1 shrink-0"><Edit2 className="w-4 h-4" /></button>
                    </div>
                    <p className="font-accent tracking-[0.2em] text-[9px] text-ash uppercase mb-4">{prod.cat} // {currency === 'EUR' ? '€' : '$'}{prod.price}</p>
                    <p className="font-body text-xs text-mist/60 line-clamp-3">{prod.description}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
