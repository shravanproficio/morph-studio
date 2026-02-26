"use client";
import Script from 'next/script';
import React, { useState } from 'react';
import { 
  ShoppingBag, Maximize, Zap, ArrowUpRight, X, Truck, 
  Instagram, Twitter, Disc, CreditCard, User, Mail, 
  MapPin, Phone, Calendar, Trash2, Star, ChevronRight, ChevronLeft 
} from 'lucide-react';

// --- TYPES ---
interface Review { user: string; rating: number; comment: string; }
interface Product {
  id: number; name: string; price: string; tag: string; imgs: string[];
  dimensions: string; stock: string; description: string; reviews: Review[];
}

// --- DATA ---
const products: Product[] = [
  { 
    id: 1, name: 'VECNA BUST', price: 'INR 449.00', tag: 'TOP SELLING', 
    imgs: ['/Vecna.jpeg', '/vecna2.jpeg'], dimensions: '14.2cm H', stock: 'AVAILABLE',
    description: 'A terrifyingly detailed 3D-printed bust of the Curse of Hawkins. Features intricate organic textures.',
    reviews: [
      {user: "Arjun_X", rating: 5, comment: "Insane detail on the tentacles!"},
      {user: "Shravan", rating: 5, comment: "Loved the detailing. Looks perfect on my shelf."},
      {user: "Rohan.P", rating: 4, comment: "Great quality, but took 4 days to arrive."}
    ]
  },
  { 
    id: 2, name: 'DEMOGORGON PLANTER', price: 'INR 499.00', tag: 'LIMITED', 
    imgs: ['/Demogorgon.jpg', '/demogorgon2.jpg'], dimensions: '12.4CM H', stock: 'AVAILABLE',
    description: 'The maw of the Upside Down for your succulents. Features a drainage hole at the base.',
    reviews: [{user: "Sanjay.V", rating: 5, comment: "Best desk accessory ever."}]
  },
  { id: 3, name: 'STRANGER THINGS SIGN', price: 'INR 399.00', tag: 'NEW', imgs: ['/StrangerThings.jpg'], dimensions: '5.2cm H / 10.1cm L', stock: 'AVAILABLE', description: 'Iconic Hawkins logo.', reviews: [] },
  { id: 4, name: 'KEY CHAIN', price: 'INR 149.00', tag: 'ESSENTIAL', imgs: ['/ST_Keychain.jpg'], dimensions: '4.1cm L', stock: 'AVAILABLE', description: 'Carry a piece of the Void.', reviews: [] }
];

export default function Home() {
  // Navigation & UI State
  const [view, setView] = useState<'landing' | 'store'>('landing');
  const [toast, setToast] = useState<string | null>(null);

  // Store State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [currentRevIdx, setCurrentRevIdx] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  
  // Checkout Form State
  const [pincode, setPincode] = useState('');
  const [deliveryEst, setDeliveryEst] = useState('');
  const [formData, setFormData] = useState({ name: '', number: '', mail: '', address: '', age: '' });

  // Calculation
  const totalPrice = cartItems.reduce((acc, item) => acc + parseInt(item.price.replace('INR ', '')), 0);

  // --- RAZORPAY INTEGRATION START ---
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (cartItems.length === 0) return;
    setIsProcessing(true);

    try {
      // 1. Create Order
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice }),
      });

      const order = await response.json();

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      // 2. Initialize Options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Upside Down 3D",
        description: "3D Printed Collectibles",
        order_id: order.id,
        handler: function (response: any) {
          // 3. Payment Success
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
          // Optional: Clear cart here if you want
          // setCartItems([]); 
        },
        prefill: {
          name: "User Name", 
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#6f01ff", 
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false); 
          }
        }
      };

      // 4. Open Popup
      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();

    } catch (error) {
      console.error("Payment failed:", error);
      alert("Something went wrong with the payment setup.");
      setIsProcessing(false);
    }
  };
  // --- RAZORPAY INTEGRATION END ---

  // --- LOGIC ---
  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const nextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProduct) setCurrentImgIdx((prev) => (prev + 1) % selectedProduct.imgs.length);
  };

  const prevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProduct) setCurrentImgIdx((prev) => (prev - 1 + selectedProduct.imgs.length) % selectedProduct.imgs.length);
  };

  const nextRev = () => {
    if (selectedProduct) setCurrentRevIdx((prev) => (prev + 1) % selectedProduct.reviews.length);
  };

  const prevRev = () => {
    if (selectedProduct) setCurrentRevIdx((prev) => (prev - 1 + selectedProduct.reviews.length) % selectedProduct.reviews.length);
  };

  const handlePincodeChange = (val: string) => {
    setPincode(val);
    if (val.length === 6) {
      const region = val.substring(0, 2);
      if (['56', '57', '58', '59'].includes(region)) {
        setDeliveryEst("3-4 Days (Karnataka Express)");
      } else {
        setDeliveryEst("5-6 Days (National Shipping)");
      }
    } else {
      setDeliveryEst('');
    }
  };

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
    setSelectedProduct(null);
    setTimeout(() => setIsCartOpen(true), 400);
  };

  const removeFromCart = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  // --- VIEW: LANDING BANNERS ---
  if (view === 'landing') {
    return (
      <div className="bg-black min-h-screen font-sans selection:bg-[#6f01ff] text-white overflow-y-auto">
        
        {/* Banner 1: Stranger Things */}
        <div onClick={() => setView('store')} className="relative h-[85vh] w-full cursor-pointer group overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-red-900/20 group-hover:bg-red-900/10 transition-colors z-10" />
          <img src="/Strangerthings1.jpeg" alt="Stranger Things" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-20" />
          <div className="absolute bottom-16 left-8 md:left-16 z-30">
            <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter drop-shadow-2xl">Stranger <br/> Things</h2>
            <p className="text-[#6f01ff] font-bold tracking-[0.4em] uppercase mt-4 text-sm md:text-base animate-pulse">Collection Live — Enter Void</p>
          </div>
        </div>

        {/* Banner 2: Breaking Bad */}
        <div onClick={() => triggerToast("Heisenberg is busy. Coming Soon.")} className="relative h-[85vh] w-full cursor-pointer group overflow-hidden border-b border-white/10">
          <img src="/BrBa3.jpeg" alt="Breaking Bad" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[2s]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
          <div className="absolute bottom-16 left-8 md:left-16">
            <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter opacity-80">Breaking <br/> Bad</h2>
            <p className="text-yellow-500 font-bold tracking-[0.4em] uppercase mt-4 text-sm underline decoration-yellow-500/30 underline-offset-8">Dropping Soon</p>
          </div>
        </div>

        {/* Banner 3: The Office */}
        <div onClick={() => triggerToast("Threat Level Midnight. Coming Soon.")} className="relative h-[85vh] w-full cursor-pointer group overflow-hidden">
          <img src="/Theoffice2.jpeg" alt="The Office" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-[2s]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
          <div className="absolute bottom-16 left-8 md:left-16">
            <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter opacity-70">The <br/> Office</h2>
            <p className="text-blue-400 font-bold tracking-[0.4em] uppercase mt-4 text-sm underline decoration-blue-400/30 underline-offset-8">Dropping Soon</p>
          </div>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[300] bg-[#6f01ff] text-white px-8 py-4 rounded-full font-black uppercase italic text-xs tracking-widest shadow-[0_0_40px_rgba(111,1,255,0.5)] animate-drawer">
            {toast}
          </div>
        )}
      </div>
    );
  }
  // --- VIEW: STORE FRONT ---
  return (
    <main className="relative bg-[#050505] min-h-screen text-[#fff1f1] p-4 md:p-8 font-sans selection:bg-[#6f01ff] overflow-x-hidden animate-fade">
      
      {/* Background FX */}
      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#6f01ff] opacity-10 blur-[160px] animate-pulse pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* NAV */}
        <nav className="grid grid-cols-3 items-center mb-16 border-b border-[#e5c7f4]/10 pb-8 backdrop-blur-md">
          <div onClick={() => setView('landing')} className="flex justify-start text-xs md:text-sm font-black italic uppercase text-[#6f01ff] cursor-pointer hover:opacity-50 transition-all tracking-widest">
            ← Home
          </div>
          <div className="flex justify-center">
            <img src="/pruple_png_main.png" alt="Logo" className="h-16 md:h-24 w-auto object-contain transition-all" />
          </div>
          <div className="flex justify-end">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 bg-white/5 rounded-full hover:bg-[#6f01ff] transition-all group"
            >
              <ShoppingBag size={20} className="text-white group-hover:scale-110 transition-transform"/>
              {cartItems.length > 0 && <span className="absolute -top-1 -right-1 bg-[#6f01ff] w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold animate-pulse">{cartItems.length}</span>}
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6f01ff] via-[#9e4ffe] to-[#fff1f1]">Now.</span>
          </h2>
        </header>

        {/* GRID */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {products.map((item) => (
            <div key={item.id} onClick={() => {setSelectedProduct(item); setCurrentImgIdx(0); setCurrentRevIdx(0);}} className="group relative bg-[#0d0d0d]/40 backdrop-blur-xl border border-[#e5c7f4]/10 p-5 rounded-[2.5rem] hover:border-[#6f01ff]/50 transition-all cursor-pointer">
              <span className="absolute top-8 left-8 z-10 bg-[#6f01ff] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase italic tracking-tighter shadow-xl">{item.tag}</span>
              <div className="h-64 mb-6 rounded-[1.8rem] overflow-hidden bg-[#121212] relative border border-white/5">
                 <img src={item.imgs[0]} alt={item.name} className="object-cover w-full h-full opacity-60 group-hover:scale-110 transition-all duration-1000" />
              </div>
              <h3 className="text-xl font-black uppercase italic text-[#fff1f1] group-hover:text-[#6f01ff] transition-colors">{item.name}</h3>
              <div className="flex items-center space-x-2 mt-2 text-[#e5c7f4]/40 font-bold uppercase text-[9px] tracking-widest"><Maximize size={10} /><span>{item.dimensions}</span></div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#e5c7f4]/10">
                <p className="font-black text-[#6f01ff] text-lg">{item.price}</p>
                <button className="text-[9px] font-black uppercase bg-[#fff1f1] text-black px-4 py-2 rounded-full hover:bg-[#6f01ff] transition-all">View +</button>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* DRAWER 1: PRODUCT DETAILS & SWIPE CAROUSELS */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[400] flex justify-end">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedProduct(null)} />
          <div className="relative w-full max-w-lg bg-[#0d0d0d] border-l border-[#6f01ff]/30 h-full p-8 md:p-12 overflow-y-auto animate-drawer">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 z-20 p-3 bg-white/5 rounded-full hover:bg-red-600 transition-colors"><X size={20}/></button>
            
            {/* Image Carousel */}
            <div className="relative group/carousel mb-10 overflow-hidden rounded-[2.5rem] border border-white/10 aspect-square bg-[#121212]">
              <img src={selectedProduct.imgs[currentImgIdx]} className="w-full h-full object-cover animate-fade" key={`img-${currentImgIdx}`} />
              {selectedProduct.imgs.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <button onClick={prevImg} className="p-2 bg-black/50 rounded-full hover:bg-[#6f01ff] transition-all"><ChevronLeft size={20} /></button>
                  <button onClick={nextImg} className="p-2 bg-black/50 rounded-full hover:bg-[#6f01ff] transition-all"><ChevronRight size={20} /></button>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div>
                <span className="text-[#6f01ff] text-[10px] font-black tracking-widest uppercase italic">{selectedProduct.tag}</span>
                <h2 className="text-4xl md:text-5xl font-black italic uppercase leading-none tracking-tighter mt-2">{selectedProduct.name}</h2>
                <p className="text-3xl font-black text-[#6f01ff] mt-4 underline underline-offset-8 decoration-2">{selectedProduct.price}</p>
              </div>

              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 text-[#e5c7f4]/80 text-sm leading-relaxed">{selectedProduct.description}</div>
              
              <div className="flex items-center space-x-3 bg-black border border-[#6f01ff]/20 p-4 rounded-xl">
                <Maximize size={16} className="text-[#6f01ff]" /><span className="text-xs font-black uppercase">Size: {selectedProduct.dimensions}</span>
              </div>

              {/* Swipeable Reviews */}
              <div className="border-t border-white/10 pt-8">
                <p className="text-[10px] font-black text-[#6f01ff] uppercase tracking-widest mb-4">Void Reviews</p>
                {selectedProduct.reviews.length > 0 ? (
                  <div className="relative bg-white/5 p-5 rounded-2xl border border-white/5 overflow-hidden min-h-[120px]">
                    <div className="animate-fade" key={`rev-${currentRevIdx}`}>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-bold text-[#fff1f1] italic">{selectedProduct.reviews[currentRevIdx].user}</span>
                            <div className="flex text-[#6f01ff]"><Star size={10} fill="currentColor" /></div>
                        </div>
                        <p className="text-xs italic text-[#e5c7f4]/60 leading-relaxed">"{selectedProduct.reviews[currentRevIdx].comment}"</p>
                    </div>
                    {selectedProduct.reviews.length > 1 && (
                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                            <button onClick={prevRev} className="text-[#e5c7f4]/30 hover:text-[#6f01ff] transition-all"><ChevronLeft size={16}/></button>
                            <span className="text-[9px] font-bold text-[#e5c7f4]/40">{currentRevIdx + 1} / {selectedProduct.reviews.length}</span>
                            <button onClick={nextRev} className="text-[#e5c7f4]/30 hover:text-[#6f01ff] transition-all"><ChevronRight size={16}/></button>
                        </div>
                    )}
                  </div>
                ) : <p className="text-[9px] uppercase tracking-widest text-[#e5c7f4]/20 italic">Scanning the void for reviews...</p>}
              </div>

              <button onClick={() => addToCart(selectedProduct)} className="w-full bg-[#6f01ff] text-white py-6 rounded-full font-black text-xl hover:bg-[#9e4ffe] transition-all transform active:scale-95 italic uppercase shadow-xl">ADD TO VOID +</button>
            </div>
          </div>
        </div>
      )}

      {/* DRAWER 2: CHECKOUT */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[500] flex justify-end">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-lg bg-[#0d0d0d] border-l border-[#6f01ff]/30 h-full p-8 md:p-12 overflow-y-auto animate-drawer">
            <button onClick={() => setIsCartOpen(false)} className="absolute top-8 right-8 p-3 bg-white/5 rounded-full hover:bg-red-600 transition-colors"><X size={20}/></button>
            <h2 className="text-3xl font-black italic uppercase text-[#6f01ff] mb-8 tracking-tighter">Your Order</h2>
            
            <div className="space-y-3 mb-10">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div>
                    <span className="font-bold italic text-sm uppercase block text-[#fff1f1]">{item.name}</span>
                    <span className="text-[9px] text-[#e5c7f4]/40 font-bold uppercase">{item.dimensions}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-[#6f01ff] font-black text-sm">{item.price}</span>
                    <button onClick={() => removeFromCart(idx)} className="p-2 text-[#e5c7f4]/20 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6f01ff]" /><input type="text" placeholder="NAME" className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 text-xs font-bold tracking-widest outline-none focus:border-[#6f01ff]" onChange={(e)=>setFormData({...formData, name: e.target.value})}/></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6f01ff]" /><input type="text" placeholder="PHONE" className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 text-xs font-bold tracking-widest outline-none focus:border-[#6f01ff]" onChange={(e)=>setFormData({...formData, number: e.target.value})}/></div>
                <div className="relative"><Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6f01ff]" /><input type="text" placeholder="AGE" className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 text-xs font-bold tracking-widest outline-none focus:border-[#6f01ff]" onChange={(e)=>setFormData({...formData, age: e.target.value})}/></div>
              </div>
              <div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6f01ff]" /><input type="email" placeholder="EMAIL" className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 text-xs font-bold tracking-widest outline-none focus:border-[#6f01ff]" onChange={(e)=>setFormData({...formData, mail: e.target.value})}/></div>
              <div className="relative"><MapPin size={16} className="absolute left-4 top-4 text-[#6f01ff]" /><textarea placeholder="FULL ADDRESS" rows={3} className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 text-xs font-bold tracking-widest outline-none focus:border-[#6f01ff]" onChange={(e)=>setFormData({...formData, address: e.target.value})}></textarea></div>
              
              <div className="bg-[#6f01ff]/5 border border-[#6f01ff]/20 p-5 rounded-[2rem]">
                <label className="text-[10px] font-black uppercase text-[#6f01ff] mb-2 block tracking-widest">Pincode Check</label>
                <input type="text" placeholder="6-DIGIT PIN" maxLength={6} className="bg-black border border-white/10 rounded-xl px-5 py-3 text-sm w-full outline-none font-bold text-[#6f01ff]" onChange={(e) => handlePincodeChange(e.target.value)} />
                {deliveryEst && <div className="mt-4 flex items-center space-x-3 text-green-400 font-black text-[11px] uppercase italic tracking-tighter"><Truck size={16} className="animate-bounce" /><span>{deliveryEst}</span></div>}
              </div>

              <div className="pt-6 border-t border-white/10">
                <div className="flex justify-between text-xl font-black mb-6 italic uppercase"><span>TOTAL</span><span className="text-[#6f01ff]">INR {totalPrice}.00</span></div>
                
                {/* CONNECTED RAZORPAY BUTTON */}
                <button 
                  onClick={handlePayment} 
                  disabled={cartItems.length === 0 || isProcessing} 
                  className="w-full bg-[#fff1f1] text-black py-6 rounded-full font-black text-xl hover:bg-[#6f01ff] hover:text-white transition-all shadow-xl disabled:opacity-20 uppercase italic"
                >
                  {isProcessing ? "Processing..." : "Proceed to Payment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-32 border-t border-[#e5c7f4]/5 py-16 text-center text-[#e5c7f4]/20 text-[10px] font-bold tracking-[0.5em] uppercase">
        Morph Studio × The Void / 2026
      </footer>

      {/* STYLES */}
      <style jsx global>{`
        @keyframes drawer { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-drawer { animation: drawer 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade { animation: fade 0.4s ease-in-out; }
      `}</style>
      
      {/* Load Razorpay Script - CORRECTLY PLACED HERE */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
    </main>
  );
}