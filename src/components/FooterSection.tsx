import { motion } from "motion/react";
import { Instagram, Mail, Phone, Clock, ArrowRight, Glasses, MapPin, Globe } from "lucide-react";
import logo from "/assets/logo.png";

interface FooterSectionProps {
  onBookClick: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function FooterSection({ onBookClick, onNavigate }: FooterSectionProps) {
  return (
    <footer id="footer" className="bg-zinc-950/60 text-white py-16 px-6 md:px-12 border-t border-white/5 relative overflow-hidden backdrop-blur-md">
      {/* Absolute floating graphics background */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full border border-white/5 bg-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        {/* Left Columns (8/12 grid spacing) */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand info */} 
          <div className="space-y-4 md:col-span-1">
            <button
              id="footer-logo-btn"
              onClick={() => onNavigate("hero")}
              className="focus:outline-none group"
            >
              <img
                src={logo}
                alt="SpecsZone Logo"
                className="h-16 md:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </button>
            <p className="font-sans text-xs text-zinc-400 leading-relaxed font-light">
              Your hometown Curators of Premium Eyewear & Sculptors of Customised Precision lenses. Now gaining Expertise in Audiology!!
            </p>

            {/* Social handles */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                id="social-link-instagram"
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-zinc-900/40 hover:bg-brand-blue/20 text-zinc-400 hover:text-white rounded-full transition-colors border border-white/5 backdrop-blur-sm"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
              <a
                id="social-link-email"
                href="mailto:info@specszone.com"
                className="p-2 bg-zinc-900/40 hover:bg-brand-blue/20 text-zinc-400 hover:text-white rounded-full transition-colors border border-white/5 backdrop-blur-sm"
                aria-label="Email"
              >
                <Mail size={14} />
              </a>
              <a
                id="social-link-phone"
                href="tel:04428200999"
                className="p-2 bg-zinc-900/40 hover:bg-brand-blue/20 text-zinc-400 hover:text-white rounded-full transition-colors border border-white/5 backdrop-blur-sm"
                aria-label="Phone"
              >
                <Phone size={14} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-display text-xs tracking-widest text-zinc-500 uppercase font-bold">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-display font-medium text-zinc-400">
              <li>
                <button
                  id="footer-link-brands"
                  onClick={() => onNavigate("brands")}
                  className="hover:text-brand-blue transition-colors cursor-pointer"
                >
                  BRANDS
                </button>
              </li>
              <li>
                <button
                  id="footer-link-services"
                  onClick={() => onNavigate("solutions")}
                  className="hover:text-brand-blue transition-colors cursor-pointer"
                >
                  OUR SERVICES
                </button>
              </li>
              <li>
                <button
                  id="footer-link-stores"
                  onClick={() => onNavigate("locations")}
                  className="hover:text-brand-blue transition-colors cursor-pointer"
                >
                  STORES
                </button>
              </li>
              <li>
                <button
                  id="footer-link-contact"
                  onClick={() => onNavigate("footer")}
                  className="hover:text-brand-blue transition-colors cursor-pointer"
                >
                  CONTACT US
                </button>
              </li>
            </ul>
          </div>

          {/* Contact coordinates */}
          <div className="space-y-4">
            <h4 className="font-display text-xs tracking-widest text-zinc-500 uppercase font-bold">
              For Contact
            </h4>
            <ul className="space-y-3 text-xs font-sans text-zinc-350">
              <li className="flex items-center gap-2">
                <Phone size={13} className="text-brand-blue shrink-0" />
                <a id="footer-phone-val-link" href="tel:04428200999" className="hover:text-white transition-colors">
                   9840400614
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={13} className="text-brand-blue shrink-0" />
                <a id="footer-email-val-link" href="mailto:info@specszone.com" className="hover:text-white transition-colors">
                  thepectaclezone@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={13} className="text-brand-blue shrink-0 mt-0.5" />
                <span className="font-light">
                  10:30 AM – 8:30 PM <br />
                  Monday to Saturday <br />
                  10:30 AM – 7:30 PM Sunday
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Columns (5/12 grid spacing): Big Lime Box (Exact match with video) */}
        <div id="footer-red-cta-box" className="lg:col-span-5">
          <div className="bg-brand-blue rounded-3xl p-8 md:p-10 text-white flex flex-col justify-between aspect-[16/11] shadow-2xl relative overflow-hidden group">
            {/* Background floating circles for premium design */}
            <div className="absolute top-0 right-0 w-44 h-44 rounded-full border border-black/5 -translate-y-10 translate-x-10 pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-black/5 pointer-events-none" />

            <div className="space-y-6 z-10">
              <span className="font-mono text-[9px] tracking-[0.3em] text-white/80 uppercase font-bold bg-white/15 px-2.5 py-1 rounded-full inline-block">
                [ TAILORED CONSULTATIONS ]
              </span>
              <h3 className="font-serif text-3xl md:text-4xl font-black leading-none uppercase tracking-tighter">
                LET US ENHANCE <br />
                <span className="text-zinc-200 italic font-black">YOUR VISION!</span>
              </h3>
            </div>

            {/* Circular CTA Button (Matches video) */}
            <div className="pt-6 z-10">
              <button
                id="footer-contact-us-circle-btn"
                onClick={onBookClick}
                className="inline-flex items-center gap-2.5 font-display text-xs font-black tracking-widest bg-black hover:bg-white text-white hover:text-black px-6 py-4 rounded-full shadow-xl transition-all hover:gap-4 cursor-pointer focus:outline-none"
              >
                CONTACT US ↗
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Credit & Legal bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] tracking-widest text-zinc-500 uppercase font-display font-semibold">
        <div>
          © 2026 SPECSZONE. ALL RIGHTS RESERVED.
        </div>
        <div className="flex items-center space-x-1">
          <span>By</span>
          <span className="text-zinc-450 font-black">TheDotStudios</span>
        </div>
      </div>
    </footer>
  );
}
