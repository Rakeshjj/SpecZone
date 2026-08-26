import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, BookOpen, Clock, Calendar, ChevronRight, Share2, Sparkles } from "lucide-react";

interface Article {
  id: number;
  title: string;
  category: "Ocular Health" | "Style Styling" | "Audiology Tech";
  readTime: string;
  date: string;
  thumbnail: string;
  summary: string;
  content: string[];
}

const ARTICLES_DATA: Article[] = [
  {
    id: 1,
    title: "Understanding Digital Eyestrain & Wavefront Custom Lenses",
    category: "Ocular Health",
    readTime: "5 min read",
    date: "July 10, 2026",
    thumbnail: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=600",
    summary: "As digital screens dominate our daily schedules, learn how custom blue-light filtering and computerized wavefront refractometry relieve fatigue.",
    content: [
      "In our hyper-connected modern era, the average professional spends upwards of 8 to 11 hours daily gazing at digital screens—laptops, smartphones, and tablets. This prolonged exposure triggers a condition known as Computer Vision Syndrome (CVS) or digital eyestrain.",
      "CVS manifests as dry eyes, blurry vision, headaches, and physical neck fatigue. The root culprit is high-energy visible (HEV) blue-light scatter combined with constant close-up focus demand, which forces the ciliary muscles in your eyes to remain permanently tensed.",
      "At Spectacal Zone, we address CVS through personalized Wavefront custom lenses. Unlike standard prescription lenses, wavefront refraction maps the unique physical curves and microscopic imperfections of your eye's surface.",
      "By adding advanced premium anti-reflective coatings and biological blue-light absorption matrices, our wavefront progressive lenses block harmful blue-violet wavelengths while restoring a perfectly relaxed, natural focal point. Experience comfortable, high-definition reading across all screens without strain."
    ]
  },
  {
    id: 2,
    title: "Sartorial Eyewear: Aligning Frame Contours to Your Face Shape",
    category: "Style Styling",
    readTime: "4 min read",
    date: "June 28, 2026",
    thumbnail: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=600",
    summary: "Selecting eyewear is an architectural art. Discover how to balance rectangular, oval, and heart-shaped visages with premium designer frames.",
    content: [
      "Eyewear is the ultimate sartorial punctuation—it sits at the very epicenter of your facial canvas. Selecting the perfect designer frame is not merely about finding a color you like; it is a delicate architectural exercise in balancing geometric proportions.",
      "The golden rule of eyewear styling is to choose a frame shape that directly contrasts your natural facial structure. A round face thrives under sharp rectangular, square, or geometric frames that introduce structured angles and elongate the visage.",
      "Conversely, a strongly rectangular or angular jawline is softened and balanced beautifully by circular, oval, or cat-eye structures. If you possess an oval face, you are blessed with natural symmetry and can boldly pull off oversized pilot frames or unconventional avant-garde shapes.",
      "Our optical styling consultants at Spectacal Zone are trained in bespoke facial-fit adjustments. We evaluate your skin tone, bridge size, and temple lines to curate a matching selection of Balmain Paris, Prada, and Maybach eyewear that accentuates your authentic, dignified persona."
    ]
  },
  {
    id: 3,
    title: "Acoustic Sophistication: The Era of Bluetooth AI Hearing Aids",
    category: "Audiology Tech",
    readTime: "6 min read",
    date: "June 14, 2026",
    thumbnail: "https://images.unsplash.com/photo-1598128558393-70ff21433be0?auto=format&fit=crop&q=80&w=600",
    summary: "Modern hearing aids are microcomputers. Explore how neural background-noise compression and direct smartphone streaming redefine sound.",
    content: [
      "Audiological solutions have undergone an incredible technological renaissance. The heavy, bulky, analog hearing devices of the past have been replaced by state-of-the-art acoustic instruments that act as sophisticated microcomputers.",
      "Today's hearing aids are designed with near-invisible profiles that nestle comfortably within the ear canal. Behind this miniature form factor is high-fidelity sound processing powered by artificial intelligence and custom neural networks.",
      "These modern chips perform real-time acoustic scene analysis—sampling environmental background noise up to 500 times per second to selectively isolate and amplify human conversation while suppressing screeching winds or traffic rumble.",
      "Furthermore, direct Bluetooth connectivity allows you to stream telephone calls, podcast episodes, and televisions directly into your auditory instruments. Visit our dedicated audiology rooms in Chennai and Coimbatore to receive a professional hearing calibration and discover invisible audio refinement."
    ]
  }
];

export default function BlogSection() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section
      id="blog"
      className="relative min-h-screen bg-zinc-950 py-24 px-6 md:px-12 border-b border-white/5 overflow-hidden flex flex-col justify-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(10,100,255,0.01)_0%,transparent_60%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto w-full z-10 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
          <div className="space-y-4">
            <span className="font-mono text-xs tracking-[0.3em] text-brand-blue block">
              [ THE VIJAYA CHRONICLES & HEALTH INSIGHTS ]
            </span>
            <h2 className="font-serif text-5xl md:text-7xl font-black text-white uppercase leading-[0.85] tracking-tighter">
              EYE CARE <br />
              <span className="text-zinc-500 italic font-black">CHRONICLES</span>
            </h2>
          </div>

          <span className="font-mono text-xs text-zinc-400 tracking-wider uppercase border-b border-white/10 pb-1 hover:text-brand-blue hover:border-brand-blue cursor-pointer transition-colors">
            All Articles →
          </span>
        </div>

        {/* 3-Column Blog Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
        >
          {ARTICLES_DATA.map((article) => (
            <motion.div
              key={article.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 14 } }
              }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="bg-zinc-900/40 backdrop-blur-sm border border-white/10 hover:border-brand-blue/30 rounded-2xl overflow-hidden shadow-md hover:shadow-xl flex flex-col justify-between group transition-all duration-500"
            >
              <div>
                {/* Thumbnail */}
                <div className="aspect-[16/10] w-full bg-zinc-950/20 overflow-hidden relative border-b border-white/10">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700"
                  />
                  <span className="absolute top-4 left-4 bg-zinc-950/60 backdrop-blur-md text-zinc-100 font-mono text-[9px] tracking-widest uppercase px-3 py-1 rounded-full border border-white/10">
                    {article.category}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-3">
                  <div className="flex gap-4 text-zinc-500 font-mono text-[9px] uppercase tracking-widest">
                    <span className="flex items-center gap-1"><Calendar size={10} /> {article.date}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {article.readTime}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white uppercase tracking-tight group-hover:text-brand-blue transition-colors duration-300 leading-snug">
                    {article.title}
                  </h3>

                  <p className="font-sans text-xs text-zinc-350 leading-relaxed font-light">
                    {article.summary}
                  </p>
                </div>
              </div>

              {/* Read button CTA */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="flex items-center gap-1 font-mono text-[10px] text-brand-blue group-hover:text-white font-bold tracking-widest uppercase cursor-pointer transition-colors"
                >
                  <span>Read Article</span>
                  <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Full formatted Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-950/75 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-zinc-900/60 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden max-w-2xl w-full relative shadow-2xl flex flex-col max-h-[85vh]"
            >
              {/* Header Image cover */}
              <div className="h-48 md:h-64 relative w-full bg-zinc-950 shrink-0">
                <img
                  src={selectedArticle.thumbnail}
                  alt={selectedArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent pointer-events-none" />
                
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-zinc-950/40 backdrop-blur-md border border-white/10 hover:border-brand-blue text-zinc-400 hover:text-brand-blue flex items-center justify-center transition-all cursor-pointer shadow-md"
                >
                  <X size={16} />
                </button>

                <div className="absolute bottom-6 left-6 right-6 space-y-1">
                  <span className="bg-brand-blue/10 border border-brand-blue/20 text-brand-blue font-mono text-[9px] tracking-widest uppercase px-3 py-1 rounded-full">
                    {selectedArticle.category}
                  </span>
                  <h4 className="font-serif text-2xl font-black text-white uppercase tracking-tight mt-3">
                    {selectedArticle.title}
                  </h4>
                </div>
              </div>

              {/* Scrollable Article Body Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4">
                <div className="flex gap-4 text-zinc-400 font-mono text-[9px] uppercase tracking-widest border-b border-white/5 pb-3 font-sans">
                  <span className="flex items-center gap-1 text-zinc-400"><Calendar size={11} /> {selectedArticle.date}</span>
                  <span className="flex items-center gap-1 text-zinc-400"><Clock size={11} /> {selectedArticle.readTime}</span>
                  <span className="flex items-center gap-1 text-zinc-400 ml-auto cursor-pointer hover:text-brand-blue"><Share2 size={11} /> Share</span>
                </div>

                <div className="space-y-4 font-sans text-xs md:text-sm text-zinc-300 leading-relaxed font-light">
                  {selectedArticle.content.map((paragraph, index) => (
                    <p key={index} className="first-letter:text-lg first-letter:font-serif first-letter:text-brand-blue">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="mt-8 p-5 rounded-2xl bg-brand-blue/[0.03] backdrop-blur-sm border border-brand-blue/20 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                    <BookOpen size={16} />
                  </div>
                  <div>
                    <h5 className="font-display text-[10px] text-brand-blue tracking-widest uppercase font-extrabold">Need custom lens solutions?</h5>
                    <p className="font-sans text-[11px] text-zinc-400 font-light mt-0.5">Book a complimentary ocular fitting diagnostic with our senior optometrist today.</p>
                  </div>
                </div>
              </div>

              {/* Footer Modal Action */}
              <div className="p-6 border-t border-white/5 bg-zinc-950/40 backdrop-blur-sm shrink-0 flex justify-between items-center">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">VIJAYA OPTICAL HOUSE RESEARCH DEPOT</span>
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    const el = document.getElementById("solutions");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-6 py-3 rounded-lg bg-brand-blue text-white hover:bg-white hover:text-black font-display text-[10px] font-black tracking-widest uppercase transition-colors cursor-pointer animate-pulse"
                >
                  Explore Ocular Solutions →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
