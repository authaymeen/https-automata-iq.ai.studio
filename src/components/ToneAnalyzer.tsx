import React, { useState } from "react";
import { Sparkles, Loader2, Copy, Check, Info, Bot, Type } from "lucide-react";

interface ToneResult {
  detectedTone: string;
  vocabularyStyle: string;
  pacingAndStructure: string;
  promptSnippet: string;
}

interface ToneAnalyzerProps {
  email: string;
}

export default function ToneAnalyzer({ email }: ToneAnalyzerProps) {
  const [sampleText, setSampleText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ToneResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleAnalyze = async () => {
    if (!sampleText.trim()) {
      setError("الرجاء إدخال عينة من نص العلامة التجارية أولاً.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/prompt/tone-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, sampleText })
      });
      const data = await response.json();
      if (data.success) {
        setResult(data.result);
      } else {
        setError(data.error || "فشل تحليل نبرة الصوت. يرجى التحقق من الاشتراك.");
      }
    } catch (err) {
      setError("حدث خطأ في الشبكة، يرجى إعادة المحاولة.");
    } finally {
      setLoading(false);
    }
  };

  const copySnippet = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.promptSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      <div>
        <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Bot className="w-5 h-5 text-amber-400" />
          <span>محلل نبرة الصوت الاحترافي (Tone of Voice Analyzer)</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
          الصق عينة نصية من حسابات براند منافس، أو نصوص من متجر تود محاكاة نبرته التسويقية. سيقوم المحرك بفحص الأسلوب اللغوي وبناء صياغة أمر تضمن دمج هذه النبرة في كل أوامرك القادمة.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input box */}
        <div className="lg:col-span-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2">عينة النص التسويقي:</label>
            <textarea
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              placeholder="مثال: مرحباً عملائنا الفخمين، عطرنا الجديد مستوحى من فخامة البخور وعمق الهيل، تفرّد بحضورك أينما ذهبت..."
              rows={6}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 resize-none font-sans"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md shadow-amber-500/10 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>جاري قراءة وتحليل النبرة...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>تحليل نبرة الصوت وصياغة الأمر</span>
              </>
            )}
          </button>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg text-center font-bold">
              {error}
            </div>
          )}
        </div>

        {/* Output box */}
        <div className="lg:col-span-7 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
          {result ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-3.5 space-y-1">
                  <span className="text-[10px] text-amber-400 font-bold">النبرة المكتشفة</span>
                  <p className="text-xs text-slate-200 font-extrabold">{result.detectedTone}</p>
                </div>
                <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-3.5 space-y-1">
                  <span className="text-[10px] text-cyan-400 font-bold font-mono">طبيعة المفردات</span>
                  <p className="text-xs text-slate-200">{result.vocabularyStyle}</p>
                </div>
              </div>

              <div className="bg-slate-950/40 border border-slate-800 rounded-xl p-4 space-y-2">
                <span className="text-[10px] text-indigo-400 font-bold block">التركيبة البنائية والإيقاع</span>
                <p className="text-xs text-slate-300 leading-relaxed">{result.pacingAndStructure}</p>
              </div>

              <div className="bg-slate-950 border border-amber-500/20 rounded-xl p-4 space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 left-0 bg-amber-500/5 py-1 px-3 border-b border-amber-500/10 flex justify-between items-center">
                  <span className="text-[9px] text-amber-400 font-bold font-mono">[PRO SNIPPET] صياغة النبرة المجهزة للأوامر</span>
                  <button
                    onClick={copySnippet}
                    className="text-slate-400 hover:text-slate-100 flex items-center gap-1 text-[9px] transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>نسخ الكود</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="text-[11px] text-amber-300/90 whitespace-pre-wrap font-mono pt-4 leading-relaxed">
                  {result.promptSnippet}
                </pre>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-slate-500 space-y-2">
              <Bot className="w-10 h-10 text-slate-700 animate-pulse" />
              <p className="text-xs">بانتظار العينة اللغوية لبدء تحليل النبرة وصياغة موجه الإقناع الخاص بها...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
