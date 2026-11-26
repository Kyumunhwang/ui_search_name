import { useMemo, useState } from 'react';
import { ArrowRight, ChevronDown, Menu, Search, SearchX, X } from 'lucide-react';
import { SEARCH_PATTERNS, PatternId } from './data/searchPatterns';
import { Sidebar } from './components/layout/Sidebar';
import { DeviceFrame } from './components/preview/DeviceFrame';
import { CodeViewer } from './components/code/CodeViewer';
import { SearchBarDemo } from './components/preview/demos/SearchBarDemo';
import { AutocompleteDemo } from './components/preview/demos/AutocompleteDemo';
import { RecentSearchesDemo } from './components/preview/demos/RecentSearchesDemo';
import { TrendingDemo } from './components/preview/demos/TrendingDemo';
import { FilterDemo } from './components/preview/demos/FilterDemo';
import { SortDemo } from './components/preview/demos/SortDemo';
import { HighlightDemo } from './components/preview/demos/HighlightDemo';
import { NoResultsDemo } from './components/preview/demos/NoResultsDemo';
import { ScopeTabsDemo } from './components/preview/demos/ScopeTabsDemo';

function renderDemoComponent(patternId: PatternId) {
  switch (patternId) {
    case 'search-bar':
      return <SearchBarDemo />;
    case 'autocomplete':
      return <AutocompleteDemo />;
    case 'recent-searches':
      return <RecentSearchesDemo />;
    case 'trending':
      return <TrendingDemo />;
    case 'filter':
      return <FilterDemo />;
    case 'sort':
      return <SortDemo />;
    case 'highlight':
      return <HighlightDemo />;
    case 'no-results':
      return <NoResultsDemo />;
    case 'scope-tabs':
      return <ScopeTabsDemo />;
  }
}

/**
 * Compact visual preview rendered inside each 3x3 overview card,
 * faithfully reflecting the 9 reference cards in search_name.png.
 */
function renderMiniThumbnail(patternId: PatternId) {
  switch (patternId) {
    case 'search-bar':
      return (
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center gap-1.5 rounded-xl bg-white px-2.5 py-2 ring-2 ring-[#3182F6]">
            <Search className="h-3.5 w-3.5 text-[#3182F6]" />
            <span className="text-[11px] font-medium text-[#191F28]">패딩 역사</span>
          </div>
          <div className="mt-3 grid grid-cols-7 gap-1 rounded-lg bg-[#F2F4F6] p-1.5">
            {Array.from({ length: 14 }).map((_, i) => (
              <div key={i} className="h-4 rounded bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]" />
            ))}
          </div>
        </div>
      );

    case 'autocomplete':
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 rounded-xl bg-[#F2F4F6] px-2.5 py-2">
            <Search className="h-3.5 w-3.5 text-[#8B95A1]" />
            <span className="text-[11px] font-medium text-[#191F28]">니트</span>
          </div>
          <div className="space-y-1.5 px-1 text-[11px]">
            <div>
              <span className="font-bold text-[#3182F6]">니트</span>{' '}
              <span className="text-[#333D4B]">가디건</span>
            </div>
            <div>
              <span className="font-bold text-[#3182F6]">니트</span>{' '}
              <span className="text-[#333D4B]">원피스</span>
            </div>
            <div>
              <span className="font-bold text-[#3182F6]">니트</span>{' '}
              <span className="text-[#333D4B]">조끼</span>
            </div>
          </div>
        </div>
      );

    case 'recent-searches':
      return (
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 rounded-xl bg-[#F2F4F6] px-2.5 py-2">
            <Search className="h-3.5 w-3.5 text-[#8B95A1]" />
          </div>
          <div className="space-y-1.5 px-0.5">
            <div className="text-[10px] font-semibold text-[#6B7684]">최근 검색어</div>
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#F2F4F6] px-2 py-0.5 text-[10px] font-medium text-[#333D4B]">
                제주 숙소 <X className="h-2.5 w-2.5 text-[#8B95A1]" />
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#F2F4F6] px-2 py-0.5 text-[10px] font-medium text-[#333D4B]">
                가습기 <X className="h-2.5 w-2.5 text-[#8B95A1]" />
              </span>
            </div>
            <div className="pt-0.5 text-[9.5px] text-[#8B95A1]">전체 삭제</div>
          </div>
        </div>
      );

    case 'trending':
      return (
        <div className="space-y-2 px-1">
          <div className="text-[10.5px] font-bold text-[#191F28]">지금 많이 찾는</div>
          <div className="space-y-1.5 text-[11px]">
            {[
              { rank: 1, kw: '패딩', up: false },
              { rank: 2, kw: '가습기', up: true },
              { rank: 3, kw: '핫팩', up: false },
              { rank: 4, kw: '머플러', up: false },
            ].map((row) => (
              <div key={row.rank} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-bold tabular-nums ${
                      row.rank <= 3 ? 'text-[#3182F6]' : 'text-[#8B95A1]'
                    }`}
                  >
                    {row.rank}
                  </span>
                  <span className="text-[#191F28]">{row.kw}</span>
                </div>
                {row.up && <span className="text-[8px] text-[#F04452]">▲</span>}
              </div>
            ))}
          </div>
        </div>
      );

    case 'filter':
      return (
        <div className="space-y-2.5">
          <div className="flex gap-1">
            <span className="inline-flex items-center gap-0.5 rounded-full bg-[#E8F3FF] px-2 py-0.5 text-[9.5px] font-semibold text-[#3182F6]">
              가격 <ChevronDown className="h-2.5 w-2.5" />
            </span>
            <span className="rounded-full bg-[#F2F4F6] px-2 py-0.5 text-[9.5px] text-[#4E5968]">
              브랜드
            </span>
            <span className="rounded-full bg-[#F2F4F6] px-2 py-0.5 text-[9.5px] text-[#4E5968]">
              무료배송
            </span>
          </div>
          <div className="rounded-xl bg-[#F9FAFB] p-2.5 ring-1 ring-[#E5E8EB]/80">
            <div className="mb-2 text-[10px] font-medium text-[#6B7684]">가격</div>
            <div className="relative flex h-3 items-center">
              <div className="h-1 w-full rounded-full bg-[#E5E8EB]" />
              <div className="absolute left-[18%] right-[30%] h-1 rounded-full bg-[#3182F6]" />
              <div className="absolute left-[16%] h-3 w-3 rounded-full border-2 border-[#3182F6] bg-white" />
              <div className="absolute right-[28%] h-3 w-3 rounded-full border-2 border-[#3182F6] bg-white" />
            </div>
            <div className="mt-2 text-[10.5px] font-bold text-[#191F28]">
              3만 원 ~ 12만 원
            </div>
          </div>
        </div>
      );

    case 'sort':
      return (
        <div className="space-y-2">
          <div className="flex justify-end">
            <span className="inline-flex items-center gap-0.5 rounded-full bg-[#F2F4F6] px-2 py-0.5 text-[9.5px] font-semibold text-[#333D4B]">
              낮은 가격순 <ChevronDown className="h-2.5 w-2.5" />
            </span>
          </div>
          <div className="space-y-1 rounded-xl bg-white p-1.5 ring-1 ring-[#E5E8EB]">
            <div className="px-2 py-1 text-[10px] text-[#4E5968]">추천순</div>
            <div className="rounded-lg bg-[#E8F3FF] px-2 py-1 text-[10px] font-bold text-[#3182F6]">
              낮은 가격순
            </div>
            <div className="px-2 py-1 text-[10px] text-[#4E5968]">리뷰 많은순</div>
          </div>
        </div>
      );

    case 'highlight':
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 rounded-xl bg-[#F2F4F6] px-2.5 py-2">
            <Search className="h-3.5 w-3.5 text-[#8B95A1]" />
            <span className="text-[11px] font-medium text-[#191F28]">오사카</span>
          </div>
          <div className="space-y-1.5 px-1 text-[10.5px] text-[#333D4B]">
            <div>
              <span className="font-bold text-[#3182F6]">오사카</span> 3박 4일 패키지
            </div>
            <div>
              간사이 공항, <span className="font-bold text-[#3182F6]">오사카</span> 시내
            </div>
            <div>
              <span className="font-bold text-[#3182F6]">오사카</span> 맛집 지도
            </div>
          </div>
        </div>
      );

    case 'no-results':
      return (
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 rounded-xl bg-[#F2F4F6] px-2.5 py-2">
            <Search className="h-3.5 w-3.5 text-[#8B95A1]" />
            <span className="text-[11px] font-medium text-[#191F28]">니트가디간</span>
          </div>
          <div className="flex flex-col items-center py-2 text-center">
            <SearchX className="mb-1.5 h-5 w-5 text-[#8B95A1]" />
            <div className="text-[10.5px] font-bold text-[#191F28]">검색 결과가 없어요</div>
            <div className="mt-0.5 text-[9.5px] text-[#6B7684]">
              혹시 <span className="font-semibold text-[#3182F6]">니트 가디건</span> 찾으세요?
            </div>
          </div>
        </div>
      );

    case 'scope-tabs':
      return (
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 rounded-xl bg-[#F2F4F6] px-2.5 py-2">
            <Search className="h-3.5 w-3.5 text-[#8B95A1]" />
            <span className="text-[11px] font-medium text-[#191F28]">패딩</span>
          </div>
          <div className="flex border-b border-[#E5E8EB] text-[10px]">
            <span className="flex-1 py-1 text-center text-[#8B95A1]">전체</span>
            <span className="flex-1 py-1 text-center text-[#8B95A1]">상품</span>
            <span className="flex-1 border-b-2 border-[#3182F6] py-1 text-center font-bold text-[#191F28]">
              브랜드
            </span>
            <span className="flex-1 py-1 text-center text-[#8B95A1]">리뷰</span>
          </div>
          <div className="flex items-center gap-2 pt-0.5">
            <div className="h-9 w-9 shrink-0 rounded-lg bg-[#E8F3FF]" />
            <div className="flex-1 space-y-1.5">
              <div className="h-2 w-4/5 rounded-full bg-[#333D4B]" />
              <div className="h-1.5 w-3/5 rounded-full bg-[#D1D6DB]" />
            </div>
          </div>
        </div>
      );
  }
}

export function App() {
  const [activePatternId, setActivePatternId] = useState<PatternId>('search-bar');
  const [viewMode, setViewMode] = useState<'detail' | 'overview'>('detail');
  const [demoKey, setDemoKey] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activePattern = useMemo(
    () => SEARCH_PATTERNS.find((p) => p.id === activePatternId) ?? SEARCH_PATTERNS[0],
    [activePatternId]
  );

  const handleSelectPattern = (id: PatternId) => {
    setActivePatternId(id);
    setViewMode('detail');
    setDemoKey((k) => k + 1);
    setMobileMenuOpen(false);
  };

  const handleSelectOverview = () => {
    setViewMode('overview');
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F2F4F6] text-[#191F28] lg:h-screen lg:flex-row lg:overflow-hidden">
      {/* Mobile Top Bar */}
      <header className="flex items-center justify-between border-b border-[#E5E8EB] bg-white px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#3182F6] text-white">
            <Search className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[14px] font-bold text-[#191F28]">Search UX Lab</span>
            <span className="ml-2 text-[11px] text-[#8B95A1]">
              {viewMode === 'overview'
                ? '전체 보기'
                : `${activePattern.number} ${activePattern.titleKo}`}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="메뉴 열기"
          className="rounded-xl bg-[#F2F4F6] p-2 text-[#333D4B]"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="h-full w-72 bg-white shadow-2xl">
            <Sidebar
              patterns={SEARCH_PATTERNS}
              activePatternId={activePatternId}
              viewMode={viewMode}
              onSelectPattern={handleSelectPattern}
              onSelectOverview={handleSelectOverview}
            />
          </div>
          <button
            type="button"
            aria-label="메뉴 닫기"
            className="flex-1 bg-black/30 backdrop-blur-[1px]"
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>
      )}

      {/* Desktop Left Sidebar */}
      <div className="hidden lg:block lg:h-full">
        <Sidebar
          patterns={SEARCH_PATTERNS}
          activePatternId={activePatternId}
          viewMode={viewMode}
          onSelectPattern={handleSelectPattern}
          onSelectOverview={handleSelectOverview}
        />
      </div>

      {/* Main Content Area */}
      {viewMode === 'overview' ? (
        <main className="flex-1 overflow-y-auto p-5 sm:p-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="inline-block rounded-full bg-[#E8F3FF] px-3 py-1 text-[11px] font-bold text-[#3182F6]">
                  9가지 검색창 UX 패턴 쇼케이스
                </span>
                <h2 className="mt-2 text-[22px] font-bold tracking-tight text-[#191F28]">
                  전체 패턴 한눈에 보기
                </h2>
                <p className="mt-1 text-[13.5px] text-[#4E5968]">
                  원하는 패턴 카드를 클릭하면 라이브 인터랙티브 데모와 복사용 코드를 바로 확인할 수 있습니다.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SEARCH_PATTERNS.map((pattern) => (
                <button
                  key={pattern.id}
                  type="button"
                  onClick={() => handleSelectPattern(pattern.id)}
                  className="group flex flex-col rounded-[24px] bg-white p-5 text-left shadow-card ring-1 ring-[#E5E8EB]/80 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-[#3182F6]/40"
                >
                  {/* Miniature Frame */}
                  <div className="mb-4 h-[156px] w-full overflow-hidden rounded-2xl bg-[#FAFAFB] p-3.5 ring-1 ring-[#E5E8EB]/90">
                    {renderMiniThumbnail(pattern.id)}
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[16px] font-bold text-[#3182F6] tabular-nums">
                          {pattern.number}
                        </span>
                        <span className="text-[17px] font-bold text-[#191F28]">
                          {pattern.titleKo}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[12.5px] font-medium text-[#8B95A1]">
                        {pattern.titleEn}
                      </p>
                    </div>

                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F2F4F6] text-[#4E5968] transition group-hover:bg-[#3182F6] group-hover:text-white">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </main>
      ) : (
        <main className="grid flex-1 grid-cols-1 gap-6 p-5 sm:p-6 xl:grid-cols-12 xl:overflow-hidden">
          {/* Center: Interactive Device Preview */}
          <div className="flex flex-col xl:col-span-6 xl:h-full xl:overflow-y-auto">
            <DeviceFrame
              pattern={activePattern}
              demoKey={demoKey}
              onResetDemo={() => setDemoKey((k) => k + 1)}
            >
              {renderDemoComponent(activePattern.id)}
            </DeviceFrame>
          </div>

          {/* Right: UX Guide & Copyable Code Panel */}
          <div className="flex flex-col xl:col-span-6 xl:h-full xl:overflow-hidden">
            <CodeViewer pattern={activePattern} />
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
