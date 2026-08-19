import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, Sparkles, Loader2, Copy, Check, ShieldAlert, Award, 
  Search, Sliders, TrendingUp, AlertCircle, ArrowUpRight, Cpu
} from "lucide-react";

interface CompetitorUrlAnalyzerProps {
  email: string;
}

interface AnalysisResult {
  brandPositioning: string;
  suspectedHooks: string[];
  pricingTriggers: string;
  vulnerabilities: string[];
  counterCampaign: {
    hook: string;
    offer: string;
    adCopy: string;
  };
}

export default function CompetitorUrlAnalyzer({ email }: CompetitorUrlAnalyzerProps) {
  const [url, setUrl] = useState("");
  const [niche, setNiche] = useState("beauty"); // beauty, fashion, electronics, home
  const [extraNotes, setExtraNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Copied states
  const [copiedAd, setCopiedAd] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("الرجاء إدخال رابط متجر المنافس أولاً.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/ultra/analyze-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, url, niche, extraNotes })
      });
      const data = await response.json();
      if (data.success) {
        setResult(data.result);
      } else {
        setError(data.error || "فشل تحليل صفحة هبوط المنافس، يرجى التحقق من اشتراك باقة ULTRA.");
      }
    } catch (err) {
      setError("حدث خطأ أثناء الاتصال بالخادم. يرجى إعادة المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  const copyAdCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.counterCampaign.adCopy);
    setCopiedAd(true);
    setTimeout(() => setCopiedAd(false), 2000);
  };

  return (
    <div className="space-y-6 text-right" dir="rtl" id="url-analyzer-wrapper">
      <div>
        <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Globe className="w-5 h-5 text-sky-400 animate-pulse" />
          <span>محلل هندسة صفحات هبوط المنافسين الذكي (Simulated Landing Page Intelligence)</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          بصفتك مشتركاً في باقة ULTRA، يمكنك إدخال رابط صفحة هبوط أو متجر المنافس الإلكتروني بالخليج ليقوم محرك الذكاء الفني بتحليل تموضعهم الإستراتيجي، تفكيك عروضهم النفسية، كشف الثغرات التسويقية، وصياغة حملة إعلانية نارية مضادة تكتسح مبيعاتهم!
        </p>
      </div>

      <form onSubmit={handleAnalyze} className="bg-slate-950/60 border border-slate-900 rounded-2xl p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-6 space-y-1.5">
            <label className="text-xs font-bold text-slate-300 block">رابط متجر أو صفحة هبوط المنافس (URL):</label>
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://competitorbrand.com/products/oud-perfume"
                className="w-full bg-slate-900 border border-white/5 rounded-xl pl-4 pr-10 py-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-sky-500/50 text-left"
                dir="ltr"
              />
              <Search className="w-4 h-4 text-slate-500 absolute top-3.5 right-3.5" />
            </div>
          </div>

          <div className="md:col-span-3 space-y-1.5">
            <label className="text-xs font-bold text-slate-300 block">مجال وتخصص المتجر:</label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full bg-slate-900 border border-white/5 rounded-xl px-3 py-3 text-xs text-slate-300 focus:outline-none focus:border-sky-500/50 cursor-pointer"
            >
              <option value="beauty">🧴 العطور ومستحضرات التجميل</option>
              <option value="fashion">👗 العبايات والأزياء والموضة</option>
              <option value="electronics">📱 الإلكترونيات وملحقات الهواتف</option>
              <option value="home">🏠 مستلزمات المنزل والمطبخ الذكي</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="w-full bg-sky-500 hover:bg-sky-600 text-slate-950 text-xs font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-sky-500/10"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>جاري سحب وفك شفرات الصفحة...</span>
                </>
              ) : (
                <>
                  <Cpu className="w-4 h-4 text-slate-950" />
                  <span>حلل وفكك عروض المنافس 🧬</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-300 block">ملاحظات إضافية عن المنافس (اختياري):</label>
          <input
            type="text"
            value={extraNotes}
            onChange={(e) => setExtraNotes(e.target.value)}
            placeholder="مثال: يركزون على الخصم الكبير ولديهم مشكلة في التوصيل لبعض المناطق..."
            className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500/50"
          />
        </div>
      </form>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-4 rounded-xl text-center font-bold">
          {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Analysis Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Brand Positioning Box */}
              <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-5 space-y-3">
                <span className="text-[10px] text-sky-400 font-extrabold block">التموضع التسويقي للمنافس (Strategic Positioning):</span>
                <h4 className="text-sm font-extrabold text-slate-200">التموضع والرسالة المدروسة للمنافس:</h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-black/30 p-3.5 rounded-xl border border-white/5">
                  {result.brandPositioning}
                </p>
              </div>

              {/* Pricing & Offer Trigger psychology */}
              <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-5 space-y-3">
                <span className="text-[10px] text-amber-400 font-extrabold block">علم النفس التسعيري للمنافس (Pricing Psychology):</span>
                <h4 className="text-sm font-extrabold text-slate-200">الترغيب والعرض الفعال الحالي بصفحتهم:</h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-black/30 p-3.5 rounded-xl border border-white/5">
                  {result.pricingTriggers}
                </p>
              </div>

              {/* Exploited Psychological Hooks */}
              <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-5 space-y-3">
                <span className="text-[10px] text-emerald-400 font-extrabold block">الخطافات السلوكية ونقاط الألم المستغلة (Emotional Hooks):</span>
                <h4 className="text-sm font-extrabold text-slate-200">الأوتار النفسية التي يضربون عليها:</h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {result.suspectedHooks.map((hook, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-900 p-2.5 rounded-lg border border-white/5">
                      <Sparkles className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{hook}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suspected Brand Vulnerabilities */}
              <div className="bg-slate-950/80 border border-slate-900 rounded-2xl p-5 space-y-3">
                <span className="text-[10px] text-rose-400 font-extrabold block">الثغرات ونقاط الضعف بالصفحة (Vulnerabilities):</span>
                <h4 className="text-sm font-extrabold text-slate-200">الفجوات التي يمكنك استغلالها للتغلب عليهم:</h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {result.vulnerabilities.map((v, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-900 p-2.5 rounded-lg border border-white/5">
                      <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                      <span>{v}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Counter Campaign Crafting Section */}
            <div className="bg-gradient-to-r from-sky-950/40 via-slate-950/80 to-slate-950 border border-sky-500/25 rounded-3xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-sky-400 animate-bounce" />
                <div>
                  <h4 className="text-base font-extrabold text-slate-100">صياغة الاستجابة المضادة (The Counter-Attack Campaign) 🏆</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">تم صياغة زوايا العروض هذه لتعويض وتخطي كل فجوة تسويقية للمنافس فوراً.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-1.5">
                  <span className="text-[10px] text-sky-400 font-bold block">خطاف الإثارة البديل (Superior Hook):</span>
                  <p className="text-xs text-slate-200 font-bold leading-relaxed">{result.counterCampaign.hook}</p>
                </div>
                <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-1.5">
                  <span className="text-[10px] text-sky-400 font-bold block">الهيكل الإقناعي وعرض التغلب (Kill Offer):</span>
                  <p className="text-xs text-slate-200 font-bold leading-relaxed">{result.counterCampaign.offer}</p>
                </div>
              </div>

              {/* Suggested Superior Ad Copy */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-sky-400 font-bold block">النص الإعلاني المقترح للتفوق التام (Ad Copy Script):</span>
                  <button
                    onClick={copyAdCopy}
                    className="text-sky-400 hover:text-sky-300 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                  >
                    {copiedAd ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedAd ? "تم النسخ!" : "نسخ النص الإعلاني المضاد"}</span>
                  </button>
                </div>
                <div className="bg-black/40 border border-sky-500/10 rounded-2xl p-5 text-right relative">
                  <pre className="text-xs text-slate-300 leading-relaxed font-sans whitespace-pre-wrap">
                    {result.counterCampaign.adCopy}
                  </pre>
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
