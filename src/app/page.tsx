"use client";

import React, { useState } from 'react';
import { ShoppingBag, Maximize, Zap, ArrowUpRight, X, Truck, Instagram, Twitter, Disc } from 'lucide-react';

// 1. Define the TypeScript Interface to fix the 'never' error
interface Product {
  id: number;
  name: string;
  price: string;
  tag: string;
  img: string;
  dimensions: string;
  stock: string;
  description: string;
}

const products: Product[] = [
  { 
    id: 1, 
    name: 'VECNA BUST', 
    price: 'INR 449.00', 
    tag: 'TOP SELLING', 
    img: '/Vecna.jpeg', 
    dimensions: '14.2cm H', 
    stock: 'AVAILABLE',
    description: 'A terrifyingly detailed 3D-printed bust of the Curse of Hawkins. Features intricate organic textures and a hollow-core design for a lightweight yet premium feel.'
  },
  { 
    id: 2, 
    name: 'DEMOGORGON PLANTER', 
    price: 'INR 499.00', 
    tag: 'LIMITED EDITION', 
    img: '/Demogorgon.jpg', 
    dimensions: '12.4CM H', 
    stock: 'AVAILABLE',
    description: 'The maw of the Upside Down, repurposed for your desk. This Demogorgon head features an open-mouth design perfect for small succulents or air plants.'
  },
  { 
    id: 3, 
    name: 'STRANGER THINGS SIGN', 
    price: 'INR 399.00', 
    tag: 'NEW', 
    img: '/StrangerThings.jpg', 
    dimensions: '5.2cm H / 10.1cm L', 
    stock: 'AVAILABLE',
    description: 'The iconic Hawkins logo in a multi-layered 3D print. Perfect for shelves, PCs, or mounting on your bedroom door.'
  },
  { 
    id: 4, 
    name: 'KEY CHAIN', 
    price: 'INR 149.00', 
    tag: 'ESSENTIAL', 
    img: '/ST_Keychain.jpg', 
    dimensions: '4.1cm L', 
    stock: 'AVAILABLE',
    description: 'Carry a piece of the Void everywhere you go. A sturdy, 3D-printed keychain designed to withstand the wear and tear of both worlds.'
  }
];

export default function Home() {
  // Use the Interface here to tell TypeScript what to expect
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);
  const [pincode, setPincode] = useState<string>('');
  const [deliveryEst, setDeliveryEst] = useState<string>('');

  const handlePincodeChange = (val: string) => {
    setPincode(val);
    if (val.length === 6) {
      const region = val.substring(0, 2);
      // Karnataka pincodes usually start with 56, 57, 58, 59
      if (['56', '57', '58', '59'].includes(region)) {
        setDeliveryEst("Delivery in 3-4 Days (Karnataka Express)");
      } else {
        setDeliveryEst("Delivery in 5-6 Days (National Shipping)");
      }
    } else {
      setDeliveryEst('');
    }
  };

  const addToCart = () => {
    setCartCount(prev => prev + 1);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <main className="relative bg-[#050505] min-h-screen text-[#fff1f1] p-4 md:p-8 font-sans selection:bg-[#6f01ff] overflow-x-hidden">
      
      {/* BACKGROUND AMBIENCE */}
      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#6f01ff] opacity-10 blur-[160px] animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#9e4ffe] opacity-10 blur-[160px] animate-pulse pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* NAVIGATION */}
        <nav className="grid grid-cols-3 items-center mb-16 border-b border-[#e5c7f4]/10 pb-8 backdrop-blur-md">
          <div className="flex justify-start">
            <h1 className="text-lg md:text-2xl font-black tracking-tighter italic uppercase text-[#6f01ff]">Morph Studio</h1>
          </div>

          <div className="flex justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-[#6f01ff] blur-3xl opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
              <img 
                src="/pruple_png_main.png" 
                alt="Logo" 
                className="relative h-20 md:h-28 w-auto object-contain cursor-pointer transition-transform hover:scale-110" 
              />
            </div>
          </div>

          <div className="flex justify-end items-center">
            <button className="flex items-center space-x-3 bg-[#6f01ff] px-6 py-2.5 rounded-full text-white font-black hover:bg-[#9e4ffe] transition-all shadow-[0_0_20px_rgba(111,1,255,0.3)]">
              <ShoppingBag size={16} strokeWidth={3} />
              <span className="text-[12px]">{cartCount}</span>
            </button>
          </div>
        </nav>

        {/* HERO */}
        <header className="mb-20">
          <div className="inline-flex items-center space-x-2 text-[#9e4ffe] mb-4 bg-[#6f01ff]/10 px-4 py-1.5 rounded-full border border-[#6f01ff]/20">
             <Zap size={14} fill="#9e4ffe" />
             <p className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Signal from the Void</p>
          </div>
          <h2 className="text-5xl md:text-7xl font-black leading-none uppercase tracking-tighter italic">
            Grab Them <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6f01ff] via-[#9e4ffe] to-[#fff1f1]">
            Now.
            </span>
          </h2>
        </header>

        {/* PRODUCT GRID */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {products.map((item) => (
            <div 
              key={item.id} 
              onClick={() => { setSelectedProduct(item); setDeliveryEst(''); setPincode(''); }}
              className="group relative bg-[#0d0d0d]/40 backdrop-blur-xl border border-[#e5c7f4]/10 p-5 rounded-[2.5rem] hover:border-[#6f01ff]/50 transition-all duration-700 cursor-pointer overflow-hidden"
            >
              <div className="absolute top-8 right-8 z-10 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                  <ArrowUpRight className="text-[#6f01ff]" size={24} />
              </div>
              <span className="absolute top-8 left-8 z-10 bg-[#6f01ff] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase italic tracking-tighter">
                {item.tag}
              </span>
              <div className="h-64 mb-6 rounded-[1.8rem] overflow-hidden bg-[#121212] flex items-center justify-center border border-white/5 relative">
                 <img src={item.img} alt={item.name} className="object-cover w-full h-full opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-80" />
              </div>
              <div className="px-1">
                <h3 className="text-xl font-black uppercase italic text-[#fff1f1] group-hover:text-[#6f01ff] transition-colors mb-2">{item.name}</h3>
                <div className="flex justify-between items-center pt-4 border-t border-[#e5c7f4]/10">
                  <p className="text-lg font-black text-[#fff1f1]">{item.price.split(' ')[1]}</p>
                  <button className="bg-[#fff1f1] text-black text-[10px] font-black px-6 py-2.5 rounded-full hover:bg-[#6f01ff] hover:text-white transition-all uppercase">Details +</button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* VERTICAL DETAIL DRAWER */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedProduct(null)} />
          
          <div className="relative w-full max-w-lg bg-[#0d0d0d] border-l border-[#6f01ff]/30 h-full p-8 md:p-12 shadow-2xl overflow-y-auto animate-drawer">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 p-3 bg-white/5 rounded-full hover:bg-red-600 transition-colors">
              <X size={20} />
            </button>

            <img src={selectedProduct.img} className="w-full h-72 object-cover rounded-[2.5rem] mb-10 border border-white/10" />
            
            <div className="space-y-8">
              <div>
                <span className="text-[#6f01ff] text-xs font-black tracking-[0.3em] uppercase">{selectedProduct.tag}</span>
                <h2 className="text-5xl font-black italic leading-tight uppercase mt-2 tracking-tighter">{selectedProduct.name}</h2>
                <p className="text-3xl font-black mt-4 text-[#6f01ff] underline underline-offset-8 decoration-2">{selectedProduct.price}</p>
              </div>

              <div className="text-[#e5c7f4]/80 text-sm leading-relaxed font-medium">
                {selectedProduct.description}
              </div>

              <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                <Maximize size={18} className="text-[#6f01ff]" />
                <span className="text-xs font-black uppercase tracking-widest leading-none">Size: {selectedProduct.dimensions}</span>
              </div>

              {/* Delivery Section */}
              <div className="bg-[#6f01ff]/5 border border-[#6f01ff]/20 p-6 rounded-[2rem]">
                <label className="text-[10px] font-black uppercase text-[#6f01ff] mb-3 block tracking-widest">Shipping Check</label>
                <input 
                  type="text" 
                  placeholder="Enter 6-digit Pincode" 
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => handlePincodeChange(e.target.value)}
                  className="bg-black border border-white/10 rounded-xl px-5 py-3 text-sm w-full focus:border-[#6f01ff] outline-none transition-all font-bold tracking-widest text-[#6f01ff]"
                />
                {deliveryEst && (
                  <div className="mt-4 flex items-center space-x-3 text-green-400 font-black text-[11px] uppercase tracking-tighter italic">
                    <Truck size={16} className="animate-bounce" />
                    <span>{deliveryEst}</span>
                  </div>
                )}
              </div>

              <button 
                onClick={addToCart}
                className="w-full bg-[#6f01ff] text-white py-6 rounded-full font-black text-xl hover:bg-[#9e4ffe] transition-all transform active:scale-95 shadow-xl uppercase italic"
              >
                ADD TO VOID +
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="mt-32 border-t border-[#e5c7f4]/5 py-16 text-center">
        <div className="flex justify-center space-x-8 mb-8 opacity-40 hover:opacity-100 transition-opacity">
           <Instagram size={20} /> <Twitter size={20} /> <Disc size={20} />
        </div>
        <p className="text-[#e5c7f4]/20 text-[10px] font-bold tracking-[0.5em] uppercase">
          Morph Studio × The Void / 2026
        </p>
      </footer>

      {/* Drawer Animation */}
      <style jsx global>{`
        @keyframes drawer {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-drawer {
          animation: drawer 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </main>
  );
}