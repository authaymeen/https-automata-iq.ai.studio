import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Clock, Coins } from "lucide-react";

export default function RoiCalculator() {
  const [weeklyHours, setWeeklyHours] = useState(20);
  const [hourlyRate, setHourlyRate] = useState(50);

  // Calculations:
  const monthlyTotalHours = weeklyHours * 4;
  const monthlySavedHours = Math.round(monthlyTotalHours * 0.8);
  const monthlyMoneySaved = monthlySavedHours * hourlyRate;
  const annualMoneySaved = monthlyMoneySaved * 12;

  return (
    <section id="calculator" className="py-24 bg-slate-900/60 border-y border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider font-mono">
            ROI BOOST CALCULATOR
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading mt-4 mb-4">
            حاسبة الوفر المالي والعائد على الاستثمار
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            حرّك المؤشرات لاكتشاف مقدار الساعات والريالات التي يمكنك توفيرها سنوياً عند أتمتة مهام نشاطك التجاري مع Automata IQ.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Inputs (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 p-8 rounded-3xl bg-slate-950/90 border border-slate-800 backdrop-blur-xl"
          >
            {/* Slider 1: Weekly Hours */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-slate-200">
                  ساعات العمل اليدوي أسبوعياً للفريق:
                </label>
                <span className="text-lg font-bold text-cyan-400 font-mono">
                  {weeklyHours} ساعة/أسبوع
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={60}
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>5 ساعات (نشاط ناشئ)</span>
                <span>30 ساعة</span>
                <span>60+ ساعة (شركة متوسطة)</span>
              </div>
            </div>

            {/* Slider 2: Hourly Rate */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-slate-200">
                  متوسط تكلفة ساعة الموظف (بالريال السعودي):
                </label>
                <span className="text-lg font-bold text-indigo-400 font-mono">
                  {hourlyRate} ر.س / ساعة
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={200}
                step={5}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>20 ر.س</span>
                <span>100 ر.س</span>
                <span>200+ ر.س</span>
              </div>
            </div>

            {/* Guaranteed Automation Efficiency Tag */}
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-slate-300 flex items-center gap-3">
              <Zap className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <span>
                تعتمد الحسبة على معدل أتمتة محافظ بنسبة{" "}
                <strong className="text-cyan-300">80%</strong> من إجمالي الوقت المستهلك في الإدخال اليدوي.
              </span>
            </div>
          </motion.div>

          {/* Results Box (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/30 shadow-2xl relative"
          >
            <h4 className="text-base font-bold text-slate-300 font-heading mb-6 flex items-center justify-between">
              <span>النتيجة المتوقعة لشركتك</span>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Automata IQ Impact
              </span>
            </h4>

            <div className="space-y-6">
              {/* Monthly Hours */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">الوقت الموفر شهرياً</div>
                    <div className="text-sm font-semibold text-slate-200">
                      ساعات عمل حرّة لفريقك
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-cyan-400 font-heading font-mono">
                  {monthlySavedHours} ساعة
                </div>
              </div>

              {/* Monthly Money */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <Coins className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">الوفر المالي الشهري</div>
                    <div className="text-sm font-semibold text-slate-200">
                      تقليص الهدر التشغيلي
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-indigo-400 font-heading font-mono">
                  {monthlyMoneySaved.toLocaleString("en-US")} ر.س
                </div>
              </div>

              {/* Annual Money Saved */}
              <motion.div
                key={annualMoneySaved}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-slate-900 to-cyan-500/15 border border-emerald-500/40 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                    إجمالي الوفر السنوي المتوقع:
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    توفير مباشر في التكاليف التشغيلية
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-heading font-mono">
                  {annualMoneySaved.toLocaleString("en-US")} ر.س
                </div>
              </motion.div>
            </div>

            {/* Quick Action */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="#consultation"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all font-heading"
            >
              <span>ابدأ توفير هذه التكاليف اليوم ➔</span>
            </motion.a>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
