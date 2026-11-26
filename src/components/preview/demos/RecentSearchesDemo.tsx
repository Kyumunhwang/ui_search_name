import React, { useState } from 'react';
import { RotateCcw, Search, X } from 'lucide-react';

const INITIAL_RECENTS = ['제주 숙소', '가습기', '경량 패딩', '머플러', '오사카 항공권'];

export const RecentSearchesDemo: React.FC = () => {
  const [query, setQuery] = useState('');
  const [recents, setRecents] = useState<string[]>(INITIAL_RECENTS);
  const [lastSearched, setLastSearched] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim();
    if (!clean) return;
    setRecents((prev) => [clean, ...prev.filter((item) => item !== clean)].slice(0, 8));
    setLastSearched(clean);
    setQuery('');
  };

  const handleRemove = (target: string) => {
    setRecents((prev) => prev.filter((item) => item !== target));
  };

  const handleSelectChip = (term: string) => {
    setQuery(term);
    setLastSearched(term);
  };

  return (
    <div className="space-y-5">
      {/* Search Bar */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 rounded-2xl bg-[#F2F4F6] px-3.5 py-3 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-[#3182F6]"
      >
        <Search className="h-4 w-4 shrink-0 text-[#8B95A1]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="새 검색어 입력 후 Enter"
          className="w-full bg-transparent text-[14px] font-medium text-[#191F28] placeholder:text-[#8B95A1] focus:outline-none"
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
      </form>

      {/* Recent Searches Section */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[13px] font-bold text-[#333D4B]">최근 검색어</h3>
          {recents.length > 0 ? (
            <button
              type="button"
              onClick={() => setRecents([])}
              className="text-[12px] font-medium text-[#8B95A1] transition hover:text-[#4E5968]"
            >
              전체 삭제
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setRecents(INITIAL_RECENTS)}
              className="inline-flex items-center gap-1 text-[12px] font-medium text-[#3182F6] hover:text-[#1B64DA]"
            >
              <RotateCcw className="h-3 w-3" />
              샘플 복원
            </button>
          )}
        </div>

        {recents.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {recents.map((item) => (
              <div
                key={item}
                className="inline-flex items-center gap-1 rounded-full bg-[#F2F4F6] py-1.5 pl-3.5 pr-2 text-[13px] font-medium text-[#333D4B] transition hover:bg-[#E5E8EB]"
              >
                <button
                  type="button"
                  onClick={() => handleSelectChip(item)}
                  className="leading-none"
                >
                  {item}
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(item)}
                  aria-label={`${item} 삭제`}
                  className="flex h-4 w-4 items-center justify-center rounded-full text-[#8B95A1] transition hover:bg-white hover:text-[#191F28]"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-[#F9FAFB] py-8 text-center text-[13px] text-[#8B95A1]">
            최근 검색 내역이 모두 삭제되었습니다.
          </div>
        )}
      </div>

      {lastSearched && (
        <div className="rounded-xl bg-[#E8F3FF] px-3.5 py-2.5 text-[12px] text-[#191F28]">
          <strong className="text-[#3182F6]">&ldquo;{lastSearched}&rdquo;</strong> 검색 기록에 반영됨
        </div>
      )}
    </div>
  );
};
