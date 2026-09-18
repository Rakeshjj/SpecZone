import React, { useState, useRef, useMemo, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from "motion/react";
import { 
  Sparkles, 
  ArrowRight, 
  X, 
  Grid, 
  CheckCircle2, 
  Sliders,
  Eye,
  Zap,
  Glasses
} from "lucide-react";

export type ProductCategory = "sunglasses" | "frames" | "lenses" | "all";

export const CATEGORY_OPTIONS: { id: ProductCategory; label: string }[] = [
  { id: "sunglasses", label: "Sunglasses" },
  { id: "frames", label: "Frames" },
  { id: "lenses", label: "Lenses" },
  { id: "all", label: "All" }
];

interface SpiralGlassItem {
  id: string;
  code: string;
  name: string;
  categoryLabel: string;
  category: "sunglasses" | "frames" | "lenses";
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
    category: "sunglasses",
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
    category: "frames",
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
    category: "lenses",
    priceINR: 11200,
    badge: "99.8% HEV CUT",
    material: "TR90 Ultra-Flex Polymer",
    origin: "Innsbruck, Austria",
    weight: "14.5g",
    image: "/assets/img/lens4.jpg"
  },

  // Triad 2
  {
    id: "sp-04",
    code: "HP-300-SOL",
    name: "Hyper-Polarized Horizon X",
    categoryLabel: "POLARIZED SUN",
    category: "sunglasses",
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
    category: "lenses",
    priceINR: 28500,
    badge: "LIMITED EDITION",
    material: "24k Plated Beta Titanium",
    origin: "Paris Atelier",
    weight: "13.8g",
    image: "/assets/img/lens1.jpg"
  },
  {
    id: "sp-06",
    code: "NM-101-MIN",
    name: "Neo-Rimless Minimalist",
    categoryLabel: "RIMLESS OPTICS",
    category: "frames",
    priceINR: 13500,
    badge: "ZERO WEIGHT",
    material: "Memory Flex Nitinol",
    origin: "Zurich, Switzerland",
    weight: "8.5g",
    image: "/assets/img/lens5.jpg"
  },

  // Triad 3
  {
    id: "sp-07",
    code: "AV-880-GLD",
    name: "Heritage Aviator Gold",
    categoryLabel: "CLASSIC AVIATOR",
    category: "sunglasses",
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
    category: "lenses",
    priceINR: 21000,
    badge: "ULTRA DURABLE",
    material: "3K Carbon Fiber Weave",
    origin: "Stuttgart, Germany",
    weight: "12.6g",
    image: "/assets/img/lens3.jpg"
  },
  {
    id: "sp-09",
    code: "TR-202-RET",
    name: "Sartorial Tortoise Vintage",
    categoryLabel: "VINTAGE ACETATE",
    category: "lenses",
    priceINR: 12800,
    badge: "RETRO HAVANA",
    material: "Cellulose Bio-Acetate",
    origin: "Kyoto, Japan",
    weight: "20.1g",
    image: "/assets/img/lens11.jpg"
  },

  // Additional 4 Items (Total 13)
  {
    id: "sp-10",
    code: "SM-600-MT",
    name: "Ray-Ban Meta Smart Optics",
    categoryLabel: "SMART AI EYEWEAR",
    category: "frames",
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
    category: "sunglasses",
    priceINR: 17500,
    badge: "PRIZM LENS",
    material: "Unobtainium & O-Matter",
    origin: "Foothill Ranch, USA",
    weight: "24.0g",
    image: "/assets/img/lens12.jpg"
  },
  {
    id: "sp-12",
    code: "VG-330-CAT",
    name: "Vogue Parisienne Cat-Eye",
    categoryLabel: "HIGH FASHION",
    category: "frames",
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
    category: "sunglasses",
    priceINR: 15400,
    badge: "ICONIC BRIDGE",
    material: "Optyl Ultra-Light Polymer",
    origin: "Padova, Italy",
    weight: "17.1g",
    image: "/assets/img/lens.jpg"
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
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("all");
  const [viewAllModal, setViewAllModal] = useState<boolean>(false);
  const [selectedGlass, setSelectedGlass] = useState<SpiralGlassItem | null>(null);

  // Client-side category filtering
  const filteredGlasses = useMemo(() => {
    if (selectedCategory === "all") return SPIRAL_GLASSES;
    return SPIRAL_GLASSES.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  // Scroll Container for 3D Pinned Animation
  const targetRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  // Center stage scale
  const scaleCenter = useTransform(scrollYProgress, [0, 0.75, 1], [0.85, 1.0, 0.85]);
  
  // Opacity of "VIEW ALL" button at center (fades in when scroll approaches end)
  const viewAllOpacity = useTransform(scrollYProgress, [0.75, 0.9, 1], [0, 0.8, 1]);
  const viewAllScale = useTransform(scrollYProgress, [0.75, 0.9, 1], [0.6, 0.9, 1]);
  const viewAllPointerEvents = useTransform(scrollYProgress, (val) => val > 0.75 ? "auto" : "none");

  const handleOpenViewAll = () => {
    setSelectedCategory("all");
    setViewAllModal(true);
  };

  // Safely manage scroll-lock and restoration for modals without trapping or freezing the page
  useEffect(() => {
    if (viewAllModal || selectedGlass) {
      // Pause Lenis so wheel/touch inside modal functions natively
      (window as any).lenis?.stop();
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          if (selectedGlass) setSelectedGlass(null);
          else if (viewAllModal) setViewAllModal(false);
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow || "";
        (window as any).lenis?.start();
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
      (window as any).lenis?.start();
    }
  }, [viewAllModal, selectedGlass]);

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
      ref={targetRef}
      className="relative bg-zinc-950 text-white h-[400vh]"
    >
      {/* STICKY FULLSCREEN VIEWPORT */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10 bg-zinc-950">
        
        {/* ATMOSPHERIC GLOWS */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-brand-blue/10 rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        </div>

        {/* RESPONSIVE TOP HEADER: DESKTOP 1-ROW (LEFT, CENTER, RIGHT), TABLET 2-ROW (ROW 1: HEADING & VIEW ALL, ROW 2: TABS), MOBILE 3-ROW (HEADING, TABS, VIEW ALL) */}
        <header 
          id="gallery-responsive-header"
          className="relative z-30 w-full flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap items-center justify-between gap-2.5 sm:gap-3.5 lg:gap-6"
        >
          {/* HEADING (LEFT ON DESKTOP & TABLET, CENTERED OR LEFT ON MOBILE) */}
          <div className="order-1 w-full sm:w-auto shrink-0 flex flex-col justify-center text-center sm:text-left">
            <h2 className="font-serif text-lg sm:text-2xl md:text-2xl lg:text-[26px] xl:text-3xl 2xl:text-4xl font-bold uppercase tracking-tight text-white leading-tight">
              ORBITAL <span className="text-brand-blue italic font-normal">GLASSES GALLERY</span>
            </h2>
          </div>

          {/* CATEGORY TABS (CENTER ON DESKTOP, ROW 2 CENTERED ON TABLET, ROW 2 ON MOBILE) */}
          <div className="order-2 md:order-3 lg:order-2 w-full md:w-full lg:w-auto lg:flex-1 flex items-center justify-center min-w-0 px-1">
            <div className="w-full max-w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex items-center justify-center py-1">
              <div 
                id="product-category-filter"
                className="relative inline-flex items-center p-1 sm:p-1.25 rounded-xl border border-[rgba(59,130,246,0.18)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-[20px] gap-1 sm:gap-1.5 select-none shrink-0"
                style={{ backgroundColor: "rgba(15, 15, 18, 0.75)" }}
                role="tablist"
                aria-label="Product Categories"
              >
                {CATEGORY_OPTIONS.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  const count = cat.id === "all"
                    ? SPIRAL_GLASSES.length
                    : SPIRAL_GLASSES.filter(g => g.category === cat.id).length;

                  return (
                    <button
                      key={cat.id}
                      id={`cat-filter-${cat.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`group relative flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 lg:px-4 py-1.5 sm:py-2 rounded-lg text-[10.5px] sm:text-[11px] lg:text-xs font-semibold uppercase tracking-[0.06em] cursor-pointer whitespace-nowrap select-none shrink-0 transition-all duration-300 ease-out ${
                        isActive
                          ? "text-white"
                          : "text-zinc-400 hover:text-zinc-100 hover:-translate-y-[1px]"
                      }`}
                    >
                      {/* Smooth sliding active illuminated indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeCategoryHeaderPill"
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0066cc] via-[#1a7de6] to-[#0ea5e9] shadow-[0_0_16px_rgba(14,165,233,0.35),0_0_8px_rgba(0,102,204,0.45),inset_0_1px_1px_rgba(255,255,255,0.3)] border border-white/20 pointer-events-none"
                          transition={{
                            duration: 0.35,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        />
                      )}

                      {/* Category Label */}
                      <span className="relative z-10 font-semibold tracking-[0.06em] transition-colors duration-300">
                        {cat.label}
                      </span>

                      {/* Small Circular/Rounded Count Badge */}
                      <span
                        className={`relative z-10 inline-flex items-center justify-center min-w-[18px] sm:min-w-[20px] h-[18px] sm:h-[20px] px-1.5 rounded-full text-[9px] sm:text-[10px] font-medium leading-none transition-all duration-300 shrink-0 ${
                          isActive
                            ? "bg-white/20 text-white border border-white/25 shadow-sm"
                            : "bg-white/[0.06] text-zinc-400 border border-white/[0.08] group-hover:text-zinc-200 group-hover:border-white/15"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* VIEW ALL BUTTON (RIGHT ON DESKTOP & TABLET, ROW 3 ON MOBILE) */}
          <div className="order-3 md:order-2 lg:order-3 w-full sm:w-auto shrink-0 flex items-center justify-center sm:justify-end">
            <button
              id="header-view-all-btn"
              onClick={handleOpenViewAll}
              className="px-3.5 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-full bg-white text-zinc-950 hover:bg-brand-blue hover:text-white font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer shadow-lg hover:shadow-brand-blue/30 shrink-0 whitespace-nowrap"
            >
              <span>VIEW ALL ({SPIRAL_GLASSES.length})</span>
              <Grid size={14} className="shrink-0" />
            </button>
          </div>
        </header>

        {/* CENTER 3D SPIRAL STAGE */}
        <div className="relative z-20 my-auto w-full h-[360px] xs:h-[400px] sm:h-[460px] md:h-[500px] lg:h-[540px] xl:h-[580px] flex items-center justify-center [perspective:1200px] select-none translate-y-6 sm:translate-y-10 md:translate-y-14 lg:translate-y-18 xl:translate-y-20">
          
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
            {filteredGlasses.map((item, index) => (
              <SpiralCardItem
                key={`${selectedCategory}-${item.id}`}
                item={item}
                index={index}
                totalItems={filteredGlasses.length}
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
            className="absolute z-40 flex flex-col items-center justify-center mt-44 sm:mt-48 -translate-y-4 sm:-translate-y-6"
          >
            <div className="relative group">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-brand-blue via-cyan-400 to-indigo-600 opacity-80 blur-xl group-hover:opacity-100 transition-opacity animate-pulse" />
              
              <button
                id="stage-view-all-btn"
                onClick={handleOpenViewAll}
                className="relative px-6 py-3 rounded-full bg-white text-zinc-950 hover:bg-brand-blue hover:text-white font-mono text-sm sm:text-base font-black uppercase tracking-widest shadow-2xl transition-all duration-300 flex items-center gap-3 cursor-pointer hover:scale-105 active:scale-95"
              >
                <Sparkles size={15} className="text-brand-blue group-hover:text-white" />
                <span>VIEW ALL ({SPIRAL_GLASSES.length})</span>
                <ArrowRight size={15} />
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
                <div>
                  <span className="font-mono text-[9px] text-brand-blue font-bold uppercase tracking-widest block mb-1">
                    [ {selectedGlass.category.toUpperCase()} • {selectedGlass.categoryLabel} ]
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-tight text-white pr-4">
                    {selectedGlass.name}
                  </h3>
                </div>

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
                <span>SELECT {selectedGlass.category === "lenses" ? "LENS" : "FRAME"}</span>
                <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VIEW ALL FULL CATALOG SCROLLABLE GALLERY */}
      <AnimatePresence>
        {viewAllModal && (
          <motion.div
            id="view-all-product-gallery"
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 w-full h-full bg-zinc-950/98 backdrop-blur-2xl overflow-y-auto overscroll-contain flex flex-col text-white select-text"
            style={{
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-y",
            }}
          >
            {/* STICKY TOP CONTROLS BAR */}
            <header className="sticky top-0 z-40 w-full bg-zinc-950/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 sm:py-4 shadow-2xl">
              <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
                {/* Heading info & Mobile Close button */}
                <div className="flex items-center justify-between w-full md:w-auto">
                  <div>
                    <span className="font-mono text-[9px] sm:text-[10px] text-brand-blue font-bold uppercase tracking-[0.25em] block">
                      [ COMPLETE ATELIER COLLECTION • {filteredGlasses.length} PIECES ]
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight text-white mt-0.5">
                      {selectedCategory === "all" ? "ALL GLASSES & LENSES" : `${selectedCategory.toUpperCase()} COLLECTION`}
                    </h3>
                  </div>

                  <button
                    onClick={() => setViewAllModal(false)}
                    aria-label="Close View All Gallery"
                    className="md:hidden p-2 rounded-full bg-zinc-900 border border-white/15 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Category Switcher Tabs & Desktop Close Button */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                  <div 
                    className="relative inline-flex items-center p-1 sm:p-1.25 rounded-xl border border-[rgba(59,130,246,0.18)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-[20px] gap-1 sm:gap-1.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-w-full select-none"
                    style={{ backgroundColor: "rgba(15, 15, 18, 0.75)" }}
                    role="tablist"
                    aria-label="Filter products in gallery"
                  >
                    {CATEGORY_OPTIONS.map((cat) => {
                      const count = cat.id === "all"
                        ? SPIRAL_GLASSES.length
                        : SPIRAL_GLASSES.filter(g => g.category === cat.id).length;
                      const isActive = selectedCategory === cat.id;

                      return (
                        <button
                          key={cat.id}
                          type="button"
                          role="tab"
                          aria-selected={isActive}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`group relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 lg:px-4 py-1.5 sm:py-2 rounded-lg text-[10.5px] sm:text-[11px] lg:text-xs font-semibold uppercase tracking-[0.06em] cursor-pointer whitespace-nowrap select-none shrink-0 transition-all duration-300 ease-out ${
                            isActive
                              ? "text-white"
                              : "text-zinc-400 hover:text-zinc-100 hover:-translate-y-[1px]"
                          }`}
                        >
                          {/* Smooth sliding active illuminated indicator */}
                          {isActive && (
                            <motion.div
                              layoutId="activeCategoryModalPill"
                              className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#0066cc] via-[#1a7de6] to-[#0ea5e9] shadow-[0_0_16px_rgba(14,165,233,0.35),0_0_8px_rgba(0,102,204,0.45),inset_0_1px_1px_rgba(255,255,255,0.3)] border border-white/20 pointer-events-none"
                              transition={{
                                duration: 0.35,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                            />
                          )}

                          <span className="relative z-10 font-semibold tracking-[0.06em] transition-colors duration-300">
                            {cat.label}
                          </span>
                          <span className={`relative z-10 inline-flex items-center justify-center min-w-[18px] sm:min-w-[20px] h-[18px] sm:h-[20px] px-1.5 rounded-full text-[9px] sm:text-[10px] font-medium leading-none transition-all duration-300 shrink-0 ${
                            isActive ? "bg-white/20 text-white border border-white/25 shadow-sm" : "bg-white/[0.06] text-zinc-400 border border-white/[0.08] group-hover:text-zinc-200 group-hover:border-white/15"
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Desktop Close Button */}
                  <button
                    onClick={() => setViewAllModal(false)}
                    aria-label="Close View All Gallery"
                    className="hidden md:flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-white text-zinc-950 hover:bg-brand-blue hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-brand-blue/30 cursor-pointer shrink-0"
                  >
                    <span>CLOSE</span>
                    <X size={16} />
                  </button>
                </div>
              </div>
            </header>

            {/* NATURAL FULL-HEIGHT VERTICAL PRODUCT GRID */}
            <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 pb-32">
                {filteredGlasses.map((item) => (
                  <div
                    key={item.id}
                    className="bg-zinc-900/90 hover:bg-zinc-900 rounded-2xl p-4 sm:p-5 flex flex-col justify-between border border-white/10 hover:border-brand-blue/60 transition-all duration-300 shadow-xl group hover:-translate-y-1"
                  >
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-zinc-950 relative border border-white/5">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="font-mono text-[9px] text-white font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
                          {item.badge}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 pb-2 text-left space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                        <span className="text-brand-blue font-bold uppercase tracking-wider">
                          {item.categoryLabel}
                        </span>
                        <span>{item.weight}</span>
                      </div>

                      <h4 className="font-serif text-lg sm:text-xl font-bold uppercase tracking-tight text-white group-hover:text-brand-blue transition-colors line-clamp-1">
                        {item.name}
                      </h4>

                      <p className="font-mono text-xs text-zinc-400">
                        Origin: {item.origin} • {item.material}
                      </p>

                      <div className="pt-2 flex items-baseline justify-between border-t border-white/5">
                        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">Price</span>
                        <span className="font-serif text-xl sm:text-2xl font-bold text-emerald-400">
                          ₹{item.priceINR.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setViewAllModal(false);
                        handleSelectGlass(item);
                      }}
                      className="w-full mt-3 py-2.5 sm:py-3 rounded-xl bg-white hover:bg-brand-blue text-zinc-950 hover:text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow hover:shadow-brand-blue/30"
                    >
                      <span>SELECT {item.category === "lenses" ? "LENS" : "FRAME"}</span>
                      <ArrowRight size={14} />
                    </button>
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
