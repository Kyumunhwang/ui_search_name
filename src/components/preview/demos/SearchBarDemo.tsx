import React, { useRef, useState } from 'react';
import { Delete, Search, X } from 'lucide-react';

const KEYBOARD_ROWS = [
  ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ'],
  ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'],
  ['ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ'],
];

const QUICK_PHRASES = ['패딩 역사', '가습기 추천', '제주 숙소'];

export const SearchBarDemo: React.FC = () => {
  const [query, setQuery] = useState('패딩 역사');
  const [isFocused, setIsFocused] = useState(true);
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    setSubmittedQuery(query.trim());
    setIsFocused(false);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setQuery('');
    setSubmittedQuery(null);
    setIsFocused(true);
    inputRef.current?.focus();
  };

  const handleVirtualKey = (char: string) => {
    setIsFocused(true);
    setSubmittedQuery(null);
    setQuery((prev) => prev + char);
  };

  const handleBackspace = () => {
    setIsFocused(true);
    setQuery((prev) => prev.slice(0, -1));
  };

  return (
    <div className="flex h-full flex-col justify-between gap-4">
      <div className="space-y-4">
        {/* Search Input */}
        <form onSubmit={handleSubmit}>
          <div
            onClick={() => {
              setIsFocused(true);
              inputRef.current?.focus();
            }}
            className={`flex items-center gap-2.5 rounded-2xl px-3.5 py-3 transition-all duration-200 ${
              isFocused
                ? 'bg-white ring-2 ring-[#3182F6] shadow-sm'
                : 'bg-[#F2F4F6] ring-1 ring-transparent hover:bg-[#EAECEF]'
            }`}
          >
            <Search
              className={`h-4 w-4 shrink-0 transition-colors ${
                isFocused ? 'text-[#3182F6]' : 'text-[#8B95A1]'
              }`}
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSubmittedQuery(null);
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="검색어를 입력하세요"
              aria-label="검색어 입력"
              className="w-full bg-transparent text-[14px] font-medium text-[#191F28] placeholder:text-[#8B95A1] focus:outline-none"
            />
            {query.length > 0 && (
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleClear}
                aria-label="검색어 지우기"
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D1D6DB] text-white transition hover:bg-[#8B95A1]"
              >
                <X className="h-3 w-3" strokeWidth={2.5} />
              </button>
            )}
          </div>
        </form>

        {/* Status Feedback */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-medium text-[#8B95A1]">빠른 입력:</span>
          {QUICK_PHRASES.map((phrase) => (
            <button
              key={phrase}
              type="button"
              onClick={() => {
                setQuery(phrase);
                setSubmittedQuery(null);
                setIsFocused(true);
              }}
              className="rounded-full bg-[#F2F4F6] px-2.5 py-1 text-[11px] font-medium text-[#4E5968] transition hover:bg-[#E8F3FF] hover:text-[#3182F6]"
            >
              {phrase}
            </button>
          ))}
        </div>

        {submittedQuery ? (
          <div className="rounded-2xl bg-[#E8F3FF] p-3.5 text-[13px] text-[#191F28]">
            <span className="font-bold text-[#3182F6]">&ldquo;{submittedQuery}&rdquo;</span> 검색을
            실행했습니다.
          </div>
        ) : (
          <div className="rounded-2xl bg-[#F9FAFB] p-3.5 text-[12px] text-[#6B7684]">
            {isFocused
              ? '포커스 활성화 상태: #3182F6 아웃라인과 가상 키보드가 표시됩니다.'
              : '입력창을 탭하면 포커스 상태가 활성화됩니다.'}
          </div>
        )}
      </div>

      {/* Simulated Mobile Keyboard (matches 01 reference visual) */}
      <div
        className={`-mx-4 -mb-2 rounded-b-2xl bg-[#EAECEF] px-2 pt-2.5 pb-3 transition-all duration-300 ${
          isFocused ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-45'
        }`}
      >
        <div className="space-y-1.5">
          {KEYBOARD_ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1">
              {row.map((keyChar) => (
                <button
                  key={keyChar}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleVirtualKey(keyChar)}
                  className="flex h-8 min-w-[26px] flex-1 items-center justify-center rounded-md bg-white text-[12px] font-medium text-[#191F28] shadow-[0_1px_0_rgba(0,0,0,0.12)] active:scale-95 active:bg-[#F2F4F6]"
                >
                  {keyChar}
                </button>
              ))}
              {rowIndex === 2 && (
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleBackspace}
                  aria-label="지우기"
                  className="flex h-8 w-10 items-center justify-center rounded-md bg-[#D1D6DB] text-[#333D4B] shadow-[0_1px_0_rgba(0,0,0,0.12)] active:scale-95"
                >
                  <Delete className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ))}
          <div className="flex gap-1.5 pt-0.5">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleVirtualKey(' ')}
              className="flex h-8 flex-1 items-center justify-center rounded-md bg-white text-[11px] font-medium text-[#6B7684] shadow-[0_1px_0_rgba(0,0,0,0.12)] active:bg-[#F2F4F6]"
            >
              간격
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSubmit()}
              className="flex h-8 w-20 items-center justify-center rounded-md bg-[#3182F6] text-[12px] font-bold text-white shadow-sm active:bg-[#1B64DA]"
            >
              검색
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
