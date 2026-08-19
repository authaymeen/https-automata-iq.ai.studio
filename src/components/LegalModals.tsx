import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Shield, FileText, Users, Scale, Clock, CheckCircle2, Globe, Heart, Building, PhoneCall, Award
} from "lucide-react";

interface LegalModalsProps {
  activeTab: "about" | "privacy" | "terms" | "refund" | null;
  onClose: () => void;
}

export default function LegalModals({ activeTab, onClose }: LegalModalsProps) {
  // Listen to Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!activeTab) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
        id="legal-modal-overlay"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden text-right"
          onClick={(e) => e.stopPropagation()}
          dir="rtl"
          id="legal-modal-container"
        >
          {/* Header Accent Line */}
          <div className="h-1 bg-gradient-to-l from-cyan-500 via-fuchsia-500 to-amber-400 w-full" id="legal-modal-accent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors z-10 cursor-pointer"
            id="legal-modal-close-btn"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="p-6 border-b border-slate-800/60 bg-slate-900/50 flex items-center gap-3.5" id="legal-modal-header">
            {activeTab === "about" && (
              <>
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400" id="header-icon-about">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-100" id="modal-title-about">من نحن - شبكة Automata IQ</h3>
                  <p className="text-xs text-slate-400 mt-0.5">تعرّف على منصة Prompt Master ومحرك الذكاء الاصطناعي</p>
                </div>
              </>
            )}
            {activeTab === "privacy" && (
              <>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400" id="header-icon-privacy">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-100" id="modal-title-privacy">سياسة الخصوصية وسرية البيانات</h3>
                  <p className="text-xs text-slate-400 mt-0.5">التزامنا بحماية بياناتك وهويتك الرقمية كتاجر خليجي</p>
                </div>
              </>
            )}
            {activeTab === "terms" && (
              <>
                <div className="p-2.5 rounded-xl bg-fuchsia-500/10 text-fuchsia-400" id="header-icon-terms">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-100" id="modal-title-terms">الشروط والأحكام وسياسة الاستخدام</h3>
                  <p className="text-xs text-slate-400 mt-0.5">القواعد المنظمة لاستخدام منصة Prompt Master</p>
                </div>
              </>
            )}
            {activeTab === "refund" && (
              <>
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400" id="header-icon-refund">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-100" id="modal-title-refund">الضمان الذهبي وسياسة الاسترجاع والإلغاء</h3>
                  <p className="text-xs text-slate-400 mt-0.5">الشفافية المطلقة وضمان تجربة الخدمة قبل تفعيل الاشتراك</p>
                </div>
              </>
            )}
          </div>

          {/* Content Area */}
          <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6 text-sm leading-relaxed text-slate-300 font-sans" id="legal-modal-body">
            
            {activeTab === "about" && (
              <div className="space-y-6" id="about-content">
                <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
                  <p className="font-semibold text-slate-100 mb-2">رؤيتنا ورسالتنا:</p>
                  <p className="text-slate-300 text-xs sm:text-sm">
                    إن منصة <span className="text-cyan-400 font-bold">Prompt Master (برومبت ماستر)</span> التابعة لشبكة <span className="text-fuchsia-400 font-bold">Automata IQ</span> هي النظام المتكامل والأول من نوعه في الخليج العربي المخصص لـ هندسة وصياغة الأوامر الصارمة وتحرير النبرات التسويقية للعلامات التجارية باستخدام نماذج الذكاء الاصطناعي المتقدمة.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/20 border border-slate-800/40">
                    <h4 className="font-bold text-slate-100 mb-1 flex items-center gap-2">
                      <Award className="w-4 h-4 text-cyan-400" />
                      رفع نسب التحويل (CRO)
                    </h4>
                    <p className="text-slate-400 text-xs">
                      نحن لا نولد نصوصاً عادية؛ بل نساعدك في صياغة سيناريوهات تسويقية قاسية وذكية تلمس نفسية المشتري الخليجي وتدفعه للشراء فوراً.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/20 border border-slate-800/40">
                    <h4 className="font-bold text-slate-100 mb-1 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-fuchsia-400" />
                      توطين المحتوى الذكي
                    </h4>
                    <p className="text-slate-400 text-xs">
                      نتخصص في اللهجات والثقافة المحلية (السعودية، الإماراتية، الخليجية العامة) لنمنح براندك صوتاً إنسانياً طبيعياً وحقيقياً.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-slate-100 text-sm">ما نقدمه للتجار:</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                    <li>أدوات هندسة الأوامر العكسية لمواجهة الحملات الإعلانية الصعبة.</li>
                    <li>مولد سيناريوهات تيك توك وسناب شات مع استوديو الأصوات الطبيعية البشري.</li>
                    <li>صياغات ردود مبيعات واتساب وإغلاق الصفقات وإرجاع السلات المتروكة.</li>
                    <li>أنظمة أتمتة الويب هوك (Webhook) للربط بـ Make.com و n8n لتسريع العمليات.</li>
                  </ul>
                </div>

                <div className="border-t border-slate-800/60 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-slate-400 bg-slate-950/10 -mx-6 -mb-6 p-6 mt-4">
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-cyan-500" />
                    <span>رابط الدومين الرسمي المعتمد:</span>
                    <a href="https://www.automata-iq.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-bold hover:underline">www.automata-iq.com</a>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                    <span>صُمم لنهضة ريادة الأعمال بالخليج</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="space-y-6" id="privacy-content">
                <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm flex items-start gap-3">
                  <Shield className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>
                    <strong>إشعار أمان:</strong> تلتزم منصة Prompt Master التزاماً صارماً بمبادئ خصوصية وحماية بيانات التجار والمستخدمين في المملكة العربية السعودية والخليج العربي طبقاً لنظام حماية البيانات الشخصية.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-slate-100 text-sm mb-1.5">1. البيانات التي نقوم بجمعها:</h4>
                    <p className="text-xs sm:text-sm text-slate-300">
                      نحن نجمع فقط بريدك الإلكتروني لإنشاء حسابك وتأمين اشتراكاتك. نجمع أيضاً بعض البيانات الإحصائية والتحليلية البسيطة (مثل عدد الكلمات المتولدة، أو تفاعلك مع الأداة) بهدف تقديم تجربة استخدام أسرع ومستقرة، ولا نقوم أبداً ببيع أو تبادل بريدك أو بياناتك لأي طرف خارجي.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-100 text-sm mb-1.5">2. خصوصية المدخلات والنصوص (Input Confidentiality):</h4>
                    <p className="text-xs sm:text-sm text-slate-300">
                      كل الأفكار، البراندات، سيناريوهات المنتجات، والنصوص التي تقوم بإدخالها وتوليدها في المنصة تعود ملكيتها الفكرية وحرمتها السرية لك بالكامل. نظامنا يقوم بمعالجتها سحابياً بشكل مؤقت لتوليد الإجابة ولا نقوم بتخزينها الدائم أو بيعها لأدوات الإعلانات المنافسة.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-100 text-sm mb-1.5">3. ملفات تعريف الارتباط وحفظ الجلسات:</h4>
                    <p className="text-xs sm:text-sm text-slate-300">
                      نستخدم نظام الجلسات المحلية (Local Cache) وملفات تعريف الارتباط الضرورية لنمنحك القدرة على تسجيل الدخول التلقائي والبقاء متصلاً بالنظام دون تكرار إدخال كلمة المرور مع الحفاظ على خصوصية التصفح.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-100 text-sm mb-1.5">4. معايير أمان الدفع والمزودين الخارجيين:</h4>
                    <p className="text-xs sm:text-sm text-slate-300">
                      نحن في Prompt Master نستخدم قنوات مشفرة بشكل كامل لنقل وتوليد أكواد التفعيل بالتعاون مع بوابات دفع آمنة ولا نحتفظ ببيانات بطاقتك الائتمانية أو تفاصيل الدفع المباشر على خوادمنا حمايةً لأموالك وحساباتك البنكية.
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-800/60 pt-4 flex justify-between items-center text-xs text-slate-500 bg-slate-950/10 -mx-6 -mb-6 p-6 mt-4">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> آخر تحديث: يوليو 2026</span>
                  <span>أمن وموثوق 100% 🔒</span>
                </div>
              </div>
            )}

            {activeTab === "terms" && (
              <div className="space-y-6" id="terms-content">
                <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/50">
                  <p className="text-xs sm:text-sm text-slate-300">
                    أهلاً بك في منصة <span className="font-bold text-cyan-400">Prompt Master</span>. استخدامك للموقع وتفعيله يعني موافقتك الكاملة على هذه الشروط والأحكام. يرجى قراءتها بعناية لضمان حقوق الجميع.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-slate-100 text-sm mb-1.5">1. شروط استخدام الحساب والأكواد:</h4>
                    <p className="text-xs sm:text-sm text-slate-300 text-justify">
                      عند تسجيل الدخول أو الاشتراك بالباقات، يجب تفعيل الاشتراك بكود رسمي وصادر عن المنصة. يُمنع منعاً باتاً بيع أكواد الاشتراك أو استخدام ثغرات تقنية لتمرير عمليات التوليد بشكل غير قانوني. يلتزم المستخدم بالحفاظ على سرية حسابه ومسؤولية الأنشطة التي تتم من خلاله.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-100 text-sm mb-1.5">2. الاستخدام العادل والأخلاقي (Fair Use Policy):</h4>
                    <p className="text-xs sm:text-sm text-slate-300 text-justify">
                      يحظر استخدام المنصة في كتابة أوامر تسويقية أو محتوى يحض على الكراهية، أو ينتهك القوانين المعمول بها في دول مجلس التعاون الخليجي، أو توليد إعلانات مضللة ومشبوهة. نحتفظ بالحق في تجميد أو إيقاف الحساب فوراً دون تعويض في حال ثبت إساءة الاستخدام الفاضحة.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-100 text-sm mb-1.5">3. حدود المسؤولية والضمانات الفنية:</h4>
                    <p className="text-xs sm:text-sm text-slate-300 text-justify">
                      بما أن مخرجات المنصة تعتمد على الذكاء الاصطناعي وهندسة الأوامر، فإن المخرجات تمثل اقتراحات تسويقية مبتكرة عالية الجودة. تقع مسؤولية مراجعة وتطبيق هذه النصوص قانونياً وإعلانياً على عاتق التاجر نفسه. لا تتحمل منصة Prompt Master أو شبكة Automata IQ أي مسؤولية مباشرة أو غير مباشرة عن أداء الإعلانات الفعلي أو قرارات المستهلكين.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-100 text-sm mb-1.5">4. حقوق الملكية الفكرية والعلامات التجارية:</h4>
                    <p className="text-xs sm:text-sm text-slate-300 text-justify">
                      العلامة التجارية <span className="text-cyan-400 font-bold">Prompt Master</span>، والمنصة بالكامل، والشعارات، ومكتبات التعليمات والبرمجيات المطورة، وأكواد الأصوات هي ملكية فكرية حصرية لشبكة <span className="text-fuchsia-400 font-bold">Automata IQ</span>. يحظر محاولة استنساخ التصميم، أو فك تشفير الكود المصدري، أو تقليد فكرة المنصة تجارياً.
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-800/60 pt-4 flex justify-between items-center text-xs text-slate-500 bg-slate-950/10 -mx-6 -mb-6 p-6 mt-4">
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> تطبق الشروط واللوائح التنظيمية بالخليج</span>
                  <span>Automata IQ Inc. 🏆</span>
                </div>
              </div>
            )}

            {activeTab === "refund" && (
              <div className="space-y-6" id="refund-content">
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-amber-300 text-xs sm:text-sm flex items-start gap-3">
                  <Clock className="w-5 h-5 shrink-0 mt-0.5 text-amber-400" />
                  <p>
                    <strong>الضمان الذهبي للتجربة المجانية:</strong> نظراً لأن منصة Prompt Master تلتزم بالشفافية المطلقة مع شركائنا التجار، فإننا نوفر باقة تجريبية مجانية ممتازة بالكامل قبل الدفع لتمكينك من اختبار كافة الأدوات وهندسة البرومبتات وقوة التحليلات الفورية للتأكد من جودتها وملاءمتها لاحتياجاتك قبل سداد أي رسوم.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-slate-100 text-sm mb-1.5">1. عدم قابلية استرداد المبالغ بعد ترقية الحساب:</h4>
                    <p className="text-xs sm:text-sm text-slate-300 text-justify">
                      نظراً لأن تفعيل الأكواد المدفوعة (باقة PRO أو ULTRA) يترتب عليه تخصيص موارد سحابية فورية واستهلاك مباشر لحوسبة الذكاء الاصطناعي والأصوات البشرية، وبناءً على توفر التجربة المجانية الكاملة قبل الدفع للتحقق من الخدمة؛ فإن جميع عمليات الدفع وتفعيل الباقات تعتبر <span className="text-amber-400 font-bold">نهائية بالكامل وغير قابلة للاسترجاع أو الاسترداد النقدي</span> بعد إتمام الترقية.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-100 text-sm mb-1.5">2. تجربة حرة خالية من المخاطر قبل الدفع:</h4>
                    <p className="text-xs sm:text-sm text-slate-300 text-justify">
                      يمثل الضمان الذهبي لدينا منحك كامل الحرية في استخدام الباقة المجانية والاطمئنان لمخرجات البرومبتات، وصياغة السيناريوهات الإعلانية والتسويقية قبل الالتزام بأي دفع مالي. نوصي بشدة باستخدام الفترة التجريبية للتحقق من رضاك التام عن الميزات المطروحة.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-100 text-sm mb-1.5">3. معالجة المشاكل التقنية وتفعيل الأكواد:</h4>
                    <p className="text-xs sm:text-sm text-slate-300 text-justify">
                      في حال مواجهة أي خلل تقني أثناء عملية الدفع أو تعذر استلام كود التفعيل السحابي لأسباب خارجة عن إرادتك، فإن فريق الدعم الفني يلتزم بحل المشكلة فوراً وإصدار كود تفعيل بديل أو تنشيط الصلاحيات لحسابك يدوياً فور تقديم إثبات السداد.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-100 text-sm mb-1.5">4. الدعم الفني وتخصيص المخرجات:</h4>
                    <p className="text-xs sm:text-sm text-slate-300 text-justify">
                      نجاح متجرك وزيادة نسب الـ CRO هي أولويتنا القصوى. في حال مواجهتك لأي صعوبة في صياغة البرومبتات الملائمة لبراندك بعد ترقية الباقة، يسعدنا تواصلك مع فريق هندسة البرومبتات لدينا عبر الواتساب المعتمد لمساعدتك في تخصيص الأوامر وتحقيق أفضل العوائد الممكنة لحملاتك التسويقية.
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-800/60 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-slate-400 bg-slate-950/10 -mx-6 -mb-6 p-6 mt-4">
                  <div className="flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
                    <span>لأي استفسار فني أو تسويقي:</span>
                    <a href="https://wa.me/message/WWNJZ6JUPB5GP1" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold hover:underline">راسلنا واتساب</a>
                  </div>
                  <span>سياسة حكيمة تضمن حق الطرفين ⚖️</span>
                </div>
              </div>
            )}

          </div>

          {/* Footer of modal */}
          <div className="p-4 bg-slate-950/60 border-t border-slate-800/60 flex justify-end gap-3" id="legal-modal-footer">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all duration-200 cursor-pointer hover:text-white"
              id="legal-modal-footer-close-btn"
            >
              فهمت وموافق
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
