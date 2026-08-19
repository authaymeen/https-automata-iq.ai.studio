import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, AlertTriangle, Copy, Flame, Shield, Lock, Unlock, Loader2, CheckCircle2, 
  RotateCcw, Award, AlertCircle, RefreshCw, ThumbsDown, ArrowUpRight, HelpCircle
} from "lucide-react";

interface FreeTrialSuiteProps {
  isPremium?: boolean;
  isLoggedIn?: boolean;
}

const NICHES = [
  { value: "perfumes", label: "✨ عطور ومستحضرات تجميل" },
  { value: "abayas", label: "👗 عبايات وأزياء نسائية" },
  { value: "honey_dates", label: "🍯 عسل طبيعي وتمور فاخرة" },
  { value: "specialty_coffee", label: "☕ قهوة مختصة ومستلزماتها" },
  { value: "watches_accessories", label: "⌚ ساعات وإكسسوارات رجالية" },
  { value: "general", label: "📦 منتجات عامة / مجالات أخرى" }
];

const OBJECTIONS = [
  { value: "price_high", label: "💰 السعر مرتفع مقارنة بالسوق" },
  { value: "originality_trust", label: "🛡️ كيف أضمن أن المنتج أصلي وذو جودة؟" },
  { value: "shipping_delay", label: "🚚 أخشى أن يتأخر الشحن والتوصيل" },
  { value: "payment_security", label: "💳 أفضل الدفع عند الاستلام وتجربة المنتج" }
];

export default function FreeTrialSuite({ isPremium = false, isLoggedIn = false }: FreeTrialSuiteProps) {
  const [activeTab, setActiveTab] = useState<"ad-grader" | "gcc-offer" | "objection-crusher" | "cold-to-hot">("ad-grader");
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showRegisterRequired, setShowRegisterRequired] = useState<boolean>(false);

  // Attempt limits state
  const [attempts, setAttempts] = useState<Record<string, number>>({
    "ad-grader": 0,
    "gcc-offer": 0,
    "objection-crusher": 0,
    "cold-to-hot": 0
  });

  // Load attempts from localStorage on mount safely
  useEffect(() => {
    if (!isPremium) {
      let saved = "";
      try {
        saved = localStorage.getItem("pm_free_suite_attempts") || "";
      } catch (e) {
        console.warn("localStorage.getItem denied in sandboxed iframe:", e);
        // Fallback to memory via window property
        saved = (window as any).__pm_free_suite_attempts || "";
      }
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setAttempts({
            "ad-grader": parsed["ad-grader"] || 0,
            "gcc-offer": parsed["gcc-offer"] || 0,
            "objection-crusher": parsed["objection-crusher"] || 0,
            "cold-to-hot": parsed["cold-to-hot"] || 0
          });
        } catch (e) {
          console.error("Error parsing attempts", e);
        }
      }
    }
  }, [isPremium]);

  // Save attempts to localStorage safely
  const incrementAttempt = (tool: string) => {
    if (isPremium) return true;
    
    const currentAttempts = attempts[tool] || 0;
    if (currentAttempts >= 3) {
      return false;
    }

    const updated = {
      ...attempts,
      [tool]: currentAttempts + 1
    };
    setAttempts(updated);
    
    try {
      localStorage.setItem("pm_free_suite_attempts", JSON.stringify(updated));
    } catch (e) {
      console.warn("localStorage.setItem denied in sandboxed iframe:", e);
      (window as any).__pm_free_suite_attempts = JSON.stringify(updated);
    }
    return true;
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const scrollToAuth = () => {
    const element = document.getElementById("auth-portal-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.scrollTo({ top: 150, behavior: "smooth" });
    }
  };

  // ==========================================
  // TOOL 1: Ad Hook Weakness Grader
  // ==========================================
  const [adText, setAdText] = useState<string>("");
  const [adGraderResult, setAdGraderResult] = useState<any | null>(null);

  const runAdGrader = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adText.trim() || loading) return;

    if (!isLoggedIn && !isPremium) {
      setShowRegisterRequired(true);
      return;
    }

    if (!isPremium && attempts["ad-grader"] >= 3) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/public/mini-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolType: "ad-grader",
          payload: { text: adText }
        })
      });
      const data = await res.json();
      if (data.success) {
        setAdGraderResult(data.result);
        incrementAttempt("ad-grader");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // TOOL 2: GCC Irresistible Offer Generator
  // ==========================================
  const [productName, setProductName] = useState<string>("");
  const [regularPrice, setRegularPrice] = useState<string>("");
  const [targetAudience, setTargetAudience] = useState<string>("");
  const [gccOfferResult, setGccOfferResult] = useState<any | null>(null);

  const runGccOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim() || loading) return;

    if (!isLoggedIn && !isPremium) {
      setShowRegisterRequired(true);
      return;
    }

    if (!isPremium && attempts["gcc-offer"] >= 3) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/public/mini-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolType: "gcc-offer-builder",
          payload: { productName, regularPrice, targetAudience }
        })
      });
      const data = await res.json();
      if (data.success) {
        setGccOfferResult(data.result);
        incrementAttempt("gcc-offer");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // TOOL 3: Immediate Objection Crusher
  // ==========================================
  const [niche, setNiche] = useState<string>("perfumes");
  const [objection, setObjection] = useState<string>("price_high");
  const [objectionResult, setObjectionResult] = useState<any | null>(null);

  const runObjectionCrusher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!isLoggedIn && !isPremium) {
      setShowRegisterRequired(true);
      return;
    }

    if (!isPremium && attempts["objection-crusher"] >= 3) {
      return;
    }

    const selectedNicheLabel = NICHES.find(n => n.value === niche)?.label || niche;
    const selectedObjectionLabel = OBJECTIONS.find(o => o.value === objection)?.label || objection;

    setLoading(true);
    try {
      const res = await fetch("/api/public/mini-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolType: "objection-crusher",
          payload: { niche: selectedNicheLabel, objection: selectedObjectionLabel }
        })
      });
      const data = await res.json();
      if (data.success) {
        setObjectionResult(data.result);
        incrementAttempt("objection-crusher");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // TOOL 4: Cold-to-Hot Phrase Transformer
  // ==========================================
  const [coldText, setColdText] = useState<string>("");
  const [coldToHotResult, setColdToHotResult] = useState<any | null>(null);

  const runColdToHot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coldText.trim() || loading) return;

    if (!isLoggedIn && !isPremium) {
      setShowRegisterRequired(true);
      return;
    }

    if (!isPremium && attempts["cold-to-hot"] >= 3) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/public/mini-tool", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolType: "cold-to-hot",
          payload: { coldText }
        })
      });
      const data = await res.json();
      if (data.success) {
        setColdToHotResult(data.result);
        incrementAttempt("cold-to-hot");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getLimitMessage = (toolKey: string) => {
    if (isPremium) {
      return "✅ باقة مفعلة: استخدام غير محدود ♾️";
    }
    return "⚡ نسخة تجريبية مجانية";
  };

  return (
    <div className="w-full relative space-y-10" dir="rtl">
      {/* Container header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-4 py-1.5 rounded-full text-xs font-black">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>مختبر الإقناع وسيكولوجية المستهلك الخليجي ⚡</span>
        </div>
        <h3 className="text-2xl sm:text-3.5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-amber-200 to-white leading-tight">
          جرب قوة هندسة الإقناع فوراً وبالمجان 🧪
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          اختر أحد الأدوات الإقناعية الأربعة أدناه، وأدخل بياناتك لترى كيف يحول الذكاء الاصطناعي نصوصك العادية إلى قنابل مبيعات تجذب العميل الخليجي.
        </p>
      </div>

      {/* TABS SELECTOR */}
      <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-slate-900/60 border border-white/5 rounded-2xl max-w-4xl mx-auto backdrop-blur-md">
        <button
          onClick={() => setActiveTab("ad-grader")}
          className={`flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "ad-grader"
              ? "bg-amber-500 text-slate-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.2)]"
              : "text-slate-350 hover:text-slate-150"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>محلل الإعلانات والخطافات</span>
        </button>

        <button
          onClick={() => setActiveTab("gcc-offer")}
          className={`flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "gcc-offer"
              ? "bg-amber-500 text-slate-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.2)]"
              : "text-slate-350 hover:text-slate-150"
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>صانع العروض الفتاكة</span>
        </button>

        <button
          onClick={() => setActiveTab("objection-crusher")}
          className={`flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "objection-crusher"
              ? "bg-amber-500 text-slate-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.2)]"
              : "text-slate-350 hover:text-slate-150"
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>مدمر اعتراضات السلة</span>
        </button>

        <button
          onClick={() => setActiveTab("cold-to-hot")}
          className={`flex items-center gap-1.5 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "cold-to-hot"
              ? "bg-amber-500 text-slate-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.2)]"
              : "text-slate-350 hover:text-slate-150"
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>محول العبارات الباردة</span>
        </button>
      </div>

      {/* MAIN CONTAINER GRID */}
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#0b0c1b] via-[#05060f] to-[#0d0f22] border border-white/5 rounded-[28px] overflow-hidden p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.6)]">
        
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* LEFT: INPUT COLUMN */}
          <div className="w-full lg:w-5/12 flex flex-col justify-between space-y-6">
            
            {/* Header / Limit indicator */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-[11px] font-black text-slate-400 block uppercase tracking-wider">
                {activeTab === "ad-grader" && "🔎 محلل الهدر وتقييم نبرة الإعلان"}
                {activeTab === "gcc-offer" && "🔥 هندسة العرض السعودي الفوري"}
                {activeTab === "objection-crusher" && "🛡️ فك وعلاج الاعتراضات اللحظي"}
                {activeTab === "cold-to-hot" && "⚡ محول الصياغة السلوكية الحسي"}
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${isPremium ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"}`}>
                {getLimitMessage(activeTab)}
              </span>
            </div>

            {/* TAB 1: Ad Grader Form */}
            {activeTab === "ad-grader" && (
              <form onSubmit={runAdGrader} className="space-y-4">
                <div className="space-y-1.5 text-right">
                  <label className="text-xs text-slate-300 font-extrabold block">ألصق نص الإعلان أو الخطاف الحالي متضمن السعر أو العرض:</label>
                  <textarea
                    value={adText}
                    onChange={(e) => setAdText(e.target.value)}
                    placeholder="مثال: متوفر عبايات فخمة سوداء بـ 150 ريال وتوصيل مجاني، اطلب من الرابط..."
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-amber-500/50 transition-all font-medium h-32 resize-none leading-relaxed"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-slate-500 block">نصوص عينة سريعة للتجربة:</span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => setAdText("عسل سدر طبيعي 100% عليه خصم قوي اليوم فقط وشحن مجاني لجميع المناطق")}
                      className="bg-slate-900 hover:bg-slate-850 text-slate-350 hover:text-slate-150 border border-white/5 text-[10px] px-2.5 py-1.5 rounded-lg transition-all"
                    >
                      عسل سدر 🍯
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdText("عطورنا فرنسية فواحة وتدوم طويلاً بـ 180 ريال فقط اطلب الآن وتوصيل لباب بيتك")}
                      className="bg-slate-900 hover:bg-slate-850 text-slate-350 hover:text-slate-150 border border-white/5 text-[10px] px-2.5 py-1.5 rounded-lg transition-all"
                    >
                      عطور فرنسية 🧪
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !adText.trim() || (!isPremium && attempts["ad-grader"] >= 3)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:scale-[1.01] disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>جاري فحص الهدر وحساب تقييم الإقناع...</span>
                    </>
                  ) : (
                    <>
                      <Award className="w-4 h-4 text-slate-950" />
                      <span>فحص وتقييم قوة نص الإعلان 🧠</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB 2: GCC Offer Form */}
            {activeTab === "gcc-offer" && (
              <form onSubmit={runGccOffer} className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-1 text-right">
                    <label className="text-xs text-slate-300 font-extrabold block">اسم المنتج / الخدمة:</label>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="مثال: عسل المجرى الأبيض القرغيزي"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-amber-500/50 transition-all font-medium"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-right">
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300 font-extrabold block">السعر الحالي بالريال:</label>
                      <input
                        type="text"
                        value={regularPrice}
                        onChange={(e) => setRegularPrice(e.target.value)}
                        placeholder="مثال: 290"
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-amber-500/50 transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-slate-300 font-extrabold block">الجمهور المستهدف:</label>
                      <input
                        type="text"
                        value={targetAudience}
                        onChange={(e) => setTargetAudience(e.target.value)}
                        placeholder="مثال: موظفين مهتمين بصحتهم"
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-amber-500/50 transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-slate-500 block">أمثلة سريعة للتجربة:</span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setProductName("مجموعة العناية باللحية الفاخرة");
                        setRegularPrice("199");
                        setTargetAudience("شباب يبحثون عن مظهر كلاسيكي أنيق");
                      }}
                      className="bg-slate-900 hover:bg-slate-850 text-slate-350 hover:text-slate-150 border border-white/5 text-[10px] px-2.5 py-1.5 rounded-lg transition-all"
                    >
                      مجموعة اللحية 🧔🏻
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setProductName("عباية الصيف الباردة من الكتان");
                        setRegularPrice("250");
                        setTargetAudience("موظفات وجامعيات يبحثن عن الراحة اليومية");
                      }}
                      className="bg-slate-900 hover:bg-slate-850 text-slate-350 hover:text-slate-150 border border-white/5 text-[10px] px-2.5 py-1.5 rounded-lg transition-all"
                    >
                      عباية صيفية 👗
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !productName.trim() || (!isPremium && attempts["gcc-offer"] >= 3)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:scale-[1.01] disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>جاري صياغة العرض السلوكي والضمان الفتاك...</span>
                    </>
                  ) : (
                    <>
                      <Flame className="w-4 h-4 text-slate-950" />
                      <span>صياغة العرض الخليجي المغري 🔥</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB 3: Objection Crusher Form */}
            {activeTab === "objection-crusher" && (
              <form onSubmit={runObjectionCrusher} className="space-y-4">
                <div className="space-y-3 text-right">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-extrabold block">مجال أو تخصص متجرك الإلكتروني:</label>
                    <select
                      value={niche}
                      onChange={(e) => setNiche(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50 transition-all font-medium"
                    >
                      {NICHES.map((n) => (
                        <option key={n.value} value={n.value} className="bg-slate-950 text-slate-200">
                          {n.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-slate-300 font-extrabold block">الاعتراض أو الشك الأكثر تكراراً من العملاء:</label>
                    <select
                      value={objection}
                      onChange={(e) => setObjection(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50 transition-all font-medium"
                    >
                      {OBJECTIONS.map((o) => (
                        <option key={o.value} value={o.value} className="bg-slate-950 text-slate-200">
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-white/5">
                  💡 تلميح: سيتكفل مدمر الاعتراضات باستنباط الحاجز النفسي الفعلي للعميل، وصياغة رد واتساب إقناعي يدفعه للتسوق فوراً مع نص وقائي لصفحة السلة.
                </p>

                <button
                  type="submit"
                  disabled={loading || (!isPremium && attempts["objection-crusher"] >= 3)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:scale-[1.01] disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>جاري مد التمكين وتوليد رد الإغلاق الحاسم...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 text-slate-950" />
                      <span>تدمير الاعتراض وبناء رد الإغلاق 🛡️</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB 4: Cold-to-Hot Form */}
            {activeTab === "cold-to-hot" && (
              <form onSubmit={runColdToHot} className="space-y-4">
                <div className="space-y-1.5 text-right">
                  <label className="text-xs text-slate-300 font-extrabold block">ألصق عبارة باردة/وصف منتج عادي وممل تستخدمه:</label>
                  <textarea
                    value={coldText}
                    onChange={(e) => setColdText(e.target.value)}
                    placeholder="مثال: جزمة رياضية خفيفة ومريحة للمشي والرياضة ومصنوعة من مواد كويسة ومتينة..."
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-amber-500/50 transition-all font-medium h-32 resize-none leading-relaxed"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-slate-500 block">عبارات باردة شائعة للتجربة:</span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => setColdText("دهن عود كمبودي رائحته حلوة وممتازة وثابتة وسعره مخفض لفترة محدودة")}
                      className="bg-slate-900 hover:bg-slate-850 text-slate-350 hover:text-slate-150 border border-white/5 text-[10px] px-2.5 py-1.5 rounded-lg transition-all"
                    >
                      دهن عود 🪵
                    </button>
                    <button
                      type="button"
                      onClick={() => setColdText("ساعة يد كلاسيك بتصميم جديد ورائع جداً ومناسبة للدوام والمناسبات")}
                      className="bg-slate-900 hover:bg-slate-850 text-slate-350 hover:text-slate-150 border border-white/5 text-[10px] px-2.5 py-1.5 rounded-lg transition-all"
                    >
                      ساعة يد ⌚
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !coldText.trim() || (!isPremium && attempts["cold-to-hot"] >= 3)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:scale-[1.01] disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>جاري إثارة نصوصك الحافلة بالمزايا...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 text-slate-950" />
                      <span>تحويل العبارة لجاذبية ساخنة ⚡</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

          {/* RIGHT: RESULTS COLUMN & BLOCKED OVERLAY */}
          <div className="w-full lg:w-7/12 bg-slate-950/80 border border-white/5 rounded-2xl p-5 sm:p-6 relative min-h-[420px] flex flex-col justify-between overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
            
            {/* Limit Overlay Blocker */}
            {!isPremium && (attempts[activeTab] >= 3) && (
              <div className="absolute inset-0 bg-[#050610]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-25">
                <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-full text-amber-400 mb-3.5 shadow-[0_0_20px_rgba(245,158,11,0.3)] animate-bounce">
                  <Lock className="w-6 h-6 text-amber-400" />
                </div>
                <h4 className="text-lg font-black text-slate-100 mb-1">انتهت محاولاتك المجانية الـ 3 لمختبر الإقناع 🔒</h4>
                <p className="text-xs text-slate-400 max-w-md leading-relaxed mb-6">
                  لقد استنفدت جميع محاولاتك المجانية لتشريح النصوص وتجربة هذه الأداة الفتاكة. إذا كنت ترغب بالاستمرار بهندسة مبيعاتك وعكس منافسيك بلا حدود، يمكنك الاشتراك في <span className="text-amber-400 font-bold">الباقة الألترا (ULTRA)</span> للحصول على استخدام غير محدود!
                </p>
                <button
                  onClick={scrollToAuth}
                  className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs px-6 py-3.5 rounded-xl flex items-center gap-2 hover:brightness-110 transition-all hover:scale-[1.01] cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                >
                  <Unlock className="w-4 h-4 text-slate-950" />
                  <span>اشترك بالباقة الألترا واستمر بلا حدود 🔓</span>
                </button>
              </div>
            )}

            {/* Results Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="text-xs font-black text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>المخرجات الإقناعية المهندسة سلوكياً</span>
              </span>
              <span className="text-[10px] font-mono text-slate-650 uppercase">POWER_ENGINE_v3.5</span>
            </div>

            {/* Default State (Idle) */}
            {!loading && 
              ((activeTab === "ad-grader" && !adGraderResult) ||
               (activeTab === "gcc-offer" && !gccOfferResult) ||
               (activeTab === "objection-crusher" && !objectionResult) ||
               (activeTab === "cold-to-hot" && !coldToHotResult)) && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center border border-white/5 text-slate-600">
                  <RefreshCw className="w-6 h-6 text-slate-500" />
                </div>
                <h5 className="font-extrabold text-sm text-slate-350">بانتظار إدخال البيانات والضغط على التوليد...</h5>
                <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                  سيقوم محرك هندسة الإقناع بتحليل المعطيات ومحاكاة تطلعات العميل ومكافحة مقاومته للبيع في ثوانٍ معدودة.
                </p>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full border-2 border-amber-500/10 border-t-2 border-t-amber-400 animate-spin" />
                  <Sparkles className="w-5 h-5 text-amber-400 absolute inset-0 m-auto animate-pulse" />
                </div>
                <h5 className="font-extrabold text-sm text-amber-400 animate-pulse">جاري الاستدعاء ومحاكاة استجابة الجمهور...</h5>
                <p className="text-[11px] text-slate-550 max-w-xs leading-relaxed text-center">
                  يقوم المحرك بقياس مستويات الحذر وصياغة بدائل معجلة بالإقناع وفق الأصول الخليجية المعتمدة.
                </p>
              </div>
            )}

            {/* ==========================================
                RESULTS RENDERING
                ========================================== */}
            {!loading && (
              <div className="flex-1 mt-4 space-y-4 text-right">
                
                {/* TOOL 1 RESULT */}
                {activeTab === "ad-grader" && adGraderResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3 bg-slate-900/60 p-3 rounded-xl border border-white/5">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-black text-xl shadow-lg border ${
                        ["A+", "A", "A-"].includes(adGraderResult.rating) 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : ["B+", "B", "B-"].includes(adGraderResult.rating)
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }`}>
                        {adGraderResult.rating}
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block font-bold">تقييم قوة الإقناع العام:</span>
                        <span className="text-xs font-bold text-slate-200">
                          {["A+", "A", "A-"].includes(adGraderResult.rating) && "قوي وجذاب للغاية للعميل الخليجي 🎯"}
                          {["B+", "B", "B-"].includes(adGraderResult.rating) && "مقبول ولكن يتضمن بعض التسريب الإقناعي ⚠️"}
                          {["C+", "C", "D", "F"].includes(adGraderResult.rating) && "تسريب لغوي وضعف شديد في جذب العميل 🛑"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] text-rose-400 font-extrabold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>مكامن الهدر والتسريب الإقناعي في النص:</span>
                      </span>
                      <p className="text-xs text-slate-350 bg-slate-900/40 p-3 rounded-xl border border-white/5 leading-relaxed font-light">
                        {adGraderResult.leakDescription}
                      </p>
                    </div>

                    <div className="space-y-1.5 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-emerald-400 font-extrabold flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5" />
                          <span>الخطاف والنص المقترح البديل (جاهز للنسخ):</span>
                        </span>
                        <button
                          onClick={() => handleCopy(adGraderResult.superiorRewrite, "grader-rewrite")}
                          className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copiedId === "grader-rewrite" ? "تم النسخ!" : "نسخ النص المطور"}</span>
                        </button>
                      </div>
                      <p className="text-xs text-slate-100 bg-[#040c11] p-3.5 rounded-xl border border-cyan-500/10 leading-relaxed font-mono font-medium">
                        {adGraderResult.superiorRewrite}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] text-slate-400 font-extrabold block">لماذا تضمن الصياغة الجديدة زيادة معدل التحويل؟</span>
                      <p className="text-xs text-slate-350 leading-relaxed font-light">
                        {adGraderResult.whyItWorks}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* TOOL 2 RESULT */}
                {activeTab === "gcc-offer" && gccOfferResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="bg-slate-900/60 p-3.5 rounded-xl border border-white/5 space-y-1">
                      <span className="text-[10px] text-amber-400 font-extrabold block">العنوان المبتكر لحملة العرض:</span>
                      <h4 className="text-base font-black text-slate-100">👑 {gccOfferResult.offerTitle}</h4>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-900/40 p-3 rounded-xl border border-white/5 space-y-1.5">
                        <span className="text-[10px] text-slate-450 font-bold block">📦 تفاصيل باقة العرض الفتاكة:</span>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                          {gccOfferResult.bundleDescription}
                        </p>
                      </div>

                      <div className="bg-slate-900/40 p-3 rounded-xl border border-white/5 space-y-1.5">
                        <span className="text-[10px] text-slate-450 font-bold block">💰 السعر وقيمة التوفير:</span>
                        <p className="text-[11px] text-emerald-400 font-black leading-relaxed">
                          {gccOfferResult.priceDetail}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] text-slate-400 font-extrabold block">🛡️ محفزات الثقة والضمانات الموصى بها:</span>
                      <p className="text-xs text-slate-300 bg-[#03151c]/60 p-3 rounded-xl border border-cyan-500/10 leading-relaxed font-light">
                        {gccOfferResult.trustBoosters}
                      </p>
                    </div>

                    <div className="space-y-1.5 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-cyan-400 font-extrabold block">💬 نص إعلاني قصير ترويجي للعرض للنسخ:</span>
                        <button
                          onClick={() => handleCopy(gccOfferResult.adCopySnippet, "gcc-offer-ad")}
                          className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copiedId === "gcc-offer-ad" ? "تم النسخ!" : "نسخ النص الإعلاني"}</span>
                        </button>
                      </div>
                      <p className="text-xs text-slate-200 bg-slate-900/90 p-3.5 rounded-xl border border-white/5 leading-relaxed font-mono">
                        {gccOfferResult.adCopySnippet}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* TOOL 3 RESULT */}
                {activeTab === "objection-crusher" && objectionResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] text-amber-400 font-extrabold block">🧠 الدافع السيكولوجي الخلفي للاعتراض:</span>
                      <p className="text-xs text-slate-350 bg-slate-900/40 p-3 rounded-xl border border-white/5 leading-relaxed font-light">
                        {objectionResult.psychologicalReason}
                      </p>
                    </div>

                    <div className="space-y-1.5 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-emerald-400 font-extrabold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>الرد القاتل للواتساب (جاهز للنسخ والإغلاق فوراً):</span>
                        </span>
                        <button
                          onClick={() => handleCopy(objectionResult.whatsappWinningReply, "whatsapp-winning")}
                          className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copiedId === "whatsapp-winning" ? "تم النسخ!" : "نسخ رد الواتساب"}</span>
                        </button>
                      </div>
                      <p className="text-xs text-slate-100 bg-[#031513] p-3.5 rounded-xl border border-emerald-500/10 leading-relaxed font-mono font-medium whitespace-pre-line">
                        {objectionResult.whatsappWinningReply}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] text-slate-400 font-extrabold block">🛒 نص وقائي لصفحة الهبوط لمنع الاعتراض مسبقاً:</span>
                      <p className="text-xs text-slate-300 bg-slate-900/40 p-3 rounded-xl border border-white/5 leading-relaxed font-light">
                        {objectionResult.checkoutBannerText}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* TOOL 4 RESULT */}
                {activeTab === "cold-to-hot" && coldToHotResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-500 font-extrabold block">العبارة الأصلية الباردة ❄️:</span>
                      <p className="text-xs text-slate-400 bg-slate-900/20 p-2.5 rounded-lg border border-white/5 leading-relaxed line-through decoration-rose-500/40">
                        {coldToHotResult.coldPhrase || coldText}
                      </p>
                    </div>

                    <div className="space-y-1.5 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-emerald-400 font-extrabold flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 animate-pulse" />
                          <span>الصياغة الساخنة المستثيرة للمبيعات 🔥:</span>
                        </span>
                        <button
                          onClick={() => handleCopy(coldToHotResult.hotPhrase, "hot-phrase")}
                          className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copiedId === "hot-phrase" ? "تم النسخ!" : "نسخ العبارة الساخنة"}</span>
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-100 bg-[#120707] p-3.5 rounded-xl border border-rose-500/10 leading-relaxed font-mono font-bold">
                        {coldToHotResult.hotPhrase}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] text-slate-400 font-extrabold block">المحفزات السيكولوجية المستخدمة في الترقية اللغوية:</span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {coldToHotResult.psychologicalTriggersUsed && coldToHotResult.psychologicalTriggersUsed.map((trigger: string, idx: number) => (
                          <span key={idx} className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-lg">
                            📌 {trigger}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-cyan-400 font-extrabold block">📹 فكرة ومقدمة لفيديو قصير / ريلز استثاري:</span>
                        <button
                          onClick={() => handleCopy(coldToHotResult.sensoryHook, "sensory-hook")}
                          className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{copiedId === "sensory-hook" ? "تم النسخ!" : "نسخ المقدمة"}</span>
                        </button>
                      </div>
                      <p className="text-xs text-slate-350 bg-slate-900/40 p-3 rounded-xl border border-white/5 leading-relaxed font-light">
                        {coldToHotResult.sensoryHook}
                      </p>
                    </div>
                  </motion.div>
                )}

              </div>
            )}

            {/* Bottom info banner */}
            <div className="border-t border-white/5 pt-3 mt-4 flex items-center justify-between text-[10px] text-slate-500">
              <span>* المخرجات مدعومة بنظام Prompt Master السلوكي لأسواق الخليج العربي 🎯</span>
              <span>معدل التحويل المتوقع للمحتوى المطور: +3.8x 🚀</span>
            </div>

          </div>

        </div>

      </div>

      {/* Polite & Professional Registration Required Modal for Free Suite */}
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
              className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-amber-500/35 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center relative overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.15)] space-y-6"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-full text-amber-400 w-16 h-16 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(245,158,11,0.15)] animate-pulse">
                <Lock className="w-8 h-8 text-amber-400" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-black text-slate-100">مرحباً بك في أدوات الإقناع الذكية! 🎯🧠</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                  لتشغيل أدوات هندسة الإقناع وتطوير محتواك فوراً، يرجى تسجيل حسابك المجاني في ثوانٍ معدودة لتفادي فقدان صياغاتك وحفظ مبيعاتك.
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed max-w-xs mx-auto">
                  التسجيل يستغرق أقل من 10 ثوانٍ ولا يتطلب أي بطاقة ائتمانية. يتيح لك النظام حفظ أعمالك مجاناً بالكامل.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowRegisterRequired(false);
                    scrollToAuth();
                  }}
                  className="flex-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs sm:text-sm px-6 py-4 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all hover:scale-[1.01] cursor-pointer shadow-[0_0_25px_rgba(245,158,11,0.3)]"
                >
                  <Unlock className="w-4 h-4 text-slate-950" />
                  <span>سجل حسابك مجاناً لتشغيل الأدوات 🔓</span>
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
