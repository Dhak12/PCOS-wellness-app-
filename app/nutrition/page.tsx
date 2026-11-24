"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Leaf,
  Home,
  CalendarDays,
  Apple,
  Bot,
  ChartNoAxesColumn,
  UserRound,
} from "lucide-react";

const recommended = 1680;
const consumed = 1200;

const macros = [
  { label: "Carbs", pct: 45, color: "from-purple-500 to-purple-300" },
  { label: "Protein", pct: 25, color: "from-teal-400 to-emerald-300" },
  { label: "Fats", pct: 30, color: "from-orange-400 to-amber-300" },
];

const meals: Record<
  string,
  { name: string; kcal: number; note: string; img: string }
> = {
  Breakfast: {
    name: "Berry Oats Bowl",
    kcal: 320,
    note: "High fiber • PCOS friendly",
    img: "/nutrition/berry-oats.png",
  },
  Lunch: {
    name: "Quinoa Veggie Bowl",
    kcal: 450,
    note: "Protein rich • Low GI",
    img: "/nutrition/lunch.png",
  },
  Dinner: {
    name: "Dal & Roti",
    kcal: 400,
    note: "Light • Easy to digest",
    img: "/nutrition/dinner.png",
  },
  Snacks: {
    name: "Roasted Chana",
    kcal: 150,
    note: "Fiber rich • Filling",
    img: "/nutrition/snacks.png",
  },
};

const ironPicks = [
  { name: "Spinach", img: "/nutrition/spinach.png" },
  { name: "Chia Seeds", img: "/nutrition/chia-seeds.png" },
  { name: "Methi", img: "/nutrition/methi.png" },
  { name: "Pumpkin Seeds", img: "/nutrition/pumpkin-seeds.png" },
];

const tabs = [
  { label: "Home", href: "/", Icon: Home },
  { label: "Calendar", href: "/calendar", Icon: CalendarDays },
  { label: "Nutrition", href: "/nutrition", Icon: Apple },
  { label: "AI Mentor", href: "/ai-mentor", Icon: Bot },
  { label: "Insights", href: "/insights", Icon: ChartNoAxesColumn },
  { label: "Profile", href: "/profile", Icon: UserRound },
];

const card =
  "rounded-[24px] bg-white/30 p-4 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(180,140,210,0.18)]";

export default function NutritionPage() {
  const [tab, setTab] = useState("Breakfast");
  const meal = meals[tab];

  const r = 36;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - consumed / recommended);

  return (
    <main
      className="flex min-h-screen items-center justify-center p-0 text-gray-800 sm:p-4"
      style={{
        background: "linear-gradient(180deg, #efe6f7 0%, #e3eef3 100%)",
      }}
    >
      {/* Phone frame */}
      <div
        className="relative w-full max-w-[390px] overflow-hidden border border-white/70 shadow-[0_20px_60px_rgba(150,110,190,0.25)] sm:rounded-[40px]"
        style={{
          height: "min(844px, 100vh)",
          background:
            "radial-gradient(circle at 15% 10%, #fbd3e9 0%, transparent 45%), radial-gradient(circle at 90% 30%, #d9c8f5 0%, transparent 50%), radial-gradient(circle at 20% 90%, #f7c9dd 0%, transparent 45%), linear-gradient(180deg, #f6e4f1 0%, #ecdcf6 100%)",
        }}
      >
        {/* Scrollable content */}
        <div className="h-full space-y-3 overflow-y-auto px-4 pt-6 pb-28 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Header */}
          <div className={`${card} flex items-center gap-2 !py-3`}>
            <Leaf className="text-emerald-500" size={22} />
            <h1 className="text-lg font-semibold">Nutrition &amp; Diet</h1>
          </div>

          {/* Today's Plan */}
          <section className={card}>
            <h2 className="mb-3 text-sm font-semibold">Today&apos;s Plan</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-4xl font-bold">
                  {recommended}{" "}
                  <span className="text-base font-normal">kcal</span>
                </p>
                <p className="text-xs text-gray-500">Recommended</p>
              </div>
              <div className="relative h-24 w-24">
                <svg viewBox="0 0 100 100" className="-rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r={r}
                    fill="none"
                    stroke="#e5d4f7"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={r}
                    fill="none"
                    stroke="#14b8a6"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={c}
                    strokeDashoffset={offset}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold">{consumed}</span>
                  <span className="text-[10px] text-gray-500">Consumed</span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              {macros.map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between text-xs font-medium">
                    <span>{m.label}</span>
                    <span>{m.pct}%</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-white/80">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${m.color}`}
                      style={{ width: `${m.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Meal Plan */}
          <section className={card}>
            <h2 className="mb-3 text-sm font-semibold">Meal Plan</h2>
            <div className="grid grid-cols-4 gap-1.5">
              {Object.keys(meals).map((t) => (
    <button
      key={t}
      onClick={() => setTab(t)}
      style={{ fontSize: 11 }}
      className={`whitespace-nowrap rounded-full px-1 py-1.5 font-medium transition ${
        tab === t
          ? "bg-gradient-to-r from-purple-500 to-pink-400 text-white shadow-md"
          : "bg-white/60 text-gray-600"
      }`}
    >
      {t}
    </button>
  ))}
</div>

            <div className="mt-3 flex items-center gap-4 rounded-3xl bg-white/50 p-3">
              <img
                src={meal.img}
                alt={meal.name}
                className="h-20 w-20 shrink-0 rounded-2xl object-cover shadow-md"
              />
              <div className="min-w-0">
                <p className="text-base font-bold leading-tight">{meal.name}</p>
                <p className="text-sm text-gray-600">{meal.kcal} kcal</p>
                <p className="text-xs text-gray-500">{meal.note}</p>
              </div>
            </div>
          </section>

          {/* Iron Rich Picks */}
          <section className={card}>
            <h2 className="mb-3 text-sm font-semibold">Iron Rich Picks</h2>
            <div className="grid grid-cols-4 gap-2 text-center">
              {ironPicks.map((p) => (
                <div
                  key={p.name}
                  className="flex flex-col items-center gap-1.5"
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-14 w-14 rounded-full bg-white/70 object-cover shadow-md"
                  />
                  <span className="text-[11px] font-medium">{p.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Tip of the Day */}
          <section
            className={`${card} flex items-center justify-between gap-3`}
          >
            <div>
              <h2 className="text-sm font-semibold">Tip of the Day</h2>
              <p className="mt-1 text-xs text-gray-600">
                Include cinnamon in your diet to help regulate blood sugar.
              </p>
            </div>
            <img
              src="/nutrition/cinnamon.png"
              alt="Cinnamon"
              className="h-16 w-20 shrink-0 rounded-xl object-cover"
            />
          </section>
        </div>

        {/* Bottom Navigation (inside the frame) */}
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
            const active = href === "/nutrition";

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