import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, Pause, Volume2, VolumeX, Sparkles, Cpu, Zap, 
  TrendingUp, Layers, CheckCircle2, Bot, MessageSquare, 
  Tv, Eye, Star, Smartphone, Laptop, Sparkle, ArrowLeft, ArrowRight,
  User, Mic, Send, ChevronRight, Phone, Clock, FileText, Compass
} from "lucide-react";

interface Chapter {
  time: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  tabId: string;
}

export default function IntroVideoShowcase() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [simulationMode, setSimulationMode] = useState<"video" | "tour">("video");
  const [typingText, setTypingText] = useState("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const chapters: Chapter[] = [
    {
      time: 0,
      title: "1. مستكشف الشخصيات الخليجية",
      subtitle: "تحليل سيكولوجية واعتراضات العميل الخليجي الحقيقي لصياغة برومبتات تلمس دوافع الشراء لديه.",
      icon: <Compass className="w-4 h-4 text-cyan-400" />,
      tabId: "persona"
    },
    {
      time: 15,
      title: "2. استوديو المعلق الصوتي الذكي",
      subtitle: "توليد تعليق صوتي فوري بنبرة سعودية بشرية دافئة ترفع موثوقية متجرك لدرجة تفوق الخيال.",
      icon: <Mic className="w-4 h-4 text-fuchsia-400" />,
      tabId: "voice"
    },
    {
      time: 35,
      title: "3. هندسة العروض النارية والعبايات",
      subtitle: "صياغة عروض احترافية بضمانات ذهبية وتسهيلات الدفع (تابي وتمارا) تدفع الزائر للشراء فوراً.",
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      tabId: "prompt"
    },
    {
      time: 55,
      title: "4. مسترجع السلات المتروكة بالمرآة",
      subtitle: "أتمتة سيناريوهات الإغلاق السيكولوجية عبر الواتساب واستعادة 62% من السلات الضائعة تلقائياً.",
      icon: <MessageSquare className="w-4 h-4 text-amber-400" />,
      tabId: "whatsapp"
    }
  ];

  const totalDuration = 75; // 75 seconds mock-loop

  // Handle mock video progress
  useEffect(() => {
    if (isPlaying && simulationMode === "video") {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 1;
          if (next >= totalDuration) {
            return 0; // loop
          }
          return next;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, simulationMode]);

  // Update chapter based on current time
  useEffect(() => {
    if (simulationMode === "video") {
      const matchedChapter = chapters.reduce((acc, chap, idx) => {
        if (currentTime >= chap.time) {
          return idx;
        }
        return acc;
      }, 0);
      setCurrentChapter(matchedChapter);
    }
  }, [currentTime, simulationMode]);

  // Typing effect simulation for View 3 (Prompt Master)
  useEffect(() => {
    if (currentChapter === 2) {
      const fullText = "صياغة عرض ناري لعبايات العيد بخصم 25% مع إيضاح تسهيلات تابي وتمارا والضمان الذهبي للاسترجاع وتفصيل مجاني لزيادة الرغبة لجمهور السيدات بالخليج...";
      let i = 0;
      const timer = setInterval(() => {
        setTypingText(fullText.substring(0, i));
        i++;
        if (i > fullText.length) {
          clearInterval(timer);
        }
      }, 50);
      return () => clearInterval(timer);
    } else {
      setTypingText("");
    }
  }, [currentChapter]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleChapterClick = (idx: number) => {
    setCurrentChapter(idx);
    setCurrentTime(chapters[idx].time);
    setIsPlaying(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setCurrentTime(value);
    setIsPlaying(true);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? "0" : ""}${remainingSecs}`;
  };

  return (
    <section className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden" id="intro-video-section" dir="rtl">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header section with professional labels */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-3">
            <Tv className="w-3.5 h-3.5 animate-pulse" />
            <span>فيديو العرض الحي التفاعلي والواقعي للمنصة 🎥</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight leading-tight">
            استعرض خدماتنا <span className="bg-gradient-to-l from-cyan-400 via-teal-400 to-fuchsia-400 bg-clip-text text-transparent">بشكل سينمائي حي</span>
          </h2>
          <p className="text-slate-400 text-sm mt-2 max-w-xl">
            شاهد كيف تبدو لوحة التحكم والأدوات الحقيقية في <strong className="text-slate-200">Prompt Master</strong> أثناء العمل الفعلي على زيادة مبيعات المتاجر والبراندات الخليجية.
          </p>
        </div>

        {/* Toggle Mode: Cinematic Player vs Step-by-Step Interactive Tour */}
        <div className="flex bg-slate-950/80 p-1 rounded-xl border border-white/5 self-start">
          <button
            onClick={() => {
              setSimulationMode("video");
              setIsPlaying(true);
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              simulationMode === "video"
                ? "bg-gradient-to-l from-cyan-600 to-teal-600 text-white shadow-md shadow-cyan-900/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Play className="w-3 h-3" />
            <span>عرض تلقائي مستمر</span>
          </button>
          <button
            onClick={() => {
              setSimulationMode("tour");
              setIsPlaying(false);
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-2 cursor-pointer ${
              simulationMode === "tour"
                ? "bg-gradient-to-l from-cyan-600 to-teal-600 text-white shadow-md shadow-cyan-900/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>تصفح يدوي تفاعلي</span>
          </button>
        </div>
      </div>

      {/* Main Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column (8 cols): The Immersive Animated Player View */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-slate-950 border border-white/10 rounded-2xl overflow-hidden relative group/player min-h-[460px] sm:min-h-[520px] shadow-2xl">
          
          {/* Simulated Live visual frames or recorded view of actual system screens */}
          <div className="absolute inset-0 p-5 flex flex-col justify-between overflow-hidden">
            
            {/* Top Bar of the Screen simulation */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase bg-slate-900/80 border border-white/5 px-2 py-1 rounded">
                  {simulationMode === "video" ? "SCREEN_RECORDING_LIVE.MP4" : "MANUAL_PRODUCT_WALKTHROUGH"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/80 border border-white/5 px-2.5 py-1 rounded text-cyan-400 text-[10px] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                <span>محاكاة الصفحات الحقيقية للمنصة</span>
              </div>
            </div>

            {/* LIVE SIMULATOR FOR PAGE PREVIEWS */}
            <div className="flex-1 flex flex-col items-center justify-center relative my-4 z-10">
              
              <AnimatePresence mode="wait">
                
                {/* PAGE 1: GCC PERSONA EXPLORER SIMULATION (مستكشف الشخصيات الخليجية) */}
                {currentChapter === 0 && (
                  <motion.div
                    key="persona-explorer"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-xl p-4 sm:p-5 shadow-2xl relative overflow-hidden"
                  >
                    {/* Window header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                      </div>
                      <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-2 py-0.5 rounded">
                        مستكشف الشخصيات وسيكولوجية العملاء 👤
                      </span>
                    </div>

                    {/* Simulation Layout */}
                    <div className="space-y-4 text-right" dir="rtl">
                      <div className="flex gap-3 items-center bg-slate-950/60 p-3 rounded-xl border border-white/5">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-teal-500 flex items-center justify-center text-slate-950 font-black text-xs shrink-0">
                          نورة
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xs font-black text-slate-100">نورة الرويلي — الرياض (السعودية)</h4>
                          <p className="text-[10px] text-slate-400">سيدة أعمال خليجية مهتمة ببراندات العبايات والمجوهرات الراقية</p>
                        </div>
                        <span className="text-[9px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-1.5 py-0.5 rounded font-bold">نشط</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-950/40 border border-white/5 p-3 rounded-xl">
                          <span className="text-[10px] text-rose-400 font-extrabold block mb-1">🔴 أكبر اعتراض ومخاوف:</span>
                          <p className="text-[11px] text-slate-300 leading-relaxed">تخشى رداءة خامة العباءة والتغليف غير الفخم، وتأخر التوصيل ليلة العيد.</p>
                        </div>
                        <div className="bg-slate-950/40 border border-white/5 p-3 rounded-xl">
                          <span className="text-[10px] text-emerald-400 font-extrabold block mb-1">🟢 المثير السيكولوجي الأقوى:</span>
                          <p className="text-[11px] text-slate-300 leading-relaxed">تحب إثبات الهيبة والتميز، والاستلام السريع المبرّد مع الضمان غير المشروط.</p>
                        </div>
                      </div>

                      {/* Animated Pointer / Clicking action */}
                      <div className="relative mt-2 pt-1">
                        <div className="bg-gradient-to-l from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white font-black text-xs py-2 px-4 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/40">
                          <Cpu className="w-3.5 h-3.5" />
                          <span>تصدير المعادلة السيكولوجية للمصمم ⚡</span>
                        </div>
                        {/* Mock Cursor click effect */}
                        {isPlaying && (
                          <motion.div 
                            animate={{ x: [50, 0, 50], y: [40, 0, 40] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute bottom-[-10px] left-[35%] z-30 pointer-events-none"
                          >
                            <svg className="w-6 h-6 text-cyan-400 filter drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M4.5 1.5v16.3l4.6-4.6 4 9 3.1-1.4-4-9 6.2-.1z" />
                            </svg>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* PAGE 2: SAUDI AI VOICE STUDIO (استوديو المعلق الصوتي بالذكاء الاصطناعي) */}
                {currentChapter === 1 && (
                  <motion.div
                    key="voice-generator"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-xl p-4 sm:p-5 shadow-2xl relative overflow-hidden"
                  >
                    {/* Window header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                      </div>
                      <span className="text-[10px] font-bold text-fuchsia-400 bg-fuchsia-950/40 border border-fuchsia-500/20 px-2 py-0.5 rounded">
                        استوديو المعلق الصوتي بنبرات خليجية دافئة 🎙️
                      </span>
                    </div>

                    {/* Simulation Layout */}
                    <div className="space-y-4 text-right animate-pulse" dir="rtl">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-950 border border-fuchsia-500/30 p-3 rounded-xl flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-fuchsia-950/50 flex items-center justify-center text-fuchsia-400">
                            <Mic className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="text-xs font-black text-slate-100">فهد - لهجة نجدية فخمة</h5>
                            <p className="text-[9px] text-fuchsia-400 font-bold">صوت رجالي - وقار الأعمال</p>
                          </div>
                        </div>
                        <div className="bg-slate-950/40 border border-white/5 p-3 rounded-xl flex items-center gap-2.5 opacity-60">
                          <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400">
                            <Mic className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-slate-300">سلوى - لهجة حجازية هادئة</h5>
                            <p className="text-[9px] text-slate-500">صوت نسائي - تسويق عاطفي</p>
                          </div>
                        </div>
                      </div>

                      {/* Voice wave spectrum animation */}
                      <div className="bg-slate-950/80 rounded-xl p-4 border border-white/5 flex flex-col items-center justify-center">
                        <span className="text-[10px] text-slate-400 font-bold mb-3">طيف معالجة الصوت السحابي الفوري:</span>
                        
                        <div className="flex items-end justify-center gap-1.5 h-16 w-full">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((bar) => {
                            const randomHeight = isPlaying ? Math.floor(Math.random() * 50) + 10 : 15;
                            return (
                              <motion.div
                                key={bar}
                                animate={isPlaying ? { height: [randomHeight - 5, randomHeight + 15, randomHeight] } : { height: 12 }}
                                transition={{ repeat: Infinity, duration: 0.6 + bar * 0.05, ease: "easeInOut" }}
                                className="w-1.5 bg-gradient-to-t from-fuchsia-600 to-cyan-400 rounded-full"
                                style={{ height: "15px" }}
                              />
                            );
                          })}
                        </div>

                        <div className="w-full flex items-center justify-between text-[10px] text-slate-500 mt-3 border-t border-white/5 pt-2">
                          <span>0:14 / 1:30</span>
                          <span className="text-emerald-400 font-black">جاهز للتحميل MP3 بجودة ستوديو مبردة</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* PAGE 3: PROMPT WORKSPACE WITH DECORATIVE ACCENTS (محرر هندسة عروض العبايات الفاخرة) */}
                {currentChapter === 2 && (
                  <motion.div
                    key="prompt-workspace"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-xl p-4 sm:p-5 shadow-2xl relative overflow-hidden"
                  >
                    {/* Window header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/40" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">
                        محرر صياغة البرومبت الناري والعروض ⚡
                      </span>
                    </div>

                    {/* Simulation Layout */}
                    <div className="space-y-3 text-right" dir="rtl">
                      {/* Typing simulation */}
                      <div>
                        <span className="text-slate-400 text-[10px] font-bold block mb-1">الطلب السيكولوجي من التاجر:</span>
                        <div className="bg-slate-950/90 border border-white/5 p-2 rounded text-xs text-slate-200 font-mono h-12 overflow-hidden leading-relaxed">
                          <span className="text-cyan-400 font-bold ml-1">❯</span>
                          {typingText}
                          <span className="inline-block w-1 h-3 bg-cyan-400 ml-0.5 animate-pulse" />
                        </div>
                      </div>

                      {/* Live Generated Sales Copy Layout with visual enhancements */}
                      <div>
                        <span className="text-emerald-400 text-[10px] font-bold block mb-1">مخرجات الذكاء الاصطناعي (CRO Copy):</span>
                        <div className="bg-slate-950/90 border border-emerald-500/20 p-3 rounded text-[11px] text-slate-300 h-32 overflow-y-auto font-mono relative leading-relaxed scrollbar-thin">
                          <div className="text-cyan-400 font-bold mb-1">👑 إعلان: تميزك يليق بك في عبايات نجد الفاخرة</div>
                          <p className="mb-2">«بخصم 25% وخدمة تفصيل مجاني لعيونك يا لالة، تفصليها بمقاسك المضبوط تماماً.»</p>
                          <p className="mb-2 text-amber-300">✅ تم تفعيل تسهيلات الدفع: (قسّمي فاتورتك على 4 دفعات بدون فوائد مع تابي وتمارا)</p>
                          <p className="text-emerald-400 font-bold">⚜️ الضمان الذهبي: شحن آمن مبرّد مع ضمان استرجاع ذهبي 14 يوماً بلا نقاش!</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* PAGE 4: WHATSAPP ABANDONED CART RECOVERY CHATFLOW (مسترجع السلات بالواتساب) */}
                {currentChapter === 3 && (
                  <motion.div
                    key="whatsapp-closing"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="w-full max-w-xs bg-slate-950 border border-emerald-500/20 rounded-3xl p-3 shadow-2xl relative overflow-hidden"
                  >
                    {/* Simulated mobile phone framing */}
                    <div className="bg-slate-900 rounded-2xl overflow-hidden border border-white/10 flex flex-col h-72">
                      
                      {/* WhatsApp chat header */}
                      <div className="bg-emerald-800 p-2.5 flex items-center justify-between text-white text-xs">
                        <div className="flex items-center gap-1.5">
                          <div className="w-6 h-6 rounded-full bg-slate-950/40 flex items-center justify-center text-[10px] font-bold">
                            نجد
                          </div>
                          <div>
                            <h6 className="font-bold text-[10px]">خدمة العملاء - عبايات نجد</h6>
                            <p className="text-[8px] text-emerald-200">متصل الآن بالذكاء الاصطناعي</p>
                          </div>
                        </div>
                        <Phone className="w-3.5 h-3.5 opacity-80" />
                      </div>

                      {/* Chat messages screen */}
                      <div className="flex-1 bg-slate-950/90 p-2.5 space-y-2.5 overflow-y-auto text-right text-[10px] relative">
                        
                        {/* Outbound chat bubble (User abandoned) */}
                        <div className="flex justify-start">
                          <div className="bg-slate-800 text-slate-300 p-2 rounded-lg max-w-[80%] text-left">
                            [عميل ترك سلة عباءة حرير فاخرة] 🛒
                          </div>
                        </div>

                        {/* Automated WhatsApp Recover message arriving */}
                        <div className="flex justify-end">
                          <div className="bg-emerald-950/80 border border-emerald-500/20 text-emerald-100 p-2.5 rounded-lg max-w-[85%] relative">
                            <span className="text-emerald-400 block font-bold mb-1">تمت صياغتها سيكولوجياً ⚡</span>
                            أهلاً نورة الرويلي الغالية 🌸
                            <br />
                            شفنا العباءة الحرير الفخمة ما زالت تنتظرك في السلة! وحبينا نقدم لك شحن سريع مبرد مجاناً لعيونك مع الضمان الذهبي للاسترجاع غير المشروط.
                            <br />
                            هل ترغبين بالتوصيل غداً؟
                            <div className="text-[8px] text-slate-400 text-left mt-1">11:42 ص ✓✓</div>
                          </div>
                        </div>

                        {/* Client Response */}
                        <div className="flex justify-start">
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2 }}
                            className="bg-slate-800 text-slate-100 p-2 rounded-lg max-w-[80%]"
                          >
                            يا هلا.. إي والله ياليت تفعلونها، تابي متاح؟ 😍
                          </motion.div>
                        </div>

                      </div>

                      {/* WhatsApp text box */}
                      <div className="bg-slate-900 border-t border-white/5 p-1.5 flex items-center gap-1.5">
                        <div className="flex-1 bg-slate-950 rounded-full px-3 py-1 text-[9px] text-slate-400 text-right">
                          جاري توليد الرد التلقائي السيكولوجي...
                        </div>
                        <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0">
                          <Send className="w-3 h-3" />
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Subtitles Overlay Panel (Syncs in Real-time based on selected item) */}
              {isPlaying && simulationMode === "video" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-2 right-4 left-4 bg-slate-950/90 border border-cyan-500/20 px-4 py-2 rounded-xl text-center z-20 shadow-xl"
                >
                  <p className="text-xs sm:text-sm text-cyan-100 font-bold leading-normal">
                    {chapters[currentChapter].subtitle}
                  </p>
                </motion.div>
              )}

            </div>

            {/* Simulated Player Timeline & Controls Bar */}
            <div className="bg-slate-900/90 border border-white/10 rounded-xl px-4 py-2.5 flex items-center justify-between gap-4 z-10">
              
              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-200 transition-all cursor-pointer shrink-0"
              >
                {isPlaying && simulationMode === "video" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              {/* Scrubber slider timeline */}
              <div className="flex-1 flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-400 shrink-0">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min="0"
                  max={totalDuration - 1}
                  value={currentTime}
                  onChange={handleSeek}
                  disabled={simulationMode !== "video"}
                  className="w-full accent-cyan-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer disabled:opacity-40"
                />
                <span className="text-[10px] font-mono text-slate-400 shrink-0">
                  {formatTime(totalDuration)}
                </span>
              </div>

              {/* Audio and Resolution Tickers */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
                </button>
                <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold">
                  <span>LIVE RECORDING</span>
                </div>
              </div>

            </div>

          </div>

          {/* Deep dark gradient overlay on bottom for cinematic look */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Right Column (4 cols): Step-by-step Interactive Chapter selectors */}
        <div className="lg:col-span-4 flex flex-col gap-3 justify-between">
          
          <div className="space-y-2.5">
            <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-widest block mb-2 px-1">
              {simulationMode === "video" ? "أجزاء لوحة التحكم بالفيديو" : "الخطوات والميزات الرئيسية"}
            </h3>

            {chapters.map((chap, idx) => {
              const isActive = currentChapter === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleChapterClick(idx)}
                  className={`w-full text-right p-3.5 rounded-xl border transition-all flex items-start gap-3 relative overflow-hidden group/item cursor-pointer ${
                    isActive
                      ? "bg-slate-950 border-cyan-500/40 shadow-lg shadow-cyan-950/50"
                      : "bg-slate-900/30 border-white/5 hover:bg-slate-900/60 hover:border-white/10"
                  }`}
                >
                  {/* Active glowing timeline indicator */}
                  {isActive && (
                    <div className="absolute top-0 right-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-400 to-teal-400" />
                  )}

                  {/* Chapter Icon */}
                  <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                    isActive ? "bg-cyan-950/80 text-cyan-400 animate-pulse" : "bg-slate-950/60 text-slate-400 group-hover/item:text-slate-200"
                  }`}>
                    {chap.icon}
                  </div>

                  {/* Descriptions */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-xs font-black ${isActive ? "text-slate-100" : "text-slate-300 group-hover/item:text-slate-100"}`}>
                        {chap.title}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 shrink-0">
                        {simulationMode === "video" ? formatTime(chap.time) : `تصفح الميزة`}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed line-clamp-2">
                      {chap.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Golden Trust Trigger Badge */}
          <div className="p-4 rounded-2xl bg-gradient-to-l from-slate-950 to-slate-900 border border-white/5 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Zap className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h5 className="text-xs font-black text-slate-100">تحسين معدلات التحويل (CRO)</h5>
              <p className="text-[10px] text-slate-400 leading-normal mt-0.5">
                تكامل تام بين جميع الصفحات؛ من تحليل العميل، صياغة البرومبت الإعلاني، توليد أصوات المعلقين، وحتى استرجاع السلة على الواتساب.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Real-time trust stats beneath the video simulator */}
      <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="p-3 rounded-xl bg-slate-950/30 border border-white/5">
          <span className="text-xl font-black text-cyan-400 block">+15,000</span>
          <span className="text-[10px] text-slate-400 block mt-1">برومبت تم توليده للبراندات</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/30 border border-white/5">
          <span className="text-xl font-black text-teal-400 block">4.8x</span>
          <span className="text-[10px] text-slate-400 block mt-1">زيادة حقيقية في نسبة إغلاق الصفقات</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/30 border border-white/5">
          <span className="text-xl font-black text-fuchsia-400 block">62%</span>
          <span className="text-[10px] text-slate-400 block mt-1">معدل استعادة السلات المتروكة</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-950/30 border border-white/5">
          <span className="text-xl font-black text-amber-400 block">0% مخاطرة</span>
          <span className="text-[10px] text-slate-400 block mt-1">فترة تجريبية مجانية ممتازة</span>
        </div>
      </div>
    </section>
  );
}
