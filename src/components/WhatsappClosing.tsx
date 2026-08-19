import React, { useState } from "react";
import { 
  Sparkles, Loader2, Copy, Check, MessageSquare, ShieldCheck, HelpCircle, PhoneCall 
} from "lucide-react";
import { WhatsappClosingResponse } from "../types";

interface WhatsappClosingProps {
  email: string;
}

export default function WhatsappClosing({ email }: WhatsappClosingProps) {
  const [selectedObjection, setSelectedObjection] = useState("السعر غالي مرة، حصلته أرخص بمتجر ثاني!");
  const [customObjection, setCustomObjection] = useState("");
  const [agentName, setAgentName] = useState("سارة من خدمة العملاء");
  const [agentTone, setAgentTone] = useState("ودود ومطمئن وباني ثقة (Friendly & Soft)");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WhatsappClosingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Copy states
  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedWinning, setCopiedWinning] = useState(false);

  const predefinedObjections = [
    "السعر غالي مرة، حصلته أرخص بمتجر ثاني!",
    "هل المنتج أصلي 100%؟ كيف أضمن جودته؟",
    "كم يستغرق التوصيل؟ هل تشحنون لمدينتي؟",
    "أخاف أطلب وما يناسبني أو يطلع المقاس خطأ!",
    "هل أقدر أدفع بعد الاستلام؟ أو أقسط الفاتورة؟"
  ];

  const tones = [
    "ودود ومطمئن وباني ثقة (Friendly & Soft)",
    "احترافي وحازم وبمنهجية الضمان (Professional & Safe)",
    "سريع ومباشر وموجه نحو الإغلاق الفوري (Sales-oriented)"
  ];

  const handleRun = async () => {
    const finalObjection = customObjection.trim() || selectedObjection;
    if (!finalObjection) {
      setError("برجاء اختيار اعتراض أو كتابة اعتراض مخصص.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/whatsapp-closing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, objection: finalObjection, agentName, agentTone })
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.result);
      } else {
        setError(data.error || "حدث خطأ أثناء صياغة ردود الإغلاق.");
      }
    } catch (err) {
      setError("فشل الاتصال بالشبكة. يرجى المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  const copyScriptToText = () => {
    if (!result) return;
    const formatted = result.conversationalScript.map((turn) => {
      const role = turn.sender === "buyer" ? "المشتري 👤" : `خدمة العملاء (${agentName}) 🎧`;
      return `${role}:
${turn.message}`;
    }).join("\n\n");

    navigator.clipboard.writeText(formatted);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const copyWinningReply = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.winningReply);
    setCopiedWinning(true);
    setTimeout(() => setCopiedWinning(false), 2000);
  };

  return (
    <div className="space-y-6 text-right" dir="rtl">
      <div>
        <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-400" />
          <span>ردود واتساب وإغلاق الصفقات (WhatsApp Objection Closing)</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
          يتعرض التجار لخسارة 70% من السلات المتروكة بسبب تردد العميل على واتساب. حدد اعتراض المشتري الخليجي، ليقوم محرك 
          <strong className="text-slate-200"> Prompt Master AI </strong> 
          ببناء سيناريو إغلاق حواري تكتيكي، مع توليد الرد الذهبي الحاسم الجاهز للنسخ الفوري.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Objection Configuration Side */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800/80 rounded-xl p-5 space-y-4">
          
          {/* Predefined Objections */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-2 block">
              اختر أحد اعتراضات المشترين الشائعة بالخليج:
            </label>
            <div className="space-y-1.5">
              {predefinedObjections.map((ob, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedObjection(ob);
                    setCustomObjection(""); // Reset custom objection
                  }}
                  className={`w-full text-right p-2.5 rounded-lg text-xs font-medium border transition cursor-pointer flex items-center justify-between ${
                    selectedObjection === ob && !customObjection
                      ? "bg-indigo-500/10 border-indigo-500 text-indigo-300"
                      : "bg-slate-950 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-850"
                  }`}
                >
                  <span>{ob}</span>
                  <span className="text-[10px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-500">سؤال {idx + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Objection Input */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              أو اكتب اعتراضاً مخصصاً هنا:
            </label>
            <input
              type="text"
              value={customObjection}
              onChange={(e) => {
                setCustomObjection(e.target.value);
                setSelectedObjection(""); // Deselect predefined
              }}
              placeholder="مثال: ليش التوصيل غالي؟ أو أريد الدفع بفيزا الراجحي..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Agent Name */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                اسم ممثل خدمة العملاء:
              </label>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="اسم العميل"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            {/* Agent Tone Style */}
            <div>
              <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
                أسلوب ونبرة الرد:
              </label>
              <select
                value={agentTone}
                onChange={(e) => setAgentTone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                {tones.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleRun}
            disabled={loading}
            className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-extrabold py-3 px-4 rounded-lg text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-500/10"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                جاري صياغة حوار الإغلاق التكتيكي...
              </>
            ) : (
              <>
                <PhoneCall className="w-4 h-4" />
                توليد ردود وسيناريو الإغلاق 💬
              </>
            )}
          </button>
        </div>

        {/* Results / Simulated Whatsapp Screen */}
        <div className="lg:col-span-7 min-h-[400px] space-y-4">
          {loading ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center h-full text-center space-y-4">
              <Loader2 className="w-10 h-10 animate-spin text-indigo-400" />
              <div className="space-y-1">
                <p className="font-bold text-slate-200 text-sm">جاري محاكاة واتساب وصياغة الرد الذكي</p>
                <p className="text-xs text-indigo-400 font-medium animate-pulse">
                  نقوم الآن ببناء حوار تفاعلي لحل المشكلة وإقناع المشتري، مع تحضير الرد القاتل الجاهز للإرسال...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-6 flex flex-col items-center justify-center h-full text-center space-y-3">
              <p className="text-red-400 text-sm">⚠️ {error}</p>
            </div>
          ) : result ? (
            <div className="space-y-4">
              
              {/* WhatsApp Interface Simulation */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
                <div className="bg-slate-950 border-b border-slate-800 px-4 py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                    <span className="text-xs font-bold text-slate-200">محاكاة سيناريو محادثة واتساب (WhatsApp Simulator)</span>
                  </div>
                  <button
                    onClick={copyScriptToText}
                    className="bg-slate-900 hover:bg-slate-800 text-[10px] text-slate-300 px-2.5 py-1.5 rounded border border-slate-800 transition flex items-center gap-1 cursor-pointer"
                  >
                    {copiedScript ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedScript ? "تم النسخ" : "نسخ الحوار الكامل"}</span>
                  </button>
                </div>

                {/* Chat Bubbles Container */}
                <div className="p-4 space-y-3 max-h-[300px] overflow-y-auto bg-slate-950/40">
                  {result.conversationalScript.map((turn, tIdx) => {
                    const isBuyer = turn.sender === "buyer";
                    return (
                      <div 
                        key={tIdx} 
                        className={`flex flex-col max-w-[85%] ${isBuyer ? "self-start text-left" : "self-end mr-auto text-right"}`}
                      >
                        <span className="text-[9px] text-slate-500 font-bold mb-0.5 px-1.5">
                          {isBuyer ? "المشتري (اعتراض) 👤" : `خدمة العملاء (${agentName}) 🎧`}
                        </span>
                        <div 
                          className={`p-3 rounded-xl text-xs leading-relaxed ${
                            isBuyer 
                              ? "bg-slate-800 text-slate-200 rounded-tr-none" 
                              : "bg-indigo-500/10 border border-indigo-500/20 text-indigo-100 rounded-tl-none"
                          }`}
                        >
                          {turn.message}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* The Winning Reply Ready to Copy */}
              <div className="bg-slate-900 border-2 border-indigo-500/30 rounded-xl p-5 space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-extrabold text-slate-200">الرد الحاسم والمقنع (Winning Reply) — جاهز للنسخ:</span>
                  </div>
                  <button
                    onClick={copyWinningReply}
                    className="bg-indigo-500 text-slate-950 hover:bg-indigo-600 text-[10px] font-extrabold px-3.5 py-1.5 rounded-lg transition flex items-center gap-1 cursor-pointer"
                  >
                    {copiedWinning ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedWinning ? "تم نسخ الرد الحاسم!" : "نسخ الرد لإرساله"}</span>
                  </button>
                </div>

                <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
                  {result.winningReply}
                </div>
              </div>

              {/* Close Tips */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                <span className="text-[10px] text-slate-400 font-bold block border-b border-slate-800 pb-1.5">💎 نصائح وتكتيكات إغلاق سريعة للواتساب (CRO Closing Hacks):</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {result.closeTips.map((tip, idx) => (
                    <div key={idx} className="bg-slate-950 p-2.5 rounded border border-slate-850 text-[11px] text-slate-300 leading-relaxed flex gap-2">
                      <span className="text-indigo-400 font-bold">💡</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="p-4 bg-slate-900 rounded-full border border-slate-800 text-indigo-400">
                <MessageSquare className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1.5 max-w-sm">
                <h3 className="font-bold text-slate-200 text-sm">في انتظار تحديد نوع الاعتراض</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  اختر أحد الاعتراضات من القائمة أو اكتب اعتراضاً مخصصاً لتبديد شكوك العميل فوراً ومحاكاة محادثة واتساب نموذجية ناجحة.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
