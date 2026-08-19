import React from "react";
import { motion } from "framer-motion";
import { MessageSquareWarning, ShoppingBag, Radar, Network, Check } from "lucide-react";

const SERVICES = [
  {
    id: 1,
    icon: MessageSquareWarning,
    tag: "AI Sentiment Engine",
    title: "أنظمة خدمة العملاء وإدارة السمعة الذكية",
    description:
      "رصد تلقائي لتقييمات Google Maps والمراجعات، تحليل المشاعر بالذكاء الاصطناعي، صياغة الردود الذكية، وتنبيه فوري لغرف العمليات عند ورود شكوى سلبية لتداركها خلال دقائق.",
    features: [
      "إنذار فوري عبر Telegram / WhatsApp لتقييمات (1-2 نجمة).",
      "أرشفة وتحليل يومي للأسباب الجذرية لتكرار الشكاوى.",
      "ردود دبلوماسية مخصصة بحسب هوية علامتك التجارية.",
    ],
    accentColor: "cyan",
    borderClass: "border-cyan-500/20 hover:border-cyan-500/50",
    shadowClass: "hover:shadow-cyan-500/10",
    tagClass: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    iconBgClass: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950",
  },
  {
    id: 2,
    icon: ShoppingBag,
    tag: "E-Commerce Sync",
    title: "أتمتة تدفقات التجارة الإلكترونية ومزامنة الفواتير",
    description:
      "ربط متجرك الإلكتروني (سلة، زد، Shopify) مع Google Sheets وبرامج المحاسبة، وتحديث المخزون وإصدار الفواتير الضريبية ومتابعة الشحنات تلقائياً بدون تدخل بشري.",
    features: [
      "مزامنة لحظية للطلبات، الضرائب، والأرباح الصافية.",
      "تنبيهات فورية عند وصول المنتجات لحد إعادة الطلب.",
      "استرجاع آلي للسلات المتروكة عبر رسائل واتساب ذكية.",
    ],
    accentColor: "indigo",
    borderClass: "border-indigo-500/20 hover:border-indigo-500/50",
    shadowClass: "hover:shadow-indigo-500/10",
    tagClass: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
    iconBgClass: "bg-indigo-500/10 border-indigo-500/30 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white",
  },
  {
    id: 3,
    icon: Radar,
    tag: "Data Scraping & Radar",
    title: "رادارات الرصد الفوري للبيانات والفرص الاستثمارية",
    description:
      "سحب وتصفية البيانات الحية من منصات العقار، المتاجر المنافسة، أو المناقصات لحظة بلحظة، وتنبيه فريقك بالفرص الذهبية قبل الجميع عبر لوحات تحكم متقدمة.",
    features: [
      "مقارنة فورية لأسعار المتر والصفقات العقارية الجديدة.",
      "تنبيه المستثمرين بخصومات المنافسين وتغيرات الأسعار.",
      "توليد تقارير أسبوعية وشهرية آلية ومفصلة بصيغة PDF.",
    ],
    accentColor: "emerald",
    borderClass: "border-emerald-500/20 hover:border-emerald-500/50",
    shadowClass: "hover:shadow-emerald-500/10",
    tagClass: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    iconBgClass: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950",
  },
  {
    id: 4,
    icon: Network,
    tag: "Enterprise API Hub",
    title: "الربط البرمجي السحابي المخصص بين الأنظمة والمنصات",
    description:
      "ربط قواعد بياناتك (SQL / Cloud DBs) مع تطبيقات فريقك (Slack, Notion, Airtable, HubSpot, ERP)، لإنشاء بيئة عمل موحدة وتلقائية تنهي تشتت البيانات.",
    features: [
      "بناء سيناريوهات أتمتة مخصصة (Make / n8n / Custom APIs).",
      "تشفير عالي وأمان صارم لبيانات العملاء والأرقام المالية.",
      "صيانة ومراقبة مستمرة على مدار الساعة مع دعم تقني مخصص.",
    ],
    accentColor: "cyan",
    borderClass: "border-cyan-500/20 hover:border-cyan-500/50",
    shadowClass: "hover:shadow-cyan-500/10",
    tagClass: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    iconBgClass: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950",
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
            CORE SOLUTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading mt-4 mb-4">
            خدمات وحلول Automata IQ المتخصصة
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            نبني منظومات برمجية ذكية مصممة خصيصاً لسد الثغرات التشغيلية ورفع الإنتاجية إلى أقصى حد.
          </p>
        </motion.div>

        {/* 4 Cards Grid with Hover Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className={`p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border ${srv.borderClass} ${srv.shadowClass} transition-all duration-300 group hover:shadow-2xl relative overflow-hidden`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 ${srv.iconBgClass}`}
                >
                  <Icon className="w-7 h-7" />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-mono px-2 py-0.5 rounded border ${srv.tagClass}`}>
                    {srv.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white font-heading mb-3">
                  {srv.title}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {srv.description}
                </p>

                <ul className="space-y-2.5 text-sm text-slate-300 border-t border-slate-800/80 pt-5">
                  {srv.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
