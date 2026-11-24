
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  CalendarDays,
  Apple,
  Bot,
  ChartNoAxesColumn,
  UserRound,
} from "lucide-react";

const navigation = [
  { label: "Home", href: "/", icon: House },
  { label: "Calendar", href: "/calendar", icon: CalendarDays },
  { label: "Nutrition", href: "/nutrition", icon: Apple },
  { label: "AI Mentor", href: "/ai-mentor", icon: Bot },
  { label: "Insights", href: "/insights", icon: ChartNoAxesColumn },
  { label: "Profile", href: "/profile", icon: UserRound },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {navigation.map(({ label, href, icon: Icon }) => {
        const active = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={`nav-item ${active ? "active" : ""}`}
            aria-current={active ? "page" : undefined}
            style={{ textDecoration: "none" }}
          >
            <span className="nav-icon">
              <Icon size={17} />
            </span>
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
