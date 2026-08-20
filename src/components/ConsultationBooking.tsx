import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, PhoneCall, Send, Sparkles } from "lucide-react";

export default function ConsultationBooking() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    task: "",
  });
  const [status, setStatus] = useState<{ type: "idle" | "loading" | "success" | "error"; msg: string }>({
    type: "idle",
    msg: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, company, phone, email, task } = formData;

    if (!name || !company || !phone || !task) {
      setStatus({ type: "error", msg: "يرجى إكمال جميع الحقول الإلزامية (*) لمتابعة الطلب." });
      return;
    }

    setStatus({ type: "loading", msg: "جاري تجهيز التحويل الآمن..." });

    // Format WhatsApp payload
    const waMessage = `*طلب استشارة أتمتة جديدة عبر AUTOMATA IQ:*
━━━━━━━━━━━━━━━━━
👤 *الاسم:* ${name}
🏢 *الشركة/النشاط:* ${company}
📱 *رقم الهاتف:* ${phone}
✉️ *البريد الإلكتروني:* ${email || "غير محدد"}
━━━━━━━━━━━━━━━━━
🎯 *العملية المطلوب أتمتتها:*
"${task}"
━━━━━━━━━━━━━━━━━
يرجى تأكيد موعد الجلسة الاستكشافية وخطة الأتمتة المخصصة.`;

    const encodedMsg = encodeURIComponent(waMessage);
    const waUrl = `https://wa.me/966581751130?text=${encodedMsg}`;

    setTimeout(() => {
      setStatus({
        type: "success",
        msg: "✓ تم استلام بياناتك بنجاح! جاري تحويلك لمحادثة WhatsApp المباشرة...",
      });
      setTimeout(() => {
        window.open(waUrl, "_blank");
        setStatus({ type: "idle", msg: "" });
      }, 1200);
    }, 800);
  };

  return (
    <section id="consultation" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Info Column (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 text-right"
          >
            <span className="px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase font-mono">
              FREE STRATEGY CALL
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading mt-4 mb-6 leading-tight">
              دعنا نؤتمت عملك ونضاعف أرباحك
            </h2>
            <p className="text-slate-300 text-base mb-8 leading-relaxed">
              احجز جلسة استكشافية مجانية مدتها 20 دقيقة مع خبراء Automata IQ لمناقشة تحديات نشاطك ورسم خطة الأتمتة المناسبة.
            </p>

            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <span>تحليل مجاني لسير العمل الحالي ونقاط الهدر</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <span>مخطط مقترح لسيناريو الأتمتة والوفر المتوقع</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <span>سرية تامة لبياناتك ونشاطك التجاري</span>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center flex-shrink-0">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs text-slate-400">تفضل التواصل المباشر السريع؟</div>
                <a
                  href="https://wa.me/966581751130?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20AUTOMATA%20IQ%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AD%D9%84%D9%88%D9%84%20%D8%A7%D9%84%D8%A3%D8%AA%D9%85%D8%AA%D8%A9%20%D9%88%D8%AD%D8%AC%D8%B2%20%D8%AC%D9%84%D8%B3%D8%A9%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9."
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-bold text-cyan-400 hover:underline"
                >
                  تحدث مع خبير الأتمتة عبر واتساب مباشرة ➔
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form Column (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-slate-950/90 border border-slate-800 backdrop-blur-xl shadow-2xl relative"
          >
            <h3 className="text-2xl font-bold text-white font-heading mb-6">
              نموذج طلب الاستشارة وخطة الأتمتة
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    الاسم الكريم *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="مثال: عبدالله الشمري"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    اسم الشركة أو المتجر *
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    placeholder="مثال: متجر أصايل / شركة الأفق"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    رقم الواتساب للتواصل *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="مثال: 0501234567"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition-colors text-right"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    البريد الإلكتروني المهني
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  ما هي العملية أو المهمة التي ترغب في أتمتتها؟ *
                </label>
                <textarea
                  id="task"
                  value={formData.task}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="مثال: نريد أتمتة استخراج تقارير المبيعات من سلة إلى Google Sheets وإرسال تنبيهات للواتساب..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status.type === "loading"}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-base shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-3 transition-all font-heading"
              >
                {status.type === "loading" ? (
                  <Sparkles className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5 text-slate-950" />
                )}
                <span>إرسال طلب الاستشارة والتحويل للواتساب</span>
              </motion.button>

              <AnimatePresence>
                {status.msg && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-4 rounded-xl text-center text-xs font-bold ${
                      status.type === "error"
                        ? "bg-red-500/20 text-red-300 border border-red-500/40"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    }`}
                  >
                    {status.msg}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
