import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function RiskFreeWarranty() {
  return (
    <section id="warranty" className="py-16 bg-gradient-to-b from-slate-900/40 via-slate-950 to-slate-900/40 border-y border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-amber-500/10 via-slate-900/90 to-emerald-500/10 border border-amber-500/30 backdrop-blur-xl relative overflow-hidden text-center sm:text-right flex flex-col sm:flex-row items-center gap-8"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0 text-amber-400 shadow-xl shadow-amber-500/10">
            <ShieldCheck className="w-12 h-12" />
          </div>

          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold font-mono border border-amber-500/20 mb-3">
              ZERO-RISK CLIENT COMMITMENT
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mb-2">
              ضمان Automata IQ التشغيلي لمدة 7 أيام كاملة
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              نحن نتحمل المخاطرة بالكامل! نصمم النظام ونربطه ببيئة عملك ونتركه يعمل حياً لمدة 7 أيام للتأكد من دقته وتوفيره للوقت. إذا لم تكن راضياً بنسبة 100%، فلن تتحمل أي تكلفة.
            </p>
          </div>

          <div className="flex-shrink-0">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#consultation"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all font-heading"
            >
              <span>ابدأ تجربتك الآمنة</span>
              <ArrowLeft className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
