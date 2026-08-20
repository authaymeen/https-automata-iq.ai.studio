import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Sparkles, X, ArrowLeft, Send, CheckCircle2 } from "lucide-react";

interface SectionContext {
  id: string;
  name: string;
  badge: string;
  defaultMessage: string;
}

const SECTION_CONTEXTS: Record<string, SectionContext> = {
  hero: {
    id: "hero",
    name: "الرئيسية واستكشاف الحلول",
    badge: "بدء مشروع جديد",
    defaultMessage: "مرحباً AUTOMATA IQ، أود بدء مشروع جديد لأتمتة العمليات وهندسة الذكاء الاصطناعي في شركتي ومضاعفة الكفاءة التشغيلية.",
  },
  services: {
    id: "services",
    name: "خدمات الأتمتة والموظفون الرقميون",
    badge: "استشارة خدمات",
    defaultMessage: "مرحباً AUTOMATA IQ، أنا أتصفح قسم خدمات الأتمتة والموظفين الرقميين، وأرغب في استشارة مخصصة لتحديد أفضل نظام مؤتمت يناسب نشاطي التجاري.",
  },
  packages: {
    id: "packages",
    name: "باقاتنا والمنظومات المخصصة",
    badge: "طلب باقة / منظومة",
    defaultMessage: "مرحباً AUTOMATA IQ، اطلعت على باقاتكم والمنظومات الذكية وأرغب في الاستفسار عن تفاصيل الباقة الأنسب لبدء مشروعي.",
  },
  simulator: {
    id: "simulator",
    name: "المحاكي التفاعلي وموظفو AI",
    badge: "تجربة المحاكي",
    defaultMessage: "مرحباً AUTOMATA IQ، جربت المحاكي التفاعلي للأنظمة الذكية، وأرغب في بناء موظف رقمي مماثل لنشاطي التجاري.",
  },
  projects: {
    id: "projects",
    name: "المشاريع ودراسات الحالة المنجزة",
    badge: "قصص النجاح",
    defaultMessage: "مرحباً AUTOMATA IQ، اطلعت على المشاريع وقصص النجاح المنجزة، وأود مناقشة تطبيق حل أتمتة مماثل في منشأتي.",
  },
  calculator: {
    id: "calculator",
    name: "حاسبة الوفر المالي والعائد ROI",
    badge: "حاسبة الوفر",
    defaultMessage: "مرحباً AUTOMATA IQ، استخدمت حاسبة الوفر المالي وأرغب في مناقشة خطة تقليل التكاليف التشغيلية وساعات العمل اليدوية في فريقي.",
  },
  warranty: {
    id: "warranty",
    name: "ضمان الجاهزية والتشغيل 100%",
    badge: "ضمان التشغيل",
    defaultMessage: "مرحباً AUTOMATA IQ، اطلعت على ضمان التشغيل التام وأود بدء المشروع وتجهيز منظومة الأتمتة الخاصة بي.",
  },
  process: {
    id: "process",
    name: "منهجية العمل والجدول الزمني",
    badge: "منهجية التنفيذ",
    defaultMessage: "مرحباً AUTOMATA IQ، أود الاستفسار عن خطوات ومنهجية العمل والجدول الزمني لبدء تنفيذ مشروعي.",
  },
  consultation: {
    id: "consultation",
    name: "حجز جلسة استكشافية",
    badge: "جلسة استراتيجية",
    defaultMessage: "مرحباً AUTOMATA IQ، أود حجز جلسة استكشافية ومناقشة التحديات التشغيلية وتحديد خطة الأتمتة المخصصة لنشاطي.",
  },
  faq: {
    id: "faq",
    name: "الأسئلة الشائعة والاستفسارات",
    badge: "استفسار سريع",
    defaultMessage: "مرحباً AUTOMATA IQ، لدي بعض الاستفسارات حول آليات الربط والأتمتة وأود التواصل مع أحد مستشاريكم.",
  },
};

const WA_BASE_URL = "https://wa.me/966581751130";

export default function FloatingWhatsApp() {
  const [activeSection, setActiveSection] = useState<SectionContext>(SECTION_CONTEXTS.hero);
  const [isOpen, setIsOpen] = useState(false);
  const [customNote, setCustomNote] = useState("");

  // Detect current active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.keys(SECTION_CONTEXTS);
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(SECTION_CONTEXTS[sectionId]);
            return;
          }
        }
      }

      // Default to hero if at the top
      if (window.scrollY < 400) {
        setActiveSection(SECTION_CONTEXTS.hero);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const generateWhatsAppUrl = (customText?: string) => {
    const textToSend = customText || customNote.trim() || activeSection.defaultMessage;
    return `${WA_BASE_URL}?text=${encodeURIComponent(textToSend)}`;
  };

  const handleDirectClick = (e: React.MouseEvent) => {
    // If popover is closed, clicking directly opens WhatsApp with current context
    // or toggles options menu
    const targetUrl = generateWhatsAppUrl();
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start font-sans" dir="rtl">
      
      {/* Smart Contextual Popup Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="mb-4 w-80 sm:w-96 rounded-3xl bg-slate-900/95 backdrop-blur-2xl border border-emerald-500/30 p-5 shadow-2xl text-right overflow-hidden shadow-emerald-500/10"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">مستشار AUTOMATA IQ</h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>متصل الآن لخدمتك عبر واتساب</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current Section Context Indicator */}
            <div className="my-3.5 p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] text-slate-400 font-mono">القسم المتصفح حالياً:</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {activeSection.badge}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-200">{activeSection.name}</p>
            </div>

            {/* Dynamic Message Preview */}
            <div className="mb-4">
              <label className="block text-[11px] text-slate-400 mb-1.5">
                نص الرسالة الذكية المقترحة:
              </label>
              <textarea
                value={customNote || activeSection.defaultMessage}
                onChange={(e) => setCustomNote(e.target.value)}
                rows={3}
                className="w-full text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors resize-none leading-relaxed"
                placeholder="اكتب رسالتك المخصصة هنا..."
              />
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
              >
                <Send className="w-4 h-4" />
                <span>إرسال ومتابعة عبر WhatsApp المباشر</span>
              </a>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    const url = `${WA_BASE_URL}?text=${encodeURIComponent("مرحباً AUTOMATA IQ، أرغب في حجز جلسة استكشافية مجانية لمناقشة أتمتة شركتي.")}`;
                    window.open(url, "_blank");
                    setIsOpen(false);
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-300 text-center transition-colors"
                >
                  ⚡ حجز جلسة مجانية
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const url = `${WA_BASE_URL}?text=${encodeURIComponent("مرحباً AUTOMATA IQ، أود طلب تسعيرة لمنظومة أتمتة متخصصة لنشاطي التجاري.")}`;
                    window.open(url, "_blank");
                    setIsOpen(false);
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-slate-300 text-center transition-colors"
                >
                  💼 طلب تسعيرة فورية
                </button>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button with dynamic context pill */}
      <div className="flex items-center gap-3">
        
        {/* Dynamic Context Pill (shown on desktop & hover) */}
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-emerald-500/40 text-xs font-semibold shadow-xl backdrop-blur-xl transition-all group"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>استفسر عن: <strong className="text-emerald-400">{activeSection.badge}</strong></span>
          <ArrowLeft className="w-3 h-3 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
        </motion.button>

        {/* WhatsApp Round Floating Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="relative"
        >
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 hover:from-emerald-500 hover:to-emerald-300 text-slate-950 shadow-2xl shadow-emerald-500/40 transition-all hover:scale-110 active:scale-95"
            aria-label="تواصل واتساب الذكي"
          >
            {/* Ping indicator */}
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-300 border-2 border-slate-950" />
            </span>

            {isOpen ? (
              <X className="w-6 h-6 text-slate-950 transition-transform rotate-90" />
            ) : (
              <MessageCircle className="w-7 h-7 text-slate-950 fill-slate-950/10" />
            )}
          </button>
        </motion.div>

      </div>

    </div>
  );
}
