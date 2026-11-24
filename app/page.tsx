"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  Bell,
  ChevronRight,
  Heart,
  Apple,
  Bot,
  ChartNoAxesColumn,
  House,
  CalendarDays,
  UserRound,
} from "lucide-react";

const actions = [
  { label: "Cycle", href: "/calendar", Icon: Heart, color: "action-purple" },
  { label: "Nutrition", href: "/nutrition", Icon: Apple, color: "action-teal" },
  { label: "AI Mentor", href: "/ai-mentor", Icon: Bot, color: "action-blue" },
  {
    label: "Insights",
    href: "/insights",
    Icon: ChartNoAxesColumn,
    color: "action-pink",
  },
];

const tabs = [
  { label: "Home", href: "/", Icon: House },
  { label: "Calendar", href: "/calendar", Icon: CalendarDays },
  { label: "Nutrition", href: "/nutrition", Icon: Apple },
  { label: "AI Mentor", href: "/ai-mentor", Icon: Bot },
  { label: "Insights", href: "/insights", Icon: ChartNoAxesColumn },
  { label: "Profile", href: "/profile", Icon: UserRound },
];

const themes = [
  {
    id: "sunset",
    name: "Sunset",
    image: "/themes/sunset.png",
    dot: "linear-gradient(135deg,#ffb88c,#d76d9b)",
    bg: "linear-gradient(180deg,#f9d6ea 0%,#e6c9f2 50%,#cdb4f0 100%)",
  },
  {
    id: "sakura",
    name: "Sakura",
    image: "/themes/sakura.jpg",
    dot: "linear-gradient(135deg,#ffc2dd,#f48fb8)",
    bg: "linear-gradient(180deg,#fde1ee 0%,#f6cde3 50%,#e9bfdc 100%)",
  },
  {
    id: "ocean",
    name: "Ocean",
    image: "/themes/ocean.jpg",
    dot: "linear-gradient(135deg,#9ee7e0,#6fa8f0)",
    bg: "linear-gradient(180deg,#dff2f5 0%,#c9e0f4 50%,#b9c9f0 100%)",
  },
  {
    id: "night",
    name: "Night",
    image: "/themes/night.jpg",
    dot: "linear-gradient(135deg,#8a7bd8,#3b2d6b)",
    bg: "linear-gradient(180deg,#d9cff2 0%,#b9a8e8 50%,#9a8ad8 100%)",
  },
  {
    id: "forest",
    name: "Forest",
    image: "/themes/forest.jpg",
    dot: "linear-gradient(135deg,#a8e6b5,#4fa88a)",
    bg: "linear-gradient(180deg,#e2f4e6 0%,#cfe9dc 50%,#bfdcd6 100%)",
  },
];

export default function HomePage() {
  const [themeId, setThemeId] = useState("sunset");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bloom-theme");
      if (saved && themes.some((t) => t.id === saved)) setThemeId(saved);
    } catch {}
  }, []);

  function chooseTheme(id: string) {
    setThemeId(id);
    try {
      localStorage.setItem("bloom-theme", id);
    } catch {}
  }

  const theme = themes.find((t) => t.id === themeId) ?? themes[0];

  return (
    <main className="bloom-home">
      <div
        className="home-phone"
        data-theme={theme.id}
        style={{ ["--theme-bg" as string]: theme.bg }}
      >
        <div className="home-landscape" aria-hidden="true" />

        <div className="home-inner">
          <div className="home-status">
            <span>9:41</span>
            <span>◖ ▰ ▰</span>
          </div>

          <header className="home-topbar">
            <button
              className="home-round-button"
              aria-label="Menu"
              onClick={() => alert("Menu coming soon!")}
            >
              <Menu size={16} />
            </button>

            <Link
              href="/profile"
              className="home-round-button"
              aria-label="Notifications and profile"
            >
              <Bell size={16} />
            </Link>
          </header>

          <section className="home-greeting">
            <h1>
              Hello, <span className="user-name">User</span>
            </h1>

            <p>Let&apos;s take care of you today!</p>

            <span className="greeting-sparkle sparkle-a">⌁</span>
            <span className="greeting-sparkle sparkle-b">⌁</span>
          </section>

          <div className="theme-picker" aria-label="Choose theme">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => chooseTheme(t.id)}
                aria-label={`${t.name} theme`}
                aria-pressed={t.id === themeId}
                className={`theme-dot ${t.id === themeId ? "theme-dot-active" : ""}`}
                style={{ background: t.dot }}
              />
            ))}
          </div>

          <div className="cycle-wrap">
            <div
              className="cycle-scenery-bg"
              aria-hidden="true"
              style={{ backgroundImage: `url(${theme.image})` }}
            />

            <section className="home-cycle-card">
              <div className="cycle-card-copy">
                <p className="home-eyebrow">Your Cycle</p>
                <h2>Day 7</h2>
                <p className="cycle-phase">Follicular Phase</p>

                <Link href="/calendar" className="home-calendar-button">
                  View Calendar <ChevronRight size={12} />
                </Link>
              </div>

              <Link
                href="/calendar"
                className="cycle-progress"
                aria-label="Cycle day 7 of 28. Open calendar"
              >
                <div className="cycle-progress-inner">
                  <strong>7/28</strong>
                </div>
              </Link>
            </section>
          </div>

          <section className="home-focus-card">
            <div className="focus-copy">
              <h2>Today&apos;s Focus</h2>
              <p>Stay hydrated &amp; eat nourishing foods</p>
            </div>
            <div
              className="focus-illustration"
              aria-label="Water bottle and plant"
            >
              <span className="focus-leaf">🌿</span>
              <span className="focus-bottle">🧴</span>
              <span className="focus-plant">🪴</span>
            </div>
          </section>

          <section className="home-actions-card">
            <h2>Quick Actions</h2>
            <div className="home-actions-grid">
              {actions.map(({ label, href, Icon, color }) => (
                <Link href={href} className="home-action" key={label}>
                  <span className={`home-action-icon ${color}`}>
                    <Icon size={17} strokeWidth={2} />
                  </span>
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="home-quote-card">
            <div>
              <h2>“Small steps,</h2>
              <h2>big changes!”</h2>
            </div>
            <div className="quote-flower" aria-hidden="true">
              🌷
            </div>
          </section>

          <p className="home-footer">
            Made with care for your wellness <span>♥</span>
          </p>
        </div>

        <nav className="home-bottom-nav" aria-label="Main navigation">
          {tabs.map(({ label, href, Icon }) => (
            <Link
              key={href}
              href={href}
              className={`home-nav-item ${href === "/" ? "home-nav-active" : ""}`}
              aria-current={href === "/" ? "page" : undefined}
            >
              <span className="home-nav-icon">
                <Icon size={14} strokeWidth={1.8} />
              </span>
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}