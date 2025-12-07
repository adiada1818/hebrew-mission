"use client";

import Link from "next/link";

export default function UserChip() {
  return (
    <Link
      href="/profile"
      className="flex items-center gap-3 rounded-2xl px-2 py-1 hover:bg-slate-800/60 transition cursor-pointer"
    >
      {/* Avatar */}
      <div className="h-8 w-8 rounded-2xl bg-gradient-to-tr from-fuchsia-500 to-sky-500 flex items-center justify-center text-sm font-semibold">
        A
      </div>

      {/* Text */}
      <div className="flex flex-col leading-tight">
        <span className="text-slate-100 text-sm font-medium">Adiel</span>
        <span className="text-[11px] text-slate-300">
          Lashon course · Soldier
        </span>
      </div>
    </Link>
  );
}
