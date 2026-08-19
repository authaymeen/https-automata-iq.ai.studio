import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Mail, MessageSquare, Sparkles, Loader2, Copy, Check, ShoppingBag, AlertCircle, Info, Lock, Zap
} from "lucide-react";
import { AbandonedCartResponse } from "../types";

interface AbandonedCartProps {
  email: string;
}

export default function AbandonedCart({ email }: AbandonedCartProps) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [couponCode, setCouponCode] = useState("CART10");
  const [incentive, setIncentive] = useState("خصم 10% إضافي + شحن مجاني للمنزل 🚚");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AbandonedCartResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Copy helpers
  const [copiedSMS1, setCopiedSMS1] = useState(false);
  const [copiedEmailSub, setCopiedEmailSub] = useState(false);
  const [copiedEmailBody, setCopiedEmailBody] = useState(false);
  const [copiedSMS2, setCopiedSMS2] = useState(false);
  const [copiedTips, setCopiedTips] = useState(false);

  const examples = [
    {
      name: "عباية مخملية كلاسيكية مطرزة يدوياً",
      desc: "عباية فاخرة للمناسبات الرسمية والزيارات، مصنوعة من أفضل خامات المخمل والحرير، ضد الوبر وسهلة الكي والتعليق.",
      coupon: "EID20",
      incentive: "خصم 20% لفترة العيد + تفصيل مجاني حسب قياسك ✂"
    },
    {
      name: "مجموعة العناية الفائقة بلحية وجلد الرجال",
      desc: "زيوت ترطيب عضوية ومغدية لمنع الحكة وقشرة اللحية، برائحة الصندل والعنبر المميزة وتغليف فاخر مناسب كهدية.",
      coupon: "BEARD15",
      incentive: "خصم 15% + شحن مجاني فوري لمدن المملكة 🇸🇦"
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
      const res = await fetch("/api/abandoned-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, productName, productDescription, couponCode, incentive })
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.result);
      } else {
        setError(data.error || "حدث خطأ أثناء صياغة حملة السلات المتروكة.");
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
        <div className="bg-sky-500/10 border border-sky-500/20 p-2.5 rounded-xl shrink-0">
          <ShoppingBag className="w-5 h-5 text-sky-400" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-extrabold text-slate-100">مولد حملات السلات المتروكة الذكية (Abandoned Cart Campaign) 🛒</h4>
            <span className="text-[9px] bg-sky-500/15 border border-sky-500/30 text-sky-400 px-2 py-0.5 rounded-md font-bold">باقة ULTRA النيون 💎</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
            استرجع ما يقارب 30% من مبيعاتك المفقودة! هذا المحرك يصيغ لك تتابعاً نارياً مقنعاً لرسائل SMS والبريد الإلكتروني للعملاء الذين وضعوا منتجات في السلة ولم يكملوا الدفع، باستغلال حوافز تابي وتمارا والضمان الذهبي.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/60 border border-white/5 p-4 rounded-2xl space-y-4">
            
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-300 block">اسم المنتج المتواجد بالسلة المتروكة:</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="مثال: طقم العطور الملكي الثلاثي"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 transition-colors font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-300 block">تفاصيل المنتج والفوائد (اختياري):</label>
              <textarea
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                placeholder="تفاصيل المنتج أو مزاياه التي تجعله يندم على ترك السلة..."
                rows={3}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-650 focus:outline-none focus:border-sky-500/50 transition-colors font-sans leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-300 block">كوبون خصم الإغراء:</label>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="مثال: CART10"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 transition-colors font-mono uppercase"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-300 block">الميزة المضافة أو الشحن:</label>
                <input
                  type="text"
                  value={incentive}
                  onChange={(e) => setIncentive(e.target.value)}
                  placeholder="مثال: شحن مجاني كامل للبيت"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-slate-100 placeholder:text-slate-650 focus:outline-none focus:border-sky-500/50 transition-colors"
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-sky-400 to-cyan-500 text-slate-950 py-3.5 rounded-xl text-xs font-black hover:shadow-[0_0_15px_rgba(56,189,248,0.25)] hover:brightness-105 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-950" />
                  <span>جاري هندسة وإعداد حملة الاسترجاع...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                  <span>توليد حملة استرجاع السلة 🚀</span>
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
                    setCouponCode(ex.coupon);
                    setIncentive(ex.incentive);
                  }}
                  className="text-right p-2.5 rounded-xl border border-white/5 hover:border-sky-500/20 bg-slate-900/40 text-[11px] hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  <div className="font-extrabold text-sky-300">{ex.name}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">{ex.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results (7 cols) */}
        <div className="lg:col-span-7">
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-2xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!result && !loading && !error && (
            <div className="h-full min-h-[300px] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-center p-6 text-slate-500 bg-slate-950/20">
              <MessageSquare className="w-10 h-10 text-slate-650 mb-3 animate-pulse" />
              <h5 className="font-bold text-xs text-slate-400">تتابع رسائل استرداد السلة الإقناعي</h5>
              <p className="text-[10px] text-slate-500 max-w-sm mt-1 leading-relaxed">
                اكتب تفاصيل ومغريات الشراء، واحصل على رسالتين قصيرتين (SMS) مع رسالة بريد إلكتروني تفصيلية صممت للتغلب على التردد وتحقيق قفزة في المبيعات المستردة.
              </p>
            </div>
          )}

          {loading && (
            <div className="h-full min-h-[300px] border border-white/5 bg-slate-900/20 rounded-2xl flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="relative">
                <ShoppingBag className="w-12 h-12 text-sky-500/30 animate-spin" style={{ animationDuration: "3s" }} />
                <Sparkles className="absolute top-0 right-0 w-4 h-4 text-sky-400 animate-ping" />
              </div>
              <div className="space-y-1">
                <h5 className="font-extrabold text-xs text-slate-300">جاري صياغة الكلمات وصناعة الفضول والندم العاطفي...</h5>
                <p className="text-[10px] text-slate-500 max-w-xs leading-relaxed">
                  نصوغ جملاً مبنية على استعجال العميل، مدمجة بخصومات وكوبونات خاصة لإغلاق الصفقات المتوقفة.
                </p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-5">
              
              {/* Step 1: SMS 1 */}
              <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-xs font-black text-sky-400 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4" />
                    <span>الخطوة 1: رسالة الـ SMS الأولى (بعد ساعة واحدة)</span>
                  </span>
                  <button
                    onClick={() => copyText(result.sms1Urgent, setCopiedSMS1)}
                    className="text-[10px] text-slate-400 hover:text-slate-100 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSMS1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>نسخ الرسالة</span>
                  </button>
                </div>
                <div className="bg-slate-950 border border-white/5 rounded-xl p-3 text-xs leading-relaxed text-slate-100 font-sans" dir="rtl">
                  {result.sms1Urgent}
                </div>
                <div className="text-[10px] text-slate-500">
                  💡 ترسل هذه الرسالة مباشرةً لتذكير العميل بسلته قبل نسيانها، مع الحفاظ على نبرة ودودة وخفيفة.
                </div>
              </div>

              {/* Step 2: Email */}
              <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-xs font-black text-sky-400 flex items-center gap-1.5">
                    <Mail className="w-4 h-4" />
                    <span>الخطوة 2: بريد إلكتروني دافئ ومركّز (بعد 24 ساعة)</span>
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-500 font-bold">عنوان البريد (Subject Line):</span>
                      <button
                        onClick={() => copyText(result.emailFollowup.subject, setCopiedEmailSub)}
                        className="text-[9px] text-slate-500 hover:text-slate-300 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedEmailSub ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>نسخ العنوان</span>
                      </button>
                    </div>
                    <div className="bg-slate-950 border border-white/5 rounded-xl p-2.5 text-xs font-extrabold text-slate-200">
                      {result.emailFollowup.subject}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-500 font-bold">محتوى البريد (Email Body):</span>
                      <button
                        onClick={() => copyText(result.emailFollowup.body, setCopiedEmailBody)}
                        className="text-[9px] text-slate-500 hover:text-slate-300 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedEmailBody ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>نسخ المحتوى</span>
                      </button>
                    </div>
                    <pre className="bg-slate-950 border border-white/5 rounded-xl p-4 text-xs leading-relaxed text-slate-300 font-sans whitespace-pre-wrap text-right">
                      {result.emailFollowup.body}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Step 3: SMS 2 */}
              <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-xs font-black text-rose-400 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4" />
                    <span>الخطوة 3: رسالة الـ SMS الثانية والأخيرة (بعد 48 ساعة)</span>
                  </span>
                  <button
                    onClick={() => copyText(result.sms2Guarantee, setCopiedSMS2)}
                    className="text-[10px] text-slate-400 hover:text-slate-100 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSMS2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>نسخ الرسالة</span>
                  </button>
                </div>
                <div className="bg-slate-950 border border-white/5 rounded-xl p-3 text-xs leading-relaxed text-slate-100 font-sans" dir="rtl">
                  {result.sms2Guarantee}
                </div>
                <div className="text-[10px] text-slate-500">
                  ⚠️ ترسل كعنصر حسم أخير، نلعب فيها على عامل الندرة، الخوف من فوات الخصم الحصري، وتأكيد الضمان الذهبي لتبديد أي مخاوف متبقية.
                </div>
              </div>

              {/* Recovery Tips */}
              <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 sm:p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1.5">
                    <Info className="w-4 h-4" />
                    <span>توصيات النخبة لزيادة نسب استرجاع السلات بالخليج:</span>
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(result.tips.join("\n"));
                      setCopiedTips(true);
                      setTimeout(() => setCopiedTips(false), 2000);
                    }}
                    className="text-[9px] text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    {copiedTips ? "تم النسخ!" : "نسخ النصائح"}
                  </button>
                </div>

                <ul className="space-y-2 list-none">
                  {result.tips.map((tip, idx) => (
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
