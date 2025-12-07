"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { allVocab } from "@/lib/hebrewWords";

type Vocab = { [key: string]: any };

const vocabList = allVocab as Vocab[];

function getHe(v: Vocab): string {
  return String(v.he ?? v.hebrew ?? v.word ?? "");
}

function getEn(v: Vocab): string {
  return String(v.en ?? v.english ?? v.translation ?? "");
}

type SectionId = "vocab" | "sentences" | "reading";

type PlacementQuestion = {
  id: string;
  sectionId: SectionId;
  prompt: string;
  options: string[];
  correct: string;
  meta?: {
    heWord?: string;
    type?: "vocab" | "sentence" | "reading";
    passage?: string;
  };
};

type PlacementSection = {
  id: SectionId;
  title: string;
  description: string;
  questions: PlacementQuestion[];
};

type AnswerRecord = {
  questionId: string;
  sectionId: SectionId;
  chosen: string;
  correct: boolean;
};

const VOCAB_QUESTIONS_COUNT = 8;

/* ---------- Generate vocab questions from dictionary ---------- */

function generateVocabQuestions(): PlacementQuestion[] {
  if (!vocabList || vocabList.length < 4) return [];

  const indices = Array.from(vocabList.keys());
  const shuffled = [...indices].sort(() => Math.random() - 0.5);
  const chosen = shuffled.slice(0, VOCAB_QUESTIONS_COUNT);

  return chosen.map((idx, qIndex) => {
    const word = vocabList[idx];
    const he = getHe(word);
    const en = getEn(word);

    const otherIndices = indices.filter((i) => i !== idx);
    const distractors = [...otherIndices]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((i) => getEn(vocabList[i]));

    const options = [en, ...distractors].sort(
      () => Math.random() - 0.5
    );

    return {
      id: `vocab-${qIndex}`,
      sectionId: "vocab",
      prompt: "Choose the correct translation for this word:",
      options,
      correct: en,
      meta: {
        heWord: he,
        type: "vocab",
      },
    };
  });
}

/* ---------- Static sentence questions ---------- */

const sentenceQuestionsStatic: PlacementQuestion[] = [
  {
    id: "sent-1",
    sectionId: "sentences",
    prompt: "בחרו את המשפט העברי הנכון:",
    options: [
      "אני הולך בית הספר כל יום.",
      "אני הולך לבית הספר כל יום.",
      "אני הולך לבית הספר כל יום אתמול.",
      "אני בית הספר הולך כל יום.",
    ],
    correct: "אני הולך לבית הספר כל יום.",
    meta: { type: "sentence" },
  },
  {
    id: "sent-2",
    sectionId: "sentences",
    prompt: "בחרו את המשפט שהזמן בו מתאים להיום:",
    options: [
      "אני אלך לקורס מחר.",
      "אני הלכתי לקורס אתמול.",
      "אני הולך לקורס היום.",
      "אני הולך לקורס לפני שנה.",
    ],
    correct: "אני הולך לקורס היום.",
    meta: { type: "sentence" },
  },
  {
    id: "sent-3",
    sectionId: "sentences",
    prompt: "איזה משפט מנומס יותר למפקד?",
    options: [
      "אני לא בא.",
      "אני לא יכול לבוא, סליחה.",
      "אין מצב שאני בא.",
      "לא רוצה לבוא.",
    ],
    correct: "אני לא יכול לבוא, סליחה.",
    meta: { type: "sentence" },
  },
];

/* ---------- Static reading questions ---------- */

const readingQuestionsStatic: PlacementQuestion[] = [
  {
    id: "read-1",
    sectionId: "reading",
    prompt: "מה הרעיון המרכזי של הקטע?",
    options: [
      "החייל לא רוצה ללמוד.",
      "החייל צריך ללמוד לבד בבית.",
      "הקורס עוזר לחייל להשתפר בעברית.",
      "המפקדת לא מרשה ללמוד בזמן הקורס.",
    ],
    correct: "הקורס עוזר לחייל להשתפר בעברית.",
    meta: {
      type: "reading",
      passage:
        "הקורס העברי החדש במתפ\"ש נבנה במיוחד לחיילים ממדינות שונות. " +
        "במהלך השבוע הם לומדים מילים חדשות, קוראים טקסטים קצרים ומדברים אחד עם השני בעברית. " +
        "המטרה היא לעזור לכל חייל להרגיש יותר בטוח בשיחה עם מפקדים וחברים ביחידה.",
    },
  },
];

export default function PlacementTestPage() {
  const [vocabQuestions, setVocabQuestions] = useState<PlacementQuestion[]>([]);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    null
  );
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [status, setStatus] = useState<
    "idle" | "moving" | "finished"
  >("idle");

  // Generate vocab questions on mount
  useEffect(() => {
    setVocabQuestions(generateVocabQuestions());
  }, []);

  // Build sections (depends on vocabQuestions)
  const sections: PlacementSection[] = useMemo(() => {
    const list: PlacementSection[] = [];

    if (vocabQuestions.length > 0) {
      list.push({
        id: "vocab",
        title: "Vocabulary",
        description: "Translate common Hebrew words.",
        questions: vocabQuestions,
      });
    }

    list.push(
      {
        id: "sentences",
        title: "Sentences",
        description: "Choose the correct and natural Hebrew sentence.",
        questions: sentenceQuestionsStatic,
      },
      {
        id: "reading",
        title: "Reading",
        description: "Read a short text and answer a question.",
        questions: readingQuestionsStatic,
      }
    );

    return list;
  }, [vocabQuestions]);

  const totalQuestions = useMemo(
    () =>
      sections.reduce((sum, sec) => sum + sec.questions.length, 0),
    [sections]
  );

  const currentSection = sections[sectionIndex];
  const currentQuestion =
    currentSection?.questions[questionIndex] ?? null;

  const answeredCount = answers.length;
  const correctCount = answers.filter((a) => a.correct).length;

  const progress =
    totalQuestions > 0
      ? Math.round((answeredCount / totalQuestions) * 100)
      : 0;

  function handleCheck() {
    if (!currentQuestion || !selectedOption) return;

    const isCorrect = selectedOption === currentQuestion.correct;

    const newAnswer: AnswerRecord = {
      questionId: currentQuestion.id,
      sectionId: currentSection.id,
      chosen: selectedOption,
      correct: isCorrect,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    setSelectedOption(null);

    const isLastQuestionInSection =
      questionIndex + 1 >= currentSection.questions.length;
    const isLastSection = sectionIndex + 1 >= sections.length;

    if (isLastQuestionInSection && isLastSection) {
      setStatus("finished");
      return;
    }

    setStatus("moving");

    setTimeout(() => {
      if (isLastQuestionInSection) {
        setSectionIndex((idx) => idx + 1);
        setQuestionIndex(0);
      } else {
        setQuestionIndex((idx) => idx + 1);
      }
      setStatus("idle");
    }, 400);
  }

  function resetTest() {
    setVocabQuestions(generateVocabQuestions());
    setSectionIndex(0);
    setQuestionIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setStatus("idle");
  }

  // Level suggestion
  const levelSuggestion = useMemo(() => {
    if (!totalQuestions) return null;
    const pct = (correctCount / totalQuestions) * 100;

    if (pct < 40) {
      return {
        level: "Alef (Beginner)",
        description:
          "הבסיס עדיין נבנה. כדי להתחזק – הרבה חזרה על מילים פשוטות, קריאה קצרה ודיבור יומיומי.",
      };
    }
    if (pct < 70) {
      return {
        level: "Bet (Intermediate)",
        description:
          "יש בסיס טוב. אפשר לעבוד על דיוק במשפטים, הרחבת אוצר מילים וטקסטים קצת יותר ארוכים.",
      };
    }
    return {
      level: "Gimel (Advanced)",
      description:
          "רמה גבוהה. אפשר להתמקד בשפה צבאית, טקסטים ארוכים ודיוק גבוה בדיבור וכתיבה.",
    };
  }, [correctCount, totalQuestions]);

  // No vocab + no static sections → fallback
  if (!currentSection || !currentQuestion) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href="/tests"
            className="text-slate-300 text-sm px-3 py-1.5 rounded-xl bg-slate-900/70 border border-slate-700 hover:bg-slate-800 transition"
          >
            ← Tests
          </Link>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-100">
              Placement Test
            </h2>
            <p className="text-sm text-slate-400">
              We couldn&apos;t build the test. Try again later.
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950/80 border border-slate-800 p-5 text-sm text-slate-300">
          Not enough data to load questions.
        </div>
      </div>
    );
  }

  const isFinished = status === "finished";

  return (
    <div className="space-y-6">
      {/* Back + header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/tests"
            className="text-slate-300 text-sm px-3 py-1.5 rounded-xl bg-slate-900/70 border border-slate-700 hover:bg-slate-800 transition"
          >
            ← Tests
          </Link>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-100">
              Placement Test
            </h2>
            <p className="text-sm text-slate-400">
              Multi-part test: vocabulary, sentences, and a short reading
              passage.
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-400 mt-2 md:mt-0">
          {isFinished ? (
            <span>
              Finished • Correct{" "}
              <span className="text-slate-100 font-semibold">
                {correctCount}/{totalQuestions}
              </span>
            </span>
          ) : (
            <span>
              Question{" "}
              <span className="text-slate-100 font-semibold">
                {answeredCount + 1}
              </span>{" "}
              of {totalQuestions}
            </span>
          )}
        </div>
      </div>

      {/* Section pills + progress */}
      <section className="rounded-3xl bg-slate-950/80 border border-slate-800 p-4 shadow-md shadow-black/30 space-y-3 text-xs text-slate-300">
        <div className="flex flex-wrap gap-2">
          {sections.map((sec, idx) => {
            const active = idx === sectionIndex;
            const completed =
              answers.filter((a) => a.sectionId === sec.id).length ===
              sec.questions.length;

            return (
              <div
                key={sec.id}
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 border ${
                  active
                    ? "bg-sky-500/15 border-sky-500/70 text-sky-100"
                    : completed
                    ? "bg-emerald-500/10 border-emerald-500/60 text-emerald-100"
                    : "bg-slate-900/80 border-slate-700 text-slate-300"
                }`}
              >
                <span className="text-[11px] font-medium">
                  {sec.title}
                </span>
                {completed && (
                  <span className="text-[10px]">✓</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-slate-400 text-[11px]">
            {currentSection.description}
          </span>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-32 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-slate-300 text-[11px]">
              {progress}%
            </span>
          </div>
        </div>
      </section>

      {/* Main card: either test in progress or summary */}
      {!isFinished && (
        <section className="rounded-3xl bg-slate-950/80 border border-slate-800 p-5 shadow-md shadow-black/30 space-y-4 text-sm">
          {/* Reading passage if exists */}
          {currentQuestion.meta?.type === "reading" &&
            currentQuestion.meta.passage && (
              <div className="rounded-2xl bg-slate-950/90 border border-slate-800 px-4 py-3 text-xs text-slate-200 leading-relaxed">
                <p dir="rtl">{currentQuestion.meta.passage}</p>
              </div>
            )}

          {/* Vocab Hebrew word */}
          {currentQuestion.meta?.type === "vocab" &&
            currentQuestion.meta.heWord && (
              <div className="rounded-2xl bg-slate-950/90 border border-slate-800 px-4 py-3 shadow-sm">
                <p className="text-xs text-slate-400 mb-2">
                  {currentQuestion.prompt}
                </p>
                <p className="text-2xl font-semibold text-slate-50 text-right tracking-tight">
                  {currentQuestion.meta.heWord}
                </p>
              </div>
            )}

          {/* General question prompt (for non-vocab or extra clarity) */}
          {currentQuestion.meta?.type !== "vocab" && (
            <div className="rounded-2xl bg-slate-950/90 border border-slate-800 px-4 py-3 shadow-sm">
              <p className="text-sm text-slate-50">
                {currentQuestion.prompt}
              </p>
            </div>
          )}

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
            {currentQuestion.options.map((opt) => {
              const isSelected = selectedOption === opt;

              const base =
                "rounded-2xl px-4 py-2 text-sm text-left border shadow-sm transition-all duration-200 ease-out focus:outline-none";

              let classes =
                "bg-slate-800/80 text-slate-50 border-slate-700 hover:bg-slate-700 hover:border-sky-400 hover:shadow-md";

              if (isSelected) {
                classes =
                  "bg-sky-500 text-slate-950 border-sky-400 shadow-md";
              }

              return (
                <button
                  key={opt}
                  onClick={() => setSelectedOption(opt)}
                  disabled={status === "moving"}
                  className={`${base} ${classes}`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
            <button
              onClick={handleCheck}
              disabled={!selectedOption || status === "moving"}
              className={`rounded-xl px-4 py-1.5 font-medium shadow-sm transition-all duration-150 ${
                !selectedOption || status === "moving"
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-sky-500 text-slate-950 hover:bg-sky-400"
              }`}
            >
              {sectionIndex === sections.length - 1 &&
              questionIndex ===
                currentSection.questions.length - 1
                ? "Finish test"
                : "Next"}
            </button>
            <button
              onClick={resetTest}
              className="rounded-xl px-3 py-1.5 border border-slate-700 text-slate-100 hover:border-sky-400 hover:bg-slate-900 transition-all duration-150"
            >
              Restart
            </button>
          </div>
        </section>
      )}

      {/* Finished summary */}
      {isFinished && (
        <section className="rounded-3xl bg-slate-950/80 border border-slate-800 p-5 shadow-md shadow-black/30 space-y-4 text-sm">
          <div className="rounded-2xl bg-slate-950/90 border border-slate-800 px-4 py-3 shadow-sm space-y-1">
            <p className="text-xs text-slate-400 mb-1">
              Placement test complete
            </p>
            <p className="text-lg font-semibold text-slate-50">
              You got {correctCount} out of {totalQuestions} correct.
            </p>
            {levelSuggestion && (
              <>
                <p className="text-xs text-slate-400 mt-2">
                  Suggested level:
                </p>
                <p className="text-sm font-semibold text-slate-100">
                  {levelSuggestion.level}
                </p>
                <p className="text-xs text-slate-300 mt-1">
                  {levelSuggestion.description}
                </p>
              </>
            )}
          </div>

          <div className="rounded-2xl bg-slate-950/90 border border-slate-800 px-4 py-3 space-y-2 text-xs">
            <p className="text-slate-300 font-medium">
              Breakdown by section:
            </p>
            <ul className="space-y-1">
              {sections.map((sec) => {
                const secAnswers = answers.filter(
                  (a) => a.sectionId === sec.id
                );
                const secCorrect = secAnswers.filter(
                  (a) => a.correct
                ).length;

                return (
                  <li
                    key={sec.id}
                    className="flex items-center justify-between"
                  >
                    <span className="text-slate-400">{sec.title}</span>
                    <span className="text-slate-100">
                      {secCorrect}/{sec.questions.length}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            onClick={resetTest}
            className="rounded-xl px-4 py-1.5 bg-sky-500 text-slate-950 text-xs font-medium shadow-sm hover:bg-sky-400 transition-all duration-150"
          >
            Take test again
          </button>
        </section>
      )}
    </div>
  );
}
