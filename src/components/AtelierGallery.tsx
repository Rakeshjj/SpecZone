import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowDown, Eye, Maximize2, ShieldCheck, Sparkles, X, Heart, Ruler, MapPin } from "lucide-react";
import confetti from "canvas-confetti";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  location: string;
  specs: {
    material: string;
    measurements: string;
    fitting: string;
    origin: string;
  };
}

const GALLERY_IMAGES: GalleryItem[] = [
  // Row 1
  {
    id: 1,
    title: "Backlit Glass Gallery",
    category: "LUMINOUS DISPLAY",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=600",
    description: "Floating float-glass shelves accented by micro-dimmed warm backlights, highlighting the intricate metallic veins of curated frames.",
    location: "Milan Flagship Suite",
    specs: {
      material: "Architectural Tempered Float-Glass & Solid Brass Rails",
      measurements: "Interactive Grid Wall (3.6m x 2.4m)",
      fitting: "Ambient Backlit Luminance Display System",
      origin: "Milan Flagship Studio",
    },
  },
  {
    id: 2,
    title: "Minimal Titanium Arc",
    category: "ARCHITECTURAL EYEWEAR",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=600",
    description: "Pure, screwless Danish architectural eyewear. Hand-bent from single sheets of clinical-grade beta-titanium for featherlight durability.",
    location: "Copenhagen Atelier",
    specs: {
      material: "Clinical-Grade Pure Beta-Titanium (0.8mm core sheet)",
      measurements: "49-21-140 mm (Sleek Geometric Fit)",
      fitting: "Screwless Friction-Fit Tension Temples",
      origin: "Copenhagen Atelier Labs",
    },
  },
  {
    id: 3,
    title: "Wavefront Refraction Suite",
    category: "ADVANCED DIAGNOSTICS",
    image: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?auto=format&fit=crop&q=80&w=600",
    description: "Clinical precision meets high-end spatial design. Executing sub-micron ocular mapping in serene, acoustically dampened spaces.",
    location: "Tokyo Diagnostic Suite",
    specs: {
      material: "Acoustic-Dampened Solid European Walnut & Brushed Aluminum",
      measurements: "Sub-micron digital wavefront refraction scanner",
      fitting: "Acoustic Noise-Isolating Patient Booth",
      origin: "Tokyo Optical Engineering Labs",
    },
  },
  {
    id: 4,
    title: "The Aviator Monolith",
    category: "AVANT-GARDE DESIGN",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600",
    description: "Sculptural thick-cut bio-acetate contours inspired by futuristic art installations. A daring expression that commands immediate presence.",
    location: "Tokyo Concept Store",
    specs: {
      material: "8mm Thick-Cut Plant-Based Italian Bio-Acetate",
      measurements: "55-16-145 mm (High-Impact Broad Profile)",
      fitting: "Hand-Scorched Beveled Nose Bridges",
      origin: "Tokyo Concept Store Guild",
    },
  },
  // Row 2
  {
    id: 5,
    title: "Sartorial Gold Engraving",
    category: "PRECIOUS METALS",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600",
    description: "Bespoke precious metal contours. Horology-grade 18-karat gold-plated frame structures, hand-burnished to a rich satin luster.",
    location: "Paris Heritage Salon",
    specs: {
      material: "18-Karat Gold-Plated Surgical Stainless Steel Core",
      measurements: "53-20-140 mm (Elegant D-Frame Profile)",
      fitting: "Filigree Guilloché Pattern Nosepieces",
      origin: "Paris Heritage Atelier",
    },
  },
  {
    id: 6,
    title: "Bespoke Face-Mapping",
    category: "3D FIT SCULPTING",
    image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&q=80&w=600",
    description: "Proprietary facial scanning software mapping over 10,000 visage coordinates to custom-size lens shapes perfectly.",
    location: "Chennai Innovation Lab",
    specs: {
      material: "3D Printed Biocompatible High-Performance Polymers",
      measurements: "Fully tailored to individual facial coordinates",
      fitting: "Proportional Bridge & Temple Tailoring",
      origin: "Chennai Innovation Lab",
    },
  },
  {
    id: 7,
    title: "The Tortoiseshell Atelier",
    category: "HANDCRAFTED ART",
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=600",
    description: "Exquisite Japanese organic acetates, undergoing a meticulous 72-hour barrel polishing process for a deep natural gloss.",
    location: "Kyoto Workshop Guild",
    specs: {
      material: "Aged Organic Cotton-Derivative Japanese Acetate",
      measurements: "48-22-145 mm (Classical Keyhole Bridge Fit)",
      fitting: "72-Hour Organic Wooden Barrel Polishing",
      origin: "Kyoto Master Guild",
    },
  },
  {
    id: 8,
    title: "Acoustic Calibration Vault",
    category: "INTELLIGENT AUDIOLOGY",
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=600",
    description: "Zero-resonance testing booths fitted with high-frequency diagnostic software to fine-tune invisible bluetooth hearing devices.",
    location: "Zurich Audiology Suite",
    specs: {
      material: "Acoustically Isolated Foam & Perforated Kevlar",
      measurements: "128-Channel digital audio calibration suite",
      fitting: "Bespoke In-Ear Acoustic Mold Calibration",
      origin: "Zurich Audiology Labs",
    },
  },
];

export default function AtelierGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [likedItems, setLikedItems] = useState<number[]>([]);

  const toggleLike = (id: number) => {
    const isLiked = likedItems.includes(id);
    if (isLiked) {
      setLikedItems(likedItems.filter((i) => i !== id));
    } else {
      setLikedItems([...likedItems, id]);
      
      // Fire next-level interactive confetti celebration
      try {
        confetti({
          particleCount: 70,
          spread: 55,
          origin: { y: 0.75 },
          colors: ["#0066cc", "#3b82f6", "#ffffff", "#ff4b4b", "#ffd700"]
        });
      } catch (err) {
        console.warn("Confetti failed on like", err);
      }
    }
  };

  // Hook scroll velocity and progress for beautiful dynamic parallax shifts
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth translation outputs based on scrolling down the page
  const rowOneX = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const rowTwoX = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rowOneY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -10, -20]);
  const rowTwoY = useTransform(scrollYProgress, [0, 0.5, 1], [20, 5, -10]);

  const row1 = GALLERY_IMAGES.slice(0, 4);
  const row2 = GALLERY_IMAGES.slice(4, 8);

  return (
    <section
      ref={containerRef}
      id="gallery-reveal"
      className="relative min-h-screen bg-[#fafafa]/80 py-24 flex flex-col justify-center overflow-hidden border-b border-zinc-250/20 backdrop-blur-md"
    >
      {/* Dynamic Background Light Rays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,100,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* Grid Pattern Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 z-10 space-y-12 mb-10">
        {/* Header Block with luxurious typography */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="space-y-4">
            <span className="font-mono text-xs tracking-[0.35em] text-brand-blue block">
              [ EXHIBITION : THE OPTICAL ARCHIVE ]
            </span>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black text-zinc-950 uppercase leading-[0.85] tracking-tighter">
              COVETED <br />
              <span className="text-zinc-400 italic font-black">ATELIERS</span>
            </h2>
            <p className="font-sans text-sm text-zinc-600 max-w-xl font-light leading-relaxed">
              Browse through our global ateliers and structural archives. Click any high-fashion visual asset below to unveil precision technical specifications and customize your boutique selection.
            </p>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage Container */}
      <div className="w-full relative flex flex-col justify-center space-y-12 select-none my-6">
        
        {/* FIRST ROW OF 4 PORTRAIT CARDS */}
        <div className="overflow-hidden py-4 w-full">
          <motion.div
            style={{ x: rowOneX, y: rowOneY }}
            className="flex space-x-8 w-max px-6 md:px-12"
          >
            {row1.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -12, scale: 1.03 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={() => setSelectedItem(item)}
                className="w-[280px] sm:w-[320px] aspect-[3/4.2] bg-white/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-zinc-200/30 hover:border-brand-blue/40 hover:shadow-[0_15px_45px_rgba(10,100,255,0.08)] transition-all duration-500 relative cursor-pointer group shrink-0 flex flex-col justify-between"
              >
                {/* 100% Opacity Image with no overlays on the image part */}
                <div className="relative w-full h-[72%] overflow-hidden bg-zinc-50 border-b border-zinc-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-100 group-hover:scale-110 transition-transform duration-1000 ease-out pointer-events-none"
                  />
                  
                  {/* Floating "Like" Heart Badge */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(item.id);
                    }}
                    className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm border border-zinc-200/20 hover:border-red-500 hover:bg-red-50 flex items-center justify-center text-zinc-600 transition-all duration-300 shadow-sm"
                  >
                    <Heart
                      size={15}
                      className={`transition-all duration-300 ${
                        likedItems.includes(item.id) ? "fill-red-500 text-red-500 scale-125" : "text-zinc-600/75 group-hover:text-zinc-900"
                      }`}
                    />
                  </button>
                </div>

                {/* Info block with clear dark text in white themed card */}
                <div className="p-5 flex justify-between items-end bg-white/20 backdrop-blur-sm h-[28%]">
                  <div className="space-y-1">
                    <span className="block font-mono text-[8px] tracking-[0.25em] text-brand-blue uppercase font-black">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-lg font-black text-zinc-900 uppercase tracking-tight leading-tight">
                      {item.title}
                    </h4>
                    <span className="block font-mono text-[8px] text-zinc-400 uppercase tracking-widest mt-0.5">
                      {item.location}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-200 group-hover:bg-brand-blue group-hover:border-brand-blue flex items-center justify-center transition-all duration-300 shrink-0">
                    <Maximize2 size={12} className="text-zinc-500 group-hover:text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* SECOND ROW OF 4 PORTRAIT CARDS */}
        <div className="overflow-hidden py-4 w-full">
          <motion.div
            style={{ x: rowTwoX, y: rowTwoY }}
            className="flex space-x-8 w-max px-6 md:px-12"
          >
            {row2.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -12, scale: 1.03 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={() => setSelectedItem(item)}
                className="w-[280px] sm:w-[320px] aspect-[3/4.2] bg-white/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-zinc-200/30 hover:border-brand-blue/40 hover:shadow-[0_15px_45px_rgba(10,100,255,0.08)] transition-all duration-500 relative cursor-pointer group shrink-0 flex flex-col justify-between"
              >
                {/* 100% Opacity Image */}
                <div className="relative w-full h-[72%] overflow-hidden bg-zinc-50 border-b border-zinc-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-100 group-hover:scale-110 transition-transform duration-1000 ease-out pointer-events-none"
                  />
                  
                  {/* Floating "Like" Heart Badge */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(item.id);
                    }}
                    className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm border border-zinc-200/20 hover:border-red-500 hover:bg-red-50 flex items-center justify-center text-zinc-600 transition-all duration-300 shadow-sm"
                  >
                    <Heart
                      size={15}
                      className={`transition-all duration-300 ${
                        likedItems.includes(item.id) ? "fill-red-500 text-red-500 scale-125" : "text-zinc-600/75 group-hover:text-zinc-900"
                      }`}
                    />
                  </button>
                </div>

                {/* Info block with clear dark text in white themed card */}
                <div className="p-5 flex justify-between items-end bg-white/20 backdrop-blur-sm h-[28%]">
                  <div className="space-y-1">
                    <span className="block font-mono text-[8px] tracking-[0.25em] text-brand-blue uppercase font-black">
                      {item.category}
                    </span>
                    <h4 className="font-serif text-lg font-black text-zinc-900 uppercase tracking-tight leading-tight">
                      {item.title}
                    </h4>
                    <span className="block font-mono text-[8px] text-zinc-400 uppercase tracking-widest mt-0.5">
                      {item.location}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-zinc-50 border border-zinc-200 group-hover:bg-brand-blue group-hover:border-brand-blue flex items-center justify-center transition-all duration-300 shrink-0">
                    <Maximize2 size={12} className="text-zinc-500 group-hover:text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Decorative Interactive Bottom Banner */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 z-10 flex flex-col md:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-zinc-200/40 text-center md:text-left">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-brand-blue animate-pulse" />
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-zinc-400">
            [ HORIZONTAL MOTION PARALLAX DRIVEN BY ACTIVE VIEWPORT SCROLL ]
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
            CLICK ANY ATELIER CARD TO UNVEIL SPECS & SAVE
          </span>
          <ArrowDown size={12} className="text-brand-blue animate-bounce" />
        </div>
      </div>

      {/* REDESIGNED SPECS LIGHTBOX MODAL ("like box scapes") */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8"
          >
            {/* Modal Glass Container - White Themed */}
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", stiffness: 120, damping: 22 }}
              className="bg-white/60 backdrop-blur-md border border-zinc-200/40 rounded-3xl overflow-hidden max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 relative shadow-[0_25px_60px_rgba(10,100,255,0.15)]"
            >
              {/* Sleek Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-5 right-5 z-40 w-10 h-10 rounded-full bg-white/60 backdrop-blur-sm border border-zinc-200/20 hover:border-brand-blue hover:bg-brand-blue hover:text-white flex items-center justify-center text-zinc-700 transition-all duration-300 cursor-pointer shadow-md"
              >
                <X size={18} />
              </button>

              {/* Left Side: Heavy Image Frame with watermarked details */}
              <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto min-h-[280px] lg:min-h-[550px] bg-zinc-100 overflow-hidden group">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating Specs Watermark Info */}
                <div className="absolute bottom-6 left-6 z-20 space-y-1.5">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-white/60 block">
                    [ ATELIER ARCHIVE NO // ID_00{selectedItem.id} ]
                  </span>
                  <p className="font-display text-[10px] text-white/90 font-extrabold tracking-widest uppercase">
                    CHENNAI & COIMBATORE BOUTIQUE LIBRARY
                  </p>
                </div>
              </div>

              {/* Right Side: High-End Specifications Specification Sheet Panel */}
              <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-between space-y-8 bg-zinc-50/20 backdrop-blur-sm">
                
                <div className="space-y-6">
                  {/* Category Indicator Tag */}
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 bg-brand-blue rounded-full animate-ping" />
                    <span className="font-mono text-[9px] tracking-[0.3em] text-brand-blue uppercase font-black">
                      {selectedItem.category}
                    </span>
                  </div>

                  {/* Title & Location details */}
                  <div className="space-y-2">
                    <h3 className="font-serif text-3xl md:text-5xl font-black text-zinc-900 uppercase tracking-tight leading-none">
                      {selectedItem.title}
                    </h3>
                    <div className="flex items-center gap-2 text-zinc-500">
                      <MapPin size={12} className="text-brand-blue" />
                      <span className="font-display text-xs tracking-wider uppercase">
                        {selectedItem.location}
                      </span>
                    </div>
                  </div>

                  {/* Curated Description */}
                  <p className="font-sans text-sm text-zinc-600 leading-relaxed font-light">
                    {selectedItem.description}
                  </p>

                  {/* HIGH-FIDELITY SPECIFICATIONS TABLE GRID */}
                  <div className="space-y-3 pt-4 border-t border-zinc-200/40">
                    <h4 className="font-mono text-[10px] tracking-widest text-zinc-500 uppercase flex items-center gap-2">
                      <Ruler size={12} className="text-brand-blue" />
                      SPECIFICATIONS DATA
                    </h4>
                    
                    <div className="grid grid-cols-1 gap-2.5">
                      <div className="flex justify-between items-center py-2.5 px-4 bg-white/40 backdrop-blur-sm rounded-xl border border-zinc-200/30 hover:border-zinc-300 transition-colors shadow-sm">
                        <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider">CRAFT MATERIAL</span>
                        <span className="font-display text-xs font-bold text-zinc-800 uppercase text-right max-w-[210px] truncate">
                          {selectedItem.specs.material}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2.5 px-4 bg-white/40 backdrop-blur-sm rounded-xl border border-zinc-200/30 hover:border-zinc-300 transition-colors shadow-sm">
                        <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider">MEASUREMENTS</span>
                        <span className="font-display text-xs font-bold text-zinc-800 uppercase text-right">
                          {selectedItem.specs.measurements}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2.5 px-4 bg-white/40 backdrop-blur-sm rounded-xl border border-zinc-200/30 hover:border-zinc-300 transition-colors shadow-sm">
                        <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider">FACIAL FITTING</span>
                        <span className="font-display text-xs font-bold text-zinc-800 uppercase text-right">
                          {selectedItem.specs.fitting}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2.5 px-4 bg-white/40 backdrop-blur-sm rounded-xl border border-zinc-200/30 hover:border-zinc-300 transition-colors shadow-sm">
                        <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider">ORIGIN ATELIER</span>
                        <span className="font-display text-xs font-bold text-brand-blue uppercase text-right">
                          {selectedItem.specs.origin}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Wishlist interactive bar and buttons */}
                <div className="space-y-4 pt-6 border-t border-zinc-200/40 font-sans">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center border border-brand-blue/20">
                      <ShieldCheck size={14} className="text-brand-blue" />
                    </div>
                    <div>
                      <span className="block font-mono text-[8px] text-zinc-400 tracking-wider uppercase">
                        ATELIER SECURITY
                      </span>
                      <span className="font-display text-[10px] text-zinc-800 font-extrabold tracking-widest uppercase">
                        100% BESPOKE ARCHIVE AUTHENTICITY
                      </span>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => toggleLike(selectedItem.id)}
                      className={`flex-grow py-4 px-5 rounded-xl font-display text-[11px] font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border ${
                        likedItems.includes(selectedItem.id)
                          ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                          : "bg-zinc-900 text-white border-zinc-900 hover:bg-brand-blue hover:border-brand-blue"
                      }`}
                    >
                      <Heart size={14} className={likedItems.includes(selectedItem.id) ? "fill-red-500 text-red-500 animate-pulse" : ""} />
                      {likedItems.includes(selectedItem.id) ? "REMOVE FROM WISHLIST" : "SAVE TO WISHLIST"}
                    </button>

                    <button
                      onClick={() => setSelectedItem(null)}
                      className="py-4 px-6 rounded-xl bg-zinc-200 hover:bg-zinc-300 text-zinc-700 border border-zinc-200 font-mono text-[10px] tracking-widest uppercase transition-all cursor-pointer"
                    >
                      CLOSE DIALOG
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
