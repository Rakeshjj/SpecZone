import { useState, useRef, MouseEvent } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function ShowroomShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.75, 1, 1, 0.75]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlightPos({ x, y });
  };

  return (
    <section
      ref={containerRef}
      id="showroom-showcase"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-[500px] sm:min-h-[600px] bg-zinc-950 flex flex-col justify-center py-16 sm:py-20 px-6 md:px-12 overflow-hidden border-b border-white/5"
    >
      {/* Interactive Ambient Spotlight Backlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 ease-out z-10"
        style={{
          opacity: isHovered ? 0.35 : 0.15,
          background: `radial-gradient(circle 600px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(10, 100, 255, 0.12) 0%, transparent 100%)`,
        }}
      />

      <motion.div
        style={{ opacity }}
        className="max-w-7xl mx-auto w-full z-10"
      >
        {/* Existing Outer Rounded Container */}
        <div className="relative group w-full aspect-[16/9] sm:aspect-[21/9] min-h-[320px] sm:min-h-[420px] md:min-h-[540px] bg-zinc-900/40 rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 hover:border-brand-blue/40 backdrop-blur-sm transition-all duration-500 shadow-2xl">
          {/* Embedded Video filling 100% of the inner box area with object-fit cover and autoplay */}
          <iframe
            src="https://www.youtube.com/embed/qFLCx8naQqE?autoplay=1&mute=1&loop=1&playlist=qFLCx8naQqE&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&iv_load_policy=3"
            title="Showroom Showcase Video"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] min-w-full min-h-full object-cover pointer-events-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            style={{ width: "130%", height: "130%", objectFit: "cover" }}
          />

          {/* Futuristic Reflective gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-zinc-950/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/10 via-transparent to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </section>
  );
}
