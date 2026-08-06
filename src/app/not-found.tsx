import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Section';
import { navigation } from '@/content/site';
import Link from 'next/link';

/** 404 페이지 — 마스터 문서 18.5 */
export default function NotFound() {
  return (
    <section className="hero-gradient relative overflow-hidden py-[160px]">
      <div aria-hidden="true" className="grid-overlay pointer-events-none absolute inset-0 opacity-50" />

      <Container className="relative">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="font-display text-label uppercase tracking-[0.16em] text-accent">404</p>
          <h1 className="mt-5 text-h1 text-ink-primary-dark">요청하신 페이지를 찾을 수 없습니다</h1>
          <p className="mt-6 text-body-l text-ink-secondary-dark">
            주소가 변경되었거나 삭제된 페이지일 수 있습니다. 아래 메뉴에서 필요한 정보를 확인해 주세요.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/">홈으로 이동</Button>
            <Button href="/contact" variant="secondary" withArrow>
              프로젝트 상담 요청
            </Button>
          </div>

          <ul className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  className="text-small text-ink-secondary-dark underline-offset-4 hover:text-accent hover:underline"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
