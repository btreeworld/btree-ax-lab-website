import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

/**
 * ESLint flat config — Next.js 16에서 `next lint`가 제거되어 ESLint CLI로 직접 실행한다.
 * 이전 .eslintrc.json의 next/core-web-vitals + next/typescript 구성을 그대로 옮겼다.
 */
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // React Three Fiber는 useFrame 안에서 typed array·three 객체를 직접 바꾸고, 절차적 지오메트리를
    // useMemo에서 Math.random으로 만든다. 렌더 순수성을 전제로 하는 React Compiler 규칙과 맞지
    // 않는 표준 명령형 패턴이고, 이 프로젝트는 React Compiler를 켜지 않는다. 경고로만 남긴다.
    files: ['src/components/three/**/*.{ts,tsx}'],
    rules: {
      'react-hooks/immutability': 'warn',
      'react-hooks/purity': 'warn',
    },
  },
  globalIgnores(['.next/**', '.open-next/**', '.wrangler/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
