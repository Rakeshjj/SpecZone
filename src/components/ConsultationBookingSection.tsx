import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Sparkles,
  CheckCircle2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ShieldCheck,
  Eye,
  Glasses,
  Cpu,
  ArrowRight,
  RefreshCw
} from "lucide-react";

interface ConsultationBookingSectionProps {
  onSuccessNavigate?: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// STABLE MEMOIZED VIDEO BACKGROUND (Prevents React form typing re-renders)
// ─────────────────────────────────────────────────────────────────────────────
const AtelierVideoBackground = React.memo(
  React.forwardRef<HTMLVideoElement>((_, ref) => {
    return (
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={ref}
          id="eyewear-consultation-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/eyewear-video-poster.jpg"
          className="w-full h-full object-cover object-center lg:object-right"
        >
          <source src="/videos/eyewear-craftsmanship.mp4" type="video/mp4" />
        </video>
      </div>
    );
  })
);
AtelierVideoBackground.displayName = "AtelierVideoBackground";

export default function ConsultationBookingSection({
  onSuccessNavigate,
}: ConsultationBookingSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Progressive autoplay handler with IntersectionObserver
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isMounted = true;

    // Gracefully play as soon as enough data is ready without aggressive resets
    const handleCanPlay = () => {
      if (isMounted && isPlaying && video.paused) {
        video.play().catch(() => {
          // Autoplay policy prevented playback
        });
      }
    };

    video.addEventListener("canplay", handleCanPlay, { once: true });

    // Use IntersectionObserver to pause when off-screen and resume when entering
    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!videoRef.current || !isMounted) return;
            if (entry.isIntersecting) {
              if (isPlaying && videoRef.current.paused) {
                videoRef.current.play().catch(() => {});
              }
            } else {
              if (!videoRef.current.paused) {
                videoRef.current.pause();
              }
            }
          });
        },
        { rootMargin: "200px 0px" }
      );
      observer.observe(video);
    }

    return () => {
      isMounted = false;
      video.removeEventListener("canplay", handleCanPlay);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [isPlaying]);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    service: "Comprehensive Vision & Frame Consultation",
    preferredDate: "",
    preferredTime: "11:00 AM – 12:30 PM",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Get tomorrow's date formatted as YYYY-MM-DD for min date
  const tomorrowString = new Date(Date.now() + 86400000)
    .toISOString()
    .split("T")[0];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg("");
  };

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!formData.phoneNumber.trim() || formData.phoneNumber.length < 8) {
      setErrorMsg("Please enter a valid phone number.");
      return;
    }
    if (!formData.preferredDate) {
      setErrorMsg("Please select your preferred consultation date.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    // Simulate luxury appointment processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: "",
      phoneNumber: "",
      email: "",
      service: "Comprehensive Vision & Frame Consultation",
      preferredDate: "",
      preferredTime: "11:00 AM – 12:30 PM",
    });
  };

  const openWhatsAppConfirmation = () => {
    const text = encodeURIComponent(
      `Hi Spectacal Zone! I have booked an Eyewear Consultation via the website.\n\n` +
        `• Name: ${formData.fullName}\n` +
        `• Phone: ${formData.phoneNumber}\n` +
        `• Email: ${formData.email || "Not provided"}\n` +
        `• Service: ${formData.service}\n` +
        `• Preferred Date: ${formData.preferredDate}\n` +
        `• Preferred Time: ${formData.preferredTime}\n\n` +
        `Looking forward to meeting the master optician!`
    );
    window.open(`https://wa.me/919442009991?text=${text}`, "_blank");
  };

  return (
    <section
      id="consultation-section"
      className="relative w-full my-5 sm:my-7 md:my-8 bg-zinc-950 overflow-hidden flex items-center select-none"
    >
      {/* ========================================================================= */}
      {/* 1. CONTINUOUS VISUAL / VIDEO LAYER (Anchored Right, Bleeds Behind Form)    */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* The video container occupies ~65% on the right on desktop, stretches 100% on mobile/tablet */}
        <AtelierVideoBackground ref={videoRef} />

        {/* ======================================================================= */}
        {/* 2. SEAMLESS DARK GRADIENT OVERLAYS (Unifies Form & Video into ONE Space)*/}
        {/* ======================================================================= */}
        {/* Horizontal Dark Blend: Deep black on the far left, transitioning softly across the video */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/75 via-zinc-950/45 sm:via-zinc-950/35 md:via-zinc-950/20 to-transparent pointer-events-none" />

        {/* Soft edge feathering so the section flows without harsh borders */}
        <div className="absolute top-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-b from-zinc-950 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />

        {/* Ambient Electric Blue Optics Glow behind the booking area */}
        <div className="absolute -left-20 top-1/3 w-80 sm:w-96 h-80 sm:h-96 bg-brand-blue/10 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute right-10 bottom-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* 3. INTEGRATED CONTENT LAYER: FORM ON THE LEFT, SPECS HUD ON THE RIGHT      */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* ─────────────────────────────────────────────────────────────────── */}
          {/* LEFT: PREMIUM DARK GLASSMORPHIC BOOKING FORM (Approx 40-42% Width)  */}
          {/* ─────────────────────────────────────────────────────────────────── */}
          <div className="w-full lg:col-span-5 xl:col-span-5 max-w-xl mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ backgroundColor: "rgba(5, 5, 10, 0.55)" }}
              className="relative p-4 sm:p-5 md:p-6 rounded-2xl backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] ring-1 ring-white/5"
            >
              {/* Electric blue top accent border shimmer */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-brand-blue to-transparent" />

              {/* Form Heading & Subtext */}
              <div className="mb-3 sm:mb-3.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-3 h-3 text-brand-blue animate-pulse" />
                  <span>VIP Ocular Consultation</span>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-white uppercase font-sans leading-tight">
                  Book Your Eyewear Consultation
                </h2>
                <p className="mt-0.5 sm:mt-1 text-xs text-zinc-400 font-light leading-snug">
                  Get expert guidance for frames, lenses and eyewear.
                </p>
              </div>

              {/* Form Body or Success State */}
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <form
                    key="consultation-form"
                    onSubmit={handleSubmit}
                    className="space-y-2 sm:space-y-2.5"
                  >
                    {/* Error Feedback */}
                    {errorMsg && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-3 py-1.5 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        {errorMsg}
                      </motion.div>
                    )}

                    {/* Full Name */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-medium text-zinc-300 mb-0.5 tracking-wide">
                        Full Name <span className="text-brand-blue">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g. Alexander Sterling"
                          className="w-full pl-8 sm:pl-9 pr-3 py-1.5 sm:py-2 bg-zinc-900/80 border border-zinc-800 rounded-xl text-white text-xs sm:text-sm placeholder-zinc-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/50 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-medium text-zinc-300 mb-0.5 tracking-wide">
                        Phone Number <span className="text-brand-blue">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                          <Phone className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="tel"
                          name="phoneNumber"
                          required
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className="w-full pl-8 sm:pl-9 pr-3 py-1.5 sm:py-2 bg-zinc-900/80 border border-zinc-800 rounded-xl text-white text-xs sm:text-sm placeholder-zinc-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/50 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-medium text-zinc-300 mb-0.5 tracking-wide">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="alexander@example.com"
                          className="w-full pl-8 sm:pl-9 pr-3 py-1.5 sm:py-2 bg-zinc-900/80 border border-zinc-800 rounded-xl text-white text-xs sm:text-sm placeholder-zinc-500 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/50 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Select Service */}
                    <div>
                      <label className="block text-[11px] sm:text-xs font-medium text-zinc-300 mb-0.5 tracking-wide">
                        Select Service <span className="text-brand-blue">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full px-3 py-1.5 sm:py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/50 transition-colors cursor-pointer appearance-none"
                        >
                          <option value="Comprehensive Vision & Frame Consultation">
                            Comprehensive Vision & Frame Consultation
                          </option>
                          <option value="Custom Digital Progressive Lenses Fitting">
                            Custom Digital Progressive Lenses Fitting
                          </option>
                          <option value="Blue Light & Computer Strain Optics">
                            Blue Light & Computer Strain Optics
                          </option>
                          <option value="Japanese Beta-Titanium Luxury Frame Styling">
                            Japanese Beta-Titanium Luxury Frame Styling
                          </option>
                          <option value="Polarized High-Index Sunglasses Selection">
                            Polarized High-Index Sunglasses Selection
                          </option>
                          <option value="Home Doorstep Eye Check & 100+ Frame Trial">
                            Home Doorstep Eye Check & 100+ Frame Trial
                          </option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-zinc-400 text-xs">
                          ▼
                        </div>
                      </div>
                    </div>

                    {/* Date & Time Grid (2 Columns on mobile & desktop) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {/* Preferred Date */}
                      <div>
                        <label className="block text-[11px] sm:text-xs font-medium text-zinc-300 mb-0.5 tracking-wide">
                          Preferred Date <span className="text-brand-blue">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                            <Calendar className="w-3.5 h-3.5" />
                          </div>
                          <input
                            type="date"
                            name="preferredDate"
                            required
                            min={tomorrowString}
                            value={formData.preferredDate}
                            onChange={handleInputChange}
                            className="w-full pl-8 sm:pl-9 pr-2.5 py-1.5 sm:py-2 bg-zinc-900/80 border border-zinc-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/50 transition-colors [color-scheme:dark]"
                          />
                        </div>
                      </div>

                      {/* Preferred Time */}
                      <div>
                        <label className="block text-[11px] sm:text-xs font-medium text-zinc-300 mb-0.5 tracking-wide">
                          Preferred Time
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                            <Clock className="w-3.5 h-3.5" />
                          </div>
                          <select
                            name="preferredTime"
                            value={formData.preferredTime}
                            onChange={handleInputChange}
                            className="w-full pl-8 sm:pl-9 pr-6 py-1.5 sm:py-2 bg-zinc-900/90 border border-zinc-800 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/50 transition-colors cursor-pointer appearance-none"
                          >
                            <option value="10:00 AM – 11:30 AM">10:00 AM – 11:30 AM</option>
                            <option value="11:30 AM – 01:00 PM">11:30 AM – 01:00 PM</option>
                            <option value="02:30 PM – 04:00 PM">02:30 PM – 04:00 PM</option>
                            <option value="04:30 PM – 06:00 PM">04:30 PM – 06:00 PM</option>
                            <option value="06:30 PM – 08:00 PM">06:30 PM – 08:00 PM</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-zinc-400 text-xs">
                            ▼
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit CTA Button */}
                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2.5 sm:py-3 px-5 rounded-xl bg-brand-blue hover:bg-blue-500 active:scale-[0.99] text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-brand-blue/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed group"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Confirming Appointment...</span>
                          </>
                        ) : (
                          <>
                            <span>BOOK APPOINTMENT</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Small Trust Badge */}
                    <div className="pt-1 flex items-center justify-center gap-1.5 text-[10px] sm:text-[11px] text-zinc-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Certified Optometrists • Zero Booking Fee • 100% Confidential</span>
                    </div>
                  </form>
                ) : (
                  /* Form Success State */
                  <motion.div
                    key="consultation-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-4 text-center space-y-4"
                  >
                    <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        Appointment Confirmed!
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-sm mx-auto">
                        Thank you, <span className="font-semibold text-white">{formData.fullName}</span>. Your VIP consultation is reserved for{" "}
                        <span className="text-brand-blue font-medium">{formData.preferredDate}</span> ({formData.preferredTime}).
                      </p>
                      <p className="text-[11px] text-zinc-400 mt-2">
                        Our master optician will review your prescription requirements and contact you at {formData.phoneNumber}.
                      </p>
                    </div>

                    <div className="space-y-2 pt-2">
                      <button
                        type="button"
                        onClick={openWhatsAppConfirmation}
                        className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Send Booking to WhatsApp</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs transition-colors cursor-pointer"
                      >
                        Book Another Appointment
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ─────────────────────────────────────────────────────────────────── */}
          {/* RIGHT: SPECS / FRAMES VIDEO HUD & TECHNICAL CRAFT OVERLAY (~60%)   */}
          {/* ─────────────────────────────────────────────────────────────────── */}
          <div className="w-full lg:col-span-7 xl:col-span-7 flex flex-col justify-between h-full min-h-0 lg:min-h-[400px] pointer-events-auto">
            
            {/* Top Video HUD Status Bar */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-between gap-3 py-2 px-3 sm:py-2.5 sm:px-3.5 rounded-xl bg-zinc-950/60 backdrop-blur-md border border-white/10 max-w-lg lg:ml-auto"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                  Atelier Craftsmanship • Live Feed
                </span>
              </div>

              {/* Video Playback & Sound Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  id="btn-consultation-video-play"
                  type="button"
                  onClick={handleTogglePlay}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="p-1 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer border border-white/5"
                >
                  {isPlaying ? (
                    <Pause className="w-3.5 h-3.5" />
                  ) : (
                    <Play className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  id="btn-consultation-video-mute"
                  type="button"
                  onClick={handleToggleMute}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  className="p-1 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer border border-white/5"
                >
                  {isMuted ? (
                    <VolumeX className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Bottom Floating Optical Specs / Blueprint Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-4 lg:mt-auto space-y-2 sm:space-y-2.5 max-w-xl lg:ml-auto"
            >
              {/* Technical Specifications Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
                
                {/* Spec 1 */}
                <div className="p-2 sm:p-2.5 rounded-xl bg-zinc-950/70 backdrop-blur-md border border-white/10 flex items-start gap-2">
                  <div className="p-1.5 rounded-lg bg-brand-blue/15 text-brand-blue shrink-0">
                    <Glasses className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                      Frame Tech
                    </h4>
                    <p className="text-[11px] sm:text-xs font-semibold text-white mt-0.5">
                      Beta-Titanium 0.6mm
                    </p>
                  </div>
                </div>

                {/* Spec 2 */}
                <div className="p-2 sm:p-2.5 rounded-xl bg-zinc-950/70 backdrop-blur-md border border-white/10 flex items-start gap-2">
                  <div className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-400 shrink-0">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                      Lens Optics
                    </h4>
                    <p className="text-[11px] sm:text-xs font-semibold text-white mt-0.5">
                      UV420 Blue-Shield
                    </p>
                  </div>
                </div>

                {/* Spec 3 */}
                <div className="p-2 sm:p-2.5 rounded-xl bg-zinc-950/70 backdrop-blur-md border border-white/10 flex items-start gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-500/15 text-indigo-400 shrink-0">
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                      Precision
                    </h4>
                    <p className="text-[11px] sm:text-xs font-semibold text-white mt-0.5">
                      Sub-Micron Laser Cut
                    </p>
                  </div>
                </div>
              </div>

              {/* Atelier Note Ribbon */}
              <div className="px-3 py-2 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-brand-blue/20 flex items-center justify-between text-xs text-zinc-300">
                <span className="font-mono text-[10px] text-zinc-400">
                  REF: SPEC-FRAME-CRAFT-2026
                </span>
                <span className="text-brand-blue font-semibold text-[10px] sm:text-[11px] tracking-wide">
                  100% IN-HOUSE OPTICAL LAB
                </span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
