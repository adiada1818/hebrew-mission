import Link from "next/link";

export default function TestsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Tests</h2>
          <p className="text-sm text-slate-400">
            Check your level, track progress, and share results with your madrichot.
          </p>
        </div>
        <div className="rounded-full bg-emerald-500/10 border border-emerald-400/40 px-3 py-1 text-[11px] text-emerald-300">
          Beta demo — results are stored locally only
        </div>
      </div>

      {/* Placement test card */}
      <section className="rounded-3xl bg-slate-950/80 border border-slate-800 p-5 shadow-md shadow-black/30 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-50">
              Level Placement Test
            </h3>
            <p className="text-xs text-slate-400">
              Multi-part test: vocabulary, sentence correctness, and one reading
              passage. Helps decide if you&apos;re around Alef, Bet, or Gimel.
            </p>
          </div>
          <span className="hidden md:inline-flex rounded-full bg-slate-900/90 px-3 py-1 text-[11px] text-slate-300 border border-slate-700">
            Full test
          </span>
        </div>

        <div className="rounded-2xl bg-slate-950/90 border border-slate-800 px-4 py-3 grid grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="space-y-1">
            <p className="text-slate-400 text-[11px] uppercase tracking-wide">
              Estimated time
            </p>
            <p>10–15 min</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-400 text-[11px] uppercase tracking-wide">
              Sections
            </p>
            <p>Vocab · Sentences · Reading</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-400 text-[11px] uppercase tracking-wide">
              Recommended
            </p>
            <p>Once every few weeks</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Good for: setting your base level with madrichot.</span>
          <Link
            href="/tests/placement"
            className="rounded-xl px-4 py-1 bg-slate-100 text-slate-900 text-xs font-medium shadow-sm hover:bg-white transition-all duration-150"
          >
            Start placement test
          </Link>
        </div>
      </section>

      {/* Daily quiz card */}
      <section className="rounded-3xl bg-slate-950/80 border border-slate-800 p-5 shadow-md shadow-black/30 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-50">
              Daily 5-Question Quiz
            </h3>
            <p className="text-xs text-slate-400">
              Super short vocab check based on words from the dictionary.
            </p>
          </div>
          <span className="hidden md:inline-flex rounded-full bg-sky-500/15 px-3 py-1 text-[11px] text-sky-300 border border-sky-500/50">
            Uses live dictionary data
          </span>
        </div>

        <div className="rounded-2xl bg-slate-950/90 border border-slate-800 px-4 py-3 grid grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="space-y-1">
            <p className="text-slate-400 text-[11px] uppercase tracking-wide">
              Questions
            </p>
            <p>5</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-400 text-[11px] uppercase tracking-wide">
              Focus
            </p>
            <p>Core vocab · word meaning</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-400 text-[11px] uppercase tracking-wide">
              Recommended
            </p>
            <p>After Today or Games</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Good for: quick feedback &amp; streaks.</span>
          <Link
            href="/tests/daily-quiz"
            className="rounded-xl px-4 py-1 bg-sky-500 text-slate-950 text-xs font-medium shadow-sm hover:bg-sky-400 transition-all duration-150"
          >
            Start daily quiz
          </Link>
        </div>
      </section>

      {/* Review / mock exam card */}
      <section className="rounded-3xl bg-slate-950/80 border border-slate-800 p-5 shadow-md shadow-black/30 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-50">
              Review &amp; Mock Exam
            </h3>
            <p className="text-xs text-slate-400">
              Mixed questions from previous material to check long-term memory.
            </p>
          </div>
          <span className="hidden md:inline-flex rounded-full bg-fuchsia-500/15 px-3 py-1 text-[11px] text-fuchsia-300 border border-fuchsia-500/50">
            Planned with staff
          </span>
        </div>

        <div className="rounded-2xl bg-slate-950/90 border border-slate-800 px-4 py-3 grid grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="space-y-1">
            <p className="text-slate-400 text-[11px] uppercase tracking-wide">
              Length
            </p>
            <p>10–15 min</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-400 text-[11px] uppercase tracking-wide">
              Source
            </p>
            <p>Previous weeks&apos; content</p>
          </div>
          <div className="space-y-1">
            <p className="text-slate-400 text-[11px] uppercase tracking-wide">
              Use with
            </p>
            <p>Progress page &amp; madrichot</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Good for: seeing what really stayed.</span>
          <button
            type="button"
            className="rounded-xl px-3 py-1 bg-slate-800 text-slate-500 text-xs cursor-not-allowed border border-slate-700"
          >
            Start review (soon)
          </button>
        </div>
      </section>
    </div>
  );
}
