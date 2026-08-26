import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, ShieldCheck, Sparkles, Clock, GlassWater, ArrowRight } from "lucide-react";

export default function HeritageSection() {
  const [activeEra, setActiveEra] = useState<number>(0);

  const ERAS = [
    {
      year: "1959",
      title: "The Genesis",
      tagline: "Handcrafting Precision Lenses",
      description: "Founded in Chennai by master optical sculpters. Every lens was ground by hand and custom-aligned to wooden and metal wire spectacles for regional patrons.",
      icon: Clock,
      image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=800"
    },
    {
      year: "1988",
      title: "The Expansion",
      tagline: "Pioneering Modern Diagnostics",
      description: "SZ became the first outlet in Southern India to import high-end computerized lensometres and auto-refractor terminals, establishing a benchmark for diagnostic correctness.",
      icon: ShieldCheck,
      image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=800"
    },
    {
      year: "2026",
      title: "Present Day",
      tagline: "The Luxury Vision Universe",
      description: "Operating state-of-the-art diagnostic flagship ateliers across Chennai and Coimbatore. Housing 20+ coveted luxury eyewear brands alongside full digital audiology diagnostics.",
      icon: Sparkles,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section
      id="heritage"
      className="relative min-h-screen bg-zinc-950 py-24 px-6 md:px-12 flex items-center overflow-hidden border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left column: narrative info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="col-span-1 lg:col-span-5 space-y-8"
        >
          <div className="space-y-4">
            <span className="font-mono text-xs tracking-[0.3em] text-brand-blue block">
              [ ATELIER TIMELINE : SIXTY-FIVE YEARS ]
            </span>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase leading-[0.85] tracking-tighter">
              CRAFT & <br />
              <span className="text-zinc-500 italic font-black">HERITAGE</span>
            </h2>
          </div>

          <p className="font-sans text-sm md:text-base text-zinc-300 leading-relaxed font-light">
            Since 1959, SPECSZONE has been Southern India's premium destination for visual correction and luxury frame curation. What began as a humble lens grinding workbench has evolved into a state-of-the-art lifestyle institution.
          </p>

          {/* Quick interactive era navigator dots */}
          <div className="flex items-center space-x-3 pt-4">
            {ERAS.map((era, idx) => (
              <motion.button
                key={era.year}
                id={`heritage-era-btn-${idx}`}
                onClick={() => setActiveEra(idx)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full font-display text-xs tracking-widest font-extrabold border transition-all cursor-pointer focus:outline-none ${
                  activeEra === idx
                    ? "bg-brand-blue border-brand-blue text-white font-black"
                    : "bg-zinc-900/40 border-white/10 text-zinc-400 hover:border-brand-blue hover:text-white backdrop-blur-sm"
                }`}
              >
                {era.year}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Right column: Dynamic timeline showcase card (crossfade visual & text) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.2 }}
          className="col-span-1 lg:col-span-7"
        >
          <div className="bg-zinc-900/40 border border-white/10 rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden min-h-[400px] flex flex-col md:flex-row gap-8 items-center justify-between backdrop-blur-sm">
            {/* Split visuals */}
            <div className="w-full md:w-5/12 aspect-[4/5] rounded-2xl overflow-hidden relative border border-white/10 shrink-0 bg-zinc-950/40 backdrop-blur-sm">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeEra}
                  src={ERAS[activeEra].image}
                  alt={ERAS[activeEra].title}
                  referrerPolicy="no-referrer"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 0.95, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-zinc-900/10 to-transparent" />
              <div className="absolute bottom-4 left-4 font-display text-2xl font-black tracking-widest text-white">
                {ERAS[activeEra].year}
              </div>
            </div>

            {/* Narrative text block */}
            <div className="w-full md:w-7/12 flex flex-col justify-between self-stretch py-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEra}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2.5 text-brand-blue">
                    {(() => {
                      const IconComp = ERAS[activeEra].icon;
                      return <IconComp size={18} />;
                    })()}
                    <span className="font-display text-xs tracking-widest uppercase font-bold">
                      {ERAS[activeEra].tagline}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl text-white uppercase font-bold tracking-wide">
                    {ERAS[activeEra].title}
                  </h3>

                  <p className="font-sans text-xs md:text-sm text-zinc-300 leading-relaxed font-light">
                    {ERAS[activeEra].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Slider controls footer */}
              <div className="pt-8 flex items-center justify-between border-t border-white/5 text-xs text-zinc-450">
                <span>PHASE {activeEra + 1} OF 3</span>
                <button
                  id="heritage-next-btn"
                  onClick={() => setActiveEra((activeEra + 1) % ERAS.length)}
                  className="text-zinc-300 hover:text-white font-display text-xs tracking-wider font-bold flex items-center gap-1 uppercase transition-colors cursor-pointer"
                >
                  Next Era <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
