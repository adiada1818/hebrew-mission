"use client";

import { useState } from "react";

type QuickOption = {
  id: number;
  he: string;
  en: string;
};

const quickOptions: QuickOption[] = [
  {
    id: 1,
    he: "היי, אפשר לקבל הסבר נוסף על המילים של היום?",
    en: "Hi, can I get a bit more explanation on today’s words?",
  },
  {
    id: 2,
    he: "תוכלי לשלוח לי דוגמה למשפטים עם המילים החדשות?",
    en: "Could you send me example sentences with the new words?",
  },
  {
    id: 3,
    he: "אני צריך עוד תרגול בקריאה, מה את ממליצה?",
    en: "I need more practice with reading, what do you recommend?",
  },
];

export default function MadrichotPage() {
  const [message, setMessage] = useState("");
  const [selectedQuick, setSelectedQuick] = useState<QuickOption | null>(null);

  function handleQuickSelect(option: QuickOption) {
    setSelectedQuick(option);
    setMessage(option.he);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    // In the real system, here we would send to backend / IDF system
    alert(
      "Demo only – in the real app this message would be sent securely to the madrichot:\n\n" +
        message
    );
    setMessage("");
    setSelectedQuick(null);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Contact Madrichot
          </h2>
          <p className="text-sm text-slate-400">
            Ask questions, send homework, and get corrections in one place.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/40 px-3 py-1">
            Demo – messages are not really sent
          </span>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: message area */}
        <section className="xl:col-span-2 rounded-3xl bg-slate-950/80 border border-slate-800 p-5 shadow-md shadow-black/30 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-50">
                Send a message
              </h3>
              <p className="text-xs text-slate-400">
                Write in Hebrew or English. Madrichot will reply in the official
                system.
              </p>
            </div>
          </div>

          {/* Example conversation */}
          <div className="rounded-2xl bg-slate-900/90 border border-slate-800 px-4 py-3 space-y-2 text-xs">
            <p className="text-[11px] text-slate-500 mb-1">
              Example of how it will look (demo only):
            </p>

            {/* Madricha message */}
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-slate-800 text-slate-50 px-3 py-2 text-xs">
                <p>
                  היי עדיאל, נסה להשתמש במילים החדשות במשפטים על היום שלך. אם אתה
                  רוצה, שלח לי הקלטה קצרה.
                </p>
                <p className="mt-1 text-[10px] text-slate-400">Dana • 08:15</p>
              </div>
            </div>

            {/* Soldier reply example */}
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-sky-500 text-slate-950 px-3 py-2 text-xs">
                <p>מעולה, אשלח לך הודעה קולית אחרי השיעור של היום 🙏</p>
                <p className="mt-1 text-[10px] text-sky-900/80 text-right">
                  You • 08:17
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1 text-xs">
              <label className="text-slate-300">
                Your message (Hebrew or English)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-500"
                placeholder="Write your question, send homework, or ask for corrections…"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  className="rounded-xl px-4 py-1.5 bg-sky-500 text-slate-950 font-medium shadow-sm hover:bg-sky-400 transition-all duration-150"
                >
                  Send message (demo)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMessage("");
                    setSelectedQuick(null);
                  }}
                  className="rounded-xl px-3 py-1.5 border border-slate-700 text-slate-100 hover:border-sky-400 hover:bg-slate-900 transition-all duration-150"
                >
                  Clear
                </button>
              </div>
              {selectedQuick && (
                <span className="text-slate-400">
                  Using quick template:{" "}
                  <span className="text-slate-200 font-medium">
                    {selectedQuick.en}
                  </span>
                </span>
              )}
            </div>
          </form>
        </section>

        {/* Right: quick templates & info */}
        <section className="rounded-3xl bg-slate-950/80 border border-slate-800 p-5 shadow-md shadow-black/30 space-y-4 text-xs text-slate-300">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-slate-50">
              Quick templates
            </h3>
            <p className="text-slate-400">
              Tap a template to start a message. You can edit it freely.
            </p>
          </div>

          <div className="space-y-2">
            {quickOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleQuickSelect(opt)}
                className={`w-full text-left rounded-2xl border px-3 py-2 transition-all ${
                  selectedQuick?.id === opt.id
                    ? "bg-sky-500/15 border-sky-400/70 text-sky-50"
                    : "bg-slate-900/80 border-slate-800 text-slate-100 hover:border-sky-400/60"
                }`}
              >
                <div dir="rtl" className="text-[13px] mb-1">
                  {opt.he}
                </div>
                <div className="text-[11px] text-slate-400">{opt.en}</div>
              </button>
            ))}
          </div>

          <div className="pt-2 space-y-2">
            <h4 className="text-sm font-semibold text-slate-50">
              How this will work
            </h4>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Messages here will be sent through an approved IDF communication
                system (not WhatsApp).
              </li>
              <li>
                Madrichot will be able to send you corrections, voice notes, and
                custom tasks.
              </li>
              <li>
                Everything is kept for learning history and progress tracking.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
