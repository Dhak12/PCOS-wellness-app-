"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import {
  Bell,
  ChevronRight,
  ClipboardList,
  Palette,
  Settings,
  LifeBuoy,
  Info,
  Home,
  CalendarDays,
  Apple,
  Bot,
  ChartNoAxesColumn,
  UserRound,
  X,
  Check,
} from "lucide-react";

const tabs = [
  { label: "Home", href: "/", Icon: Home },
  { label: "Calendar", href: "/calendar", Icon: CalendarDays },
  { label: "Nutrition", href: "/nutrition", Icon: Apple },
  { label: "AI Mentor", href: "/ai-mentor", Icon: Bot },
  { label: "Insights", href: "/insights", Icon: ChartNoAxesColumn },
  { label: "Profile", href: "/profile", Icon: UserRound },
];

const menu = [
  { id: "plan", title: "My Plan", sub: "Personalized for you", Icon: ClipboardList, color: "from-purple-400 to-purple-600", href: "/nutrition" },
  { id: "reminders", title: "Reminders", sub: "Never miss a log", Icon: Bell, color: "from-orange-300 to-orange-500" },
  { id: "theme", title: "Theme", sub: "Liquid Glass", Icon: Palette, color: "from-violet-400 to-indigo-500" },
  { id: "settings", title: "Settings", sub: "App preferences", Icon: Settings, color: "from-teal-300 to-teal-500" },
  { id: "support", title: "Support", sub: "We're here for you", Icon: LifeBuoy, color: "from-pink-400 to-rose-500" },
  { id: "about", title: "About", sub: "PCOS Balance v1.0", Icon: Info, color: "from-sky-400 to-blue-600" },
];

const themes = [
  { id: "sunset", name: "Sunset", dot: "linear-gradient(135deg,#ffb88c,#d76d9b)" },
  { id: "sakura", name: "Sakura", dot: "linear-gradient(135deg,#ffc2dd,#f48fb8)" },
  { id: "ocean", name: "Ocean", dot: "linear-gradient(135deg,#9ee7e0,#6fa8f0)" },
  { id: "night", name: "Night", dot: "linear-gradient(135deg,#8a7bd8,#3b2d6b)" },
  { id: "forest", name: "Forest", dot: "linear-gradient(135deg,#a8e6b5,#4fa88a)" },
];

const card =
  "rounded-[24px] bg-white/30 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(180,140,210,0.18)]";

function Avatar({ size }: { size: number }) {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return (
      <div
        className="flex items-center justify-center rounded-full bg-gradient-to-br from-purple-200 to-pink-200 text-purple-600"
        style={{ width: size, height: size }}
      >
        <UserRound size={size * 0.5} />
      </div>
    );
  }
  return (
    <img
      src="/profile/avatar.jpg"
      alt="Profile"
      onError={() => setOk(false)}
      style={{ width: size, height: size }}
      className="rounded-full border-2 border-white/80 object-cover shadow-md"
    />
  );
}

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      aria-pressed={on}
      className={`relative h-6 w-11 rounded-full transition ${
        on ? "bg-purple-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
          on ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm">{label}</span>
      {children}
    </div>
  );
}

export default function ProfilePage() {
  const [open, setOpen] = useState<string | null>(null);
  const [themeId, setThemeId] = useState("sunset");
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    period: true,
    water: true,
    meals: false,
    notifications: true,
    sounds: false,
  });

  useEffect(() => {
    try {
      const t = localStorage.getItem("bloom-theme");
      if (t) setThemeId(t);
      const s = localStorage.getItem("bloom-toggles");
      if (s) setToggles((prev) => ({ ...prev, ...JSON.parse(s) }));
    } catch {}
  }, []);

  function chooseTheme(id: string) {
    setThemeId(id);
    try {
      localStorage.setItem("bloom-theme", id);
    } catch {}
  }

  function flip(key: string) {
    setToggles((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem("bloom-toggles", JSON.stringify(next));
      } catch {}
      return next;
    });
  }

  const current = menu.find((m) => m.id === open);

  return (
    <main
      className="flex min-h-screen items-center justify-center p-0 text-gray-800 sm:p-4"
      style={{ background: "linear-gradient(180deg, #efe6f7 0%, #e3eef3 100%)" }}
    >
      <div
        className="relative w-full max-w-[390px] overflow-hidden border border-white/70 shadow-[0_20px_60px_rgba(150,110,190,0.25)] sm:rounded-[40px]"
        style={{
          height: "min(844px, 100vh)",
          background:
            "radial-gradient(circle at 15% 10%, #fbd3e9 0%, transparent 45%), radial-gradient(circle at 90% 30%, #d9c8f5 0%, transparent 50%), radial-gradient(circle at 20% 90%, #f7c9dd 0%, transparent 45%), linear-gradient(180deg, #f6e4f1 0%, #ecdcf6 100%)",
        }}
      >
        <div className="h-full space-y-3 overflow-y-auto px-4 pt-6 pb-28 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center justify-between px-1 pb-1">
            <h1 className="text-xl font-semibold">Profile</h1>
            <button
              aria-label="Reminders"
              onClick={() => setOpen("reminders")}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/50 text-gray-600 shadow-sm"
            >
              <Bell size={16} />
            </button>
          </div>

          <section className={`${card} flex items-center gap-4 p-4`}>
            <Avatar size={72} />
            <div>
              <p className="text-lg font-bold">Dhakshita 🌸</p>
              <p className="text-sm text-gray-600">PCOS Warrior 🎀</p>
            </div>
          </section>

          <section className={`${card} divide-y divide-white/50 p-1.5`}>
            {menu.map(({ id, title, sub, Icon, color, href }) => {
              const inner = (
                <>
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-md ${color}`}
                  >
                    <Icon size={19} />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-semibold">{title}</span>
                    <span className="block text-xs text-gray-500">{sub}</span>
                  </span>
                  <ChevronRight size={16} className="text-gray-400" />
                </>
              );
              const cls =
                "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition hover:bg-white/30";

              return href ? (
                <Link key={id} href={href} className={cls}>
                  {inner}
                </Link>
              ) : (
                <button key={id} onClick={() => setOpen(id)} className={cls}>
                  {inner}
                </button>
              );
            })}
          </section>

          <button
            onClick={() => alert("Logged out!")}
            className="mt-2 w-full rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-pink-400 py-3.5 text-base font-semibold text-white shadow-[0_10px_24px_rgba(168,85,247,0.4)] transition active:scale-[0.98]"
          >
            Log Out
          </button>
        </div>

        {/* Slide-up panel */}
        {current && (
          <div
            className="absolute inset-0 z-50 flex items-end bg-black/25"
            onClick={() => setOpen(null)}
          >
            <div
              className="max-h-[75%] w-full overflow-y-auto rounded-t-[28px] bg-white/95 p-5 pb-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{current.title}</h2>
                <button
                  aria-label="Close"
                  onClick={() => setOpen(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100"
                >
                  <X size={16} />
                </button>
              </div>

              {open === "reminders" && (
                <div className="divide-y divide-gray-100">
                  <Row label="Period reminder">
                    <Toggle on={toggles.period} onChange={() => flip("period")} />
                  </Row>
                  <Row label="Drink water">
                    <Toggle on={toggles.water} onChange={() => flip("water")} />
                  </Row>
                  <Row label="Log your meals">
                    <Toggle on={toggles.meals} onChange={() => flip("meals")} />
                  </Row>
                </div>
              )}

              {open === "theme" && (
                <div>
                  <p className="mb-3 text-xs text-gray-500">
                    Your choice also changes the Home screen.
                  </p>
                  <div className="space-y-2">
                    {themes.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => chooseTheme(t.id)}
                        className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left ${
                          themeId === t.id
                            ? "border-purple-400 bg-purple-50"
                            : "border-gray-100"
                        }`}
                      >
                        <span
                          className="h-8 w-8 rounded-full border-2 border-white shadow"
                          style={{ background: t.dot }}
                        />
                        <span className="flex-1 text-sm font-medium">{t.name}</span>
                        {themeId === t.id && <Check size={16} className="text-purple-500" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {open === "settings" && (
                <div className="divide-y divide-gray-100">
                  <Row label="Notifications">
                    <Toggle on={toggles.notifications} onChange={() => flip("notifications")} />
                  </Row>
                  <Row label="Sounds">
                    <Toggle on={toggles.sounds} onChange={() => flip("sounds")} />
                  </Row>
                </div>
              )}

              {open === "support" && (
                <div className="space-y-3 text-sm text-gray-600">
                  <p>Need help or have feedback? We&apos;re here for you.</p>
                  <a
                    href="mailto:support@example.com"
                    className="block rounded-2xl bg-purple-50 p-3 font-medium text-purple-600"
                  >
                    support@example.com
                  </a>
                  <p className="text-xs">
                    This app gives general wellness info and is not a substitute
                    for medical advice.
                  </p>
                </div>
              )}

              {open === "about" && (
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="font-semibold text-gray-800">PCOS Balance v1.0</p>
                  <p>
                    A wellness companion for tracking your cycle, nutrition and
                    symptoms, with an AI mentor to support your journey.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <nav
          className="cycle-bottom-nav"
          aria-label="Main navigation"
          style={{
            position: "absolute",
            left: 12,
            right: 12,
            bottom: 12,
            width: "auto",
            maxWidth: "none",
            transform: "none",
          }}
        >
          {tabs.map(({ label, href, Icon }) => {
            const active = href === "/profile";
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
    </main>
  );
}