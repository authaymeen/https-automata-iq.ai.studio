import React from "react";
import { ShieldCheck } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-16 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col with Official Logo */}
          <div className="md:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-4">
              <Logo size="md" />
            </a>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed mb-4">
              الوكالة الرائدة في هندسة الأتمتة المتقدمة ودمج نماذج الذكاء الاصطناعي لتطوير العمليات التشغيلية، تقليص التكاليف، وزيادة الأرباح.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>معايير أمان وتشفير بيانات سحابية صارمة</span>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="text-white font-bold font-heading mb-4 text-base">
              روابط سريعة
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#services" className="hover:text-cyan-400 transition-colors">
                  خدمات الأتمتة
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-cyan-400 transition-colors">
                  المحاكي التفاعلي الحي
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">
                  المشاريع ودراسات الحالة
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-cyan-400 transition-colors">
                  حاسبة الوفر المالي (ROI)
                </a>
              </li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="text-white font-bold font-heading mb-4 text-base">
              الضمان والتواصل
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#warranty" className="hover:text-cyan-400 transition-colors">
                  ضمان 7 أيام تشغيل
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-cyan-400 transition-colors">
                  منهجية العمل الهندسية
                </a>
              </li>
              <li>
                <a href="#consultation" className="hover:text-cyan-400 transition-colors">
                  حجز استشارة مجانية
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/message/WWNJZ6JUPB5GP1?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20AUTOMATA%20IQ%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%AA%D9%88%D8%A7%D8%B5%D9%84%20%D9%85%D8%B9%20%D9%81%D8%B1%D9%8A%D9%82%20%D8%A7%D9%84%D8%AF%D8%B9%D9%85%20%D9%88%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D9%82%D9%86%D9%8A%D8%A9."
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
                >
                  الدعم الفني عبر WhatsApp
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Automata IQ. جميع الحقوق محفوظة — أوتوماتا آي كيو.</p>
          <div className="flex gap-6">
            <span>الرياض، المملكة العربية السعودية</span>
            <span>بنية تحتية سحابية موثوقة 100%</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
