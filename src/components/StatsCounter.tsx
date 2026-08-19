import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldAlert, Clock, Activity } from "lucide-react";

const STATS = [
  {
    id: 1,
    value: "+50,000",
    label: "عملية مؤتمتة بنجاح",
    subtext: "عبر بنية Automata IQ السحابية",
    icon: Zap,
    color: "cyan",
    borderClass: "border-cyan-500/20 hover:border-cyan-500/40",
    textClass: "text-cyan-400",
    bgClass: "bg-cyan-500/10",
  },
  {
    id: 2,
    value: "99.9%",
    label: "دقة تنفيذ العمليات",
    subtext: "تفادي كامل للأخطاء البشرية",
    icon: ShieldAlert,
    color: "indigo",
    borderClass: "border-indigo-500/20 hover:border-indigo-500/40",
    textClass: "text-indigo-400",
    bgClass: "bg-indigo-500/10",
  },
  {
    id: 3,
    value: "+80%",
    label: "توفير في وقت الموظفين",
    subtext: "تفريغ الفريق للمهام الإستراتيجية",
    icon: Clock,
    color: "emerald",
    borderClass: "border-emerald-500/20 hover:border-emerald-500/40",
    textClass: "text-emerald-400",
    bgClass: "bg-emerald-500/10",
  },
  {
    id: 4,
    value: "< 3 دقائق",
    label: "سرعة الاستجابة اللحظية",
    subtext: "إنذار ومعالجة البيانات فور وقوعها",
    icon: Activity,
    color: "amber",
    borderClass: "border-amber-500/20 hover:border-amber-500/40",
    textClass: "text-amber-400",
    bgClass: "bg-amber-500/10",
  },
];

export default function StatsCounter() {
  return (
    <section className="py-10 bg-slate-900/50 border-y border-slate-800/80 backdrop-blur-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className={`p-6 rounded-2xl bg-slate-900/80 border ${stat.borderClass} transition-all group`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-3xl sm:text-4xl font-extrabold ${stat.textClass} font-heading tracking-tight`}>
                    {stat.value}
                  </span>
                  <div className={`p-2.5 rounded-xl ${stat.bgClass} ${stat.textClass} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-slate-200 font-heading">
                  {stat.label}
                </h4>
                <p className="text-xs text-slate-400 mt-1">{stat.subtext}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
