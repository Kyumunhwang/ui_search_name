import React, { useMemo, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

type SortOption = '추천순' | '낮은 가격순' | '높은 가격순' | '리뷰 많은순';

const SORT_OPTIONS: SortOption[] = [
  '추천순',
  '낮은 가격순',
  '높은 가격순',
  '리뷰 많은순',
];

const SAMPLE_ITEMS = [
  { id: 1, name: '소프트 립 니트', price: 39000, reviews: 420, score: 95 },
  { id: 2, name: '메리노 울 가디건', price: 79000, reviews: 1280, score: 98 },
  { id: 3, name: '베이직 반팔 티', price: 19900, reviews: 860, score: 89 },
];

export const SortDemo: React.FC = () => {
  const [selected, setSelected] = useState<SortOption>('낮은 가격순');
  const [isOpen, setIsOpen] = useState(true);

  const sortedItems = useMemo(() => {
    const copy = [...SAMPLE_ITEMS];
    switch (selected) {
      case '낮은 가격순':
        return copy.sort((a, b) => a.price - b.price);
      case '높은 가격순':
        return copy.sort((a, b) => b.price - a.price);
      case '리뷰 많은순':
        return copy.sort((a, b) => b.reviews - a.reviews);
      default:
        return copy.sort((a, b) => b.score - a.score);
    }
  }, [selected]);

  return (
    <div className="space-y-4">
      {/* Header Row with Trigger */}
      <div className="flex items-center justify-between">
        <span className="text-[12.5px] font-medium text-[#6B7684]">
          검색 결과 <strong className="text-[#191F28]">{sortedItems.length}</strong>개
        </span>

        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="inline-flex items-center gap-1 rounded-full bg-[#F2F4F6] px-3 py-1.5 text-[12.5px] font-semibold text-[#333D4B] transition hover:bg-[#E5E8EB]"
        >
          {selected}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          role="menu"
          className="rounded-2xl bg-white p-1.5 shadow-lg ring-1 ring-[#E5E8EB]"
        >
          {SORT_OPTIONS.map((option) => {
            const active = option === selected;
            return (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(option);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-[13.5px] transition ${
                    active
                      ? 'bg-[#E8F3FF] font-bold text-[#3182F6]'
                      : 'font-medium text-[#333D4B] hover:bg-[#F9FAFB]'
                  }`}
                >
                  <span>{option}</span>
                  {active && <Check className="h-4 w-4 text-[#3182F6]" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* Sorted Result Preview */}
      <div className="space-y-2 pt-1">
        <div className="text-[11px] font-semibold text-[#8B95A1]">
          정렬 반영 미리보기
        </div>
        {sortedItems.map((item, idx) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl bg-[#F9FAFB] px-3.5 py-2.5 ring-1 ring-[#E5E8EB]/60"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-[12px] font-bold text-[#3182F6] tabular-nums">
                {idx + 1}
              </span>
              <div>
                <p className="text-[13px] font-semibold text-[#191F28]">{item.name}</p>
                <p className="text-[11px] text-[#8B95A1]">
                  리뷰 {item.reviews.toLocaleString()}개
                </p>
              </div>
            </div>
            <span className="text-[13px] font-bold text-[#191F28] tabular-nums">
              {item.price.toLocaleString()}원
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
