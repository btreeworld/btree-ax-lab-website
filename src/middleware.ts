import createMiddleware from 'next-intl/middleware';

import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // api, _next, 정적 파일, 확장자가 있는 파일은 제외한다.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
