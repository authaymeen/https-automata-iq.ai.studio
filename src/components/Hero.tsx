import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, PlayCircle, Calculator, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Glowing Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold mb-8 backdrop-blur-md shadow-lg shadow-cyan-500/5 hover:border-cyan-400/60 transition-all cursor-default"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span>⚡ Automata IQ — شريكك التقني لأتمتة العمليات وهندسة الذكاء الاصطناعي</span>
        </motion.div>

        {/* Main Catchy Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white font-heading leading-tight sm:leading-tight lg:leading-tight max-w-5xl mx-auto mb-6"
        >
          نحوّل عملياتك اليومية المعقدة إلى{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-cyan-300">
            منظومات ذكاء اصطناعي
          </span>{" "}
          تعمل ذاتياً 24/7
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal"
        >
          وفّر أكثر من <span className="text-cyan-400 font-bold">80% من ساعات العمل اليدوية</span>، اقضِ على الأخطاء البشرية القاتلة، وضاعف سرعة نمو نشاطك التجاري بأعلى كفاءة تشغيلية وبدون تعيين موظفين إضافيين.
        </motion.p>

        {/* Risk-Free Banner (الضمان البارز) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900/90 to-emerald-500/10 border border-amber-500/30 backdrop-blur-md shadow-xl flex items-center justify-center gap-4 text-right"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0 text-amber-400">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-amber-300 font-heading">
              🛡️ ضمان تشغيل متكامل وتجربة حية لمدة 7 أيام
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              نصمم ونربط ونطلق النظام في بيئة عملك، ولا تدفع ريالاً واحداً حتى ترى النتائج تعمل أمامك بكفاءة 100%.
            </p>
          </div>
        </motion.div>

        {/* Dual CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#simulator"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-base shadow-xl shadow-cyan-500/25 transition-all font-heading"
          >
            <PlayCircle className="w-5 h-5 text-slate-950" />
            <span>جرّب المحاكاة التفاعلية الآن</span>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#calculator"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 font-bold text-base transition-all backdrop-blur-sm"
          >
            <Calculator className="w-5 h-5 text-cyan-400" />
            <span>احسب وفر شركتك المالي</span>
          </motion.a>
        </motion.div>

        {/* Trust Badges Under Hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-400"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>ربط فوري عبر Webhooks & REST APIs</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>نماذج ذكاء اصطناعي فائقة الدقة (Gemini AI)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>تكامل سلس مع Google Sheets, WhatsApp, CRM</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
