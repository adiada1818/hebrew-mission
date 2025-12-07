"use client";


import { useMemo, useState } from "react";
import { allVocab } from "@/lib/hebrewWords";


type Vocab = { [key: string]: any };


const vocabList = allVocab as Vocab[];


function getHe(v: Vocab): string {
  return String(v.he ?? v.hebrew ?? v.word ?? "");
}


function getEn(v: Vocab): string {
  return String(v.en ?? v.english ?? v.translation ?? "");
}


function getCategory(v: Vocab): string {
  return String(v.category ?? v.topic ?? "General");
}


export default function DictionaryPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");


  // Build a clean list of words
  const words = useMemo(
    () =>
      vocabList.map((item, index) => ({
        id: item.id ?? index,
        he: getHe(item),
        en: getEn(item),
        category: getCategory(item),
      })),
    []
  );


  const categories = useMemo(() => {
    const set = new Set<string>();
    words.forEach((w) => set.add(w.category));
    return ["All", ...Array.from(set)];
  }, [words]);


  const filteredWords = useMemo(() => {
    const q = search.toLowerCase().trim();
    return words.filter((w) => {
      if (selectedCategory !== "All" && w.category !== selectedCategory) {
        return false;
      }
      if (!q) return true;
      const he = w.he.toLowerCase();
      const en = w.en.toLowerCase();
      return he.includes(q) || en.includes(q);
    });
  }, [search, selectedCategory, words]);


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Dictionary
          </h2>
          <p className="text-sm text-slate-400">
            Search words in Hebrew and English, and filter by topic.
          </p>
        </div>
      </div>


      {/* Search + category row */}
      <section className="rounded-3xl bg-slate-950/80 border border-slate-800 p-5 shadow-md shadow-black/30 space-y-4">
        {/* Search bar */}
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          <div className="flex-1">
            <label className="text-xs text-slate-400 mb-1 block">
              Search (Hebrew or English)
            </label>
            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-500"
                placeholder="Type a word… קפה / coffee / בסיס / base"
              />
            </div>
          </div>
          <div className="md:w-48 text-xs">
            <p className="text-slate-400 mb-1">Words found</p>
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 px-3 py-2 flex items-baseline justify-between">
              <span className="text-lg font-semibold text-slate-50">
                {filteredWords.length}
              </span>
              <span className="text-slate-400 text-[11px]">
                / {words.length} total
              </span>
            </div>
          </div>
        </div>


        {/* Categories */}
        <div className="space-y-2 text-xs">
          <p className="text-slate-400">Filter by category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full border transition-all ${
                    active
                      ? "bg-sky-500 text-slate-950 border-sky-400 shadow-sm"
                      : "bg-slate-900/80 text-slate-200 border-slate-700 hover:border-sky-400"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>


      {/* Word list */}
      <section className="rounded-3xl bg-slate-950/80 border border-slate-800 p-5 shadow-md shadow-black/30">
        <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
          <span>Dictionary results</span>
          <span>Tap on a row to copy the Hebrew word.</span>
        </div>


        <div className="rounded-2xl border border-slate-800 bg-slate-950/90 max-h-[460px] overflow-hidden flex flex-col">
          {/* Header row */}
          <div className="hidden md:grid grid-cols-12 gap-3 px-4 py-2 border-b border-slate-800 text-[11px] text-slate-400">
            <div className="col-span-4 text-right">Hebrew</div>
            <div className="col-span-5">English</div>
            <div className="col-span-3">Category</div>
          </div>


          {/* Scrollable list */}
          <div className="overflow-y-auto">
            {filteredWords.length === 0 && (
              <div className="px-4 py-6 text-xs text-slate-400">
                No words found. Try a different search or category.
              </div>
            )}


            {filteredWords.map((word) => (
              <button
                key={word.id}
                type="button"
                onClick={() => {
                  navigator.clipboard
                    ?.writeText(word.he)
                    .catch(() => void 0);
                }}
                className="w-full border-b border-slate-900/60 last:border-b-0 px-4 py-2.5 text-xs md:grid md:grid-cols-12 md:gap-3 text-left hover:bg-slate-900/80 transition-colors"
              >
                {/* Hebrew */}
                <div
                  dir="rtl"
                  className="md:col-span-4 flex justify-end text-sm text-slate-50"
                >
                  {word.he}
                </div>


                {/* English */}
                <div className="md:col-span-5 text-slate-200 mt-1 md:mt-0">
                  {word.en}
                </div>


                {/* Category */}
                <div className="md:col-span-3 mt-1 md:mt-0">
                  <span className="inline-flex items-center rounded-full bg-slate-900 px-2 py-0.5 border border-slate-700 text-[11px] text-slate-300">
                    {word.category}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>


        <p className="mt-3 text-[11px] text-slate-400">
          Later, dictionary entries can include examples, audio
          pronunciation, and links to tests or games using this word.
        </p>
      </section>
    </div>
  );
}
