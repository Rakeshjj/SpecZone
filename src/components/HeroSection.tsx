import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { Sparkles, CheckCircle, User, Phone, ArrowDown, Shield, Eye, Cpu, Layers, Zap, Sliders } from "lucide-react";
import auraSpecsTransparent from "../assets/images/download.png";

interface HeroSectionProps {
  onScrollDown: () => void;
}

export default function HeroSection({ onScrollDown }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Minimal lead capture states on Slide 3
  const [slideLeadName, setSlideLeadName] = useState("");
  const [slideLeadPhone, setSlideLeadPhone] = useState("");
  const [isSlideSubmitted, setIsSlideSubmitted] = useState(false);

  // Parallax subtle mouse interaction
  const mouseXSpring = useSpring(0, { damping: 40, stiffness: 60 });
  const mouseYSpring = useSpring(0, { damping: 40, stiffness: 60 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMousePosition({ x, y });
      mouseXSpring.set(x);
      mouseYSpring.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseXSpring, mouseYSpring]);

  // Slide Auto-Rotation (only during Hero stage when near top)
  useEffect(() => {
    const timer = setInterval(() => {
      if (currentSlide === 2 && (slideLeadName || slideLeadPhone)) {
        return;
      }
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 7500);
    return () => clearInterval(timer);
  }, [currentSlide, slideLeadName, slideLeadPhone]);

  // 100% Scroll-Driven Animation linked to container scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Hero Text & Controls fading out (0% -> 35%)
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.22, 0.35], [1, 0.8, 0]);
  const heroTextX = useTransform(scrollYProgress, [0, 0.35], [0, -60]);
  const heroTextScale = useTransform(scrollYProgress, [0, 0.35], [1, 0.94]);
  const heroPointerEvents = useTransform(scrollYProgress, (val) => (val < 0.3 ? "auto" : "none"));

  // Floating Specification Badges fading out with spatial depth (0% -> 30%)
  const badgesOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 0.75, 0]);
  const badgesScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);

  // Floating Glasses 3D Pop, Perspective, Macro Zoom, Blur & Defocus (0% -> 100%)
  const productScale = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.8, 1], [1, 1.25, 1.75, 2.6, 3.8]);
  const productRotateX = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0, 6, 12, 16]);
  const productRotateY = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0, -8, -16, -22]);
  const productRotateZ = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0, -2, -4.5, -7]);
  const productX = useTransform(scrollYProgress, [0, 0.4, 0.75, 1], ["0%", "-3%", "-8%", "-16%"]);
  const productY = useTransform(scrollYProgress, [0, 0.4, 0.75, 1], ["0%", "2%", "6%", "12%"]);

  // Optical Defocus & Lighting Shimmer
  const productBlur = useTransform(
    scrollYProgress,
    [0, 0.45, 0.65, 0.85, 1],
    ["blur(0px)", "blur(0.5px)", "blur(4px)", "blur(12px)", "blur(26px)"]
  );
  const productBrightness = useTransform(scrollYProgress, [0, 0.5, 0.85, 1], [1, 1.06, 1.28, 1.45]);
  const productContrast = useTransform(scrollYProgress, [0, 0.5, 0.85, 1], [1, 1.04, 1.12, 1.2]);

  // Smooth cubic power curve for disappearance
  const productOpacity = useTransform(scrollYProgress, [0, 0.45, 0.68, 0.85, 0.96, 1], [1, 1, 0.82, 0.38, 0.08, 0]);

  // Specs / CAD Blueprint Section Reveal (35% -> 100%)
  const cadOpacity = useTransform(scrollYProgress, [0.35, 0.58, 0.82, 1], [0, 0.4, 0.88, 1]);
  const cadScale = useTransform(scrollYProgress, [0.35, 1], [0.94, 1]);
  const cadY = useTransform(scrollYProgress, [0.35, 1], [40, 0]);
  const cadPointerEvents = useTransform(scrollYProgress, (val) => (val > 0.5 ? "auto" : "none"));

  // Progress HUD Stage Tracker
  const hudProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Mouse spring micro-shift for the hero glasses
  const glassesMouseX = useTransform(mouseXSpring, (val) => val * -15);
  const glassesMouseY = useTransform(mouseYSpring, (val) => val * -15);

  // Helper scroll function
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSlideFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slideLeadName || !slideLeadPhone) {
      return;
    }
    setIsSlideSubmitted(true);
    const waText = `Hi Spectacal Zone! I'm requesting a Home Eye Care appointment via the hero banner form.%0A%0AName: ${slideLeadName}%0APhone: ${slideLeadPhone}`;
    setTimeout(() => {
      window.open(`https://wa.me/919442009991?text=${waText}`, "_blank");
    }, 1500);
  };

  const slidesData = [
    {
      id: 0,
      badge: "ESTABLISHED 1959 : SIX DECADES OF PRECISION",
      title_line1: "AURA PLATINUM",
      title_line2: "TITANIUM ATELIER",
      description: "Custom digital progressive lens design and curated Japanese beta-titanium luxury frames tailored specifically to your ocular anatomy and personal prestige.",
      ctaPrimary: "Explore Specs & CAD",
      ctaPrimaryAction: () => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const targetY = window.scrollY + rect.height * 0.75;
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      },
      ctaSecondary: "Shop Collection",
      ctaSecondaryAction: () => scrollToId("opticals-shop"),
      image: auraSpecsTransparent
    },
    {
      id: 1,
      badge: "SARTORIAL EYEWEAR : MILAN & TOKYO CRAFTSMANSHIP",
      title_line1: "HIGH-DEFINITION",
      title_line2: "POLARIZED SHIELD",
      description: "Proprietary 9-layer anti-reflective optics engineered to eliminate blinding solar reflection and filter 100% of high-energy visible blue-violet scatter.",
      ctaPrimary: "View Collection",
      ctaPrimaryAction: () => scrollToId("opticals-shop"),
      ctaSecondary: "Explore Brands",
      ctaSecondaryAction: () => scrollToId("brands"),
      image: auraSpecsTransparent
    },
    {
      id: 2,
      badge: "MOBILE CLINICAL LABORATORY & DIAGNOSTICS",
      title_line1: "ATELIER DOORSTEP",
      title_line2: "CONCIERGE CARE",
      description: "Can't visit our flagship showroom? Schedule a qualified senior optometrist clinical diagnostic evaluation and 100+ frame trials at your residence.",
      ctaPrimary: "",
      ctaPrimaryAction: () => { },
      ctaSecondary: "",
      ctaSecondaryAction: () => { },
      image: auraSpecsTransparent
    }
  ];

  return (
    <div
      ref={containerRef}
      id="hero"
      className="relative bg-[#09090b] text-white h-[200vh] w-full"
    >
      {/* Sticky Viewport Stage (Properly bounded to viewport below navbar) */}
      <div className="sticky top-[74px] sm:top-[78px] h-[calc(100dvh-74px)] sm:h-[calc(100dvh-78px)] w-full overflow-hidden flex flex-col justify-between z-10 [perspective:1200px]">

        {/* Luxury Background Canvas */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {/* Deep dark canvas gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#06080e] via-[#09090b] to-[#040508]" />

          {/* Glowing Ambient Radial Aura behind the product */}
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/4 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle,rgba(0,102,204,0.14)_0%,rgba(0,102,204,0.03)_45%,transparent_70%)] blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.02)_0%,transparent_60%)] blur-2xl pointer-events-none" />

          {/* High-Precision Technical CAD Matrix Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-70" />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.7)_100%)] pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#09090b] to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#09090b] to-transparent pointer-events-none" />
        </div>

        {/* Decorative Concentric Circular Optics Guide on the top-left */}
        <div
          className="absolute top-0 left-0 w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] pointer-events-none opacity-30 z-0"
          style={{
            transform: `translate(${mousePosition.x * 8}px, ${mousePosition.y * 8}px)`,
            transition: "transform 0.4s ease-out"
          }}
        >
          <svg viewBox="0 0 500 500" className="w-full h-full text-brand-blue">
            <circle cx="0" cy="0" r="450" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" className="opacity-20" />
            <circle cx="0" cy="0" r="350" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-30" />
            <circle cx="0" cy="0" r="230" fill="currentColor" className="opacity-5" />
            <circle cx="0" cy="0" r="120" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-40" />
          </svg>
        </div>

        {/* CENTER VIEWPORT: HERO TEXT (LEFT) + FLOATING 3D GLASSES & BADGES (RIGHT) */}
        <div className="relative z-10 my-auto flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center py-2 min-h-0">

          {/* LEFT COLUMN: HERO INFORMATION */}
          <motion.div
            style={{
              opacity: heroTextOpacity,
              x: heroTextX,
              scale: heroTextScale,
              pointerEvents: heroPointerEvents as any
            }}
            className="lg:col-span-6 relative z-20 flex flex-col justify-center text-left py-1"
          >
            <AnimatePresence mode="wait">
              {slidesData.map((slide) => {
                if (slide.id !== currentSlide) return null;
                return (
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="space-y-3 sm:space-y-4"
                  >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-brand-blue/10 border border-brand-blue/30 backdrop-blur-sm">
                      <Sparkles size={10} className="text-brand-blue" />
                      <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-brand-blue uppercase font-bold">
                        {slide.badge}
                      </span>
                    </div>

                    {/* Headline */}
                    <div className="space-y-0.5">
                      <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[0.95] uppercase tracking-tight">
                        {slide.title_line1} <br />
                        <span className="text-zinc-400 italic font-black">{slide.title_line2}</span>
                      </h1>
                    </div>

                    {/* Description */}
                    <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed font-light max-w-lg">
                      {slide.description}
                    </p>

                    {/* CTAs or Lead Capture */}
                    {slide.id !== 2 ? (
                      <div className="flex flex-wrap gap-3 pt-1">
                        <button
                          onClick={slide.ctaPrimaryAction}
                          className="px-6 sm:px-8 py-3 sm:py-3.5 bg-brand-blue text-white hover:bg-white hover:text-black font-display text-[10px] sm:text-[11px] font-black tracking-widest uppercase rounded-xl transition-all duration-300 shadow-xl shadow-brand-blue/20 cursor-pointer flex items-center gap-2 group"
                        >
                          <span>{slide.ctaPrimary}</span>
                          <ArrowDown size={12} className="group-hover:translate-y-0.5 transition-transform" />
                        </button>
                        <button
                          onClick={slide.ctaSecondaryAction}
                          className="px-6 sm:px-8 py-3 sm:py-3.5 bg-zinc-900/60 hover:bg-white/[0.06] text-zinc-200 font-mono text-[9px] sm:text-[10px] tracking-wider uppercase border border-white/10 backdrop-blur-sm rounded-xl transition-all cursor-pointer"
                        >
                          {slide.ctaSecondary}
                        </button>
                      </div>
                    ) : (
                      /* Minimal Concierge Form on Slide 3 */
                      <div className="pt-1 max-w-md w-full">
                        <AnimatePresence mode="wait">
                          {!isSlideSubmitted ? (
                            <form
                              onSubmit={handleSlideFormSubmit}
                              className="bg-zinc-900/90 border border-white/10 backdrop-blur-md shadow-2xl rounded-xl p-3.5 sm:p-4 space-y-2.5"
                            >
                              <div className="flex gap-2 items-center border-b border-white/5 pb-1.5">
                                <Sparkles size={11} className="text-brand-blue animate-spin" style={{ animationDuration: "6s" }} />
                                <span className="font-mono text-[8px] sm:text-[9px] text-zinc-300 tracking-wider uppercase font-bold">
                                  REQUEST DOORSTEP CLINICAL ATELIER
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div className="relative">
                                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-zinc-500 pointer-events-none">
                                    <User size={11} />
                                  </span>
                                  <input
                                    type="text"
                                    required
                                    placeholder="Full Name"
                                    value={slideLeadName}
                                    onChange={(e) => setSlideLeadName(e.target.value)}
                                    className="w-full bg-zinc-950/70 border border-white/10 rounded-lg py-2 pl-8 pr-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-brand-blue transition-all"
                                  />
                                </div>

                                <div className="relative">
                                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-zinc-500 pointer-events-none">
                                    <Phone size={11} />
                                  </span>
                                  <input
                                    type="tel"
                                    required
                                    placeholder="Mobile Contact"
                                    value={slideLeadPhone}
                                    onChange={(e) => setSlideLeadPhone(e.target.value)}
                                    className="w-full bg-zinc-950/70 border border-white/10 rounded-lg py-2 pl-8 pr-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-brand-blue transition-all"
                                  />
                                </div>
                              </div>

                              <button
                                type="submit"
                                className="w-full py-2.5 rounded-lg bg-brand-blue hover:bg-white hover:text-black text-white font-display text-[9px] sm:text-[10px] font-black tracking-widest uppercase transition-all cursor-pointer"
                              >
                                CONFIRM APPOINTMENT VIA WHATSAPP →
                              </button>
                            </form>
                          ) : (
                            <div className="bg-green-950/30 border border-green-500/30 rounded-xl p-3.5 text-center space-y-1.5">
                              <div className="w-7 h-7 rounded-full bg-green-950/80 flex items-center justify-center mx-auto text-green-400 border border-green-800">
                                <CheckCircle size={14} />
                              </div>
                              <h4 className="font-serif text-sm font-bold text-white uppercase tracking-tight">VISITATION SCHEDULED</h4>
                              <p className="font-sans text-[10px] sm:text-[11px] text-zinc-300 font-light">
                                Thank you, {slideLeadName}. Initiating wavefront trial preparation...
                              </p>
                            </div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* Carousel Dots */}
                    <div className="flex gap-2 pt-1">
                      {[0, 1, 2].map((dotIndex) => (
                        <button
                          key={dotIndex}
                          onClick={() => setCurrentSlide(dotIndex)}
                          className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${currentSlide === dotIndex ? "w-6 sm:w-7 bg-brand-blue" : "w-1.5 sm:w-2 bg-white/20 hover:bg-white/40"
                            }`}
                          aria-label={`Slide ${dotIndex + 1}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* RIGHT COLUMN: ENLARGED, PERFECTLY CENTERED & ELEVATED 3D PRODUCT VIEWPORT */}
          <div className="lg:col-span-6 relative flex items-center justify-center h-full min-h-[360px] sm:min-h-[420px] select-none pointer-events-none">

            {/* FLOATING SPECIFICATION BADGES AROUND THE GLASSES */}
            <motion.div
              style={{
                opacity: badgesOpacity,
                scale: badgesScale
              }}
              className="absolute inset-0 z-30 pointer-events-none"
            >
              {/* Badge 1: Top Left - ZEISS Polarized HD */}
              <div className="absolute top-[4%] sm:top-[6%] left-[2%] sm:left-[6%] flex items-center gap-2 bg-zinc-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 shadow-2xl">
                <div className="w-2 h-2 rounded-full bg-brand-blue animate-ping" />
                <div>
                  <span className="block font-mono text-[7px] text-zinc-400 uppercase tracking-wider">OPTICAL MATRIX</span>
                  <span className="block font-mono text-[9px] text-white font-bold tracking-widest uppercase">ZEISS POLARIZED HD</span>
                </div>
              </div>

              {/* Badge 2: Top Right - UV400 Shield */}
              <div className="absolute top-[4%] sm:top-[6%] right-[2%] sm:right-[6%] flex items-center gap-2 bg-zinc-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 shadow-2xl">
                <Shield size={12} className="text-brand-blue" />
                <div>
                  <span className="block font-mono text-[7px] text-zinc-400 uppercase tracking-wider">SOLAR RADIATION</span>
                  <span className="block font-mono text-[9px] text-white font-bold tracking-widest uppercase">UV400 SCATTER CUT</span>
                </div>
              </div>
            </motion.div>

            {/* FLOATING 3D GLASSES PRODUCT HERO */}
            <motion.div
              style={{
                scale: productScale,
                rotateX: productRotateX,
                rotateY: productRotateY,
                rotateZ: productRotateZ,
                x: productX,
                y: productY,
                filter: productBlur,
                opacity: productOpacity,
                transformStyle: "preserve-3d",
                willChange: "transform, opacity, filter"
              }}
              className="relative w-full max-w-[620px] lg:max-w-[680px] flex items-center justify-center z-20"
            >
              {/* High-Resolution Luxury Specs Cutout */}
              <motion.img
                style={{
                  x: glassesMouseX,
                  y: glassesMouseY,
                }}
                src={auraSpecsTransparent}
                alt="AURA Luxury Geometric Titanium Eyeglasses"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain max-h-[460px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.9)] scale-110 sm:scale-115 lg:scale-120 origin-center transition-all duration-75"
              />
            </motion.div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* UNDERLYING SPECS / CAD BLUEPRINT SECTION (REVEALED AS GLASSES ZOOM IN)     */}
        {/* ========================================================================= */}
        <motion.div
          style={{
            opacity: cadOpacity,
            scale: cadScale,
            y: cadY,
            pointerEvents: cadPointerEvents as any
          }}
          className="absolute inset-0 z-30 flex flex-col justify-center items-center px-6 md:px-12 py-16"
        >

        </motion.div>

        {/* HUD Bottom Scroll Prompt */}
        <div className="relative z-20 px-4 sm:px-8 md:px-12 pb-3 sm:pb-4 flex justify-end items-center max-w-7xl mx-auto w-full shrink-0">
        </div>

      </div>
    </div>
  );
}
