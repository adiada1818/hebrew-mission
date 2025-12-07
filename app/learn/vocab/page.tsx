import { coreVocab } from "@/lib/hebrewWords";
import { VocabCard } from "@/components/VocabCard";

export default function VocabPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Core Vocabulary</h2>
      <p className="text-sm text-slate-300">
        Start with these core words. Aim to recognize them instantly in
        reading, listening, and speaking.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {coreVocab.map((item) => (
          <VocabCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
