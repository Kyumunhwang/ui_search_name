import React, { useState } from 'react';
import { Monitor, RotateCcw, Smartphone, Wifi, Battery } from 'lucide-react';
import { SearchPatternMeta } from '../../data/searchPatterns';

interface DeviceFrameProps {
  pattern: SearchPatternMeta;
  demoKey: number;
  onResetDemo: () => void;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  pattern,
  demoKey,
  onResetDemo,
  children,
}) => {
  const [frameMode, setFrameMode] = useState<'mobile' | 'card'>('mobile');

  return (
    <div className="flex h-full flex-col">
      {/* Top Preview Controls */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-[#E8F3FF] px-2 py-0.5 text-[12px] font-bold text-[#3182F6] tabular-nums">
              {pattern.number}
            </span>
            <h2 className="text-[20px] font-bold tracking-tight text-[#191F28]">
              {pattern.titleKo}
            </h2>
            <span className="text-[13px] font-medium text-[#8B95A1]">
              {pattern.titleEn}
            </span>
          </div>
          <p className="mt-1 text-[13px] leading-relaxed text-[#4E5968]">
            {pattern.summary}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-xl bg-white p-1 shadow-sm ring-1 ring-[#E5E8EB]">
            <button
              type="button"
              onClick={() => setFrameMode('mobile')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-semibold transition ${
                frameMode === 'mobile'
                  ? 'bg-[#E8F3FF] text-[#3182F6]'
                  : 'text-[#6B7684] hover:text-[#191F28]'
              }`}
              title="모바일 앱 화면으로 보기"
            >
              <Smartphone className="h-3.5 w-3.5" />
              모바일
            </button>
            <button
              type="button"
              onClick={() => setFrameMode('card')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-semibold transition ${
                frameMode === 'card'
                  ? 'bg-[#E8F3FF] text-[#3182F6]'
                  : 'text-[#6B7684] hover:text-[#191F28]'
              }`}
              title="웹 카드 컨테이너로 보기"
            >
              <Monitor className="h-3.5 w-3.5" />
              웹 카드
            </button>
          </div>

          <button
            type="button"
            onClick={onResetDemo}
            className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-[12px] font-semibold text-[#4E5968] shadow-sm ring-1 ring-[#E5E8EB] transition hover:bg-[#F9FAFB] hover:text-[#191F28]"
            title="데모 상태 초기화"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            초기화
          </button>
        </div>
      </div>

      {/* Interactive Stage */}
      <div className="flex flex-1 items-center justify-center rounded-3xl bg-[#EAECEF]/70 p-4 sm:p-6">
        {frameMode === 'mobile' ? (
          <div className="w-full max-w-[375px] overflow-hidden rounded-[36px] border-[6px] border-[#191F28] bg-white shadow-device transition-all duration-300">
            {/* Simulated Mobile Status Bar */}
            <div className="flex items-center justify-between bg-white px-6 pt-3 pb-2 text-[11px] font-semibold text-[#191F28]">
              <span>9:41</span>
              <div className="h-4 w-20 rounded-full bg-[#191F28]" />
              <div className="flex items-center gap-1.5">
                <Wifi className="h-3 w-3" />
                <Battery className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Simulated App Screen Content */}
            <div key={demoKey} className="min-h-[430px] bg-white px-4 pt-2 pb-6">
              {children}
            </div>

            {/* Home Indicator */}
            <div className="flex justify-center bg-white pb-2.5 pt-1">
              <div className="h-1 w-28 rounded-full bg-[#D1D6DB]" />
            </div>
          </div>
        ) : (
          <div
            key={demoKey}
            className="w-full max-w-[520px] rounded-3xl bg-white p-6 shadow-device ring-1 ring-[#E5E8EB] transition-all duration-300"
          >
            <div className="mb-4 flex items-center justify-between border-b border-[#F2F4F6] pb-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#E5E8EB]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#E5E8EB]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#E5E8EB]" />
              </div>
              <span className="text-[11px] font-medium text-[#8B95A1]">
                인터랙티브 라이브 프리뷰
              </span>
            </div>
            <div className="min-h-[340px]">{children}</div>
          </div>
        )}
      </div>
    </div>
  );
};
