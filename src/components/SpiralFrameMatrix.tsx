import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from "motion/react";
import { 
  Sparkles, 
  ArrowRight, 
  X, 
  Grid, 
  CheckCircle2, 
  Sliders,
  Eye,
  Zap
} from "lucide-react";

interface SpiralGlassItem {
  id: string;
  code: string;
  name: string;
  categoryLabel: string;
  priceINR: number;
  image: string;
  badge?: string;
  material: string;
  origin: string;
  weight: string;
}

const SPIRAL_GLASSES: SpiralGlassItem[] = [
  // Triad 1
  {
    id: "sp-01",
    code: "AT-908-JPN",
    name: "Aero-Titanium Alpha 01",
    categoryLabel: "SABAE TITANIUM",
    priceINR: 18500,
    badge: "BESTSELLER",
    material: "Surgical Beta-Titanium",
    origin: "Sabae, Japan",
    weight: "11.2g",
    image: "/assets/img/aero-titanium.jpg"
  },
  {
    id: "sp-02",
    code: "TK-402-ITL",
    name: "Sartorial Takiron Acetate",
    categoryLabel: "BIO ACETATE",
    priceINR: 14900,
    badge: "HANDCRAFTED",
    material: "Organic Cotton Acetate",
    origin: "Belluno, Italy",
    weight: "22.8g",
    image: "/assets/img/sartorial-img.jpg"

  },
  {
    id: "sp-03",
    code: "CB-705-PRO",
    name: "Chrono-Shield HEV Pro",
    categoryLabel: "BLUE LIGHT ARMOR",
    priceINR: 11200,
    badge: "99.8% HEV CUT",
    material: "TR90 Ultra-Flex Polymer",
    origin: "Innsbruck, Austria",
    weight: "14.5g",
    image: "/assets/img/chrono.jpg"

  },

  // Triad 2
  {
    id: "sp-04",
    code: "HP-300-SOL",
    name: "Hyper-Polarized Horizon X",
    categoryLabel: "POLARIZED SUN",
    priceINR: 16800,
    badge: "SOLAR SHIELD",
    material: "Forged Carbon Alloy",
    origin: "Geneva, Switzerland",
    weight: "18.2g",
    image: "/assets/img/hyper.jpg"

  },
  {
    id: "sp-05",
    code: "MG-990-VIP",
    name: "Atelier Monogram Executive",
    categoryLabel: "24K LUXURY GOLD",
    priceINR: 28500,
    badge: "LIMITED EDITION",
    material: "24k Plated Beta Titanium",
    origin: "Paris Atelier",
    weight: "13.8g",
    image: "/assets/img/atelier.jpg"

  },
  {
    id: "sp-06",
    code: "NM-101-MIN",
    name: "Neo-Rimless Minimalist",
    categoryLabel: "RIMLESS OPTICS",
    priceINR: 13500,
    badge: "ZERO WEIGHT",
    material: "Memory Flex Nitinol",
    origin: "Zurich, Switzerland",
    weight: "8.5g",
    image: "/assets/img/Rayban.png"

  },

  // Triad 3
  {
    id: "sp-07",
    code: "AV-880-GLD",
    name: "Heritage Aviator Gold",
    categoryLabel: "CLASSIC AVIATOR",
    priceINR: 19200,
    badge: "NEW ARRIVAL",
    material: "Plated Stainless Steel",
    origin: "Milan, Italy",
    weight: "16.4g",
    image: "/assets/img/Heritage.jpg"

  },
  {
    id: "sp-08",
    code: "SC-505-BLK",
    name: "Stealth Carbon Matrix",
    categoryLabel: "3K CARBON FIBER",
    priceINR: 21000,
    badge: "ULTRA DURABLE",
    material: "3K Carbon Fiber Weave",
    origin: "Stuttgart, Germany",
    weight: "12.6g",
    image: "/assets/img/Stealth.jpg"

  },
  {
    id: "sp-09",
    code: "TR-202-RET",
    name: "Sartorial Tortoise Vintage",
    categoryLabel: "VINTAGE ACETATE",
    priceINR: 12800,
    badge: "RETRO HAVANA",
    material: "Cellulose Bio-Acetate",
    origin: "Kyoto, Japan",
    weight: "20.1g",
    image: "/assets/img/Tortoise.jpg"

  },

  // Additional 4 Items (Total 13)
  {
    id: "sp-10",
    code: "SM-600-MT",
    name: "Ray-Ban Meta Smart Optics",
    categoryLabel: "SMART AI EYEWEAR",
    priceINR: 29990,
    badge: "AI CONNECTED",
    material: "Lightweight O-Matter Composite",
    origin: "Milano, Italy",
    weight: "48.2g",
    image: "/assets/img/Ray-Ban.jpg"
  },
  {
    id: "sp-11",
    code: "OK-900-PRZ",
    name: "Oakley Prizm Velocity",
    categoryLabel: "SPORT PERFORMANCE",
    priceINR: 17500,
    badge: "PRIZM LENS",
    material: "Unobtainium & O-Matter",
    origin: "Foothill Ranch, USA",
    weight: "24.0g",
    image: "/assets/img/Oakley.jpg"
  },
  {
    id: "sp-12",
    code: "VG-330-CAT",
    name: "Vogue Parisienne Cat-Eye",
    categoryLabel: "HIGH FASHION",
    priceINR: 11800,
    badge: "COUTURE",
    material: "Hand-Polished Bio Acetate",
    origin: "Paris, France",
    weight: "19.4g",
    image: "/assets/img/vogue.jpeg"
  },
  {
    id: "sp-13",
    code: "CR-808-SPD",
    name: "Carrera Speedline Double-Bridge",
    categoryLabel: "MOTORSPORT EDITION",
    priceINR: 15400,
    badge: "ICONIC BRIDGE",
    material: "Optyl Ultra-Light Polymer",
    origin: "Padova, Italy",
    weight: "17.1g",
    image: "/assets/img/carrera.jpg"
  }
];

interface SpiralFrameMatrixProps {
  onPreSelectService?: (serviceName: string) => void;
}

function SpiralCardItem({
  item,
  index,
  totalItems,
  scrollYProgress,
  onSelect
}: {
  key?: React.Key;
  item: SpiralGlassItem;
  index: number;
  totalItems: number;
  scrollYProgress: MotionValue<number>;
  onSelect: (item: SpiralGlassItem) => void;
}) {
  const baseAngle = (index / totalItems) * Math.PI * 2;
  const radius = 340; // 3D orbit distance from center in px

  // Calculate 3D orbit coordinates based on scroll progress
  const x = useTransform(scrollYProgress, (p: number) => {
    const angle = baseAngle + p * Math.PI * 4; // 2 full revolutions over scroll
    return Math.sin(angle) * radius;
  });

  const z = useTransform(scrollYProgress, (p: number) => {
    const angle = baseAngle + p * Math.PI * 4;
    return Math.cos(angle) * radius;
  });

  const y = useTransform(scrollYProgress, (p: number) => {
    const angle = baseAngle + p * Math.PI * 4;
    const waveY = Math.sin(angle) * 12;
    return waveY;
  });

  // Scale and opacity according to Z depth
  const scale = useTransform(z, [-radius, radius], [0.72, 1.05]);
  const opacity = useTransform(z, [-radius, radius], [0.5, 1.0]);
  const zIndex = useTransform(z, (zVal: number) => Math.round(zVal + 1000));

  const formattedPrice = `₹${item.priceINR.toLocaleString('en-IN')}`;

  return (
    <motion.div
      style={{
        x,
        y,
        z,
        scale,
        opacity,
        zIndex,
        position: "absolute"
      }}
      onClick={() => onSelect(item)}
      className="w-[230px] sm:w-[270px] h-[270px] flex flex-col justify-between bg-zinc-900/90 hover:bg-zinc-900 backdrop-blur-2xl border border-white/15 hover:border-brand-blue/80 rounded-3xl p-4 shadow-2xl transition-colors duration-300 group cursor-pointer hover:border-brand-blue"
    >
      {/* Glass image */}
      <div className="relative w-full h-[170px] rounded-2xl overflow-hidden bg-zinc-950 border border-white/5 shrink-0">
        <img 
          src={item.image} 
          alt={item.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Brand Name & Price Alone */}
      <div className="pt-2 text-center space-y-0.5 my-auto">
        <h3 className="font-serif text-sm sm:text-base font-bold text-white uppercase tracking-tight line-clamp-1 group-hover:text-brand-blue transition-colors">
          {item.name}
        </h3>
        <p className="font-serif text-base sm:text-lg font-bold text-emerald-400">
          {formattedPrice}
        </p>
      </div>
    </motion.div>
  );
}

export default function SpiralFrameMatrix({ onPreSelectService }: SpiralFrameMatrixProps) {
  const [viewAllModal, setViewAllModal] = useState<boolean>(false);
  const [selectedGlass, setSelectedGlass] = useState<SpiralGlassItem | null>(null);

  // Scroll Container for 3D Pinned Animation
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Center stage scale
  const scaleCenter = useTransform(scrollYProgress, [0, 0.75, 1], [0.85, 1.0, 0.85]);
  
  // Opacity of "VIEW ALL" button at center (fades in when scroll approaches end)
  const viewAllOpacity = useTransform(scrollYProgress, [0.75, 0.9, 1], [0, 0.8, 1]);
  const viewAllScale = useTransform(scrollYProgress, [0.75, 0.9, 1], [0.6, 0.9, 1]);
  const viewAllPointerEvents = useTransform(scrollYProgress, (val) => val > 0.75 ? "auto" : "none");

  const handleSelectGlass = (item: SpiralGlassItem) => {
    const frameDetails = `${item.name} (${item.code}) - ₹${item.priceINR.toLocaleString('en-IN')}`;
    if (onPreSelectService) {
      onPreSelectService(frameDetails);
    } else {
      const el = document.getElementById("home-eye-care");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative -top-[10px] bg-zinc-950 text-white h-[400vh] border-t border-white/10"
    >
      {/* STICKY FULLSCREEN VIEWPORT */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-6 sm:p-10 bg-zinc-950">
        
        {/* ATMOSPHERIC GLOWS */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-brand-blue/10 rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        </div>

        {/* TOP HEADER */}
        <div className="relative z-30 flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono text-[10px] tracking-[0.35em] text-brand-blue font-bold uppercase block">
              [ 3D SPIRAL ATELIER MATRIX ]
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
              ORBITAL <span className="text-brand-blue italic font-normal">GLASSES GALLERY</span>
            </h2>
          </div>

          <button
            onClick={() => setViewAllModal(true)}
            className="px-5 py-2.5 rounded-full bg-white text-zinc-950 hover:bg-brand-blue hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-brand-blue/30 shrink-0"
          >
            <span>VIEW ALL ({SPIRAL_GLASSES.length})</span>
            <Grid size={14} />
          </button>
        </div>

        {/* CENTER 3D SPIRAL STAGE */}
        <div className="relative z-20 my-auto w-full h-[520px] sm:h-[580px] flex items-center justify-center [perspective:1200px] select-none translate-y-12 sm:translate-y-16">
          
          {/* 3D CONTAINER WITH SIDE TILT */}
          <motion.div
            style={{ 
              scale: scaleCenter,
              rotateX: 12,
              rotateZ: -6,
              rotateY: 6
            }}
            className="relative w-full max-w-4xl h-full flex items-center justify-center [transform-style:preserve-3d]"
          >
            {/* SPIRAL ITEMS: Placed in 3D circular orbit facing the camera */}
            {SPIRAL_GLASSES.map((item, index) => (
              <SpiralCardItem
                key={item.id}
                item={item}
                index={index}
                totalItems={SPIRAL_GLASSES.length}
                scrollYProgress={scrollYProgress}
                onSelect={setSelectedGlass}
              />
            ))}
          </motion.div>

          {/* CENTER OF CIRCLE "VIEW ALL" PROMINENT BUTTON (APPEARS AT SCROLL FINISH) */}
          <motion.div
            style={{
              opacity: viewAllOpacity,
              scale: viewAllScale,
              pointerEvents: viewAllPointerEvents
            }}
            className="absolute z-40 flex flex-col items-center justify-center -translate-y-8 sm:-translate-y-12"
          >
            <div className="relative group">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-brand-blue via-cyan-400 to-indigo-600 opacity-80 blur-xl group-hover:opacity-100 transition-opacity animate-pulse" />
              
              <button
                onClick={() => setViewAllModal(true)}
                className="relative px-8 py-5 rounded-full bg-white text-zinc-950 hover:bg-brand-blue hover:text-white font-mono text-sm sm:text-base font-black uppercase tracking-widest shadow-2xl transition-all duration-300 flex items-center gap-3 cursor-pointer hover:scale-105 active:scale-95"
              >
                <Sparkles size={20} className="text-brand-blue group-hover:text-white" />
                <span>VIEW ALL GLASSES & PRICES</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>

        </div>

      </div>

      {/* INSPECT MODAL */}
      <AnimatePresence>
        {selectedGlass && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-zinc-900 border border-white/20 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl text-white overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-tight text-white pr-4">
                  {selectedGlass.name}
                </h3>

                <button
                  onClick={() => setSelectedGlass(null)}
                  className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-950 border border-white/5">
                  <img src={selectedGlass.image} alt={selectedGlass.name} className="w-full h-full object-cover" />
                </div>

                <div className="text-center bg-zinc-950 p-4 rounded-xl border border-white/5 space-y-1">
                  <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest block">PRICE</span>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-400">
                    ₹{selectedGlass.priceINR.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  const g = selectedGlass;
                  setSelectedGlass(null);
                  handleSelectGlass(g);
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-brand-blue hover:bg-brand-blue/90 font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-brand-blue/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>SELECT FRAME</span>
                <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIEW ALL FULL CATALOG MODAL */}
      <AnimatePresence>
        {viewAllModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-xl overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-6xl bg-zinc-950 rounded-3xl p-6 sm:p-10 space-y-8 text-white shadow-2xl my-auto border border-white/10"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div>
                  <span className="font-mono text-[10px] text-brand-blue font-bold uppercase tracking-widest block">
                    [ COMPLETE GLASSES CATALOG ]
                  </span>
                  <h3 className="font-serif text-3xl font-bold uppercase tracking-tight text-white mt-1">
                    ALL GLASSES & PRICES
                  </h3>
                </div>

                <button
                  onClick={() => setViewAllModal(false)}
                  className="p-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[65vh] overflow-y-auto pr-2 custom-scrollbar">
                {SPIRAL_GLASSES.map((item) => (
                  <div
                    key={item.id}
                    className="bg-zinc-900/80 rounded-2xl p-4 space-y-4 flex flex-col justify-between hover:bg-zinc-900 transition-all border border-white/5 hover:border-brand-blue/40"
                  >
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-950 relative">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="text-center space-y-1">
                      <h4 className="font-serif text-lg font-bold uppercase tracking-tight text-white">
                        {item.name}
                      </h4>
                      <p className="font-serif text-xl font-bold text-emerald-400">
                        ₹{item.priceINR.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setViewAllModal(false);
                        handleSelectGlass(item);
                      }}
                      className="w-full py-2.5 rounded-xl bg-white hover:bg-brand-blue text-zinc-950 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>SELECT FRAME</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                ))}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
