import React from "react";
import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "استكشاف وتحليل العمليات",
    description:
      "جلسة تشريحية معمقة لتحديد نقاط الاختناق والمهام اليدوية المتكررة التي تستهلك وقت فريقك وأموالك.",
    color: "cyan",
    borderClass: "border-slate-800 hover:border-cyan-500/40",
    badgeClass: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
  },
  {
    num: "02",
    title: "هندسة السيناريوهات السحابية",
    description:
      "بناء الربط البرمجي (APIs)، دمج نماذج الذكاء الاصطناعي، وتصميم مسار تدفق البيانات بصورة سريعة وآمنة.",
    color: "indigo",
    borderClass: "border-slate-800 hover:border-indigo-500/40",
    badgeClass: "bg-indigo-500/10 border-indigo-500/30 text-indigo-400",
  },
  {
    num: "03",
    title: "التدقيق والاختبار المكثف",
    description:
      "إخضاع المنظومة لاختبارات ضغط وحالات استثنائية (Edge Cases) لضمان تفادي الأخطاء واستقرار العمل 100%.",
    color: "emerald",
    borderClass: "border-slate-800 hover:border-emerald-500/40",
    badgeClass: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  },
  {
    num: "04",
    title: "الإطلاق وضمان التشغيل",
    description:
      "تفعيل المنظومة رسمياً في بيئتك مع ضمان تشغيل كامل ومراقبة مستمرة ودعم تقني لا ينقطع.",
    color: "amber",
    borderClass: "border-slate-800 hover:border-amber-500/40",
    badgeClass: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  },
];

export default function ProcessMethodology() {
  return (
    <section id="process" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
            METHODOLOGY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading mt-4 mb-4">
            كيف نعمل معك في Automata IQ؟
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            منهجية دقيقة وهندسية في 4 خطوات واضحة تضمن بناء أنظمة أتمتة سلسة ومستقرة تماماً.
          </p>
        </motion.div>

        {/* 4 Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-3xl bg-slate-900/80 border ${step.borderClass} transition-all group relative`}
            >
              <div
                className={`w-12 h-12 rounded-2xl border font-mono font-bold text-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${step.badgeClass}`}
              >
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-white font-heading mb-3">
                {step.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
