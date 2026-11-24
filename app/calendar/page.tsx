
"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Settings,
  ChevronLeft,
  ChevronRight,
  Home,
  CalendarDays,
  Apple,
  Bot,
  ChartNoAxesColumn,
  UserRound,
} from "lucide-react";
import Link from "next/link";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const moods = [
  { emoji: "😟", label: "Low" },
  { emoji: "😐", label: "Okay" },
  { emoji: "🙂", label: "Good" },
  { emoji: "🤩", label: "Great" },
];

const tabs = [
  { label: "Home", href: "/", Icon: Home },
  { label: "Calendar", href: "/calendar", Icon: CalendarDays },
  { label: "Nutrition", href: "/nutrition", Icon: Apple },
  { label: "AI Mentor", href: "/ai-mentor", Icon: Bot },
  { label: "Insights", href: "/insights", Icon: ChartNoAxesColumn },
  { label: "Profile", href: "/profile", Icon: UserRound },
];

export default function CalendarPage() {
  const [month, setMonth] = useState(new Date(2025, 4, 1));
  const [selectedDay, setSelectedDay] = useState(15);
  const [selectedMood, setSelectedMood] = useState(3);

  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const monthName = month.toLocaleString("en-US", { month: "long" });
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const previousMonthDays = new Date(year, monthIndex, 0).getDate();
  const offset = (new Date(year, monthIndex, 1).getDay() + 6) % 7;

  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const number = i - offset + 1;

    if (number < 1) {
      return {
        day: previousMonthDays + number,
        current: false,
        key: `prev-${i}`,
      };
    }

    if (number > daysInMonth) {
      return {
        day: number - daysInMonth,
        current: false,
        key: `next-${i}`,
      };
    }

    return { day: number, current: true, key: `current-${i}` };
  });

  function changeMonth(amount: number) {
    setMonth(new Date(year, monthIndex + amount, 1));
    setSelectedDay(1);
  }

  return (
    <main className="cycle-screen">
      <div className="cycle-scenery" aria-hidden="true">
        <div className="scenery-sun" />
        <div className="scenery-hill scenery-hill-back" />
        <div className="scenery-hill scenery-hill-front" />
      </div>

      <div className="cycle-content">
        <div className="phone-status">
          <span>9:41</span>
          <span>● ▮▮ ▰</span>
        </div>

        <header className="cycle-header">
          <Link href="/" className="circle-icon" aria-label="Back to Home">
            <ArrowLeft size={17} />
          </Link>
          <h1>Cycle Tracker</h1>
          <button
            className="circle-icon"
            aria-label="Calendar settings"
            onClick={() => alert("Cycle settings coming soon!")}
          >
            <Settings size={17} />
          </button>
        </header>

        <section className="cycle-calendar-card">
          <div className="month-heading">
            <div>
              <h2>{monthName} {year}</h2>
              <p>Choose a date to explore</p>
            </div>

            <div className="month-arrows">
              <button onClick={() => changeMonth(-1)} aria-label="Previous month">
                <ChevronLeft size={15} />
              </button>
              <button onClick={() => changeMonth(1)} aria-label="Next month">
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          <div className="cycle-calendar-grid">
            {weekdays.map((day) => (
              <span className="weekday" key={day}>{day}</span>
            ))}

            {calendarDays.map(({ day, current, key }) => {
              const isSelected = current && day === selectedDay;
              const isPeriod = current && day >= 1 && day <= 5;
              const isFertile = current && day >= 12 && day <= 17;
              const isOvulation = current && day === 15;

              return (
                <button
                  key={key}
                  disabled={!current}
                  onClick={() => setSelectedDay(day)}
                  className={[
                    "calendar-day",
                    !current ? "outside-month" : "",
                    isSelected ? "selected-day" : "",
                    isPeriod ? "period-day" : "",
                    isFertile ? "fertile-day" : "",
                  ].join(" ")}
                  aria-pressed={isSelected}
                >
                  {day}
                  {isOvulation && <span className="ovulation-dot" />}
                </button>
              );
            })}
          </div>

          <div className="cycle-legend">
            <span><i className="legend-dot period-dot" />Period</span>
            <span><i className="legend-dot fertile-dot" />Fertile</span>
            <span><i className="legend-dot ovulation-color" />Ovulation</span>
          </div>
        </section>

        <section className="today-card">
          <div className="today-title">
            <div>
              <h2>Today · Day 7</h2>
              <p>Follicular Phase</p>
            </div>
            <span className="phase-sparkle">✦</span>
          </div>

          <div className="flower-stage">
            <span className="flower-sparkle sparkle-one">✧</span>
            <span className="flower-sparkle sparkle-two">✦</span>
            <span className="flower-sparkle sparkle-three">✧</span>

            <div className="flower-stamp">
              <div className="stamp-rim">
                <span className="flower-emoji">🌼</span>
                <span className="flower-face">☺</span>
              </div>
              <span className="stamp-caption">You're Blooming!</span>
            </div>
          </div>

          <div className="energy-row">
            <span>Energy</span>
            <div className="energy-track">
              <div className="energy-fill" />
            </div>
            <strong>70%</strong>
          </div>

          <div className="mood-row">
            <span className="mood-label">Mood</span>
            <div className="mood-options">
              {moods.map((mood, index) => (
                <button
                  key={mood.label}
                  className={`mood-button ${selectedMood === index ? "mood-active" : ""}`}
                  onClick={() => setSelectedMood(index)}
                  aria-label={`Mood: ${mood.label}`}
                  aria-pressed={selectedMood === index}
                >
                  {mood.emoji}
                </button>
              ))}
            </div>
          </div>
        </section>

        <p className="cycle-footer-note">Little steps, more self-love ✨</p>
      </div>

      <nav className="cycle-bottom-nav" aria-label="Main navigation">
        {tabs.map(({ label, href, Icon }) => {
          const active = href === "/calendar";

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
    </main>
  );
}
