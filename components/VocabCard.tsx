import type { VocabItem } from '@/lib/hebrewWords';

type Props = {
  item: VocabItem;
};

export function VocabCard({ item }: Props) {
  return (
    <div className="border border-slate-700 rounded-lg p-4 bg-slate-900">
      {/* Hebrew */}
      <div className="text-2xl font-bold text-right mb-1 text-white">
        {item.hebrew}
      </div>

      {/* Transliteration */}
      <div className="text-sm text-emerald-300 mb-1">
        {item.translit}
      </div>

      {/* English meaning */}
      <div className="text-sm text-slate-200">
        {item.english}
      </div>
    </div>
  );
}
