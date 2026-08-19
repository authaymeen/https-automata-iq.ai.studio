import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Volume2, Play, Pause, Square, Sparkles, Loader2, Copy, Check, Info, Lock, Zap, Sliders, ChevronDown, Music, RotateCcw, Download, HelpCircle
} from "lucide-react";

interface VoiceGeneratorProps {
  email: string;
}

interface OptimizedVoiceResult {
  optimizedText: string;
  phoneticGuide: string;
  pacingTips: string;
  bgMusicRecommendation: string;
}

export default function VoiceGenerator({ email }: VoiceGeneratorProps) {
  const [inputText, setInputText] = useState("");
  const [selectedAccent, setSelectedAccent] = useState("ar-SA"); // ar-SA, ar-AE, ar-EG, ar
  const [selectedGender, setSelectedGender] = useState("male"); // male, female
  const [selectedStyle, setSelectedStyle] = useState("promo"); // promo, luxury, storytelling
  
  const [speed, setSpeed] = useState(1.0); // 0.8 to 1.5
  const [pitch, setPitch] = useState(1.0); // 0.8 to 1.3
  
  const [loading, setLoading] = useState(false);
  const [optimizedResult, setOptimizedResult] = useState<OptimizedVoiceResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Gemini Premium TTS Voice States
  const [selectedGeminiVoice, setSelectedGeminiVoice] = useState("Kore");
  const [isGeneratingVoice, setIsGeneratingVoice] = useState(false);
  const [generatedAudioBase64, setGeneratedAudioBase64] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastGeneratedRef = useRef<{ text: string; voice: string } | null>(null);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const [copiedText, setCopiedText] = useState(false);
  const [copiedGuide, setCopiedGuide] = useState(false);

  // Waveform animation ref/timer
  const [waveHeights, setWaveHeights] = useState<number[]>(Array(30).fill(12));
  const waveTimerRef = useRef<number | null>(null);

  // Gemini AI voices dictionary
  const geminiVoices = [
    { id: "Kore", name: "كوري (Kore) 👩‍💼 - نبرة نسائية نقية واحترافية", gender: "female" },
    { id: "Zephyr", name: "زيفير (Zephyr) 👩‍💼 - نبرة نسائية مشرقة وتفاعلية", gender: "female" },
    { id: "Puck", name: "بوك (Puck) 👨‍💼 - نبرة رجالية ودودة وحوارية", gender: "male" },
    { id: "Charon", name: "شارون (Charon) 👨‍💼 - نبرة رجالية فخمة وعميقة", gender: "male" },
    { id: "Fenrir", name: "فينرير (Fenrir) 👨‍💼 - نبرة رجالية حماسية وعصرية", gender: "male" }
  ];

  // GCC Ad copy templates
  const voiceTemplates = [
    {
      title: "إعلان عطر رجالي (لهجة سعودية)",
      text: "يا هلا بالطيب والعود الأزرق. للرجل اللي يعشق التميز والفخامة، عطرنا الجديد يجمع عبير الهيل والعود الكمبودي المعتق. يثبت يومين كاملين وبضمان ذهبي مئة بالمئة. اطلبه الحين وادفع عند الاستلام.",
      accent: "ar-SA",
      gender: "male",
      voice: "Charon",
      style: "luxury"
    },
    {
      title: "إعلان عبايات نسائي (لهجة إماراتية)",
      text: "مرحبا ملايين يا غناتي! تبين كشخة وتفرد في كل زيارة؟ مجموعتنا الجديدة من العبايات الفاخرة صممت خصيصاً لج ومصنوعة من أرقى الحراير والخامات اليابانية. فخر الكشخة والذرابة تلقينها عندنا، والشحن مجاني لج.",
      accent: "ar-AE",
      gender: "female",
      voice: "Zephyr",
      style: "promo"
    },
    {
      title: "وصف منتج حماسي (لهجة مصرية ترويجية)",
      text: "بقالك كتير بتدور على ساعة ذكية تكمل أناقتك وتتابع رياضتك؟ جبنالك النهاردة قنبلة الساعات! ببطارية جبارة بتقعد عشر أيام وشاشة أموليد رهيبة ضد الخدش والكسر. الشحن واصل لحد بيتك والدفع بعد المعاينة.",
      accent: "ar-EG",
      gender: "male",
      voice: "Fenrir",
      style: "promo"
    },
    {
      title: "خطاب فخم للماركة (العربية الفصحى)",
      text: "منذ عهود سحيقة، كان الجمال رمزاً للأصالة والفرادة. نحن هنا اليوم لنعيد تعريف الفخامة برؤية عصرية متجددة ومستوحاة من تراثنا العريق. انضموا إلينا لتجربة حسية لا تنسى.",
      accent: "ar",
      gender: "female",
      voice: "Kore",
      style: "luxury"
    }
  ];

  // Sync speed with Audio element playback speed
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, [speed]);

  // Audio Element State Listeners
  useEffect(() => {
    if (audioUrl) {
      const audio = audioRef.current;
      if (audio) {
        const onPlay = () => {
          setIsSpeaking(true);
          setIsPaused(false);
        };
        const onPause = () => {
          setIsPaused(true);
        };
        const onEnded = () => {
          setIsSpeaking(false);
          setIsPaused(false);
        };

        audio.addEventListener("play", onPlay);
        audio.addEventListener("pause", onPause);
        audio.addEventListener("ended", onEnded);

        return () => {
          audio.removeEventListener("play", onPlay);
          audio.removeEventListener("pause", onPause);
          audio.removeEventListener("ended", onEnded);
        };
      }
    }
  }, [audioUrl]);

  // Cleanup audio url on unmount
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Waveform animation effect when speaking
  useEffect(() => {
    if (isSpeaking && !isPaused) {
      waveTimerRef.current = window.setInterval(() => {
        setWaveHeights(prev => 
          prev.map(() => Math.floor(Math.random() * 32) + 8)
        );
      }, 100);
    } else {
      if (waveTimerRef.current) {
        clearInterval(waveTimerRef.current);
        waveTimerRef.current = null;
      }
      setWaveHeights(Array(30).fill(12));
    }
    return () => {
      if (waveTimerRef.current) clearInterval(waveTimerRef.current);
    };
  }, [isSpeaking, isPaused]);

  // Handle AI Optimization for Voice Script
  const handleOptimizeWithAI = async () => {
    if (!inputText.trim()) {
      setError("يرجى إدخال النص المطلوب توليده صوتياً أولاً.");
      return;
    }

    setLoading(true);
    setError(null);
    setOptimizedResult(null);

    try {
      const response = await fetch("/api/voice-optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          text: inputText,
          accent: selectedAccent,
          gender: selectedGender,
          style: selectedStyle
        })
      });

      const data = await response.json();
      if (data.success) {
        setOptimizedResult(data.result);
      } else {
        setError(data.error || "فشل تهيئة وتحسين النص الصوتي.");
      }
    } catch (err) {
      setError("خطأ في الاتصال بالشبكة. يرجى المحاولة لاحقاً.");
    } finally {
      setLoading(false);
    }
  };

  // Premium Gemini AI Voice Playback with Cache Tracking
  const handleSpeak = async () => {
    setError(null);
    
    // If already speaking and not paused, we pause
    if (isSpeaking && !isPaused) {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPaused(true);
      }
      return;
    }

    // If paused, we resume
    if (isSpeaking && isPaused) {
      if (audioRef.current) {
        audioRef.current.play();
        setIsPaused(false);
      }
      return;
    }

    const textToSpeak = optimizedResult ? optimizedResult.optimizedText : inputText;
    if (!textToSpeak.trim()) {
      setError("يرجى كتابة نص أو اختيار قالب أو توليد نص محسن أولاً.");
      return;
    }

    // Use cached audio if available for the exact same text and voice configuration
    if (
      audioUrl && 
      lastGeneratedRef.current && 
      lastGeneratedRef.current.text === textToSpeak && 
      lastGeneratedRef.current.voice === selectedGeminiVoice
    ) {
      if (audioRef.current) {
        audioRef.current.play();
      }
      return;
    }

    setIsGeneratingVoice(true);
    setLoading(true);

    try {
      const response = await fetch("/api/voice-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          text: textToSpeak,
          voice: selectedGeminiVoice,
          accent: selectedAccent,
          style: selectedStyle,
          gender: selectedGender
        })
      });

      const data = await response.json();
      if (data.success && data.audio) {
        setGeneratedAudioBase64(data.audio);
        lastGeneratedRef.current = { text: textToSpeak, voice: selectedGeminiVoice };

        // Convert raw PCM to fully compliant WAV file on the fly
        const binaryString = window.atob(data.audio);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const sampleRate = 24000;
        const numChannels = 1;
        const bitsPerSample = 16;
        
        const wavBuffer = new ArrayBuffer(44 + bytes.length);
        const view = new DataView(wavBuffer);
        
        // Prep RIFF container
        view.setUint8(0, 0x52); view.setUint8(1, 0x49); view.setUint8(2, 0x46); view.setUint8(3, 0x46); // "RIFF"
        view.setUint32(4, 36 + bytes.length, true);
        view.setUint8(8, 0x57); view.setUint8(9, 0x41); view.setUint8(10, 0x56); view.setUint8(11, 0x45); // "WAVE"
        
        // Prep Format Subchunk
        view.setUint8(12, 0x66); view.setUint8(13, 0x6d); view.setUint8(14, 0x74); view.setUint8(15, 0x20); // "fmt "
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true); // Linear PCM = 1
        view.setUint16(22, numChannels, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * numChannels * (bitsPerSample / 8), true);
        view.setUint16(32, numChannels * (bitsPerSample / 8), true);
        view.setUint16(34, bitsPerSample, true);
        
        // Prep Data Subchunk
        view.setUint8(36, 0x64); view.setUint8(37, 0x61); view.setUint8(38, 0x74); view.setUint8(39, 0x61); // "data"
        view.setUint32(40, bytes.length, true);
        
        // Interlace raw PCM data right after header
        const wavBytes = new Uint8Array(wavBuffer);
        wavBytes.set(bytes, 44);
        
        const blob = new Blob([wavBytes], { type: "audio/wav" });
        const url = URL.createObjectURL(blob);
        
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }
        
        setAudioUrl(url);
        
        if (!audioRef.current) {
          audioRef.current = new Audio();
        }
        
        audioRef.current.src = url;
        audioRef.current.playbackRate = speed;
        audioRef.current.volume = 1.0;
        
        audioRef.current.play().catch((err) => {
          console.error("Audio playback error:", err);
          setError("لم يتمكن المتصفح من تشغيل الصوت تلقائياً. يرجى تفعيل إذن تشغيل الصوت بالمتصفح.");
        });
      } else {
        setError(data.error || "فشل توليد الصوت الذكي.");
      }
    } catch (err) {
      setError("خطأ في الاتصال بالشبكة أو انتهاء وقت الجلسة.");
      console.error(err);
    } finally {
      setIsGeneratingVoice(false);
      setLoading(false);
    }
  };

  const handlePauseResume = () => {
    if (audioRef.current) {
      if (isSpeaking && !isPaused) {
        audioRef.current.pause();
        setIsPaused(true);
      } else if (isSpeaking && isPaused) {
        audioRef.current.play().catch(() => {});
        setIsPaused(false);
      }
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsSpeaking(false);
      setIsPaused(false);
    }
  };

  const copyTextHelper = (text: string, isGuide: boolean) => {
    navigator.clipboard.writeText(text);
    if (isGuide) {
      setCopiedGuide(true);
      setTimeout(() => setCopiedGuide(false), 2000);
    } else {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    }
  };

  // Export actual generated WAV audio file or fall back to detailed script guide
  const handleDownloadSpeech = () => {
    if (generatedAudioBase64) {
      try {
        const binaryString = window.atob(generatedAudioBase64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const sampleRate = 24000;
        const numChannels = 1;
        const bitsPerSample = 16;
        
        const wavBuffer = new ArrayBuffer(44 + bytes.length);
        const view = new DataView(wavBuffer);
        
        // RIFF container
        view.setUint8(0, 0x52); view.setUint8(1, 0x49); view.setUint8(2, 0x46); view.setUint8(3, 0x46); // "RIFF"
        view.setUint32(4, 36 + bytes.length, true);
        view.setUint8(8, 0x57); view.setUint8(9, 0x41); view.setUint8(10, 0x56); view.setUint8(11, 0x45); // "WAVE"
        
        // Format
        view.setUint8(12, 0x66); view.setUint8(13, 0x6d); view.setUint8(14, 0x74); view.setUint8(15, 0x20); // "fmt "
        view.setUint32(16, 16, true);
        view.setUint16(20, 1, true); // Linear PCM = 1
        view.setUint16(22, numChannels, true);
        view.setUint32(24, sampleRate, true);
        view.setUint32(28, sampleRate * numChannels * (bitsPerSample / 8), true);
        view.setUint16(32, numChannels * (bitsPerSample / 8), true);
        view.setUint16(34, bitsPerSample, true);
        
        // Data Subchunk
        view.setUint8(36, 0x64); view.setUint8(37, 0x61); view.setUint8(38, 0x74); view.setUint8(39, 0x61); // "data"
        view.setUint32(40, bytes.length, true);
        
        const wavBytes = new Uint8Array(wavBuffer);
        wavBytes.set(bytes, 44);
        
        const blob = new Blob([wavBytes], { type: "audio/wav" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `PromptMaster_Audio_${Date.now()}.wav`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (err) {
        setError("فشل فك وتصدير الملف الصوتي.");
      }
    } else {
      const textToSpeak = optimizedResult ? optimizedResult.optimizedText : inputText;
      if (!textToSpeak) return;

      // Create a beautiful text instruction file as a direct helper for the user
      const content = `=== استوديو هندسة الأصوات الذكية PROMPT MASTER VOICE ===\n\n` +
        `[البريد الإلكتروني]: ${email}\n` +
        `[صوت الذكاء الاصطناعي]: ${selectedGeminiVoice}\n` +
        `[اللهجة المحددة]: ${selectedAccent === "ar-SA" ? "لهجة سعودية (نجدية/حجازية)" : selectedAccent === "ar-AE" ? "لهجة إماراتية خليجية" : selectedAccent === "ar-EG" ? "لهجة مصرية ترويجية" : "العربية الفصحى"}\n` +
        `[الجنس]: ${selectedGender === "male" ? "صوت رجالي رخيم" : "صوت نسائي ناعم"}\n` +
        `[نمط الإلقاء]: ${selectedStyle === "promo" ? "ترويجي حماسي" : selectedStyle === "luxury" ? "هادئ وفخم" : "سرد قصصي مثير"}\n` +
        `[النص الأصلي]:\n${inputText}\n\n` +
        `[النص المحسن والمنسق بالذكاء الاصطناعي للإلقاء الصوتي]:\n${textToSpeak}\n\n` +
        (optimizedResult ? `[دليل الوقفات ومخارج الحروف الصوتي (Phonetic Guide)]:\n${optimizedResult.phoneticGuide}\n\n` : "") +
        (optimizedResult ? `[نصائح ضبط النبرة والسرعة (Pacing Tips)]:\n${optimizedResult.pacingTips}\n\n` : "") +
        (optimizedResult ? `[ترشيح الموسيقى التصويرية المرافقة (Background Music)]:\n${optimizedResult.bgMusicRecommendation}\n\n` : "") +
        `-----------------------------------------------------------------\n` +
        `* ملاحظة للمحترفين: يمكنك استخدام هذا الملف المحسن بالذكاء الاصطناعي مباشرة في تطبيقات الدبلجة وصناعة الفيديوهات الاحترافية أو دمج التسجيل الفوري عالي النقاء للاستوديو.`;

      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `PromptMaster_VoiceStudio_${Date.now()}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
      dir="rtl"
    >
      {/* Tool Header */}
      <div className="flex items-start gap-3 border-b border-white/5 pb-4">
        <div className="bg-sky-500/10 border border-sky-500/20 p-2.5 rounded-xl shrink-0">
          <Volume2 className="w-5 h-5 text-sky-400" />
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-extrabold text-slate-100">استوديو هندسة وتوليد الأصوات الذكية (AI Accent Voice Studio) 🎙️</h4>
            <span className="text-[9px] bg-sky-500/15 border border-sky-500/30 text-sky-400 px-2 py-0.5 rounded-md font-bold animate-pulse">ميزة باقة ULTRA الفائقة 💎</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
            ميزة نيون حصرية لتحويل النصوص الإعلانية والترويجية إلى نصوص مقروءة بلهجات الخليج وبشكل احترافي بالذكاء الاصطناعي مع إمكانية تحسين الوقفات، واختيار مخارج الحروف، والاستماع الفوري للصوت بمؤثرات صوتية فريدة.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Input & Configurations Panel */}
        <div className="lg:col-span-5 space-y-5 bg-slate-950/40 p-4 rounded-2xl border border-white/5">
          
          {/* Quick Selection Templates */}
          <div>
            <span className="text-[10px] text-slate-400 font-bold block mb-2">أمثلة وقوالب صوتية سريعة:</span>
            <div className="grid grid-cols-2 gap-2">
              {voiceTemplates.map((tpl, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setInputText(tpl.text);
                    setSelectedAccent(tpl.accent);
                    setSelectedGender(tpl.gender);
                    setSelectedStyle(tpl.style);
                    if (tpl.voice) {
                      setSelectedGeminiVoice(tpl.voice);
                    }
                  }}
                  className="bg-slate-900/40 hover:bg-sky-500/10 border border-slate-800 hover:border-sky-500/30 px-2.5 py-1.5 rounded-lg text-[9px] font-bold text-slate-300 hover:text-sky-300 text-right transition-all truncate"
                >
                  {tpl.title}
                </button>
              ))}
            </div>
          </div>

          {/* Text Input area */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200 block">النص المراد صياغته وتوليده صوتياً:</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="اكتب هنا السيناريو التسويقي، الخطاف، أو العرض الخاص لبراندك..."
              rows={5}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-650 focus:outline-none focus:border-sky-500/40 resize-none font-sans leading-relaxed text-right"
            />
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            
            <div className="space-y-1.5 text-right">
              <label className="text-[10px] font-bold text-slate-400 block">لهجة الصوت المستهدفة:</label>
              <div className="relative">
                <select
                  value={selectedAccent}
                  onChange={(e) => setSelectedAccent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-slate-300 appearance-none focus:outline-none focus:border-sky-500/40 cursor-pointer"
                >
                  <option value="ar-SA">🇸🇦 اللهجة السعودية (نجدي/حجازي)</option>
                  <option value="ar-AE">🇦🇪 اللهجة الإماراتية (خليجي)</option>
                  <option value="ar-EG">🇪🇬 اللهجة المصرية (ترويجي سريع)</option>
                  <option value="ar">🌍 العربية الفصحى (رخيم ورسمي)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5 text-right">
              <label className="text-[10px] font-bold text-slate-400 block">جنس وملمس الصوت:</label>
              <div className="relative">
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-slate-300 appearance-none focus:outline-none focus:border-sky-500/40 cursor-pointer"
                >
                  <option value="male">👨‍💼 صوت رجالي (فخم وواثق)</option>
                  <option value="female">👩‍💼 صوت نسائي (ناعم ومقنع)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5 text-right col-span-2">
              <label className="text-[10px] font-bold text-slate-400 block">نمط الإلقاء والمزاج (Style Mode):</label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: "promo", label: "حماسي ترويجي 📣" },
                  { id: "luxury", label: "هادئ فخم ✨" },
                  { id: "storytelling", label: "سرد قصصي 📖" }
                ].map(style => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setSelectedStyle(style.id)}
                    className={`py-1.5 rounded-lg text-[9px] font-bold border transition-all text-center cursor-pointer ${
                      selectedStyle === style.id
                        ? "bg-sky-500/10 border-sky-500/45 text-sky-400"
                        : "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Fine Tuning Controls (Speed & Pitch) */}
          <div className="space-y-3.5 pt-3 border-t border-white/5">
            <h5 className="text-[10px] font-extrabold text-sky-400 flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-sky-400" />
              <span>التحكم الدقيق بنبرة وسرعة الصوت (Synthesizer Tuning)</span>
            </h5>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] font-mono text-slate-400">
                  <span>سرعة الكلام (Rate):</span>
                  <span className="text-sky-400 font-bold">{speed}x</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="1.5"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer h-1.5 bg-slate-900 rounded-lg appearance-none"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[9px] font-mono text-slate-400">
                  <span>طبقة الصوت (Pitch):</span>
                  <span className="text-sky-400 font-bold">{pitch}</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="1.3"
                  step="0.05"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer h-1.5 bg-slate-900 rounded-lg appearance-none"
                />
              </div>
            </div>

            {/* Premium Gemini Voices Selector */}
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] font-bold text-sky-400">
                <span>الصوت الذكي المستهدف (Gemini Premium Voice):</span>
              </div>
              <div className="relative">
                <select
                  value={selectedGeminiVoice}
                  onChange={(e) => {
                    setSelectedGeminiVoice(e.target.value);
                    const matchedVoice = geminiVoices.find(v => v.id === e.target.value);
                    if (matchedVoice) {
                      setSelectedGender(matchedVoice.gender);
                    }
                  }}
                  className="w-full bg-slate-950 border border-sky-500/30 rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-sky-300 appearance-none focus:outline-none focus:border-sky-500/50 cursor-pointer"
                >
                  {geminiVoices.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-sky-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Optimize Button */}
          <button
            onClick={handleOptimizeWithAI}
            disabled={loading || !inputText.trim()}
            className="w-full bg-gradient-to-r from-sky-400 to-cyan-500 hover:from-sky-500 hover:to-cyan-600 text-slate-950 text-xs font-black py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-sky-500/10 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>جاري تحسين وتهيئة الصوت بالذكاء الاصطناعي...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
                <span>تهيئة وتحسين النص بالذكاء الاصطناعي 🎙️</span>
              </>
            )}
          </button>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] p-2.5 rounded-xl font-bold text-center">
              {error}
            </div>
          )}

        </div>

        {/* Right Output & Interactive Studio Console */}
        <div className="lg:col-span-7 flex flex-col justify-between min-h-[460px] bg-slate-950/80 p-5 rounded-3xl border border-white/5 relative overflow-hidden">
          
          {/* Studio Neon Backdrop */}
          <div className="absolute top-0 left-0 w-44 h-44 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-44 h-44 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            
            {/* Visualizer Unit */}
            <div className="bg-[#02030d] border border-white/5 rounded-2xl p-5 flex flex-col items-center justify-center space-y-4">
              <span className="text-[9px] text-sky-400 font-extrabold tracking-widest uppercase bg-sky-500/15 px-3 py-1 rounded-full border border-sky-500/20">
                استوديو الإلقاء الصوتي المباشر (Direct Sound Room)
              </span>

              {/* Graphical waveform */}
              <div className="flex items-end justify-center gap-1.5 h-16 w-full max-w-sm px-4">
                {waveHeights.map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: h }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className={`w-1 rounded-full transition-all duration-100 ${
                      isSpeaking && !isPaused
                        ? "bg-gradient-to-t from-sky-500 via-cyan-400 to-emerald-400"
                        : "bg-slate-800"
                    }`}
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleSpeak}
                  disabled={!inputText.trim()}
                  className="bg-sky-500 hover:bg-sky-600 disabled:opacity-40 text-slate-950 p-3.5 rounded-full shadow-lg shadow-sky-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  title="استماع للنص الصوتي"
                >
                  <Play className="w-5 h-5 fill-slate-950 text-slate-950" />
                </button>

                <button
                  type="button"
                  onClick={handlePauseResume}
                  disabled={!isSpeaking}
                  className="bg-white/5 hover:bg-white/10 disabled:opacity-40 text-slate-300 p-3.5 rounded-full border border-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  title={isPaused ? "استئناف" : "إيقاف مؤقت"}
                >
                  <Pause className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={handleStop}
                  disabled={!isSpeaking && !isPaused}
                  className="bg-rose-500/10 hover:bg-rose-500/20 disabled:opacity-40 text-rose-400 p-3.5 rounded-full border border-rose-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  title="إيقاف كلي"
                >
                  <Square className="w-5 h-5 fill-rose-400 text-rose-400" />
                </button>
              </div>

              {/* Status Indicator */}
              <div className="text-[10px] text-slate-500 flex items-center gap-1.5">
                {isSpeaking ? (
                  isPaused ? (
                    <span className="text-amber-400 flex items-center gap-1 animate-pulse">● إيقاف مؤقت للغرفة</span>
                  ) : (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      جاري البث الصوتي الفوري...
                    </span>
                  )
                ) : (
                  <span>● الغرفة الصوتية مهيأة وجاهزة للبث</span>
                )}
              </div>
            </div>

            {/* AI Results */}
            <AnimatePresence mode="wait">
              {optimizedResult ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  {/* Optimized Script Card */}
                  <div className="bg-[#02030f]/80 border border-slate-900 rounded-2xl p-4 space-y-2 text-right relative group">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-sky-400 font-extrabold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>النص المحسّن صوتياً بالذكاء الاصطناعي (أكثر إقناعاً وتناغماً):</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => copyTextHelper(optimizedResult.optimizedText, false)}
                        className="text-slate-500 hover:text-sky-300 transition-colors"
                        title="نسخ النص المحسن"
                      >
                        {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed bg-[#010103] p-3 rounded-lg border border-white/[0.02]">
                      {optimizedResult.optimizedText}
                    </p>
                  </div>

                  {/* Orthography & Pacing Guide */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div className="bg-slate-900/60 border border-slate-900 rounded-xl p-3.5 space-y-1.5 text-right">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] text-indigo-400 font-extrabold">دليل الوقفات ومخارج الحروف (Phonetics):</span>
                        <button
                          type="button"
                          onClick={() => copyTextHelper(optimizedResult.phoneticGuide, true)}
                          className="text-slate-600 hover:text-indigo-300 transition-colors"
                        >
                          {copiedGuide ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-300 font-mono leading-relaxed bg-black/30 p-2.5 rounded-lg">
                        {optimizedResult.phoneticGuide}
                      </p>
                    </div>

                    <div className="bg-slate-900/60 border border-slate-900 rounded-xl p-3.5 space-y-1.5 text-right">
                      <span className="text-[9px] text-fuchsia-400 font-extrabold">نصائح ضبط النبرة والسرعة (Pacing & Emotion):</span>
                      <p className="text-[10px] text-slate-300 leading-relaxed">
                        {optimizedResult.pacingTips}
                      </p>
                    </div>

                  </div>

                  {/* BG Music Recommendation */}
                  <div className="bg-slate-900/40 border border-white/5 p-3.5 rounded-2xl flex items-center justify-between text-right">
                    <div className="flex items-center gap-2">
                      <div className="bg-sky-500/10 p-1.5 rounded-lg text-sky-400">
                        <Music className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-[8px] text-slate-500">الموسيقى الخلفية المقترحة بالمونتاج:</div>
                        <div className="text-[10px] text-slate-200 font-bold mt-0.5">{optimizedResult.bgMusicRecommendation}</div>
                      </div>
                    </div>
                    <span className="text-[8px] text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-md font-mono">
                      بث نقي
                    </span>
                  </div>

                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-2">
                  <Volume2 className="w-10 h-10 text-slate-800" />
                  <span className="text-xs font-bold text-slate-500">لا يوجد نص محسن حالياً</span>
                  <p className="text-[10px] text-slate-650 max-w-xs leading-relaxed">
                    اكتب نصك التسويقي البسيط أو اختر قالباً من اليمين، ثم انقر على زر "تهيئة النص بالذكاء الاصطناعي" للحصول على التناغم الصوتي والنبرة الخليجية المثالية.
                  </p>
                </div>
              )}
            </AnimatePresence>

          </div>

          {/* Download Text Guide / Voice file instructions at bottom */}
          <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
            <div className="flex items-center gap-1.5 text-[9px] text-slate-500">
              <Info className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <span>يمكنك الضغط على زر "تحميل" لتنزيل دليل الإلقاء والنص الصوتي المحسن كـ TXT.</span>
            </div>

            <button
              onClick={handleDownloadSpeech}
              disabled={!inputText.trim()}
              className="bg-white/5 hover:bg-sky-500/15 hover:text-sky-300 disabled:opacity-40 text-slate-300 border border-white/10 text-[10px] font-extrabold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{generatedAudioBase64 ? "تحميل المقطع الصوتي الفعلي (WAV) 🎙️" : "تحميل دليل السيناريو الصوتي والوقفات 💾"}</span>
            </button>
          </div>

        </div>

      </div>

    </motion.div>
  );
}
