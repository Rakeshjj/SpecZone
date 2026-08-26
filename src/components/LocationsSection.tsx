import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LOCATIONS_DATA } from "../data";
import { Location } from "../types";
import { MapPin, Phone, Clock, ArrowUpRight, Check, Eye } from "lucide-react";

export default function LocationsSection() {
  const [hoveredLocId, setHoveredLocId] = useState<number>(1);
  const [selectedGalleryLoc, setSelectedGalleryLoc] = useState<Location | null>(null);

  const activeLoc = LOCATIONS_DATA.find((l) => l.id === hoveredLocId) || LOCATIONS_DATA[0];

  return (
    <section
      id="locations"
      className="relative min-h-screen bg-zinc-950 py-24 px-6 md:px-12 overflow-hidden border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto w-full z-10 space-y-20">
        {/* TOP: Split Hero Selector (Matches Video layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Top Left: Typography */}
          <div className="col-span-1 lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="font-mono text-xs tracking-[0.3em] text-brand-blue block">
                [ SHOWROOMS v1959: GEOGRAPHY ]
              </span>
              <h2 className="font-serif text-5xl md:text-7xl font-black text-white uppercase leading-[0.85] tracking-tighter">
                OUR ATELIER <br />
                <span className="text-zinc-500 italic font-black">LOCATIONS</span>
              </h2>
            </div>
 
            {/* Region Toggles */}
            <div className="space-y-2 border-l border-white/10 pl-6">
              <div className="font-serif text-2xl text-white font-medium tracking-wider uppercase">
                Chennai Outlets
              </div>
            </div>

            {/* Giant Showroom Showcase - dynamically loaded on hover of list */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-zinc-950/40 backdrop-blur-sm shadow-xl group hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLoc.id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.03 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img
                    src={activeLoc.image}
                    alt={activeLoc.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Dynamic address stamp */}
                  <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                    <div className="space-y-1">
                      <div className="font-display text-[9px] tracking-[0.25em] text-brand-blue font-bold uppercase">
                        Current Preview
                      </div>
                      <h4 className="font-serif text-lg text-white font-semibold">
                        {activeLoc.name} Atelier
                      </h4>
                    </div>
                    <span className="font-display text-[10px] tracking-wider text-white/50 uppercase">
                      {activeLoc.city}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Top Right: Scroll list + visit us (Exact match with video sidebar layout) */}
          <div className="col-span-1 lg:col-span-7 flex flex-col justify-between self-stretch lg:pl-12 font-sans">
            <div className="flex items-center justify-between pb-6 border-b border-white/5">
              <span className="font-display text-xs tracking-widest text-zinc-450 uppercase font-semibold">
                Outlet Directory
              </span>
              <span className="font-display text-xs tracking-widest text-brand-blue uppercase font-semibold animate-pulse">
                visit us ↗
              </span>
            </div>
 
            <div id="atelier-tab-list" className="flex flex-col divide-y divide-white/5">
              {LOCATIONS_DATA.map((loc) => {
                const isActive = hoveredLocId === loc.id;
                return (
                  <button
                    key={loc.id}
                    id={`atelier-tab-item-${loc.id}`}
                    onMouseEnter={() => setHoveredLocId(loc.id)}
                    onClick={() => setHoveredLocId(loc.id)}
                    className="py-6 flex items-start justify-between group cursor-pointer focus:outline-none w-full text-left"
                  >
                    <div className="flex flex-col flex-1">
                      <span
                        className={`font-serif text-xl md:text-3xl font-light uppercase tracking-wide transition-all duration-300 ${
                          isActive
                            ? "text-brand-blue pl-4"
                            : "text-zinc-500 hover:text-white hover:pl-2"
                        }`}
                      >
                        {loc.name}
                      </span>
                      
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="pl-4 text-xs space-y-1.5 text-zinc-400 font-sans overflow-hidden"
                          >
                            <p className="flex items-start gap-1.5 max-w-md leading-relaxed">
                              <MapPin size={11} className="text-brand-blue/70 shrink-0 mt-0.5" />
                              <span>{loc.address}</span>
                            </p>
                            <p className="flex items-center gap-1.5 text-zinc-300 font-medium">
                              <Phone size={11} className="text-brand-blue shrink-0" />
                              <span>{loc.phone}</span>
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex items-center space-x-4 shrink-0 pt-1 md:pt-2">
                      <span className="font-display text-[10px] tracking-widest text-zinc-400 uppercase">
                        {loc.city}
                      </span>
                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          isActive ? "bg-brand-blue scale-125" : "bg-white/10 group-hover:bg-white/20"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Lightbox Modal Popup */}
      <AnimatePresence>
        {selectedGalleryLoc && (
          <motion.div
            id="showroom-gallery-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-950/75 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <div className="max-w-4xl w-full bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl">
              {/* Close Icon */}
              <button
                id="gallery-close-btn"
                onClick={() => setSelectedGalleryLoc(null)}
                className="absolute top-6 right-6 bg-zinc-950/60 hover:bg-zinc-850/60 border border-white/10 text-zinc-450 hover:text-white p-2.5 rounded-full z-10 transition-colors backdrop-blur-sm cursor-pointer"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Visual */}
                <div className="md:col-span-7 h-80 md:h-[450px]">
                  <img
                    src={selectedGalleryLoc.image}
                    alt={selectedGalleryLoc.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Narrative */}
                <div className="md:col-span-5 p-8 flex flex-col justify-between self-stretch bg-zinc-950/80 backdrop-blur-md">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <span className="font-display text-[9px] tracking-[0.25em] text-brand-blue font-bold uppercase">
                        ATELIER LIGHTBOX
                      </span>
                      <h3 className="font-serif text-2xl text-white uppercase font-bold">
                        {selectedGalleryLoc.name} Showroom
                      </h3>
                      <p className="font-display text-xs text-zinc-400 tracking-wider">
                        {selectedGalleryLoc.city}, India
                      </p>
                    </div>

                    <p className="font-sans text-xs text-zinc-300 leading-relaxed font-light">
                      Equipped with high-precision digital refraction diagnostics suites and direct-feed lab logistics. Browse over 1,200 styles of optical frames, high-fashion sunglasses, and pediatric visual solutions.
                    </p>

                    <div className="space-y-3 pt-4 border-t border-white/5 text-xs">
                      <div className="flex items-center gap-2 text-zinc-300">
                        <Check size={14} className="text-brand-blue" />
                        Dedicated Audiology Test Booths
                      </div>
                      <div className="flex items-center gap-2 text-zinc-300">
                        <Check size={14} className="text-brand-blue" />
                        Complimentary Ultrasonics Deep Cleaning
                      </div>
                      <div className="flex items-center gap-2 text-zinc-300">
                        <Check size={14} className="text-brand-blue" />
                        Certified Zeiss Fitting Terminal
                      </div>
                    </div>
                  </div>

                  <a
                    id="lightbox-call-btn"
                    href={`tel:${selectedGalleryLoc.phone}`}
                    className="mt-8 w-full py-4 bg-brand-blue hover:bg-white hover:text-black text-white font-display text-xs tracking-widest font-black rounded-xl text-center transition-all inline-block cursor-pointer shadow-md"
                  >
                    CALL FOR ENQUIRY
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
