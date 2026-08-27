import { motion } from "motion/react";

interface BrandLogo {
  name: string;
  image: string;
  origin: string;
  fontStyle: string;
}

const BRAND_LOGOS: BrandLogo[] = [
  {
    name: "Rayban",
    origin: "Milano",
    fontStyle: "font-sans font-black uppercase tracking-[0.2em]",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=500"
  },
  {
    name: "Vogue",
    origin: "Milano",
    fontStyle: "font-serif italic font-bold tracking-widest",
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=500"
  },
  {
    name: "Oakley",
    origin: "California",
    fontStyle: "font-sans font-extrabold uppercase tracking-[0.25em]",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=500"
  },
  {
    name: "Carrera",
    origin: "Italy",
    fontStyle: "font-sans font-extrabold uppercase tracking-[0.2em]",
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=500"
  },
  {
    name: "Stepper",
    origin: "Germany",
    fontStyle: "font-mono font-bold uppercase tracking-[0.25em]",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=500"
  },
  {
    name: "Emporio Armani",
    origin: "Milano",
    fontStyle: "font-serif font-bold uppercase tracking-[0.2em]",
    image: "https://images.unsplash.com/photo-1614713570785-11517abdebe2?auto=format&fit=crop&q=80&w=500"
  },
  {
    name: "IDEE",
    origin: "Eyewear",
    fontStyle: "font-sans font-black uppercase tracking-[0.3em]",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&q=80&w=500"
  },
  {
    name: "Rayban Meta",
    origin: "Smart Eyewear",
    fontStyle: "font-sans font-black uppercase tracking-[0.2em]",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=500"
  },
  {
    name: "Oakley Meta",
    origin: "AI Performance",
    fontStyle: "font-sans font-extrabold uppercase tracking-[0.25em]",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=500"
  },
  {
    name: "Tommy Hilfiger",
    origin: "New York",
    fontStyle: "font-sans font-bold uppercase tracking-[0.2em]",
    image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=500"
  },
  {
    name: "Pierre Cardin",
    origin: "Paris",
    fontStyle: "font-serif italic font-semibold tracking-widest",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=500"
  },
  {
    name: "Fossil",
    origin: "Texas",
    fontStyle: "font-sans font-black uppercase tracking-[0.25em]",
    image: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=500"
  },
  {
    name: "Seventh Street",
    origin: "Italy",
    fontStyle: "font-mono font-bold uppercase tracking-[0.2em]",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=500"
  },
  {
    name: "Luxottica",
    origin: "Milano",
    fontStyle: "font-serif font-black uppercase tracking-[0.25em]",
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=500"
  }
];

export default function BrandTicker() {
  // Duplicate list to achieve seamless infinite animation translation
  const extendedBrands = [...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS];

  return (
    <section
  id="brand-ticker-section"
  className="bg-zinc-950/60 border-b border-white/5 py-4 overflow-hidden relative backdrop-blur-md"
>
      {/* Decorative gradient overlay bounds for clean luxury fade */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-zinc-950 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-zinc-950 to-transparent z-20 pointer-events-none" />

      {/* Scrolling Marquee Container */}
      <div className="relative flex items-center overflow-x-hidden py-4 bg-zinc-950/20 backdrop-blur-sm ">
        <motion.div
          className="flex gap-16 items-center shrink-0"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity,
          }}
        >
          {extendedBrands.map((brand, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-16 shrink-0 select-none cursor-pointer"
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span
                className={`${brand.fontStyle} text-3xl sm:text-4xl lg:text-5xl text-zinc-400 hover:text-white transition-colors duration-300 hover:drop-shadow-[0_0_20px_rgba(10,100,255,0.6)]`}
              >
                {brand.name}
              </span>
              <span className="text-zinc-800 text-3xl sm:text-5xl font-extralight select-none animate-pulse">•</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
