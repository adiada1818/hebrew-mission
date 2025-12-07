"use client";

import { useEffect, useState } from "react";

type ViewMode = "weeks" | "days";

const weeklyData = [
  { label: "Week 1", vocab: 40, reading: 35, grammar: 30 },
  { label: "Week 2", vocab: 55, reading: 45, grammar: 38 },
  { label: "Week 3", vocab: 65, reading: 55, grammar: 48 },
  { label: "Week 4", vocab: 72, reading: 62, grammar: 55 },
];

const recentDays = [
  { label: "Mon", score: 60 },
  { label: "Tue", score: 72 },
  { label: "Wed", score: 80 },
  { label: "Thu", score: 68 },
  { label: "Fri", score: 75 },
];

const STREAK_KEY = "lashon_streak_v1";

export default function ProgressPage() {
  const [mode, setMode] = useState<ViewMode>("weeks");
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STREAK_KEY);
      if (stored) {
        setStreak(Number(stored) || 0);
      }
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Progress</h2>
          <p className="text-sm text-slate-400">
            Track how your Hebrew is improving over time.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setMode("weeks")}
            className={`px-3 py-1 rounded-full border transition-all ${
              mode === "weeks"
                ? "bg-sky-500 text-slate-950 border-sky-400"
                : "bg-slate-900/80 text-slate-200 border-slate-700 hover:border-sky-400"
            }`}
          >
            Last 4 weeks
          </button>
          <button
            onClick={() => setMode("days")}
            className={`px-3 py-1 rounded-full border transition-all ${
              mode === "days"
                ? "bg-sky-500 text-slate-950 border-sky-400"
                : "bg-slate-900/80 text-slate-200 border-slate-700 hover:border-sky-400"
            }`}
          >
            Last 5 days
          </button>
        </div>
      </div>

      {/* Top row: charts / summary */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Chart card */}
        <section className="xl:col-span-2 rounded-3xl bg-slate-950/80 border border-slate-800 p-5 shadow-md shadow-black/30 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-50">
                {mode === "weeks"
                  ? "Weekly progress (demo data)"
                  : "Last 5 days (demo data)"}
              </h3>
              <p className="text-xs text-slate-400">
                Later this will be based on real test and game results.
              </p>
            </div>
          </div>

          {mode === "weeks" ? (
            <div className="space-y-3">
              {weeklyData.map((w) => (
                <div key={w.label} className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">{w.label}</span>
                    <span className="text-slate-400">
                      Vocab {w.vocab}% • Reading {w.reading}% • Grammar{" "}
                      {w.grammar}%
                    </span>
                  </div>
                  {/* stacked style bar */}
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden flex">
                    <div
                      className="h-full bg-sky-500"
                      style={{ width: `${w.vocab}%` }}
                    />
                    <div
                      className="h-full bg-emerald-500"
                      style={{
                        width: `${Math.max(w.reading - w.vocab, 0)}%`,
                      }}
                    />
                    <div
                      className="h-full bg-fuchsia-500"
                      style={{
                        width: `${Math.max(w.grammar - w.reading, 0)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-3 text-xs">
              {recentDays.map((d) => (
                <div
                  key={d.label}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="h-24 w-6 rounded-full bg-slate-800 overflow-hidden flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-sky-500 to-fuchsia-500 transition-all"
                      style={{ height: `${d.score}%` }}
                    />
                  </div>
                  <span className="text-slate-300">{d.label}</span>
                  <span className="text-slate-400">{d.score}%</span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Right: level + streak + hints */}
        <section className="rounded-3xl bg-slate-950/80 border border-slate-800 p-5 shadow-md shadow-black/30 space-y-4 text-xs text-slate-300">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-slate-50">
              Current level (example)
            </h3>
            <p className="text-slate-400">
              This is placeholder text – madrichot will later set real levels.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 px-3 py-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Overall level</span>
              <span className="text-slate-50 font-semibold">Alef / Bet</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-sky-500"
                style={{ width: "55%" }}
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-300">Practice streak</span>
              <span className="text-slate-50 font-semibold">
                {streak} day{streak === 1 ? "" : "s"}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Streak is based on your daily checklist on the Today page (at
              least one finished task per day).
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-50">
              Suggested focus from data
            </h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Spend a bit more time on reading longer sentences.</li>
              <li>Keep doing vocab games – they help all other skills.</li>
              <li>
                Once a week, do a review test instead of only daily quizzes.
              </li>
            </ul>
          </div>
        </section>
      </div>

      {/* Bottom: link to other pages */}
      <section className="rounded-3xl bg-slate-950/80 border border-slate-800 p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 shadow-sm">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-slate-50">
            Connect with Tests
          </h4>
          <p>
            Placement tests and daily quizzes will feed directly into this
            progress view once the real data connection is added.
          </p>
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-slate-50">
            Connect with Games
          </h4>
          <p>
            Accuracy and streaks from the Games page can also be used as
            signals for your progress – especially for vocabulary.
          </p>
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-slate-50">
            For madrichot
          </h4>
          <p>
            In the full system, this page can become a soldier-facing mirror of
            the staff dashboard, so everyone sees the same story.
          </p>
        </div>
      </section>
    </div>
  );
}
