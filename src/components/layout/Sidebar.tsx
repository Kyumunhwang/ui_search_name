import React from 'react';
import { LayoutGrid, Search, Sparkles } from 'lucide-react';
import { PatternId, SearchPatternMeta } from '../../data/searchPatterns';

interface SidebarProps {
  patterns: SearchPatternMeta[];
  activePatternId: PatternId;
  viewMode: 'detail' | 'overview';
  onSelectPattern: (id: PatternId) => void;
  onSelectOverview: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  patterns,
  activePatternId,
  viewMode,
  onSelectPattern,
  onSelectOverview,
}) => {
  return (
    <aside className="flex h-full w-full flex-col border-r border-[#E5E8EB] bg-white lg:w-[272px] lg:shrink-0">
      {/* Brand Header */}
      <div className="border-b border-[#F2F4F6] px-5 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3182F6] text-white shadow-sm">
            <Search className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-[15px] font-bold tracking-tight text-[#191F28]">
              Search UX Lab
            </h1>
            <p className="text-[11px] font-medium text-[#8B95A1]">
              9가지 검색창 패턴 라이브러리
            </p>
          </div>
        </div>
      </div>

      {/* Overview Toggle */}
      <div className="px-3 pt-4 pb-2">
        <button
          type="button"
          onClick={onSelectOverview}
          className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[13px] font-semibold transition-all ${
            viewMode === 'overview'
              ? 'bg-[#E8F3FF] text-[#3182F6]'
              : 'bg-[#F9FAFB] text-[#4E5968] hover:bg-[#F2F4F6]'
          }`}
        >
          <span className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4" />
            전체 한눈에 보기
          </span>
          <span
            className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
              viewMode === 'overview'
                ? 'bg-white text-[#3182F6]'
                : 'bg-[#E5E8EB] text-[#4E5968]'
            }`}
          >
            3×3
          </span>
        </button>
      </div>

      {/* Section Title */}
      <div className="px-5 pt-3 pb-1.5">
        <span className="text-[11px] font-bold tracking-wider text-[#8B95A1]">
          패턴 목록 (01–09)
        </span>
      </div>

      {/* Pattern Navigation List */}
      <nav aria-label="검색 패턴 메뉴" className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {patterns.map((pattern) => {
          const isActive = viewMode === 'detail' && activePatternId === pattern.id;
          return (
            <button
              key={pattern.id}
              type="button"
              onClick={() => onSelectPattern(pattern.id)}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
                isActive
                  ? 'bg-[#E8F3FF] text-[#3182F6]'
                  : 'text-[#333D4B] hover:bg-[#F2F4F6]'
              }`}
            >
              <span
                className={`text-[13px] font-bold tabular-nums transition-colors ${
                  isActive
                    ? 'text-[#3182F6]'
                    : 'text-[#3182F6]/70 group-hover:text-[#3182F6]'
                }`}
              >
                {pattern.number}
              </span>
              <div className="min-w-0 flex-1">
                <div
                  className={`truncate text-[14px] ${
                    isActive ? 'font-bold text-[#191F28]' : 'font-semibold text-[#333D4B]'
                  }`}
                >
                  {pattern.titleKo}
                </div>
                <div className="truncate text-[11px] font-medium text-[#8B95A1]">
                  {pattern.titleEn}
                </div>
              </div>
              {isActive && (
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#3182F6]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Note */}
      <div className="border-t border-[#F2F4F6] p-4">
        <div className="flex items-start gap-2 rounded-xl bg-[#F9FAFB] p-3">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#3182F6]" />
          <p className="text-[11px] leading-relaxed text-[#6B7684]">
            우측 코드 패널에서 <strong className="font-semibold text-[#333D4B]">React</strong> 또는{' '}
            <strong className="font-semibold text-[#333D4B]">HTML/JS</strong> 코드를 바로 복사해
            프로젝트에 붙여넣으세요.
          </p>
        </div>
      </div>
    </aside>
  );
};
