export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        toss: {
          blue: '#3182F6',
          blueHover: '#1B64DA',
          blueSoft: '#E8F3FF',
          bg: '#F2F4F6',
          surface: '#FFFFFF',
          border: '#E5E8EB',
          text: '#191F28',
          textSub: '#4E5968',
          textMuted: '#8B95A1',
          inputBg: '#F4F5F7',
        },
      },
      fontFamily: {
        sans: [
          'Pretendard Variable',
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'Apple SD Gothic Neo',
          'Noto Sans KR',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      boxShadow: {
        card: '0 2px 16px rgba(0, 0, 0, 0.04)',
        device: '0 20px 50px rgba(17, 24, 39, 0.08)',
        sheet: '0 -4px 20px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};
