import React, { useMemo, useState } from 'react';
import { RotateCcw, Search, SearchX, X } from 'lucide-react';

const CATALOG = [
  { id: 1, title: '캐시미어 블렌드 니트 가디건', price: '59,000원' },
  { id: 2, title: '베이직 라운드 니트 가디건', price: '42,000원' },
  { id: 3, title: '경량 덕다운 숏패딩', price: '89,000원' },
];

const TYPO_SUGGESTIONS: Record<string, string> = {
  니트가디간: '니트 가디건',
  '니트 가디간': '니트 가디건',
  페딩: '패딩',
};

export const NoResultsDemo: React.FC = () => {
  const [query, setQuery] = useState('니트가디간');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATALOG;
    return CATALOG.filter((item) => item.title.toLowerCase().includes(q));
  }, [query]);

  const suggestion = TYPO_SUGGESTIONS[query.trim()] ?? '니트 가디건';

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex items-center gap-2 rounded-2xl bg-[#F2F4F6] px-3.5 py-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#3182F6]">
        <Search className="h-4 w-4 shrink-0 text-[#8B95A1]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어 입력"
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

      {/* Quick Toggle */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-medium text-[#8B95A1]">테스트:</span>
        <button
          type="button"
          onClick={() => setQuery('니트가디간')}
          className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
            query === '니트가디간'
              ? 'bg-[#E8F3FF] font-semibold text-[#3182F6]'
              : 'bg-[#F2F4F6] text-[#4E5968]'
          }`}
        >
          오타 (니트가디간)
        </button>
        <button
          type="button"
          onClick={() => setQuery('페딩')}
          className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
            query === '페딩'
              ? 'bg-[#E8F3FF] font-semibold text-[#3182F6]'
              : 'bg-[#F2F4F6] text-[#4E5968]'
          }`}
        >
          오타 (페딩)
        </button>
      </div>

      {/* Empty State or Matched Results */}
      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-5 py-12 text-center ring-1 ring-[#E5E8EB]">
          <div className="mb-3.5 flex h-12 w-12 items-center justify-center rounded-full bg-[#F2F4F6] text-[#8B95A1]">
            <SearchX className="h-6 w-6" />
          </div>

          <p className="text-[15px] font-bold text-[#191F28]">검색 결과가 없어요</p>

          <p className="mt-2 text-[13px] text-[#6B7684]">
            혹시{' '}
            <button
              type="button"
              onClick={() => setQuery(suggestion)}
              className="font-bold text-[#3182F6] underline decoration-[#3182F6]/30 underline-offset-4 hover:text-[#1B64DA]"
            >
              {suggestion}
            </button>{' '}
            찾으세요?
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-[#3182F6]">
              교정된 검색어로 {results.length}건 찾았어요
            </span>
            <button
              type="button"
              onClick={() => setQuery('니트가디간')}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-[#8B95A1] hover:text-[#191F28]"
            >
              <RotateCcw className="h-3 w-3" />
              오타 상태로
            </button>
          </div>

          <div className="space-y-2">
            {results.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 ring-1 ring-[#E5E8EB]"
              >
                <span className="text-[13.5px] font-semibold text-[#191F28]">
                  {item.title}
                </span>
                <span className="text-[13px] font-bold text-[#3182F6]">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
