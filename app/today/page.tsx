
"use client";


import Link from "next/link";
import { useEffect, useState } from "react";


type Task = {
  id: number;
  label: string;
  done: boolean;
};


const TODAY_TASKS_KEY = "lashon_today_tasks_v1";
const STREAK_KEY = "lashon_streak_v1";
const LAST_ACTIVITY_KEY = "lashon_last_activity_date_v1";


export default function TodayPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, label: "Review today’s new words (Dictionary)", done: false },
    { id: 2, label: "Play one round of Game 1 (vocab)", done: false },
    { id: 3, label: "Play one round of Game 2 (sentences)", done: false },
    { id: 4, label: "Send one question or voice note to madrichot", done: false },
  ]);


  const [streak, setStreak] = useState(0);
  const [lastActivityDate, setLastActivityDate] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);


  const completedCount = tasks.filter((t) => t.done).length;
  const progress = (completedCount / tasks.length) * 100;


  const focusWords = [
    { he: "קפה", en: "coffee" },
    { he: "בסיס", en: "base" },
    { he: "מחברת", en: "notebook" },
    { he: "היום", en: "today" },
  ];


  const messages = [
    {
      from: "Madricha Dana",
      time: "08:15",
      text: "Try to use today’s new words at least 3 times in real life.",
    },
    {
      from: "Course Staff",
      time: "Yesterday",
      text: "Remember: short practice every day is better than one long session.",
    },
  ];


  // Load from localStorage once
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem(TODAY_TASKS_KEY);
      if (storedTasks) {
        const parsed = JSON.parse(storedTasks) as Task[];
        if (Array.isArray(parsed) && parsed.length === tasks.length) {
          setTasks(parsed);
        }
      }


      const storedStreak = localStorage.getItem(STREAK_KEY);
      if (storedStreak) {
        setStreak(Number(storedStreak) || 0);
      }


      const storedDate = localStorage.getItem(LAST_ACTIVITY_KEY);
      if (storedDate) {
        setLastActivityDate(storedDate);
      }
    } catch {
      // ignore errors, just use defaults
    } finally {
      setHydrated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Save tasks + update streak when tasks change
  useEffect(() => {
    if (!hydrated) return;


    try {
      localStorage.setItem(TODAY_TASKS_KEY, JSON.stringify(tasks));
    } catch {
      /* ignore */
    }


    const hasActivity = completedCount > 0;
    if (!hasActivity) return;


    const today = new Date().toISOString().slice(0, 10);


    if (lastActivityDate === today) {
      // same day – nothing to do
      return;
    }


    let newStreak = streak;


    if (!lastActivityDate) {
      // first ever day with activity
      newStreak = 1;
    } else {
      const last = new Date(lastActivityDate);
      const diffMs = new Date(today).getTime() - last.getTime();
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));


      if (diffDays === 1) {
        newStreak = streak + 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }
    }


    setStreak(newStreak);
    setLastActivityDate(today);


    try {
      localStorage.setItem(STREAK_KEY, String(newStreak));
      localStorage.setItem(LAST_ACTIVITY_KEY, today);
    } catch {
      /* ignore */
    }
  }, [tasks, completedCount, hydrated, lastActivityDate, streak]);


  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Today</h2>
          <p className="text-sm text-slate-400">
            One place for today&apos;s focus, tasks, and quick links.
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-1 text-xs">
          <span className="text-slate-400">Daily checklist progress</span>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-32 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-slate-300">
              {completedCount} / {tasks.length} done
            </span>
          </div>
          <div className="text-slate-400">
            Streak:{" "}
            <span className="text-slate-100 font-semibold">
              {streak} day{streak === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </div>


      {/* Main row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: checklist / schedule */}
        <section className="lg:col-span-2 rounded-3xl bg-slate-950/80 border border-slate-800 p-5 shadow-md shadow-black/30 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-50">
                Today&apos;s mission
              </h3>
              <p className="text-xs text-slate-400">
                A short routine recommended by the madrichot.
              </p>
            </div>
            <span className="rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/40 text-[10px] uppercase tracking-wide px-3 py-1">
              ~20 minutes total
            </span>
          </div>


          <div className="space-y-2">
            {tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`w-full flex items-center justify-between rounded-2xl border px-3 py-2 text-xs md:text-sm text-left transition-all ${
                  task.done
                    ? "bg-emerald-500/15 border-emerald-400/60 text-emerald-100"
                    : "bg-slate-900/80 border-slate-800 text-slate-100 hover:border-sky-400/60"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`inline-flex h-4 w-4 rounded-full border text-[10px] items-center justify-center ${
                      task.done
                        ? "border-emerald-400 bg-emerald-400 text-slate-900"
                        : "border-slate-500"
                    }`}
                  >
                    {task.done ? "✓" : ""}
                  </span>
                  {task.label}
                </span>
                {task.done && (
                  <span className="text-[10px] uppercase tracking-wide">
                    Done
                  </span>
                )}
              </button>
            ))}
          </div>


          {/* Quick links row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 text-[11px]">
            <Link
              href="/dictionary"
              className="rounded-2xl bg-slate-900/80 border border-slate-800 px-3 py-2 hover:border-sky-400/60 transition-all"
            >
              <div className="font-semibold text-slate-50">Dictionary</div>
              <div className="text-slate-400">
                Look up words from today&apos;s lesson.
              </div>
            </Link>
            <Link
              href="/games"
              className="rounded-2xl bg-slate-900/80 border border-slate-800 px-3 py-2 hover:border-sky-400/60 transition-all"
            >
              <div className="font-semibold text-slate-50">Games</div>
              <div className="text-slate-400">
                Practice vocab & sentences in a fun way.
              </div>
            </Link>
            <Link
              href="/tests"
              className="rounded-2xl bg-slate-900/80 border border-slate-800 px-3 py-2 hover:border-sky-400/60 transition-all"
            >
              <div className="font-semibold text-slate-50">Tests</div>
              <div className="text-slate-400">
                Quick daily quiz or placement test.
              </div>
            </Link>
            <Link
              href="/madrichot"
              className="rounded-2xl bg-slate-900/80 border border-slate-800 px-3 py-2 hover:border-sky-400/60 transition-all"
            >
              <div className="font-semibold text-slate-50">
                Contact Madrichot
              </div>
              <div className="text-slate-400">
                Ask questions, send homework, get feedback.
              </div>
            </Link>
          </div>
        </section>


        {/* Right: stats + focus words */}
        <section className="rounded-3xl bg-slate-950/80 border border-slate-800 p-5 shadow-md shadow-black/30 space-y-4">
          {/* Mini stats */}
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-slate-50">
              Quick status
            </h3>
            <p className="text-xs text-slate-400">
              Streak and focus based on your daily checklist.
            </p>
          </div>


          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 px-3 py-2">
              <div className="text-slate-400 mb-1">Streak</div>
              <div className="text-lg font-semibold text-slate-50">
                {streak}
              </div>
              <div className="text-[11px] text-slate-400">
                Days in a row with at least one finished task
              </div>
            </div>
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 px-3 py-2">
              <div className="text-slate-400 mb-1">Today&apos;s focus</div>
              <div className="text-lg font-semibold text-slate-50">
                Vocabulary
              </div>
              <div className="text-[11px] text-slate-400">
                Later this can adapt from real tests
              </div>
            </div>
          </div>


          {/* Focus words */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-200">
              Focus words for today
            </h4>
            <div
              dir="rtl"
              className="rounded-2xl bg-slate-900/80 border border-slate-800 px-3 py-2 flex flex-wrap gap-2 text-xs"
            >
              {focusWords.map((w) => (
                <div
                  key={w.he}
                  className="px-2 py-1 rounded-full bg-slate-800 text-slate-50 border border-slate-700"
                >
                  <span className="font-medium mr-2">{w.he}</span>
                  <span className="text-slate-400 text-[11px]">{w.en}</span>
                </div>
              ))}
            </div>
          </div>


          {/* Messages */}
          <div className="space-y-2 pt-1">
            <h4 className="text-xs font-semibold text-slate-200">
              Messages from madrichot (demo)
            </h4>
            <div className="space-y-2">
              {messages.map((m, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-slate-900/80 border border-slate-800 px-3 py-2 text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-slate-50">
                      {m.from}
                    </span>
                    <span className="text-slate-500">{m.time}</span>
                  </div>
                  <p className="text-slate-300">{m.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
