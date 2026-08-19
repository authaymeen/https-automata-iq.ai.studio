import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, Coins, Sparkles, Lock, Unlock, ArrowLeftRight, 
  Cpu, Zap, Sliders, ShieldAlert, Key, HelpCircle, ChevronLeft, Loader2, CheckCircle2,
  AlertTriangle, Flame, ArrowUpRight, BarChart2, Shield, Eye, Compass, Copy, Search, ThumbsDown, Star
} from "lucide-react";
import FreeTrialSuite from "./FreeTrialSuite";

interface PreLoginPsychologicalTriggersProps {
  isPremium?: boolean;
  isLoggedIn?: boolean;
}

export default function PreLoginPsychologicalTriggers({ isPremium = false, isLoggedIn = false }: PreLoginPsychologicalTriggersProps) {
  // --- Trigger 1: lost opportunity calculator states ---
  const [salesVolume, setSalesVolume] = useState<number>(15000); // Monthly sales in SAR
  const [currentStyle, setCurrentStyle] = useState<"random" | "basic_gpt" | "engineered">("basic_gpt");
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [copiedReport, setCopiedReport] = useState<boolean>(false);
  
  // --- Trigger 2: Instant Persuasion Analyzer States ---
  const [inputText, setInputText] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);
  const [analysisLogs, setAnalysisLogs] = useState<string[]>([]);
  const [analysisFinished, setAnalysisFinished] = useState<boolean>(false);
  const [persuasionAttempts, setPersuasionAttempts] = useState<number>(0);
  const [showRegisterRequired, setShowRegisterRequired] = useState<boolean>(false);

  useEffect(() => {
    if (!isPremium) {
      let saved = "";
      try {
        saved = localStorage.getItem("pm_persuasion_attempts") || "";
      } catch (e) {
        console.warn("localStorage.getItem denied in sandboxed iframe:", e);
        saved = (window as any).__pm_persuasion_attempts || "";
      }
      if (saved) {
        setPersuasionAttempts(parseInt(saved, 10) || 0);
      }
    }
  }, [isPremium]);

  // Dynamic stats calculated from Trigger 1
  const getCalculations = () => {
    const currentRate = currentStyle === "random" ? 0.008 : currentStyle === "basic_gpt" ? 0.015 : 0.038;
    const targetRate = 0.045; // Prompt Master optimized conversion rate average

    const avgOrderValue = 250;
    const currentOrders = Math.round(salesVolume / avgOrderValue);
    const trafficEstimate = Math.round(currentOrders / currentRate) || 1000;
    
    const optimizedOrders = Math.round(trafficEstimate * targetRate);
    const optimizedSales = optimizedOrders * avgOrderValue;
    
    const lostMoneyMonthly = Math.max(0, optimizedSales - salesVolume);
    const lostMoneyYearly = lostMoneyMonthly * 12;

    const hoursWasted = currentStyle === "random" ? 32 : currentStyle === "basic_gpt" ? 22 : 8;
    const cacReduction = currentStyle === "random" ? "48%" : currentStyle === "basic_gpt" ? "32%" : "15%";

    return {
      currentRate: (currentRate * 100).toFixed(1) + "%",
      targetRate: (targetRate * 100).toFixed(1) + "%",
      lostMoneyMonthly: lostMoneyMonthly.toLocaleString("en-US"),
      lostMoneyYearly: lostMoneyYearly.toLocaleString("en-US"),
      hoursWasted,
      cacReduction,
      boostFactor: (targetRate / currentRate).toFixed(1) + "x"
    };
  };

  const calcs = getCalculations();

  // Preset templates for quick testing in Trigger 2
  const copyTemplates = [
    {
      text: "عباية كريب سوداء بـ 150 ريال شامل التوصيل والدفع عند الاستلام وبجودة عالية جداً لجميع الطلبات",
      label: "عبايات كلاسيك"
    },
    {
      text: "عطر فرنسي فخم ومنعش برائحة العود والهيل يدوم طويلاً بـ 190 ريال فقط مع التوصيل السريع",
      label: "عطور شرقية"
    },
    {
      text: "قهوة كولومبية مختصة مميزة ذات إيحاءات فاخرة تناسب الصباح اطلبها الآن بخصم 15% لفترة محدودة",
      label: "قهوة مختصة"
    }
  ];

  // Analysis simulator logs
  const stepsList = [
    "🔍 جاري فحص الكلمات وتحديد معامل مقاومة الشراء الطبيعي لدى الزائر الخليجي...",
    "🛡️ جاري قياس 'فلاتر الشك والتردد اللغوي' (نسبة الحذر ومقارنة البدائل بالمنطقة)...",
    "⚙️ رصد العبارات الضعيفة المكررة (مخالفة معايير ندرة العرض وقيمة التميّز)...",
    "⚡ هندسة هيكل الترقية السيكولوجي المقترح وتطوير الخطاف الإقناعي الحاد..."
  ];

  const handleStartAnalysis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (!isLoggedIn && !isPremium) {
      setShowRegisterRequired(true);
      return;
    }

    if (!isPremium && persuasionAttempts >= 3) {
      return;
    }
    
    setIsAnalyzing(true);
    setAnalysisFinished(false);
    setAnalysisStep(0);
    setAnalysisLogs([]);

    if (!isPremium) {
      const next = persuasionAttempts + 1;
      setPersuasionAttempts(next);
      try {
        localStorage.setItem("pm_persuasion_attempts", String(next));
      } catch (e) {
        console.warn("localStorage.setItem denied in sandboxed iframe:", e);
        (window as any).__pm_persuasion_attempts = String(next);
      }
    }

    let current = 0;
    const interval = setInterval(() => {
      if (current < stepsList.length) {
        setAnalysisLogs(prev => [...prev, stepsList[current]]);
        setAnalysisStep(current + 1);
        current++;
      } else {
        clearInterval(interval);
        setIsAnalyzing(false);
        setAnalysisFinished(true);
      }
    }, 800);
  };

  // Helper dynamic feedback generator based on input length/keywords
  const getAnalysisResults = () => {
    const textLength = inputText.length;
    
    // Baseline metrics
    let score = Math.max(22, Math.min(55, 30 + (textLength % 15)));
    let defensiveResistance = Math.max(65, Math.min(95, 90 - (textLength % 12)));
    
    let badWords = ["بجودة عالية جداً", "شامل التوصيل", "سارع بالطلب", "خصم لفترة محدودة", "يدوم طويلاً"];
    let detectedBadInText = badWords.filter(word => inputText.includes(word));
    if (detectedBadInText.length === 0) {
      detectedBadInText = ["بجودة عالية جداً", "شامل التوصيل"];
    }

    // Suggested enhancements (Psychological Seduction Hook)
    let suggestedHook = "";
    let scarcityTrigger = "";
    let objectionBuster = "";

    if (inputText.includes("عباية") || inputText.includes("عبايه") || textLength % 3 === 0) {
      suggestedHook = "«وقوف مهيب يجمع بين كبرياء التراث المنسوج ومرونة الحضور اليومي.. عباية كريب منسوجة يدوياً بحب لتلائم مناسباتكِ الفاخرة.»";
      scarcityTrigger = "«تنبيه ندرة: نقوم بنسج 12 قطعة فقط شهرياً من هذا التصميم لضمان تميزك وتفرد حضوركِ.»";
      objectionBuster = "«تم فك التردد: قياس مخصص لقامة كتفكِ مع ضمان ذهبي للاستبدال الفوري المجاني، وبوابات دفع ميسرة تابي وتمارا.»";
    } else if (inputText.includes("عطر") || textLength % 3 === 1) {
      suggestedHook = "«رائحة تسبق حضورك، لتترك أثراً لا يمحى في مجالس الوجهاء.. عطر مستخلص بنسب نقية من دهن العود العتيق والهيل الأسود.»";
      scarcityTrigger = "«مخزون محدود: تبقت 7 زجاجات مرقمة يدوياً تحت هذه الدفعة الخاصة لهذا الصيف بالمنطقة الوسطى.»";
      objectionBuster = "«أمان تام: جرب العطر أولاً عبر عينة التجربة المجانية المرفقة؛ إن لم يطابق تطلعاتك استرد قيمة طلبك بضغطة زر واحدة.»";
    } else {
      suggestedHook = "«ليست مجرد تفاصيل.. إنها تجربة نخبوية مصممة خصيصاً لأولئك الذين لا يقبلون بأنصاف الحلول في تفاصيلهم اليومية.»";
      scarcityTrigger = "«عدد محدود للغاية من القطع متوفر الآن لعملاء النخبة المسجلين بالرياض وجدة.»";
      objectionBuster = "«احصل عليها فوراً مع شحن أمن مبرد وضمان استرجاع ذهبي غير مشروط خلال 14 يوماً.»";
    }

    return {
      score,
      defensiveResistance,
      detectedBadInText,
      suggestedHook,
      scarcityTrigger,
      objectionBuster
    };
  };

  const results = getAnalysisResults();

  const scrollToAuth = () => {
    const element = document.getElementById("auth-portal-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.scrollTo({ top: 150, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-20 relative animate-fade-in" dir="rtl">
      
      {/* Decorative lines */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent pointer-events-none" />
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-rose-500/20 to-transparent pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="text-center space-y-3 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-1.5 rounded-full text-xs font-black tracking-wide">
          <Sparkles className="w-4 h-4 animate-spin text-rose-400" style={{ animationDuration: "6s" }} />
          <span>مختبر الإقناع وسيكولوجية العميل الخليجي (أدوات مجانية قبل التسجيل)</span>
        </div>
        <h2 className="text-3xl sm:text-4.5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-sky-200 to-white leading-tight">
          افحص مستوى قوة نصوصك وكشف تسريب الأرباح 🔬🧠
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
          جرب معنا الأدوات التفاعلية فوراً لقياس قوة محتواك وتأثيره النفسي على العميل، واكشف النبرة الصارمة المغلقة لمتجرك مجاناً.
        </p>
      </div>

      {/* FREE TRIAL INTERACTIVE SUITE */}
      <FreeTrialSuite isPremium={isPremium} isLoggedIn={isLoggedIn} />

      {/* TRIGGER 2: THE INSTANT PERSUASION ANALYZER (مختبر الإقناع الخليجي) */}
      <section className="bg-gradient-to-br from-[#0c0a2a] via-slate-950 to-[#031522] border border-cyan-500/30 rounded-[32px] p-6 sm:p-10 relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.12)]">
        {/* Subtle decorative glow */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row gap-10 items-stretch justify-between">
          
          {/* Left Column: Instant Text Paste and Test form */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-6 text-right">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-cyan-500/15 border border-cyan-500/35 text-cyan-300 px-3.5 py-1.5 rounded-full text-xs font-extrabold">
                <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>محلل هندسة الإقناع السلوكي الفوري 🧪</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-100 leading-snug">
                مختبر الإقناع الخليجي: فحص قوة الإقناع التسويقي للعميل
              </h3>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                قم بلصق أو كتابة أي نص إعلان، أو منشور سناب شات، أو وصف منتج تستخدمه حالياً. سيقوم المحرك بتحليله سلوكياً وقياس معامل الرفض أو الشراء لدى جمهور الخليج فوراً قبل تسجيل الدخول!
              </p>
            </div>

            {/* Quick paste templates */}
            <div className="space-y-4 bg-slate-950/40 p-5 rounded-2xl border border-white/5">
              <div className="space-y-2">
                <span className="text-[10px] text-slate-450 font-black block">نقرات سريعة للتجربة الفورية (اختر مثالاً للصق والتحليل):</span>
                <div className="flex flex-wrap gap-2">
                  {copyTemplates.map((template, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setInputText(template.text);
                        setAnalysisFinished(false);
                      }}
                      className="bg-slate-900 hover:bg-slate-850 border border-white/5 hover:border-cyan-500/30 text-slate-300 text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer"
                    >
                      💡 {template.label}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleStartAnalysis} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-extrabold block">ألصق نصك الإعلاني الحالي أو وصف المنتج هنا:</label>
                  <textarea
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value);
                      setAnalysisFinished(false);
                    }}
                    placeholder="مثال: عباية كريب سوداء بـ 150 ريال شامل التوصيل والدفع عند الاستلام..."
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-xs text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/50 transition-all font-medium h-24 resize-none leading-relaxed"
                    required
                    disabled={isAnalyzing || (!isPremium && persuasionAttempts >= 3)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isAnalyzing || !inputText.trim() || (!isPremium && persuasionAttempts >= 3)}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950 text-xs font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:scale-[1.01]"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>جاري تشريح النص وقياس مقاومة العميل الخليجي...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 text-slate-950" />
                      <span>فحص قوة الإقناع وتجاوز الفلاتر الذهنية ⚡</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Visual Scanning Feedback & Teaser */}
          <div className="w-full lg:w-1/2 max-w-lg bg-slate-950 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[420px] relative overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* Limit Overlay Blocker for Persuasion Lab */}
            {!isPremium && persuasionAttempts >= 3 && (
              <div className="absolute inset-0 bg-[#050610]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-25">
                <div className="bg-cyan-500/10 border border-cyan-500/35 p-3.5 rounded-full text-cyan-400 mb-3.5 shadow-[0_0_20px_rgba(6,182,212,0.3)] animate-bounce">
                  <Lock className="w-6 h-6 text-cyan-400" />
                </div>
                <h4 className="text-lg font-black text-slate-100 mb-1">انتهت محاولاتك المجانية الـ 3 لمختبر الإقناع 🔒</h4>
                <p className="text-xs text-slate-400 max-w-md leading-relaxed mb-6">
                  لقد استنفدت جميع محاولاتك المجانية لتشريح النصوص. إذا كنت ترغب في الاستمرار بهندسة نصوص مبيعاتك وعكس منافسيك بلا حدود، يمكنك الاشتراك في <span className="text-cyan-400 font-bold">باقة ULTRA</span> للحصول على استخدام غير محدود!
                </p>
                <button
                  onClick={scrollToAuth}
                  className="bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-500 text-slate-950 font-black text-xs px-6 py-3.5 rounded-xl flex items-center gap-2 hover:brightness-110 transition-all hover:scale-[1.01] cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                  <Unlock className="w-4 h-4 text-slate-950" />
                  <span>اشترك بالباقة الألترا واستمر بلا حدود 🔓</span>
                </button>
              </div>
            )}

            {/* Header info */}
            <div className="border-b border-white/5 pb-3.5 flex justify-between items-center" dir="rtl">
              <span className="text-xs font-extrabold text-slate-300 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>مستكشف قوة الإقناع السيكولوجي</span>
              </span>
              <span className="text-[9px] font-mono text-cyan-500/85 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded uppercase">GCC_PERSUASION_DECODER_v4</span>
            </div>

            {/* Display when idle */}
            {!isAnalyzing && !analysisFinished && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="p-4 bg-slate-900 rounded-full border border-slate-850 text-slate-600 animate-pulse">
                  <Cpu className="w-10 h-10 text-cyan-500/60" />
                </div>
                <h4 className="font-extrabold text-sm text-slate-300">بانتظار لصق نصك التسويقي للبدء...</h4>
                <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                  سنقوم بفحص معدل استثارة العميل الخليجي، ورصد الألفاظ الركيكة، وتخمين نسبة الشراء بدقة متناهية.
                </p>
              </div>
            )}

            {/* Display during scanning */}
            {isAnalyzing && (
              <div className="flex-1 p-3 space-y-3 overflow-y-auto" dir="rtl">
                <div className="flex items-center justify-center gap-2.5 py-4">
                  <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping" />
                  <span className="text-xs font-black text-cyan-400 animate-pulse">جاري قياس معامل الشراء ومطابقة ترددات نجد والحجاز والخليج...</span>
                </div>
                <div className="space-y-2 text-[11px] font-mono leading-relaxed text-slate-400 border-t border-white/5 pt-3">
                  {analysisLogs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{log}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Display Finished Analysis Results */}
            {analysisFinished && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col justify-between py-2 space-y-4 text-right"
                dir="rtl"
              >
                {/* Score indicators */}
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Persuasion Score */}
                  <div className="bg-[#120306] border border-rose-500/20 p-4 rounded-2xl space-y-1">
                    <span className="text-[10px] text-slate-400 font-extrabold block">معدل الإقناع الكلي للنص:</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-rose-500 font-mono tracking-tight">{results.score}%</span>
                      <span className="text-[10px] text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded">ضعيف ⚠️</span>
                    </div>
                    <span className="text-[9px] text-slate-500 block leading-tight">النص يخاطب العقل العادي، ولا يثير دوافع التملك الفاخرة للعميل الخليجي.</span>
                  </div>

                  {/* Mental Resistance Score */}
                  <div className="bg-[#020a0f] border border-cyan-500/20 p-4 rounded-2xl space-y-1">
                    <span className="text-[10px] text-slate-400 font-extrabold block">درجة مقاومة وارتياب الزائر:</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-black text-cyan-400 font-mono tracking-tight">{results.defensiveResistance}%</span>
                      <span className="text-[10px] text-cyan-300 font-bold bg-cyan-500/10 px-2 py-0.5 rounded">عالية جداً</span>
                    </div>
                    <span className="text-[9px] text-slate-500 block leading-tight">العميل يقرأ ببرود لأن نبرة الكلمات تظهر كإعلان بيعي رخيص مكرر.</span>
                  </div>

                </div>

                {/* Detected bad words */}
                <div className="bg-slate-900/40 border border-white/5 p-3 rounded-xl space-y-1.5">
                  <span className="text-[10px] text-rose-400 font-black block flex items-center gap-1.5">
                    <ThumbsDown className="w-3.5 h-3.5 text-rose-400" />
                    <span>كلمات ركيكة مستهلكة تضعف الثقة مكتشفة بنصك:</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {results.detectedBadInText.map((word, i) => (
                      <span key={i} className="text-[9px] bg-rose-950/40 border border-rose-500/20 text-rose-300 font-bold px-2 py-0.5 rounded-md">
                        {word}
                      </span>
                    ))}
                  </div>
                </div>

                {/* The Seductive Solution Teaser */}
                <div className={`relative bg-[#02030d] rounded-2xl p-4 border border-cyan-500/10 overflow-hidden ${isPremium ? "" : "select-none max-h-[175px]"}`}>
                  
                  {/* Blurry suggestion content */}
                  <div className={`text-xs text-slate-200 font-mono space-y-2.5 leading-relaxed ${isPremium ? "" : "blur-[3.5px] select-none opacity-40"}`}>
                    <div className="font-extrabold text-cyan-400">🔥 الخطاف المقترح لبراندك لتجاوز الدفاعات:</div>
                    <p className="bg-slate-950/65 p-2.5 rounded-lg border border-white/5">{results.suggestedHook}</p>
                    <div className="font-extrabold text-amber-400">⏳ محفز الندرة والوجاهة:</div>
                    <p className="bg-slate-950/65 p-2.5 rounded-lg border border-white/5">{results.scarcityTrigger}</p>
                    <div className="font-extrabold text-emerald-400">🛡️ إنهاء الاعتراض ومحاصرة التردد:</div>
                    <p className="bg-slate-950/65 p-2.5 rounded-lg border border-white/5">{results.objectionBuster}</p>
                  </div>

                  {/* Absolute Glass Overlay and Lock */}
                  {!isPremium && (
                    <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[3px] flex flex-col items-center justify-center p-4 text-center">
                      <div className="bg-cyan-500/10 border border-cyan-500/30 p-2 rounded-full text-cyan-400 mb-2 shadow-[0_0_15px_rgba(6,182,212,0.3)] animate-bounce">
                        <Lock className="w-4.5 h-4.5 text-cyan-400" />
                      </div>
                      <span className="text-xs font-extrabold text-slate-200">التحسينات السلوكية الكاملة والبرومبت مغلق 🔒</span>
                      <span className="text-[9.5px] text-slate-400 mt-1 leading-relaxed max-w-[340px]">
                        نظام هندسة الإقناع قام ببناء خطاف فائق ومحفز للندرة، وإنهاء للشكوك خاص بنصوصك ليرفع مبيعاتك بمعدل <span className="text-cyan-400 font-bold">3.5 ضعف</span>. سجل حسابك الآن مجاناً لفك القفل!
                      </span>
                    </div>
                  )}
                </div>

                {/* Dynamic Unlock CTA */}
                {isPremium ? (
                  <button
                    onClick={() => {
                      const textToCopy = `=== الخطاف المقترح لتجاوز الدفاعات ===\n${results.suggestedHook}\n\n=== محفز الندرة والوجاهة ===\n${results.scarcityTrigger}\n\n=== إنهاء الاعتراض ومحاصرة التردد ===\n${results.objectionBuster}`;
                      navigator.clipboard.writeText(textToCopy);
                      setCopiedText(true);
                      setTimeout(() => setCopiedText(false), 2000);
                    }}
                    className="w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-slate-950 text-sm font-black py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:brightness-110 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:scale-[1.01]"
                  >
                    {copiedText ? (
                      <>
                        <CheckCircle2 className="w-4.5 h-4.5 text-slate-950" />
                        <span>تم نسخ التوصيات السلوكية بنجاح! 📋</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4.5 h-4.5 text-slate-950" />
                        <span>نسخ جميع توصيات هندسة الإقناع السلوكي 📋</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={scrollToAuth}
                    className="w-full bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-500 text-slate-950 text-sm font-black py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:brightness-110 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:scale-[1.01]"
                  >
                    <Unlock className="w-4.5 h-4.5 text-slate-950" />
                    <span>سجل مجاناً واحصل على النصوص والبرومبت المطور فوراً 🔓</span>
                  </button>
                )}
              </motion.div>
            )}

            {/* Bottom active nodes simulation */}
            <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500 font-bold">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span>عقدة المحاكاة: نجد والحجاز والشرقية نشطة</span>
              </span>
              <span className="font-mono">ENCRYPTION: SHIELD_PROT_v4</span>
            </div>
          </div>

        </div>
      </section>

      {/* TRIGGER 1: THE LOST OPPORTUNITY CALCULATOR */}
      <section className="bg-gradient-to-br from-[#120713] via-slate-950 to-[#030d12] border border-rose-500/30 rounded-[32px] p-6 sm:p-10 relative overflow-hidden shadow-[0_0_50px_rgba(244,63,94,0.12)]">
        {/* Neon light beams inside section */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row gap-10 items-stretch justify-between">
          
          {/* Left Column: Interactive Inputs & Sliders */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-6 text-right">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-rose-500/15 border border-rose-500/35 text-rose-300 px-3.5 py-1.5 rounded-full text-xs font-extrabold">
                <ShieldAlert className="w-4 h-4 animate-pulse text-rose-400" />
                <span>حاسبة تسريب الأرباح السنوية والهدر اللغوي 💸</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-black text-slate-100 leading-snug">
                كم تخسر سنوياً بسبب برومبتات ChatGPT المكررة؟
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                العميل الخليجي محاصر بمئات المتاجر يومياً. عندما يقرأ نصوصاً تقليدية أو برومبتات ذكاء اصطناعي ركيكة مكررة، يتم تشغيل فلاتر الدفاع الداخلي فوراً وينسحب. زيادة معدل تحويل متجرك من <span className="text-rose-400 font-bold">1.5% إلى 4.5%</span> تعني تضاعف مبيعاتك 3 مرات بنفس ميزانية الإعلانات الحالية تماماً!
              </p>
            </div>

            <div className="space-y-6 pt-4 bg-slate-950/40 p-5 rounded-2xl border border-white/5">
              {/* Slider Input */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-300 font-extrabold flex items-center gap-1.5">
                    <Coins className="w-4 h-4 text-amber-400" />
                    <span>مبيعات متجرك الحالية شهرياً:</span>
                  </span>
                  <span className="text-cyan-400 font-mono font-black text-base bg-cyan-950/60 px-3 py-1 rounded-lg border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                    {salesVolume.toLocaleString("en-US")} ريال سعودي
                  </span>
                </div>
                
                <input 
                  type="range" 
                  min="2000" 
                  max="150000" 
                  step="2000"
                  value={salesVolume}
                  onChange={(e) => setSalesVolume(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-900 rounded-lg appearance-none"
                />
                
                <div className="flex justify-between text-[10px] text-slate-500 font-bold font-mono">
                  <span>2,000 ريال</span>
                  <span>75,000 ريال</span>
                  <span>150,000 ريال</span>
                </div>
              </div>

              {/* Style Selector with highly interactive visuals */}
              <div className="space-y-3">
                <label className="text-xs text-slate-300 font-extrabold block">طريقتك المتبعة لكتابة نصوص إعلاناتك وصفحات الهبوط:</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => setCurrentStyle("random")}
                    className={`p-3.5 rounded-xl text-xs font-black text-right border transition-all relative flex flex-col justify-between ${
                      currentStyle === "random"
                        ? "bg-rose-500/10 border-rose-500/60 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                        : "bg-slate-950/60 border-slate-900 text-slate-500 hover:text-slate-400"
                    }`}
                  >
                    <span className="block">❌ كتابة يدوية عشوائية</span>
                    <span className="text-[9px] text-slate-500 mt-1 font-medium">معدل تحويل متدني جداً (~0.8%)</span>
                  </button>
                  
                  <button
                    onClick={() => setCurrentStyle("basic_gpt")}
                    className={`p-3.5 rounded-xl text-xs font-black text-right border transition-all relative flex flex-col justify-between ${
                      currentStyle === "basic_gpt"
                        ? "bg-amber-500/10 border-amber-500/60 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                        : "bg-slate-950/60 border-slate-900 text-slate-500 hover:text-slate-400"
                    }`}
                  >
                    <span className="block">⚠️ أوامر عادية لـ ChatGPT</span>
                    <span className="text-[9px] text-slate-550 mt-1 font-medium">لغة ركيكة ومكررة (~1.5%)</span>
                  </button>

                  <button
                    onClick={() => setCurrentStyle("engineered")}
                    className={`p-3.5 rounded-xl text-xs font-black text-right border transition-all relative flex flex-col justify-between ${
                      currentStyle === "engineered"
                        ? "bg-cyan-500/10 border-cyan-500/60 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                        : "bg-slate-950/60 border-slate-900 text-slate-500 hover:text-slate-400"
                    }`}
                  >
                    <span className="block">🔥 برومبتات شبه مهندسة</span>
                    <span className="text-[9px] text-slate-500 mt-1 font-medium">محاولات تحسين يدوية (~3.8%)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Neon Results Dashboard with Cash Leak animation */}
          <div className="w-full lg:w-1/2 max-w-lg bg-slate-950 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* Header of Screen */}
            <div className="border-b border-white/5 pb-4 flex justify-between items-center" dir="rtl">
              <span className="text-xs font-extrabold text-slate-300 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span className="text-rose-400">مستكشف الفقد وخسارة العوائد المباشرة</span>
              </span>
              <span className="text-[10px] bg-rose-500/10 border border-rose-500/30 text-rose-400 font-extrabold px-3 py-1 rounded-full flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>تسريب أرباح مؤكد</span>
              </span>
            </div>

            {/* Dynamic visual Leak Display (Loss Aversion at its finest) */}
            <div className="space-y-4">
              
              {/* Leaked Cash Screen */}
              <div className="bg-[#0e0307] border border-rose-500/30 rounded-2xl p-6 text-center space-y-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-rose-500/5 to-transparent pointer-events-none" />
                <span className="text-xs text-rose-400 font-black tracking-wider block flex items-center justify-center gap-1.5">
                  <Flame className="w-4 h-4 text-rose-500 animate-bounce" />
                  <span>الأرباح الضائعة التي تتسرب من متجرك شهرياً:</span>
                </span>
                
                <h4 className="text-3xl sm:text-4xl font-black text-rose-500 font-mono tracking-wide drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]">
                  {calcs.lostMoneyMonthly} <span className="text-sm font-bold font-sans text-rose-300">ريال سعودي</span>
                </h4>
                
                <div className="pt-2 border-t border-rose-500/10 flex justify-center items-center gap-2 text-[11px] text-slate-400">
                  <span>أي ما يعادل خسارة سنوية كبرى تبلغ:</span>
                  <span className="text-rose-400 font-black font-mono bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">{calcs.lostMoneyYearly} ريال</span>
                </div>
              </div>

              {/* Grid indicators comparing current vs optimized */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Current rate with sad indicator */}
                <div className="bg-slate-900/40 border border-white/5 p-4 rounded-xl text-right space-y-1.5">
                  <span className="text-[10px] text-slate-500 block font-bold">معدل التحويل المتدني الحالي:</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-rose-400 font-extrabold font-mono text-base">{calcs.currentRate}</span>
                    <span className="text-[9px] text-slate-500">من الزوار</span>
                  </div>
                  <div className="text-[9px] text-rose-400/80 font-bold bg-rose-950/30 px-2 py-0.5 rounded border border-rose-500/10 w-fit">
                    تشتت العميل وتسرب السلة ⚠️
                  </div>
                </div>

                {/* Target rate with master indicator */}
                <div className="bg-cyan-950/20 border border-cyan-500/20 p-4 rounded-xl text-right space-y-1.5 shadow-[0_0_15px_rgba(6,182,212,0.05)]">
                  <span className="text-[10px] text-cyan-400 block font-bold">معدل التحويل المضمون معنا:</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-emerald-400 font-black font-mono text-lg">{calcs.targetRate}</span>
                    <span className="text-[9px] text-emerald-500">بفضل النبرة الحادة</span>
                  </div>
                  <div className="text-[9px] text-emerald-400 font-black bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 w-fit animate-pulse">
                    مضاعفة المبيعات {calcs.boostFactor} 🚀
                  </div>
                </div>

                {/* Hours wasted */}
                <div className="bg-slate-900/40 border border-white/5 p-4 rounded-xl text-right space-y-1.5">
                  <span className="text-[10px] text-slate-500 block font-bold">وقت مهدر في تجارب المحتوى:</span>
                  <span className="text-xs font-black font-mono text-slate-200 block">
                    {calcs.hoursWasted} ساعة / شهرياً ⏳
                  </span>
                  <span className="text-[9px] text-slate-500 block">تقليصها لـ 5 دقائق فقط</span>
                </div>

                {/* CAC Savings */}
                <div className="bg-slate-900/40 border border-white/5 p-4 rounded-xl text-right space-y-1.5">
                  <span className="text-[10px] text-slate-500 block font-bold">توفير ميزانية الإعلانات (CAC):</span>
                  <span className="text-xs font-black font-mono text-emerald-400 block">
                    توفير {calcs.cacReduction} من الإنفاق!
                  </span>
                  <span className="text-[9px] text-slate-550 block">حشد عملاء كثر بنفس التكلفة</span>
                </div>

              </div>

            </div>

            {/* Premium action button targeting loss aversion */}
            {isPremium ? (
              <button
                onClick={() => {
                  const report = `=== تقرير كشف تسريب الأرباح والهدر اللغوي ===\nمبيعات المتجر الشهرية: ${salesVolume.toLocaleString("en-US")} ريال سعودي\nالخسارة الشهرية المقدرة: ${calcs.lostMoneyMonthly} ريال سعودي\nالخسارة السنوية المتوقعة: ${calcs.lostMoneyYearly} ريال سعودي\nطريقة كتابة النصوص المتبعة: ${currentStyle === "random" ? "كتابة يدوية عشوائية" : currentStyle === "basic_gpt" ? "أوامر عادية لـ ChatGPT" : "برومبتات شبه مهندسة"}\nمعدل التحويل المتوقع معنا: ${calcs.targetRate} (تحسين بمعدل ${calcs.boostFactor})\nتوفير ميزانية الإعلانات (CAC): توفير ${calcs.cacReduction}`;
                  navigator.clipboard.writeText(report);
                  setCopiedReport(true);
                  setTimeout(() => setCopiedReport(false), 2000);
                }}
                className="w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-slate-950 text-sm font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:brightness-110 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:scale-[1.01]"
              >
                {copiedReport ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-slate-950" />
                    <span>تم نسخ التقرير المالي والتشخيص بنجاح! 📊</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5 text-slate-950" />
                    <span>نسخ تقرير الفقد والتشخيص المالي لمتجرك 📊</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={scrollToAuth}
                className="w-full bg-gradient-to-r from-cyan-400 via-sky-500 to-cyan-500 text-slate-950 text-sm font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:brightness-110 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.01]"
              >
                <Key className="w-5 h-5 text-slate-950" />
                <span>أوقف تشتت الأرباح وفعل التوليد السلوكي مجاناً الآن 🚀</span>
              </button>
            )}
          </div>

        </div>
      </section>

      {/* Polite & Professional Registration Required Modal */}
      <AnimatePresence>
        {showRegisterRequired && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-cyan-500/35 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.15)] space-y-6"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-full text-cyan-400 w-16 h-16 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-pulse">
                <Lock className="w-8 h-8 text-cyan-400" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-100">مرحباً بك في مختبر الإقناع 🚀🧠</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                  لتشريح نصوصك بطريقة سيكولوجية متقدمة وحفظ التقارير التشخيصية لمتجرك، يرجى تسجيل حسابك المجاني أولاً لتفادي فقدان البيانات.
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed max-w-xs mx-auto">
                  التسجيل مجاني بالكامل، يستغرق أقل من 10 ثوانٍ ولا يتطلب أي بطاقة ائتمانية. سنقوم بحفظ بياناتك وتفعيل المحرك الفوري لك.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowRegisterRequired(false);
                    scrollToAuth();
                  }}
                  className="flex-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-500 text-slate-950 font-black text-xs sm:text-sm px-6 py-4 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all hover:scale-[1.01] cursor-pointer shadow-[0_0_25px_rgba(6,182,212,0.3)]"
                >
                  <Unlock className="w-4 h-4 text-slate-950" />
                  <span>سجل حسابك مجاناً لتشغيل التحليل فوراً 🔓</span>
                </button>
                <button
                  onClick={() => setShowRegisterRequired(false)}
                  className="bg-slate-900 border border-white/5 hover:bg-slate-800 text-slate-400 font-bold text-xs sm:text-sm px-5 py-4 rounded-xl transition-all cursor-pointer"
                >
                  إغلاق
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
