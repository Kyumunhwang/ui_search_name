export type PatternId =
  | 'search-bar'
  | 'autocomplete'
  | 'recent-searches'
  | 'trending'
  | 'filter'
  | 'sort'
  | 'highlight'
  | 'no-results'
  | 'scope-tabs';

export interface SearchPatternMeta {
  id: PatternId;
  number: string;
  titleKo: string;
  titleEn: string;
  summary: string;
  whenToUse: string;
  keyDetails: string[];
  uxTip: {
    doText: string;
    dontText: string;
  };
  reactCode: string;
  vanillaCode: string;
}

export const SEARCH_PATTERNS: SearchPatternMeta[] = [
  {
    id: 'search-bar',
    number: '01',
    titleKo: '검색창',
    titleEn: 'Search bar',
    summary:
      '포커스 상태를 명확히 구분하는 블루 아웃라인(#3182F6), 즉각적인 초기화(X) 버튼, 모바일 진입 시 자동 키보드 호출을 결합한 기본 검색 입력 패턴입니다.',
    whenToUse:
      '앱/웹 최상단 헤더나 탐색 전용 화면에 진입했을 때 사용자가 망설임 없이 즉시 타이핑을 시작하도록 유도할 때 사용합니다.',
    keyDetails: [
      '포커스 시 #F4F5F7 배경에서 화이트(#FFFFFF) + 2px #3182F6 링으로 상태 전환',
      '1자 이상 입력 시 우측 원형 지우기(X) 버튼 즉시 노출',
      '모바일 검색 진입 시 가상 키보드 자동 활성화 및 엔터(검색) 키 피드백 제공',
    ],
    uxTip: {
      doText: '플레이스홀더에 구체적인 검색 예시(예: "상품명, 브랜드, 카테고리 검색")를 짧게 제시하세요.',
      dontText: '포커스 여부와 무관하게 테두리 변화가 없거나 지우기 버튼이 너무 작아 오탭을 유발하게 두지 마세요.',
    },
    reactCode: `import React, { useRef, useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({
  placeholder = '어떤 상품을 찾으시나요?',
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch?.(query.trim());
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={\`flex items-center gap-2.5 rounded-2xl px-4 py-3 transition-all duration-200 \${
          isFocused
            ? 'bg-white ring-2 ring-[#3182F6] shadow-sm'
            : 'bg-[#F2F4F6] ring-1 ring-transparent hover:bg-[#EAECEF]'
        }\`}
      >
        <Search
          className={\`h-5 w-5 shrink-0 transition-colors \${
            isFocused ? 'text-[#3182F6]' : 'text-[#8B95A1]'
          }\`}
        />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          aria-label="검색어 입력"
          className="w-full bg-transparent text-[15px] font-medium text-[#191F28] placeholder:text-[#8B95A1] focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {query.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="검색어 지우기"
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D1D6DB] text-white transition hover:bg-[#8B95A1]"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>
        )}
      </div>
    </form>
  );
}`,
    vanillaCode: `<!-- HTML -->
<form class="toss-search-form" onsubmit="handleSearch(event)">
  <div class="toss-search-box" id="searchBox">
    <svg class="toss-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </svg>
    <input
      id="searchInput"
      type="text"
      placeholder="어떤 상품을 찾으시나요?"
      aria-label="검색어 입력"
      autocomplete="off"
    />
    <button type="button" id="clearBtn" class="toss-clear-btn" aria-label="검색어 지우기" hidden>
      ✕
    </button>
  </div>
</form>

<style>
  .toss-search-box {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    border-radius: 16px;
    background: #F2F4F6;
    border: 2px solid transparent;
    transition: all 0.2s ease;
    font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif;
  }
  .toss-search-box:focus-within {
    background: #FFFFFF;
    border-color: #3182F6;
    box-shadow: 0 4px 14px rgba(49, 130, 246, 0.12);
  }
  .toss-search-icon {
    color: #8B95A1;
    flex-shrink: 0;
    transition: color 0.2s ease;
  }
  .toss-search-box:focus-within .toss-search-icon {
    color: #3182F6;
  }
  .toss-search-box input {
    width: 100%;
    border: none;
    background: transparent;
    font-size: 15px;
    font-weight: 500;
    color: #191F28;
    outline: none;
  }
  .toss-search-box input::placeholder {
    color: #8B95A1;
  }
  .toss-clear-btn {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: none;
    background: #D1D6DB;
    color: #FFFFFF;
    font-size: 11px;
    cursor: pointer;
    flex-shrink: 0;
  }
</style>

<script>
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearBtn');

  input.addEventListener('input', () => {
    clearBtn.hidden = input.value.length === 0;
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.hidden = true;
    input.focus();
  });

  function handleSearch(e) {
    e.preventDefault();
    if (input.value.trim()) {
      console.log('검색 실행:', input.value.trim());
    }
  }
</script>`,
  },
  {
    id: 'autocomplete',
    number: '02',
    titleKo: '자동완성',
    titleEn: 'Autocomplete',
    summary:
      '사용자가 입력한 키워드와 일치하는 추천 검색어를 실시간으로 필터링하고, 일치하는 접두사(Prefix)를 프라이머리 블루(#3182F6)로 강조해 인지 속도를 높입니다.',
    whenToUse:
      '상품명, 카테고리, 브랜드처럼 정형화된 검색어가 많아 오타를 줄이고 빠르게 의도를 완성시켜야 할 때 적합합니다.',
    keyDetails: [
      '입력어와 매칭되는 텍스트 부분을 Bold + #3182F6 컬러로 즉시 하이라이트',
      '키보드 위/아래 화살표 탐색 및 Enter 선택 지원(ARIA listbox 준수)',
      '모바일 기준 한 손으로 탭하기 편한 최소 44px 이상의 행 높이 유지',
    ],
    uxTip: {
      doText: '추천 목록은 5~8개 내외로 제한하여 화면이 복잡해지지 않게 구성하세요.',
      dontText: '사용자가 입력 중인 텍스트와 무관한 광고성 키워드를 최상단에 섞지 마세요.',
    },
    reactCode: `import React, { useMemo, useState } from 'react';
import { ArrowUpLeft, Search, X } from 'lucide-react';

const SUGGESTIONS = [
  '니트 가디건',
  '니트 원피스',
  '니트 조끼',
  '니트 머플러',
  '니트 맨투맨',
  '캐시미어 니트',
];

export function AutocompleteSearch() {
  const [query, setQuery] = useState('니트');
  const [activeIndex, setActiveIndex] = useState(-1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SUGGESTIONS.filter((item) => item.toLowerCase().includes(q));
  }, [query]);

  const highlightMatch = (text: string, keyword: string) => {
    const q = keyword.trim();
    if (!q) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <span className="font-bold text-[#3182F6]">
          {text.slice(idx, idx + q.length)}
        </span>
        {text.slice(idx + q.length)}
      </>
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      setQuery(filtered[activeIndex]);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center gap-2.5 rounded-2xl bg-[#F2F4F6] px-4 py-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#3182F6]">
        <Search className="h-5 w-5 text-[#8B95A1]" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력하세요"
          className="w-full bg-transparent text-[15px] font-medium text-[#191F28] focus:outline-none"
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

      {filtered.length > 0 && (
        <ul role="listbox" className="divide-y divide-[#F2F4F6] rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-[#E5E8EB]">
          {filtered.map((item, idx) => (
            <li key={item}>
              <button
                type="button"
                onClick={() => setQuery(item)}
                className={\`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[15px] transition \${
                  idx === activeIndex ? 'bg-[#E8F3FF]' : 'hover:bg-[#F9FAFB]'
                }\`}
              >
                <span className="text-[#191F28]">{highlightMatch(item, query)}</span>
                <ArrowUpLeft className="h-4 w-4 text-[#B0B8C1]" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}`,
    vanillaCode: `<!-- HTML -->
<div class="ac-wrap">
  <div class="ac-input-box">
    <span>🔍</span>
    <input id="acInput" type="text" value="니트" placeholder="검색어를 입력하세요" />
  </div>
  <ul id="acList" class="ac-list"></ul>
</div>

<style>
  .ac-wrap { font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif; }
  .ac-input-box {
    display: flex; align-items: center; gap: 8px;
    padding: 12px 16px; border-radius: 16px; background: #F2F4F6;
  }
  .ac-input-box:focus-within { background: #FFF; box-shadow: 0 0 0 2px #3182F6; }
  .ac-input-box input {
    border: none; background: transparent; width: 100%; font-size: 15px; outline: none; color: #191F28;
  }
  .ac-list {
    list-style: none; margin: 8px 0 0; padding: 6px;
    background: #FFF; border-radius: 16px; border: 1px solid #E5E8EB;
  }
  .ac-item {
    padding: 10px 12px; border-radius: 10px; font-size: 15px; cursor: pointer; color: #191F28;
  }
  .ac-item:hover { background: #F9FAFB; }
  .ac-match { color: #3182F6; font-weight: 700; }
</style>

<script>
  const keywords = ['니트 가디건', '니트 원피스', '니트 조끼', '니트 머플러'];
  const acInput = document.getElementById('acInput');
  const acList = document.getElementById('acList');

  function renderSuggestions() {
    const q = acInput.value.trim();
    acList.innerHTML = '';
    if (!q) { acList.style.display = 'none'; return; }

    const matches = keywords.filter(k => k.includes(q));
    acList.style.display = matches.length ? 'block' : 'none';

    matches.forEach(item => {
      const li = document.createElement('li');
      li.className = 'ac-item';
      li.innerHTML = item.replace(q, \`<span class="ac-match">\${q}</span>\`);
      li.onclick = () => { acInput.value = item; renderSuggestions(); };
      acList.appendChild(li);
    });
  }

  acInput.addEventListener('input', renderSuggestions);
  renderSuggestions();
</script>`,
  },
  {
    id: 'recent-searches',
    number: '03',
    titleKo: '최근 검색어',
    titleEn: 'Recent searches',
    summary:
      '사용자의 과거 검색 이력을 둥근 칩(Pill) 형태로 가로 나열하고, 개별 삭제(×)와 전체 삭제 액션을 제공하여 반복 탐색 비용을 줄입니다.',
    whenToUse:
      '커머스, 여행, 콘텐츠 플랫폼에서 사용자가 앞서 찾았던 상품을 다시 비교하거나 이어서 탐색하는 빈도가 높을 때 사용합니다.',
    keyDetails: [
      '칩(Chip) 내부의 키워드 탭 시 즉시 재검색, 우측 × 버튼 탭 시 개별 항목만 삭제',
      '우측 상단 또는 하단에 "전체 삭제" 액션을 배치하여 프라이버시 제어권 보장',
      '모든 기록 삭제 시 빈 상태(Empty State) 메시지로 전환하여 화면 붕괴 방지',
    ],
    uxTip: {
      doText: '최근 검색어는 최신순으로 정렬하고 중복 입력 시 기존 항목을 최상단으로 올리세요.',
      dontText: '"전체 삭제" 버튼을 너무 눈에 띄는 프라이머리 컬러로 강조해 실수로 누르게 만들지 마세요.',
    },
    reactCode: `import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

export function RecentSearches() {
  const [query, setQuery] = useState('');
  const [recents, setRecents] = useState<string[]>([
    '제주 숙소',
    '가습기',
    '경량 패딩',
    '캐시미어 머플러',
  ]);

  const addRecent = (term: string) => {
    const clean = term.trim();
    if (!clean) return;
    setRecents((prev) => [clean, ...prev.filter((item) => item !== clean)].slice(0, 8));
  };

  const removeOne = (term: string) => {
    setRecents((prev) => prev.filter((item) => item !== term));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRecent(query);
    setQuery('');
  };

  return (
    <div className="w-full space-y-4">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 rounded-2xl bg-[#F2F4F6] px-4 py-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#3182F6]"
      >
        <Search className="h-5 w-5 text-[#8B95A1]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색어 입력 후 Enter"
          className="w-full bg-transparent text-[15px] text-[#191F28] placeholder:text-[#8B95A1] focus:outline-none"
        />
      </form>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-[13px] font-semibold text-[#4E5968]">최근 검색어</h3>
          {recents.length > 0 && (
            <button
              type="button"
              onClick={() => setRecents([])}
              className="text-[12px] font-medium text-[#8B95A1] hover:text-[#4E5968]"
            >
              전체 삭제
            </button>
          )}
        </div>

        {recents.length === 0 ? (
          <p className="py-6 text-center text-[13px] text-[#8B95A1]">
            최근 검색 내역이 없습니다.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {recents.map((item) => (
              <div
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#F2F4F6] py-1.5 pl-3.5 pr-2 text-[13px] font-medium text-[#333D4B] transition hover:bg-[#E5E8EB]"
              >
                <button type="button" onClick={() => setQuery(item)}>
                  {item}
                </button>
                <button
                  type="button"
                  onClick={() => removeOne(item)}
                  aria-label={\`\${item} 삭제\`}
                  className="rounded-full p-0.5 text-[#8B95A1] hover:bg-white hover:text-[#191F28]"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}`,
    vanillaCode: `<!-- HTML -->
<div class="recent-wrap">
  <div class="recent-header">
    <span>최근 검색어</span>
    <button id="clearAllBtn" type="button">전체 삭제</button>
  </div>
  <div id="chipContainer" class="chip-list"></div>
</div>

<style>
  .recent-wrap { font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif; }
  .recent-header {
    display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;
    font-size: 13px; font-weight: 600; color: #4E5968;
  }
  .recent-header button {
    border: none; background: none; color: #8B95A1; font-size: 12px; cursor: pointer;
  }
  .chip-list { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 10px 6px 14px; border-radius: 999px;
    background: #F2F4F6; color: #333D4B; font-size: 13px; font-weight: 500;
  }
  .chip button {
    border: none; background: transparent; color: #8B95A1; cursor: pointer; font-size: 12px;
  }
</style>

<script>
  let items = ['제주 숙소', '가습기', '경량 패딩'];
  const container = document.getElementById('chipContainer');
  const clearAllBtn = document.getElementById('clearAllBtn');

  function renderChips() {
    if (items.length === 0) {
      container.innerHTML = '<p style="color:#8B95A1;font-size:13px;">최근 검색 내역이 없습니다.</p>';
      clearAllBtn.style.display = 'none';
      return;
    }
    clearAllBtn.style.display = 'inline';
    container.innerHTML = items.map((text, idx) => \`
      <span class="chip">
        <span>\${text}</span>
        <button type="button" onclick="removeChip(\${idx})">✕</button>
      </span>
    \`).join('');
  }

  window.removeChip = (idx) => {
    items.splice(idx, 1);
    renderChips();
  };

  clearAllBtn.onclick = () => {
    items = [];
    renderChips();
  };

  renderChips();
</script>`,
  },
  {
    id: 'trending',
    number: '04',
    titleKo: '인기 검색어',
    titleEn: 'Trending',
    summary:
      '"지금 많이 찾는" 실시간 트렌드 키워드를 순위 번호와 등락 인디케이터(▲/▼/NEW)로 시각화하여 빈 검색창의 탐색 동기를 부여합니다.',
    whenToUse:
      '사용자가 뚜렷한 목적어 없이 앱에 진입했을 때(Zero-query state) 시즈널 상품이나 화제성 키워드로 탐색을 유도할 때 효과적입니다.',
    keyDetails: [
      '1~3위 상위 순위 숫자는 #3182F6 블루 컬러로 시각적 위계 강조',
      '순위 상승(▲ 레드), 하락(▼ 블루), 신규(NEW) 배지로 실시간성 전달',
      '업데이트 기준 시각(예: 14:00 기준)을 함께 표기하여 데이터 신뢰도 확보',
    ],
    uxTip: {
      doText: '계절성·실시간성이 드러나는 1~10위 리스트로 구성하고 터치 시 즉시 검색 결과로 연결하세요.',
      dontText: '순위 변동 표시를 너무 화려한 아이콘이나 깜빡이는 애니메이션으로 과장하지 마세요.',
    },
    reactCode: `import React from 'react';

interface TrendingItem {
  rank: number;
  keyword: string;
  trend: 'up' | 'down' | 'same' | 'new';
}

const TRENDING_ITEMS: TrendingItem[] = [
  { rank: 1, keyword: '패딩', trend: 'same' },
  { rank: 2, keyword: '가습기', trend: 'up' },
  { rank: 3, keyword: '핫팩', trend: 'same' },
  { rank: 4, keyword: '머플러', trend: 'down' },
  { rank: 5, keyword: '전기장판', trend: 'new' },
];

export function TrendingKeywords({
  onSelect,
}: {
  onSelect?: (keyword: string) => void;
}) {
  return (
    <section className="w-full rounded-2xl bg-white p-4 ring-1 ring-[#E5E8EB]">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[14px] font-bold text-[#191F28]">지금 많이 찾는</h3>
        <span className="text-[11px] font-medium text-[#8B95A1]">14:00 기준</span>
      </div>

      <ol className="space-y-1">
        {TRENDING_ITEMS.map((item) => (
          <li key={item.rank}>
            <button
              type="button"
              onClick={() => onSelect?.(item.keyword)}
              className="flex w-full items-center justify-between rounded-xl px-2 py-2.5 text-left transition hover:bg-[#F2F4F6]"
            >
              <div className="flex items-center gap-3">
                <span
                  className={\`w-4 text-center text-[14px] font-bold tabular-nums \${
                    item.rank <= 3 ? 'text-[#3182F6]' : 'text-[#8B95A1]'
                  }\`}
                >
                  {item.rank}
                </span>
                <span className="text-[14px] font-medium text-[#191F28]">
                  {item.keyword}
                </span>
              </div>

              {item.trend === 'up' && (
                <span className="text-[10px] font-bold text-[#F04452]">▲</span>
              )}
              {item.trend === 'down' && (
                <span className="text-[10px] font-bold text-[#3182F6]">▼</span>
              )}
              {item.trend === 'new' && (
                <span className="rounded bg-[#E8F3FF] px-1.5 py-0.5 text-[10px] font-bold text-[#3182F6]">
                  NEW
                </span>
              )}
              {item.trend === 'same' && (
                <span className="text-[11px] text-[#B0B8C1]">-</span>
              )}
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}`,
    vanillaCode: `<!-- HTML -->
<section class="trending-card">
  <div class="trending-head">
    <h3>지금 많이 찾는</h3>
    <span>14:00 기준</span>
  </div>
  <ol id="trendingList" class="trending-list"></ol>
</section>

<style>
  .trending-card {
    padding: 16px; border-radius: 16px; background: #FFF; border: 1px solid #E5E8EB;
    font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif;
  }
  .trending-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
  .trending-head h3 { margin: 0; font-size: 14px; font-weight: 700; color: #191F28; }
  .trending-head span { font-size: 11px; color: #8B95A1; }
  .trending-list { list-style: none; margin: 0; padding: 0; }
  .trending-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 9px 8px; border-radius: 10px; cursor: pointer;
  }
  .trending-row:hover { background: #F2F4F6; }
  .rank { width: 18px; font-weight: 700; font-size: 14px; color: #8B95A1; display: inline-block; }
  .rank.top { color: #3182F6; }
  .kw { font-size: 14px; color: #191F28; font-weight: 500; }
  .up { color: #F04452; font-size: 10px; font-weight: 700; }
</style>

<script>
  const data = [
    { rank: 1, kw: '패딩', trend: '-' },
    { rank: 2, kw: '가습기', trend: '▲' },
    { rank: 3, kw: '핫팩', trend: '-' },
    { rank: 4, kw: '머플러', trend: '-' }
  ];
  document.getElementById('trendingList').innerHTML = data.map(d => \`
    <li class="trending-row">
      <div>
        <span class="rank \${d.rank <= 3 ? 'top' : ''}">\${d.rank}</span>
        <span class="kw">\${d.kw}</span>
      </div>
      <span class="\${d.trend === '▲' ? 'up' : ''}">\${d.trend}</span>
    </li>
  \`).join('');
</script>`,
  },
  {
    id: 'filter',
    number: '05',
    titleKo: '필터',
    titleEn: 'Filter',
    summary:
      '상단 필터 칩(가격, 브랜드, 무료배송)과 하단 바텀시트/드롭다운 내 양방향 범위 슬라이더를 결합하여 대량의 검색 결과를 정밀하게 좁혀줍니다.',
    whenToUse:
      '가격대, 브랜드, 배송 조건 등 다중 속성을 조합해 원하는 조건에 부합하는 결과만 추려내야 하는 검색 결과 페이지에서 사용합니다.',
    keyDetails: [
      '선택된 필터 칩은 #E8F3FF 배경 + #3182F6 텍스트로 활성화 상태 즉각 피드백',
      '양방향 범위 슬라이더 조작 시 실시간으로 선택 구간 텍스트("3만 원 ~ 12만 원") 갱신',
      '적용될 예상 결과 건수를 버튼("N개 상품 보기")에 표시해 빈 결과 예방',
    ],
    uxTip: {
      doText: '필터 초기화 버튼을 바텀시트 내에 항상 배치해 한 번에 조건을 되돌릴 수 있게 하세요.',
      dontText: '슬라이더를 움직일 때마다 전체 페이지를 깜빡이며 새로고침하지 마세요.',
    },
    reactCode: `import React, { useState } from 'react';
import { ChevronDown, RotateCcw } from 'lucide-react';

export function PriceFilterSheet() {
  const [minPrice, setMinPrice] = useState(3);
  const [maxPrice, setMaxPrice] = useState(12);
  const [freeShipping, setFreeShipping] = useState(false);

  const minPercent = (minPrice / 20) * 100;
  const maxPercent = (maxPrice / 20) * 100;

  return (
    <div className="w-full space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-full bg-[#E8F3FF] px-3 py-1.5 text-[13px] font-semibold text-[#3182F6]"
        >
          가격 {minPrice}~{maxPrice}만 <ChevronDown className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setFreeShipping((v) => !v)}
          className={\`rounded-full px-3 py-1.5 text-[13px] font-medium transition \${
            freeShipping
              ? 'bg-[#E8F3FF] text-[#3182F6] font-semibold'
              : 'bg-[#F2F4F6] text-[#4E5968]'
          }\`}
        >
          무료배송
        </button>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-[#E5E8EB]">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[13px] font-semibold text-[#4E5968]">가격 범위</span>
          <button
            type="button"
            onClick={() => {
              setMinPrice(3);
              setMaxPrice(12);
              setFreeShipping(false);
            }}
            className="inline-flex items-center gap-1 text-[12px] text-[#8B95A1] hover:text-[#191F28]"
          >
            <RotateCcw className="h-3 w-3" /> 초기화
          </button>
        </div>

        <div className="relative h-6 flex items-center">
          <div className="h-1.5 w-full rounded-full bg-[#E5E8EB]" />
          <div
            className="absolute h-1.5 rounded-full bg-[#3182F6]"
            style={{ left: \`\${minPercent}%\`, right: \`\${100 - maxPercent}%\` }}
          />
          <input
            type="range"
            min={0}
            max={20}
            value={minPrice}
            onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 1))}
            className="pointer-events-none absolute w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#3182F6] [&::-webkit-slider-thumb]:bg-white"
          />
          <input
            type="range"
            min={0}
            max={20}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 1))}
            className="pointer-events-none absolute w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#3182F6] [&::-webkit-slider-thumb]:bg-white"
          />
        </div>

        <p className="mt-3 text-[15px] font-bold text-[#191F28]">
          {minPrice}만 원 ~ {maxPrice}만 원
        </p>
      </div>
    </div>
  );
}`,
    vanillaCode: `<!-- HTML -->
<div class="filter-sheet">
  <div class="filter-title">가격</div>
  <div class="range-wrap">
    <div class="track"></div>
    <div id="rangeFill" class="fill"></div>
    <input id="minRange" type="range" min="0" max="20" value="3" />
    <input id="maxRange" type="range" min="0" max="20" value="12" />
  </div>
  <div id="priceLabel" class="price-label">3만 원 ~ 12만 원</div>
</div>

<style>
  .filter-sheet {
    padding: 16px; border-radius: 16px; background: #FFF; border: 1px solid #E5E8EB;
    font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif;
  }
  .filter-title { font-size: 13px; font-weight: 600; color: #4E5968; margin-bottom: 14px; }
  .range-wrap { position: relative; height: 24px; display: flex; align-items: center; }
  .track { width: 100%; height: 6px; border-radius: 999px; background: #E5E8EB; }
  .fill { position: absolute; height: 6px; border-radius: 999px; background: #3182F6; }
  .range-wrap input {
    position: absolute; width: 100%; appearance: none; background: transparent; pointer-events: none;
  }
  .range-wrap input::-webkit-slider-thumb {
    appearance: none; pointer-events: auto; width: 20px; height: 20px;
    border-radius: 50%; background: #FFF; border: 3px solid #3182F6; cursor: pointer;
  }
  .price-label { margin-top: 12px; font-size: 15px; font-weight: 700; color: #191F28; }
</style>

<script>
  const minR = document.getElementById('minRange');
  const maxR = document.getElementById('maxRange');
  const fill = document.getElementById('rangeFill');
  const label = document.getElementById('priceLabel');

  function syncRange() {
    if (+minR.value >= +maxR.value) minR.value = +maxR.value - 1;
    fill.style.left = (+minR.value / 20) * 100 + '%';
    fill.style.right = (100 - (+maxR.value / 20) * 100) + '%';
    label.textContent = \`\${minR.value}만 원 ~ \${maxR.value}만 원\`;
  }

  minR.addEventListener('input', syncRange);
  maxR.addEventListener('input', syncRange);
  syncRange();
</script>`,
  },
  {
    id: 'sort',
    number: '06',
    titleKo: '정렬',
    titleEn: 'Sort',
    summary:
      '우측 상단 트리거 버튼으로 정렬 메뉴를 열고, 현재 선택된 기준(예: 낮은 가격순)을 소프트 블루(#E8F3FF) 하이라이트로 명확히 표시합니다.',
    whenToUse:
      '검색 결과의 총량을 유지한 채 사용자의 우선순위(가격, 리뷰 수, 추천순, 최신순)에 따라 노출 순서만 즉시 재배열할 때 사용합니다.',
    keyDetails: [
      '트리거 라벨에 현재 활성화된 정렬 기준명을 그대로 노출("낮은 가격순 ⌄")',
      '선택된 옵션은 #E8F3FF 배경과 #3182F6 볼드 텍스트(또는 체크 아이콘)로 강조',
      '옵션 선택 즉시 메뉴가 닫히고 리스트가 자연스럽게 재정렬됨',
    ],
    uxTip: {
      doText: '정렬 옵션은 3~5개의 상호 배타적인 기준으로 단순하게 유지하세요.',
      dontText: '트리거 라벨을 "정렬"처럼 추상적으로 두어 현재 어떤 기준으로 정렬되었는지 숨기지 마세요.',
    },
    reactCode: `import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

const SORT_OPTIONS = ['추천순', '낮은 가격순', '높은 가격순', '리뷰 많은순'] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

export function SortDropdown({
  onChange,
}: {
  onChange?: (option: SortOption) => void;
}) {
  const [selected, setSelected] = useState<SortOption>('낮은 가격순');
  const [open, setOpen] = useState(true);

  const handleSelect = (option: SortOption) => {
    setSelected(option);
    setOpen(false);
    onChange?.(option);
  };

  return (
    <div className="relative inline-block w-full text-right">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 rounded-full bg-[#F2F4F6] px-3 py-1.5 text-[13px] font-semibold text-[#333D4B] transition hover:bg-[#E5E8EB]"
      >
        {selected}
        <ChevronDown
          className={\`h-3.5 w-3.5 transition-transform \${open ? 'rotate-180' : ''}\`}
        />
      </button>

      {open && (
        <ul
          role="menu"
          className="mt-2 w-full rounded-2xl bg-white p-1.5 text-left shadow-lg ring-1 ring-[#E5E8EB]"
        >
          {SORT_OPTIONS.map((option) => {
            const isSelected = option === selected;
            return (
              <li key={option}>
                <button
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={\`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-[14px] transition \${
                    isSelected
                      ? 'bg-[#E8F3FF] font-semibold text-[#3182F6]'
                      : 'text-[#333D4B] hover:bg-[#F9FAFB]'
                  }\`}
                >
                  <span>{option}</span>
                  {isSelected && <Check className="h-4 w-4 text-[#3182F6]" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}`,
    vanillaCode: `<!-- HTML -->
<div class="sort-wrap">
  <button id="sortTrigger" class="sort-btn" type="button">낮은 가격순 ⌄</button>
  <ul id="sortMenu" class="sort-menu">
    <li class="sort-opt" data-val="추천순">추천순</li>
    <li class="sort-opt active" data-val="낮은 가격순">낮은 가격순</li>
    <li class="sort-opt" data-val="리뷰 많은순">리뷰 많은순</li>
  </ul>
</div>

<style>
  .sort-wrap { font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif; }
  .sort-btn {
    border: none; border-radius: 999px; padding: 7px 12px;
    background: #F2F4F6; color: #333D4B; font-size: 13px; font-weight: 600; cursor: pointer;
  }
  .sort-menu {
    list-style: none; margin: 8px 0 0; padding: 6px;
    background: #FFF; border-radius: 16px; border: 1px solid #E5E8EB;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }
  .sort-opt {
    padding: 10px 14px; border-radius: 10px; font-size: 14px; color: #333D4B; cursor: pointer;
  }
  .sort-opt.active { background: #E8F3FF; color: #3182F6; font-weight: 600; }
</style>

<script>
  const trigger = document.getElementById('sortTrigger');
  const menu = document.getElementById('sortMenu');

  trigger.onclick = () => {
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  };

  menu.querySelectorAll('.sort-opt').forEach(opt => {
    opt.onclick = () => {
      menu.querySelectorAll('.sort-opt').forEach(el => el.classList.remove('active'));
      opt.classList.add('active');
      trigger.textContent = opt.dataset.val + ' ⌄';
      menu.style.display = 'none';
    };
  });
</script>`,
  },
  {
    id: 'highlight',
    number: '07',
    titleKo: '검색어 강조',
    titleEn: 'Highlight',
    summary:
      '검색 결과 제목이나 본문 문장 내에서 사용자가 입력한 검색어가 포함된 위치만 정확히 추출해 프라이머리 블루(#3182F6)로 하이라이트합니다.',
    whenToUse:
      '문서, 여행 상품, FAQ, 주소처럼 긴 텍스트 결과 목록에서 내 검색어가 어디에 매칭되었는지 빠르게 스캔해야 할 때 사용합니다.',
    keyDetails: [
      '정규표현식 특수문자 이스케이프 처리로 안전한 부분 문자열 매칭 구현',
      '일치 단어에 볼드 + #3182F6(또는 연한 블루 하이라이트)를 적용해 시선 고정',
      '문장의 맨 앞뿐만 아니라 중간·끝에 위치한 검색어도 동일하게 강조',
    ],
    uxTip: {
      doText: '다중 키워드(공백 구분) 입력 시 각 토큰을 분리해 모두 강조하면 가독성이 더욱 높아집니다.',
      dontText: '형광펜 스타일의 과도한 노란색 배경을 남발해 전체 리스트의 시각적 피로도를 높이지 마세요.',
    },
    reactCode: `import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

const ITEMS = [
  '오사카 3박 4일 패키지',
  '간사이 공항, 오사카 시내 리무진',
  '오사카 맛집 지도 & 도톤보리 투어',
  '교토 출발 오사카 당일치기 패스',
];

function HighlightText({ text, query }: { text: string; query: string }) {
  const clean = query.trim();
  if (!clean) return <>{text}</>;

  const escaped = clean.replace(/[.*+?^$\{}()|[\\]\\\\]/g, '\\\\$&');
  const parts = text.split(new RegExp(\`(\${escaped})\`, 'gi'));

  return (
    <>
      {parts.map((part, idx) =>
        part.toLowerCase() === clean.toLowerCase() ? (
          <mark
            key={idx}
            className="bg-transparent font-bold text-[#3182F6]"
          >
            {part}
          </mark>
        ) : (
          <React.Fragment key={idx}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

export function HighlightResults() {
  const [query, setQuery] = useState('오사카');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? ITEMS.filter((item) => item.toLowerCase().includes(q)) : ITEMS;
  }, [query]);

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center gap-2 rounded-2xl bg-[#F2F4F6] px-4 py-3">
        <Search className="h-5 w-5 text-[#8B95A1]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="지역이나 상품명을 입력하세요"
          className="w-full bg-transparent text-[15px] text-[#191F28] focus:outline-none"
        />
      </div>

      <ul className="divide-y divide-[#F2F4F6] rounded-2xl bg-white px-4 ring-1 ring-[#E5E8EB]">
        {results.map((item) => (
          <li key={item} className="py-3.5 text-[14px] text-[#333D4B]">
            <HighlightText text={item} query={query} />
          </li>
        ))}
      </ul>
    </div>
  );
}`,
    vanillaCode: `<!-- HTML -->
<div class="hl-wrap">
  <input id="hlInput" class="hl-input" type="text" value="오사카" />
  <ul id="hlList" class="hl-list"></ul>
</div>

<style>
  .hl-wrap { font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif; }
  .hl-input {
    width: 100%; box-sizing: border-box; padding: 12px 16px; border-radius: 14px;
    border: none; background: #F2F4F6; font-size: 15px; margin-bottom: 10px;
  }
  .hl-list {
    list-style: none; margin: 0; padding: 0 14px;
    background: #FFF; border-radius: 14px; border: 1px solid #E5E8EB;
  }
  .hl-list li { padding: 12px 0; border-bottom: 1px solid #F2F4F6; font-size: 14px; color: #333D4B; }
  .hl-list li:last-child { border-bottom: none; }
  .hl-mark { color: #3182F6; font-weight: 700; background: none; }
</style>

<script>
  const rows = [
    '오사카 3박 4일 패키지',
    '간사이 공항, 오사카 시내 리무진',
    '오사카 맛집 지도 & 도톤보리 투어'
  ];
  const hlInput = document.getElementById('hlInput');
  const hlList = document.getElementById('hlList');

  function render() {
    const q = hlInput.value.trim();
    const safe = q.replace(/[.*+?^$\{}()|[\\]\\\\]/g, '\\\\$&');
    const regex = safe ? new RegExp(\`(\${safe})\`, 'gi') : null;

    hlList.innerHTML = rows
      .filter(r => !q || r.toLowerCase().includes(q.toLowerCase()))
      .map(r => \`<li>\${regex ? r.replace(regex, '<mark class="hl-mark">$1</mark>') : r}</li>\`)
      .join('');
  }

  hlInput.addEventListener('input', render);
  render();
</script>`,
  },
  {
    id: 'no-results',
    number: '08',
    titleKo: '결과 없음',
    titleEn: 'No results',
    summary:
      '검색 결과가 0건일 때 차가운 오류 메시지 대신 친근한 빈 상태 아이콘과 "혹시 OO 찾으세요?" 교정 링크를 제시해 검색 이탈을 막습니다.',
    whenToUse:
      '오타, 띄어쓰기 오류, 미등록 키워드로 인해 결과가 없을 때 사용자를 막다른 골목에 두지 않고 즉시 대안을 제안할 때 사용합니다.',
    keyDetails: [
      '중립적인 돋보기+X 아이콘과 명확한 한국어 안내("검색 결과가 없어요") 배치',
      '유사어/오타 교정 제안을 클릭 가능한 #3182F6 링크로 제공해 원탭 재검색 지원',
      '대체 추천 키워드나 필터 초기화 옵션을 함께 노출해 탐색 지속 유도',
    ],
    uxTip: {
      doText: '오타 교정 링크를 탭하면 즉시 교정된 검색어로 재검색을 실행하도록 연결하세요.',
      dontText: '"0건 발견" 같은 시스템 중심 문구나 원인 모를 에러 코드만 띄워 사용자를 당황시키지 마세요.',
    },
    reactCode: `import React from 'react';
import { SearchX } from 'lucide-react';

interface NoResultsProps {
  query: string;
  suggestion?: string;
  onSelectSuggestion: (term: string) => void;
}

export function NoResultsState({
  query,
  suggestion = '니트 가디건',
  onSelectSuggestion,
}: NoResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white px-6 py-12 text-center ring-1 ring-[#E5E8EB]">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F2F4F6] text-[#8B95A1]">
        <SearchX className="h-6 w-6" />
      </div>

      <p className="text-[15px] font-bold text-[#191F28]">
        &lsquo;{query}&rsquo; 검색 결과가 없어요
      </p>

      {suggestion && (
        <p className="mt-2 text-[13px] text-[#6B7684]">
          혹시{' '}
          <button
            type="button"
            onClick={() => onSelectSuggestion(suggestion)}
            className="font-semibold text-[#3182F6] underline decoration-[#3182F6]/30 underline-offset-4 hover:text-[#1B64DA]"
          >
            {suggestion}
          </button>{' '}
          찾으세요?
        </p>
      )}
    </div>
  );
}`,
    vanillaCode: `<!-- HTML -->
<div class="empty-box">
  <div class="empty-icon">🔍</div>
  <p class="empty-title">검색 결과가 없어요</p>
  <p class="empty-sub">
    혹시 <a href="#" id="suggestLink" class="suggest-link">니트 가디건</a> 찾으세요?
  </p>
</div>

<style>
  .empty-box {
    padding: 40px 20px; text-align: center; border-radius: 16px;
    background: #FFF; border: 1px solid #E5E8EB;
    font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif;
  }
  .empty-icon {
    width: 48px; height: 48px; margin: 0 auto 14px; border-radius: 50%;
    background: #F2F4F6; display: flex; align-items: center; justify-content: center; font-size: 20px;
  }
  .empty-title { margin: 0; font-size: 15px; font-weight: 700; color: #191F28; }
  .empty-sub { margin: 8px 0 0; font-size: 13px; color: #6B7684; }
  .suggest-link { color: #3182F6; font-weight: 600; text-decoration: none; }
  .suggest-link:hover { text-decoration: underline; }
</style>

<script>
  document.getElementById('suggestLink').addEventListener('click', (e) => {
    e.preventDefault();
    alert('추천 검색어 "니트 가디건"으로 재검색합니다.');
  });
</script>`,
  },
  {
    id: 'scope-tabs',
    number: '09',
    titleKo: '검색 범위 탭',
    titleEn: 'Scope tabs',
    summary:
      '검색어 입력 상태를 유지한 채 전체, 상품, 브랜드, 리뷰 등 탐색 도메인을 탭(Tab)으로 전환하여 원하는 유형의 정보만 집중 탐색합니다.',
    whenToUse:
      '통합 검색 결과에 상품, 브랜드관, 리뷰, 매거진 등 서로 다른 데이터 성격이 공존할 때 사용합니다.',
    keyDetails: [
      '활성 탭은 진한 텍스트(#191F28)와 하단 #3182F6 인디케이터 바로 구분',
      '탭 전환 시 검색어는 유지되며 해당 도메인에 맞는 카드 레이아웃 즉시 반영',
      '각 탭 옆에 결과 건수 배지를 선택적으로 표시해 빈 탭 클릭 방지',
    ],
    uxTip: {
      doText: '전체(All) 탭에서는 각 범위의 대표 결과 2~3개씩 요약 보여주고, 탭 클릭 시 상세 목록으로 확장하세요.',
      dontText: '탭 개수가 화면 너비를 초과하는데 가로 스크롤 힌트 없이 잘리게 두지 마세요.',
    },
    reactCode: `import React, { useState } from 'react';

type ScopeTab = 'all' | 'product' | 'brand' | 'review';

const TABS: { key: ScopeTab; label: string }[] = [
  { key: 'all', label: '전체' },
  { key: 'product', label: '상품' },
  { key: 'brand', label: '브랜드' },
  { key: 'review', label: '리뷰' },
];

export function ScopeTabsSearch() {
  const [activeTab, setActiveTab] = useState<ScopeTab>('brand');

  return (
    <div className="w-full">
      <div
        role="tablist"
        aria-label="검색 범위"
        className="flex border-b border-[#E5E8EB]"
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={\`relative flex-1 py-3 text-[14px] transition-colors \${
                isActive
                  ? 'font-bold text-[#191F28]'
                  : 'font-medium text-[#8B95A1] hover:text-[#4E5968]'
              }\`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-[#3182F6]" />
              )}
            </button>
          );
        })}
      </div>

      <div className="pt-4">
        {activeTab === 'brand' && (
          <div className="flex items-center gap-3 rounded-2xl bg-[#F9FAFB] p-3.5 ring-1 ring-[#E5E8EB]">
            <div className="h-12 w-12 shrink-0 rounded-xl bg-[#E8F3FF]" />
            <div className="space-y-1">
              <p className="text-[14px] font-bold text-[#191F28]">노스페이스 공식 브랜드관</p>
              <p className="text-[12px] text-[#6B7684]">패딩 관련 상품 142개</p>
            </div>
          </div>
        )}
        {activeTab !== 'brand' && (
          <div className="rounded-2xl bg-[#F9FAFB] p-4 text-[13px] text-[#4E5968]">
            현재 &ldquo;{TABS.find((t) => t.key === activeTab)?.label}&rdquo; 범위의 검색 결과를 표시합니다.
          </div>
        )}
      </div>
    </div>
  );
}`,
    vanillaCode: `<!-- HTML -->
<div class="scope-wrap">
  <div class="scope-tabs" role="tablist">
    <button class="scope-tab" data-tab="전체">전체</button>
    <button class="scope-tab" data-tab="상품">상품</button>
    <button class="scope-tab active" data-tab="브랜드">브랜드</button>
    <button class="scope-tab" data-tab="리뷰">리뷰</button>
  </div>
  <div id="scopePanel" class="scope-panel">브랜드 범위 검색 결과가 표시됩니다.</div>
</div>

<style>
  .scope-wrap { font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif; }
  .scope-tabs { display: flex; border-bottom: 1px solid #E5E8EB; }
  .scope-tab {
    flex: 1; position: relative; padding: 12px 0; border: none; background: transparent;
    font-size: 14px; font-weight: 500; color: #8B95A1; cursor: pointer;
  }
  .scope-tab.active { color: #191F28; font-weight: 700; }
  .scope-tab.active::after {
    content: ""; position: absolute; left: 12px; right: 12px; bottom: 0;
    height: 2px; border-radius: 999px; background: #3182F6;
  }
  .scope-panel {
    margin-top: 14px; padding: 14px; border-radius: 14px;
    background: #F9FAFB; border: 1px solid #E5E8EB; font-size: 13px; color: #4E5968;
  }
</style>

<script>
  const tabs = document.querySelectorAll('.scope-tab');
  const panel = document.getElementById('scopePanel');
  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      panel.textContent = \`\${tab.dataset.tab} 범위 검색 결과가 표시됩니다.\`;
    };
  });
</script>`,
  },
];
