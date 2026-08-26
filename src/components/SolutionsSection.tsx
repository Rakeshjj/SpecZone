// import React, { useState, useRef } from "react";
// import { AnimatePresence, motion, useScroll, useTransform, useSpring } from "motion/react";
// import { Check, ArrowUpRight, Award, X } from "lucide-react";

// interface SolutionsSectionProps {
//   onPreSelectService: (serviceName: string) => void;
// }

// interface SolutionItem {
//   id: number;
//   title: string;
//   image: string;
//   tagline: string;
//   description: string;
//   features: string[];
//   price: string;
// }

// const SOLUTIONS_DATA: SolutionItem[] = [
//   {
//     id: 1,
//     title: "Sunglasses",
//     image: "https://www.vohopticians.com/assets/imgs/specification/SUNGLASSES.jpg",
//     tagline: "LUXURY SUN PROTECTION",
//     description: "Curated collection of premier international designer sunglasses. Designed to block 100% of UVA/UVB rays with absolute visual clarity.",
//     features: ["Authorized global designer brands", "Polarized & non-polarized options", "Custom prescription sun lenses available"],
//     price: "From ₹18,900",
//   },
//   {
//     id: 2,
//     title: "Optical Frames",
//     image: "https://www.vohopticians.com/assets/imgs/specification/OPTICALFRAME.jpg",
//     tagline: "SARTORIAL FRAME CRAFT",
//     description: "Handcrafted acetate, lightweight pure titanium, and bespoke horn frames sourced directly from heritage European houses.",
//     features: ["Sourced from Milan, Paris, & Tokyo", "Free custom facial-fit adjustment", "Ultralight titanium and premium bio-acetate"],
//     price: "From ₹24,500",
//   },
//   {
//     id: 3,
//     title: "Optical Lenses",
//     image: "https://www.vohopticians.com/assets/imgs/specification/OPTICALLENS.jpg",
//     tagline: "PRECISION WAVEFRONT LENSES",
//     description: "State-of-the-art digital progressive and single-vision lenses tailored to your unique lifestyle and ocular geometry.",
//     features: ["Advanced blue-light filtering", "Sartorial ultra-thin lens indexing", "Anti-reflective & scratch-resistant armor"],
//     price: "From ₹9,500",
//   },
//   {
//     id: 4,
//     title: "Contact Lenses",
//     image: "https://www.vohopticians.com/assets/imgs/specification/CONTACTLENS.jpg",
//     tagline: "HYDRATING OCULAR COMFORT",
//     description: "Premium daily, bi-weekly, and monthly contacts engineered with breathable silicone hydrogel for high oxygen transmission.",
//     features: ["Precision astigmatism & multifocal fitting", "High-moisture retaining matrices", "Custom cosmetic color enhancements"],
//     price: "From ₹3,200",
//   },
//   {
//     id: 5,
//     title: "Kids Eyewear",
//     image: "https://www.vohopticians.com/assets/imgs/specification/KIDSEYEWEAR.jpg",
//     tagline: "DURABLE VISION SECURE",
//     description: "Specially engineered resilient, flexible, and hypoallergenic frames configured to withstand vigorous play while ensuring vision growth.",
//     features: ["Highly flexible shatter-proof temples", "Special optical stabilization strap points", "High-impact robust polycarbonate lenses"],
//     price: "From ₹4,200",
//   },
//   {
//     id: 6,
//     title: "Ready Readers",
//     image: "https://www.vohopticians.com/assets/imgs/specification/READYREADERS.jpg",
//     tagline: "INSTANT PRESBYOPIA AID",
//     description: "Sophisticated magnification lenses set in beautiful lightweight frames, immediately available for reading and fine-detail work.",
//     features: ["Magnification power range from +1.00 to +3.50", "Durable scratch-protective coat", "Includes premium protective travel pouch"],
//     price: "From ₹2,800",
//   },
//   {
//     id: 7,
//     title: "Eyewear Accessories",
//     image: "https://www.vohopticians.com/assets/imgs/specification/EYEWEARACCESSORIES.jpg",
//     tagline: "BESPOKE ORNAMENTATION",
//     description: "Artisan-crafted leather cases, premium micro-fiber cloths, gold and silver frame chains, and dynamic organic cleansing sprays.",
//     features: ["Artisanal full-grain leather sleeves", "Premium 24K gold-plated cords", "Natural anti-fog micro-mist cleansers"],
//     price: "From ₹1,200",
//   },
//   {
//     id: 8,
//     title: "Bespoke Fitting",
//     image: "https://i.pinimg.com/736x/2e/43/5e/2e435e98cb104c688c21c0f9aa2f2b0f.jpg",
//     tagline: "INTELLIGENT AUDIOLOGY & CARE",
//     description: "Personalized fitting consultation leveraging digital ocular measurements to secure perfect weight distribution, grip, and vision focal points.",
//     features: ["Discreet personalized styling profiles", "Advanced physical alignment metrics", "Complimentary custom adjustment plan"],
//     price: "Complimentary",
//   },
// ];

// interface SolutionCardProps {
//   key?: React.Key | number;
//   item: SolutionItem;
//   onClick: () => void;
//   index: number;
// }

// function SolutionCard({ item, onClick, index }: SolutionCardProps) {
//   const cardRef = useRef<HTMLDivElement>(null);

//   // Individual scroll tracker for this specific card to create parallax (ZERO lag, no rubbery spring, matching your HTML code exactly)
//   const { scrollYProgress } = useScroll({
//     target: cardRef,
//     offset: ["start end", "end start"],
//   });

//   // Calculate parallax translation without any slow/rubbery spring lag. Stretches perfectly inside parent window.
//   const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

//   // Staggered delays matching your grid-card:nth-child rules exactly (left to right)
//   const colIndex = index % 4;
//   const wrapperDelay = 0.1 + colIndex * 0.15;
//   const labelDelay = 0.2 + colIndex * 0.15;

//   return (
//     <div
//       ref={cardRef}
//       onClick={onClick}
//       className="group flex flex-col justify-between cursor-pointer relative"
//     >
//       {/* Luxury image viewport window (with 1.8s duration, cubic-bezier transition and 80px translation up) */}
//       <motion.div
//         initial={{ opacity: 0, y: 80 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, margin: "-80px" }}
//         transition={{
//           duration: 1.8,
//           ease: [0.16, 1, 0.3, 1],
//           delay: wrapperDelay,
//         }}
//         className="relative w-full h-[380px] lg:h-[480px] overflow-hidden rounded-2xl border border-white/5 bg-[#121212] shadow-lg transition-colors duration-500 hover:border-brand-blue/30"
//       >
//         <motion.img
//           src={item.image}
//           alt={item.title}
//           referrerPolicy="no-referrer"
//           style={{ 
//             y: imgY,
//             height: "145%",
//             top: "-22.5%"
//           }}
//           className="absolute inset-x-0 w-full object-cover filter grayscale-[15%] brightness-[85%] group-hover:grayscale-[5%] group-hover:brightness-95 group-hover:scale-105 transition-all duration-700 select-none pointer-events-none will-change-transform"
//         />

//         {/* Dark bottom gradient overlay for perfect contrast */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

//         {/* Floating Glass-morphic Price Badge on Image */}
//         <div className="absolute bottom-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-zinc-100 font-bold tracking-wider group-hover:border-brand-blue/40 group-hover:text-brand-blue transition-all duration-300 shadow-md">
//           {item.price}
//         </div>

//         {/* Small floating action button indicator */}
//         <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-950/60 border border-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-brand-blue group-hover:border-brand-blue transition-all duration-300 z-20 shadow-sm backdrop-blur-sm">
//           <ArrowUpRight size={14} className="text-zinc-300 group-hover:text-black transition-colors" />
//         </div>
//       </motion.div>

//       {/* Elegant Editorial Typography Label Below Card (with 1.4s duration, cubic-bezier transition and 30px translation up) */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, margin: "-80px" }}
//         transition={{
//           duration: 1.4,
//           ease: [0.16, 1, 0.3, 1],
//           delay: labelDelay,
//         }}
//         className="mt-5 flex flex-col space-y-1 pl-1"
//       >
//         <div className="flex justify-between items-baseline gap-2">
//           <span className="font-mono text-[9px] tracking-[0.25em] text-brand-blue uppercase font-bold truncate">
//             {item.tagline}
//           </span>
//           <span className="font-mono text-[10px] font-semibold text-zinc-400 group-hover:text-zinc-200 transition-colors shrink-0">
//             {item.price}
//           </span>
//         </div>
//         <h3 className="font-serif text-lg md:text-xl font-medium text-white tracking-tight group-hover:text-brand-blue transition-colors duration-300">
//           {item.title}
//         </h3>
//         <span className="font-mono text-[8px] tracking-widest text-zinc-500 group-hover:text-zinc-400 uppercase mt-1 block">
//           [ Inspect Specs ]
//         </span>
//       </motion.div>
//     </div>
//   );
// }

// export default function SolutionsSection({ onPreSelectService }: SolutionsSectionProps) {
//   const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null);

//   return (
//     <section
//       id="solutions"
//       className="relative min-h-screen bg-[#0a0a0a] py-24 px-6 md:px-12 border-b border-white/5 flex flex-col justify-center"
//     >
//       {/* Decorative subtle brand-blue light beam */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(10,100,255,0.025)_0%,transparent_60%)] pointer-events-none" />

//       <div className="max-w-7xl mx-auto w-full z-10 space-y-16 relative">
//         {/* Section Header with Reveal Animations aligned to match other sections */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
//           <div className="space-y-4 text-left">
//             <motion.span
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
//               className="font-mono text-xs tracking-[0.3em] text-brand-blue uppercase block"
//             >
//               [ EXQUISITE EDITORIAL ]
//             </motion.span>
//             <motion.h2
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
//               className="font-serif text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase leading-[0.85] tracking-tighter"
//             >
//               OUR ESSENTIAL <br />
//               <span className="text-zinc-400 italic font-black">SOLUTIONS</span>
//             </motion.h2>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
//             className="flex items-center gap-4 shrink-0"
//           >
//             <button
//               onClick={() => {
//                 const shopSection = document.getElementById("opticals-shop");
//                 if (shopSection) {
//                   shopSection.scrollIntoView({ behavior: "smooth" });
//                 }
//               }}
//               className="relative px-6 py-3.5 rounded-full bg-zinc-900/40 border border-white/10 hover:border-brand-blue text-zinc-300 hover:text-brand-blue backdrop-blur-sm transition-all cursor-pointer group flex items-center gap-2.5 shadow-sm"
//             >
//               <span className="font-mono text-[10px] tracking-wider uppercase font-bold px-1">
//                 View All Products
//               </span>
//               <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
//             </button>
//           </motion.div>
//         </div>

//         {/* Parallax Grid Layout matching exact CSS column setup */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full pt-4">
//           {SOLUTIONS_DATA.map((item, index) => (
//             <SolutionCard
//               key={item.id}
//               item={item}
//               index={index}
//               onClick={() => setSelectedSolution(item)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* HIGH-IMPACT INTERACTIVE DETAIL OVERLAY MODAL */}
//       <AnimatePresence>
//         {selectedSolution && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-6"
//           >
//             <motion.div
//               initial={{ scale: 0.95, y: 30 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.95, y: 30 }}
//               transition={{ type: "spring", stiffness: 100, damping: 20 }}
//               className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 relative shadow-2xl"
//             >
//               {/* Close Button */}
//               <button
//                 onClick={() => setSelectedSolution(null)}
//                 className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-zinc-900/60 backdrop-blur-sm border border-white/10 hover:border-brand-blue hover:bg-brand-blue/20 flex items-center justify-center text-zinc-400 transition-all duration-300 cursor-pointer"
//               >
//                 <X size={16} />
//               </button>

//               {/* Left Side: Product Image Display */}
//               <div className="md:col-span-6 relative aspect-video md:aspect-[4/5] bg-black">
//                 <img
//                   src={selectedSolution.image}
//                   alt={selectedSolution.title}
//                   referrerPolicy="no-referrer"
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
//               </div>

//               {/* Right Side: Product Details & Appointment Actions */}
//               <div className="md:col-span-6 p-8 md:p-10 flex flex-col justify-between space-y-8 bg-zinc-950">
//                 <div className="space-y-6">
//                   <div className="flex items-center justify-between">
//                     <span className="font-mono text-[9px] tracking-[0.25em] text-brand-blue uppercase font-bold px-2.5 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full">
//                       {selectedSolution.tagline}
//                     </span>
//                     <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
//                       CAT_00{selectedSolution.id}
//                     </span>
//                   </div>

//                   <div className="space-y-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/5 pb-4">
//                     <h3 className="font-serif text-3xl md:text-4xl font-normal text-white uppercase tracking-tight">
//                       {selectedSolution.title}
//                     </h3>
//                     <span className="font-mono text-sm font-semibold text-brand-blue tracking-wider shrink-0 bg-brand-blue/5 border border-brand-blue/10 px-3 py-1 rounded-md">
//                       {selectedSolution.price}
//                     </span>
//                   </div>

//                   <p className="font-sans text-sm text-zinc-300 leading-relaxed font-light">
//                     {selectedSolution.description}
//                   </p>

//                   <div className="space-y-3 pt-2">
//                     <h4 className="font-mono text-[9px] text-brand-blue tracking-wider uppercase">
//                       Core Specialties
//                     </h4>
//                     <div className="space-y-2">
//                       {selectedSolution.features.map((feature, idx) => (
//                         <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300 font-light">
//                           <Check size={12} className="text-brand-blue shrink-0" />
//                           <span>{feature}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-4 pt-6 border-t border-white/5">
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 rounded-full bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center border border-white/10">
//                       <Award size={14} className="text-brand-blue" />
//                     </div>
//                     <div>
//                       <span className="block font-mono text-[8px] text-zinc-500 tracking-wider uppercase">
//                         Bespoke Consultation
//                       </span>
//                       <span className="font-display text-[10px] text-zinc-200 font-bold tracking-widest uppercase">
//                         Complimentary fitting Included
//                       </span>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => {
//                       onPreSelectService(selectedSolution.title);
//                       setSelectedSolution(null);
//                     }}
//                     className="w-full py-4 rounded-xl bg-brand-blue text-white hover:bg-white hover:text-black font-display text-[11px] font-black tracking-widest uppercase transition-all duration-300 shadow-md cursor-pointer"
//                   >
//                     ADD TO APPOINTMENT
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }






import React, { useState, useRef, useLayoutEffect } from "react";
import { AnimatePresence, motion, useTransform } from "motion/react";
import { Check, ArrowUpRight, Award, X } from "lucide-react";
import { useLenis, useRawScrollY } from "./LenisProvider";

interface SolutionsSectionProps {
  onPreSelectService: (serviceName: string) => void;
}

interface SolutionItem {
  id: number;
  title: string;
  image: string;
  tagline: string;
  description: string;
  features: string[];
  price: string;
}

const SOLUTIONS_DATA: SolutionItem[] = [
  {
    id: 1,
    title: "Sunglasses",
    image: "https://i.pinimg.com/736x/2e/43/5e/2e435e98cb104c688c21c0f9aa2f2b0f.jpg",
    tagline: "LUXURY SUN PROTECTION",
    description: "Curated collection of premier international designer sunglasses. Designed to block 100% of UVA/UVB rays with absolute visual clarity.",
    features: ["Authorized global designer brands", "Polarized & non-polarized options", "Custom prescription sun lenses available"],
    price: "From ₹18,900",
  },
  {
    id: 2,
    title: "Optical Frames",
    image: "https://i.pinimg.com/736x/2e/43/5e/2e435e98cb104c688c21c0f9aa2f2b0f.jpg",
    tagline: "SARTORIAL FRAME CRAFT",
    description: "Handcrafted acetate, lightweight pure titanium, and bespoke horn frames sourced directly from heritage European houses.",
    features: ["Sourced from Milan, Paris, & Tokyo", "Free custom facial-fit adjustment", "Ultralight titanium and premium bio-acetate"],
    price: "From ₹24,500",
  },
  {
    id: 3,
    title: "Optical Lenses",
    image: "https://i.pinimg.com/736x/2e/43/5e/2e435e98cb104c688c21c0f9aa2f2b0f.jpg",
    tagline: "PRECISION WAVEFRONT LENSES",
    description: "State-of-the-art digital progressive and single-vision lenses tailored to your unique lifestyle and ocular geometry.",
    features: ["Advanced blue-light filtering", "Sartorial ultra-thin lens indexing", "Anti-reflective & scratch-resistant armor"],
    price: "From ₹9,500",
  },
  {
    id: 4,
    title: "Contact Lenses",
    image: "https://i.pinimg.com/736x/2e/43/5e/2e435e98cb104c688c21c0f9aa2f2b0f.jpg",
    tagline: "HYDRATING OCULAR COMFORT",
    description: "Premium daily, bi-weekly, and monthly contacts engineered with breathable silicone hydrogel for high oxygen transmission.",
    features: ["Precision astigmatism & multifocal fitting", "High-moisture retaining matrices", "Custom cosmetic color enhancements"],
    price: "From ₹3,200",
  },
  {
    id: 5,
    title: "Kids Eyewear",
    image: "https://i.pinimg.com/736x/2e/43/5e/2e435e98cb104c688c21c0f9aa2f2b0f.jpg",
    tagline: "DURABLE VISION SECURE",
    description: "Specially engineered resilient, flexible, and hypoallergenic frames configured to withstand vigorous play while ensuring vision growth.",
    features: ["Highly flexible shatter-proof temples", "Special optical stabilization strap points", "High-impact robust polycarbonate lenses"],
    price: "From ₹4,200",
  },
  {
    id: 6,
    title: "Ready Readers",
    image: "https://i.pinimg.com/736x/2e/43/5e/2e435e98cb104c688c21c0f9aa2f2b0f.jpg",
    tagline: "INSTANT PRESBYOPIA AID",
    description: "Sophisticated magnification lenses set in beautiful lightweight frames, immediately available for reading and fine-detail work.",
    features: ["Magnification power range from +1.00 to +3.50", "Durable scratch-protective coat", "Includes premium protective travel pouch"],
    price: "From ₹2,800",
  },
  {
    id: 7,
    title: "Eyewear Accessories",
    image: "https://i.pinimg.com/736x/2e/43/5e/2e435e98cb104c688c21c0f9aa2f2b0f.jpg",
    tagline: "BESPOKE ORNAMENTATION",
    description: "Artisan-crafted leather cases, premium micro-fiber cloths, gold and silver frame chains, and dynamic organic cleansing sprays.",
    features: ["Artisanal full-grain leather sleeves", "Premium 24K gold-plated cords", "Natural anti-fog micro-mist cleansers"],
    price: "From ₹1,200",
  },
  {
    id: 8,
    title: "Bespoke Fitting",
    image: "https://i.pinimg.com/736x/2e/43/5e/2e435e98cb104c688c21c0f9aa2f2b0f.jpg",
    tagline: "INTELLIGENT AUDIOLOGY & CARE",
    description: "Personalized fitting consultation leveraging digital ocular measurements to secure perfect weight distribution, grip, and vision focal points.",
    features: ["Discreet personalized styling profiles", "Advanced physical alignment metrics", "Complimentary custom adjustment plan"],
    price: "Complimentary",
  },
];

interface SolutionCardProps {
  key?: React.Key | number;
  item: SolutionItem;
  onClick: () => void;
  index: number;
}

function SolutionCard({ item, onClick, index }: SolutionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Card's absolute document position + size, measured on mount/resize.
  // Used below to work out, at any given raw scroll value, exactly how
  // far through the viewport this card currently is — replicating what
  // Motion's useScroll(offset: ["start end", "end start"]) does, but fed
  // by raw scroll instead of window.scrollY.
  const dims = useRef({ top: 0, height: 0, viewport: 0 });

  useLayoutEffect(() => {
    function measure() {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      dims.current = {
        top: rect.top + window.scrollY,
        height: rect.height,
        viewport: window.innerHeight,
      };
    }
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(cardRef.current!);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, []);

  // rawScrollY updates the instant the wheel/touch moves and freezes the
  // instant it stops — it does NOT inherit Lenis's easing tail the way
  // window.scrollY (fed by Lenis's animated/eased position) does. That's
  // what makes the image move exactly parallel to the physical scroll
  // gesture, with nothing continuing to drift once you stop.
  const rawScrollY = useRawScrollY();

  const imgY = useTransform(rawScrollY, (raw: number) => {
    const { top, height, viewport } = dims.current;
    if (!viewport) return "0%"; // not measured yet
    const viewportTop = top - raw; // card's current top position relative to the viewport
    let progress = (viewport - viewportTop) / (viewport + height); // 0 = card entering bottom, 1 = card leaving top
    progress = Math.min(1, Math.max(0, progress));
    const percent = -15 + progress * 30; // maps [0,1] -> [-15, 15]
    return `${percent}%`;
  });

  // Staggered delays matching your grid-card:nth-child rules exactly (left to right)
  const colIndex = index % 4;
  const wrapperDelay = 0.1 + colIndex * 0.15;
  const labelDelay = 0.2 + colIndex * 0.15;

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className="group flex flex-col justify-between cursor-pointer relative"
    >
      {/* Luxury image viewport window (with 1.8s duration, cubic-bezier transition and 80px translation up) */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: 1.8,
          ease: [0.16, 1, 0.3, 1],
          delay: wrapperDelay,
        }}
        className="relative w-full h-[380px] lg:h-[480px] overflow-hidden rounded-2xl border border-white/5 bg-[#121212] shadow-lg transition-colors duration-500 hover:border-brand-blue/30"
      >
        <motion.img
          src={item.image}
          alt={item.title}
          referrerPolicy="no-referrer"
          style={{
            y: imgY,
            height: "145%",
            top: "-22.5%",
            // Don't set `transform` here directly — Motion composes the whole
            // transform string itself from `y` (and any x/scale/rotate you'd add).
            // A raw `transform` value in the same style object fights that
            // composition and can cause exactly the kind of snap/jump you saw.
          }}
          className="absolute inset-x-0 w-full object-cover filter grayscale-[15%] brightness-[85%] group-hover:grayscale-[5%] group-hover:brightness-95 group-hover:scale-105 transition-all duration-700 select-none pointer-events-none will-change-transform"
        />

        {/* Dark bottom gradient overlay for perfect contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

        {/* Floating Glass-morphic Price Badge on Image */}
        <div className="absolute bottom-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-zinc-100 font-bold tracking-wider group-hover:border-brand-blue/40 group-hover:text-brand-blue transition-all duration-300 shadow-md">
          {item.price}
        </div>

        {/* Small floating action button indicator */}
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-950/60 border border-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-brand-blue group-hover:border-brand-blue transition-all duration-300 z-20 shadow-sm backdrop-blur-sm">
          <ArrowUpRight size={14} className="text-zinc-300 group-hover:text-black transition-colors" />
        </div>
      </motion.div>

      {/* Elegant Editorial Typography Label Below Card (with 1.4s duration, cubic-bezier transition and 30px translation up) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: 1.4,
          ease: [0.16, 1, 0.3, 1],
          delay: labelDelay,
        }}
        className="mt-5 flex flex-col space-y-1 pl-1"
      >
        <div className="flex justify-between items-baseline gap-2">
          <span className="font-mono text-[9px] tracking-[0.25em] text-brand-blue uppercase font-bold truncate">
            {item.tagline}
          </span>
          <span className="font-mono text-[10px] font-semibold text-zinc-400 group-hover:text-zinc-200 transition-colors shrink-0">
            {item.price}
          </span>
        </div>
        <h3 className="font-serif text-lg md:text-xl font-medium text-white tracking-tight group-hover:text-brand-blue transition-colors duration-300">
          {item.title}
        </h3>
        <span className="font-mono text-[8px] tracking-widest text-zinc-500 group-hover:text-zinc-400 uppercase mt-1 block">
          [ Inspect Specs ]
        </span>
      </motion.div>
    </div>
  );
}

export default function SolutionsSection({ onPreSelectService }: SolutionsSectionProps) {
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null);
  const lenis = useLenis();

  return (
    <section
      id="solutions"
      className="relative min-h-screen bg-[#0a0a0a] py-24 px-6 md:px-12 border-b border-white/5 flex flex-col justify-center"
    >
      {/* Decorative subtle brand-blue light beam */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(10,100,255,0.025)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 space-y-16 relative">
        {/* Section Header with Reveal Animations aligned to match other sections */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
          <div className="space-y-4 text-left">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-mono text-xs tracking-[0.3em] text-brand-blue uppercase block"
            >
              [ EXQUISITE EDITORIAL ]
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase leading-[0.85] tracking-tighter"
            >
              OUR ESSENTIAL <br />
              <span className="text-zinc-400 italic font-black">SOLUTIONS</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex items-center gap-4 shrink-0"
          >
            <button
              onClick={() => {
                const shopSection = document.getElementById("opticals-shop");
                if (shopSection) {
                  if (lenis) {
                    lenis.scrollTo(shopSection);
                  } else {
                    shopSection.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
              className="relative px-6 py-3.5 rounded-full bg-zinc-900/40 border border-white/10 hover:border-brand-blue text-zinc-300 hover:text-brand-blue backdrop-blur-sm transition-all cursor-pointer group flex items-center gap-2.5 shadow-sm"
            >
              <span className="font-mono text-[10px] tracking-wider uppercase font-bold px-1">
                View All Products
              </span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Parallax Grid Layout matching exact CSS column setup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full pt-4">
          {SOLUTIONS_DATA.map((item, index) => (
            <SolutionCard
              key={item.id}
              item={item}
              index={index}
              onClick={() => setSelectedSolution(item)}
            />
          ))}
        </div>
      </div>

      {/* HIGH-IMPACT INTERACTIVE DETAIL OVERLAY MODAL */}
      <AnimatePresence>
        {selectedSolution && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 relative shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedSolution(null)}
                className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-zinc-900/60 backdrop-blur-sm border border-white/10 hover:border-brand-blue hover:bg-brand-blue/20 flex items-center justify-center text-zinc-400 transition-all duration-300 cursor-pointer"
              >
                <X size={16} />
              </button>

              {/* Left Side: Product Image Display */}
              <div className="md:col-span-6 relative aspect-video md:aspect-[4/5] bg-black">
                <img
                  src={selectedSolution.image}
                  alt={selectedSolution.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Right Side: Product Details & Appointment Actions */}
              <div className="md:col-span-6 p-8 md:p-10 flex flex-col justify-between space-y-8 bg-zinc-950">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] tracking-[0.25em] text-brand-blue uppercase font-bold px-2.5 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full">
                      {selectedSolution.tagline}
                    </span>
                    <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
                      CAT_00{selectedSolution.id}
                    </span>
                  </div>

                  <div className="space-y-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/5 pb-4">
                    <h3 className="font-serif text-3xl md:text-4xl font-normal text-white uppercase tracking-tight">
                      {selectedSolution.title}
                    </h3>
                    <span className="font-mono text-sm font-semibold text-brand-blue tracking-wider shrink-0 bg-brand-blue/5 border border-brand-blue/10 px-3 py-1 rounded-md">
                      {selectedSolution.price}
                    </span>
                  </div>

                  <p className="font-sans text-sm text-zinc-300 leading-relaxed font-light">
                    {selectedSolution.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    <h4 className="font-mono text-[9px] text-brand-blue tracking-wider uppercase">
                      Core Specialties
                    </h4>
                    <div className="space-y-2">
                      {selectedSolution.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300 font-light">
                          <Check size={12} className="text-brand-blue shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center border border-white/10">
                      <Award size={14} className="text-brand-blue" />
                    </div>
                    <div>
                      <span className="block font-mono text-[8px] text-zinc-500 tracking-wider uppercase">
                        Bespoke Consultation
                      </span>
                      <span className="font-display text-[10px] text-zinc-200 font-bold tracking-widest uppercase">
                        Complimentary fitting Included
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onPreSelectService(selectedSolution.title);
                      setSelectedSolution(null);
                    }}
                    className="w-full py-4 rounded-xl bg-brand-blue text-white hover:bg-white hover:text-black font-display text-[11px] font-black tracking-widest uppercase transition-all duration-300 shadow-md cursor-pointer"
                  >
                    ADD TO APPOINTMENT
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}











// import React, { useState, useRef } from "react";
// import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
// import { Check, ArrowUpRight, Award, X } from "lucide-react";

// interface SolutionsSectionProps {
//   onPreSelectService: (serviceName: string) => void;
// }

// interface SolutionItem {
//   id: number;
//   title: string;
//   image: string;
//   tagline: string;
//   description: string;
//   features: string[];
//   price: string;
// }

// const SOLUTIONS_DATA: SolutionItem[] = [
//   {
//     id: 1,
//     title: "Sunglasses",
//     image: "https://i.pinimg.com/736x/2e/43/5e/2e435e98cb104c688c21c0f9aa2f2b0f.jpg",
//     tagline: "LUXURY SUN PROTECTION",
//     description: "Curated collection of premier international designer sunglasses. Designed to block 100% of UVA/UVB rays with absolute visual clarity.",
//     features: ["Authorized global designer brands", "Polarized & non-polarized options", "Custom prescription sun lenses available"],
//     price: "From ₹18,900",
//   },
//   {
//     id: 2,
//     title: "Optical Frames",
//     image: "https://i.pinimg.com/736x/2e/43/5e/2e435e98cb104c688c21c0f9aa2f2b0f.jpg",
//     tagline: "SARTORIAL FRAME CRAFT",
//     description: "Handcrafted acetate, lightweight pure titanium, and bespoke horn frames sourced directly from heritage European houses.",
//     features: ["Sourced from Milan, Paris, & Tokyo", "Free custom facial-fit adjustment", "Ultralight titanium and premium bio-acetate"],
//     price: "From ₹24,500",
//   },
//   {
//     id: 3,
//     title: "Optical Lenses",
//     image: "https://i.pinimg.com/736x/2e/43/5e/2e435e98cb104c688c21c0f9aa2f2b0f.jpg",
//     tagline: "PRECISION WAVEFRONT LENSES",
//     description: "State-of-the-art digital progressive and single-vision lenses tailored to your unique lifestyle and ocular geometry.",
//     features: ["Advanced blue-light filtering", "Sartorial ultra-thin lens indexing", "Anti-reflective & scratch-resistant armor"],
//     price: "From ₹9,500",
//   },
//   {
//     id: 4,
//     title: "Contact Lenses",
//     image: "https://i.pinimg.com/736x/2e/43/5e/2e435e98cb104c688c21c0f9aa2f2b0f.jpg",
//     tagline: "HYDRATING OCULAR COMFORT",
//     description: "Premium daily, bi-weekly, and monthly contacts engineered with breathable silicone hydrogel for high oxygen transmission.",
//     features: ["Precision astigmatism & multifocal fitting", "High-moisture retaining matrices", "Custom cosmetic color enhancements"],
//     price: "From ₹3,200",
//   },
//   {
//     id: 5,
//     title: "Kids Eyewear",
//     image: "https://i.pinimg.com/736x/2e/43/5e/2e435e98cb104c688c21c0f9aa2f2b0f.jpg",
//     tagline: "DURABLE VISION SECURE",
//     description: "Specially engineered resilient, flexible, and hypoallergenic frames configured to withstand vigorous play while ensuring vision growth.",
//     features: ["Highly flexible shatter-proof temples", "Special optical stabilization strap points", "High-impact robust polycarbonate lenses"],
//     price: "From ₹4,200",
//   },
//   {
//     id: 6,
//     title: "Ready Readers",
//     image: "https://i.pinimg.com/736x/2e/43/5e/2e435e98cb104c688c21c0f9aa2f2b0f.jpg",
//     tagline: "INSTANT PRESBYOPIA AID",
//     description: "Sophisticated magnification lenses set in beautiful lightweight frames, immediately available for reading and fine-detail work.",
//     features: ["Magnification power range from +1.00 to +3.50", "Durable scratch-protective coat", "Includes premium protective travel pouch"],
//     price: "From ₹2,800",
//   },
//   {
//     id: 7,
//     title: "Eyewear Accessories",
//     image: "https://i.pinimg.com/736x/2e/43/5e/2e435e98cb104c688c21c0f9aa2f2b0f.jpg",
//     tagline: "BESPOKE ORNAMENTATION",
//     description: "Artisan-crafted leather cases, premium micro-fiber cloths, gold and silver frame chains, and dynamic organic cleansing sprays.",
//     features: ["Artisanal full-grain leather sleeves", "Premium 24K gold-plated cords", "Natural anti-fog micro-mist cleansers"],
//     price: "From ₹1,200",
//   },
//   {
//     id: 8,
//     title: "Bespoke Fitting",
//     image: "https://i.pinimg.com/736x/2e/43/5e/2e435e98cb104c688c21c0f9aa2f2b0f.jpg",
//     tagline: "INTELLIGENT AUDIOLOGY & CARE",
//     description: "Personalized fitting consultation leveraging digital ocular measurements to secure perfect weight distribution, grip, and vision focal points.",
//     features: ["Discreet personalized styling profiles", "Advanced physical alignment metrics", "Complimentary custom adjustment plan"],
//     price: "Complimentary",
//   },
// ];

// interface SolutionCardProps {
//   key?: React.Key | number;
//   item: SolutionItem;
//   onClick: () => void;
//   index: number;
// }

// function SolutionCard({ item, onClick, index }: SolutionCardProps) {
//   const cardRef = useRef<HTMLDivElement>(null);

//   // Individual scroll tracker for this specific card to create parallax.
//   // NOTE: this hook tracks native scroll position. It will only feel
//   // "buttery" once Lenis (mounted once at the app root — see
//   // LenisProvider.tsx) is smoothing that native scroll. Without Lenis,
//   // this same code will feel stepped/jittery on most trackpads & mice,
//   // no matter how the transform range below is tuned.
//   const { scrollYProgress } = useScroll({
//     target: cardRef,
//     offset: ["start end", "end start"],
//   });

//   // Direct 1:1 mapping, no spring — matches the "no rubbery lag" behavior
//   // from the HTML reference. Do NOT wrap this in useSpring; springing the
//   // output re-introduces the lag you're trying to remove. Smoothing
//   // belongs upstream, on the scroll input itself (i.e. Lenis), not here.
//   const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

//   // Staggered delays matching your grid-card:nth-child rules exactly (left to right)
//   const colIndex = index % 4;
//   const wrapperDelay = 0.1 + colIndex * 0.15;
//   const labelDelay = 0.2 + colIndex * 0.15;

//   return (
//     <div
//       ref={cardRef}
//       onClick={onClick}
//       className="group flex flex-col justify-between cursor-pointer relative"
//     >
//       {/* Luxury image viewport window (with 1.8s duration, cubic-bezier transition and 80px translation up) */}
//       <motion.div
//         initial={{ opacity: 0, y: 80 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, margin: "-80px" }}
//         transition={{
//           duration: 1.8,
//           ease: [0.16, 1, 0.3, 1],
//           delay: wrapperDelay,
//         }}
//         className="relative w-full h-[380px] lg:h-[480px] overflow-hidden rounded-2xl border border-white/5 bg-[#121212] shadow-lg transition-colors duration-500 hover:border-brand-blue/30"
//       >
//         <motion.img
//           src={item.image}
//           alt={item.title}
//           referrerPolicy="no-referrer"
//           style={{
//             y: imgY,
//             height: "145%",
//             top: "-22.5%",
//             transform: "translateZ(0)", // forces its own GPU compositing layer immediately on first paint, rather than waiting for will-change to kick in on first scroll
//             backfaceVisibility: "hidden",
//           }}
//           className="absolute inset-x-0 w-full object-cover filter grayscale-[15%] brightness-[85%] group-hover:grayscale-[5%] group-hover:brightness-95 group-hover:scale-105 transition-all duration-700 select-none pointer-events-none will-change-transform"
//         />

//         {/* Dark bottom gradient overlay for perfect contrast */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

//         {/* Floating Glass-morphic Price Badge on Image */}
//         <div className="absolute bottom-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-zinc-100 font-bold tracking-wider group-hover:border-brand-blue/40 group-hover:text-brand-blue transition-all duration-300 shadow-md">
//           {item.price}
//         </div>

//         {/* Small floating action button indicator */}
//         <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-zinc-950/60 border border-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-brand-blue group-hover:border-brand-blue transition-all duration-300 z-20 shadow-sm backdrop-blur-sm">
//           <ArrowUpRight size={14} className="text-zinc-300 group-hover:text-black transition-colors" />
//         </div>
//       </motion.div>

//       {/* Elegant Editorial Typography Label Below Card (with 1.4s duration, cubic-bezier transition and 30px translation up) */}
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, margin: "-80px" }}
//         transition={{
//           duration: 1.4,
//           ease: [0.16, 1, 0.3, 1],
//           delay: labelDelay,
//         }}
//         className="mt-5 flex flex-col space-y-1 pl-1"
//       >
//         <div className="flex justify-between items-baseline gap-2">
//           <span className="font-mono text-[9px] tracking-[0.25em] text-brand-blue uppercase font-bold truncate">
//             {item.tagline}
//           </span>
//           <span className="font-mono text-[10px] font-semibold text-zinc-400 group-hover:text-zinc-200 transition-colors shrink-0">
//             {item.price}
//           </span>
//         </div>
//         <h3 className="font-serif text-lg md:text-xl font-medium text-white tracking-tight group-hover:text-brand-blue transition-colors duration-300">
//           {item.title}
//         </h3>
//         <span className="font-mono text-[8px] tracking-widest text-zinc-500 group-hover:text-zinc-400 uppercase mt-1 block">
//           [ Inspect Specs ]
//         </span>
//       </motion.div>
//     </div>
//   );
// }

// export default function SolutionsSection({ onPreSelectService }: SolutionsSectionProps) {
//   const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null);

//   return (
//     <section
//       id="solutions"
//       className="relative min-h-screen bg-[#0a0a0a] py-24 px-6 md:px-12 border-b border-white/5 flex flex-col justify-center"
//     >
//       {/* Decorative subtle brand-blue light beam */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(10,100,255,0.025)_0%,transparent_60%)] pointer-events-none" />

//       <div className="max-w-7xl mx-auto w-full z-10 space-y-16 relative">
//         {/* Section Header with Reveal Animations aligned to match other sections */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
//           <div className="space-y-4 text-left">
//             <motion.span
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
//               className="font-mono text-xs tracking-[0.3em] text-brand-blue uppercase block"
//             >
//               [ EXQUISITE EDITORIAL ]
//             </motion.span>
//             <motion.h2
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
//               className="font-serif text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase leading-[0.85] tracking-tighter"
//             >
//               OUR ESSENTIAL <br />
//               <span className="text-zinc-400 italic font-black">SOLUTIONS</span>
//             </motion.h2>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
//             className="flex items-center gap-4 shrink-0"
//           >
//             <button
//               onClick={() => {
//                 const shopSection = document.getElementById("opticals-shop");
//                 if (shopSection) {
//                   shopSection.scrollIntoView({ behavior: "smooth" });
//                 }
//               }}
//               className="relative px-6 py-3.5 rounded-full bg-zinc-900/40 border border-white/10 hover:border-brand-blue text-zinc-300 hover:text-brand-blue backdrop-blur-sm transition-all cursor-pointer group flex items-center gap-2.5 shadow-sm"
//             >
//               <span className="font-mono text-[10px] tracking-wider uppercase font-bold px-1">
//                 View All Products
//               </span>
//               <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
//             </button>
//           </motion.div>
//         </div>

//         {/* Parallax Grid Layout matching exact CSS column setup */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full pt-4">
//           {SOLUTIONS_DATA.map((item, index) => (
//             <SolutionCard
//               key={item.id}
//               item={item}
//               index={index}
//               onClick={() => setSelectedSolution(item)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* HIGH-IMPACT INTERACTIVE DETAIL OVERLAY MODAL */}
//       <AnimatePresence>
//         {selectedSolution && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-6"
//           >
//             <motion.div
//               initial={{ scale: 0.95, y: 30 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.95, y: 30 }}
//               transition={{ type: "spring", stiffness: 100, damping: 20 }}
//               className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 relative shadow-2xl"
//             >
//               {/* Close Button */}
//               <button
//                 onClick={() => setSelectedSolution(null)}
//                 className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-zinc-900/60 backdrop-blur-sm border border-white/10 hover:border-brand-blue hover:bg-brand-blue/20 flex items-center justify-center text-zinc-400 transition-all duration-300 cursor-pointer"
//               >
//                 <X size={16} />
//               </button>

//               {/* Left Side: Product Image Display */}
//               <div className="md:col-span-6 relative aspect-video md:aspect-[4/5] bg-black">
//                 <img
//                   src={selectedSolution.image}
//                   alt={selectedSolution.title}
//                   referrerPolicy="no-referrer"
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
//               </div>

//               {/* Right Side: Product Details & Appointment Actions */}
//               <div className="md:col-span-6 p-8 md:p-10 flex flex-col justify-between space-y-8 bg-zinc-950">
//                 <div className="space-y-6">
//                   <div className="flex items-center justify-between">
//                     <span className="font-mono text-[9px] tracking-[0.25em] text-brand-blue uppercase font-bold px-2.5 py-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full">
//                       {selectedSolution.tagline}
//                     </span>
//                     <span className="font-mono text-[9px] tracking-wider text-zinc-500 uppercase">
//                       CAT_00{selectedSolution.id}
//                     </span>
//                   </div>

//                   <div className="space-y-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/5 pb-4">
//                     <h3 className="font-serif text-3xl md:text-4xl font-normal text-white uppercase tracking-tight">
//                       {selectedSolution.title}
//                     </h3>
//                     <span className="font-mono text-sm font-semibold text-brand-blue tracking-wider shrink-0 bg-brand-blue/5 border border-brand-blue/10 px-3 py-1 rounded-md">
//                       {selectedSolution.price}
//                     </span>
//                   </div>

//                   <p className="font-sans text-sm text-zinc-300 leading-relaxed font-light">
//                     {selectedSolution.description}
//                   </p>

//                   <div className="space-y-3 pt-2">
//                     <h4 className="font-mono text-[9px] text-brand-blue tracking-wider uppercase">
//                       Core Specialties
//                     </h4>
//                     <div className="space-y-2">
//                       {selectedSolution.features.map((feature, idx) => (
//                         <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300 font-light">
//                           <Check size={12} className="text-brand-blue shrink-0" />
//                           <span>{feature}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-4 pt-6 border-t border-white/5">
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 rounded-full bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center border border-white/10">
//                       <Award size={14} className="text-brand-blue" />
//                     </div>
//                     <div>
//                       <span className="block font-mono text-[8px] text-zinc-500 tracking-wider uppercase">
//                         Bespoke Consultation
//                       </span>
//                       <span className="font-display text-[10px] text-zinc-200 font-bold tracking-widest uppercase">
//                         Complimentary fitting Included
//                       </span>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => {
//                       onPreSelectService(selectedSolution.title);
//                       setSelectedSolution(null);
//                     }}
//                     className="w-full py-4 rounded-xl bg-brand-blue text-white hover:bg-white hover:text-black font-display text-[11px] font-black tracking-widest uppercase transition-all duration-300 shadow-md cursor-pointer"
//                   >
//                     ADD TO APPOINTMENT
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }