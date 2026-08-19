import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Sparkles, MessageSquare, RefreshCw } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
}

interface InteractiveAssistantProps {
  email: string;
}

export default function InteractiveAssistant({ email }: InteractiveAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "مرحباً بك! أنا مساعدك الذاتي لهندسة الأوامر وتطوير استراتيجيات الإقناع. يمكنك أن تسألني عن أي برومبت ترغب في تطويره أو كيف تضيف شروطاً قوية لزيادة معدل تحويل متجرك الإلكتروني. كيف أستطيع خدمتك اليوم؟"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      text: inputValue
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);
    setError(null);

    try {
      // Keep only last 10 messages to avoid token bloat
      const apiMessages = [...messages, userMessage].slice(-10).map((m) => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch("/api/prompt/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, messages: apiMessages })
      });

      const data = await res.json();
      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: Math.random().toString(),
            role: "model",
            text: data.reply
          }
        ]);
      } else {
        setError(data.error || "حدث خطأ أثناء إرسال رسالتك. يرجى تكرار المحاولة.");
      }
    } catch (err) {
      setError("فشل الاتصال بالخادم. الرجاء التحقق من جودة الشبكة.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: "welcome",
        role: "model",
        text: "مرحباً بك! أنا مساعدك الذاتي لهندسة الأوامر وتطوير استراتيجيات الإقناع. يمكنك أن تسألني عن أي برومبت ترغب في تطويره أو كيف تضيف شروطاً قوية لزيادة معدل تحويل متجرك الإلكتروني. كيف أستطيع خدمتك اليوم؟"
      }
    ]);
    setError(null);
  };

  return (
    <div className="space-y-4 text-right" dir="rtl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
            <span>مساعد هندسة الأوامر الذاتي (Self Interactive Chat)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            دردش بمرونة تامة مع مساعدك الخبير الذكي لتحسين برومبتاتك، فحص عناصر الإقناع، أو كتابة زوايا مبيعات إبداعية لمتجرك.
          </p>
        </div>

        <button
          onClick={handleClear}
          className="bg-white/5 hover:bg-white/10 text-slate-300 text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 border border-white/5 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>مسح المحادثة</span>
        </button>
      </div>

      <div className="bg-slate-950/80 border border-white/10 rounded-2xl flex flex-col h-[400px] overflow-hidden">
        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-800">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 max-w-[85%] ${
                m.role === "user" ? "mr-auto flex-row-reverse" : "ml-auto"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${
                  m.role === "user"
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    : "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                }`}
              >
                {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`rounded-2xl p-3.5 text-xs leading-relaxed ${
                  m.role === "user"
                    ? "bg-emerald-500/10 text-emerald-200 border border-emerald-500/15 rounded-tr-none"
                    : "bg-white/5 text-slate-200 border border-white/5 rounded-tl-none"
                }`}
              >
                <p className="whitespace-pre-wrap">{m.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 mr-auto bg-slate-900 border border-slate-850 p-3 rounded-2xl max-w-[200px]">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              <span className="text-[10px] text-slate-400 font-semibold animate-pulse">جاري صياغة رد المحترف...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-500/15 border border-red-500/20 text-red-400 text-[11px] p-3 rounded-lg text-center font-bold">
              {error}
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="border-t border-white/5 p-3.5 bg-slate-950/40 flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="مثال: كيف أستطيع تحسين برومبت إعلاني لبيعه بسعر مرتفع؟"
            className="flex-1 bg-white/5 border border-white/5 hover:border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/40 focus:bg-slate-950 placeholder:text-slate-600 transition-all font-sans"
          />

          <button
            onClick={handleSend}
            disabled={loading || !inputValue.trim()}
            className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 p-3 rounded-xl transition-all shadow-md shadow-cyan-500/10 hover:shadow-cyan-500/25 disabled:opacity-50 cursor-pointer flex items-center justify-center"
          >
            <Send className="w-4 h-4 text-slate-950 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}
