import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BRANDS_DATA } from "../data";
import { ArrowUpRight, Award, Check } from "lucide-react";

export default function BrandsSection() {
  const [activeBrandId, setActiveBrandId] = useState<string>(BRANDS_DATA[0].id);
  const [showAllBrands, setShowAllBrands] = useState(false);
  return (
    <section
      id="brands"
      className="relative min-h-screen bg-zinc-950 py-24 px-6 md:px-12 flex items-center overflow-hidden border-b border-zinc-900/60 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto w-full z-10 flex flex-col">
        {/* Header Block: Side-by-Side (Title Left, View All Brands Right) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-white/5 pb-8">
          <div className="space-y-4">
            <span className="font-mono text-xs tracking-[0.3em] text-brand-blue block">
              [ PORTFOLIO v1959: CURATED ATELIERS ]
            </span>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase leading-[0.85] tracking-tighter">
              COVETED <br />
              <span className="text-zinc-400 italic font-black">BRANDS</span>
            </h2>
          </div>
 
          {/* View All Brands Circular Interactive Button */}
          <motion.button
            id="view-all-brands-btn"
            onClick={() => setShowAllBrands(!showAllBrands)}
            className="relative group w-36 h-36 rounded-full border border-white/10 hover:border-brand-blue flex flex-col items-center justify-center p-4 backdrop-blur-sm transition-all duration-500 cursor-pointer focus:outline-none shrink-0 bg-zinc-900/40 shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Spinning border effect on hover */}
            <div className="absolute inset-0 rounded-full border border-dashed border-brand-blue/0 group-hover:border-brand-blue/40 group-hover:animate-spin" style={{ animationDuration: "12s" }} />
            
            <span className="font-display text-[10px] tracking-widest text-zinc-300 group-hover:text-brand-blue transition-colors duration-300 font-black uppercase text-center leading-tight">
              {showAllBrands ? "SHOW\nORIGINAL" : "VIEW ALL\nBRANDS"}
            </span>
            <ArrowUpRight size={16} className="text-zinc-500 mt-1.5 group-hover:text-brand-blue group-hover:rotate-45 transition-all duration-300" />
          </motion.button>
        </div>

        {/* Content Block: 100% Width Stack of Interactive Brands */}
        <motion.div
          id="brands-list-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="flex flex-col divide-y divide-white/5 w-full"
        >
          {BRANDS_DATA.map((brand, index) => {
            const isActive = activeBrandId === brand.id;
            return (
              <motion.div
                key={brand.id}
                id={`brand-item-${brand.id}`}
                onMouseEnter={() => setActiveBrandId(brand.id)}
                onClick={() => setActiveBrandId(brand.id)}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 14 } }
                }}
                className={`relative py-6 md:py-8 px-4 md:px-6 transition-all duration-300 cursor-pointer group w-full rounded-xl ${
                  isActive ? "bg-zinc-900/40 border border-white/10 backdrop-blur-sm shadow-sm" : "hover:bg-white/[0.02]"
                }`}
              >
                {/* Background Sweep on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />

                {/* Brand Row Header */}
                <div className="flex items-center justify-between z-10 relative">
                  <div className="flex items-center space-x-6 md:space-x-8">
                    {/* Index Counter */}
                    <span className={`font-mono text-xs md:text-sm tracking-widest font-bold ${isActive ? "text-brand-blue" : "text-zinc-650 group-hover:text-zinc-400"} transition-colors duration-300`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Brand Name */}
                    <h3 className={`font-serif text-xl md:text-2xl lg:text-3xl font-black tracking-tight uppercase transition-colors duration-300 ${isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"}`}>
                      {brand.name}
                    </h3>
                  </div>

                  {/* Circle Indicator on active / hover */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white/5 group-hover:border-brand-blue/40 group-hover:bg-brand-blue/10 backdrop-blur-sm transition-all duration-300 shrink-0">
                    <ArrowUpRight
                      size={14}
                      className={`text-zinc-400 group-hover:text-brand-blue transition-all duration-300 ${isActive ? "rotate-45 text-brand-blue" : ""}`}
                    />
                  </div>
                </div>

                {/* Expanded Row Content with Details on Left and Image on Right */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden z-10 relative w-full"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-white/5 pt-6">
                        {/* Left Column of the line: Description & Details */}
                        <div className="md:col-span-7 space-y-4">
                          <div className="flex items-center gap-2">
                            <Award size={14} className="text-brand-blue animate-pulse" />
                            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-400">
                              [ BESPOKE SELECTION ]
                            </span>
                          </div>

                          <div className="space-y-1">
                            <p className="font-display text-xs tracking-widest font-bold uppercase text-brand-blue">
                              {brand.tagline}
                            </p>
                            <p className="font-sans text-sm text-zinc-300 leading-relaxed font-light max-w-2xl">
                              {brand.description}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 pt-2 text-[10px] tracking-widest uppercase text-brand-blue font-bold font-mono">
                            <Check size={12} className="stroke-[2.5]" />
                            AVAILABLE AT CHENNAI & COIMBATORE OUTLETS
                          </div>
                        </div>

                        {/* Right Column of the line: Theatrical Image Embedded Inline */}
                        <div className="md:col-span-5 relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950 group/img">
                          <img
                            src={brand.image}
                            alt={brand.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover opacity-60 group-hover/img:scale-105 group-hover/img:opacity-80 transition-all duration-700"
                          />
                          {/* Theatrical Vignette / Gradients directly on the inline image */}
                          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(9,9,11,0.6)_100%)] pointer-events-none" />
                          
                          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 pointer-events-none">
                             <span className="font-mono text-[8px] text-brand-blue tracking-[0.2em] uppercase">Cinematic View</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Brand popup sheet for "View All Brands" */}
      <AnimatePresence>
        {showAllBrands && (
          <motion.div
            id="all-brands-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 overflow-y-auto px-6 py-20 flex items-center justify-center backdrop-blur-md"
          >
            <div className="max-w-4xl w-full bg-zinc-950/80 border border-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 relative shadow-2xl">
              <button
                id="all-brands-close-btn"
                onClick={() => setShowAllBrands(false)}
                className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:border-brand-blue text-zinc-300 hover:text-brand-blue transition-colors cursor-pointer bg-zinc-900/20 backdrop-blur-sm"
              >
                Close ✕
              </button>

              <h2 className="font-serif text-3xl md:text-4xl text-white mb-8 uppercase tracking-wide">
                Bespoke <span className="text-brand-blue italic">Brand Portfolio</span>
              </h2>

              <p className="font-sans text-zinc-300 mb-10 text-sm leading-relaxed max-w-2xl">
                We travel the globe to hand-select labels representing the finest in craftsmanship, innovation, and sartorial expression. Here is our signature portfolio:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                {[
                  "Balmain Paris", "Chopard", "Maybach", "Lindberg", "Prada", "Tom Ford",
                  "Cartier", "Gucci", "Fred Paris", "Montblanc", "Saint Laurent", "Silhouette",
                  "Ray-Ban", "Oakley", "Oliver Peoples", "Oliver Goldsmith", "Ic! Berlin", "Maui Jim"
                ].map((name) => (
                  <div
                    key={name}
                    className="p-5 rounded-xl border border-white/5 hover:border-brand-blue bg-zinc-900/20 backdrop-blur-sm hover:bg-brand-blue/5 transition-all text-zinc-200 font-display text-sm font-semibold uppercase tracking-widest"
                  >
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
