import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, History, Sparkles, X, Globe, UserCheck, Eye, Compass } from "lucide-react";

const GALLERY_IMAGES = [
  {
    src: "/assets/img/vintageopticals2.jpeg",
    tagline: "[ LEGACY SHOWROOM ]",
    title: "SPECTACAL ZONE",
    location: "Broadway Boutique, Chennai"
  },
  {
    src: "/assets/img/traditionaloptical.jpeg",
    tagline: "[ CLINICAL EXCELLENCE ]",
    title: "PRECISION WAVEFRONT DIAGNOSTICS",
    location: "Advanced Clinical Labs"
  },
  {
    src: "/assets/img/premiumopticall.jpeg",
    tagline: "[ ARTISANAL DESIGNERS ]",
    title: "COUTURE EYEWEAR SELECTION",
    location: "Anna Nagar & Coimbatore Ateliers"
  },
  {
    src: "/assets/img/modernoptical.jpeg",
    tagline: "[ METICULOUS CRAFTSMANSHIP ]",
    title: "BESPOKE OPTICAL SCULPTING",
    location: "Lens-Crafting Facility"
  }
];

export default function AboutUs() {
  const [isLoreOpen, setIsLoreOpen] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIdx((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 4500); // Elegant 4.5s autoplay intervals
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      value: "Est. 1959",
      label: "67 Years of Legacy"
    },
    {
      value: "150K+",
      label: "Custom Lenses Sculpted"
    },
    {
      value: "6+",
      label: "Bespoke Outlets"
    }
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen bg-zinc-950 py-24 px-6 md:px-12 border-b border-white/5 flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,102,204,0.01)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Column: Visuals & Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-5 space-y-8 flex flex-col justify-between h-full"
        >
          {/* Aesthetic Luxury Image Card with Auto-Play Gallery */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-900/40 backdrop-blur-sm group cursor-pointer"
            onClick={() => setActiveImageIdx((prev) => (prev + 1) % GALLERY_IMAGES.length)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImageIdx}
                src={GALLERY_IMAGES[activeImageIdx].src}
                alt={GALLERY_IMAGES[activeImageIdx].title}
                referrerPolicy="no-referrer"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.8, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </AnimatePresence>

            {/* Ambient luxury glass gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none z-10" />
            
            {/* Interactive slide indicators */}
            <div className="absolute top-4 right-4 z-20 flex gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/5">
              {GALLERY_IMAGES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIdx(i);
                  }}
                  className={`h-1 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                    activeImageIdx === i ? "w-3 bg-brand-blue" : "w-1 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-20">
              <span className="font-mono text-[9px] tracking-[0.25em] text-brand-blue font-black uppercase">
                {GALLERY_IMAGES[activeImageIdx].tagline}
              </span>
              <h4 className="font-serif text-xl font-bold text-white uppercase tracking-tight mt-1">
                {GALLERY_IMAGES[activeImageIdx].title}
              </h4>
              <p className="font-sans text-[10px] text-white/70 uppercase tracking-widest mt-0.5">
                {GALLERY_IMAGES[activeImageIdx].location}
              </p>
            </div>
          </motion.div>
 
          {/* Core Stats Row */}
          <div className="grid grid-cols-3 gap-4 text-center">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1, ease: "easeOut" }}
                whileHover={{ scale: 1.05, borderColor: "rgba(0,102,204,0.4)" }}
                className="p-4 rounded-xl border border-white/5 bg-zinc-900/40 backdrop-blur-sm transition-all duration-300"
              >
                <div className="font-serif text-lg md:text-xl font-black text-white uppercase tracking-tight">
                  {stat.value}
                </div>
                <div className="font-sans text-[9px] text-zinc-400 uppercase tracking-widest mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
 
        {/* Right Column: Copy & Actions */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="lg:col-span-7 space-y-8"
        >
          <div className="space-y-4">
            <span className="font-mono text-xs tracking-[0.3em] text-brand-blue block animate-pulse">
              [ SIX DECADES OF PRECISION ]
            </span>
            <h2 className="font-serif text-5xl md:text-7xl font-black text-white uppercase leading-[0.85] tracking-tighter">
              SCULPTORS OF <br />
              <span className="text-zinc-500 italic font-black">PRECISION VISION</span>
            </h2>
            <p className="font-sans text-sm text-zinc-300 leading-relaxed font-light">
              Founded in 1959, Spectacal Zone stands as an institution of optical excellence in Southern India. We are not mere purveyors of frames, but custom sculptors of bespoke precision lenses and curators of international sartorial eyewear.
            </p>
            <p className="font-sans text-sm text-zinc-300 leading-relaxed font-light">
              Through three generations of ocular mastery, we have paired clinical wavefront diagnostic expertise with elite couture designers like Maybach, Balmain, and Chopard. We ensure that your glasses reflect your true intellect and unique visage.
            </p>
          </div>
 
          {/* Interactive Actions */}
          <div className="flex flex-wrap gap-4">
            <motion.button
              onClick={() => setIsLoreOpen(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-brand-blue text-white hover:bg-white hover:text-black font-display text-[11px] font-black tracking-widest uppercase rounded-xl transition-all duration-300 shadow-md cursor-pointer"
            >
              Our Heritage Story
            </motion.button>
            <motion.button
              onClick={() => {
                const el = document.getElementById("locations");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-zinc-900/40 hover:bg-white/[0.02] text-zinc-300 font-mono text-[10px] tracking-wider uppercase border border-white/10 backdrop-blur-sm rounded-xl transition-all cursor-pointer"
            >
              Contact Our Ateliers
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Brand Lore Detailed Modal */}
      <AnimatePresence>
        {isLoreOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-950/75 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-zinc-900/60 border border-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 max-w-2xl w-full relative shadow-2xl space-y-6"
            >
              <button
                onClick={() => setIsLoreOpen(false)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-zinc-950/40 backdrop-blur-sm border border-white/10 hover:border-brand-blue text-zinc-400 hover:text-brand-blue flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="space-y-2 border-b border-white/5 pb-4">
                <span className="font-mono text-[9px] tracking-[0.3em] text-brand-blue font-black block">
                  [ LORE & CHRONOLOGY ]
                </span>
                <h3 className="font-serif text-3xl font-black text-white uppercase tracking-tight">
                  THE VIJAYA LEGACY
                </h3>
              </div>

              <div className="space-y-4 overflow-y-auto max-h-[350px] pr-2 font-sans text-xs text-zinc-300 leading-relaxed font-light">
                <div className="flex gap-4">
                  <div className="text-brand-blue shrink-0 pt-0.5"><History size={16} /></div>
                  <p>
                    <strong className="text-white">1959: The Founding In Broadway</strong> — Launched by our founder on NSC Bose Road, Broadway, Chennai, establishing Chennai's first fully dedicated optical diagnostic house carrying custom imported frames from Europe.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="text-brand-blue shrink-0 pt-0.5"><Globe size={16} /></div>
                  <p>
                    <strong className="text-white">1982: Digital Lens Adaptation</strong> — Introducing computer-guided wavefront optical diagnostics to Tamil Nadu, ensuring lenses are calibrated to unique facial distances and multi-focal reading profiles.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="text-brand-blue shrink-0 pt-0.5"><UserCheck size={16} /></div>
                  <p>
                    <strong className="text-white">2005: Expanding Outlets & Audiology</strong> — Opening state-of-the-art diagnostic ateliers in Anna Nagar, Alwarpet, Adyar, and Race Course in Coimbatore, adding specialized pediatric eyewear and rechargeable AI audiology.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="text-brand-blue shrink-0 pt-0.5"><Sparkles size={16} /></div>
                  <p>
                    <strong className="text-white">Today: Curating Ateliers</strong> — Recognized as the supreme destination for luxury international eyewear. We custom sculpt high-index thin progressive lenses to restore absolute visual clarity for outstanding leaders.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex justify-end">
                <button
                  onClick={() => setIsLoreOpen(false)}
                  className="px-6 py-3 rounded-lg bg-brand-blue text-white hover:bg-white hover:text-black font-display text-[10px] font-black tracking-widest uppercase transition-colors cursor-pointer"
                >
                  Close Story
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
