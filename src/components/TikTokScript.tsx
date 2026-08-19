import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Video, Sparkles, Loader2, Copy, Check, Tv, AlertCircle, Play, Music, Info, HelpCircle
} from "lucide-react";
import { TikTokScriptResponse } from "../types";

interface TikTokScriptProps {
  email: string;
}

export default function TikTokScript({ email }: TikTokScriptProps) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [scriptStyle, setScriptStyle] = useState("عفوي ومسلي وطريف (Casual & Comedic)");
  const [videoLength, setVideoLength] = useState("30 ثانية (خاطف)");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TikTokScriptResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Copy helpers
  const [copiedHookIdx, setCopiedHookIdx] = useState<number | null>(null);
  const [copiedSceneIdx, setCopiedSceneIdx] = useState<number | null>(null);
  const [copiedTips, setCopiedTips] = useState(false);

  const styleOptions = [
    "عفوي ومسلي وطريف (Casual & Comedic)",
    "قصصي درامي غامض (Mysterious storytelling)",
    "فخم جداً ووجاهة اجتماعية (Ultra Prestige)",
    "تعليمي / حل مشكلة واضحة (Problem-Solving)",
    "مقارنة صادمة قبل وبعد (Before & After)"
  ];

  const lengthOptions = [
    "15 ثانية (فائق السرعة)",
    "30 ثانية (خاطف ومقنع)",
    "60 ثانية (شرح تفصيلي)",
    "90 ثانية (مراجعة كاملة)"
  ];

  const examples = [
    {
      name: "منظم عطور خشبي فاخر مضيء",
      desc: "قاعدة خشبية طبيعية 100% مع إضاءة نيون هادئة تتسع لـ 12 عطر، تعطي تسريحتك هيبة وفخامة بالليل وتمنع كسر الزجاج.",
      style: "فخم جداً ووجاهة اجتماعية (Ultra Prestige)",
      length: "30 ثانية (خاطف ومقنع)"
    },
    {
      name: "مبخّرة ذكية متنقلة للشعر والملابس",
      desc: "مبخرة إلكترونية تسخن في ثانيتين، آمنة ومزودة بفرشاة للشعر ورأس مخصص لتبخير الثياب بدون خوف من الاحتراق.",
      style: "عفوي ومسلي وطريف (Casual & Comedic)",
      length: "15 ثانية (فائق السرعة)"
    }
  ];

  const handleGenerate = async () => {
    if (!productName.trim()) {
      setError("برجاء إدخال اسم المنتج أو الخدمة أولاً.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/tiktok-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, productName, productDescription, scriptStyle, videoLength })
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.result);
      } else {
        setError(data.error || "حدث خطأ أثناء صياغة السيناريو.");
      }
    } catch (err) {
      setError("فشل الاتصال بالشبكة. يرجى المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text: string, index: number, isHook: boolean) => {
    navigator.clipboard.writeText(text);
    if (isHook) {
      setCopiedHookIdx(index);
      setTimeout(() => setCopiedHookIdx(null), 2000);
    } else {
      setCopiedSceneIdx(index);
      setTimeout(() => setCopiedSceneIdx(null), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-6"
      dir="rtl"
    >
      {/* Tool Header */}
      <div className="flex items-start gap-3 border-b border-white/5 pb-4">
        <div className="bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl shrink-0">
          <Video className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-extrabold text-slate-100">صانع سيناريو وخطافات التيك توك وفيديوهات المنتجات 🎬</h4>
            <span className="text-[9px] bg-amber-500/15 border border-amber-500/30 text-amber-400 px-2 py-0.5 rounded-md font-bold">باقة PRO الذهبية 🏆</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
            توقف عن الهدر الإعلاني! صمم سيناريوهات إعلانية قصيرة (TikTok, Reels, Snapchat) تضرب زوايا الإقناع في الـ 3 ثوانٍ الأولى وتضمن بقاء العميل للشراء.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/60 border border-white/5 p-4 rounded-2xl space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-300 block">اسم المنتج أو الخدمة المعروضة:</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="مثال: مبخرة النيون الذكية"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/45 transition-colors font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-300 block">تفاصيل أو ميزات لافتة للمنتج (اختياري):</label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="تساعدنا التفاصيل في توليد قصة وسيناريو ملائم جداً للمنتج..."
                rows={3}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-100 placeholder:text-slate-650 focus:outline-none focus:border-amber-500/45 transition-colors font-sans leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-300 block">أسلوب السيناريو:</label>
                <select
                  value={scriptStyle}
                  onChange={(e) => setScriptStyle(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-2 py-2.5 text-[11px] text-slate-200 focus:outline-none focus:border-amber-500/45 cursor-pointer"
                >
                  {styleOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-300 block">طول الفيديو:</label>
                <select
                  value={videoLength}
                  onChange={(e) => setVideoLength(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-2 py-2.5 text-[11px] text-slate-200 focus:outline-none focus:border-amber-500/45 cursor-pointer"
                >
                  {lengthOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 py-3 rounded-xl text-xs font-black hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:brightness-105 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-950" />
                  <span>جاري صياغة قصة وسيناريو النيون...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                  <span>توليد سيناريو الفيديو الإعلاني</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Examples */}
          <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-3.5 space-y-2">
            <span className="text-[10px] text-slate-500 font-bold block">نماذج سريعة للتجربة:</span>
            <div className="grid grid-cols-1 gap-2">
              {examples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setProductName(ex.name);
                    setProductDescription(ex.desc);
                    setScriptStyle(ex.style);
                    setVideoLength(ex.length);
                  }}
                  className="text-right p-2.5 rounded-xl border border-white/5 hover:border-amber-500/20 bg-slate-900/40 text-[11px] hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  <div className="font-extrabold text-amber-300">{ex.name}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">{ex.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Output Panel (7 cols) */}
        <div className="lg:col-span-7">
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-2xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!result && !loading && !error && (
            <div className="h-full min-h-[300px] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-center p-6 text-slate-500 bg-slate-950/20">
              <Tv className="w-10 h-10 text-slate-650 mb-3 animate-pulse" />
              <h5 className="font-bold text-xs text-slate-400">سيناريو تيك توك متكامل جاهز للتصوير</h5>
              <p className="text-[10px] text-slate-500 max-w-sm mt-1 leading-relaxed">
                أدخل اسم منتجك، واختر أسلوبك التسويقي وسيقوم المحرك بتوليد خطافات بصرية وصوتية دقيقة تجبر عملاءك على شراء منتجك فوراً!
              </p>
            </div>
          )}

          {loading && (
            <div className="h-full min-h-[300px] border border-white/5 bg-slate-900/20 rounded-2xl flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="relative">
                <Video className="w-12 h-12 text-amber-500/30 animate-spin" style={{ animationDuration: "3s" }} />
                <Sparkles className="absolute top-0 right-0 w-4 h-4 text-amber-400 animate-ping" />
              </div>
              <div className="space-y-1">
                <h5 className="font-extrabold text-xs text-slate-300">جاري التحليل النفسي وهندسة المشاهد الإعلانية...</h5>
                <p className="text-[10px] text-slate-500 max-w-xs leading-relaxed">
                  نقوم بصياغة خطافات (Hooks) مدروسة وتوزيع الحوار والإرشاد البصري بناءً على السلوك الشرائي لرواد منصات التواصل بالخليج.
                </p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-5">
              
              {/* Hooks Section */}
              <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-1.5 text-amber-400 font-extrabold text-xs">
                  <Play className="w-4 h-4 text-amber-400" />
                  <span>الخطافات الصوتية المقترحة لأول 3 ثوانٍ (تبدأ الفيديو بإحداها):</span>
                </div>
                
                <div className="grid grid-cols-1 gap-2.5">
                  {result.hooks.map((hook, idx) => (
                    <div key={idx} className="bg-slate-950 border border-white/5 rounded-xl p-3 flex items-center justify-between gap-3 text-right">
                      <p className="text-xs font-extrabold text-slate-200 leading-relaxed">
                        <span className="text-amber-400 font-mono text-[10px] ml-1">#{idx + 1}</span> {hook}
                      </p>
                      <button
                        onClick={() => copyText(hook, idx, true)}
                        className="p-2 bg-slate-900 border border-white/5 rounded-lg text-slate-400 hover:text-slate-100 transition-colors shrink-0 cursor-pointer"
                        title="نسخ الخطاف"
                      >
                        {copiedHookIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Music and Vibe */}
              <div className="bg-slate-950/40 border border-amber-500/20 p-3.5 rounded-xl flex items-center gap-3">
                <Music className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 font-bold">نمط الموسيقى والمؤثرات الصوتية المقترحة:</div>
                  <div className="text-xs font-extrabold text-slate-300 mt-0.5">{result.musicStyle}</div>
                </div>
              </div>

              {/* Step-by-Step Script Scenes */}
              <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-4 sm:p-5 space-y-4">
                <div className="text-xs font-extrabold text-slate-100 flex items-center gap-1.5 border-b border-white/5 pb-2.5">
                  <Video className="w-4 h-4 text-amber-400" />
                  <span>المخطط التفصيلي للسيناريو والمشاهد الإعلانية</span>
                </div>

                <div className="space-y-4">
                  {result.script.map((scene, idx) => (
                    <div key={idx} className="border border-white/5 bg-slate-950/60 rounded-xl overflow-hidden text-right">
                      <div className="bg-slate-950 px-3.5 py-2 border-b border-white/5 flex justify-between items-center">
                        <span className="text-[11px] font-black text-amber-400">{scene.scene}</span>
                        <button
                          onClick={() => copyText(`[${scene.scene}]\nالبصري: ${scene.visual}\nالصوتي: ${scene.audio}`, idx, false)}
                          className="text-[9px] text-slate-500 hover:text-slate-300 flex items-center gap-1 cursor-pointer"
                        >
                          {copiedSceneIdx === idx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>نسخ المشهد</span>
                        </button>
                      </div>
                      
                      <div className="p-3.5 space-y-3">
                        <div className="space-y-1">
                          <div className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            <span>المشهد البصري (كتابة إرشادية للمصور):</span>
                          </div>
                          <p className="text-[11px] text-slate-300 bg-cyan-500/5 border border-cyan-500/10 p-2.5 rounded-lg leading-relaxed">{scene.visual}</p>
                        </div>

                        <div className="space-y-1">
                          <div className="text-[10px] text-slate-500 font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            <span>الحوار الصوتي والتعليق (VO / أمام الكاميرا):</span>
                          </div>
                          <p className="text-xs text-slate-100 font-bold bg-slate-950 border border-white/5 p-3 rounded-lg leading-relaxed">{scene.audio}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversion Tips */}
              <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1.5">
                    <Info className="w-4 h-4" />
                    <span>نصائح ذهبية لتصوير وإنتاج هذا الفيديو باحترافية:</span>
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(result.conversionTips.join("\n"));
                      setCopiedTips(true);
                      setTimeout(() => setCopiedTips(false), 2000);
                    }}
                    className="text-[9px] text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    {copiedTips ? "تم النسخ!" : "نسخ النصائح"}
                  </button>
                </div>

                <ul className="space-y-2 list-none">
                  {result.conversionTips.map((tip, idx) => (
                    <li key={idx} className="text-[11px] text-slate-300 flex items-start gap-2 bg-slate-950 p-2.5 rounded-xl border border-white/5">
                      <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] px-1.5 py-0.5 rounded-md font-mono shrink-0">✔</span>
                      <span className="leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}

        </div>
      </div>
    </motion.div>
  );
}
