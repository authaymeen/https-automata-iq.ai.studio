import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Webhook,
  BrainCircuit,
  Sheet,
  BellRing,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Terminal,
  Activity,
  Zap,
  Sliders,
  Info,
} from "lucide-react";

interface NodeState {
  id: number;
  title: string;
  subtext: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: "cyan" | "indigo" | "emerald" | "amber" | "red";
}

const NODES_DATA: NodeState[] = [
  {
    id: 1,
    title: "1. استقبال البيانات وتشفيرها",
    subtext: "Webhook Ingest & Auth",
    description: "التقاط التقييم فور نشره عبر خرائط جوجل أو المنصة وتشفير الحمولة",
    icon: Webhook,
    accentColor: "cyan",
  },
  {
    id: 2,
    title: "2. تحليل المشاعر واستخراج الفئة",
    subtext: "Gemini AI Sentiment Engine",
    description: "تصنيف نوع الشكوى وسياقها بدقة 99.8% باللغات واللهجات المحلية",
    icon: BrainCircuit,
    accentColor: "indigo",
  },
  {
    id: 3,
    title: "3. توثيق وتحديث السجل",
    subtext: "Google Sheets / DB Sync",
    description: "أرشفة الحالة لحظياً في السجلات المحاسبية والتشغيلية الموحدة",
    icon: Sheet,
    accentColor: "emerald",
  },
  {
    id: 4,
    title: "4. صياغة الرد الفوري + إنذار طوارئ",
    subtext: "Instant Alert & Response Dispatch",
    description: "إشعار فوري لمدير الفرع مع صياغة رد دبلوماسي جاهز للمراجعة",
    icon: BellRing,
    accentColor: "amber",
  },
];

export default function InteractiveSimulator() {
  const [scenario, setScenario] = useState<"negative" | "positive">("negative");
  const [reviewText, setReviewText] = useState(
    "الخدمة بطيئة جداً والطلب وصل بعد ساعة بارد والموظف تعامله سيء!"
  );
  const [activeStep, setActiveStep] = useState<number>(0); // 0: Idle, 1..4: Active step
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  const sampleNegative =
    "الخدمة بطيئة جداً والطلب وصل بعد ساعة بارد والموظف تعامله سيء!";
  const samplePositive =
    "تجربة استثنائية وأكل لذيذ جداً! شكراً للأستاذ فهد على حسن الاستقبال والسرعة.";

  const handleScenarioChange = (type: "negative" | "positive") => {
    if (isSimulating) return;
    setScenario(type);
    setReviewText(type === "negative" ? sampleNegative : samplePositive);
    setActiveStep(0);
    setCompletedSteps([]);
    setExecutionTime(null);
  };

  const runSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(1);
    setCompletedSteps([]);
    setExecutionTime(null);

    const startTime = Date.now();

    // Step 1: Ingest (400ms)
    setTimeout(() => {
      setCompletedSteps((prev) => [...prev, 1]);
      setActiveStep(2);
    }, 900);

    // Step 2: Gemini AI (1200ms)
    setTimeout(() => {
      setCompletedSteps((prev) => [...prev, 2]);
      setActiveStep(3);
    }, 2000);

    // Step 3: Google Sheets Sync (900ms)
    setTimeout(() => {
      setCompletedSteps((prev) => [...prev, 3]);
      setActiveStep(4);
    }, 3000);

    // Step 4: Final Alert & Output (800ms)
    setTimeout(() => {
      setCompletedSteps((prev) => [...prev, 4]);
      setActiveStep(5); // Finished
      setIsSimulating(false);
      setExecutionTime(Date.now() - startTime);
    }, 4000);
  };

  const resetSimulation = () => {
    setActiveStep(0);
    setCompletedSteps([]);
    setIsSimulating(false);
    setExecutionTime(null);
  };

  return (
    <section id="simulator" className="py-24 bg-slate-900/60 border-y border-slate-800/80 relative overflow-hidden">
      {/* Background glow flares */}
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Motion Stagger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            LIVE INTERACTIVE ENGINE
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading mb-4">
            المحاكي الحي المباشر لتدفقات Automata IQ
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            جرّب بنفسك الآن! اختر نوع التقييم واضغط زر الإطلاق لتشاهد تدفق البيانات ومعالجة الذكاء الاصطناعي اللحظية خطوة بخطوة أمامك بتأثيرات حركة دقيقة.
          </p>
        </motion.div>

        {/* Main Simulator Card Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls & Inputs (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-slate-950/90 border border-slate-800 backdrop-blur-xl shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white font-heading flex items-center gap-2">
                <Sliders className="w-5 h-5 text-cyan-400" />
                <span>لوحة التحكم وتجربة المدخلات</span>
              </h3>
              {activeStep > 0 && !isSimulating && (
                <button
                  onClick={resetSimulation}
                  className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>إعادة ضبط</span>
                </button>
              )}
            </div>

            <p className="text-xs text-slate-400 mb-6">
              حدد نوع تجربة العميل لاختبار استجابة النظام وتأثير النبض اللحظي:
            </p>

            {/* Scenario Rating Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => handleScenarioChange("negative")}
                disabled={isSimulating}
                className={`p-3.5 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  scenario === "negative"
                    ? "border-red-500/60 bg-red-500/20 text-red-300 shadow-lg shadow-red-500/10 ring-1 ring-red-500/50"
                    : "border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-300"
                }`}
              >
                <span>🔴 تقييم سلبي (1 نجمة)</span>
              </button>

              <button
                type="button"
                onClick={() => handleScenarioChange("positive")}
                disabled={isSimulating}
                className={`p-3.5 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                  scenario === "positive"
                    ? "border-emerald-500/60 bg-emerald-500/20 text-emerald-300 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/50"
                    : "border-slate-800 bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-300"
                }`}
              >
                <span>🟢 تقييم ممتاز (5 نجوم)</span>
              </button>
            </div>

            {/* Review Input Box */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                نص تقييم العميل على خرائط Google:
              </label>
              <textarea
                rows={3}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                disabled={isSimulating}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition-colors font-sans resize-none disabled:opacity-70"
              />
            </div>

            {/* Trigger Button with Motion Hover / Tap */}
            <motion.button
              whileHover={{ scale: isSimulating ? 1 : 1.02 }}
              whileTap={{ scale: isSimulating ? 1 : 0.98 }}
              onClick={runSimulation}
              disabled={isSimulating}
              className={`w-full py-4 rounded-xl font-extrabold text-base shadow-xl flex items-center justify-center gap-3 transition-all font-heading ${
                isSimulating
                  ? "bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700"
                  : "bg-gradient-to-r from-cyan-500 via-cyan-400 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 shadow-cyan-500/30"
              }`}
            >
              {isSimulating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <Activity className="w-5 h-5 text-cyan-400" />
                  </motion.div>
                  <span>جاري تدفق البيانات بين العقد...</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-current" />
                  <span>
                    {activeStep === 5
                      ? "إعادة تشغيل المحاكاة 🚀"
                      : "🚀 إرسال التقييم واختبار تدفق Automata IQ"}
                  </span>
                </>
              )}
            </motion.button>

            {/* Simulation Info */}
            <div className="mt-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-400 flex items-start gap-3">
              <Info className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>
                يدعم المحاكي تأثير النبض (Pulse) عند التنشيط وتأثير التتابع (Stagger) لنقل البيانات عبر بروتوكولات REST & Webhooks.
              </span>
            </div>
          </motion.div>

          {/* Visual Pipeline Nodes (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-950/90 border border-slate-800 backdrop-blur-xl shadow-2xl flex flex-col justify-between"
          >
            <div>
              {/* Header Status Bar */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      isSimulating
                        ? "bg-amber-400 animate-ping"
                        : activeStep === 5
                        ? "bg-emerald-400"
                        : "bg-slate-600"
                    }`}
                  />
                  <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                    مسار التدفق البرمجي المباشر
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {executionTime !== null && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      ⚡ مكتمل في {executionTime}ms
                    </span>
                  )}
                  <span
                    className={`text-xs font-mono px-2.5 py-1 rounded-full border transition-all ${
                      isSimulating
                        ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 animate-pulse"
                        : activeStep === 5
                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    }`}
                  >
                    {isSimulating
                      ? `Step ${activeStep} of 4 Processing...`
                      : activeStep === 5
                      ? "Flow Completed (200 OK)"
                      : "جاهز للاختبار (Idle)"}
                  </span>
                </div>
              </div>

              {/* 4 Pipeline Nodes with Framer Motion Stagger and Transitions */}
              <div className="space-y-3 relative">
                {NODES_DATA.map((node, index) => {
                  const stepNumber = node.id;
                  const isCurrentActive = activeStep === stepNumber;
                  const isDone = completedSteps.includes(stepNumber);
                  const Icon = node.icon;

                  return (
                    <React.Fragment key={node.id}>
                      {/* Node Card */}
                      <motion.div
                        initial={false}
                        animate={{
                          scale: isCurrentActive ? [1, 1.025, 1] : 1,
                          borderColor: isCurrentActive
                            ? "rgba(6, 182, 212, 0.8)"
                            : isDone
                            ? "rgba(16, 185, 129, 0.4)"
                            : "rgba(30, 41, 59, 0.8)",
                          backgroundColor: isCurrentActive
                            ? "rgba(15, 23, 42, 0.95)"
                            : isDone
                            ? "rgba(15, 23, 42, 0.7)"
                            : "rgba(15, 23, 42, 0.4)",
                        }}
                        transition={{
                          scale: isCurrentActive
                            ? { repeat: Infinity, duration: 1.2, ease: "easeInOut" }
                            : { duration: 0.3 },
                        }}
                        className={`p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                          isCurrentActive
                            ? "shadow-xl shadow-cyan-500/15"
                            : isDone
                            ? "shadow-md shadow-emerald-500/5"
                            : ""
                        }`}
                      >
                        {/* Glowing pulse ring if active */}
                        {isCurrentActive && (
                          <motion.div
                            initial={{ opacity: 0.5, scale: 0.95 }}
                            animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.98, 1.01, 0.98] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-cyan-500/10 pointer-events-none"
                          />
                        )}

                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-3 sm:gap-4">
                            {/* Node Icon with Animated Background */}
                            <motion.div
                              animate={{
                                rotate: isCurrentActive ? [0, 5, -5, 0] : 0,
                                scale: isCurrentActive ? 1.1 : isDone ? 1.05 : 1,
                              }}
                              transition={{ duration: 0.4 }}
                              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                                isCurrentActive
                                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30 font-bold"
                                  : isDone
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                                  : "bg-slate-800 text-slate-500"
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </motion.div>

                            <div>
                              <div className="flex items-center gap-2">
                                <h4
                                  className={`text-sm font-bold font-heading transition-colors ${
                                    isCurrentActive
                                      ? "text-cyan-300"
                                      : isDone
                                      ? "text-white"
                                      : "text-slate-400"
                                  }`}
                                >
                                  {node.title}
                                </h4>
                                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                                  {node.subtext}
                                </span>
                              </div>
                              <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                                {node.description}
                              </p>
                            </div>
                          </div>

                          {/* Status Pill */}
                          <div className="text-xs font-mono flex-shrink-0">
                            {isCurrentActive ? (
                              <motion.span
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-flex items-center gap-1.5 text-cyan-400 font-bold"
                              >
                                <Activity className="w-3.5 h-3.5 animate-spin" />
                                <span>معالجة...</span>
                              </motion.span>
                            ) : isDone ? (
                              <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>تم (200 OK)</span>
                              </span>
                            ) : (
                              <span className="text-slate-600">في الانتظار...</span>
                            )}
                          </div>
                        </div>
                      </motion.div>

                      {/* Animated Connector Line between steps */}
                      {index < NODES_DATA.length - 1 && (
                        <div className="h-4 relative flex items-center justify-center my-[-4px]">
                          <div
                            className={`w-0.5 h-full transition-colors duration-500 ${
                              completedSteps.includes(stepNumber)
                                ? "bg-emerald-500"
                                : isCurrentActive
                                ? "bg-cyan-400"
                                : "bg-slate-800"
                            }`}
                          />
                          {/* Animated traveling data particle */}
                          {isCurrentActive && (
                            <motion.div
                              initial={{ y: -8, opacity: 0 }}
                              animate={{ y: 8, opacity: [0, 1, 0] }}
                              transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
                              className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-md shadow-cyan-400"
                            />
                          )}
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Real-time Telemetry and Preview Alert Box */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-cyan-400 font-mono flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  LIVE TELEMETRY & ALERT DISPATCH
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  Engine: Gemini 1.5 & REST API
                </span>
              </div>

              <AnimatePresence mode="wait">
                {activeStep === 0 && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-500 text-center"
                  >
                    // اضغط على زر الإطلاق أعلاه لبدء اختبار تدفق البيانات الحَي
                  </motion.div>
                )}

                {activeStep > 0 && activeStep < 5 && (
                  <motion.div
                    key="active-log"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-xl bg-slate-900 border border-cyan-500/30 font-mono text-xs text-slate-300 space-y-1.5"
                  >
                    <div className="flex items-center gap-2 text-cyan-400 font-bold">
                      <Zap className="w-3.5 h-3.5 animate-bounce" />
                      <span>[LOG_STREAM]: Executing Node #{activeStep}</span>
                    </div>
                    {activeStep === 1 && (
                      <p className="text-slate-400">
                        → Ingesting Google Maps Review payload: &quot;{reviewText.substring(0, 45)}...&quot;
                      </p>
                    )}
                    {activeStep === 2 && (
                      <p className="text-indigo-400">
                        → Gemini AI analyzing sentiment context, urgency level, and dialect nuances...
                      </p>
                    )}
                    {activeStep === 3 && (
                      <p className="text-emerald-400">
                        → Appending row to Google Sheets master record & calculating KPI metrics...
                      </p>
                    )}
                    {activeStep === 4 && (
                      <p className="text-amber-400">
                        → Formatting instant emergency alert and crafting diplomacy response...
                      </p>
                    )}
                  </motion.div>
                )}

                {activeStep === 5 && (
                  <motion.div
                    key="finished-alert"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    {scenario === "negative" ? (
                      <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/50 text-red-200 shadow-xl shadow-red-950/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-bold text-red-400 flex items-center gap-1.5 font-heading text-sm">
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                            <span>🚨 إنذار طوارئ فوري (Telegram / WhatsApp Ops):</span>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300">
                            Severity: High 🔴
                          </span>
                        </div>
                        <p className="text-xs text-slate-200 mb-2">
                          ⚠️ تم رصد تقييم سلبي (1 نجمة) في الفرع الرئيسي: &quot;{reviewText}&quot;
                        </p>
                        <div className="p-2.5 rounded-lg bg-slate-950/80 border border-red-500/30 text-[11px] text-slate-300">
                          <strong className="text-cyan-400">الرد الدبلوماسي المقترح للمدير:</strong>
                          <div className="mt-1 text-slate-400">
                            &quot;أهلاً بك، نعتذر بشدة عن هذه التجربة التي لا تليق بمعاييرنا. نود تعويضك فوراً والتواصل معك على الخاص لحل الإشكال مباشرة.&quot;
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 shadow-xl shadow-emerald-950/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-bold text-emerald-400 flex items-center gap-1.5 font-heading text-sm">
                            <Sparkles className="w-4 h-4 text-emerald-400" />
                            <span>✨ تنبيه رضا العميل وتكريم الموظف:</span>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                            Sentiment: Positive 🟢
                          </span>
                        </div>
                        <p className="text-xs text-slate-200 mb-2">
                          🌟 تقييم 5 نجوم جديد مع إشادة خاصة بالخدمة والسرعة!
                        </p>
                        <div className="p-2.5 rounded-lg bg-slate-950/80 border border-emerald-500/30 text-[11px] text-slate-300">
                          <strong className="text-emerald-400">الإجراء التلقائي المكتمل:</strong>
                          <div className="mt-1 text-slate-400">
                            تم توثيق إشادة الموظف في لوحة الشرف وإرسال كوبون ولاء تلقائي للعميل عبر WhatsApp.
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
