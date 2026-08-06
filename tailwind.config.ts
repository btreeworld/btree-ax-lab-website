import type { Config } from 'tailwindcss';

/**
 * 디자인 토큰은 src/app/globals.css 의 CSS Variables 를 단일 원본으로 사용한다.
 * Tailwind 는 그 변수를 참조만 하므로 토큰 변경 시 CSS 한 곳만 수정하면 된다.
 * (마스터 문서 14장 — 디자인 시스템)
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          elevated: 'var(--color-bg-elevated)',
        },
        surface: {
          light: 'var(--color-surface-light)',
          white: 'var(--color-surface-white)',
        },
        ink: {
          'primary-dark': 'var(--color-text-primary-dark)',
          'secondary-dark': 'var(--color-text-secondary-dark)',
          'primary-light': 'var(--color-text-primary-light)',
          'secondary-light': 'var(--color-text-secondary-light)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          deep: 'var(--color-accent-deep)',
          soft: 'var(--color-accent-soft)',
        },
        state: {
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          error: 'var(--color-error)',
        },
        line: {
          dark: 'var(--color-border-dark)',
          light: 'var(--color-border-light)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
      },
      fontSize: {
        // [size, { lineHeight, letterSpacing, fontWeight }] — 마스터 문서 13.3 Type Scale
        'display-xl': ['clamp(2.625rem, 5.2vw, 4.5rem)', { lineHeight: '1.08', fontWeight: '700' }],
        'display-l': ['clamp(2.25rem, 4.2vw, 3.5rem)', { lineHeight: '1.12', fontWeight: '700' }],
        h1: ['clamp(2.125rem, 3.6vw, 3rem)', { lineHeight: '1.18', fontWeight: '700' }],
        h2: ['clamp(1.875rem, 2.9vw, 2.375rem)', { lineHeight: '1.25', fontWeight: '700' }],
        h3: ['clamp(1.4375rem, 1.9vw, 1.625rem)', { lineHeight: '1.35', fontWeight: '650' }],
        h4: ['clamp(1.1875rem, 1.4vw, 1.25rem)', { lineHeight: '1.4', fontWeight: '650' }],
        'body-l': ['clamp(1.125rem, 1.2vw, 1.1875rem)', { lineHeight: '1.75' }],
        body: ['1rem', { lineHeight: '1.7' }],
        small: ['0.875rem', { lineHeight: '1.6' }],
        label: ['0.8125rem', { lineHeight: '1.4', fontWeight: '600' }],
      },
      borderRadius: {
        button: '10px',
        card: '18px',
        panel: '24px',
        badge: '999px',
      },
      maxWidth: {
        container: '1240px',
        headline: '820px',
      },
      spacing: {
        'section-y': 'var(--space-section)',
        'section-y-compact': 'var(--space-section-compact)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'node-pulse': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '1' },
        },
        'flow-dash': {
          to: { strokeDashoffset: '-24' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'node-pulse': 'node-pulse 3.2s ease-in-out infinite',
        'flow-dash': 'flow-dash 1.4s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
