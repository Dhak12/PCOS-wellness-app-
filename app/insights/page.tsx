"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChartNoAxesColumn,
  Pencil,
  TrendingUp,
  Check,
  ChevronRight,
  Home,
  CalendarDays,
  Apple,
  Bot,
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

// Weekly bar data (value is 0-100). Edit these to change the chart.
const chartData = [
  { day: "M", full: "Monday", value: 40 },
  { day: "T", full: "Tuesday", value: 55 },
  { day: "W", full: "Wednesday", value: 48 },
  { day: "T", full: "Thursday", value: 72 },
  { day: "F", full: "Friday", value: 65 },
  { day: "S", full: "Saturday", value: 85 },
  { day: "S", full: "Sunday", value: 92 },
];

const yTicks = [0, 25, 50, 75, 100];

const symptoms = [
  {
    name: "Bloating",
    level: "High",
    pct: 85,
    bar: "from-pink-400 to-rose-500",
    text: "text-rose-500",
  },
  {
    name: "Fatigue",
    level: "Medium",
    pct: 60,
    bar: "from-orange-300 to-orange-500",
    text: "text-orange-500",
  },
  {
    name: "Acne",
    level: "Low",
    pct: 35,
    bar: "from-teal-300 to-teal-500",
    text: "text-teal-500",
  },
];

const card =
  "rounded-[24px] bg-white/30 p-4 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(180,140,210,0.18)]";

export default function InsightsPage() {
  const [selected, setSelected] = useState(6);
  const plotHeight = 220; // chart height in px, increase for an even bigger chart
  const active = chartData[selected];

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
          <div className="flex items-center justify-between px-1 pb-1">
            <div className="flex items-center gap-2">
              <ChartNoAxesColumn className="text-purple-500" size={24} />
              <h1 className="text-xl font-semibold">Insights</h1>
            </div>
            <button
              aria-label="Edit"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/50 text-gray-500"
            >
              <Pencil size={14} />
            </button>
          </div>

          {/* This Month - Pill bar chart */}
          <section className={card}>
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-sm font-semibold">This Month</h2>
                <p className="mt-1 text-xs text-gray-500">Good progress!</p>
              </div>
              <span className="flex items-center gap-1 text-sm font-semibold text-purple-600">
                +12% <TrendingUp size={14} />
              </span>
            </div>

            {/* Big number */}
            <div className="mt-3 flex items-end gap-2">
              <span className="text-5xl font-bold leading-none text-purple-700">
                {active.value}
              </span>
              <span className="pb-1 text-[11px] font-semibold tracking-widest text-gray-500">
                SCORE · {active.full.toUpperCase()}
              </span>
            </div>

            <div className="mt-4 flex">
              {/* Y-axis labels */}
              <div
                className="relative w-7 shrink-0"
                style={{ height: plotHeight }}
              >
                {yTicks.map((t) => (
                  <span
                    key={t}
                    className="absolute right-1 translate-y-1/2 text-[10px] text-gray-500"
                    style={{ bottom: `${t}%` }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Plot area */}
              <div className="flex-1">
                <div
                  className="relative border-b-2 border-l-2 border-gray-400/60"
                  style={{ height: plotHeight }}
                >
                  {/* Gridlines */}
                  {yTicks.slice(1).map((t) => (
                    <div
                      key={t}
                      className="absolute left-0 right-0 border-t border-dashed border-gray-400/40"
                      style={{ bottom: `${t}%` }}
                    />
                  ))}

                  {/* Pill bars */}
                  <div className="absolute inset-0 flex items-end justify-around px-1">
                    {chartData.map((d, i) => {
                      const isActive = i === selected;
                      return (
                        <button
                          key={i}
                          onClick={() => setSelected(i)}
                          aria-label={`${d.full}: ${d.value}`}
                          className="flex h-full w-7 items-end"
                        >
                          <div
                            className={`w-full rounded-full bg-gradient-to-t from-purple-500 via-fuchsia-400 to-pink-400 transition-all ${
                              isActive
                                ? "opacity-100 shadow-[0_0_14px_rgba(168,85,247,0.6)]"
                                : "opacity-60"
                            }`}
                            style={{ height: `${d.value}%` }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* X-axis day letters */}
                <div className="flex justify-around px-1 pt-2">
                  {chartData.map((d, i) => (
                    <span
                      key={i}
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold ${
                        i === selected
                          ? "bg-purple-500 text-white shadow"
                          : "text-gray-500"
                      }`}
                    >
                      {d.day}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <p className="mt-2 text-right text-[10px] text-gray-500">
              vs last month
            </p>
          </section>

          {/* Cycle Insights */}
          <section className={card}>
            <h2 className="text-sm font-semibold">Cycle Insights</h2>
            <p className="mt-3 text-xs text-gray-600">
              Your average cycle length
            </p>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-3xl font-bold">32 days</p>
              <span className="flex items-center gap-1 text-sm text-gray-600">
                Regular <Check size={16} className="text-teal-500" />
              </span>
            </div>
          </section>

          {/* Top Symptoms */}
          <section className={card}>
            <h2 className="mb-3 text-sm font-semibold">Top Symptoms</h2>
            <div className="space-y-4">
              {symptoms.map((s) => (
                <div key={s.name} className="flex items-center gap-3">
                  <span className="w-14 text-xs">{s.name}</span>
                  <div className="h-2 flex-1 rounded-full bg-white/70">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${s.bar}`}
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                  <span
                    className={`w-12 text-right text-xs font-semibold ${s.text}`}
                  >
                    {s.level}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* View full report */}
          <button
            className={`${card} flex w-full items-center justify-between !py-3 text-left`}
          >
            <span className="text-sm font-semibold text-purple-600">
              View full report
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/60 text-purple-500">
              <ChevronRight size={16} />
            </span>
          </button>
        </div>

        {/* Bottom navigation (inside the frame) */}
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
            const isActive = href === "/insights";

            return (
              <Link
                key={href}
                href={href}
                className={`cycle-nav-item ${isActive ? "cycle-nav-active" : ""}`}
                aria-current={isActive ? "page" : undefined}
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