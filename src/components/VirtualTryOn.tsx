import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, Upload, RotateCcw, ShieldCheck, Heart, Trash2 } from "lucide-react";

interface ModelPreset {
  id: string;
  name: string;
  gender: string;
  image: string;
  defaultY: number;
}

interface FrameStyle {
  id: string;
  name: string;
  brand: string;
  shape: string;
  colors: { name: string; hex: string; stroke: string }[];
  defaultScale: number;
  svgPath: string; // To draw premium looking custom vector glasses
}

const MODELS_DATA: ModelPreset[] = [
  {
    id: "model1",
    name: "Sienna (Parisian Classic)",
    gender: "Femme",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
    defaultY: 42,
  },
  {
    id: "model2",
    name: "Dimitri (Milan Modernist)",
    gender: "Homme",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    defaultY: 40,
  },
  {
    id: "model3",
    name: "Kenji (Tokyo Avant-Garde)",
    gender: "Unisex",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
    defaultY: 38,
  }
];

const FRAMES_DATA: FrameStyle[] = [
  {
    id: "frame1",
    name: "Maybach Monolith Aviator",
    brand: "Maybach Eyewear",
    shape: "Double-Bridge Aviator",
    defaultScale: 100,
    colors: [
      { name: "Satin 18K Gold", hex: "#ffd700", stroke: "#e6c200" },
      { name: "Satin Platinum", hex: "#e5e5e5", stroke: "#cccccc" },
      { name: "Piano Black", hex: "#111111", stroke: "#000000" }
    ],
    // Custom beautiful Aviator path (drawn to overlay precisely on face)
    svgPath: "M 20,40 Q 45,35 70,40 Q 95,35 120,40 C 130,40 145,55 145,70 C 145,95 115,100 100,100 C 85,100 75,80 70,75 Q 70,75 70,75 Q 65,80 55,100 C 40,100 10,95 10,70 C 10,55 20,40 20,40 Z"
  },
  {
    id: "frame2",
    name: "Balmain Haute Cat-Eye",
    brand: "Balmain Paris",
    shape: "Aesthetic Cat-Eye",
    defaultScale: 95,
    colors: [
      { name: "Gloss Tortoiseshell", hex: "#8b5a2b", stroke: "#4a2e16" },
      { name: "Satin Rose Gold", hex: "#b76e79", stroke: "#9e5c66" },
      { name: "Noir Onyx", hex: "#1a1a1a", stroke: "#000000" }
    ],
    svgPath: "M 10,35 C 10,35 45,20 70,42 C 95,20 130,35 130,35 C 145,35 150,55 140,75 C 130,95 110,95 100,90 C 90,85 85,75 70,72 C 55,75 50,85 40,90 C 30,95 10,95 0,75 C -10,55 -5,35 10,35 Z"
  },
  {
    id: "frame3",
    name: "Lindberg Air Titanium",
    brand: "Lindberg Denmark",
    shape: "Screwless Hexagonal",
    defaultScale: 90,
    colors: [
      { name: "Brushed Graphite", hex: "#4b5563", stroke: "#374151" },
      { name: "Pure Titanium", hex: "#9ca3af", stroke: "#6b7280" },
      { name: "Imperial Gold", hex: "#d97706", stroke: "#b45309" }
    ],
    svgPath: "M 15,40 L 45,30 L 75,40 L 65,75 L 35,85 L 10,70 Z M 75,40 L 105,30 L 135,40 L 130,70 L 105,85 L 75,75 Z"
  },
  {
    id: "frame4",
    name: "Chopard Diamond-Cut Marquetry",
    brand: "Chopard",
    shape: "Rimless Soft Rectangle",
    defaultScale: 92,
    colors: [
      { name: "Diamond-Cut 24K Gold", hex: "#fbbf24", stroke: "#f59e0b" },
      { name: "Stellar Chrome", hex: "#cbd5e1", stroke: "#94a3b8" }
    ],
    svgPath: "M 15,42 Q 45,38 72,42 Q 99,38 129,42 Q 139,45 139,68 Q 139,90 109,90 Q 79,90 72,75 Q 65,90 35,90 Q 5,90 5,68 Q 5,45 15,42 Z"
  }
];

interface VirtualTryOnProps {
  onPreSelectFrame: (frameName: string) => void;
}

export default function VirtualTryOn({ onPreSelectFrame }: VirtualTryOnProps) {
  const [selectedModel, setSelectedModel] = useState<ModelPreset>(MODELS_DATA[0]);
  const [selectedFrame, setSelectedFrame] = useState<FrameStyle>(FRAMES_DATA[0]);
  const [activeColor, setActiveColor] = useState(FRAMES_DATA[0].colors[0]);
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  
  // Interactive Frame Manipulation States
  const [scale, setScale] = useState(100);
  const [yOffset, setYOffset] = useState(0);
  const [xOffset, setXOffset] = useState(0);
  const [lensTint, setLensTint] = useState<string>("transparent");
  const [tintOpacity, setTintOpacity] = useState(0); // 0 to 80%

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Synchronize color options when switching frames
  const handleFrameChange = (frame: FrameStyle) => {
    setSelectedFrame(frame);
    setActiveColor(frame.colors[0]);
    setScale(frame.defaultScale);
    setYOffset(0);
    setXOffset(0);
  };

  // Reset Adjustments
  const handleReset = () => {
    setScale(selectedFrame.defaultScale);
    setYOffset(0);
    setXOffset(0);
    setLensTint("transparent");
    setTintOpacity(0);
  };

  // File upload logic for custom selfie
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCustomPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCustomPhoto = () => {
    setCustomPhoto(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <section
      id="virtual-try-on"
      className="relative min-h-screen bg-zinc-950 py-24 px-6 md:px-12 flex flex-col justify-center overflow-hidden border-b border-white/5 text-white"
    >
      {/* Backlit Glow Ring */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,102,204,0.06)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6"
        >
          <div className="space-y-4">
            <span className="font-mono text-xs tracking-[0.3em] text-brand-blue block">
              [ HIGH-TECH INTERACTIVE : ATELIER SIMULATOR ]
            </span>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase leading-[0.85] tracking-tighter">
              VIRTUAL <br />
              <span className="text-zinc-500 italic font-black">TRY-ON</span>
            </h2>
            <p className="font-sans text-sm text-zinc-400 max-w-xl font-light leading-relaxed">
              Experience the future of high-fashion eyewear selection. Toggle prestigious hand-crafted silhouettes, choose horology-grade metals, or upload your own portrait to discover your custom visual visage.
            </p>
          </div>
        </motion.div>

        {/* Core Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Panel: The Studio Mirror Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col items-center"
          >
            <div className="relative w-full max-w-[480px] aspect-[4/5] rounded-3xl overflow-hidden border-2 border-white/10 bg-zinc-900/40 backdrop-blur-sm shadow-2xl group flex items-center justify-center">
              
              {/* Premium Backlit Aura behind the portrait */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10 pointer-events-none" />
              
              {/* Luminous laser alignment line */}
              <div className="absolute left-6 right-6 top-1/2 h-[1px] bg-brand-blue/20 animate-pulse z-10 pointer-events-none" />
              
              {/* Portrait Image Layer (Preset vs Selfie) */}
              <img
                src={customPhoto || selectedModel.image}
                alt="Portrait for Try-On"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-500 select-none pointer-events-none"
              />

              {/* Dynamic Lens Tint Overlay */}
              {tintOpacity > 0 && (
                <div 
                  className="absolute inset-0 z-20 pointer-events-none transition-all duration-300"
                  style={{
                    background: lensTint === "amber" 
                      ? `radial-gradient(circle at 50% 40%, rgba(245, 158, 11, ${tintOpacity / 100}) 15%, transparent 60%)`
                      : lensTint === "blue"
                      ? `radial-gradient(circle at 50% 40%, rgba(59, 130, 246, ${tintOpacity / 100}) 15%, transparent 60%)`
                      : `radial-gradient(circle at 50% 40%, rgba(75, 85, 99, ${tintOpacity / 100}) 15%, transparent 60%)`
                  }}
                />
              )}

              {/* Dynamic Custom Vector Frame Overlay (PRECISE VECTOR PLACEMENT) */}
              <div 
                className="absolute z-30 pointer-events-none transition-all duration-200"
                style={{
                  top: `${customPhoto ? 40 : selectedModel.defaultY + yOffset}%`,
                  left: `${50 + xOffset}%`,
                  width: `${scale * 1.5}px`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <svg
                  viewBox="0 0 150 110"
                  className="w-full h-auto drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]"
                >
                  {/* Left & Right Glass Lenses (Dynamic fill tint) */}
                  <path
                    d={selectedFrame.svgPath}
                    fill={
                      lensTint === "amber" 
                        ? `rgba(245, 158, 11, ${0.15 + (tintOpacity / 200)})`
                        : lensTint === "blue"
                        ? `rgba(59, 130, 246, ${0.15 + (tintOpacity / 200)})`
                        : lensTint === "classic"
                        ? `rgba(75, 85, 99, ${0.15 + (tintOpacity / 200)})`
                        : "rgba(255, 255, 255, 0.05)"
                    }
                    stroke={activeColor.stroke}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-300"
                  />
                  {/* Reflective shine stroke overlay */}
                  <path 
                    d="M 15,50 Q 25,45 35,55 M 85,50 Q 95,45 105,55" 
                    stroke="rgba(255, 255, 255, 0.45)" 
                    strokeWidth="1.2" 
                    fill="none" 
                  />
                </svg>
              </div>

              {/* HUD / Scanning overlays */}
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
                <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-ping" />
                <span className="font-mono text-[9px] text-white/90 tracking-widest uppercase">
                  {customPhoto ? "SECURE CLIENT FEED" : "MODEL ATELIER ACTIVE"}
                </span>
              </div>

              <div className="absolute top-6 right-6 z-20">
                <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
                  <span className="font-mono text-[9px] text-white/50 tracking-widest uppercase">
                    SCALE: {scale}%
                  </span>
                </div>
              </div>

              {/* Bottom preset selection labels */}
              <div className="absolute bottom-6 left-6 z-20">
                <span className="font-mono text-[8px] tracking-[0.25em] text-brand-blue block">
                  ACTIVE SIMULATION
                </span>
                <span className="font-display text-sm font-bold text-white tracking-wide block uppercase mt-0.5">
                  {selectedFrame.name}
                </span>
              </div>
            </div>

            {/* Sub-Mirror Controls: Presets Toggle & Photo Upload */}
            <div className="mt-6 w-full max-w-[480px] flex flex-wrap gap-3 justify-between items-center bg-zinc-900/40 border border-white/10 backdrop-blur-sm rounded-2xl p-4">
              
              <div className="flex gap-2">
                {MODELS_DATA.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      setSelectedModel(model);
                      removeCustomPhoto();
                    }}
                    className={`px-3 py-1.5 rounded-lg border font-mono text-[9px] uppercase tracking-wider transition-all cursor-pointer ${
                      selectedModel.id === model.id && !customPhoto
                        ? "bg-white text-black border-white font-bold"
                        : "bg-black/40 text-white/60 border-white/10 hover:text-white"
                    }`}
                  >
                    {model.gender}
                  </button>
                ))}
              </div>

              {/* Upload Selfie */}
              <div className="flex gap-2">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                {!customPhoto ? (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-brand-blue hover:bg-brand-blue/80 text-white font-mono text-[9px] uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border border-brand-blue/20"
                  >
                    <Upload size={10} /> Upload Portrait
                  </button>
                ) : (
                  <button
                    onClick={removeCustomPhoto}
                    className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 font-mono text-[9px] uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border border-red-900/30"
                  >
                    <Trash2 size={10} /> Reset Selfie
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Panel: Interactive Frame Specifications & Controls */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col space-y-8 bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10"
          >
            
            {/* Step 1: Select Frame Shape */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center font-mono text-[9px] text-brand-blue font-bold">1</span>
                <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">CHOOSE FRAME SILHOUETTE</span>
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {FRAMES_DATA.map((frame) => (
                  <button
                    key={frame.id}
                    onClick={() => handleFrameChange(frame)}
                    className={`w-full p-4 rounded-xl border text-left flex justify-between items-center transition-all cursor-pointer ${
                      selectedFrame.id === frame.id
                        ? "bg-white text-zinc-950 border-white shadow-lg"
                        : "bg-black/30 text-zinc-300 border-white/5 hover:border-white/20 hover:bg-black/50"
                    }`}
                  >
                    <div>
                      <span className="block font-mono text-[8px] tracking-wider uppercase opacity-60">
                        {frame.brand}
                      </span>
                      <h4 className="font-display text-xs font-extrabold tracking-wide uppercase mt-0.5">
                        {frame.name}
                      </h4>
                    </div>
                    <span className="font-mono text-[8px] uppercase px-2 py-0.5 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue rounded-full">
                      {frame.shape}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Precious Metal / Color */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center font-mono text-[9px] text-brand-blue font-bold">2</span>
                <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">SELECT PRECIOUS LUSTER</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {selectedFrame.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setActiveColor(color)}
                    className={`px-4 py-2 rounded-xl border flex items-center gap-2.5 transition-all cursor-pointer ${
                      activeColor.name === color.name
                        ? "bg-white/10 text-white border-white font-bold"
                        : "bg-black/40 text-zinc-400 border-white/5 hover:border-white/10 hover:text-white"
                    }`}
                  >
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="font-display text-[10px] tracking-wider uppercase font-semibold">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Lens Tint Option */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center font-mono text-[9px] text-brand-blue font-bold">3</span>
                <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">LENS TINT & POLARIZATION</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "transparent", label: "CLEAR", hex: "#ffffff" },
                  { id: "amber", label: "AMBER", hex: "#f59e0b" },
                  { id: "blue", label: "OCEAN", hex: "#3b82f6" },
                  { id: "classic", label: "SMOKE", hex: "#4b5563" },
                ].map((tint) => (
                  <button
                    key={tint.id}
                    onClick={() => {
                      setLensTint(tint.id);
                      if (tint.id === "transparent") {
                        setTintOpacity(0);
                      } else if (tintOpacity === 0) {
                        setTintOpacity(40);
                      }
                    }}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                      lensTint === tint.id
                        ? "bg-white text-zinc-950 border-white font-bold"
                        : "bg-black/30 text-zinc-400 border-white/5 hover:border-white/10"
                    }`}
                  >
                    <span 
                      className="w-4 h-4 rounded-full border border-white/10 shadow-inner"
                      style={{ backgroundColor: tint.hex }}
                    />
                    <span className="font-mono text-[8px] uppercase tracking-widest">
                      {tint.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Tint Opacity slider (Only visible if non-clear tint selected) */}
              {lensTint !== "transparent" && (
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                    <span>TINT SATURATION</span>
                    <span>{tintOpacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="80"
                    value={tintOpacity}
                    onChange={(e) => setTintOpacity(Number(e.target.value))}
                    className="w-full accent-brand-blue bg-zinc-800 rounded-lg cursor-pointer h-1.5"
                  />
                </div>
              )}
            </div>

            {/* Step 4: Spatial Alignment Sliders */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center font-mono text-[9px] text-brand-blue font-bold">4</span>
                <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">SPATIAL MICRO-ALIGNMENT</span>
              </div>
              
              <div className="space-y-4">
                {/* Scale Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                    <span>FRAME SCALE WIDTH</span>
                    <span>{scale}%</span>
                  </div>
                  <input
                    type="range"
                    min="75"
                    max="135"
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                    className="w-full accent-brand-blue bg-zinc-800 rounded-lg cursor-pointer h-1.5"
                  />
                </div>

                {/* Y-Offset Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                    <span>Y-AXIS POSITION (VERTICAL)</span>
                    <span>{yOffset > 0 ? `+${yOffset}` : yOffset}px</span>
                  </div>
                  <input
                    type="range"
                    min="-25"
                    max="25"
                    value={yOffset}
                    onChange={(e) => setYOffset(Number(e.target.value))}
                    className="w-full accent-brand-blue bg-zinc-800 rounded-lg cursor-pointer h-1.5"
                  />
                </div>

                {/* X-Offset Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                    <span>X-AXIS POSITION (HORIZONTAL)</span>
                    <span>{xOffset > 0 ? `+${xOffset}` : xOffset}px</span>
                  </div>
                  <input
                    type="range"
                    min="-15"
                    max="15"
                    value={xOffset}
                    onChange={(e) => setXOffset(Number(e.target.value))}
                    className="w-full accent-brand-blue bg-zinc-800 rounded-lg cursor-pointer h-1.5"
                  />
                </div>
              </div>
            </div>

            {/* Step 5: Primary Action Footer */}
            <div className="space-y-4 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-3.5 bg-black/40 hover:bg-black text-white/70 hover:text-white border border-white/10 hover:border-white/30 rounded-xl font-mono text-[9px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
              >
                <RotateCcw size={11} /> Reset Adjustments
              </button>

              <button
                onClick={() => onPreSelectFrame(`${selectedFrame.name} (${activeColor.name})`)}
                className="w-full py-3.5 bg-white text-zinc-950 hover:bg-brand-blue hover:text-white font-display text-[11px] font-black tracking-widest uppercase rounded-xl transition-all duration-300 shadow-xl cursor-pointer flex items-center justify-center gap-2"
              >
                BOOK FITTING FOR THIS FRAME <ArrowRight size={12} />
              </button>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
