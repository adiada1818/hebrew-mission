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

type Question = {
  id: number;
  he: string;
  correctEn: string;
  options: string[];
};

const QUESTIONS_PER_QUIZ = 5;

function generateQuizQuestions(): Question[] {
  if (!vocabList || vocabList.length < 4) return [];

  const indices = Array.from(vocabList.keys());
  const shuffled = [...indices].sort(() => Math.random() - 0.5);
  const chosen = shuffled.slice(0, QUESTIONS_PER_QUIZ);

  return chosen.map((idx, qIndex) => {
    const word = vocabList[idx];
    const correctEn = getEn(word);

    const otherIndices = indices.filter((i) => i !== idx);
    const distractors = [...otherIndices]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((i) => getEn(vocabList[i]));

    const options = [correctEn, ...distractors].sort(
      () => Math.random() - 0.5
    );

    return {
      id: qIndex,
      he: getHe(word),
      correctEn,
      options,
    };
  });
}

export default function DailyQuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<
    { correct: boolean; question: Question; chosen: string }[]
  >([]);
  const [status, setStatus] = useState<"idle" | "checking" | "finished">(
    "idle"
  );

  useEffect(() => {
    const q = generateQuizQuestions();
    setQuestions(q);
  }, []);

  const currentQuestion = useMemo(
    () => questions[currentIndex],
    [questions, currentIndex]
  );

  const score = useMemo(
    () => answers.filter((a) => a.correct).length,
    [answers]
  );

  function resetQuiz() {
    setQuestions(generateQuizQuestions());
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setStatus("idle");
  }

  function handleCheck() {
    if (!currentQuestion || !selectedOption) return;

    const isCorrect = selectedOption === currentQuestion.correctEn;

    const newAnswer = {
      correct: isCorrect,
      question: currentQuestion,
      chosen: selectedOption,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentIndex + 1 >= QUESTIONS_PER_QUIZ) {
      setStatus("finished");
    } else {
      setStatus("checking");
      setTimeout(() => {
        setCurrentIndex((i) => i + 1);
        setSelectedOption(null);
        setStatus("idle");
      }, 600);
    }
  }

  if (!questions.length) {
    return (
      <div className="space-y-6">
        {/* Back + title even if no data */}
        <div className="flex items-center gap-3">
          <Link
            href="/tests"
            className="text-slate-300 text-sm px-3 py-1.5 rounded-xl bg-slate-900/70 border border-slate-700 hover:bg-slate-800 transition"
          >
            ← Tests
          </Link>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-100">
              Daily 5-Question Quiz
            </h2>
            <p className="text-sm text-slate-400">
              Super quick check using words from the dictionary.
            </p>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950/80 border border-slate-800 p-5 text-sm text-slate-300">
          Not enough vocabulary data to build a quiz.
        </div>
      </div>
    );
  }

  const progress =
    ((currentIndex + (status === "finished" ? 1 : 0)) /
      QUESTIONS_PER_QUIZ) *
    100;

  return (
    <div className="space-y-6">
      {/* Back button + header */}
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
              Daily 5-Question Quiz
            </h2>
            <p className="text-sm text-slate-400">
              Answer the questions and see how much you remember from today.
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-400 mt-2 md:mt-0">
          {status === "finished" ? (
            <span>
              Finished quiz • Score{" "}
              <span className="text-slate-100 font-semibold">
                {score}/{QUESTIONS_PER_QUIZ}
              </span>
            </span>
          ) : (
            <span>
              Question{" "}
              <span className="text-slate-100 font-semibold">
                {currentIndex + 1}
              </span>{" "}
              of {QUESTIONS_PER_QUIZ}
            </span>
          )}
        </div>
      </div>

      {/* Main quiz card */}
      <section className="rounded-3xl bg-slate-950/80 border border-slate-800 p-5 shadow-md shadow-black/30 space-y-4">
        {/* Progress bar */}
        <div className="flex items-center justify-between gap-3 text-xs text-slate-400">
          <span>Daily vocab check</span>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-32 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-slate-300">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Question area */}
        {status !== "finished" && currentQuestion && (
          <div className="space-y-4 text-sm">
            <div className="rounded-2xl bg-slate-950/90 border border-slate-800 px-4 py-3 shadow-sm">
              <p className="text-xs text-slate-400 mb-2">
                What is the meaning of:
              </p>
              <p className="text-2xl font-semibold text-slate-50 text-right tracking-tight">
                {currentQuestion.he}
              </p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOption === option;
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
                    key={option}
                    onClick={() => setSelectedOption(option)}
                    disabled={status === "checking"}
                    className={`${base} ${classes}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
              <button
                onClick={handleCheck}
                disabled={!selectedOption || status === "checking"}
                className={`rounded-xl px-4 py-1.5 font-medium shadow-sm transition-all duration-150 ${
                  !selectedOption || status === "checking"
                    ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                    : "bg-sky-500 text-slate-950 hover:bg-sky-400"
                }`}
              >
                Check answer
              </button>
              <button
                onClick={resetQuiz}
                className="rounded-xl px-3 py-1.5 border border-slate-700 text-slate-100 hover:border-sky-400 hover:bg-slate-900 transition-all duration-150"
              >
                New quiz
              </button>
              {status === "checking" && (
                <span className="text-slate-400">
                  Loading next question…
                </span>
              )}
            </div>
          </div>
        )}

        {/* Finished state */}
        {status === "finished" && (
          <div className="space-y-4 text-sm">
            <div className="rounded-2xl bg-slate-950/90 border border-slate-800 px-4 py-3 shadow-sm">
              <p className="text-xs text-slate-400 mb-1">
                Quiz complete
              </p>
              <p className="text-lg font-semibold text-slate-50">
                You got {score} out of {QUESTIONS_PER_QUIZ} correct.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                This is demo logic – later, scores can be saved and shown on the
                Progress page.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-950/90 border border-slate-800 px-4 py-3 space-y-2 text-xs">
              <p className="text-slate-300 font-medium">
                Breakdown by question:
              </p>
              <ul className="space-y-1">
                {answers.map((a, index) => (
                  <li key={index} className="flex flex-col gap-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">
                        Q{index + 1} – {a.question.he}
                      </span>
                      <span
                        className={
                          a.correct ? "text-emerald-400" : "text-rose-400"
                        }
                      >
                        {a.correct ? "Correct" : "Wrong"}
                      </span>
                    </div>
                    {!a.correct && (
                      <div className="text-[11px] text-slate-400">
                        You chose{" "}
                        <span className="text-slate-200">
                          {a.chosen}
                        </span>
                        , correct:{" "}
                        <span className="text-slate-200">
                          {a.question.correctEn}
                        </span>
                        .
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={resetQuiz}
              className="rounded-xl px-4 py-1.5 bg-sky-500 text-slate-950 text-xs font-medium shadow-sm hover:bg-sky-400 transition-all duration-150"
            >
              Take another quiz
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
