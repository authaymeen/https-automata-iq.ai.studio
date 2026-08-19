import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, GitBranch, X, ArrowLeftCircle } from "lucide-react";

interface ProjectItem {
  key: string;
  tag: string;
  badgeText: string;
  title: string;
  description: string;
  stats: { val: string; label: string }[];
  steps: string[];
  tools: string[];
  impact: string;
  accent: "cyan" | "indigo" | "emerald";
}

const PROJECTS: ProjectItem[] = [
  {
    key: "x_agent",
    tag: "منصة X (تويتر) • AI Agent",
    badgeText: "Automata IQ Content Agent",
    title: "موظف الذكاء الاصطناعي لإدارة المحتوى والتفاعل لمنصة X",
    description:
      "منظومة ذكية ترصد الكلمات المفتاحية في مجالك، تحلل التغريدات الأكثر انتشاراً، تصيغ محتوى أصيل فائق القيمة بنبرة براندك، وتنشر وتتفاعل مع المتابعين بصورة آلية.",
    stats: [
      { val: "+350%", label: "زيادة التفاعل" },
      { val: "25 ساعة", label: "وفر أسبوعي" },
      { val: "0 خطأ", label: "التزام بالمواعيد" },
    ],
    steps: [
      "1. رصد الهاشتاقات والمواضيع الرائجة ذات الصلة بنشاط الشركة كل 30 دقيقة.",
      "2. استخدام Gemini AI لصياغة ثريدات وتغريدات تفاعلية بلهجة سعودية/خليجية محترفة.",
      "3. مراجعة الجودة عبر نظام فلترة تلقائي لمنع أي أخطاء لغوية أو سياقية.",
      "4. جدولة النشر التلقائي والرد على التعليقات والاستفسارات الشائعة على مدار 24 ساعة.",
    ],
    tools: ["X API v2", "Gemini 1.5 Flash", "Make.com", "Airtable Database"],
    impact: "توفير 25 ساعة أسبوعياً من وقت صانع المحتوى مع زيادة التفاعل بنسبة 350%.",
    accent: "cyan",
  },
  {
    key: "cx_radar",
    tag: "خرائط Google • الإنذار المبكر",
    badgeText: "Reputation Guard & Sentiment Radar",
    title: "منظومة ذكاء تجربة العميل (CX) والإنذار المبكر للشكاوى",
    description:
      "رصد فوري لجميع فروع مطاعم ومتاجر العميل على Google Maps، تحليل المشاعر الفوري وإطلاق إنذار طوارئ لقروب واتساب الإدارة مع تقرير صباحي ملخص بنقاط الضعف.",
    stats: [
      { val: "< 4 دقائق", label: "سرعة حل الشكوى" },
      { val: "4.8 / 5", label: "متوسط التقييم" },
      { val: "100%", label: "تغطية الفروع" },
    ],
    steps: [
      "1. التقاط المراجعات الجديدة فور نشرها على Google Maps و TripAdvisor.",
      "2. تصنيف التقييم لحظياً (إيجابي / سلبي / اقتراح / شكوى طعام أو تعامل).",
      "3. في حال كان التقييم 1-2 نجمة: إرسال تنبيه Telegram فوري لمدير الفرع متضمناً رقم هاتف العميل وصياغة رد دبلوماسي.",
      "4. تقرير أسبوعي تلقائي للإدارة التنفيذية بأكثر المشاكل المتكررة في كل فرع.",
    ],
    tools: ["Google Maps Webhooks", "Telegram Bot API", "Gemini AI", "Google Sheets"],
    impact: "تقليص زمن الاستجابة للشكاوى إلى أقل من 4 دقائق ورفع تقييم الفروع إلى 4.8 نجوم.",
    accent: "indigo",
  },
  {
    key: "real_estate_radar",
    tag: "عقار & صفقات • Real-time Arbitrage",
    badgeText: "Real-time Deal Arbitrage",
    title: "رادار رصد الصفقات العقارية والفرص الاستثمارية الفورية",
    description:
      "رادار يسحب إعلانات الأراضي والعقارات لحظة نشرها، يقارن سعر المتر مع الصفقات الحقيقية في منصة البورصة العقارية، ويرسل تنبيهاً بالفرص الأقل من سعر السوق بـ 15% فما فوق.",
    stats: [
      { val: "+12 صفقة", label: "تم اقتناصها" },
      { val: "30 ثانية", label: "زمن الرصد" },
      { val: "1.4M ريال", label: "قيمة الوفر المالي" },
    ],
    steps: [
      "1. سحب وتصفية الإعلانات العقارية الجديدة من المنصات المرخصة خلال 30 ثانية من طرحها.",
      "2. مقارنة السعر المطلوب بمتوسط سعر الصفقات الموثقة لنفس الحي في البورصة العقارية.",
      "3. احتساب فارق السعر، العائد التأجيري المتوقع، ونسبة الخصم عن سعر السوق.",
      "4. إرسال بطاقة الفرصة الاستثمارية الفورية إلى قناة المستثمرين الخاصة عبر WhatsApp.",
    ],
    tools: ["Web Scraping Webhooks", "Real Estate Data API", "WhatsApp Business Cloud", "PostgreSQL"],
    impact: "اقتناص أكثر من 12 فرصة عقارية استثنائية بوفر إجمالي تجاوز 1.4 مليون ريال.",
    accent: "emerald",
  },
  {
    key: "store_sync",
    tag: "سلة & زد • Google Sheets Sync",
    badgeText: "E-Commerce Accounting Automator",
    title: "المزامنة التلقائية لمبيعات المتاجر مع تقارير Google Sheets المحاسبية",
    description:
      "نقل لحظي لجميع بيانات الطلبات، خصومات الكوبونات، ضريبة القيمة المضافة، وتكاليف الشحن مباشرة إلى جدول محاسبي تفاعلي مع تحديث فوري لرسوم بيانية حية للأرباح.",
    stats: [
      { val: "100%", label: "دقة مطابقة الحسابات" },
      { val: "40 ساعة", label: "وفر محاسبي شهري" },
      { val: "لحظي", label: "مزامنة البيانات" },
    ],
    steps: [
      "1. الاستماع إلى Webhook الطلبات المكتملة في متجر سلة أو زد أو Shopify.",
      "2. فرز وتفكيك بيانات الطلب (سعر المنتجات، كود الخصم، الضريبة 15%، شركة الشحن، بوابة الدفع).",
      "3. إضافة صف بيانات جديد تلقائياً في Google Sheets مع تحديث المعادلات المحاسبية.",
      "4. إشعار يومي للمدير المالي بصافي الأرباح بعد خصم رسوم البوابات والشحن.",
    ],
    tools: ["Salla / Zid Webhooks", "Google Sheets API", "Telegram Notification", "n8n Cloud"],
    impact: "دقة 100% في مطابقة الحسابات وتوفير 40 ساعة شهرياً كانت تضيع في الإدخال اليدوي.",
    accent: "cyan",
  },
];

export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider font-mono">
            PROVEN CASE STUDIES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading mt-4 mb-4">
            نماذج من منظومات Automata IQ المنجزة
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            مشاريع حقيقية تعمل الآن في بيئات إنتاجية حية وتوفر مئات الساعات شهرياً لعملائنا.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((proj, idx) => (
            <motion.div
              key={proj.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-7 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    {proj.tag}
                  </span>
                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> يعمل ذاتياً 24/7
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mb-3">
                  {proj.title}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {proj.description}
                </p>

                <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-xl bg-slate-950/80 border border-slate-800/80 mb-6 text-center">
                  {proj.stats.map((st, sIdx) => (
                    <div key={sIdx}>
                      <div className="text-base font-bold text-cyan-400 font-heading">
                        {st.val}
                      </div>
                      <div className="text-[10px] text-slate-400">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedProject(proj)}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold flex items-center justify-center gap-2 transition-colors border border-slate-700"
              >
                <GitBranch className="w-4 h-4 text-cyan-400" />
                <span>استعراض مسار العمل (Show Pipeline)</span>
              </motion.button>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Pipeline Inspection Modal with Framer Motion */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 left-6 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  {selectedProject.badgeText}
                </span>
                <h3 className="text-2xl font-bold text-white font-heading mt-3 mb-2">
                  {selectedProject.title}
                </h3>
                <p className="text-sm text-emerald-400 font-semibold">
                  الأثر المحقق: {selectedProject.impact}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-bold text-slate-300 font-heading mb-3">
                  مسار التدفق البرمجي المطبق:
                </h4>
                <div className="space-y-2.5">
                  {selectedProject.steps.map((step, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 text-xs sm:text-sm flex items-start gap-3"
                    >
                      <ArrowLeftCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-300 font-heading mb-2">
                  التقنيات المستخدمة:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs border border-slate-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-800 flex justify-end">
                <a
                  href="#consultation"
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-indigo-500 transition-all"
                >
                  طلب تنفيذ منظومة مماثلة لشركتك ➔
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
