// app/page.tsx
import Link from "next/link";
import { coreVocab } from "@/lib/hebrewWords";

export default function Home() {
  // Simple "today word" – first core vocab item
  const todayWord = coreVocab[0];

  return (
    <div className="space-y-8">
      {/* Main title */}
      <header className="space-y-1">
        <h1 className="text-3xl font-bold text-white">
          Today&apos;s Hebrew Mission
        </h1>
        <p className="text-slate-300 text-sm">
          Your daily structured training session. Complete all tasks to progress.
        </p>
      </header>

      {/* 4-card grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Word */}
        <div className="bg-slate-950/80 border border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div className="space-y-3">
            <div className="inline-flex px-2 py-1 rounded-md bg-slate-800 text-xs font-semibold text-sky-300 uppercase tracking-wide">
              Daily Word
            </div>

            <div className="flex justify-between items-center mt-1">
              <div className="space-y-1">
                <p className="text-emerald-300 text-sm font-semibold">
                  {todayWord.translit}
                </p>
                <p className="text-slate-200 text-sm">{todayWord.english}</p>
              </div>
              <p className="text-4xl font-bold text-white text-right">
                {todayWord.hebrew}
              </p>
            </div>
          </div>
        </div>

        {/* Listening Task */}
        <div className="bg-slate-950/80 border border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div className="space-y-3">
            <div className="inline-flex px-2 py-1 rounded-md bg-slate-800 text-xs font-semibold text-sky-300 uppercase tracking-wide">
              Listening Task
            </div>
            <p className="text-slate-200 text-sm">
              Imagine you hear this word in a sentence. Can you recognize it
              quickly and know what it means?
            </p>
          </div>

          <button
            className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-sky-500 text-slate-900 text-sm font-semibold hover:bg-sky-400"
            type="button"
          >
            ▶ Practice Listening (coming soon)
          </button>
        </div>

        {/* Speaking Challenge */}
        <div className="bg-slate-950/80 border border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div className="space-y-3">
            <div className="inline-flex px-2 py-1 rounded-md bg-slate-800 text-xs font-semibold text-sky-300 uppercase tracking-wide">
              Speaking Challenge
            </div>
            <p className="text-slate-200 text-sm">
              Say the word out loud 10 times. Focus on Hebrew rhythm and stress:
            </p>
            <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
              <li>First: slowly and clearly</li>
              <li>Then: at normal speed</li>
              <li>Finally: inside a simple sentence</li>
            </ul>
          </div>

          <button
            className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-fuchsia-500 text-slate-900 text-sm font-semibold hover:bg-fuchsia-400"
            type="button"
          >
            🔊 I completed the speaking task
          </button>
        </div>

        {/* Grammar / Tip of the Day */}
        <div className="bg-slate-950/80 border border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div className="space-y-3">
            <div className="inline-flex px-2 py-1 rounded-md bg-slate-800 text-xs font-semibold text-sky-300 uppercase tracking-wide">
              Grammar Tip of the Day
            </div>
            <p className="text-slate-200 text-sm">
              Hebrew is written from right to left. When you see a new word,
              train your eyes to start scanning from the right side of the word,
              not the left like in English. This will make reading much faster.
            </p>
          </div>
        </div>
      </section>

      {/* Start full lesson */}
      <div>
        <Link
          href="/learn/vocab"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-emerald-500 text-slate-900 text-lg font-semibold hover:bg-emerald-400"
        >
          Start Today&apos;s Full Lesson →
        </Link>
      </div>
    </div>
  );
}
