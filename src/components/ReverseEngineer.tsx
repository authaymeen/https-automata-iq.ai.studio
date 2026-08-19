import React, { useState } from "react";
import { 
  Sparkles, Loader2, Copy, Check, Users, Target, ArrowLeftRight, HelpCircle 
} from "lucide-react";
import { ReverseEngineerResponse } from "../types";

interface ReverseEngineerProps {
  email: string;
}

export default function ReverseEngineer({ email }: ReverseEngineerProps) {
  const [competitorCopy, setCompetitorCopy] = useState("");
  const [platform, setPlatform] = useState("TikTok Ads");
  const [country, setCountry] = useState("المملكة العربية السعودية 🇸🇦");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReverseEngineerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Copy flags
  const [copiedDemographics, setCopiedDemographics] = useState(false);
  const [copiedPsychographics, setCopiedPsychographics] = useState(false);
  const [copiedSuperior, setCopiedSuperior] = useState(false);

  const platforms = ["TikTok Ads", "Snapchat Ads", "Instagram & Facebook", "Google Ads"];
  const countries = [
    "المملكة العربية السعودية 🇸🇦",
    "الإمارات العربية المتحدة 🇦🇪",
    "دولة الكويت 🇰🇼",
    "دولة قطر 🇶🇦",
    "سلطنة عمان 🇴🇲",
    "مملكة البحرين 🇧🇭"
  ];

  // Quick examples to auto-fill
  const examples = [
    {
      title: "إعلان عطر رجالي منافس",
      text: "خصم 50% على عطر الفخامة الملكي. عطر يدوم طويلا برائحة العود الفاخرة للرجال الأنيقين. اطلب الآن والدفع عند الاستلام مع شحن مجاني.",
      platform: "Snapchat Ads",
      country: "المملكة العربية السعودية 🇸🇦"
    },
    {
      title: "وصف منتج مكنسة ذكية منافس",
      text: "مكنسة كهربائية ذكية تنظف البيت بضغطة زر وتدعم التحكم بالهاتف. مريحة جدا للأمهات والزوجات وموفرة للوقت. جودة عالية وضمان سنة كاملة.",
      platform: "TikTok Ads",
      country: "الإمارات العربية المتحدة 🇦🇪"
    }
  ];

  const handleRun = async () => {
    if (!competitorCopy.trim()) {
      setError("برجاء إدخال النص الإعلاني أو زاوية المنافس أولاً.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/reverse-engineer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, competitorCopy, platform, country })
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.result);
      } else {
        setError(data.error || "حدث خطأ أثناء الاتصال بالخادم.");
      }
    } catch (err) {
      setError("فشل الاتصال بالشبكة. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, setFlag: (flag: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setFlag(true);
    setTimeout(() => setFlag(false), 2000);
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      <div>
        <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5 text-amber-500" />
          <span>الهندسة العكسية للمنافسين (Reverse Engineering)</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
          قم بلصق النص الإعلاني الحالي لأي منافس، أو صياغة عرضه البدائي. سيقوم محرك 
          <strong className="text-slate-200"> Prompt Master AI </strong> 
          بتفكيك زاوية العميل النفسية، ثم إعادة صياغة نص تسويقي متفوق يضرب في الصميم ويحقق أعلى معدل تحويل (CRO).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Inputs */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800/80 rounded-xl p-5 space-y-4">
          {/* Quick Examples */}
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-2">أمثلة سريعة للتجربة:</span>
            <div className="flex flex-wrap gap-2">
              {examples.map((ex, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setCompetitorCopy(ex.text);
                    setPlatform(ex.platform);
                    setCountry(ex.country);
                  }}
                  className="bg-slate-950 hover:bg-slate-800 text-[11px] text-slate-300 px-2.5 py-1.5 rounded-lg border border-slate-800 transition text-right cursor-pointer"
                >
                  {ex.title}
                </button>
              ))}
            </div>
          </div>

          {/* Competitor Ad Copy */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              نص إعلان المنافس أو فكرته:
            </label>
            <textarea
              rows={5}
              value={competitorCopy}
              onChange={(e) => setCompetitorCopy(e.target.value)}
              placeholder="الصق هنا النص الإعلاني للمنافس، أو صفحة هبوطه، أو الفكرة العامة التي يعلن بها..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Target Platform */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                منصة الإعلان المقترحة:
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {platforms.map((plat) => (
                  <option key={plat} value={plat}>{plat}</option>
                ))}
              </select>
            </div>

            {/* Target GCC Country */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                الدولة المستهدفة بالخليج:
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleRun}
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-extrabold py-3 px-4 rounded-lg text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                جاري تفكيك وهندسة المنافس بالذكاء الاصطناعي...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                هندسة عكسية وتفوق تسويقي 🔥
              </>
            )}
          </button>
        </div>

        {/* Output Report */}
        <div className="lg:col-span-7 min-h-[400px]">
          {loading ? (
            <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-8 flex flex-col items-center justify-center h-full text-center space-y-4">
              <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
              <div className="space-y-1">
                <p className="font-bold text-slate-200 text-sm">جاري التفكيك وصياغة الهجوم التسويقي</p>
                <p className="text-xs text-amber-500 font-medium animate-pulse">
                  نقوم الآن بتحليل الجمهور المستهدف، تفكيك الدوافع، وصياغة نسخة إعلانية خليجية مميزة...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-6 flex flex-col items-center justify-center h-full text-center space-y-3">
              <p className="text-red-400 text-sm">⚠️ {error}</p>
            </div>
          ) : result ? (
            <div className="space-y-4">
              {/* Audience Analysis Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <Users className="w-4 h-4 text-amber-500" />
                  <h4 className="font-bold text-xs text-slate-200">تحليل الجمهور الخليجي المستهدف للفكرة:</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/50 space-y-1.5 relative">
                    <button
                      onClick={() => copyToClipboard(result.audience.demographics, setCopiedDemographics)}
                      className="absolute top-3 left-3 text-slate-500 hover:text-slate-300 p-1 rounded hover:bg-slate-800"
                    >
                      {copiedDemographics ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-[10px] text-amber-400 font-bold block">1. الديموغرافيا (الدخل والسن والموقع):</span>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">{result.audience.demographics}</p>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/50 space-y-1.5 relative">
                    <button
                      onClick={() => copyToClipboard(result.audience.psychographics, setCopiedPsychographics)}
                      className="absolute top-3 left-3 text-slate-500 hover:text-slate-300 p-1 rounded hover:bg-slate-800"
                    >
                      {copiedPsychographics ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-[10px] text-amber-400 font-bold block">2. السيكوغرافيا (الرغبات والمخاوف العميقة):</span>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">{result.audience.psychographics}</p>
                  </div>
                </div>
              </div>

              {/* Hook & Pain Points */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
                  <span className="text-[10px] text-amber-500 font-extrabold block">🎯 الزاوية النفسية المكتشفة (Hook):</span>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">{result.hook}</p>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
                  <span className="text-[10px] text-amber-500 font-extrabold block">🔥 نقطة الألم المستغلة (Pain Point):</span>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">{result.painPoint}</p>
                </div>
              </div>

              {/* Superior copy-pasteable copywriting */}
              <div className="bg-slate-900 border-2 border-amber-500/30 rounded-xl p-5 space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="bg-amber-500/10 text-amber-400 text-[10px] px-2 py-0.5 rounded font-bold">نسخة متفوقة عالية التحويل</span>
                    <h4 className="font-extrabold text-xs text-slate-200">النص التسويقي المقترح (Ready To Use):</h4>
                  </div>
                  <button
                    onClick={() => copyToClipboard(result.superiorCopy, setCopiedSuperior)}
                    className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-300 px-3 py-1.5 rounded-lg transition flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSuperior ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSuperior ? "تم نسخ النص!" : "نسخ الكود بالكامل"}</span>
                  </button>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
                  {result.superiorCopy}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-8 flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="p-4 bg-slate-900 rounded-full border border-slate-800 text-amber-500">
                <ArrowLeftRight className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1.5 max-w-sm">
                <h3 className="font-bold text-slate-200 text-sm">في انتظار نص المنافس</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  أدخل إعلان منافس أو اضغط على أحد الأمثلة السريعة بالأعلى لتفكيكه وهندسته عكسياً وصناعة إعلان يسحق أرقامه!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
