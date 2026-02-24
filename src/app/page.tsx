import React from 'react';
import { ShoppingBag, Maximize, Zap, ArrowUpRight } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'VECNA BUST',
    price: 'INR 449.00',
    tag: 'TOP SELLING',
    img: '/Vecna.jpeg',
    dimensions: '14.2cm H',
    stock: 'AVAILABLE'
  },
  {
    id: 2,
    name: 'DEMOGORGON PLANTER',
    price: 'INR 499.00',
    tag: 'LIMITED EDITION',
    img: '/Demogorgon.jpg',
    dimensions: '12.4CM H',
    stock: 'AVAILABLE'
  },
  {
    id: 3,
    name: 'STRANGER THINGS SIGN',
    price: 'INR 399.00',
    tag: 'NEW',
    img: '/StrangerThings.jpg',
    dimensions: '5.2cm H / 10.1cm L',
    stock: 'AVAILABLE'
  },
  {
    id: 4,
    name: 'KEY CHAIN',
    price: 'INR 149.00',
    tag: 'ESSENTIAL',
    img: '/ST_Keychain.jpg', // Ensure you add this image to your public folder
    dimensions: '4.1cm L',
    stock: 'AVAILABLE'
  }
];

export default function Home() {
  return (
    <div className="bg-[#050505] min-h-screen text-[#fff1f1] p-6 font-sans selection:bg-[#6f01ff] selection:text-white">
      
      {/* 1. NAVIGATION BAR */}
      <nav className="grid grid-cols-3 items-center mb-16 border-b border-[#e5c7f4]/5 pb-8">
        <div className="flex justify-start">
          <h1 className="text-xl md:text-2xl font-black tracking-tighter italic uppercase text-[#6f01ff] cursor-default">
            Morph Studio
          </h1>
        </div>

        <div className="flex justify-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-[#6f01ff] blur-2xl opacity-20 group-hover:opacity-50 transition-opacity duration-500"></div>
            <img 
              src="/pruple_png_main.png" 
              alt="Morph Icon" 
              className="relative h-20 md:h-24 w-auto object-contain hover:scale-110 transition-transform duration-500 cursor-pointer" 
            />
          </div>
        </div>

        <div className="flex justify-end items-center space-x-6">
          <div className="hidden md:flex space-x-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e5c7f4]">
            <a href="#" className="hover:text-[#6f01ff] transition-colors">Drops</a>
            <a href="#" className="hover:text-[#6f01ff] transition-colors">Offers</a>
          </div>
          <button className="flex items-center space-x-3 bg-[#6f01ff] px-5 py-2.5 rounded-full text-white font-black hover:bg-[#9e4ffe] hover:scale-105 transition-all shadow-[0_0_20px_rgba(111,1,255,0.3)]">
            <ShoppingBag size={14} strokeWidth={3} />
            <span className="text-[10px] mt-0.5">0</span>
          </button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="mb-20 text-center md:text-left">
        <div className="inline-flex items-center space-x-2 text-[#9e4ffe] mb-4 bg-[#6f01ff]/5 px-3 py-1 rounded-full border border-[#6f01ff]/10">
           <Zap size={12} fill="#9e4ffe" />
           <p className="font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Direct from the Printer</p>
        </div>
        <h2 className="text-4xl md:text-6xl font-black leading-tight uppercase max-w-3xl tracking-tight">
          Grab Them 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6f01ff] via-[#9e4ffe] to-[#e5c7f4]">
            -Now.
          </span>
        </h2>
      </header>

      {/* 3. PRODUCT GRID - Changed to 4 columns on desktop */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-32">
        {products.map((item) => (
          <div key={item.id} className="group relative bg-[#0d0d0d] border border-[#e5c7f4]/5 p-4 rounded-[2rem] hover:border-[#6f01ff]/40 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between">
            
            <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-500">
                <ArrowUpRight className="text-[#6f01ff]" size={20} />
            </div>

            <span className="absolute top-6 left-6 z-10 bg-[#6f01ff] text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase italic tracking-tighter shadow-xl">
              {item.tag}
            </span>
            
            <div className="h-64 mb-4 rounded-[1.5rem] overflow-hidden bg-[#121212] flex items-center justify-center border border-[#e5c7f4]/5 group-hover:border-[#6f01ff]/20 transition-colors">
               <img 
                 src={item.img} 
                 alt={item.name} 
                 className="object-cover w-full h-full opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-1000 ease-out" 
               />
            </div>

            <div className="px-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tighter italic text-[#fff1f1] group-hover:text-[#6f01ff] transition-colors leading-tight">
                    {item.name}
                  </h3>
                  <div className="flex items-center space-x-1.5 mt-1.5">
                    <Maximize size={10} className="text-[#e5c7f4]/30" />
                    <p className="text-[8px] text-[#e5c7f4]/50 font-bold uppercase tracking-widest leading-none">
                      {item.dimensions}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base font-black text-[#fff1f1] leading-none">{item.price.split(' ')[1]}</p>
                  <p className="text-[9px] text-[#6f01ff] font-bold mt-1">INR</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#e5c7f4]/5">
                <div className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span>
                    <span className="text-[8px] font-black text-[#9e4ffe] uppercase tracking-tighter">
                      {item.stock}
                    </span>
                </div>
                <button className="bg-[#fff1f1] text-black text-[10px] font-black px-6 py-2 rounded-full hover:bg-[#6f01ff] hover:text-white transition-all duration-500 uppercase italic transform hover:scale-105 active:scale-95">
                  Add +
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 4. FOOTER */}
      <footer className="mt-32 border-t border-[#e5c7f4]/5 py-16 text-center">
        <div className="mb-6 flex justify-center space-x-6">
           <a href="#" className="text-[#e5c7f4]/40 hover:text-[#6f01ff] text-[10px] font-bold uppercase tracking-widest transition-colors">Instagram</a>
           <a href="#" className="text-[#e5c7f4]/40 hover:text-[#6f01ff] text-[10px] font-bold uppercase tracking-widest transition-colors">Twitter</a>
           <a href="#" className="text-[#e5c7f4]/40 hover:text-[#6f01ff] text-[10px] font-bold uppercase tracking-widest transition-colors">Discord</a>
        </div>
        <p className="text-[#e5c7f4]/20 text-[9px] font-bold tracking-[0.6em] uppercase">
          Morph Studio × The Void / Built for Hustlers
        </p>
      </footer>
    </div>
  );
}