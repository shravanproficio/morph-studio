"use client";

import React, { useState } from 'react';
import { ShoppingBag, Maximize, Zap, ArrowUpRight, X, Truck, Instagram, Twitter, Disc, CreditCard, User, Mail, MapPin, Phone, Calendar, Trash2 } from 'lucide-react';

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
  { id: 1, name: 'VECNA BUST', price: 'INR 449.00', tag: 'TOP SELLING', img: '/Vecna.jpeg', dimensions: '14.2cm H', stock: 'AVAILABLE', description: 'A terrifyingly detailed 3D-printed bust of the Curse of Hawkins. Features intricate organic textures.' },
  { id: 2, name: 'DEMOGORGON PLANTER', price: 'INR 499.00', tag: 'LIMITED EDITION', img: '/Demogorgon.jpg', dimensions: '12.4CM H', stock: 'AVAILABLE', description: 'The maw of the Upside Down, repurposed for your desk. Perfect for succulents.' },
  { id: 3, name: 'STRANGER THINGS SIGN', price: 'INR 399.00', tag: 'NEW', img: '/StrangerThings.jpg', dimensions: '5.2cm H / 10.1cm L', stock: 'AVAILABLE', description: 'The iconic Hawkins logo in a multi-layered 3D print. Perfect for shelves.' },
  { id: 4, name: 'KEY CHAIN', price: 'INR 149.00', tag: 'ESSENTIAL', img: '/ST_Keychain.jpg', dimensions: '4.1cm L', stock: 'AVAILABLE', description: 'Carry a piece of the Void everywhere you go. Sturdy 3D-printed keychain.' }
];

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [pincode, setPincode] = useState('');
  const [deliveryEst, setDeliveryEst] = useState('');
  const [formData, setFormData] = useState({ name: '', number: '', mail: '', address: '', age: '' });

  const handlePincodeChange = (val: string) => {
    setPincode(val);
    if (val.length === 6) {
      const region = val.substring(0, 2);
      if (['56', '57', '58', '59'].includes(region)) {
        setDeliveryEst("3-4 Days (Karnataka Express)");
      } else {
        setDeliveryEst("5-6 Days (National Shipping)");
      }
    } else { setDeliveryEst(''); }
  };

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
    setSelectedProduct(null);
    setTimeout(() => setIsCartOpen(true), 400);
  };

  const removeFromCart = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + parseInt(item.price.replace('INR ', '')), 0);

  return (
    <main className="relative bg-[#050505] min-h-screen text-[#fff1f1] p-4 md:p-8 font-sans selection:bg-[#6f01ff] overflow-x-hidden">
      
      {/* AMBIENCE */}
      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#6f01ff] opacity-10 blur-[160px] animate-pulse pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* NAV */}
        <nav className="grid grid-cols-3 items-center mb-16 border-b border-[#e5c7f4]/10 pb-8 backdrop-blur-md">
          <div className="flex justify-start text-lg md:text-2xl font-black italic uppercase text-[#6f01ff]">Morph Studio</div>
          <div className="flex justify-center">
            <img src="/pruple_png_main.png" alt="Logo" className="h-20 md:h-28 w-auto object-contain cursor-pointer hover:scale-110 transition-all" />
          </div>
          <div className="flex justify-end">
            <button onClick={() => setIsCartOpen(true)} className="flex items-center space-x-3 bg-[#6f01ff] px-6 py-2.5 rounded-full text-white font-black hover:bg-[#9e4ffe] transition-all shadow-[0_0_20px_rgba(111,1,255,0.3)]">
              <ShoppingBag size={16} strokeWidth={3} />
              <span className="text-[12px]">{cartItems.length}</span>
            </button>
          </div>
        </nav>

        {/* HERO */}
        <header className="mb-20">
          <div className="inline-flex items-center space-x-2 text-[#9e4ffe] mb-4 bg-[#6f01ff]/10 px-4 py-1.5 rounded-full border border-[#6f01ff]/20">
             <Zap size={14} fill="#9e4ffe" />
             <p className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Signal from the Void</p>
          </div>
          <h2 className="text-5xl md:text-7xl font-black leading-none uppercase tracking-tighter italic">Grab Them <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6f01ff] to-[#fff1f1]">-Now.</span></h2>
        </header>

        {/* GRID */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {products.map((item) => (
            <div key={item.id} onClick={() => setSelectedProduct(item)} className="group relative bg-[#0d0d0d]/40 backdrop-blur-xl border border-[#e5c7f4]/10 p-5 rounded-[2.5rem] hover:border-[#6f01ff]/50 transition-all cursor-pointer">
              <span className="absolute top-8 left-8 z-10 bg-[#6f01ff] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase italic tracking-tighter shadow-xl">
                {item.tag}
              </span>
              <div className="h-64 mb-6 rounded-[1.8rem] overflow-hidden bg-[#121212] relative border border-white/5">
                 <img src={item.img} alt={item.name} className="object-cover w-full h-full opacity-60 group-hover:scale-110 transition-all duration-1000" />
              </div>
              <h3 className="text-xl font-black uppercase italic text-[#fff1f1]">{item.name}</h3>
              <div className="flex items-center space-x-2 mt-2 text-[#e5c7f4]/40 font-bold uppercase text-[9px] tracking-widest">
                <Maximize size={10} />
                <span>{item.dimensions}</span>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#e5c7f4]/10">
                <p className="font-black text-[#6f01ff] tracking-tighter text-lg">{item.price}</p>
                <button className="text-[9px] font-black uppercase bg-[#fff1f1] text-black px-4 py-2 rounded-full hover:bg-[#6f01ff] hover:text-white transition-all">Details +</button>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* DRAWER 1: PRODUCT DETAILS */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedProduct(null)} />
          <div className="relative w-full max-w-lg bg-[#0d0d0d] border-l border-[#6f01ff]/30 h-full p-8 md:p-12 overflow-y-auto animate-drawer">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 p-3 bg-white/5 rounded-full"><X size={20}/></button>
            <img src={selectedProduct.img} className="w-full h-72 object-cover rounded-[2.5rem] mb-8 border border-white/10" />
            
            <div className="space-y-6">
              <div>
                <span className="text-[#6f01ff] text-[10px] font-black tracking-widest uppercase italic">{selectedProduct.tag}</span>
                <h2 className="text-4xl md:text-5xl font-black italic uppercase leading-none tracking-tighter mt-2">{selectedProduct.name}</h2>
                <p className="text-3xl font-black text-[#6f01ff] mt-4 underline decoration-2 underline-offset-8">{selectedProduct.price}</p>
              </div>
              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 text-[#e5c7f4]/80 text-sm leading-relaxed font-medium">
                {selectedProduct.description}
              </div>
              <div className="flex items-center space-x-3 bg-black border border-[#6f01ff]/20 p-4 rounded-xl">
                <Maximize size={16} className="text-[#6f01ff]" />
                <span className="text-xs font-black uppercase tracking-[0.2em]">Scale: {selectedProduct.dimensions}</span>
              </div>
              <button onClick={() => addToCart(selectedProduct)} className="w-full bg-[#6f01ff] text-white py-6 rounded-full font-black text-xl hover:bg-[#9e4ffe] transition-all transform active:scale-95 italic uppercase shadow-xl">ADD TO VOID +</button>
            </div>
          </div>
        </div>
      )}

      {/* DRAWER 2: SHOPPING CART & CHECKOUT FORM */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[110] flex justify-end">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-lg bg-[#0d0d0d] border-l border-[#6f01ff]/30 h-full p-8 md:p-12 overflow-y-auto animate-drawer">
            <button onClick={() => setIsCartOpen(false)} className="absolute top-8 right-8 p-3 bg-white/5 rounded-full hover:bg-red-600 transition-colors"><X size={20}/></button>
            
            <h2 className="text-3xl font-black italic uppercase text-[#6f01ff] mb-8">Secure Your Artifacts</h2>
            
            {/* Cart Items List with Remove Button */}
            <div className="space-y-3 mb-10">
              {cartItems.length === 0 ? <p className="text-[#e5c7f4]/40 italic uppercase text-sm tracking-widest">The Void is empty...</p> : 
                cartItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5 group relative overflow-hidden">
                    <div>
                      <span className="font-bold italic text-sm uppercase block">{item.name}</span>
                      <span className="text-[9px] text-[#e5c7f4]/40 font-bold uppercase tracking-widest">{item.dimensions}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-[#6f01ff] font-black text-sm">{item.price}</span>
                      <button 
                        onClick={() => removeFromCart(idx)} 
                        className="p-2 text-[#e5c7f4]/20 hover:text-red-500 transition-colors"
                        title="Remove Item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              }
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6f01ff]" />
                <input type="text" placeholder="FULL NAME" className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold tracking-widest outline-none focus:border-[#6f01ff]" onChange={(e)=>setFormData({...formData, name: e.target.value})}/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6f01ff]" />
                  <input type="text" placeholder="NUMBER" className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold tracking-widest outline-none focus:border-[#6f01ff]" onChange={(e)=>setFormData({...formData, number: e.target.value})}/>
                </div>
                <div className="relative"><Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6f01ff]" />
                  <input type="text" placeholder="AGE" className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold tracking-widest outline-none focus:border-[#6f01ff]" onChange={(e)=>setFormData({...formData, age: e.target.value})}/>
                </div>
              </div>
              <div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6f01ff]" />
                <input type="email" placeholder="EMAIL ADDRESS" className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold tracking-widest outline-none focus:border-[#6f01ff]" onChange={(e)=>setFormData({...formData, mail: e.target.value})}/>
              </div>
              <div className="relative"><MapPin size={16} className="absolute left-4 top-4 text-[#6f01ff]" />
                <textarea placeholder="FULL DELIVERY ADDRESS" rows={3} className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold tracking-widest outline-none focus:border-[#6f01ff]" onChange={(e)=>setFormData({...formData, address: e.target.value})}></textarea>
              </div>
              
              <div className="bg-[#6f01ff]/5 border border-[#6f01ff]/20 p-5 rounded-[2rem]">
                <label className="text-[10px] font-black uppercase text-[#6f01ff] mb-2 block tracking-widest">Verify Pincode</label>
                <input type="text" placeholder="6-DIGIT PINCODE" maxLength={6} className="bg-black border border-white/10 rounded-xl px-5 py-3 text-sm w-full outline-none font-bold tracking-widest text-[#6f01ff]" onChange={(e) => handlePincodeChange(e.target.value)} />
                {deliveryEst && <div className="mt-4 flex items-center space-x-3 text-green-400 font-black text-[11px] uppercase italic tracking-tighter"><Truck size={16} className="animate-bounce" /><span>{deliveryEst}</span></div>}
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="flex justify-between text-xl font-black mb-6 italic uppercase tracking-tighter">
                  <span>TOTAL DUE</span>
                  <span className="text-[#6f01ff]">INR {totalPrice}.00</span>
                </div>
                <button 
                  disabled={cartItems.length === 0}
                  className="w-full bg-[#fff1f1] text-black py-6 rounded-full font-black text-xl hover:bg-[#6f01ff] hover:text-white transition-all transform active:scale-95 flex items-center justify-center space-x-3 shadow-xl disabled:opacity-20 uppercase italic"
                >
                  <CreditCard size={20} />
                  <span>Proceed to Payment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-32 border-t border-[#e5c7f4]/5 py-16 text-center text-[#e5c7f4]/20 text-[10px] font-bold tracking-[0.5em] uppercase">
        Morph Studio × The Void / 2026
      </footer>

      <style jsx global>{`
        @keyframes drawer { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-drawer { animation: drawer 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </main>
  );
}