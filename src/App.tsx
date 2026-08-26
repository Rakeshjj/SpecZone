import { useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import BrandTicker from "./components/BrandTicker";
import TrustStrip from "./components/TrustStrip";
import ShowroomShowcase from "./components/ShowroomShowcase";
import OpticalsShop from "./components/OpticalsShop";
import SolutionsSection from "./components/SolutionsSection";
import HeritageSection from "./components/HeritageSection";
import AboutUs from "./components/AboutUs";
import LensLab from "./components/LensLab";
import LocationsSection from "./components/LocationsSection";
import BlogSection from "./components/BlogSection";
import HomeEyeCare from "./components/HomeEyeCare";
import FooterSection from "./components/FooterSection";
import SmoothScroll from "./components/SmoothScroll";
import SpiralFrameMatrix from "./components/SpiralFrameMatrix";
// import News from "./components/news";
import { ArrowLeft, Sparkles, ShieldCheck, Home } from "lucide-react";
import BrandsSection from "./components/BrandsSection";

export default function App() {
  const [view, setView] = useState<"home" | "booking">("home");

  // Setup elegant scroll progress bar across the screen top
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleOpenBooking = () => {
    setView("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCloseBooking = () => {
    setView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreSelectService = (serviceName: string) => {
    setView("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Safe window-scrolling callback
  const scrollToSection = (sectionId: string) => {
    if (view !== "home") {
      setView("home");
      // Short delay to allow DOM render before scrolling
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white font-sans selection:bg-brand-blue selection:text-white">
      {/* Top scroll-linked elegant reading progress bar */}
      <motion.div
        id="scroll-progress-indicator"
        className="fixed top-0 left-0 right-0 h-[3px] bg-brand-blue origin-[0%] z-50 shadow-lg shadow-brand-blue/30"
        style={{ scaleX }}
      />

      {/* Primary Sticky Header navigation */}
      <Navbar
        onBookClick={handleOpenBooking}
        onNavigate={scrollToSection}
      />

      {/* Main Container */}
      <main className="relative pt-[88px]">
        <AnimatePresence mode="wait">
          {view === "home" ? (
            <motion.div
              key="home-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              {/* HERO HEADER */}
              <HeroSection onScrollDown={() => scrollToSection("showroom-showcase")} />

              {/* AUTOPLAY BRAND TICKER CAROUSEL */}
              <BrandTicker />

              <SmoothScroll />

               <SpiralFrameMatrix onPreSelectService={handlePreSelectService} />

              {/* SOLUTIONS PORTFOLIO GRID */}
              {/* <SolutionsSection onPreSelectService={handlePreSelectService} /> */}

              <LensLab />
            
              {/* ABOUT US & HERITAGE HISTORICAL STORY (Section 06 of wireframe) */}
              <AboutUs />

              {/* <News /> */}

              {/* TRUST STRIP (Section 03 of wireframe) */}
              <TrustStrip />

              {/* PHYSICAL ATELIER MAPS/GRID */}
              <LocationsSection />

              <ShowroomShowcase />

              {/* BLOG SECTIONS & DIGITAL EYE CARE TIPS (Section 07 of wireframe) */}
              <BlogSection />
            </motion.div>
          ) : (
            <motion.div
              key="booking-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >

              {/* Dedicated Home Eye Care Portal View */}
              <HomeEyeCare onClose={handleCloseBooking} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER & ACTIONS */}
      <FooterSection
        onBookClick={handleOpenBooking}
        onNavigate={scrollToSection}
      />
    </div>
  );
}
