import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, Sparkles, Trophy, Zap, MessageSquare, 
  HelpCircle, ShieldCheck, TrendingUp, AlertTriangle, ArrowUpRight, Gift
} from "lucide-react";
import { UserSession } from "../types";

interface PricingSectionProps {
  currentUser: UserSession | null;
  isLoggedIn: boolean;
  onScrollToActivation: () => void;
}

export default function PricingSection({ currentUser, isLoggedIn, onScrollToActivation }: PricingSectionProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Prices
  const proMonthly = 39;
  const ultraMonthly = 90;

  const currentTier = currentUser?.tier || "FREE";

  const getWhatsAppLink = (tier: "PRO" | "ULTRA") => {
    const userEmail = currentUser?.email || "بريدي الإلكتروني";
    const price = tier === "PRO" ? proMonthly : ultraMonthly;
    
    const baseMessage = `أهلاً ومرحباً فريق Prompt Master، أرغب في تفعيل باقة ${tier} لبريدي الإلكتروني: ${userEmail} بقيمة ${price} ريال سعودي. يرجى تزويدي بطرق الدفع وكود التفعيل السحابي.`;
    return `https://wa.me/message/WWNJZ6JUPB5GP1?text=${encodeURIComponent(baseMessage)}`;
  };

  const pricingFaqs = [
    {
      q: "كيف تتم عملية تفعيل الاشتراك والباقة؟",
      a: "الأمر غاية في البساطة والسرعة! بعد تسجيل بريدك الإلكتروني في المنصة، اختر الباقة التي تلبي احتياجات أعمالك (PRO أو ULTRA) وانقر على زر الاشتراك. سيتم توجيهك مباشرة لخدمة الدفع عبر الواتساب الآمن. بعد إتمام التحويل، سيقوم النظام تلقائياً أو عبر الدعم الفني بإصدار كود تفعيل سحابي خاص بحسابك لتبدأ العمل فوراً وبلا قيود."
    },
    {
      q: "ما هو الضمان الذهبي قبل الشراء؟",
      a: "نحن نؤمن بالشفافية المطلقة والعدالة. لذلك، نمنحك ضماناً ذهبياً من خلال فترة تجربة مجانية ممتازة تمكنك من اختبار كافة الميزات وجودة صياغة البرومبتات وقوة التحليلات الفورية مجاناً للتأكد من ملاءمتها لمتجرك قبل سداد أي رسوم. بمجرد اقتناعك بالخدمة وطلب كود التفعيل وترقية الباقة، يتم تنشيط الصلاحيات السحابية فوراً."
    },
    {
      q: "ما الفرق الأساسي بين باقة PRO وباقة ULTRA؟",
      a: "باقة PRO مثالية للتجار الأفراد الذين يرغبون في هندسة أفضل الأوامر، كتابة سيناريوهات تيك توك وسناب شات، وعكس هندسة نصوص المنافسين لزيادة مبيعاتهم يدوياً. أما باقة ULTRA فهي الباقة الماسية الشاملة والمصممة خصيصاً للمتاجر والشركات الكبرى؛ حيث تفتح لك استوديو المعلق الصوتي بالذكاء الاصطناعي بنبرة سعودية بشرية دافئة، وتوليد الأوامر بالدُفعة (Batch)، وربط الويب هوك (Webhook) للربط المؤتمت مع سلة، وزد، وMake.com، وحفظ هوية البراند بالكامل (Brand Hub)."
    },
    {
      q: "هل يمكنني ترقية باقتي لاحقاً من PRO إلى ULTRA؟",
      a: "نعم بالتأكيد! يمكنك الترقية في أي وقت تريده. سيقوم الدعم الفني باحتساب الأيام المتبقية في اشتراك PRO الخاص بك وخصم قيمتها بالكامل من باقة ULTRA الجديدة بحيث لا تخسر ريالاً واحداً."
    },
    {
      q: "هل هناك أي مصاريف أو رسوم مخفية؟",
      a: "على الإطلاق. الرسوم التي تراها هي رسوم دورية ثابتة وواضحة جداً، وتغطي كافة عمليات توليد النصوص وهندسة البرومبتات واستهلاك الذكاء الاصطناعي دون أي تكلفة إضافية."
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  return (
    <div className="space-y-12" id="pricing-section-container">
      {/* Pricing Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-4" dir="rtl">
        <div className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-bold leading-none">
          <Gift className="w-4 h-4 text-cyan-300 animate-pulse" />
          <span>تفعيل فوري سحابي وضمان استرجاع 100% ⏳</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          اختر الباقة الاستثمارية المناسبة لنمو متجرك
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
          استثمر اليوم في صياغة نصوص إقناعية وعروض نارية تضاعف مبيعاتك وتسترد قيمتها خلال أول 24 ساعة من إطلاق حملاتك الإعلانية!
        </p>
        <p className="text-[11px] text-slate-500 font-medium">الأسعار واضحة، شهرياً، وبدون أي التزامات طويلة.</p>
      </div>

      {/* Pricing Cards Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto px-1 sm:px-4"
        dir="rtl"
      >
        {/* CARD 1: FREE / TRIAL */}
        <motion.div 
          variants={cardVariants}
          className={`bg-slate-950/40 border rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
            currentTier === "FREE" 
              ? "border-slate-800 shadow-[0_0_20px_rgba(255,255,255,0.02)]" 
              : "border-slate-900/60 opacity-65 hover:opacity-100"
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-slate-500 bg-slate-800/40 border border-slate-700/30 px-2.5 py-0.5 rounded-full uppercase">
                باقة الهواة
              </span>
              {currentTier === "FREE" && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-slate-200">الباقة التجريبية</h3>
              <p className="text-[11px] text-slate-400 font-light leading-relaxed">لتجربة أدوات هندسة برومبتات الإقناع للمتاجر لأول مرة.</p>
            </div>

            <div className="py-2 border-b border-white/5">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-100 font-mono">0</span>
                <span className="text-xs font-bold text-slate-400">ريال سعودي</span>
                <span className="text-[10px] text-slate-500 mr-1">/ للأبد</span>
              </div>
            </div>

            {/* Feature List */}
            <ul className="space-y-2 text-right text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span className="leading-tight text-slate-400">الوصول لمولد البرومبتات الأساسي (ChatGPT / Claude)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span className="leading-tight text-slate-400">توليد محدود لـ 5 أوامر وهندسة نصوص يومياً</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span className="leading-tight text-slate-400">نبرة وهوية عامة غير مخصصة</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4">
            {currentTier === "FREE" ? (
              <div className="w-full text-center py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 font-bold">
                ✓ حسابك الحالي النشط
              </div>
            ) : (
              <div className="w-full text-center py-2.5 rounded-xl bg-slate-900/20 border border-slate-900 text-xs text-slate-500 font-bold">
                حساب أساسي محدود
              </div>
            )}
          </div>
        </motion.div>

        {/* CARD 2: PRO TIER */}
        <motion.div 
          variants={cardVariants}
          className={`bg-gradient-to-b from-slate-950 via-slate-950 to-amber-950/20 border rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
            currentTier === "PRO" 
              ? "border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.15)] scale-[1.02]" 
              : "border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.03)] hover:border-amber-500/50"
          }`}
        >
          {/* Most Popular Badge */}
          <div className="absolute top-0 left-0 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-[9px] px-4 py-1 rounded-br-2xl uppercase tracking-wider shadow-sm z-10 flex items-center gap-1 animate-pulse">
            <Trophy className="w-3 h-3" />
            <span>الأكثر شعبية للمتاجر</span>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full uppercase">
                باقة المحترفين
              </span>
              {currentTier === "PRO" && (
                <span className="text-[10px] font-black text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30 animate-pulse">
                  نشط حالياً
                </span>
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-amber-400">باقة البرو PRO 🏆</h3>
              <p className="text-[11px] text-slate-400 font-light leading-relaxed">السلاح السري للتجار والمسوقين الأفراد لتوليد إعلانات ونصوص وعروض تضمن الشراء.</p>
            </div>

            <div className="py-2 border-b border-white/5">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-amber-400 font-mono tracking-tight">
                  39
                </span>
                <span className="text-xs font-bold text-slate-200">ريال سعودي</span>
                <span className="text-[10px] text-slate-400 mr-1">/ شهرياً</span>
              </div>
            </div>

            {/* Feature List */}
            <ul className="space-y-2.5 text-right text-xs text-slate-300">
              <li className="flex items-start gap-2 font-bold text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>كل ميزات الباقة التجريبية +</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>عكس هندسة نصوص وعروض المنافسين بدقة 🌀</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>محلل نبرة الصوت وتوليد الخطابات الموجهة 📣</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>صانع سيناريوهات تيك توك وسناب شات الإعلانية 🎬</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>قوالب وعروض الخليج النارية (الدفع عند الاستلام/الضمان) 🔥</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>صيغة إغلاق صفقات واتساب الذكي وحسم الاعتراضات 💬</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>مساعد ذكي شات مخصص لتجارة الخليج 👤</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>توليد أوامر غير محدود لـ ChatGPT / Claude / Midjourney</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>دعم فني واستشارات لزيادة التحويل عبر الواتساب</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 space-y-2">
            <a
              href={getWhatsAppLink("PRO")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-extrabold shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 hover:scale-[1.01] transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4" />
              <span>اشترك الآن عبر الواتساب</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onScrollToActivation}
              className="w-full py-2.5 rounded-xl border border-amber-500/20 text-amber-400 hover:bg-amber-500/5 text-xs font-bold transition-all"
            >
              أو فعل الباقة برمز الكود
            </button>
          </div>
        </motion.div>

        {/* CARD 3: ULTRA TIER */}
        <motion.div 
          variants={cardVariants}
          className={`bg-gradient-to-b from-slate-950 via-slate-950 to-sky-950/20 border rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
            currentTier === "ULTRA" 
              ? "border-sky-400 shadow-[0_0_30px_rgba(14,165,233,0.15)] scale-[1.02]" 
              : "border-sky-500/30 shadow-[0_0_20px_rgba(14,165,233,0.03)] hover:border-sky-500/50"
          }`}
        >
          {/* Top VIP Badge */}
          <div className="absolute top-0 left-0 bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 font-black text-[9px] px-4 py-1 rounded-br-2xl uppercase tracking-wider shadow-sm z-10 flex items-center gap-1 animate-pulse">
            <Zap className="w-3 h-3 text-slate-950" />
            <span>خيار النخبة والبراندات الكبرى</span>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-0.5 rounded-full uppercase">
                باقة النيون الماسية
              </span>
              {currentTier === "ULTRA" && (
                <span className="text-[10px] font-black text-sky-400 bg-sky-500/20 px-2 py-0.5 rounded border border-sky-500/30 animate-pulse">
                  نشط حالياً
                </span>
              )}
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-sky-300">باقة الالترا ULTRA 💎</h3>
              <p className="text-[11px] text-slate-400 font-light leading-relaxed">لأصحاب المتاجر الكبرى والبراندات الذين يرغبون بالأتمتة الكلية ومستودع الهوية والتعليق الصوتي.</p>
            </div>

            <div className="py-2 border-b border-white/5">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-sky-400 font-mono tracking-tight">
                  90
                </span>
                <span className="text-xs font-bold text-slate-200">ريال سعودي</span>
                <span className="text-[10px] text-slate-400 mr-1">/ شهرياً</span>
              </div>
            </div>

            {/* Feature List */}
            <ul className="space-y-2.5 text-right text-xs text-slate-300">
              <li className="flex items-start gap-2 font-bold text-sky-300">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>كل ميزات باقة PRO الاحترافية +</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span className="font-extrabold text-slate-100">استوديو الأصوات الطبيعية والبشرية (Voice Gen) 🎙️</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span className="font-extrabold text-slate-100">مستودع وهيكل هوية البراند المخصص (Brand Hub) ⚡</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span className="font-extrabold text-slate-100">توليد الأوامر بالدفعة للكتالوج بالكامل (Batch) 📊</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span className="font-extrabold text-slate-100">ربط الويب هوك (Webhook) للربط مع Make / n8n 🔌</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>مجسد وتفكيك نفسية الفئات المستهدفة في الخليج 🎯</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>صياغة أنظمة استرجاع السلات المتروكة (Email & SMS) 🛒</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>استهلاك سيرفرات أسرع ذات أولوية قصوى وبلا توقف</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>مدير نجاح حساب مخصص لبراندك مع استشارة شهرية</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 space-y-2">
            <a
              href={getWhatsAppLink("ULTRA")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-sky-400 to-sky-500 text-slate-950 text-xs font-extrabold shadow-lg shadow-sky-400/10 hover:shadow-sky-400/20 hover:scale-[1.01] transition-all duration-300"
            >
              <MessageSquare className="w-4 h-4" />
              <span>اشترك في الـ ULTRA الآن</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onScrollToActivation}
              className="w-full py-2.5 rounded-xl border border-sky-500/20 text-sky-400 hover:bg-sky-500/5 text-xs font-bold transition-all"
            >
              أو فعل الباقة برمز الكود
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Trust factors panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto border-y border-white/5 py-8" dir="rtl">
        <div className="flex items-start gap-3 p-2 text-right">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-slate-200">الضمان الذهبي 100%</h4>
            <p className="text-[10px] text-slate-400 leading-normal mt-0.5">نوفر لك فترة تجربة مجانية ممتازة قبل الدفع لتختبر قوة الأداة وملاءمتها لمتجرك بكل حرية واطمئنان.</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-2 text-right">
          <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-slate-200">عائد استثماري فوري</h4>
            <p className="text-[10px] text-slate-400 leading-normal mt-0.5">صياغة برومبت إعلاني واحد ناجح يسترد لك كامل قيمة باقتك الشهرية في دقائق معدودة.</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-2 text-right">
          <div className="p-2 bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 rounded-xl">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-slate-200">تحديثات سحابية مستمرة</h4>
            <p className="text-[10px] text-slate-400 leading-normal mt-0.5">نعمل دوماً على تدريب النماذج ومراقبة نبرات ومبيعات السوق الخليجي لنوفر لك القوالب الفعالة تلقائياً.</p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-3xl mx-auto space-y-4" dir="rtl">
        <div className="text-center space-y-1">
          <h3 className="text-lg font-extrabold text-slate-200 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span>الأسئلة الشائعة حول الاشتراكات</span>
          </h3>
          <p className="text-[11px] text-slate-400">إجابات شافية لجميع استفساراتك قبل التفعيل</p>
        </div>

        <div className="space-y-2.5">
          {pricingFaqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-slate-950/60 border border-white/5 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-4 flex items-center justify-between text-right focus:outline-none text-xs font-extrabold text-slate-200 hover:text-cyan-400 transition-colors"
              >
                <span>{faq.q}</span>
                <span className={`text-[10px] text-slate-500 transition-transform duration-300 ${activeFaq === idx ? "rotate-90 text-cyan-400" : ""}`}>
                  ◀
                </span>
              </button>
              
              <AnimatePresence initial={false}>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-4 pb-4 pt-1 border-t border-white/5 text-[11px] text-slate-400 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
