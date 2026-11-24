"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  Bot,
  Send,
  Home,
  CalendarDays,
  Apple,
  ChartNoAxesColumn,
  UserRound,
} from "lucide-react";

const tabs = [
  { label: "Home", href: "/", Icon: Home },
  { label: "Calendar", href: "/calendar", Icon: CalendarDays },
  { label: "Nutrition", href: "/nutrition", Icon: Apple },
  { label: "AI Mentor", href: "/ai-mentor", Icon: Bot },
  { label: "Insights", href: "/insights", Icon: ChartNoAxesColumn },
  { label: "Profile", href: "/profile", Icon: UserRound },
];

const suggestions = [
  "Why am I feeling bloated?",
  "What should I eat today?",
  "Tips for better sleep",
  "Workout for PCOS",
  "I feel tired all the time",
];

// Placeholder replies. Replace getReply() with a real AI API call later.
function getReply(text: string) {
  const t = text.toLowerCase();
  if (t.includes("bloat"))
    return "Bloating can come from eating fast, high-sodium foods or hormonal shifts. Try smaller meals, more water, and gentle walks after eating. If it's severe or constant, check with your doctor.";
  if (t.includes("eat"))
    return "Aim for high-fiber, low-GI meals: oats with berries, dal with veggies, leafy greens, and nuts or seeds. Check the Nutrition tab for today's plan.";
  if (t.includes("sleep"))
    return "Keep a fixed bedtime, avoid screens 30 minutes before bed, and try a warm, caffeine-free drink in the evening.";
  if (t.includes("workout") || t.includes("exercise"))
    return "A mix of strength training, brisk walking and yoga works well. Even 20–30 minutes, 4–5 days a week, helps. Start light and build up.";
  if (t.includes("tired"))
    return "Low energy can be linked to sleep, iron levels, stress or blood sugar swings. Eat iron-rich foods, stay hydrated, and consider a blood test if it continues.";
  return "Thanks for sharing! I'm here to support your journey. Tell me a bit more, or tap one of the suggestions above.";
}

type Msg = { from: "user" | "bot"; text: string };

const card =
  "rounded-[22px] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(180,140,210,0.18)]";

function Robot({ size }: { size: number }) {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return (
      <div
        className="flex items-center justify-center rounded-full bg-gradient-to-br from-purple-200 to-pink-200 text-purple-600"
        style={{ width: size, height: size }}
      >
        <Bot size={size * 0.55} />
      </div>
    );
  }
  return (
    <img
      src="/ai-mentor/robot.png"
      alt="AI Mentor"
      onError={() => setOk(false)}
      style={{ width: size, height: size }}
      className="object-contain"
    />
  );
}

export default function AiMentorPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function send(text: string) {
    const value = text.trim();
    if (!value) return;
    setMessages((m) => [...m, { from: "user", text: value }]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: getReply(value) }]);
    }, 500);
  }

  return (
    <main
      className="flex min-h-screen items-center justify-center p-0 text-gray-800 sm:p-4"
      style={{
        background: "linear-gradient(180deg, #efe6f7 0%, #e3eef3 100%)",
      }}
    >
      {/* Phone frame */}
      <div
        className="relative flex w-full max-w-[390px] flex-col overflow-hidden border border-white/70 shadow-[0_20px_60px_rgba(150,110,190,0.25)] sm:rounded-[40px]"
        style={{
          height: "min(844px, 100vh)",
          background:
            "radial-gradient(circle at 15% 10%, #fbd3e9 0%, transparent 45%), radial-gradient(circle at 90% 30%, #d9c8f5 0%, transparent 50%), radial-gradient(circle at 20% 90%, #f7c9dd 0%, transparent 45%), linear-gradient(180deg, #f6e4f1 0%, #ecdcf6 100%)",
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-5 pt-6 pb-2">
          <Robot size={34} />
          <h1 className="text-lg font-semibold">AI Mentor</h1>
        </div>

        {/* Scrollable chat area */}
        <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-3 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Robot + greeting */}
          <div className="flex items-center gap-2">
            <div className="shrink-0">
              <Robot size={110} />
            </div>
            <div className={`${card} relative px-4 py-3 text-sm leading-snug`}>
              Hi Dhakshita! 👋
              <br />
              I&apos;m here to support your journey. How can I help you today?
            </div>
          </div>

          {/* Suggestions */}
          <div className="space-y-2.5">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className={`${card} w-full px-4 py-2.5 text-left text-sm transition active:scale-[0.98]`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Conversation */}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-snug ${
                  m.from === "user"
                    ? "bg-gradient-to-r from-purple-500 to-indigo-400 text-white"
                    : `${card}`
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className={`${card} mx-4 mb-3 flex items-center gap-2 !rounded-full py-1.5 pl-4 pr-1.5`}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-500"
          />
          <button
            type="submit"
            aria-label="Send"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-400 text-white shadow-md"
          >
            <Send size={16} />
          </button>
        </form>

        {/* Bottom navigation */}
        <div className="px-3 pb-3">
          <nav
            className="cycle-bottom-nav"
            aria-label="Main navigation"
            style={{
              position: "relative",
              left: "auto",
              right: "auto",
              bottom: "auto",
              width: "auto",
              maxWidth: "none",
              transform: "none",
            }}
          >
            {tabs.map(({ label, href, Icon }) => {
              const active = href === "/ai-mentor";

              return (
                <Link
                  key={href}
                  href={href}
                  className={`cycle-nav-item ${active ? "cycle-nav-active" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="cycle-nav-icon">
                    <Icon size={15} />
                  </span>
                  <span>{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </main>
  );
}