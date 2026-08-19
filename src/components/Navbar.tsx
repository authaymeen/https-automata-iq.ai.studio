import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X } from "lucide-react";
import Logo from "./Logo";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/85 border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Official Brand Logo */}
          <a href="#" className="flex items-center group">
            <Logo size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#services" className="hover:text-cyan-400 transition-colors">
              خدماتنا
            </a>
            <a
              href="#simulator"
              className="flex items-center gap-1.5 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              المحاكي التفاعلي
            </a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">
              المشاريع المنجزة
            </a>
            <a href="#calculator" className="hover:text-cyan-400 transition-colors">
              حاسبة الوفر
            </a>
            <a href="#warranty" className="hover:text-cyan-400 transition-colors">
              ضمان التشغيل
            </a>
            <a href="#process" className="hover:text-cyan-400 transition-colors">
              منهجية العمل
            </a>
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#consultation"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-200"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>احجز استشارة أتمتة مجانية</span>
            </motion.a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
              aria-label="القائمة"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown with Motion Slide & Fade */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-4 border-t border-slate-800 space-y-2 bg-slate-950/95 backdrop-blur-xl overflow-hidden"
            >
              <a
                href="#services"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-900 hover:text-cyan-400 text-sm font-medium"
              >
                خدماتنا
              </a>
              <a
                href="#simulator"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg text-cyan-400 font-semibold hover:bg-slate-900 text-sm"
              >
                المحاكي التفاعلي الحَي
              </a>
              <a
                href="#projects"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-900 hover:text-cyan-400 text-sm font-medium"
              >
                المشاريع المنجزة
              </a>
              <a
                href="#calculator"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-900 hover:text-cyan-400 text-sm font-medium"
              >
                حاسبة الوفر المالي
              </a>
              <a
                href="#warranty"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-900 hover:text-cyan-400 text-sm font-medium"
              >
                ضمان التشغيل
              </a>
              <a
                href="#consultation"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 text-center font-bold border border-cyan-500/30 text-sm"
              >
                احجز استشارة أتمتة مجانية
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
