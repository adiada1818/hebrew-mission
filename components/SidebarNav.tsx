"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/today", label: "Today" },
  { href: "/dictionary", label: "Dictionary" },
  { href: "/games", label: "Games" },
  { href: "/tests", label: "Tests" },
  { href: "/progress", label: "Progress" },
  { href: "/madrichot", label: "Contact Madrichot" },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950/80 backdrop-blur-xl px-4 py-4 gap-4 sticky top-0">
      {/* Logo / title */}
      <div className="flex items-center justify-between px-1">
        <div>
          <div className="text-sm font-semibold tracking-tight text-slate-50">
            Lashon · Beta
          </div>
          <div className="text-[11px] text-slate-400">
            Hebrew training for Matpash soldiers
          </div>
        </div>
        <div className="h-8 w-8 rounded-2xl bg-gradient-to-br from-sky-500 to-fuchsia-500 shadow-md flex items-center justify-center text-[13px] font-semibold text-slate-950">
          ל
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 mt-2 space-y-1 text-sm">
        {navItems.map((item) => {
          const active =
            pathname === item.href || pathname?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 rounded-2xl px-3 py-2 border text-sm transition-all ${
                active
                  ? "bg-slate-900 border-sky-500/70 text-sky-100 shadow-sm"
                  : "bg-transparent border-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-900/60 hover:border-slate-700"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  active ? "bg-sky-400" : "bg-slate-600"
                }`}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom info */}
      <div className="mt-auto pt-2 border-t border-slate-800 text-[11px] text-slate-500 space-y-1 px-1">
        <p>
          Built as a{" "}
          <span className="text-slate-200 font-medium">demo concept</span> for
          madrichot + soldiers.
        </p>
        <p>Data and tests here are examples only.</p>
      </div>
    </aside>
  );
}
