import React, { useState } from 'react';
import { RefreshCw, Search } from 'lucide-react';

interface TrendingKeyword {
  keyword: string;
  trend: 'up' | 'down' | 'same' | 'new';
  delta?: number;
}

const SNAPSHOTS: TrendingKeyword[][] = [
  [
    { keyword: '패딩', trend: 'same' },
    { keyword: '가습기', trend: 'up', delta: 2 },
    { keyword: '핫팩', trend: 'same' },
    { keyword: '머플러', trend: 'down', delta: 1 },
    { keyword: '전기장판', trend: 'new' },
    { keyword: '니트 가디건', trend: 'up', delta: 1 },
  ],
  [
    { keyword: '가습기', trend: 'up', delta: 1 },
    { keyword: '패딩', trend: 'down', delta: 1 },
    { keyword: '어그 부츠', trend: 'new' },
    { keyword: '핫팩', trend: 'down', delta: 1 },
    { keyword: '머플러', trend: 'same' },
    { keyword: '보온 텀블러', trend: 'up', delta: 3 },
  ],
];

export const TrendingDemo: React.FC = () => {
  const [snapshotIdx, setSnapshotIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const items = SNAPSHOTS[snapshotIdx];
  const timeLabel = snapshotIdx === 0 ? '14:00 기준' : '15:00 기준';

  return (
    <div className="space-y-4">
      {/* Header Search Trigger */}
      <div className="flex items-center gap-2.5 rounded-2xl bg-[#F2F4F6] px-3.5 py-2.5 text-[13px] text-[#8B95A1]">
        <Search className="h-4 w-4 text-[#8B95A1]" />
        <span className={selected ? 'font-semibold text-[#191F28]' : ''}>
          {selected ? selected : '지금 인기 있는 키워드를 눌러보세요'}
        </span>
      </div>

      {/* Trending Ranking Card */}
      <div className="rounded-2xl bg-white p-4 ring-1 ring-[#E5E8EB]">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-[14px] font-bold text-[#191F28]">지금 많이 찾는</h3>
            <span className="text-[11px] font-medium text-[#8B95A1]">{timeLabel}</span>
          </div>
          <button
            type="button"
            onClick={() => setSnapshotIdx((prev) => (prev === 0 ? 1 : 0))}
            className="inline-flex items-center gap-1 rounded-lg bg-[#F2F4F6] px-2 py-1 text-[11px] font-semibold text-[#4E5968] transition hover:bg-[#E5E8EB]"
          >
            <RefreshCw className="h-3 w-3" />
            순위 갱신
          </button>
        </div>

        <ol className="space-y-1">
          {items.map((item, idx) => {
            const rank = idx + 1;
            const isSelected = selected === item.keyword;
            return (
              <li key={item.keyword}>
                <button
                  type="button"
                  onClick={() => setSelected(item.keyword)}
                  className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2.5 text-left transition ${
                    isSelected ? 'bg-[#E8F3FF]' : 'hover:bg-[#F9FAFB]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-4 text-center text-[14px] font-bold tabular-nums ${
                        rank <= 3 ? 'text-[#3182F6]' : 'text-[#8B95A1]'
                      }`}
                    >
                      {rank}
                    </span>
                    <span
                      className={`text-[14px] ${
                        isSelected
                          ? 'font-bold text-[#3182F6]'
                          : 'font-medium text-[#191F28]'
                      }`}
                    >
                      {item.keyword}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {item.trend === 'up' && (
                      <span className="text-[10px] font-bold text-[#F04452]">
                        ▲ {item.delta}
                      </span>
                    )}
                    {item.trend === 'down' && (
                      <span className="text-[10px] font-bold text-[#3182F6]">
                        ▼ {item.delta}
                      </span>
                    )}
                    {item.trend === 'new' && (
                      <span className="rounded-md bg-[#E8F3FF] px-1.5 py-0.5 text-[10px] font-bold text-[#3182F6]">
                        NEW
                      </span>
                    )}
                    {item.trend === 'same' && (
                      <span className="text-[12px] text-[#B0B8C1]">-</span>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
