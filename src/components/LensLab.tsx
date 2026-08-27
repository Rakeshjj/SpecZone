import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Eye, ShieldCheck, Sun, Laptop, Droplets, Info, ArrowRight, CornerDownRight } from "lucide-react";

interface LensScenario {
  id: string;
  name: string;
  label: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  badge: string;
  beforeLabel: string;
  afterLabel: string;
  bgImage: string;
  beforeClasses: string; // Tailored tailwind classes to simulate bad vision/glare
  afterClasses: string;
}

const LENS_SCENARIOS: LensScenario[] = [
  {
    id: "polarized",
    name: "POLARIZED ANTI-REFLECTIVE",
    label: "Road Glare",
    icon: <Sun size={14} />,
    title: "100% Polarized Glare Elimination",
    description: "Our proprietary multi-layer anti-reflective matrix filters out horizontal light waves, completely neutralizing blinding solar reflection from wet roads, ocean surfaces, and oncoming high-beams.",
    badge: "ULTRA SUN SECURITY",
    beforeLabel: "Standard Lens (Blinded by Reflective Glare)",
    afterLabel: "Oculis Polarized (Zero-Reflection Contrast)",
    bgImage: "../assets/img/lens2.jpg",
    beforeClasses: "brightness-[1.3] saturate-[0.6] blur-[2px] contrast-[0.9]", // washed out & glaring
    afterClasses: "brightness-100 saturate-100 blur-0 contrast-105"
  },
  {
    id: "bluelight",
    name: "DIGITAL BLUE-LIGHT PROTECT",
    label: "Screen Fatigue",
    icon: <Laptop size={14} />,
    title: "Smart Wavefront Blue Shield",
    description: "Blocks 99.8% of harmful high-energy visible (HEV) blue-violet radiation emitted by digital displays. Relieves ocular muscle strain and restores natural melatonin sleep-cycle rhythms.",
    badge: "HEV SHIELD RATED",
    beforeLabel: "Unfiltered HEV (Digital Strain & High Contrast Glare)",
    afterLabel: "Oculis Blue-Filter (Optimized Contrast Comfort)",
    bgImage: "../assets/img/bluelens.jpg    ",
    beforeClasses: "hue-rotate-[180deg] saturate-[1.4] brightness-[1.1] blur-[1px]", // blue-shifted & raw
    afterClasses: "sepia-[0.12] brightness-[0.98] contrast-[1.02] blur-0" // warm and balanced
  },
  {
    id: "hydrophobic",
    name: "HYDROPHOBIC & OLEOPHOBIC",
    label: "Rain & Smudges",
    icon: <Droplets size={14} />,
    title: "Active Anti-Smudge Ocular Armor",
    description: "An ultra-slick, nano-structured surface polymer that reduces liquid surface tension, causing water droplets, oil smudges, and dust particles to roll off instantly without leaving streaks.",
    badge: "EASY-CLEAN SHIELD",
    beforeLabel: "Untreated Lens (Water Smudging & Fog Distortion)",
    afterLabel: "Oculis Hydro-Coat (Instant Water-Repelling Clarity)",
    bgImage: "../assets/img/anti-reflections.jpg",
    beforeClasses: "blur-[6px] contrast-[0.85] saturate-[0.9]", // heavily water distorted
    afterClasses: "blur-0 contrast-100 saturate-100"
  }
];

export default function LensLab() {
  const [activeScenario, setActiveScenario] = useState<LensScenario>(LENS_SCENARIOS[0]);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // We allow mousemove tracking on hover as requested in user's design, 
    // but if dragging is preferred or on touch, let's support both effortlessly.
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section
      id="lens-lab"
      className="relative min-h-screen bg-zinc-950 py-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden border-b border-white/5 text-white"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,102,204,0.04)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 space-y-16">
        
        {/* Elegant Section Title */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-white/5">
          <div className="space-y-4">
            <span className="font-mono text-xs tracking-[0.35em] text-brand-blue block uppercase font-bold">
              [ ADVANCED LENS TECHNOLOGY ]
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-[50px] font-black text-white uppercase leading-[0.95] tracking-tight">
              INTERACTIVE <br />
              <span className="text-zinc-500 italic font-black">LENS LAB</span>
            </h2>
            <p className="font-sans text-sm text-zinc-400 max-w-xl font-light leading-relaxed">
              Drag the premium lens slider below to preview how our proprietary optical coatings eliminate blinding glare, block harmful blue light, and resist moisture.
            </p>
          </div>

          {/* Scenario Tab Selectors */}
          <div className="flex flex-wrap gap-2 shrink-0 bg-zinc-900/60 p-1.5 rounded-xl border border-white/5 backdrop-blur-sm">
            {LENS_SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => {
                  setActiveScenario(scenario);
                  setSliderPosition(50); // Reset slider to center
                }}
                className={`px-4 py-2.5 rounded-lg font-mono text-[10px] tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  activeScenario.id === scenario.id
                    ? "bg-brand-blue text-white font-bold shadow-md shadow-brand-blue/20"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {scenario.icon}
                <span>{scenario.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Workspace: Split Slider & Dynamic Spec Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Panel: Dynamic Lens Slider (7 columns) */}
          <div className="lg:col-span-7 space-y-4">
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative aspect-[16/10] w-full bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl select-none cursor-ew-resize"
            >
              {/* Scenario Image Base (Before Layer - Left/Full) */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={activeScenario.bgImage}
                  alt="Standard Vision Glare"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-all duration-300 ${activeScenario.beforeClasses}`}
                />
                
                {/* Simulated glare radial highlight for road-glare to match client's spec */}
                {activeScenario.id === "polarized" && (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.7)_0%,transparent_60%)] mix-blend-overlay opacity-90 pointer-events-none" />
                )}
                {activeScenario.id === "bluelight" && (
                  <div className="absolute inset-0 bg-blue-500/10 mix-blend-color pointer-events-none" />
                )}
                
                {/* HUD Glare Label Overlay */}
                <div className="absolute bottom-4 left-6 z-10 px-3 py-1 bg-black/60 backdrop-blur-md rounded-md border border-white/5">
                  <span className="font-mono text-[9px] text-red-400 font-bold uppercase tracking-widest">
                    {activeScenario.beforeLabel}
                  </span>
                </div>
              </div>

              {/* Scenario Image Revealed (After Layer - Sliding Right) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <div className="absolute inset-0 w-[100cqw] h-full" style={{ width: containerRef.current?.getBoundingClientRect().width }}>
                  <img
                    src={activeScenario.bgImage}
                    alt="Oculis Precision Vision"
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-all duration-300 ${activeScenario.afterClasses}`}
                  />
                  
                  {/* Glass tint shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 pointer-events-none" />

                  {/* HUD Crisp Label Overlay */}
                  <div className="absolute bottom-4 left-6 z-10 px-3 py-1 bg-black/60 backdrop-blur-md rounded-md border border-white/5 whitespace-nowrap">
                    <span className="font-mono text-[9px] text-brand-blue font-bold uppercase tracking-widest">
                      {activeScenario.afterLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Luminous Sliding Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-brand-blue z-20"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Center Control Handle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-blue border-2 border-white flex items-center justify-center shadow-lg shadow-brand-blue/40 z-30 transition-transform hover:scale-110 active:scale-95">
                  <div className="flex gap-1 items-center justify-center text-white">
                    <span className="font-sans text-xs font-bold font-mono">↔</span>
                  </div>
                </div>
                {/* High Tech Glowing Pulse */}
                <div className="absolute inset-0 w-[4px] -left-[1px] bg-brand-blue blur-sm opacity-50" />
              </div>

              {/* HUD Sensor Scanner indicators */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/60 backdrop-blur-md rounded-md border border-white/10 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-ping" />
                <span className="font-mono text-[9px] text-zinc-300 uppercase tracking-widest">
                  COATING ANALYZER // ACTIVE
                </span>
              </div>

              <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-black/60 backdrop-blur-md rounded-md border border-white/10">
                <span className="font-mono text-[9px] text-brand-blue uppercase tracking-widest font-bold">
                  REVEAL: {Math.round(sliderPosition)}%
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center px-2">
              <span className="font-mono text-[9px] text-zinc-500 uppercase">← STANDARD WASHED OPTIC</span>
              <span className="font-mono text-[9px] text-zinc-500 uppercase">OCULIS BESPOKE GLASS →</span>
            </div>
          </div>

          {/* Right Panel: Feature Info & Premium Details (5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8">
            <div className="space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20">
                <Sparkles size={11} className="text-brand-blue" />
                <span className="font-mono text-[9px] font-bold text-brand-blue tracking-widest uppercase">
                  {activeScenario.badge}
                </span>
              </div>

              <h3 className="font-serif text-3xl md:text-4xl font-normal text-white uppercase leading-tight tracking-tight">
                {activeScenario.title}
              </h3>

              <p className="font-sans text-sm text-zinc-300 leading-relaxed font-light">
                {activeScenario.description}
              </p>

              {/* Technical Specifications list */}
              <div className="space-y-3.5 pt-4 border-t border-white/5">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-zinc-900 border border-white/5 text-brand-blue shrink-0 mt-0.5">
                    <ShieldCheck size={14} />
                  </div>
                  <div>
                    <h5 className="font-mono text-[10px] font-bold text-white uppercase tracking-wider">High Index Multi-Resiliency</h5>
                    <p className="font-sans text-xs text-zinc-400 mt-0.5">Sartorial scratch-resistant and anti-reflective armor on both sides of the lenses.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-zinc-900 border border-white/5 text-brand-blue shrink-0 mt-0.5">
                    <Eye size={14} />
                  </div>
                  <div>
                    <h5 className="font-mono text-[10px] font-bold text-white uppercase tracking-wider">Perfect Visual Neutrality</h5>
                    <p className="font-sans text-xs text-zinc-400 mt-0.5">Zero chromatic aberrations, securing natural depth perception and premium optical alignment.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Link button */}
            <div className="pt-6 border-t border-white/5">
              <button
                onClick={() => {
                  const shopSection = document.getElementById("opticals-shop");
                  if (shopSection) {
                    shopSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="relative w-full px-6 py-4 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-white/10 hover:border-brand-blue/30 text-zinc-300 hover:text-white backdrop-blur-sm transition-all group flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Info size={14} className="text-brand-blue" />
                  <span className="font-mono text-[10px] tracking-wider uppercase font-bold text-left">
                    Explore Compatible Premium Frames
                  </span>
                </div>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}



