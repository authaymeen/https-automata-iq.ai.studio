import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrendingUp, Percent, ArrowUpRight, ShoppingBag, Sparkles, MessageCircle, RefreshCw, Bell, ShieldAlert, Users, Award } from "lucide-react";

interface StatConfig {
  industryName: string;
  beforeCr: number;
  afterCr: number;
  averageAov: string;
  cartRecovery: string;
  estimatedRoi: string;
  growthAdvice: string;
}

export default function CrogrowthStats() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("beauty");
  const [fomoIdx, setFomoIdx] = useState(0);

  // ROI Calculator Interactive States
  const [monthlyOrders, setMonthlyOrders] = useState<number>(500);
  const [avgBasket, setAvgBasket] = useState<number>(150);
  const [abandonRate, setAbandonRate] = useState<number>(65);

  const fomoMessages = [
    { text: "🔥 متجر عطور في الرياض قام للتو بتفعيل باقة ULTRA وحصل على زيادة تحويل متوقعة 4.8x", badge: "نشاط مباشر ⚡️" },
    { text: "⚡️ متبقي 3 أكواد تفعيل فقط لليوم للاستفادة من سعر العرض الخاص للمشتركين الجدد!", badge: "عرض محدود ⏳" },
    { text: "🛍️ علامة تجارية للأزياء في جدة استرجعت 72% من سلاتها المتروكة بنصوص الواتساب الذكية", badge: "مبيعات مسترجعة 💰" },
    { text: "💎 اشتراك جديد تم تفعيله قبل 4 دقائق لتاجر إلكترونيات في الكويت (باقة ULTRA)", badge: "عضوية ماسية 👑" },
    { text: "🟢 154 متجراً خليجياً يولدون عروضهم التسويقية الذكية في هذه الأثناء بكل نجاح", badge: "متصل الآن 🌐" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setFomoIdx((prev) => (prev + 1) % fomoMessages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const industries: Record<string, StatConfig> = {
    beauty: {
      industryName: "مستحضرات التجميل والعطور الفاخرة 🧴",
      beforeCr: 1.2,
      afterCr: 4.8,
      averageAov: "280 ر.س",
      cartRecovery: "65%",
      estimatedRoi: "+320%",
      growthAdvice: "المستهلك الخليجي في العطور يشتري بالوجاهة والمشاعر. ركز على استثارة رائحة الفخامة الملكية، مع دمج الضمان الذهبي لتبديد شكوك التقليد."
    },
    electronics: {
      industryName: "الأجهزة الذكية والملحقات الإلكترونية 📱",
      beforeCr: 0.9,
      afterCr: 3.6,
      averageAov: "450 ر.س",
      cartRecovery: "58%",
      estimatedRoi: "+240%",
      growthAdvice: "المشتري الخليجي في الإلكترونيات يخشى مشاكل الشحن والخلل المصنعي. وفر خيار الدفع عند الاستلام كمعزز ثقة أول، ووضح مدة التوصيل السريعة."
    },
    fashion: {
      industryName: "العبايات والملابس والموضة الخليجية 👗",
      beforeCr: 1.5,
      afterCr: 5.4,
      averageAov: "320 ر.س",
      cartRecovery: "72%",
      estimatedRoi: "+380%",
      growthAdvice: "المقاسات والتطريز هي أكبر المخاوف هنا. وفر ضمان تبديل سهل ومجاني، وقسّم الدفع بـ تابي وتمارا لتقليل صدمة الفاتورة."
    },
    home: {
      industryName: "مستلزمات وأدوات المنزل والمطبخ الذكية 🏠",
      beforeCr: 1.1,
      afterCr: 4.2,
      averageAov: "240 ر.س",
      cartRecovery: "62%",
      estimatedRoi: "+280%",
      growthAdvice: "أبرز توفير الوقت للأمهات والزوجات وقيمة الراحة العائلية. وفر باقة توفير للقطع الإضافية لزيادة قيمة متوسط الطلب (AOV)."
    }
  };

  const currentData = industries[selectedIndustry];

  // Calculate multiplication factor
  const multiplier = (currentData.afterCr / currentData.beforeCr).toFixed(1);

  return (
    <motion.div
      id="cro-stats-section"
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 text-right space-y-6 glowing-card"
      dir="rtl"
    >
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-extrabold text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <span>لوحة محاكاة نمو المبيعات والأداء المتوقع (CRO Metric Optimizer)</span>
          </h3>
          <p className="text-xs text-slate-400">
            شاهد كيف تساهم صياغة العروض وهندسة الإقناع الاحترافية في مضاعفة معدلات التحويل لمتجرك في الخليج.
          </p>
        </div>

        {/* Industry Switcher Dropdown */}
        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <span className="text-[11px] text-slate-400 whitespace-nowrap">مجال متجرك:</span>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 cursor-pointer w-full sm:w-auto"
          >
            <option value="beauty">🧴 العطور والتجميل</option>
            <option value="electronics">📱 الإلكترونيات والأجهزة</option>
            <option value="fashion">👗 العبايات والأزياء</option>
            <option value="home">🏠 الأدوات المنزلية والمطبخ</option>
          </select>
        </div>
      </div>

      {/* FOMO Dynamic Pulse Ticker - Psychological factor booster */}
      <div className="bg-slate-950 border border-emerald-500/10 rounded-xl p-3 sm:p-4 flex items-center justify-between gap-4 overflow-hidden relative shadow-[0_0_15px_rgba(16,185,129,0.02)]">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-1.5 rounded-lg text-emerald-400 animate-pulse flex-shrink-0">
            <Bell className="w-4 h-4 animate-bounce" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] text-slate-500 font-bold mb-0.5">لوحة إشارات الثقة والتحويل النشط (Live CRO Pulse):</div>
            <div className="h-6 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.p
                  key={fomoIdx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xs font-extrabold text-slate-200 truncate leading-relaxed"
                >
                  {fomoMessages[fomoIdx].text}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
        <span className="text-[9px] bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 font-extrabold px-2.5 py-1 rounded-full whitespace-nowrap hidden sm:inline-block animate-pulse">
          {fomoMessages[fomoIdx].badge}
        </span>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Sales Growth Visual Bar Chart comparison */}
        <div className="lg:col-span-5 bg-slate-950 rounded-xl p-5 border border-slate-800/85 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] text-emerald-400 font-extrabold tracking-wider uppercase block mb-1">
              مقارنة معدل التحويل لمتجرك (%)
            </span>
            <h4 className="text-xs font-bold text-slate-200">التحويل التقليدي مقابل صياغة Prompt Master</h4>
          </div>

          {/* Bar Charts */}
          <div className="space-y-4 py-2">
            
            {/* Before */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-semibold">
                <span className="text-slate-400">معدل التحويل المتوسط بالخليج (قبل التحسين)</span>
                <span className="text-slate-400 font-mono">{currentData.beforeCr}%</span>
              </div>
              <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentData.beforeCr / 6) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-slate-600 rounded-full"
                />
              </div>
            </div>

            {/* After Prompt Master */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-semibold">
                <span className="text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  معدل التحويل المستهدف (باستخدام محرك العروض والنصوص)
                </span>
                <span className="text-emerald-400 font-extrabold font-mono text-xs">{currentData.afterCr}%</span>
              </div>
              <div className="h-4.5 w-full bg-slate-900 rounded-full overflow-hidden border border-emerald-500/20 p-[1px]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentData.afterCr / 6) * 100}%` }}
                  transition={{ duration: 1.2, ease: "backOut" }}
                  className="h-full bg-gradient-to-l from-emerald-500 to-teal-400 rounded-full relative"
                >
                  <div className="absolute inset-0 bg-white/10 animate-pulse" />
                </motion.div>
              </div>
            </div>

          </div>

          {/* Multiplier Badge */}
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 text-center">
            <p className="text-[11px] text-slate-300">
              باستخدام العروض النفسية المخصصة للخليج، تزيد مبيعاتك بمعدل تقريبي يصل إلى
              <strong className="text-emerald-400 text-sm font-extrabold mx-1"> {multiplier}x </strong>
              ضعف المبيعات السابقة بنفس ميزانية الإعلان الحالية!
            </p>
          </div>
        </div>

        {/* Dynamic Key Performance Indicators (KPIs) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* CR Lift Indicator */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex items-start gap-3.5">
            <div className="p-2.5 bg-emerald-500/10 rounded-lg text-emerald-400 mt-0.5">
              <Percent className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-bold block">معدل التحويل المتوقع (CR):</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold text-slate-100 font-mono">{currentData.afterCr}%</span>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  <ArrowUpRight className="w-3 h-3" />
                  +{((currentData.afterCr - currentData.beforeCr) / currentData.beforeCr * 100).toFixed(0)}%
                </span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">بالمقارنة مع معدل السوق الذي نادراً ما يتجاوز {currentData.beforeCr}%.</p>
            </div>
          </div>

          {/* Average AOV Lift */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex items-start gap-3.5">
            <div className="p-2.5 bg-amber-500/10 rounded-lg text-amber-400 mt-0.5">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-bold block">متوسط قيمة الطلب الخليجي (AOV):</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold text-slate-100 font-mono">{currentData.averageAov}</span>
                <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded">مستهدف للعميل</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">عبر حزم العروض الذكية وزوايا الوجاهة الاجتماعية.</p>
            </div>
          </div>

          {/* WhatsApp Close recovery */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex items-start gap-3.5">
            <div className="p-2.5 bg-indigo-500/10 rounded-lg text-indigo-400 mt-0.5">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-bold block">معدل استرجاع السلات بالواتساب:</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold text-slate-100 font-mono">{currentData.cartRecovery}</span>
                <span className="text-[10px] text-indigo-400 font-bold bg-indigo-500/10 px-1.5 py-0.5 rounded">إغلاق تكتيكي</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">التبديد الفوري للاعتراضات يمنع المترددين من التراجع نهائياً.</p>
            </div>
          </div>

          {/* Advertising ROI Lift */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex items-start gap-3.5">
            <div className="p-2.5 bg-teal-500/10 rounded-lg text-teal-400 mt-0.5">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-bold block">العائد المتوقع على الإنفاق الإعلاني (ROAS):</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold text-slate-100 font-mono">{currentData.estimatedRoi}</span>
                <span className="text-[10px] text-teal-400 font-bold bg-teal-500/10 px-1.5 py-0.5 rounded">قيمة مضافة</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">تحسين زاوية الهجوم الإعلانية يقلل تكلفة العميل المحتمل بشكل قياسي.</p>
            </div>
          </div>

        </div>

      </div>

      {/* Direct Professional CRO Advice banner */}
      <div className="bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 rounded-xl p-4 flex gap-3 items-start relative overflow-hidden">
        <div className="absolute top-0 left-0 w-24 h-full bg-amber-500/5 -skew-x-12 pointer-events-none" />
        <span className="text-lg">💡</span>
        <div className="space-y-1">
          <span className="text-[11px] font-extrabold text-slate-200 block">نصيحة الخبير لزيادة مبيعات {currentData.industryName}:</span>
          <p className="text-xs text-slate-300 leading-relaxed">{currentData.growthAdvice}</p>
        </div>
      </div>

      {/* PSYCHOLOGICAL ROI CALCULATOR & LOSS AVERSION ENGINE */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900 border border-emerald-500/20 rounded-2xl p-5 sm:p-6 space-y-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] text-emerald-400 font-extrabold tracking-widest uppercase">محاكاة الأرباح المفقودة والمستردة</span>
            </div>
            <h4 className="text-sm font-black text-slate-100">💰 حاسبة العائد الاستثماري المتوقع لمتجرك بالريال السعودي (SAR)</h4>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg text-emerald-400 text-[10px] font-bold self-start">
            دراسة حالة حقيقية 📈
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Slider 1: Monthly Orders */}
          <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-white/5">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-400">عدد الطلبات الشهرية الحالي:</span>
              <span className="text-cyan-400 font-mono text-sm">{monthlyOrders} طلب</span>
            </div>
            <input
              type="range"
              min="50"
              max="5000"
              step="50"
              value={monthlyOrders}
              onChange={(e) => setMonthlyOrders(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[9px] text-slate-600">
              <span>50</span>
              <span>2500</span>
              <span>5000+</span>
            </div>
          </div>

          {/* Slider 2: Average Basket / Order Value */}
          <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-white/5">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-400">متوسط قيمة السلة (AOV):</span>
              <span className="text-amber-400 font-mono text-sm">{avgBasket} ريال</span>
            </div>
            <input
              type="range"
              min="50"
              max="1000"
              step="10"
              value={avgBasket}
              onChange={(e) => setAvgBasket(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <div className="flex justify-between text-[9px] text-slate-600">
              <span>50 ر.س</span>
              <span>500 ر.س</span>
              <span>1000 ر.س</span>
            </div>
          </div>

          {/* Slider 3: Abandoned Carts Rate */}
          <div className="space-y-2 bg-slate-900/60 p-4 rounded-xl border border-white/5">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-400">نسبة السلال المتروكة (تقريبياً):</span>
              <span className="text-rose-400 font-mono text-sm">{abandonRate}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="90"
              step="5"
              value={abandonRate}
              onChange={(e) => setAbandonRate(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-rose-400"
            />
            <div className="flex justify-between text-[9px] text-slate-600">
              <span>20% (منخفض)</span>
              <span>55%</span>
              <span>90% (مرتفع جداً)</span>
            </div>
          </div>
        </div>

        {/* Visual ROI Display & Psychological Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2 items-center">
          
          {/* Left: The Loss Warning & Recovery Stats */}
          <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800 rounded-xl p-4.5 space-y-3">
            <h5 className="text-xs font-extrabold text-slate-200 flex items-center gap-1.5">
              <span className="text-rose-400">⚠️</span>
              <span>الخسارة الصامتة التي تعاني منها شهرياً:</span>
            </h5>
            <div className="grid grid-cols-2 gap-3 text-right">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-rose-500/10">
                <span className="text-[10px] text-slate-500 block font-bold">سلات تترك وترحل شهرياً:</span>
                <span className="text-sm font-black text-rose-400 font-mono">{Math.round(monthlyOrders * (abandonRate / 100))} سلة</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-rose-500/10">
                <span className="text-[10px] text-slate-500 block font-bold">مبيعات مفقودة تذهب للمنافسين:</span>
                <span className="text-sm font-black text-rose-400 font-mono">{Math.round(monthlyOrders * (abandonRate / 100) * avgBasket).toLocaleString()} ر.س</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed font-light">
              الدراسات الخليجية تؤكد أن <span className="text-slate-200 font-extrabold">72%</span> من هذه السلال يمكن استعادتها فوراً عبر إرسال رسائل مخصصة مبنية على الصياغة النفسية المعتمدة لمتجر Prompt Master بدلاً من الرسائل التلقائية الباردة.
            </p>
          </div>

          {/* Right: The Solution & ROI Multiplier */}
          <div className="lg:col-span-5 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/30 rounded-xl p-4.5 text-center space-y-3.5 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 text-[8px] font-black px-2.5 py-0.5 rounded-bl-lg">
              حل مستهدف بضغطة زر ✨
            </div>
            
            <div className="space-y-0.5">
              <span className="text-[10px] text-emerald-400 font-extrabold block">الإيرادات الشهرية الإضافية المستردة لمتجرك:</span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight">
                +{Math.round(monthlyOrders * (abandonRate / 100) * 0.72 * avgBasket).toLocaleString()} <span className="text-xs">ريال سعودي</span>
              </div>
            </div>

            <div className="border-t border-emerald-500/15 pt-2.5 grid grid-cols-2 gap-2 text-right">
              <div>
                <span className="text-[9px] text-slate-400 block font-bold">عائد باقة PRO (39 ر.س):</span>
                <span className="text-xs font-black text-emerald-400 font-mono">
                  {Math.round(monthlyOrders * (abandonRate / 100) * 0.72 * avgBasket) > 0 
                    ? `${Math.round((Math.round(monthlyOrders * (abandonRate / 100) * 0.72 * avgBasket) / 39) * 100).toLocaleString()}%`
                    : "0%"}
                </span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 block font-bold">عائد باقة ULTRA (90 ر.س):</span>
                <span className="text-xs font-black text-cyan-400 font-mono">
                  {Math.round(monthlyOrders * (abandonRate / 100) * 0.72 * avgBasket) > 0 
                    ? `${Math.round((Math.round(monthlyOrders * (abandonRate / 100) * 0.72 * avgBasket) / 90) * 100).toLocaleString()}%`
                    : "0%"}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Psychological Trust Indicators block */}
        <div className="border-t border-white/5 pt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-right">
          
          <div className="flex gap-2.5 items-start">
            <div className="p-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg shrink-0 mt-0.5">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h6 className="text-xs font-bold text-slate-200">الضمان الذهبي للاسترجاع</h6>
              <p className="text-[10px] text-slate-500 leading-relaxed">استرجع كامل قيمتك المدفوعة (39 أو 90 ريال) خلال 14 يوماً إن لم تزد مبيعاتك.</p>
            </div>
          </div>

          <div className="flex gap-2.5 items-start">
            <div className="p-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-lg shrink-0 mt-0.5">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <h6 className="text-xs font-bold text-slate-200">تفعيل فوري عبر الواتساب</h6>
              <p className="text-[10px] text-slate-500 leading-relaxed">بمجرد التحويل، يتم تفعيل حسابك فوراً وبأمان تام خلال أقل من 5 دقائق فقط.</p>
            </div>
          </div>

          <div className="flex gap-2.5 items-start">
            <div className="p-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg shrink-0 mt-0.5">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h6 className="text-xs font-bold text-slate-200">معتمد وموثوق للتجارة</h6>
              <p className="text-[10px] text-slate-500 leading-relaxed">متوافق ومعتمد بالكامل وصيغ الأوامر مخصصة لمتاجر سلة (Salla) وزد (Zid).</p>
            </div>
          </div>

        </div>

      </div>

    </motion.div>
  );
}
