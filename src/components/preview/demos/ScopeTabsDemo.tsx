import React, { useState } from 'react';
import { Award, MessageSquare, Search, ShoppingBag, Star } from 'lucide-react';

type ScopeTab = 'all' | 'product' | 'brand' | 'review';

const TABS: { key: ScopeTab; label: string; count: number }[] = [
  { key: 'all', label: '전체', count: 18 },
  { key: 'product', label: '상품', count: 12 },
  { key: 'brand', label: '브랜드', count: 2 },
  { key: 'review', label: '리뷰', count: 4 },
];

export const ScopeTabsDemo: React.FC = () => {
  const [query, setQuery] = useState('패딩');
  const [activeTab, setActiveTab] = useState<ScopeTab>('brand');

  return (
    <div className="space-y-3.5">
      {/* Search Bar */}
      <div className="flex items-center gap-2 rounded-2xl bg-[#F2F4F6] px-3.5 py-2.5">
        <Search className="h-4 w-4 text-[#8B95A1]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent text-[14px] font-semibold text-[#191F28] focus:outline-none"
        />
      </div>

      {/* Scope Tabs */}
      <div role="tablist" aria-label="검색 범위" className="flex border-b border-[#E5E8EB]">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex-1 py-2.5 text-[13px] transition-colors ${
                isActive
                  ? 'font-bold text-[#191F28]'
                  : 'font-medium text-[#8B95A1] hover:text-[#4E5968]'
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute inset-x-2.5 bottom-0 h-[2.5px] rounded-full bg-[#3182F6]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="space-y-2.5 pt-1">
        {(activeTab === 'all' || activeTab === 'brand') && (
          <div className="space-y-2">
            <div className="flex items-center gap-3 rounded-2xl bg-[#F9FAFB] p-3.5 ring-1 ring-[#E5E8EB]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[#3182F6]">
                <Award className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-[13.5px] font-bold text-[#191F28]">
                    노스페이스 공식 브랜드관
                  </span>
                  <span className="rounded bg-[#E8F3FF] px-1.5 py-0.5 text-[10px] font-bold text-[#3182F6]">
                    공식
                  </span>
                </div>
                <p className="mt-0.5 text-[12px] text-[#6B7684]">
                  &lsquo;{query || '패딩'}&rsquo; 관련 상품 142개 · 무료배송
                </p>
              </div>
            </div>

            {activeTab === 'brand' && (
              <div className="flex items-center gap-3 rounded-2xl bg-[#F9FAFB] p-3.5 ring-1 ring-[#E5E8EB]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F2F4F6] text-[#4E5968]">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[13.5px] font-bold text-[#191F28]">
                    디스커버리 익스페디션
                  </p>
                  <p className="mt-0.5 text-[12px] text-[#6B7684]">
                    &lsquo;{query || '패딩'}&rsquo; 관련 상품 87개
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'product') && (
          <div className="space-y-2">
            {[
              { name: `경량 구스다운 ${query || '패딩'}`, price: '119,000원' },
              { name: `리버시블 숏 ${query || '패딩'}`, price: '89,000원' },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-2xl bg-white p-3 ring-1 ring-[#E5E8EB]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F2F4F6] text-[#4E5968]">
                    <ShoppingBag className="h-4 w-4" />
                  </div>
                  <span className="text-[13px] font-semibold text-[#191F28]">
                    {item.name}
                  </span>
                </div>
                <span className="text-[13px] font-bold text-[#3182F6]">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'review') && (
          <div className="rounded-2xl bg-white p-3.5 ring-1 ring-[#E5E8EB]">
            <div className="mb-1.5 flex items-center justify-between">
              <div className="flex items-center gap-1 text-[#3182F6]">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span className="text-[12px] font-bold">5.0</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] text-[#8B95A1]">
                <MessageSquare className="h-3 w-3" /> 실구매자 후기
              </span>
            </div>
            <p className="text-[12.5px] leading-relaxed text-[#333D4B]">
              &ldquo;가벼운데 보온성이 정말 뛰어나서 한겨울 {query || '패딩'}으로 매일
              입고 있어요.&rdquo;
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
