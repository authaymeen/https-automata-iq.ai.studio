import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Sparkles, Loader2, Copy, Check, ShieldAlert, Award, CreditCard, Tag, BadgeHelp 
} from "lucide-react";
import { GccOffersResponse } from "../types";

interface GccOffersProps {
  email: string;
}

export default function GccOffers({ email }: GccOffersProps) {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [country, setCountry] = useState("المملكة العربية السعودية 🇸🇦");
  const [primeVibe, setPrimeVibe] = useState("الجودة والوجاهة الاجتماعية (Prestige & Quality)");
  const [offerType, setOfferType] = useState("عرض ذهبي خالٍ من المخاطر (Golden Guarantee)");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GccOffersResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Copy states
  const [copiedAngleIdx, setCopiedAngleIdx] = useState<number | null>(null);
  const [copiedCod, setCopiedCod] = useState(false);
  const [copiedInstallments, setCopiedInstallments] = useState(false);
  const [copiedGuarantee, setCopiedGuarantee] = useState(false);

  const countries = [
    "المملكة العربية السعودية 🇸🇦",
    "الإمارات العربية المتحدة 🇦🇪",
    "دولة الكويت 🇰🇼",
    "دولة قطر 🇶🇦",
    "سلطنة عمان 🇴🇲",
    "مملكة البحرين 🇧🇭"
  ];

  const vibes = [
    "الجودة والوجاهة الاجتماعية (Prestige & Quality)",
    "العائلة والروابط الاجتماعية الخليجية (Family Values)",
    "المواسم المحلية (رمضان، الأعياد، اليوم الوطني)",
    "الأمان العالي والضمان ضد الاحتيال (Trust & Safety)"
  ];

  const offerTypes = [
    "اشتري 1 واحصل على 1 مجاناً (BOGO)",
    "باقة التوفير العائلية (Family Saver Bundle)",
    "عرض ذهبي خالٍ من المخاطر (Golden Guarantee)",
    "شحن مجاني وهدية قيمة محدودة الوقت"
  ];

  const examples = [
    {
      name: "ساعة ذكية فاخرة بشاشة أموليد",
      desc: "تدعم الاتصال الهاتفي، تتبع اللياقة البدنية والقلب، مقاومة للماء، بطارية تدوم 7 أيام، تصميم فخم يشبه الساعات السويسرية.",
      country: "المملكة العربية السعودية 🇸🇦",
      vibe: "الجودة والوجاهة الاجتماعية (Prestige & Quality)",
      offer: "عرض ذهبي خالٍ من المخاطر (Golden Guarantee)"
    },
    {
      name: "شاحن سفري متنقل فائق السرعة",
      desc: "قوة 20 ألف أمبير، يدعم الشحن السريع لثلاثة أجهزة في وقت واحد، جودة ألمانية آمنة جدا للرحلات البرية والكشتات العائلية.",
      country: "دولة الكويت 🇰🇼",
      vibe: "العائلة والروابط الاجتماعية الخليجية (Family Values)",
      offer: "باقة التوفير العائلية (Family Saver Bundle)"
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
      const res = await fetch("/api/gcc-offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, productName, productDescription, country, primeVibe, offerType })
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.result);
      } else {
        setError(data.error || "حدث خطأ أثناء صياغة العروض.");
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

  const copyAngle = (angle: any, index: number) => {
    const formatted = `العنوان: ${angle.title}
الخطاف التسويقي: ${angle.hook}
النص الإعلاني:
${angle.adCopy}
المميزات الرئيسية:
${angle.scannableKeypoints.map((pt: string) => `• ${pt}`).join("\n")}`;
    navigator.clipboard.writeText(formatted);
    setCopiedAngleIdx(index);
    setTimeout(() => setCopiedAngleIdx(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-6 text-right"
      dir="rtl"
    >
      <div>
        <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Tag className="w-5 h-5 text-emerald-500" />
          <span>زوايا بيع وعروض خليجية لا تقاوم (Irresistible GCC Offers)</span>
        </h3>
        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
          قم بتحديد تفاصيل منتجك والجمهور المستهدف والزاوية النفسية المفضلة لديك. سيقوم محرك 
          <strong className="text-slate-200"> Prompt Master AI </strong> 
          بصياغة 3 زوايا تسويقية نارية مدمجة مع معززات الثقة الخليجية المعتمدة (الدفع عند الاستلام، تقسيط تمارا وتابي، والضمان الذهبي).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Input Controls */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800/80 rounded-xl p-5 space-y-4">
          
          {/* Quick Examples */}
          <div>
            <span className="text-xs font-semibold text-slate-400 block mb-2">تعبئة تلقائية للمنتج:</span>
            <div className="flex flex-wrap gap-2">
              {examples.map((ex, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setProductName(ex.name);
                    setProductDescription(ex.desc);
                    setCountry(ex.country);
                    setPrimeVibe(ex.vibe);
                    setOfferType(ex.offer);
                  }}
                  className="bg-slate-950 hover:bg-slate-800 text-[11px] text-slate-300 px-2.5 py-1.5 rounded-lg border border-slate-800 transition text-right cursor-pointer"
                >
                  {ex.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              اسم المنتج أو الخدمة:
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="مثال: ساعة ذكية فاخرة، عسل السدر اليمني الأصلي..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Product Description */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              مميزات المنتج وفوائده (اختياري ولكن مفيد):
            </label>
            <textarea
              rows={3}
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="اكتب بعض التفاصيل لمساعدة الذكاء الاصطناعي على تبرير القيمة للمستهلك الخليجي..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Target Country */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              بلد الجمهور المستهدف الرئيسي:
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Vibe selection */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              طابع بيع وعقلية الجمهور الخليجي:
            </label>
            <select
              value={primeVibe}
              onChange={(e) => setPrimeVibe(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {vibes.map((vb) => (
                <option key={vb} value={vb}>{vb}</option>
              ))}
            </select>
          </div>

          {/* Offer Type Selection */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              عرض وهيكل الصفقة (Offer Mechanics):
            </label>
            <select
              value={offerType}
              onChange={(e) => setOfferType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              {offerTypes.map((off) => (
                <option key={off} value={off}>{off}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-extrabold py-3 px-4 rounded-lg text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/10"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                جاري صياغة وهندسة زوايا البيع الخليجية...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                توليد عروض وزوايا بيع قاتلة 💰
              </>
            )}
          </button>
        </div>

        {/* Results Screen */}
        <div className="lg:col-span-7 min-h-[400px] space-y-4">
          {loading ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center h-full text-center space-y-4">
              <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
              <div className="space-y-1">
                <p className="font-bold text-slate-200 text-sm">جاري التخطيط وصياغة العروض</p>
                <p className="text-xs text-emerald-400 font-medium animate-pulse">
                  نحسب الآن أبعاد العروض لضمان ملاءمتها للمستهلك الخليجي، وصياغة معززات الثقة المثالية...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-6 flex flex-col items-center justify-center h-full text-center space-y-3">
              <p className="text-red-400 text-sm">⚠️ {error}</p>
            </div>
          ) : result ? (
            <div className="space-y-5">
              
              {/* Trust Boosters Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                
                {/* COD Booster */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1.5 relative">
                  <button
                    onClick={() => copyText(result.trustBoosters.cod, setCopiedCod)}
                    className="absolute top-3 left-3 text-slate-500 hover:text-slate-300 p-1 rounded hover:bg-slate-800"
                  >
                    {copiedCod ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </button>
                  <div className="flex items-center gap-1">
                    <ShieldAlert className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] font-bold text-slate-400">الدفع عند الاستلام 💵</span>
                  </div>
                  <p className="text-[11px] text-slate-200 leading-relaxed pr-0.5">{result.trustBoosters.cod}</p>
                </div>

                {/* Installments Booster */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1.5 relative">
                  <button
                    onClick={() => copyText(result.trustBoosters.installments, setCopiedInstallments)}
                    className="absolute top-3 left-3 text-slate-500 hover:text-slate-300 p-1 rounded hover:bg-slate-800"
                  >
                    {copiedInstallments ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </button>
                  <div className="flex items-center gap-1">
                    <CreditCard className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] font-bold text-slate-400">التقسيط (تابي وتمارا) 💳</span>
                  </div>
                  <p className="text-[11px] text-slate-200 leading-relaxed pr-0.5">{result.trustBoosters.installments}</p>
                </div>

                {/* Golden Guarantee */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1.5 relative">
                  <button
                    onClick={() => copyText(result.trustBoosters.goldenGuarantee, setCopiedGuarantee)}
                    className="absolute top-3 left-3 text-slate-500 hover:text-slate-300 p-1 rounded hover:bg-slate-800"
                  >
                    {copiedGuarantee ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </button>
                  <div className="flex items-center gap-1">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span className="text-[10px] font-bold text-slate-400">الضمان الذهبي 🏆</span>
                  </div>
                  <p className="text-[11px] text-slate-200 leading-relaxed pr-0.5">{result.trustBoosters.goldenGuarantee}</p>
                </div>

              </div>

              {/* 3 Distinct Selling Angles */}
              <div className="space-y-4">
                <span className="text-xs font-extrabold text-slate-400 block pr-1">أقوى ثلاث زوايا بيع خليجية تم توليدها:</span>
                
                {result.angles.map((angle, idx) => (
                  <div 
                    key={idx} 
                    className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3 relative overflow-hidden"
                  >
                    {/* Index Badge */}
                    <div className="absolute top-0 left-0 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold px-3 py-1 rounded-br-xl">
                      ANGLE {idx + 1}
                    </div>

                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-emerald-400 font-extrabold">زاوية البيع المقترحة:</span>
                        <h4 className="font-extrabold text-sm text-slate-100">{angle.title}</h4>
                      </div>
                      <button
                        onClick={() => copyAngle(angle, idx)}
                        className="bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-300 px-3 py-1.5 rounded-lg transition flex items-center gap-1 cursor-pointer"
                      >
                        {copiedAngleIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedAngleIdx === idx ? "تم نسخ الزاوية!" : "نسخ الزاوية"}</span>
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] text-slate-400 font-bold block">🚨 خطاف جذب الانتباه (Hook):</span>
                      <p className="text-xs text-slate-200 font-medium leading-relaxed bg-slate-950 p-2.5 rounded border border-slate-850">{angle.hook}</p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] text-slate-400 font-bold block">✍️ النص الإعلاني المقترح:</span>
                      <div className="bg-slate-950 p-3.5 rounded border border-slate-850 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
                        {angle.adCopy}
                      </div>
                    </div>

                    <div className="space-y-2 bg-slate-950/40 p-3 rounded-lg border border-slate-850">
                      <span className="text-[10px] text-slate-400 font-bold block">💎 النقاط البيعية المقنعة (Selling Points):</span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {angle.scannableKeypoints.map((kp, kIdx) => (
                          <div key={kIdx} className="flex items-start gap-1.5 text-[11px] text-slate-300 leading-relaxed">
                            <span className="text-emerald-500 mt-0.5">✔</span>
                            <span>{kp}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ) : (
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center h-full text-center space-y-4">
              <div className="p-4 bg-slate-900 rounded-full border border-slate-800 text-emerald-500">
                <BadgeHelp className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1.5 max-w-sm">
                <h3 className="font-bold text-slate-200 text-sm">في انتظار المنتج الخاص بك</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  اكتب اسم منتجك وحدد المواصفات لتوليد باقة متفوقة من العروض الإعلانية التي تفهم سيكولوجية المشتري الخليجي بدقة.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
