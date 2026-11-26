import React, { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';

const TRAVEL_ITEMS = [
  { title: '오사카 3박 4일 자유여행 패키지', meta: '항공+호텔 · 429,000원부터' },
  { title: '간사이 공항, 오사카 시내 리무진 패스', meta: '교통패스 · 즉시 확정' },
  { title: '오사카 맛집 지도 & 도톤보리 투어', meta: '로컬 가이드 · 평점 4.9' },
  { title: '교토 출발 오사카 당일치기 스냅', meta: '액티비티 · 무료 취소' },
  { title: '도쿄 시부야 맛집 & 야경 워킹 투어', meta: '가이드 투어 · 평점 4.8' },
];

const PRESET_QUERIES = ['오사카', '공항', '맛집', '투어'];

const HighlightMatch: React.FC<{ text: string; query: string }> = ({ text, query }) => {
  const clean = query.trim();
  if (!clean) return <>{text}</>;
  const escaped = clean.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));

  return (
    <>
      {parts.map((part, idx) =>
        part.toLowerCase() === clean.toLowerCase() ? (
          <mark
            key={idx}
            className="rounded bg-[#E8F3FF] px-0.5 font-bold text-[#3182F6]"
          >
            {part}
          </mark>
        ) : (
          <React.Fragment key={idx}>{part}</React.Fragment>
        )
      )}
    </>
  );
};

export const HighlightDemo: React.FC = () => {
  const [query, setQuery] = useState('오사카');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TRAVEL_ITEMS;
    return TRAVEL_ITEMS.filter((item) => item.title.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="space-y-3.5">
      {/* Input */}
      <div className="flex items-center gap-2 rounded-2xl bg-[#F2F4F6] px-3.5 py-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#3182F6]">
        <Search className="h-4 w-4 shrink-0 text-[#8B95A1]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="강조할 검색어를 입력하세요"
          className="w-full bg-transparent text-[14px] font-medium text-[#191F28] focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="text-[#8B95A1] hover:text-[#4E5968]"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Presets */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-medium text-[#8B95A1]">키워드:</span>
        {PRESET_QUERIES.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setQuery(preset)}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
              query === preset
                ? 'bg-[#E8F3FF] font-semibold text-[#3182F6]'
                : 'bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]'
            }`}
          >
            {preset}
          </button>
        ))}
      </div>

      {/* Highlighted Results */}
      {results.length > 0 ? (
        <ul className="divide-y divide-[#F2F4F6] rounded-2xl bg-white px-4 ring-1 ring-[#E5E8EB]">
          {results.map((item) => (
            <li key={item.title} className="py-3.5">
              <p className="text-[13.5px] font-medium text-[#191F28]">
                <HighlightMatch text={item.title} query={query} />
              </p>
              <p className="mt-1 text-[11.5px] text-[#8B95A1]">{item.meta}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl bg-[#F9FAFB] py-8 text-center text-[13px] text-[#8B95A1]">
          &lsquo;{query}&rsquo;와 일치하는 문장이 없습니다.
        </div>
      )}
    </div>
  );
};
