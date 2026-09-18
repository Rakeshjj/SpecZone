import { useEffect } from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Eye, 
  AlertCircle, 
  Stethoscope, 
  Glasses, 
  ArrowUpRight,
  Activity,
  Layers,
  AlertTriangle
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
      <div className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-2.5 sm:py-3 transition-all">
        <div className="max-w-4xl mx-auto flex items-center justify-start">
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 hover:border-brand-blue/60 text-zinc-300 hover:text-white transition-all font-mono text-xs uppercase tracking-wider cursor-pointer active:scale-95"
            aria-label="Back to articles"
          >
            <ArrowLeft className="w-4 h-4 text-brand-blue group-hover:-translate-x-1 transition-transform" />
            <span>Back to Articles</span>
          </button>
        </div>
      </div>

      {/* Article Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-3 sm:pt-5 space-y-5 sm:space-y-6">
        
        {/* Article Header */}
        <header>
          {/* Title & Subtitle */}
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-snug">
              {mainTitle}
            </h1>
            {displaySubtitle && (
              <p className="font-serif text-sm sm:text-base md:text-lg italic text-zinc-400 font-normal tracking-wide mt-1">
                {displaySubtitle}
              </p>
            )}
          </div>
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

            {/* EMERGENCY ALERT (e.g. Acute Angle-Closure Glaucoma) */}
            {article.clinicalDetails.emergencyAlert && (
              <div className="p-4 sm:p-5 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-3.5 backdrop-blur-md">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-red-400 mb-1">
                    Ophthalmic Emergency
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-red-200 leading-relaxed font-medium">
                    {article.clinicalDetails.emergencyAlert}
                  </p>
                </div>
              </div>
            )}

            {/* PATHOPHYSIOLOGY MECHANISM */}
            {article.clinicalDetails.mechanism && (
              <div className="rounded-2xl bg-[#131318]/90 border border-blue-500/20 p-5 sm:p-6 backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-2 h-2 rounded-full bg-brand-blue" />
                  <h3 className="font-mono text-xs uppercase tracking-wider text-brand-blue font-bold">
                    Aqueous Humor Drainage Mechanism
                  </h3>
                </div>
                <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                  {article.clinicalDetails.mechanism}
                </p>
              </div>
            )}

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

                {article.clinicalDetails.riskFactors && article.clinicalDetails.riskFactors.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-amber-400 font-bold block">
                      Risk Factors:
                    </span>
                    <ul className="space-y-1.5 font-sans text-xs text-zinc-300">
                      {article.clinicalDetails.riskFactors.map((rf, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{rf}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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

            {/* CLINICAL NOTE CALLOUT */}
            {article.clinicalDetails.note && (
              <div className="p-4 rounded-xl bg-blue-500/[0.08] border border-brand-blue/30 flex items-start gap-3 backdrop-blur-sm">
                <AlertCircle className="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
                <p className="font-sans text-xs sm:text-sm text-blue-200 leading-relaxed font-medium">
                  <span className="font-bold text-brand-blue uppercase tracking-wide font-mono text-[11px] block sm:inline mr-2">Important Clinical Note:</span>
                  {article.clinicalDetails.note}
                </p>
              </div>
            )}

            {/* TYPES AND STAGES OF DISEASE (e.g. Diabetic Retinopathy NPDR, PDR, DME) */}
            {article.clinicalDetails.stages && article.clinicalDetails.stages.length > 0 && (
              <div className="rounded-2xl bg-[#131318]/80 border border-white/10 p-5 sm:p-6 backdrop-blur-sm shadow-lg space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-white font-bold">
                    Types & Stages of Diabetic Retinopathy
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {article.clinicalDetails.stages.map((stg, idx) => (
                    <div 
                      key={idx} 
                      className={`p-4 rounded-xl border flex flex-col justify-between ${
                        stg.stage.includes("Proliferative") 
                          ? "bg-red-500/[0.04] border-red-500/25" 
                          : stg.stage.includes("Macular") 
                          ? "bg-amber-500/[0.04] border-amber-500/25 md:col-span-2" 
                          : "bg-white/[0.02] border-white/10"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                          <span className="font-mono text-xs font-bold text-white tracking-wide">
                            {stg.stage}
                          </span>
                          {stg.category && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                              {stg.category}
                            </span>
                          )}
                        </div>

                        {stg.description && (
                          <p className="font-sans text-xs text-zinc-300 leading-relaxed font-light mb-2.5">
                            {stg.description}
                          </p>
                        )}

                        {stg.features && (
                          <ul className="space-y-1 text-xs text-zinc-300">
                            {stg.features.map((f, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-purple-400 font-bold">•</span>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {stg.complications && (
                          <div className="mt-2.5 pt-2 border-t border-white/10">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-red-400 font-bold block mb-1">
                              Complications:
                            </span>
                            <ul className="space-y-1 text-xs text-red-200/90">
                              {stg.complications.map((comp, i) => (
                                <li key={i} className="flex items-start gap-1.5">
                                  <span className="text-red-400 font-bold">•</span>
                                  <span>{comp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CLINICAL SIGNS */}
            {article.clinicalDetails.clinicalSigns && article.clinicalDetails.clinicalSigns.length > 0 && (
              <div className="rounded-2xl bg-[#131318]/80 border border-white/10 p-5 sm:p-6 backdrop-blur-sm shadow-lg">
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <h3 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-white font-bold">
                    Clinical Signs
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
                  {article.clinicalDetails.clinicalSigns.map((sign, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                      <span>{sign}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CLINICAL SIGNS SUBSECTIONS (e.g. Anterior & Posterior Blepharitis Signs) */}
            {article.clinicalDetails.clinicalSignsSubsections && article.clinicalDetails.clinicalSignsSubsections.length > 0 && (
              <div className="rounded-2xl bg-[#131318]/80 border border-white/10 p-5 sm:p-6 backdrop-blur-sm shadow-lg space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <h3 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-white font-bold">
                    Biomicroscopy & Clinical Examination Findings
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {article.clinicalDetails.clinicalSignsSubsections.map((sub, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="border-b border-white/5 pb-2">
                        <span className="font-mono text-xs font-bold text-brand-blue tracking-wide uppercase">
                          {sub.title}
                        </span>
                      </div>
                      <ul className="space-y-2 text-xs sm:text-[13px] text-zinc-300">
                        {sub.signs.map((sign, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <span className="text-purple-400 font-bold">•</span>
                            <span>{sign}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CLINICAL SIGNS TABLE (SIGN | MEANING) */}
            {article.clinicalDetails.clinicalSignsTable && article.clinicalDetails.clinicalSignsTable.length > 0 && (
              <div className="rounded-2xl bg-[#131318]/80 border border-white/10 p-5 sm:p-6 backdrop-blur-sm shadow-lg space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-white font-bold">
                      Clinical Signs & Diagnostic Meaning
                    </h3>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full text-left font-sans text-xs sm:text-[13px]">
                    <thead className="bg-white/[0.05] border-b border-white/10 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                      <tr>
                        <th className="py-3 px-4 sm:px-6 font-semibold w-1/3 text-purple-400">Sign</th>
                        <th className="py-3 px-4 sm:px-6 font-semibold">Meaning</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {article.clinicalDetails.clinicalSignsTable.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-medium text-white whitespace-nowrap">
                            {row.sign}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-zinc-300 font-light leading-relaxed">
                            {row.meaning}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* CLINICAL INVESTIGATIONS */}
            {article.clinicalDetails.investigations && article.clinicalDetails.investigations.length > 0 && (
              <div className="rounded-2xl bg-[#131318]/80 border border-white/10 p-5 sm:p-6 backdrop-blur-sm shadow-lg space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <h3 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-white font-bold">
                    Important Investigations
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 font-sans text-xs sm:text-[13px] text-zinc-300 leading-relaxed">
                  {article.clinicalDetails.investigations.map((inv, idx) => {
                    const [title, ...rest] = inv.split(":");
                    return (
                      <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between">
                        <span className="font-mono text-xs font-semibold text-cyan-400 mb-1">{title}</span>
                        {rest.length > 0 && (
                          <span className="text-zinc-400 text-xs font-light">{rest.join(":").trim()}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* INVESTIGATIONS TABLE (TEST | DIAGNOSTIC PURPOSE) */}
            {article.clinicalDetails.investigationsTable && article.clinicalDetails.investigationsTable.length > 0 && (
              <div className="rounded-2xl bg-[#131318]/80 border border-cyan-500/20 p-5 sm:p-6 backdrop-blur-sm shadow-lg space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-white font-bold">
                      Clinical Diagnostic Investigations
                    </h3>
                    <p className="text-xs text-zinc-400 font-light">Comprehensive ocular surface & tear film evaluation</p>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full text-left font-sans text-xs sm:text-[13px]">
                    <thead className="bg-white/[0.05] border-b border-white/10 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                      <tr>
                        <th className="py-3 px-4 sm:px-6 font-semibold w-1/3 text-cyan-400">Test</th>
                        <th className="py-3 px-4 sm:px-6 font-semibold">Diagnostic Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {article.clinicalDetails.investigationsTable.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-medium text-white whitespace-nowrap">
                            {row.test}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-zinc-300 font-light leading-relaxed">
                            {row.purpose}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TYPES TABLE */}
            {article.clinicalDetails.typesTable && article.clinicalDetails.typesTable.length > 0 && (
              <div className="rounded-2xl bg-[#131318]/80 border border-white/10 p-5 sm:p-6 backdrop-blur-sm shadow-lg space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-brand-blue shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-white font-bold">
                      Types & Classification
                    </h3>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full text-left font-sans text-xs sm:text-[13px]">
                    <thead className="bg-white/[0.05] border-b border-white/10 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                      <tr>
                        <th className="py-3 px-4 sm:px-6 font-semibold w-1/3 text-brand-blue">Type</th>
                        <th className="py-3 px-4 sm:px-6 font-semibold">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {article.clinicalDetails.typesTable.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-medium text-white whitespace-nowrap">
                            {row.type}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-zinc-300 font-light leading-relaxed">
                            {row.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* MEDICATIONS TABLE */}
            {article.clinicalDetails.medicationsTable && article.clinicalDetails.medicationsTable.length > 0 && (
              <div className="rounded-2xl bg-[#131318]/80 border border-white/10 p-5 sm:p-6 backdrop-blur-sm shadow-lg space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-white font-bold">
                      Eye Drops (Topical Hypotensive Medications)
                    </h3>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full text-left font-sans text-xs sm:text-[13px]">
                    <thead className="bg-white/[0.05] border-b border-white/10 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                      <tr>
                        <th className="py-3 px-4 sm:px-6 font-semibold w-1/3 text-emerald-400">Medication</th>
                        <th className="py-3 px-4 sm:px-6 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {article.clinicalDetails.medicationsTable.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-medium text-white whitespace-nowrap">
                            {row.medication}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-zinc-300 font-light leading-relaxed">
                            {row.action}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SYSTEMIC MANAGEMENT */}
            {article.clinicalDetails.systemicManagement && article.clinicalDetails.systemicManagement.length > 0 && (
              <div className="rounded-2xl bg-[#131318]/80 border border-white/10 p-5 sm:p-6 backdrop-blur-sm shadow-lg space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-white font-bold">
                      Systemic Disease Management
                    </h3>
                    <p className="text-xs text-zinc-400 font-light">Essential holistic control of diabetes and vascular risk factors</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs sm:text-[13px] text-zinc-300">
                  {article.clinicalDetails.systemicManagement.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`p-3.5 rounded-xl border flex items-start gap-2.5 ${
                        item.includes("Important") 
                          ? "bg-amber-500/[0.05] border-amber-500/30 sm:col-span-2 text-amber-200" 
                          : "bg-white/[0.02] border-white/5"
                      }`}
                    >
                      <span className={`font-bold mt-0.5 ${item.includes("Important") ? "text-amber-400" : "text-emerald-400"}`}>•</span>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* INTRAVITREAL INJECTIONS */}
            {article.clinicalDetails.injections && (
              <div className="rounded-2xl bg-[#131318]/80 border border-cyan-500/20 p-5 sm:p-6 backdrop-blur-sm shadow-lg space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-cyan-400 font-bold">
                      {article.clinicalDetails.injections.category}
                    </h3>
                    <p className="text-xs text-zinc-400 font-light">Indicated for Diabetic Macular Edema (DME) & Selected Proliferative Disease</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-zinc-400 block mb-2">
                      Common Anti-VEGF Agents:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {article.clinicalDetails.injections.medications.map((med, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs text-cyan-300 font-medium">
                          {med}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-[13px] text-zinc-300 leading-relaxed font-light p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-white font-medium">Action: </span>
                    {article.clinicalDetails.injections.action}
                  </p>
                </div>
              </div>
            )}

            {/* LASER & SURGICAL MODALITIES */}
            {(article.clinicalDetails.laserTreatments || article.clinicalDetails.surgicalTreatments) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {article.clinicalDetails.laserTreatments && (
                  <div className="rounded-2xl bg-[#131318]/80 border border-white/10 p-5 sm:p-6 backdrop-blur-sm shadow-lg space-y-3">
                    <h4 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-brand-blue font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-blue" />
                      Laser Treatment
                    </h4>
                    <ul className="space-y-2.5 font-sans text-xs sm:text-[13px] text-zinc-300">
                      {article.clinicalDetails.laserTreatments.map((lt, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-brand-blue font-bold">•</span>
                          <span>{lt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {article.clinicalDetails.surgicalTreatments && (
                  <div className="rounded-2xl bg-[#131318]/80 border border-white/10 p-5 sm:p-6 backdrop-blur-sm shadow-lg space-y-3">
                    <h4 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-purple-400 font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      Surgery
                    </h4>
                    <p className="font-sans text-xs text-zinc-400 italic">If medication and laser treatment are insufficient:</p>
                    <ul className="space-y-2.5 font-sans text-xs sm:text-[13px] text-zinc-300">
                      {article.clinicalDetails.surgicalTreatments.map((st, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-purple-400 font-bold">•</span>
                          <span>{st}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* TREATMENT PROTOCOL BREAKDOWN */}
            {(article.clinicalDetails.earlyStageTreatment || 
              article.clinicalDetails.lifestyleChanges || 
              article.clinicalDetails.mgdTreatment || 
              article.clinicalDetails.prescriptionTreatment || 
              article.clinicalDetails.advancedTreatment) && (
              <div className="rounded-2xl bg-[#131318]/80 border border-white/10 p-5 sm:p-6 backdrop-blur-sm shadow-lg space-y-6">
                <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h3 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-white font-bold">
                    Treatment Protocol
                  </h3>
                </div>

                {/* ARTIFICIAL TEARS / EARLY STAGE */}
                {article.clinicalDetails.earlyStageTreatment && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs uppercase tracking-wider font-semibold text-emerald-400">
                        {article.title.toLowerCase().includes("dry eye") ? "A. Artificial Tears (First-Line Lubrication)" : "Early Stage"}
                      </span>
                      <span className="text-zinc-400 text-xs font-sans">
                        {article.title.toLowerCase().includes("dry eye") ? "(First-line therapy for tear film replacement)" : "(If the cataract is mild)"}
                      </span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-sans text-xs sm:text-[13px] text-zinc-300">
                      {article.clinicalDetails.earlyStageTreatment.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* LIFESTYLE & ENVIRONMENTAL CHANGES */}
                {article.clinicalDetails.lifestyleChanges && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs uppercase tracking-wider font-semibold text-cyan-400">
                        B. Lifestyle & Environmental Modifications
                      </span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-sans text-xs sm:text-[13px] text-zinc-300">
                      {article.clinicalDetails.lifestyleChanges.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* MGD TREATMENT */}
                {article.clinicalDetails.mgdTreatment && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs uppercase tracking-wider font-semibold text-amber-400">
                        C. Meibomian Gland Dysfunction (MGD) Protocol
                      </span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-sans text-xs sm:text-[13px] text-zinc-300">
                      {article.clinicalDetails.mgdTreatment.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* PRESCRIPTION TREATMENT */}
                {article.clinicalDetails.prescriptionTreatment && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs uppercase tracking-wider font-semibold text-purple-400">
                        D. Prescription Anti-Inflammatory & Interventional Care
                      </span>
                      <span className="text-zinc-400 text-xs font-sans">(Prescribed by ophthalmologist/optometrist)</span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-sans text-xs sm:text-[13px] text-zinc-300">
                      {article.clinicalDetails.prescriptionTreatment.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                          <span className="text-purple-400 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* SUBTYPE-SPECIFIC TREATMENTS (Viral, Bacterial, Allergic Conjunctivitis) */}
                {article.clinicalDetails.treatmentSubtypes && article.clinicalDetails.treatmentSubtypes.length > 0 && (
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs uppercase tracking-wider font-semibold text-white">
                        Etiology-Specific Treatment Protocols
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {article.clinicalDetails.treatmentSubtypes.map((sub, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                          <div>
                            <h4 className="font-mono text-xs font-bold uppercase tracking-wide text-brand-blue mb-1">
                              {sub.category}
                            </h4>
                            {sub.description && (
                              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                                {sub.description}
                              </p>
                            )}
                          </div>

                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans text-xs sm:text-[13px] text-zinc-300">
                            {sub.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-2 p-2 rounded-lg bg-black/20 border border-white/5">
                                <span className="text-brand-blue font-bold">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>

                          {sub.note && (
                            <div className="p-2.5 rounded-lg bg-amber-500/[0.08] border border-amber-500/25 flex items-start gap-2">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                              <p className="text-[12px] text-amber-200 font-medium">
                                <span className="font-bold font-mono text-[11px] text-amber-400 mr-1">Note:</span>
                                {sub.note}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {article.clinicalDetails.treatmentWarning && (
                  <div className="p-3.5 sm:p-4 rounded-xl bg-amber-500/[0.08] border border-amber-500/30 flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="font-sans text-xs sm:text-sm text-amber-200 leading-relaxed font-medium">
                      <span className="font-bold text-amber-400 uppercase tracking-wide font-mono text-[11px] block sm:inline mr-2">Important:</span>
                      {article.clinicalDetails.treatmentWarning}
                    </p>
                  </div>
                )}

                {article.clinicalDetails.advancedTreatment && (
                  <div className="p-4 rounded-xl bg-blue-500/[0.06] border border-brand-blue/20 flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider font-semibold text-brand-blue block mb-1">Advanced Treatment</span>
                      <p className="font-sans text-sm sm:text-base font-semibold text-white">
                        {article.clinicalDetails.advancedTreatment}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onBookConsultation?.("Clinical Assessment & Referral")}
                      className="px-4 py-2 rounded-full bg-brand-blue hover:bg-brand-blue/90 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
                    >
                      Book Evaluation
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* FIRST AID PROTOCOLS (For Eye Injuries) */}
            {article.clinicalDetails.firstAid && article.clinicalDetails.firstAid.length > 0 && (
              <div className="rounded-2xl bg-gradient-to-br from-[#1b1511] to-[#121217] border border-amber-500/30 p-5 sm:p-7 backdrop-blur-md shadow-xl space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-amber-500/20">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-mono text-sm sm:text-base uppercase tracking-wider text-amber-300 font-bold">
                      Emergency First Aid Protocols
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 font-light mt-0.5">
                      Immediate triage, emergency procedures, and vital precautions before hospital ophthalmic evaluation.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {article.clinicalDetails.firstAid.map((fa, idx) => (
                    <div 
                      key={idx} 
                      className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
                        fa.emergency 
                          ? "bg-red-500/[0.06] border-red-500/30" 
                          : "bg-black/30 border-white/10"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                            {fa.situation}
                          </h4>
                          {fa.emergency && (
                            <span className="font-mono text-[9px] uppercase px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 font-bold border border-red-500/30">
                              Urgent
                            </span>
                          )}
                        </div>
                        <ul className="space-y-1.5 text-xs text-zinc-300 font-sans">
                          {fa.steps.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-1.5">
                              <span className={fa.emergency ? "text-red-400 font-bold" : "text-amber-400 font-bold"}>•</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {fa.warning && (
                        <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/25 text-[11px] text-red-200 font-medium">
                          <span className="font-bold uppercase text-[10px] text-red-400 block mb-0.5">Action Alert:</span>
                          {fa.warning}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* INJURY TREATMENT TABLE */}
            {article.clinicalDetails.injuryTreatmentTable && article.clinicalDetails.injuryTreatmentTable.length > 0 && (
              <div className="rounded-2xl bg-[#131318]/80 border border-white/10 p-5 sm:p-6 backdrop-blur-sm shadow-lg space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-white font-bold">
                    Treatment by Injury Classification
                  </h3>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full text-left font-sans text-xs sm:text-[13px]">
                    <thead className="bg-white/[0.05] border-b border-white/10 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                      <tr>
                        <th className="py-3 px-4 sm:px-6 font-semibold w-1/3 text-emerald-400">Injury</th>
                        <th className="py-3 px-4 sm:px-6 font-semibold">Treatment Protocol</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {article.clinicalDetails.injuryTreatmentTable.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-medium text-white whitespace-nowrap">
                            {row.injury}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-zinc-300 font-light leading-relaxed">
                            {row.treatment}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* SECONDARY CLINICAL CONDITION: SUBCONJUNCTIVAL HEMORRHAGE */}
            {article.clinicalDetails.secondaryCondition && (
              <div className="rounded-2xl bg-gradient-to-br from-[#1b1418] to-[#121217] border border-red-500/30 p-5 sm:p-7 backdrop-blur-md shadow-xl space-y-5">
                <div className="flex items-center gap-3 pb-3 border-b border-red-500/20">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-mono text-sm sm:text-base uppercase tracking-wider text-red-300 font-bold">
                      {article.clinicalDetails.secondaryCondition.title}
                    </h3>
                    {article.clinicalDetails.secondaryCondition.definition && (
                      <p className="text-xs sm:text-sm text-zinc-300 font-light mt-0.5">
                        {article.clinicalDetails.secondaryCondition.definition}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* CAUSES */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2.5">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-red-400 font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      Causes & Triggers
                    </h4>
                    <ul className="space-y-1.5 text-xs text-zinc-300 font-sans">
                      {article.clinicalDetails.secondaryCondition.causes.map((c, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-red-400 font-bold">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* SYMPTOMS */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2.5">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      Symptoms & Presentation
                    </h4>
                    <ul className="space-y-1.5 text-xs text-zinc-300 font-sans">
                      {article.clinicalDetails.secondaryCondition.symptoms.map((s, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* TREATMENT */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2.5">
                    <h4 className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Clinical Management
                    </h4>
                    <ul className="space-y-1.5 text-xs text-zinc-300 font-sans">
                      {article.clinicalDetails.secondaryCondition.treatments.map((t, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {article.clinicalDetails.secondaryCondition.note && (
                  <div className="p-3.5 rounded-xl bg-red-500/[0.08] border border-red-500/25 flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-[13px] text-red-200 font-medium leading-relaxed">
                      <span className="font-bold font-mono text-xs text-red-400 mr-1.5 uppercase">Clinical Alert:</span>
                      {article.clinicalDetails.secondaryCondition.note}
                    </p>
                  </div>
                )}
              </div>
            )}

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

      </div>
    </motion.article>
  );
}
