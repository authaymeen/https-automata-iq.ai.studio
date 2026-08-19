import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, ShoppingBag, Mic, Link, Star, MessageSquare, 
  TrendingUp, Coins, Zap, Target, Sparkles, CheckCircle2,
  ChevronLeft, ArrowUpRight, Award, Quote, HelpCircle
} from "lucide-react";

export default function PlatformLandingHighlights() {
  const [activeFaq, setActiveFaq] = React.useState<number | null>(null);

  const faqs = [
    {
      q: "ما هي منصة Prompt Master وكيف تفيدني كتاجر؟",
      a: "منصة Prompt Master هي نظام متكامل لهندسة وصياغة الأوامر الصارمة (Prompt Engineering) وتطويع الذكاء الاصطناعي ليناسب السوق السعودي والخليجي. نساعدك في صياغة نصوص ترويجية ناجحة، وسيناريوهات إعلانات تيك توك وسناب شات، وتفنيد اعتراضات العملاء وإتمام الصفقات على واتساب لرفع المبيعات ومعدل التحويل (CRO)."
    },
    {
      q: "كيف تختلف هذه الأداة عن ChatGPT أو Claude المعتاد؟",
      a: "الذكاء الاصطناعي العام يعطيك نتائج عامة وغالباً ما تكون ركيكة أو غير متوافقة مع النفسية والقدرة الشرائية الخليجية. في Prompt Master، نستخدم هندسة أوامر صارمة (تحديد أدوار دقيقة، سياقات واضحة، قيود قاسية على الكلمات المستهلكة، وتنسيق مخرجات جاهز للنسخ والتطبيق)، مما يعطيك جودة مضاعفة 10 مرات تلائم براندك تماماً."
    },
    {
      q: "ما هو استوديو الأصوات الطبيعية (Voice Generator)؟",
      a: "هي ميزة حصرية بباقة ULTRA تمكنك من توليد مقاطع صوتية بشرية دافئة تتنفس بشكل طبيعي بلهجة سعودية، إماراتية، أو مصرية. يمكنك استخدام هذه الأصوات لعمل إعلانات مسموعة، أو إرسالها للعملاء على واتساب لتسريع إغلاق الصفقات بلمسة إنسانية مقنعة."
    },
    {
      q: "كيف يمكنني تفعيل الباقات (PRO أو ULTRA)؟",
      a: "بعد تسجيل الدخول ببريدك الإلكتروني، يمكنك الحصول على كود التفعيل الفريد الخاص بك للباقة التي تناسبك. بمجرد إدخال الكود في خانة التفعيل بأسفل صفحة الأداة، سيتم تفعيل باقتك سحابياً وبشكل فوري لـ 30 يوماً كاملة."
    },
    {
      q: "هل يمكنني ربط المنصة بأدوات الأتمتة الخارجية؟",
      a: "نعم بالتأكيد! في باقة ULTRA نقدم ميزة الويب هوك (Webhook Integration) المباشر والربط البرمجي، مما يسمح لك بربط حسابك مع منصات الأتمتة العالمية مثل Make.com و n8n لأتمتة سحب بيانات المنتجات وتوليد السيناريوهات والأصوات بشكل آلي بالكامل."
    }
  ];

  const targetAudiences = [
    {
      icon: <ShoppingBag className="w-5 h-5 text-cyan-400" />,
      title: "تجار المتاجر الإلكترونية (سلة، زد، Shopify)",
      desc: "التجار الطامحون لزيادة مبيعاتهم وصياغة نصوص ترويجية نارية ووصف منتجات جذاب يخاطب عاطفة العميل الخليجي ويدفعه للشراء فوراً دون تكبد تكاليف شركات التسويق.",
      metrics: "متوسط زيادة مبيعات +240%"
    },
    {
      icon: <Users className="w-5 h-5 text-amber-400" />,
      title: "صناع المحتوى والـ Copywriters",
      desc: "صانعو المحتوى والمسوقون الذين يطلقون حملات إعلانية على تيك توك وسناب شات ويحتاجون لسيناريوهات إبداعية سريعة بصوت بشري طبيعي 100% لإقناع الجمهور في أول 3 ثوانٍ.",
      metrics: "توفير 18 ساعة كتابة أسبوعياً"
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-emerald-400" />,
      title: "فرق المبيعات وإغلاق صفقات واتساب",
      desc: "مسؤولو خدمة العملاء والمبيعات الذين يرغبون في قوالب صلبة واحترافية للرد على استفسارات العملاء الحذرة، وتفنيد الاعتراضات، وإتمام الدفع بسلاسة وسرعة فائقة.",
      metrics: "معدل تحويل صفقات +45%"
    },
    {
      icon: <Target className="w-5 h-5 text-sky-400" />,
      title: "أصحاب العلامات التجارية والوكالات",
      desc: "الرواد والشركات الذين يريدون توحيد نبرة البراند (Brand Tone of Voice) وأتمتة صناعة المحتوى على نطاق واسع عبر الربط البرمجي المباشر مع أنظمتهم الداخلية.",
      metrics: "إنتاج محتوى مضاعف 10 مرات"
    }
  ];

  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
      title: "هندسة الأوامر الصارمة والذكية",
      desc: "وداعاً للأوامر البسيطة عديمة النفع. محركنا يقوم بهيكلة أفكارك إلى برومبتات فائقة الدقة بأسلوب الأدوار والسياقات والقيود الصارمة لتحصل على أفضل مخرجات من ChatGPT و Claude.",
      highlight: "مدعوم بنماذج Gemini"
    },
    {
      icon: <Mic className="w-6 h-6 text-sky-400" />,
      title: "استوديو الأصوات البشرية الطبيعية",
      desc: "معلق صوتي ذكي ينتج مقاطع صوتية (WAV) بلهجة سعودية، إماراتية، أو مصرية طبيعية مفعمة بالدفء والتنفس البشري الحقيقي، خالية تماماً من النبرة الآلية المزعجة للروبوتات.",
      highlight: "أصوات طبيعية 100%"
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: "مستودع وهوية البراند الخاص (Brand Hub)",
      desc: "احفظ اسم شركتك، جمهورك المستهدف، نبرتك الخاصة، وهوية علامتك التجارية في مستودع آمن ليقوم الذكاء الاصطناعي بتطبيقها تلقائياً على كافة الأوامر والمقاطع الصوتية المتولدة.",
      highlight: "ميزة ULTRA الخاصة"
    },
    {
      icon: <Link className="w-6 h-6 text-emerald-400" />,
      title: "أتمتة الويب هوك والتوليد الدفعي (Batch)",
      desc: "قم بتوليد مئات الأوامر والسيناريوهات التسويقية دفعة واحدة بنقرة زر واحدة، أو اربط المنصة مباشرة مع Make.com أو n8n لتلقي وتوليد البيانات آلياً من متجرك.",
      highlight: "أتمتة متكاملة وسلسة"
    }
  ];

  const testimonials = [
    {
      name: "عبدالرحمن الشمري",
      role: "مؤسس براند دخون العود الفاخر",
      badge: "متجر سلة - السعودية",
      avatarBg: "bg-cyan-500/10 text-cyan-400",
      content: "كنت أعاني جداً من كتابة سيناريوهات تيك توك لمنتجات العود وتكلفة المعلقين الصوتيين باهظة. باستخدام استوديو الأصوات الطبيعية والبرومبت الخليجي هنا، قمنا بإنشاء 15 إعلان تيك توك في يوم واحد! جودة الصوت بشرية ومقنعة لدرجة أن أحداً لم يصدق أنه ذكاء اصطناعي. مبيعاتنا ارتفعت بشكل ملحوظ والحمد لله.",
      rating: 5,
      impact: "توفير 4,500 ريال وزيادة CTR بنسبة 35%"
    },
    {
      name: "منى الهاشمي",
      role: "مديرة متجر لورين للعبايات والأزياء",
      badge: "متجر زد - الإمارات",
      avatarBg: "bg-amber-500/10 text-amber-400",
      content: "برنامج الـ WhatsApp Closing وقوالب إقناع العميل غيرت طريقتنا في الرد تماماً. العملاء الذين كانوا يتركون عبايات في السلة الآن نتواصل معهم ببرومبت سيكولوجي مخصص، وبأصوات طبيعية دافئة تشرح جودة القماش. معدل إتمام الطلبات قفز بطريقة خيالية!",
      rating: 5,
      impact: "استرجاع 62% من السلات المتروكة"
    },
    {
      name: "خالد عبدالكريم",
      role: "المدير الإبداعي لوكالة تريندز الرقمية",
      badge: "صناعة محتوى وتسويق - مصر والخليج",
      avatarBg: "bg-emerald-500/10 text-emerald-400",
      content: "كمختص تسويق، كتابة الأوامر لـ Midjourney و ChatGPT كانت تأخذ منا ساعات لإصابة النبرة الخليجية الصحيحة. بعد استخدام مستودع البراند والأوامر الصارمة المهندسة هنا، أصبح لدينا مصنع متكامل للمحتوى. التوليد الدفعي (Batch) وفر علينا أياماً كاملة من العمل الإبداعي المكرر.",
      rating: 5,
      impact: "CRO أفضل بـ 3 أضعاف وسرعة إنتاج خارقة"
    }
  ];

  return (
    <div className="space-y-16 py-8" dir="rtl">
      
      {/* SECTION 1: FOR WHOM */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-[10px] font-extrabold">
            <Users className="w-3.5 h-3.5" />
            <span>الفئات المستهدفة بالمنصة</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-100">لمن تم تصميم منصة Prompt Master؟ 🎯</h3>
          <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
            لقد بنينا هذا النظام خصيصاً ليناسب بيئة وتحديات التجارة الإلكترونية والإعلانات في المملكة العربية السعودية والخليج العربي.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {targetAudiences.map((audience, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ scale: 1.01 }}
              className="bg-slate-950/40 border border-slate-900/60 hover:border-cyan-500/20 rounded-2xl p-5 flex gap-4 transition-all relative overflow-hidden group glowing-card"
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-br-full pointer-events-none transition-all group-hover:from-cyan-500/10" />
              
              <div className="p-3 bg-slate-900 rounded-xl h-fit shrink-0 border border-slate-800">
                {audience.icon}
              </div>
              
              <div className="space-y-2">
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-200 group-hover:text-cyan-300 transition-colors">
                  {audience.title}
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {audience.desc}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-400 bg-cyan-950/20 w-fit px-2.5 py-1 rounded-lg border border-cyan-900/20">
                  <TrendingUp className="w-3 h-3" />
                  <span>{audience.metrics}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 2: EXCLUSIVE FEATURES / ADVANTAGES */}
      <section className="space-y-8 bg-slate-950/30 border border-white/5 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 -translate-y-1/2 left-10 w-64 h-64 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 -translate-y-1/2 right-10 w-64 h-64 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="text-center space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-[10px] font-extrabold">
            <Zap className="w-3.5 h-3.5" />
            <span>مميزات تنافسية خارقة</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-100">لماذا يختار تجار النخبة نظامنا؟ ✨</h3>
          <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
            المنصة توفر بيئة إبداعية متكاملة ومؤتمتة لإنتاج وتوطين المحتوى التسويقي الخليجي دون وسطاء وبسرعة فائقة.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {features.map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-slate-950/70 border border-slate-900 hover:border-amber-500/20 p-5 rounded-2xl flex flex-col justify-between space-y-4 transition-all group shadow-lg"
            >
              <div className="space-y-3">
                <div className="p-2.5 bg-slate-900 rounded-xl w-fit border border-slate-800 transition-all group-hover:scale-110">
                  {feat.icon}
                </div>
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-200 group-hover:text-amber-300 transition-colors">
                  {feat.title}
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex justify-between items-center text-[9px] font-bold">
                <span className="text-slate-500">الحالة: نشط مدمج ✓</span>
                <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  {feat.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3: TESTIMONIALS & CLIENT REVIEWS */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-extrabold">
            <Award className="w-3.5 h-3.5" />
            <span>قصص نجاح التجار والشركاء</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-100">آراء وتجارب شركائنا في السوق الخليجي 🏆</h3>
          <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
            اطلع على ما حققه زملاؤك من تجار المتاجر وصناع المحتوى والوكالات بعد تفعيل نظام هندسة الإقناع بالذكاء الاصطناعي.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="bg-slate-950/40 border border-slate-900 rounded-2xl p-6 flex flex-col justify-between space-y-5 relative group hover:border-emerald-500/20 transition-all glowing-card"
            >
              {/* Quote icon watermarked background */}
              <Quote className="absolute top-4 left-4 w-12 h-12 text-white/[0.02] group-hover:text-emerald-500/[0.04] transition-all pointer-events-none" />

              <div className="space-y-4">
                {/* Stars and Badge */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-0.5">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-extrabold px-2 py-0.5 rounded-full">
                    {test.badge}
                  </span>
                </div>

                {/* Testimonial Content */}
                <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed text-right relative z-10 italic">
                  &ldquo;{test.content}&rdquo;
                </p>
              </div>

              {/* Author & Impact Stats */}
              <div className="pt-4 border-t border-white/5 space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${test.avatarBg} flex items-center justify-center font-black text-xs font-sans shrink-0`}>
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-extrabold text-xs text-slate-200">{test.name}</h5>
                    <p className="text-[10px] text-slate-500">{test.role}</p>
                  </div>
                </div>

                <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-2.5 text-center text-[10px] font-bold text-emerald-400">
                  الأثر المحقق: <span className="text-white">{test.impact}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4: FAQ (الأسئلة الشائعة) */}
      <section className="space-y-8 bg-slate-950/20 border border-white/5 rounded-3xl p-6 sm:p-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-[10px] font-extrabold">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400 animate-bounce" />
            <span>الأسئلة الشائعة وإجاباتها</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-100">هل لديك استفسار؟ إليك الإجابات المعتمدة 💬</h3>
          <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
            كل ما تود معرفته عن نظام هندسة الأوامر الصارمة والترقية وطرق الاستفادة القصوى لتنمية تجارتك.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-slate-950/40 border border-slate-900 rounded-2xl overflow-hidden transition-all duration-300 hover:border-cyan-500/10"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full py-4 px-5 flex items-center justify-between text-right gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-extrabold text-xs text-slate-200 hover:text-cyan-400 transition-colors">
                    {faq.q}
                  </span>
                  <span className={`p-1 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-cyan-400" : ""}`}>
                    <HelpCircle className="w-4 h-4" />
                  </span>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-[11px] sm:text-xs text-slate-400 leading-relaxed border-t border-white/[0.02]">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* CALL TO ACTION ACCENT BAR */}
      <div className="bg-gradient-to-r from-cyan-500/10 via-slate-950/80 to-fuchsia-500/10 border border-cyan-500/15 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-right">
        <div className="space-y-1">
          <h4 className="text-xs sm:text-sm font-black text-slate-100 flex items-center gap-1.5 justify-center sm:justify-start">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>هل أنت مستعد لمضاعفة معدلات تحويل متجرك (CRO) اليوم؟</span>
          </h4>
          <p className="text-[10px] text-slate-400">
            ابدأ باستخدام أداة هندسة الأوامر الأساسية مجاناً وسجل حسابك في أقل من دقيقة.
          </p>
        </div>

        <button
          onClick={() => {
            const loginSection = document.getElementById("auth-portal-section");
            if (loginSection) {
              loginSection.scrollIntoView({ behavior: "smooth" });
            } else {
              window.scrollTo({ top: 150, behavior: "smooth" });
            }
          }}
          className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-[11px] font-black py-2.5 px-6 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
        >
          <span>سجل حسابك أو فعل كودك الآن</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
