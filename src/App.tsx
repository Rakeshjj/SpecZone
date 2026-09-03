import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import BrandTicker from "./components/BrandTicker";
import TrustStrip from "./components/TrustStrip";
import ShowroomShowcase from "./components/ShowroomShowcase";
import AboutUs from "./components/AboutUs";
import LensLab from "./components/LensLab";
import LocationsSection from "./components/LocationsSection";
import BlogSection from "./components/BlogSection";
import HomeEyeCare from "./components/HomeEyeCare";
import FooterSection from "./components/FooterSection";
import SmoothScroll from "./components/SmoothScroll";
import SpiralFrameMatrix from "./components/SpiralFrameMatrix";
import TrialClassPortal from "./components/TrialClassPortal";

export default function App() {
  const [view, setView] = useState<"home" | "booking" | "trial-form">("trial-form");
  const [selectedServiceType, setSelectedServiceType] = useState<string>("Home Eye Care Check");

  // Setup elegant scroll progress bar across the screen top
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleOpenBooking = (service?: string) => {
    if (service && typeof service === "string") {
      setSelectedServiceType(service);
    }
    setView("booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenTrialForm = () => {
    setView("trial-form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCloseToHome = () => {
    setView("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePreSelectService = (serviceName: string) => {
    if (
      serviceName.toLowerCase().includes("transform") || 
      serviceName.toLowerCase().includes("look") || 
      serviceName.toLowerCase().includes("tyl")
    ) {
      setSelectedServiceType("Transform Look");
    } else {
      setSelectedServiceType("Home Eye Care Check");
    }
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

  if (view === "trial-form") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="trial-class-portal-view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full h-screen max-h-screen overflow-hidden"
        >
          <TrialClassPortal onBackToMain={handleCloseToHome} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white font-sans selection:bg-brand-blue selection:text-white flex flex-col justify-between">
      {/* Top scroll-linked elegant reading progress bar */}
      <motion.div
        id="scroll-progress-indicator"
        className="fixed top-0 left-0 right-0 h-[3px] bg-brand-blue origin-[0%] z-50 shadow-lg shadow-brand-blue/30"
        style={{ scaleX }}
      />

      {/* Primary Sticky Header navigation */}
      <Navbar
        onBookClick={() => handleOpenBooking("Home Eye Care Check")}
        onTrialClassClick={handleOpenTrialForm}
        onNavigate={scrollToSection}
      />

      {/* Main Container */}
      <main className="relative pt-[74px] sm:pt-[78px] flex-1 flex flex-col">
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

              {/* AUTOPLAY BRAND TICKER CAROUSEL (RIGHT UNDER HERO) */}
              <BrandTicker />

              <SmoothScroll />

              <SpiralFrameMatrix onPreSelectService={handlePreSelectService} />

              <LensLab />
            
              {/* ABOUT US & HERITAGE HISTORICAL STORY */}
              <AboutUs />

              {/* TRUST STRIP */}
              <TrustStrip />

              {/* PHYSICAL ATELIER MAPS/GRID */}
              <LocationsSection />

              <ShowroomShowcase />

              {/* BLOG SECTIONS & DIGITAL EYE CARE TIPS */}
              <BlogSection />
            </motion.div>
          ) : (
            <motion.div
              key="booking-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex flex-col justify-start px-3 sm:px-6 md:px-8 pt-1 pb-3"
            >
              {/* Dedicated Home Eye Care Portal View */}
              <HomeEyeCare 
                onClose={handleCloseToHome} 
                initialType={selectedServiceType}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER & ACTIONS */}
      <FooterSection
        onBookClick={() => handleOpenBooking("Home Eye Care Check")}
        onNavigate={scrollToSection}
      />
    </div>
  );
}
