import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Sparkles, Video, Instagram, Smartphone, Heart, MessageCircle, 
  Share2, Bookmark, Music, Check, Plus, Eye, RefreshCw, Send, AlertCircle
} from "lucide-react";

interface AdsMockupProps {
  email: string;
}

export default function AdsMockup({ email }: AdsMockupProps) {
  const [platform, setPlatform] = useState<"tiktok" | "snapchat" | "instagram">("tiktok");
  const [brandName, setBrandName] = useState("لافيرن للعطور | Laverne");
  const [adText, setAdText] = useState(
    "🔥 أقوى عرض للعطور بالخليج رجع من جديد! \n\nاطلب عطر 'سيدار الفاخر' واحصل على العطر الثاني مجاناً مع التوصيل السريع لجميع مناطق المملكة 🇸🇦\n\n🛡️ الضمان الذهبي: ما عجبك؟ استرجعه مجاناً وبدون أي تكاليف!\n\n👇 اضغط على الرابط واطلب الدفع عند الاستلام فوراً."
  );
  const [ctaText, setCtaText] = useState("تسوق الآن 🛍️");
  const [likes, setLikes] = useState("24.8K");
  const [comments, setComments] = useState("1,420");
  const [shares, setShares] = useState("892");
  const [bookmarks, setBookmarks] = useState("2,110");
  
  // Custom design style preset
  const [bgPreset, setBgPreset] = useState<"dark-ambient" | "golden-royal" | "neon-modern">("dark-ambient");

  const bgStyles = {
    "dark-ambient": "bg-gradient-to-b from-slate-900 via-purple-950/20 to-black",
    "golden-royal": "bg-gradient-to-b from-amber-950/30 via-slate-900 to-black",
    "neon-modern": "bg-gradient-to-b from-cyan-950/30 via-slate-900 to-black",
  };

  const handleRandomizeStats = () => {
    const l = (Math.random() * 50 + 5).toFixed(1) + "K";
    const c = Math.floor(Math.random() * 2000 + 100).toLocaleString();
    const s = Math.floor(Math.random() * 1000 + 50).toLocaleString();
    const b = Math.floor(Math.random() * 3000 + 100).toLocaleString();
    setLikes(l);
    setComments(c);
    setShares(s);
    setBookmarks(b);
  };

  return (
    <div className="space-y-6 text-right" dir="rtl" id="ads-mockup-wrapper">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/5 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-amber-500 animate-pulse" />
            <span>محاكي مظهر الإعلان المرئي (Ads Copy Mockup Simulator)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            اختبر واعرض نصوصك الإعلانية وصياغاتك مباشرة على محاكاة واقعية لشاشات الهواتف في منصات التواصل (تيك توك، سناب شات، وإنستغرام) للتأكد من ملاءمتها للمساحة الآمنة ومظهرها الإقناعي الجذاب!
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setPlatform("tiktok")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
              platform === "tiktok" ? "bg-cyan-500 text-slate-950 shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <span>تيك توك</span>
          </button>
          <button
            onClick={() => setPlatform("snapchat")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
              platform === "snapchat" ? "bg-yellow-400 text-slate-950 shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <span>سناب شات</span>
          </button>
          <button
            onClick={() => setPlatform("instagram")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
              platform === "instagram" ? "bg-pink-500 text-white shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <span>إنستغرام</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Parameters Box */}
        <div className="lg:col-span-7 bg-slate-950/60 border border-slate-900 rounded-2xl p-5 space-y-5">
          <h4 className="text-xs font-extrabold text-amber-400 border-b border-white/5 pb-2">1. تخصيص محتوى الإعلان الإقناعي:</h4>
          
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 block">اسم العلامة التجارية (المعلن):</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="مثال: لافيرن للعطور الفاخرة"
                className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-300">النص الإعلاني الترويجي:</label>
                <span className="text-[10px] text-slate-500">سيتلاءم النص تلقائياً داخل مساحة المحاكاة.</span>
              </div>
              <textarea
                value={adText}
                onChange={(e) => setAdText(e.target.value)}
                rows={6}
                placeholder="اكتب هنا النص الإعلاني أو الصق النصوص المولدة..."
                className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-3 text-xs text-slate-200 leading-relaxed font-sans focus:outline-none focus:border-amber-500/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">نص زر اتخاذ الإجراء (CTA):</label>
                <input
                  type="text"
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                  placeholder="مثال: تسوق الآن 🛍️"
                  className="w-full bg-slate-900 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 block">النمط البصري للخلفية:</label>
                <select
                  value={bgPreset}
                  onChange={(e) => setBgPreset(e.target.value as any)}
                  className="w-full bg-slate-900 border border-white/5 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500/50 cursor-pointer"
                >
                  <option value="dark-ambient">🌌 غسق كوني هادئ (Dark Ambient)</option>
                  <option value="golden-royal">👑 عطور وفخامة ملكية (Golden Royal)</option>
                  <option value="neon-modern">⚡ إلكترونيات وألعاب برّاقة (Neon Cyber)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <h4 className="text-xs font-extrabold text-slate-300 mb-3 block">تخصيص مؤشرات التفاعل الاجتماعي (Social Metrics):</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-900 p-2.5 rounded-xl border border-white/5 text-center space-y-1">
                <span className="text-[10px] text-slate-400 block">الترشيحات (Likes)</span>
                <input
                  type="text"
                  value={likes}
                  onChange={(e) => setLikes(e.target.value)}
                  className="w-full bg-black/40 text-center text-xs font-bold text-slate-200 py-1 rounded focus:outline-none"
                />
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-white/5 text-center space-y-1">
                <span className="text-[10px] text-slate-400 block">التعليقات (Comments)</span>
                <input
                  type="text"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full bg-black/40 text-center text-xs font-bold text-slate-200 py-1 rounded focus:outline-none"
                />
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-white/5 text-center space-y-1">
                <span className="text-[10px] text-slate-400 block">المشاركات (Shares)</span>
                <input
                  type="text"
                  value={shares}
                  onChange={(e) => setShares(e.target.value)}
                  className="w-full bg-black/40 text-center text-xs font-bold text-slate-200 py-1 rounded focus:outline-none"
                />
              </div>
              <div className="bg-slate-900 p-2.5 rounded-xl border border-white/5 text-center space-y-1">
                <span className="text-[10px] text-slate-400 block">المفضلة (Saves)</span>
                <input
                  type="text"
                  value={bookmarks}
                  onChange={(e) => setBookmarks(e.target.value)}
                  className="w-full bg-black/40 text-center text-xs font-bold text-slate-200 py-1 rounded focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={handleRandomizeStats}
                className="w-full bg-slate-900 hover:bg-slate-850 text-slate-300 border border-white/5 text-[10px] font-bold py-2 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                <span>توليد أرقام تفاعل عشوائية تحفيزية 📊</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-cyan-500/10 p-3 rounded-xl flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-400 leading-relaxed">
              💡 <strong>نصيحة CRO:</strong> عند صياغة نص الإعلان، تأكد دائماً أن الأسطر الثلاثة الأولى تحتوي على الخطاف الإقناعي والعرض بوضوح، لأن خوارزميات التيك توك تعرض زراً للقراءة الإضافية (See More) يُخفي باقي النص الطويل.
            </p>
          </div>
        </div>

        {/* Live Simulator Render Area */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="text-center mb-2">
            <span className="text-[10px] bg-slate-900 border border-slate-800 text-slate-400 font-extrabold px-3 py-1 rounded-full uppercase">
              شاشة محاكاة حية 📱
            </span>
          </div>

          {/* Device Mockup Wrapper */}
          <div className="w-[280px] sm:w-[310px] h-[550px] sm:h-[580px] bg-black rounded-[40px] p-3 shadow-[0_0_50px_rgba(0,0,0,0.9)] border-4 border-slate-800 relative overflow-hidden flex flex-col">
            
            {/* Top Speaker Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-center">
              <div className="w-12 h-1 bg-slate-800 rounded-full mb-1" />
            </div>

            {/* Simulated App Screen Canvas */}
            <div className={`w-full h-full rounded-[30px] overflow-hidden relative flex flex-col justify-between ${bgStyles[bgPreset]} select-none text-right font-sans p-4 pt-10 pb-6`}>
              
              {/* Platform Specific Top Status Header */}
              {platform === "tiktok" && (
                <div className="flex justify-between items-center text-xs text-slate-400 z-10 px-2">
                  <Eye className="w-4 h-4 text-slate-400" />
                  <div className="flex gap-4 font-bold text-white/60">
                    <span className="border-b-2 border-white text-white pb-1">متابع</span>
                    <span>لك</span>
                  </div>
                  <Video className="w-4 h-4 text-slate-400" />
                </div>
              )}

              {platform === "snapchat" && (
                <div className="flex justify-between items-center text-xs text-white font-black z-10">
                  <span className="bg-black/30 px-2 py-0.5 rounded">إعلان 📢</span>
                  <span>رائج بالخليج 🔥</span>
                  <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-black text-[9px] font-black">
                    👻
                  </div>
                </div>
              )}

              {platform === "instagram" && (
                <div className="flex justify-between items-center text-xs text-slate-100 z-10">
                  <span className="font-extrabold text-slate-200">إعلان ممول</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2.5 h-2.5 bg-gradient-to-tr from-yellow-500 to-purple-500 rounded-full" />
                    <span className="font-bold text-[10px]">Sponsored</span>
                  </div>
                </div>
              )}

              {/* Middle Aesthetic Graphics Simulation */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-sky-500 blur-2xl animate-pulse" />
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 blur-xl mt-8" />
              </div>

              {/* BOTTOM COLUMN: Brand Avatar, Copy Text and CTA Button */}
              <div className="mt-auto space-y-3.5 z-10 text-right">
                
                {/* Simulated Platform Post Body */}
                <div className="space-y-2">
                  {/* Brand Profile Details */}
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-900 border border-amber-500/30 flex items-center justify-center text-[10px] font-extrabold text-amber-400">
                      🏷️
                    </div>
                    <div>
                      <span className="text-xs font-black text-white block">@{brandName.split(" | ")[0]}</span>
                      <span className="text-[8px] text-slate-400 block -mt-0.5">ترويج إلكتروني نشط</span>
                    </div>
                  </div>

                  {/* Ad Copy Box */}
                  <div className="bg-black/50 backdrop-blur-md rounded-xl p-3 border border-white/5 space-y-1">
                    <p className="text-[10px] text-slate-200 leading-relaxed whitespace-pre-wrap max-h-[140px] overflow-y-auto scrollbar-thin">
                      {adText}
                    </p>
                    <div className="flex justify-between items-center text-[8px] text-slate-400 pt-1 border-t border-white/5">
                      <span>#عطور_سعودية #برومبت_ماستر #CRO_الخليج</span>
                      <span className="text-amber-400 font-extrabold">إعلان مخصص</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Platform CTA Action Button */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-cyan-500 rounded-xl blur opacity-35 group-hover:opacity-70 transition-opacity" />
                  <button className="w-full relative bg-slate-950/90 border border-white/10 hover:bg-slate-900 text-white font-extrabold text-[11px] py-2.5 rounded-xl flex items-center justify-between px-4 transition-all">
                    <span className="text-amber-400 animate-pulse">⚡ {ctaText}</span>
                    <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded text-white font-bold">انقر للتسوق</span>
                  </button>
                </div>

              </div>

              {/* RIGHT SIDE FLOATING CONTROLS (Tiktok Overlay style) */}
              <div className="absolute right-2 bottom-32 flex flex-col items-center gap-4 z-20">
                {/* Brand Logo Sphere */}
                <div className="relative mb-2">
                  <div className="w-9 h-9 rounded-full bg-slate-950 border border-cyan-500 flex items-center justify-center text-xs">
                    💎
                  </div>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-red-500 hover:bg-red-600 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center text-[10px] font-black cursor-pointer shadow">
                    <Plus className="w-3 h-3" />
                  </div>
                </div>

                {/* Interactions buttons */}
                <div className="flex flex-col items-center gap-0.5">
                  <button className="w-8 h-8 rounded-full bg-black/45 flex items-center justify-center text-rose-500 hover:scale-110 transition-transform">
                    <Heart className="w-4.5 h-4.5 fill-rose-500" />
                  </button>
                  <span className="text-[9px] text-white font-bold font-mono">{likes}</span>
                </div>

                <div className="flex flex-col items-center gap-0.5">
                  <button className="w-8 h-8 rounded-full bg-black/45 flex items-center justify-center text-slate-100 hover:scale-110 transition-transform">
                    <MessageCircle className="w-4.5 h-4.5" />
                  </button>
                  <span className="text-[9px] text-white font-bold font-mono">{comments}</span>
                </div>

                <div className="flex flex-col items-center gap-0.5">
                  <button className="w-8 h-8 rounded-full bg-black/45 flex items-center justify-center text-slate-100 hover:scale-110 transition-transform">
                    <Bookmark className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
                  </button>
                  <span className="text-[9px] text-white font-bold font-mono">{bookmarks}</span>
                </div>

                <div className="flex flex-col items-center gap-0.5">
                  <button className="w-8 h-8 rounded-full bg-black/45 flex items-center justify-center text-slate-100 hover:scale-110 transition-transform">
                    <Share2 className="w-4.5 h-4.5" />
                  </button>
                  <span className="text-[9px] text-white font-bold font-mono">{shares}</span>
                </div>

                {/* Rotating Vinyl Record for Tiktok */}
                {platform === "tiktok" && (
                  <div className="w-7 h-7 rounded-full bg-slate-900 border-4 border-slate-700 animate-spin flex items-center justify-center text-[8px] mt-2">
                    🎵
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
