import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, Plus, Minus, Trash2, X, Sparkles, CheckCircle, ArrowRight } from "lucide-react";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  numericPrice: number;
  category: "Frames" | "Sunglasses" | "Contact Lens" | "Kids";
  image: string;
  tagline: string;
}

const PRODUCTS_DATA: Product[] = [
  {
    id: 1,
    name: "Brigade Titanium",
    brand: "Balmain Paris",
    price: "₹24,500",
    numericPrice: 24500,
    category: "Frames",
    tagline: "Ultra-light hand-finished pure titanium",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    name: "The Diplomat I",
    brand: "Maybach",
    price: "₹89,000",
    numericPrice: 89000,
    category: "Frames",
    tagline: "18-karat gold plating with fine walnut wood",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    name: "Cinéma Cat-Eye",
    brand: "Prada",
    price: "₹18,900",
    numericPrice: 18900,
    category: "Sunglasses",
    tagline: "Avant-garde Italian acetate silhouette",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 4,
    name: "Fausto Square",
    brand: "Tom Ford",
    price: "₹22,000",
    numericPrice: 22000,
    category: "Sunglasses",
    tagline: "Classic vintage block with golden 'T' temple",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 5,
    name: "Air Titanium Rimless",
    brand: "Lindberg",
    price: "₹34,500",
    numericPrice: 34500,
    category: "Frames",
    tagline: "Screwless Scandinavian minimalist design",
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 6,
    name: "Imperial Prestige",
    brand: "Chopard",
    price: "₹45,000",
    numericPrice: 45000,
    category: "Sunglasses",
    tagline: "Swiss-crafted luxury with integrated sapphire crystals",
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 7,
    name: "Dailies Total1 (90 Pack)",
    brand: "Alcon",
    price: "₹4,800",
    numericPrice: 4800,
    category: "Contact Lens",
    tagline: "Breathable water-gradient contact lenses",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 8,
    name: "Oasys Hydraclear",
    brand: "Acuvue",
    price: "₹3,200",
    numericPrice: 3200,
    category: "Contact Lens",
    tagline: "All-day moisture & UV protective matrix",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 9,
    name: "Resilient Active Flex",
    brand: "Spectacal Kids",
    price: "₹5,500",
    numericPrice: 5500,
    category: "Kids",
    tagline: "Shatter-proof lenses with rubberized hinges",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 10,
    name: "Baby Lux Comfort",
    brand: "Miraflex",
    price: "₹4,200",
    numericPrice: 4200,
    category: "Kids",
    tagline: "BPA-free medical-grade headband spectacles",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=600"
  }
];

interface CartItem {
  product: Product;
  quantity: number;
}

export default function OpticalsShop() {
  const [activeFilter, setActiveFilter] = useState<"All" | "Frames" | "Sunglasses" | "Contact Lens" | "Kids">("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [justAddedItem, setJustAddedItem] = useState<string | null>(null);
  const [reservationSuccess, setReservationSuccess] = useState(false);

  // Filter products
  const filteredProducts = PRODUCTS_DATA.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
  );

  // Add to Cart
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    // Success feedback animation triggers
    setJustAddedItem(product.name);
    setTimeout(() => setJustAddedItem(null), 2500);
    setIsCartOpen(true);
  };

  // Remove from Cart
  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQuantity = item.quantity + delta;
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Cart total price calculations
  const cartTotal = cart.reduce((sum, item) => sum + item.product.numericPrice * item.quantity, 0);

  // Trigger WhatsApp or CRM Reservation Inquiry
  const handleReserveTrial = () => {
    setReservationSuccess(true);
    setTimeout(() => {
      setReservationSuccess(false);
      setIsCartOpen(false);
      clearCart();
    }, 5000);

    // Pre-format a beautiful WhatsApp message containing chosen eyewear
    const itemsList = cart.map(item => `- ${item.product.brand} ${item.product.name} (x${item.quantity})`).join("%0A");
    const waText = `Hi Spectacal Zone! I would like to reserve the following eyewear models for a custom trial or inquiry:%0A%0A${itemsList}%0A%0ATotal Value: ₹${cartTotal.toLocaleString("en-IN")}%0A%0APlease guide me on the next steps. Thank you!`;
    
    // Open in a safe browser popup context
    setTimeout(() => {
      window.open(`https://wa.me/919442009991?text=${waText}`, "_blank");
    }, 2000);
  };

  return (
    <section
      id="opticals-shop"
      className="relative min-h-screen bg-zinc-950 py-24 px-6 md:px-12 border-b border-white/5 overflow-hidden flex flex-col justify-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,102,204,0.015)_0%,transparent_60%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto w-full z-10 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
          <div className="space-y-4">
            <span className="font-mono text-xs tracking-[0.3em] text-brand-blue block">
              [ EXCLUSIVE RETAIL SHOWROOM ]
            </span>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase leading-[0.85] tracking-tighter">
              OPTICALS <br />
              <span className="text-zinc-400 italic font-black">COLLECTION</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-4 rounded-full bg-zinc-900/40 border border-white/10 hover:border-brand-blue text-zinc-300 hover:text-brand-blue backdrop-blur-sm transition-all cursor-pointer group flex items-center gap-2 shadow-sm"
            >
              <ShoppingCart size={18} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-blue text-white font-mono text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-zinc-950 animate-bounce">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
              <span className="font-mono text-[10px] tracking-wider uppercase font-bold hidden sm:inline px-1">
                View All
              </span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3 items-center">
          {(["All", "Frames", "Sunglasses", "Contact Lens", "Kids"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-350 cursor-pointer border ${
                activeFilter === filter
                  ? "bg-brand-blue border-brand-blue text-white font-black shadow-sm"
                  : "bg-zinc-900/40 backdrop-blur-sm border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-900/80"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Floating Adding Success Notice */}
        <AnimatePresence>
          {justAddedItem && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="fixed bottom-6 right-6 bg-zinc-900/80 border border-brand-blue/30 px-6 py-4 rounded-xl shadow-2xl z-50 backdrop-blur-md flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center">
                <Sparkles size={14} className="text-brand-blue animate-pulse" />
              </div>
              <div>
                <p className="font-display text-[10px] text-brand-blue font-bold tracking-widest uppercase">ADDED TO SELECTION</p>
                <p className="font-sans text-xs text-white/80 font-medium">{justAddedItem}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                onClick={() => addToCart(p)}
                className="bg-zinc-900/40 border border-white/10 rounded-2xl p-5 flex flex-col justify-between group hover:border-brand-blue/40 backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:shadow-brand-blue/10 relative cursor-pointer"
              >
                {/* Category Watermark Tag */}
                <span className="absolute top-4 left-4 bg-zinc-950/60 text-zinc-400 font-mono text-[8px] tracking-widest uppercase px-2.5 py-1 rounded-full border border-white/5">
                  {p.category}
                </span>

                {/* Product Image */}
                <div className="aspect-[4/3] w-full rounded-xl overflow-hidden relative bg-zinc-950/40 border border-white/5 group-hover:border-white/10 transition-colors">
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>

                {/* Info & CTA */}
                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="font-mono text-[9px] tracking-[0.2em] text-brand-blue uppercase font-bold mt-3">
                      {p.brand}
                    </p>
                    <h4 className="font-serif text-lg font-black text-white uppercase tracking-tight mt-1 group-hover:text-brand-blue transition-colors duration-300">
                      {p.name}
                    </h4>
                    <p className="font-sans text-[11px] text-zinc-400 leading-relaxed font-light mt-1">
                      {p.tagline}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="font-mono text-sm font-bold text-zinc-200 tracking-wider">
                      {p.price}
                    </span>
                    <span className="font-mono text-[10px] tracking-wider uppercase font-bold text-brand-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Select Frame
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Interactive Cart Sidebar Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-zinc-950/75 backdrop-blur-sm"
            />
 
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 220 }}
                className="w-screen max-w-md bg-zinc-950/80 backdrop-blur-md border-l border-white/10 shadow-2xl flex flex-col h-full text-zinc-100"
              >
                {/* Drawer Header */}
                <div className="px-6 py-6 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="text-brand-blue" size={20} />
                    <h3 className="font-serif text-xl font-bold uppercase tracking-wide text-white">
                      YOUR SELECTION
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 rounded-full hover:bg-white/[0.05] text-zinc-500 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                  {reservationSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12 px-4 space-y-4 bg-brand-blue/10 border border-brand-blue/30 rounded-2xl backdrop-blur-sm"
                    >
                      <div className="w-14 h-14 rounded-full bg-brand-blue/20 flex items-center justify-center mx-auto text-brand-blue">
                        <CheckCircle size={32} />
                      </div>
                      <h4 className="font-serif text-2xl font-black text-white uppercase tracking-tight">
                        RESERVATION COMPLETED!
                      </h4>
                      <p className="font-sans text-xs text-zinc-300 leading-relaxed max-w-xs mx-auto">
                        Your custom frame selection has been synchronized. We are preparing pre-filled specifications and redirecting you to Chat with our Optician!
                      </p>
                      <div className="w-12 h-1 bg-brand-blue mx-auto rounded-full mt-4 animate-pulse" />
                    </motion.div>
                  ) : cart.length === 0 ? (
                    <div className="text-center py-20 text-zinc-500 space-y-4">
                      <div className="w-16 h-16 rounded-full border border-dashed border-zinc-800 flex items-center justify-center mx-auto">
                        <ShoppingCart size={24} />
                      </div>
                      <p className="font-mono text-xs tracking-wider uppercase">Your list is currently empty</p>
                      <p className="font-sans text-xs text-zinc-400 max-w-[220px] mx-auto">
                        Browse our ateliers collection and click the plus button on any frame to try it!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 divide-y divide-white/5 font-sans">
                      {cart.map((item) => (
                        <div key={item.product.id} className="flex gap-4 pt-4 first:pt-0 group">
                          {/* Item Thumbnail */}
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-900/40 border border-white/10 shrink-0">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Specs */}
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex justify-between items-start gap-2">
                              <h5 className="font-serif text-sm font-bold text-white uppercase tracking-tight truncate">
                                {item.product.name}
                              </h5>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-zinc-500 hover:text-brand-blue p-0.5 transition-colors cursor-pointer"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                            <p className="font-mono text-[9px] text-brand-blue uppercase font-black">
                              {item.product.brand}
                            </p>
                            
                            <div className="flex justify-between items-center pt-2">
                              <span className="font-mono text-xs font-semibold text-zinc-400">
                                {item.product.price}
                              </span>

                              {/* Quantity Changer */}
                              <div className="flex items-center border border-white/10 rounded-full bg-zinc-900/60 backdrop-blur-sm">
                                <button
                                  onClick={() => updateQuantity(item.product.id, -1)}
                                  className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
                                >
                                  <Minus size={10} />
                                </button>
                                <span className="font-mono text-xs text-white px-2 min-w-[1.25rem] text-center font-bold">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, 1)}
                                  className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
                                >
                                  <Plus size={10} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Drawer */}
                {cart.length > 0 && !reservationSuccess && (
                  <div className="border-t border-white/10 bg-zinc-950/60 backdrop-blur-sm px-6 py-6 space-y-4">
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-xs text-zinc-400 tracking-wider uppercase">SUBTOTAL ESTIMATE:</span>
                      <span className="font-mono text-2xl font-black text-brand-blue tracking-wider">
                        ₹{cartTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                    
                    <p className="font-sans text-[10px] text-zinc-450 leading-relaxed uppercase">
                      * TRIAL RESERVATIONS ARE COMPLIMENTARY WITH ABSOLUTE NO PURCHASE OBLIGATION. SAMPLES DELIVERED DIRECTLY TO YOUR RESIDENCE OR DESIGNATED ATELIER.
                    </p>

                    <button
                      onClick={handleReserveTrial}
                      className="w-full py-4 rounded-xl bg-brand-blue hover:bg-white hover:text-black text-white font-display text-[11px] font-black tracking-widest uppercase transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>CONFIRM SELECTION TRIAL</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
