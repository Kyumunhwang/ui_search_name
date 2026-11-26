import React, { useMemo, useState } from 'react';
import { ArrowUpLeft, Search, X } from 'lucide-react';

const KEYWORD_DB = [
  '니트 가디건',
  '니트 원피스',
  '니트 조끼',
  '니트 머플러',
  '니트 맨투맨',
  '캐시미어 니트',
  '패딩 점퍼',
  '경량 패딩',
  '울 코트',
  '가습기 필터',
];

const QUICK_PREFIXES = ['니트', '패딩', '가습'];

export const AutocompleteDemo: React.FC = () => {
  const [query, setQuery] = useState('니트');
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return KEYWORD_DB.filter((item) => item.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  const renderHighlighted = (text: string, keyword: string) => {
    const clean = keyword.trim();
    if (!clean) return text;
    const idx = text.toLowerCase().indexOf(clean.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="font-bold text-[#3182F6]">
          {text.slice(idx, idx + clean.length)}
        </span>
        {text.slice(idx + clean.length)}
      </>
    );
  };

  const handleSelect = (item: string) => {
    setQuery(item);
    setSelectedKeyword(item);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[activeIndex]);
    }
  };

  return (
    <div className="space-y-3">
      {/* Search Box */}
      <div className="flex items-center gap-2.5 rounded-2xl bg-[#F2F4F6] px-3.5 py-3 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-[#3182F6]">
        <Search className="h-4 w-4 shrink-0 text-[#8B95A1]" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedKeyword(null);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          placeholder="니트, 패딩 등을 입력해보세요"
          className="w-full bg-transparent text-[14px] font-medium text-[#191F28] placeholder:text-[#8B95A1] focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setSelectedKeyword(null);
            }}
            aria-label="검색어 지우기"
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D1D6DB] text-white hover:bg-[#8B95A1]"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Quick Test Chips */}
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] font-medium text-[#8B95A1]">예시:</span>
        {QUICK_PREFIXES.map((prefix) => (
          <button
            key={prefix}
            type="button"
            onClick={() => {
              setQuery(prefix);
              setSelectedKeyword(null);
              setActiveIndex(-1);
            }}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
              query === prefix
                ? 'bg-[#E8F3FF] font-semibold text-[#3182F6]'
                : 'bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]'
            }`}
          >
            {prefix}
          </button>
        ))}
      </div>

      {/* Suggestions List */}
      {suggestions.length > 0 ? (
        <ul
          role="listbox"
          className="divide-y divide-[#F2F4F6] overflow-hidden rounded-2xl bg-white ring-1 ring-[#E5E8EB]"
        >
          {suggestions.map((item, idx) => (
            <li key={item}>
              <button
                type="button"
                onClick={() => handleSelect(item)}
                className={`flex w-full items-center justify-between px-3.5 py-3 text-left text-[14px] transition ${
                  idx === activeIndex ? 'bg-[#E8F3FF]' : 'hover:bg-[#F9FAFB]'
                }`}
              >
                <span className="flex items-center gap-2.5 text-[#191F28]">
                  <Search className="h-3.5 w-3.5 text-[#B0B8C1]" />
                  <span>{renderHighlighted(item, query)}</span>
                </span>
                <ArrowUpLeft className="h-4 w-4 text-[#B0B8C1]" />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl bg-[#F9FAFB] px-4 py-8 text-center text-[13px] text-[#8B95A1]">
          {query.trim()
            ? `'${query}'에 대한 자동완성 추천어가 없습니다.`
            : '키워드를 입력하면 실시간 추천어가 표시됩니다.'}
        </div>
      )}

      {selectedKeyword && (
        <div className="rounded-xl bg-[#E8F3FF] px-3.5 py-2.5 text-[12px] font-medium text-[#191F28]">
          선택됨: <strong className="text-[#3182F6]">{selectedKeyword}</strong> 검색 결과로 이동
        </div>
      )}
    </div>
  );
};
