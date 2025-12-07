// app/games/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { allVocab } from "@/lib/hebrewWords";

/* ---------- Shared vocab helpers ---------- */

type Vocab = { [key: string]: any };

const vocabList = allVocab as Vocab[];

function getHe(v: Vocab): string {
  return String(v.he ?? v.hebrew ?? v.word ?? "");
}

function getEn(v: Vocab): string {
  return String(v.en ?? v.english ?? v.translation ?? "");
}

/* ---------------- GAME 1 – VOCAB MATCH ---------------- */

const MAX_ROUNDS = 10;

function GameVocabMatch() {
  const [currentWord, setCurrentWord] = useState<Vocab | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [correctEn, setCorrectEn] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);

  useEffect(() => {
    startRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startRound() {
    if (!vocabList || vocabList.length < 4) return;

    setStatus("idle");

    const indices = Array.from(vocabList.keys());
    const pickIndex =
      indices[Math.floor(Math.random() * indices.length)];
    const correctWord = vocabList[pickIndex];
    const en = getEn(correctWord);

    const otherIndices = indices.filter((i) => i !== pickIndex);
    const shuffledOthers = [...otherIndices].sort(
      () => Math.random() - 0.5
    );
    const distractors = shuffledOthers
      .slice(0, 3)
      .map((i) => getEn(vocabList[i]));

    const allOptions = [en, ...distractors].sort(
      () => Math.random() - 0.5
    );

    setCurrentWord(correctWord);
    setCorrectEn(en);
    setOptions(allOptions);
  }

  function handleSelect(option: string) {
    if (!currentWord || status !== "idle") return;

    if (option === correctEn) {
      setStatus("correct");
      setScore((s) => s + 1);
    } else {
      setStatus("wrong");
    }

    setTimeout(() => {
      setRound((r) => r + 1);
      startRound();
    }, 700);
  }

  if (!currentWord) {
    return (
      <div className="text-xs text-slate-400">
        Not enough vocab data to start the game.
      </div>
    );
  }

  const progress =
    (Math.min(round - 1, MAX_ROUNDS) / MAX_ROUNDS) * 100;

  return (
    <div className="space-y-4 text-sm">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-200">
            Round {round}
          </span>
          <div className="h-1.5 w-24 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-sky-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <span>
          Score:{" "}
          <span className="font-semibold text-sky-400">{score}</span>
        </span>
      </div>

      <div className="rounded-2xl bg-slate-950/85 border border-slate-800 px-4 py-3 shadow-sm">
        <p className="text-xs text-slate-400 mb-1">What is the meaning of:</p>
        <p className="text-2xl font-semibold text-slate-50 text-right tracking-tight">
          {getHe(currentWord)}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
        {options.map((option) => {
          const isCorrect = option === correctEn;
          const base =
            "rounded-2xl px-4 py-2 text-sm text-left border shadow-sm transition-all duration-200 ease-out focus:outline-none";

          let classes =
            "bg-slate-800/80 text-slate-50 border-slate-700 hover:bg-slate-700 hover:border-sky-400 hover:shadow-md";

          if (status === "correct") {
            classes = isCorrect
              ? "bg-emerald-400 text-slate-900 border-emerald-300 shadow-md"
              : "bg-slate-800/40 text-slate-300 border-slate-700";
          } else if (status === "wrong") {
            classes = isCorrect
              ? "bg-emerald-400 text-slate-900 border-emerald-300 shadow-md"
              : "bg-slate-800/50 text-slate-300 border-slate-700";
          }

          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`${base} ${classes}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="h-5 text-xs text-slate-400 flex items-center">
        {status === "correct" && (
          <span className="text-emerald-400 font-medium">
            ✓ Nice! On to the next word…
          </span>
        )}
        {status === "wrong" && (
          <span className="text-rose-400 font-medium">
            ✗ Not quite. Watch the correct answer and try again next round.
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------------- GAME 2 – SENTENCE BUILDER ---------------- */

function GameSentenceBuilder() {
  const correctSentence = "אני הולך לבית הספר היום";
  const words = correctSentence.split(" ");

  const [shuffled, setShuffled] = useState<string[]>([]);
  const [chosen, setChosen] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

  useEffect(() => {
    reset();
  }, []);

  function reset() {
    const newShuffled = [...words].sort(() => Math.random() - 0.5);
    setShuffled(newShuffled);
    setChosen([]);
    setStatus("idle");
  }

  function chooseWord(word: string) {
    if (chosen.includes(word)) return;
    setChosen((prev) => [...prev, word]);
  }

  function checkSentence() {
    const built = chosen.join(" ");
    if (built === correctSentence) {
      setStatus("correct");
    } else {
      setStatus("wrong");
    }
  }

  return (
    <div className="space-y-4 text-sm">
      <p className="text-xs text-slate-400">
        Build the sentence in the correct order:
      </p>

      <div className="min-h-[48px] rounded-2xl border border-slate-800 bg-slate-950/85 px-3 py-2 flex flex-wrap gap-1 text-xs items-center">
        {chosen.length === 0 && (
          <span className="text-slate-500">
            Tap words below to add them here…
          </span>
        )}
        {chosen.map((w, index) => (
          <span
            key={`${w}-${index}`}
            className="px-2 py-1 rounded-full bg-sky-500/90 text-slate-900 font-medium shadow-sm"
          >
            {w}
          </span>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-3 py-2 flex flex-wrap gap-1 text-xs">
        {shuffled.map((w, index) => (
          <button
            key={`${w}-${index}`}
            onClick={() => chooseWord(w)}
            className="px-2 py-1 rounded-full bg-slate-800 text-slate-50 border border-slate-700 hover:bg-slate-700 hover:border-sky-400 transition-all duration-150"
          >
            {w}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs">
        <button
          onClick={checkSentence}
          className="rounded-xl px-3 py-1.5 bg-sky-500 text-slate-950 font-medium shadow-sm hover:bg-sky-400 transition-all duration-150"
        >
          Check sentence
        </button>
        <button
          onClick={reset}
          className="rounded-xl px-3 py-1.5 border border-slate-700 text-slate-100 hover:border-sky-400 hover:bg-slate-900 transition-all duration-150"
        >
          Reset
        </button>
        {status === "correct" && (
          <span className="text-emerald-400 font-medium">
            ✓ Perfect sentence!
          </span>
        )}
        {status === "wrong" && (
          <span className="text-rose-400 font-medium">
            ✗ Not yet – adjust the order and try again.
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------------- GAME 3 – STORY MODE (CHOOSE YOUR PATH) ---------------- */

type StoryOption = {
  id: string;
  text: string;
  isCorrect: boolean;
  nextId?: string | null;
  feedback?: string;
};

type StoryNode = {
  id: string;
  title: string;
  situation: string;
  question: string;
  options: StoryOption[];
};

const STORY_NODES: StoryNode[] = [
  {
    id: "intro",
    title: "Morning at Base",
    situation:
      'אתה מגיע לבסיס בבוקר. אתה רואה את המפקדת ליד השער. אתה קצת לחוץ מהעברית.',
    question: "מה אתה אומר לה?",
    options: [
      {
        id: "a",
        text: "שלום, בוקר טוב המפקדת!",
        isCorrect: true,
        nextId: "class",
        feedback: "יפה! פתיחה מנומסת וביטחון.",
      },
      {
        id: "b",
        text: "היי, מה קורה?",
        isCorrect: false,
        nextId: "class",
        feedback: "לא נורא, אבל פחות רשמי למפקדת.",
      },
      {
        id: "c",
        text: "אני עייף.",
        isCorrect: false,
        nextId: "class",
        feedback: "אולי נכון, אבל לא הדבר הראשון שאומרים.",
      },
    ],
  },
  {
    id: "class",
    title: "In Hebrew Class",
    situation:
      "אתה בכיתה עברית. המדריכה שואלת שאלה על המילה 'בסיס' ואתה לא בטוח אם הבנת.",
    question: "איך אתה מבקש הסבר נוסף?",
    options: [
      {
        id: "a",
        text: "אפשר להסביר שוב, בבקשה?",
        isCorrect: true,
        nextId: "dining",
        feedback: "מושלם – מנומס וברור.",
      },
      {
        id: "b",
        text: "מה?! לא הבנתי כלום.",
        isCorrect: false,
        nextId: "dining",
        feedback: "פחות מכבד, אבל גם ביטוי של קושי.",
      },
      {
        id: "c",
        text: "אני לא צריך הסבר.",
        isCorrect: false,
        nextId: "dining",
        feedback: "אולי עדיף לבקש עזרה 😊",
      },
    ],
  },
  {
    id: "dining",
    title: "At the Dining Room",
    situation:
      "אתה וחבר לוחם בתור לאוכל. הוא שואל אם אתה יכול להביא לו שתיה כי הוא מחזיק מגש.",
    question: "מה תגיד?",
    options: [
      {
        id: "a",
        text: "לא, אין לי כוח.",
        isCorrect: false,
        nextId: null,
        feedback: "אפשר, אבל לא הכי צוותי 😉",
      },
      {
        id: "b",
        text: "ברור, מה אתה רוצה לשתות?",
        isCorrect: true,
        nextId: null,
        feedback: "יפה! גם עוזר וגם שואל שאלה בעברית.",
      },
      {
        id: "c",
        text: "אני צריך ללכת עכשיו.",
        isCorrect: false,
        nextId: null,
        feedback: "לפעמים נכון, אבל כאן עדיף לעזור.",
      },
    ],
  },
];

function GameStoryMode() {
  const [currentId, setCurrentId] = useState<string>("intro");
  const [score, setScore] = useState(0);
  const [steps, setSteps] = useState(0);
  const [lastFeedback, setLastFeedback] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const currentNode = STORY_NODES.find((n) => n.id === currentId)!;

  function handleOption(option: StoryOption) {
    if (finished) return;

    setSteps((s) => s + 1);
    if (option.isCorrect) {
      setScore((s) => s + 1);
    }
    setLastFeedback(option.feedback ?? null);

    if (option.nextId) {
      setTimeout(() => {
        setCurrentId(option.nextId as string);
        setLastFeedback(null);
      }, 500);
    } else {
      setFinished(true);
    }
  }

  function resetStory() {
    setCurrentId("intro");
    setScore(0);
    setSteps(0);
    setLastFeedback(null);
    setFinished(false);
  }

  const progress = Math.round((steps / STORY_NODES.length) * 100);

  return (
    <div className="space-y-4 text-sm">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>
          Scene:{" "}
          <span className="font-medium text-slate-100">
            {currentNode.title}
          </span>
        </span>
        <span>
          Score:{" "}
          <span className="text-emerald-400 font-semibold">
            {score}/{STORY_NODES.length}
          </span>
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
        <span>Story progress</span>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-32 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 to-fuchsia-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-slate-300">{progress}%</span>
        </div>
      </div>

      <div className="rounded-2xl bg-slate-950/90 border border-slate-800 px-4 py-3 space-y-2 shadow-sm">
        <p dir="rtl" className="text-xs text-slate-300 leading-relaxed">
          {currentNode.situation}
        </p>
        <p dir="rtl" className="text-sm font-medium text-slate-100 mt-1">
          {currentNode.question}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2 mt-1">
        {currentNode.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleOption(opt)}
            disabled={finished}
            className="rounded-2xl px-4 py-2 text-sm text-left border shadow-sm bg-slate-800/80 text-slate-50 border-slate-700 hover:bg-slate-700 hover:border-sky-400 hover:shadow-md transition-all duration-150"
          >
            {opt.text}
          </button>
        ))}
      </div>

      <div className="h-5 text-xs text-slate-400 flex items-center">
        {lastFeedback && (
          <span className="text-slate-200">{lastFeedback}</span>
        )}
      </div>

      {finished && (
        <div className="rounded-2xl bg-slate-950/90 border border-slate-800 px-4 py-3 text-xs text-slate-300 space-y-1">
          <p>
            Story finished! You chose{" "}
            <span className="font-semibold text-emerald-300">
              {score}
            </span>{" "}
            good social / Hebrew responses out of{" "}
            {STORY_NODES.length}.
          </p>
          <p>
            Madrichot can later see this and talk with you about real
            situations on base.
          </p>
          <button
            onClick={resetStory}
            className="mt-2 rounded-xl px-3 py-1.5 bg-sky-500 text-slate-950 text-xs font-medium shadow-sm hover:bg-sky-400 transition-all duration-150"
          >
            Play again
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------- GAME 4 – SURVIVAL MODE (ENDLESS STREAK) ---------------- */

function GameSurvivalMode() {
  const [currentWord, setCurrentWord] = useState<Vocab | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [correctEn, setCorrectEn] = useState<string>("");
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [status, setStatus] = useState<
    "idle" | "playing" | "correct" | "wrong" | "gameOver"
  >("idle");

  function startGame() {
    setStreak(0);
    setStatus("playing");
    nextRound();
  }

  function nextRound() {
    if (!vocabList || vocabList.length < 4) return;

    const indices = Array.from(vocabList.keys());
    const pickIndex =
      indices[Math.floor(Math.random() * indices.length)];
    const word = vocabList[pickIndex];
    const en = getEn(word);

    const otherIndices = indices.filter((i) => i !== pickIndex);
    const distractors = [...otherIndices]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((i) => getEn(vocabList[i]));

    const allOptions = [en, ...distractors].sort(
      () => Math.random() - 0.5
    );

    setCurrentWord(word);
    setCorrectEn(en);
    setOptions(allOptions);
  }

  function handleSelect(option: string) {
    if (status !== "playing" && status !== "correct") return;
    if (!currentWord) return;

    if (option === correctEn) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBestStreak((prev) => Math.max(prev, newStreak));
      setStatus("correct");
      setTimeout(() => {
        setStatus("playing");
        nextRound();
      }, 350);
    } else {
      setStatus("wrong");
      setTimeout(() => {
        setStatus("gameOver");
      }, 400);
    }
  }

  return (
    <div className="space-y-4 text-sm">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span>
            Current streak:{" "}
            <span className="font-semibold text-emerald-400">
              {streak}
            </span>
          </span>
          <span className="hidden sm:inline">
            Best:{" "}
            <span className="font-semibold text-sky-400">
              {bestStreak}
            </span>
          </span>
        </div>
        <span className="text-[11px]">
          One mistake = round over. Good luck.
        </span>
      </div>

      {status === "idle" && (
        <div className="rounded-2xl bg-slate-950/90 border border-slate-800 px-4 py-4 text-xs text-slate-300 space-y-2">
          <p>
            Survival mode: words will keep coming faster and faster
            (later). For now, see how long you can survive without a
            mistake.
          </p>
          <button
            onClick={startGame}
            className="mt-2 rounded-xl px-4 py-1.5 bg-sky-500 text-slate-950 text-xs font-medium shadow-sm hover:bg-sky-400 transition-all duration-150"
          >
            Start survival
          </button>
        </div>
      )}

      {(status === "playing" || status === "correct" || status === "wrong") &&
        currentWord && (
          <>
            <div className="rounded-2xl bg-slate-950/90 border border-slate-800 px-4 py-3 shadow-sm">
              <p className="text-xs text-slate-400 mb-2">
                Tap the correct translation:
              </p>
              <p className="text-2xl font-semibold text-slate-50 text-right tracking-tight">
                {getHe(currentWord)}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className="rounded-2xl px-4 py-2 text-sm text-left border shadow-sm bg-slate-800/80 text-slate-50 border-slate-700 hover:bg-slate-700 hover:border-sky-400 hover:shadow-md transition-all duration-150"
                >
                  {opt}
                </button>
              ))}
            </div>

            <div className="h-5 text-xs text-slate-400 flex items-center">
              {status === "correct" && (
                <span className="text-emerald-400 font-medium">
                  ✓ Keep going!
                </span>
              )}
              {status === "wrong" && (
                <span className="text-rose-400 font-medium">
                  ✗ That was the wrong one…
                </span>
              )}
            </div>
          </>
        )}

      {status === "gameOver" && (
        <div className="rounded-2xl bg-slate-950/90 border border-slate-800 px-4 py-4 text-xs text-slate-300 space-y-2">
          <p>
            Round over! Your streak this time:{" "}
            <span className="font-semibold text-emerald-300">
              {streak}
            </span>
            .
          </p>
          <p>
            Best streak so far:{" "}
            <span className="font-semibold text-sky-300">
              {bestStreak}
            </span>
            .
          </p>
          <button
            onClick={startGame}
            className="mt-2 rounded-xl px-4 py-1.5 bg-sky-500 text-slate-950 text-xs font-medium shadow-sm hover:bg-sky-400 transition-all duration-150"
          >
            Play again
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------- PAGE SHELL (LBP ADVENTURE STYLE) ---------------- */

type SelectedGame = "vocab" | "sentence" | "story" | "survival";

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<SelectedGame>("vocab");

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center relative overflow-hidden">
      {/* LBP-style background glow just for this page */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.95),_transparent_70%)]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-8">
        {/* Header row like an “Adventure” world select */}
        <div className="flex items-center justify-between px-2 md:px-4">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-slate-300">
              Adventure
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-50 drop-shadow">
              Game Modes
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-md">
              Pick a mode to turn today&apos;s Hebrew into fast, focused mini-games.
            </p>
          </div>

          <Link
            href="/today"
            className="rounded-2xl bg-slate-900/80 px-4 py-2 text-xs md:text-sm font-semibold text-slate-100 border border-slate-700 hover:border-sky-400/80 hover:bg-slate-900 transition shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
          >
            ← Back to hub
          </Link>
        </div>

        {/* 2x2 grid of game cards (LBP-styled) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Game 1 – Vocab Match */}
          <section
            className={`rounded-3xl border p-5 shadow-md shadow-black/40 cursor-pointer transition-all duration-200 ${
              selectedGame === "vocab"
                ? "bg-slate-950/95 border-sky-500/60"
                : "bg-slate-950/80 border-slate-800 hover:border-sky-400/60 hover:-translate-y-0.5"
            }`}
            onClick={() => setSelectedGame("vocab")}
          >
            <div className="flex items-center justify-between mb-3 gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-50">
                  Game 1 – Vocabulary Match
                </h3>
                <p className="text-xs text-slate-400">
                  Match Hebrew words with their English meanings.
                </p>
              </div>
              <span className="rounded-full bg-sky-500/90 text-[10px] uppercase tracking-wide px-3 py-1 text-slate-950 font-semibold shadow-sm">
                Speed
              </span>
            </div>

            <div className="mt-4 rounded-2xl bg-slate-900/80 border border-slate-800 p-4 min-h-[220px]">
              {selectedGame === "vocab" && <GameVocabMatch />}
            </div>
          </section>

          {/* Game 2 – Sentence Builder */}
          <section
            className={`rounded-3xl border p-5 shadow-md shadow-black/40 cursor-pointer transition-all duration-200 ${
              selectedGame === "sentence"
                ? "bg-slate-950/95 border-fuchsia-500/60"
                : "bg-slate-950/80 border-slate-800 hover:border-fuchsia-400/60 hover:-translate-y-0.5"
            }`}
            onClick={() => setSelectedGame("sentence")}
          >
            <div className="flex items-center justify-between mb-3 gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-50">
                  Game 2 – Sentence Builder
                </h3>
                <p className="text-xs text-slate-400">
                  Arrange words into a correct Hebrew sentence.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-slate-900/80 border border-slate-800 p-4 min-h-[220px]">
              {selectedGame === "sentence" && <GameSentenceBuilder />}
            </div>
          </section>

          {/* Game 3 – Story Mode */}
          <section
            className={`rounded-3xl border p-5 shadow-md shadow-black/40 cursor-pointer transition-all duration-200 ${
              selectedGame === "story"
                ? "bg-slate-950/95 border-emerald-500/60"
                : "bg-slate-950/80 border-slate-800 hover:border-emerald-400/60 hover:-translate-y-0.5"
            }`}
            onClick={() => setSelectedGame("story")}
          >
            <div className="flex items-center justify-between mb-3 gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-50">
                  Game 3 – Story Mode
                </h3>
                <p className="text-xs text-slate-400">
                  Choose what to say in real-life Hebrew situations on base.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-slate-900/80 border border-slate-800 p-4 min-h-[220px]">
              {selectedGame === "story" && <GameStoryMode />}
            </div>
          </section>

          {/* Game 4 – Survival Mode */}
          <section
            className={`rounded-3xl border p-5 shadow-md shadow-black/40 cursor-pointer transition-all duration-200 ${
              selectedGame === "survival"
                ? "bg-slate-950/95 border-amber-500/60"
                : "bg-slate-950/80 border-slate-800 hover:border-amber-400/60 hover:-translate-y-0.5"
            }`}
            onClick={() => setSelectedGame("survival")}
          >
            <div className="flex items-center justify-between mb-3 gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-50">
                  Game 4 – Survival Mode
                </h3>
                <p className="text-xs text-slate-400">
                  Endless vocab. One mistake and the round is over.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-slate-900/80 border border-slate-800 p-4 min-h-[220px]">
              {selectedGame === "survival" && <GameSurvivalMode />}
            </div>
          </section>
        </div>

        {/* Bottom tips strip */}
        <section className="rounded-3xl bg-slate-950/80 border border-slate-800 p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300 shadow-sm">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-slate-50">
              How to use games
            </h4>
            <p>
              5–10 minutes of games after each lesson are more effective than
              one long session at the end of the week.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-slate-50">
              Suggested flow
            </h4>
            <p>
              1) Today hub, 2) Game 1 or 4 for vocab, 3) Game 2 for grammar,
              4) Game 3 for real situations.
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-slate-50">
              For madrichot
            </h4>
            <p>
              Later, results can be sent to a dashboard: who plays, streaks,
              and where they struggle.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
