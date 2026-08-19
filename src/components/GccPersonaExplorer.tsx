import React, { useState } from "react";
import { 
  UserCheck, Sparkles, Loader2, Copy, Check, ShieldAlert, Award, Search, Info, Sliders, Heart, CheckSquare
} from "lucide-react";
import { GccPersonaResponse } from "../types";

interface GccPersonaExplorerProps {
  email: string;
}

export default function GccPersonaExplorer({ email }: GccPersonaExplorerProps) {
  const [productCategory, setProductCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GccPersonaResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Copy helpers
  const [copiedQuote, setCopiedQuote] = useState(false);
  const [copiedProfile, setCopiedProfile] = useState(false);
  const [copiedHooks, setCopiedHooks] = useState(false);

  const examples = [
    "عبايات نسائية فاخرة ومطرزة بالرياض",
    "عطور عود ملكية بتركيز عالي شتوي",
    "القهوة المختصة ومستلزمات التقطير المنزلي",
    "أجهزة تدليك الظهر والعمود الفقري للأمهات"
  ];

  const handleGenerate = async () => {
    if (!productCategory.trim()) {
      setError("برجاء إدخال مجال المنتج أولاً.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/gcc-persona", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, productCategory })
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.result);
      } else {
        setError(data.error || "حدث خطأ أثناء سبر غور الشخصية الشرائية.");
      }
    } catch (err) {
      setError("فشل الاتصال بالشبكة. يرجى المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text: string, callback: (flag: boolean) => void) => {
    navigator.clipboard.writeText(text);
    callback(true);
    setTimeout(() => callback(false), 2000);
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Tool Header */}
      <div className="flex items-start gap-3 border-b border-white/5 pb-4">
        <div className="bg-sky-500/10 border border-sky-500/20 p-2.5 rounded-xl shrink-0">
          <UserCheck className="w-5 h-5 text-sky-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-extrabold text-slate-100">مستكشف الشخصيات الخليجية وسيكولوجيا الشراء (GCC Buyer Persona Explorer) 👤</h4>
            <span className="text-[9px] bg-sky-500/15 border border-sky-500/30 text-sky-400 px-2 py-0.5 rounded-md font-bold">باقة ULTRA النيون 💎</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
            لا تطلق إعلاناً عشوائياً! حدد بالضبط من هو عميلك المستهدف في السعودية أو الخليج. هذا المحرك يمنحك بروفايل سيكولوجي كامل (أوجاعه، رغباته المخفية، موانع الشراء لديه، والخطافات الأكثر تأثيراً عليه).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/60 border border-white/5 p-4 rounded-2xl space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-300 block">أدخل تصنيف، نيش، أو مجال منتجك:</label>
              <div className="relative">
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  placeholder="مثال: عطور عود فاخرة شتوية"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl pr-10 pl-3 py-2.5 text-xs text-slate-100 placeholder:text-slate-650 focus:outline-none focus:border-sky-500/50 transition-colors font-sans"
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-sky-400 to-cyan-500 text-slate-950 py-3 rounded-xl text-xs font-black hover:shadow-[0_0_15px_rgba(56,189,248,0.25)] hover:brightness-105 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-950" />
                  <span>جاري استكشاف وتحليل الشخصية...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                  <span>سبر غور شخصية المشتري الخليجي</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Examples */}
          <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-3.5 space-y-2">
            <span className="text-[10px] text-slate-500 font-bold block">نماذج مجالات سريعة:</span>
            <div className="grid grid-cols-1 gap-2">
              {examples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setProductCategory(ex)}
                  className="text-right p-2.5 rounded-xl border border-white/5 hover:border-sky-500/20 bg-slate-900/40 text-[11px] hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  <span className="font-semibold text-slate-300">🔍 {ex}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel (7 cols) */}
        <div className="lg:col-span-7">
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-2xl text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!result && !loading && !error && (
            <div className="h-full min-h-[300px] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-center p-6 text-slate-500 bg-slate-950/20">
              <UserCheck className="w-10 h-10 text-slate-650 mb-3 animate-pulse" />
              <h5 className="font-bold text-xs text-slate-400">تحليل سيكولوجيا الشراء لعميلك المستهدف</h5>
              <p className="text-[10px] text-slate-500 max-w-sm mt-1 leading-relaxed">
                اكتب تصنيف منتجك أو المجال التسويقي، واكتشف بروفايل العميل المثالي المحاكي لواقع السوق السعودي والخليجي لتعديل برومبتاتك الإعلانية بناءً عليها!
              </p>
            </div>
          )}

          {loading && (
            <div className="h-full min-h-[300px] border border-white/5 bg-slate-900/20 rounded-2xl flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="relative">
                <UserCheck className="w-12 h-12 text-sky-500/30 animate-spin" style={{ animationDuration: "3s" }} />
                <Sparkles className="absolute top-0 right-0 w-4 h-4 text-sky-400 animate-ping" />
              </div>
              <div className="space-y-1">
                <h5 className="font-extrabold text-xs text-slate-300">جاري استدعاء المعطيات وتحليل سلوك المستهلك بالخليج...</h5>
                <p className="text-[10px] text-slate-500 max-w-xs leading-relaxed">
                  نبحث في المحركات النفسية، رغبات التميز، الخوف من الخسارة، وأكبر التحفظات التي تمنع عميل الخليج من وضع بطاقته الائتمانية.
                </p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-5">
              
              {/* Persona Profile Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/5 rounded-2xl p-4 sm:p-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-24 h-24 bg-sky-500/5 rounded-full blur-xl pointer-events-none" />
                
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="text-[10px] text-sky-400 font-bold uppercase tracking-wider">البروفايل السيكولوجي المقترح:</div>
                    <h3 className="text-base font-black text-slate-100 flex items-center gap-1.5">
                      <Sliders className="w-4.5 h-4.5 text-sky-400" />
                      <span>{result.name}</span>
                    </h3>
                  </div>
                  
                  <button
                    onClick={() => copyText(`الاسم: ${result.name}\nالديموغرافيا: ${result.demographics}\nالفلسفة: ${result.quote}`, setCopiedProfile)}
                    className="text-[10px] text-slate-400 hover:text-slate-100 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedProfile ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>نسخ الملف</span>
                  </button>
                </div>

                {/* Quote Block */}
                <div className="mt-4 bg-slate-950 border-r-2 border-sky-400 p-3 rounded-l-xl text-xs font-medium italic text-slate-300 leading-relaxed">
                  &quot;{result.quote}&quot;
                </div>

                {/* Demographics Box */}
                <div className="mt-4 bg-slate-950/50 p-3.5 rounded-xl border border-white/5 space-y-1.5">
                  <div className="text-[10px] text-slate-500 font-bold">المواصفات العامة والديموغرافيا (السن، الدخل، المنصات):</div>
                  <p className="text-[11px] text-slate-300 font-medium leading-relaxed">{result.demographics}</p>
                </div>
              </div>

              {/* Pains and Desires Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Pain Points */}
                <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-4 space-y-2.5">
                  <h4 className="text-xs font-black text-rose-400 flex items-center gap-1.5 border-b border-white/5 pb-2">
                    <ShieldAlert className="w-4 h-4" />
                    <span>أبرز 3 آلام ومخاوف يمر بها:</span>
                  </h4>
                  <ul className="space-y-2">
                    {result.pains.map((pain, idx) => (
                      <li key={idx} className="text-[11px] text-slate-300 flex items-start gap-2 bg-slate-950/60 p-2 rounded-xl border border-white/5">
                        <span className="w-2 h-2 rounded-full bg-rose-500 mt-1 shrink-0 animate-pulse" />
                        <span className="leading-relaxed">{pain}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Core Desires */}
                <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-4 space-y-2.5">
                  <h4 className="text-xs font-black text-emerald-400 flex items-center gap-1.5 border-b border-white/5 pb-2">
                    <Heart className="w-4 h-4" />
                    <span>رغباته الخفية وما يطمح إليه:</span>
                  </h4>
                  <ul className="space-y-2">
                    {result.desires.map((desire, idx) => (
                      <li key={idx} className="text-[11px] text-slate-300 flex items-start gap-2 bg-slate-950/60 p-2 rounded-xl border border-white/5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0 animate-pulse" />
                        <span className="leading-relaxed">{desire}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Buying Objections */}
              <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-4 sm:p-5 space-y-3">
                <h4 className="text-xs font-black text-amber-400 flex items-center gap-1.5 border-b border-white/5 pb-2">
                  <Award className="w-4 h-4" />
                  <span>موانع وتحفظات الشراء لديه (أكبر اعتراضات):</span>
                </h4>
                <ul className="space-y-2.5">
                  {result.objections.map((obj, idx) => (
                    <li key={idx} className="text-[11px] text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-white/5 leading-relaxed">
                      <span className="text-amber-400 font-mono text-[10px] ml-1.5">[{idx + 1}]</span>
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best Copywriting Angles / Hooks */}
              <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-xs font-black text-sky-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>الخطافات وزوايا الكتابة الإعلانية الفعالة معه:</span>
                  </span>
                  <button
                    onClick={() => copyText(result.bestHooks.join("\n"), setCopiedHooks)}
                    className="text-[10px] text-slate-400 hover:text-slate-100 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedHooks ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>نسخ الخطافات</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-2.5">
                  {result.bestHooks.map((hook, idx) => (
                    <div key={idx} className="bg-slate-950 border border-white/5 rounded-xl p-3 flex items-start gap-2 text-right">
                      <span className="bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0">زاية {idx + 1}</span>
                      <p className="text-xs font-bold text-slate-200 leading-relaxed">{hook}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
