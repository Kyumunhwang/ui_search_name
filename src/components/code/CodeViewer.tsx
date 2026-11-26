import React, { useEffect, useState } from 'react';
import { Check, CheckCircle2, Code2, Copy, Lightbulb, XCircle } from 'lucide-react';
import { SearchPatternMeta } from '../../data/searchPatterns';

interface CodeViewerProps {
  pattern: SearchPatternMeta;
}

type CodeTab = 'react' | 'vanilla';

export const CodeViewer: React.FC<CodeViewerProps> = ({ pattern }) => {
  const [activeTab, setActiveTab] = useState<CodeTab>('react');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCopied(false);
  }, [pattern.id, activeTab]);

  const currentCode = activeTab === 'react' ? pattern.reactCode : pattern.vanillaCode;
  const codeLines = currentCode.split('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = currentCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="flex h-full flex-col gap-4 overflow-y-auto">
      {/* UX Specification Card */}
      <div className="rounded-2xl bg-white p-5 shadow-card ring-1 ring-[#E5E8EB]">
        <div className="mb-3 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-[#3182F6]" />
          <h3 className="text-[14px] font-bold text-[#191F28]">UX 설계 가이드</h3>
        </div>

        <p className="text-[13px] leading-relaxed text-[#4E5968]">{pattern.whenToUse}</p>

        <ul className="mt-3.5 space-y-2">
          {pattern.keyDetails.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-2 text-[12.5px] text-[#333D4B]">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3182F6]" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 grid grid-cols-1 gap-2.5 border-t border-[#F2F4F6] pt-4 sm:grid-cols-2">
          <div className="rounded-xl bg-[#F0F7FF] p-3">
            <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold text-[#3182F6]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              권장 (Do)
            </div>
            <p className="text-[12px] leading-relaxed text-[#333D4B]">
              {pattern.uxTip.doText}
            </p>
          </div>
          <div className="rounded-xl bg-[#FFF5F5] p-3">
            <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold text-[#F04452]">
              <XCircle className="h-3.5 w-3.5" />
              지양 (Don&apos;t)
            </div>
            <p className="text-[12px] leading-relaxed text-[#333D4B]">
              {pattern.uxTip.dontText}
            </p>
          </div>
        </div>
      </div>

      {/* Code Snippet Panel */}
      <div className="flex min-h-[380px] flex-1 flex-col overflow-hidden rounded-2xl bg-[#191F28] shadow-card">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-1.5 rounded-xl bg-white/10 p-1">
            <button
              type="button"
              onClick={() => setActiveTab('react')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition ${
                activeTab === 'react'
                  ? 'bg-[#3182F6] text-white shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              React + Tailwind
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('vanilla')}
              className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold transition ${
                activeTab === 'vanilla'
                  ? 'bg-[#3182F6] text-white shadow-sm'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              HTML + CSS + JS
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[12px] font-semibold transition ${
              copied
                ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/40'
                : 'bg-white/10 text-gray-200 hover:bg-white/20 hover:text-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                복사 완료!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                코드 복사
              </>
            )}
          </button>
        </div>

        {/* Code Body */}
        <div className="flex-1 overflow-auto p-4 font-mono text-[12px] leading-[1.65] text-gray-100">
          <table className="w-full border-collapse">
            <tbody>
              {codeLines.map((line, index) => (
                <tr key={index} className="hover:bg-white/[0.04]">
                  <td className="w-9 select-none pr-4 text-right text-[11px] text-gray-500 tabular-nums">
                    {index + 1}
                  </td>
                  <td className="whitespace-pre text-gray-100">{line || ' '}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
