import { useEffect } from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Eye, 
  AlertCircle, 
  Stethoscope, 
  Glasses, 
  ArrowUpRight,
  BookOpen
} from "lucide-react";
import { Article } from "../types";

interface ArticleDetailViewProps {
  article: Article;
  onBack: () => void;
  onBookConsultation?: (serviceName?: string) => void;
}

export default function ArticleDetailView({
  article,
  onBack,
  onBookConsultation
}: ArticleDetailViewProps) {
  // Ensure top scroll when article opens
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [article]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.summary,
          url: window.location.href,
        });
      } catch {
        // User dismissed or share failed silently
      }
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert("Article link copied to clipboard!");
    }
  };

  // Split title if it contains parenthesis like "Hyperopia (Long-sightedness)"
  const titleMatch = article.title.match(/^(.*?)(?:\s*\((.*?)\))?$/);
  const mainTitle = titleMatch && titleMatch[1] ? titleMatch[1].trim() : article.title;
  const subtitleFromTitle = titleMatch && titleMatch[2] ? titleMatch[2].trim() : null;
  const displaySubtitle = article.subtitle || subtitleFromTitle;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-brand-blue selection:text-white pb-24"
    >
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-brand-blue/10 rounded-full blur-[160px]" />
        <div className="absolute top-96 right-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Top Sticky Navigation Bar */}
      <div className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-brand-blue/60 text-zinc-300 hover:text-white transition-all font-mono text-xs uppercase tracking-wider cursor-pointer active:scale-95"
            aria-label="Back to articles"
          >
            <ArrowLeft className="w-4 h-4 text-brand-blue group-hover:-translate-x-1 transition-transform" />
            <span>Back to Articles</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
            <span>Articles</span>
            <span className="text-zinc-600">/</span>
            <span className="text-brand-blue truncate max-w-[220px]">{article.category}</span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white transition-colors font-mono text-xs cursor-pointer"
            title="Share article"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Article Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-8 sm:pt-12 space-y-8 sm:space-y-10">
        
        {/* Article Header */}
        <header className="space-y-4 sm:space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/15 border border-brand-blue/30 text-brand-blue font-mono text-[10px] sm:text-xs tracking-widest uppercase font-semibold">
              <Sparkles className="w-3 h-3" />
              {article.category}
            </span>
            <span className="text-zinc-500 font-mono text-xs flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
            <span className="text-zinc-500 font-mono text-xs flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[1.05]">
              {mainTitle}
            </h1>
            {displaySubtitle && (
              <p className="font-serif text-lg sm:text-2xl md:text-3xl italic text-zinc-400 font-normal tracking-wide mt-1.5 sm:mt-2">
                {displaySubtitle}
              </p>
            )}
          </div>

          <p className="text-zinc-300 font-sans text-sm sm:text-base md:text-lg leading-relaxed font-light border-l-2 border-brand-blue/60 pl-4 py-0.5">
            {article.summary}
          </p>
        </header>

        {/* Featured High-Resolution Image */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-zinc-900 shadow-2xl group">
          <div className="aspect-[16/9] w-full max-h-[440px] overflow-hidden">
            <img
              src={article.thumbnail}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-black/20 pointer-events-none" />
          
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 flex items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-black/80 border border-white/20 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-semibold text-[11px] sm:text-xs tracking-tight font-mono">
                Clinical Diagnostic Reference
              </span>
            </div>
          </div>
        </div>

        {/* MYOPIA CLINICAL SECTIONS (Specified in User Prompt) */}
        {article.clinicalDetails && (
          <section className="space-y-6 sm:space-y-8 pt-2">
            
            {/* DEFINITION CARD */}
            <div className="rounded-2xl sm:rounded-3xl bg-[#131318]/90 border border-white/15 p-6 sm:p-8 backdrop-blur-md shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-blue" />
              
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-brand-blue" />
                <h2 className="font-mono text-xs sm:text-sm uppercase tracking-widest text-brand-blue font-bold">
                  Definition
                </h2>
              </div>
              
              <p className="font-sans text-base sm:text-xl text-white font-medium leading-relaxed">
                {article.clinicalDetails.definition}
              </p>
            </div>

            {/* 3 CORE MEDICAL PILLARS: CAUSE, SYMPTOMS, TREATMENT */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              
              {/* CAUSE CARD */}
              <div className="rounded-2xl bg-[#131318]/80 border border-white/10 hover:border-white/20 p-5 sm:p-6 backdrop-blur-sm shadow-lg flex flex-col justify-start transition-all">
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-brand-blue shrink-0">
                    <Eye className="w-4 h-4" />
                  </div>
                  <h3 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-white font-bold">
                    Cause
                  </h3>
                </div>

                <ul className="space-y-3 font-sans text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
                  {article.clinicalDetails.causes.map((cause, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-brand-blue font-bold text-base leading-none mt-0.5">•</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SYMPTOMS CARD */}
              <div className="rounded-2xl bg-[#131318]/80 border border-white/10 hover:border-white/20 p-5 sm:p-6 backdrop-blur-sm shadow-lg flex flex-col justify-start transition-all">
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <h3 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-white font-bold">
                    Symptoms
                  </h3>
                </div>

                <ul className="space-y-3 font-sans text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
                  {article.clinicalDetails.symptoms.map((symptom, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold text-base leading-none mt-0.5">•</span>
                      <span>{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* TREATMENT CARD */}
              <div className="rounded-2xl bg-[#131318]/80 border border-white/10 hover:border-white/20 p-5 sm:p-6 backdrop-blur-sm shadow-lg flex flex-col justify-start transition-all">
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h3 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-white font-bold">
                    Treatment
                  </h3>
                </div>

                <ul className="space-y-3 font-sans text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
                  {article.clinicalDetails.treatments.map((treatment, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold text-base leading-none mt-0.5">•</span>
                      <span>{treatment}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Optional Clinical Note (e.g. Age onset) */}
            {article.clinicalDetails.note && (
              <div className="p-4 rounded-2xl bg-brand-blue/[0.06] border border-brand-blue/20 flex items-start gap-3">
                <Clock className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                <p className="font-sans text-xs sm:text-sm text-zinc-200 font-light leading-relaxed">
                  <span className="font-semibold text-brand-blue">Clinical Progression Note: </span>
                  {article.clinicalDetails.note}
                </p>
              </div>
            )}

            {/* Optional Prescription Example */}
            {article.clinicalDetails.example && (
              <div className="p-4 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/20 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="font-sans text-xs sm:text-sm text-zinc-200 font-light leading-relaxed">
                  <span className="font-semibold text-emerald-400">Clinical Prescription Example: </span>
                  <span className="font-mono font-medium text-emerald-300">{article.clinicalDetails.example}</span>
                </p>
              </div>
            )}
          </section>
        )}

        {/* Narrative Article Paragraphs */}
        {article.content && article.content.length > 0 && (
          <div className="space-y-5 pt-4">
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <BookOpen className="w-4 h-4 text-brand-blue" />
              <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold">
                Clinical Discussion & Optical Mechanism
              </h3>
            </div>
            
            <div className="space-y-4 font-sans text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
              {article.content.map((paragraph, index) => (
                <p 
                  key={index}
                  className="first-letter:text-2xl first-letter:font-serif first-letter:font-bold first-letter:text-brand-blue first-letter:mr-1"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Professional Consultation Call-To-Action Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#161926] to-[#0f111a] border border-brand-blue/30 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/20 text-brand-blue font-mono text-[10px] uppercase font-bold tracking-wider">
                <ShieldCheck className="w-3 h-3" />
                Comprehensive Refraction
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight">
                Suspect {mainTitle} or Experiencing Focus Strain?
              </h4>
              <p className="font-sans text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Our certified master optometrists provide precision 14-step clinical refraction, corneal wave analysis, and personalized corrective lenses. Book in-store or schedule a doorstep Home Eye Check.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
              {onBookConsultation && (
                <button
                  type="button"
                  onClick={() => onBookConsultation(`${mainTitle} Assessment & Consultation`)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-blue text-white hover:bg-blue-500 font-sans text-xs sm:text-sm font-semibold tracking-wide shadow-lg shadow-brand-blue/30 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Book Eye Checkup</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Return Action */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/15 hover:border-brand-blue text-zinc-300 hover:text-white transition-all font-mono text-xs uppercase tracking-wider cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-brand-blue group-hover:-translate-x-1 transition-transform" />
            <span>← Back to Articles</span>
          </button>

          <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider">
            Spectacal Zone Clinical Depository
          </span>
        </div>

      </div>
    </motion.article>
  );
}
