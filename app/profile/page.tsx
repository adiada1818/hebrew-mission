// app/profile/page.tsx
"use client";

import { useState } from "react";
import { useAppTheme } from "../theme-context";

type AvatarOption = {
  id: string;
  label: string;
  emoji: string;
  gradient: string;
};

const AVATARS: AvatarOption[] = [
  { id: "default", label: "Classic", emoji: "A", gradient: "from-fuchsia-500 to-sky-500" },
  { id: "soldier", label: "Soldier", emoji: "🪖", gradient: "from-emerald-500 to-lime-400" },
  { id: "tech", label: "Techie", emoji: "💻", gradient: "from-indigo-500 to-purple-500" },
  { id: "radio", label: "Radio", emoji: "📻", gradient: "from-amber-400 to-orange-500" },
  { id: "book", label: "Learner", emoji: "📘", gradient: "from-cyan-500 to-blue-500" },
  { id: "fire", label: "On Fire", emoji: "🔥", gradient: "from-rose-500 to-orange-500" },
];

export default function ProfilePage() {
  const { theme, setTheme } = useAppTheme();

  const [name, setName] = useState("Adiel");
  const [track, setTrack] = useState("Lashon course");
  const [role, setRole] = useState("Soldier");
  const [avatarId, setAvatarId] = useState<string>("default");
  const [dailyGoal, setDailyGoal] = useState(4);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  const avatar = AVATARS.find((a) => a.id === avatarId) ?? AVATARS[0];

  function handleSave() {
    console.log({
      name,
      track,
      role,
      avatarId,
      dailyGoal,
      theme,
    });
    setSavedMsg("Profile saved ✔");
    setTimeout(() => setSavedMsg(null), 2000);
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Your profile</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Update your name, avatar, learning goal and more.
            </p>
          </div>
          <span className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs text-slate-600 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300">
            Lashon App · Beta
          </span>
        </header>

        {/* Top card */}
        <section className="rounded-2xl border bg-white/90 border-slate-200 p-5 sm:p-6 shadow-lg shadow-slate-200/60 dark:bg-slate-900/70 dark:border-slate-800 dark:shadow-slate-900/60 flex flex-col sm:flex-row gap-5">
          {/* Avatar preview */}
          <div className="flex flex-col items-center sm:items-start gap-3">
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr ${avatar.gradient}`}
            >
              <span className="text-4xl font-semibold drop-shadow-sm">
                {avatar.emoji}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              This is how other users see you in the app.
            </p>
          </div>

          {/* Form */}
          <div className="flex-1 space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs text-slate-600 dark:text-slate-300">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/70 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-50"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-600 dark:text-slate-300">
                  Track
                </label>
                <input
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/70 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-50"
                  placeholder="Lashon course, Ulpan, etc."
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs text-slate-600 dark:text-slate-300">
                  Role
                </label>
                <input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/70 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-50"
                  placeholder="Soldier, Commander, etc."
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-600 dark:text-slate-300">
                  Daily checklist goal
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={1}
                    max={8}
                    value={dailyGoal}
                    onChange={(e) => setDailyGoal(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm font-semibold">
                    {dailyGoal} tasks
                  </span>
                </div>
              </div>
            </div>

            {/* Theme buttons */}
            <div className="space-y-1">
              <label className="text-xs text-slate-600 dark:text-slate-300">
                Theme
              </label>
              <div className="flex gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  className={`flex-1 rounded-lg border px-3 py-2 ${
                    theme === "dark"
                      ? "border-sky-400 bg-slate-900 text-slate-50"
                      : "border-slate-300 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200"
                  }`}
                >
                  Dark
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  className={`flex-1 rounded-lg border px-3 py-2 ${
                    theme === "light"
                      ? "border-sky-400 bg-white text-slate-900"
                      : "border-slate-300 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200"
                  }`}
                >
                  Light
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Avatar selection */}
        <section className="rounded-2xl border bg-white/90 border-slate-200 p-5 sm:p-6 shadow-lg shadow-slate-200/60 dark:bg-slate-900/70 dark:border-slate-800 dark:shadow-slate-900/60">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Choose your avatar</h2>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Tap an avatar to select it.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {AVATARS.map((a) => {
              const selected = a.id === avatarId;
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAvatarId(a.id)}
                  className={`flex flex-col items-center gap-2 rounded-2xl border px-3 py-3 text-xs transition hover:scale-[1.02] ${
                    selected
                      ? "border-emerald-400 bg-slate-900/90 text-slate-50"
                      : "border-slate-300 bg-white text-slate-800 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-100"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr ${a.gradient}`}
                  >
                    <span className="text-2xl font-semibold">
                      {a.emoji}
                    </span>
                  </div>
                  <span className="font-medium">{a.label}</span>
                  {selected && (
                    <span className="text-[10px] text-emerald-300">
                      Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Save bar */}
        <footer className="flex items-center justify-between gap-3">
          {savedMsg && (
            <span className="text-xs text-emerald-600 dark:text-emerald-300">
              {savedMsg}
            </span>
          )}
          <div className="flex-1" />
          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-400 transition shadow shadow-sky-900/40"
          >
            Save changes
          </button>
        </footer>
      </div>
    </div>
  );
}
