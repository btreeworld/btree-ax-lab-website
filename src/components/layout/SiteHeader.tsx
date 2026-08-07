'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { Logo } from '@/components/layout/Logo';
import { Button } from '@/components/ui/Button';
import { cn } from '@/components/ui/cn';
import { Link, usePathname } from '@/i18n/navigation';
import type { Locale } from '@/i18n/locales';
import { cta, mobileTrackRecordLink, navigation, site } from '@/content/site';

/**
 * 헤더 — 마스터 문서 6.1
 * - 첫 화면은 투명, 스크롤 이후 딥 네이비 + 약한 블러
 * - 데스크톱 76px / 모바일 64px, 항상 상단 고정
 * - 데스크톱 우측 CTA, 모바일은 메뉴 안의 전체 폭 버튼
 * - 키보드 포커스 표시와 Esc 닫기 지원
 */
export function SiteHeader() {
  const locale = useLocale() as Locale;
  const t = useTranslations('Header');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const nav = navigation[locale];
  const ctaContent = cta[locale];
  const trackRecordLink = mobileTrackRecordLink[locale];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 라우트가 바뀌면 모바일 메뉴를 닫는다.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // 메뉴가 열려 있는 동안 배경 스크롤을 막고 Esc 로 닫는다.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled || open
          ? 'border-b border-line-dark bg-bg-primary/92 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-[76px]">
        <Logo ariaLabel={t('logoHome', { brand: site.brand })} />

        <nav aria-label={t('primaryNav')} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'inline-flex min-h-[44px] items-center rounded-button px-4 text-[15px] font-medium transition-colors',
                      active ? 'text-accent' : 'text-ink-secondary-dark hover:text-ink-primary-dark',
                    )}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher tone="dark" />
          <Button
            className="min-h-[44px] px-5 text-[14px]"
            event="cta_ax_diagnosis_click"
            eventPayload={{ section: 'header' }}
            href={ctaContent.primary.href}
          >
            {ctaContent.primary.label}
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <LanguageSwitcher tone="dark" />
          <button
            aria-controls="mobile-navigation"
            aria-expanded={open}
            aria-label={open ? t('closeMenu') : t('openMenu')}
            className="-mr-2 flex h-11 w-11 items-center justify-center rounded-button text-ink-primary-dark"
            onClick={() => setOpen((value) => !value)}
            type="button"
          >
            <span aria-hidden="true" className="relative block h-4 w-6">
              <span
                className={cn(
                  'absolute left-0 h-0.5 w-6 bg-current transition-transform duration-200',
                  open ? 'top-[7px] rotate-45' : 'top-0',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-[7px] h-0.5 w-6 bg-current transition-opacity duration-200',
                  open && 'opacity-0',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 h-0.5 w-6 bg-current transition-transform duration-200',
                  open ? 'top-[7px] -rotate-45' : 'top-[14px]',
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* 모바일 내비게이션 */}
      <div className={cn('border-t border-line-dark bg-bg-primary lg:hidden', open ? 'block' : 'hidden')} id="mobile-navigation">
        <nav aria-label={t('mobileNav')} className="container-page py-6">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  className="flex min-h-[52px] items-center border-b border-line-dark text-[17px] font-medium text-ink-primary-dark"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                className="flex min-h-[52px] items-center border-b border-line-dark text-[17px] font-medium text-ink-primary-dark"
                href={trackRecordLink.href}
              >
                {trackRecordLink.label}
              </Link>
            </li>
          </ul>

          <div className="mt-6 flex flex-col gap-3">
            <Button
              event="cta_ax_diagnosis_click"
              eventPayload={{ section: 'mobile-nav' }}
              fullWidth
              href={ctaContent.primary.href}
            >
              {ctaContent.primary.label}
            </Button>
            <Button
              event="cta_project_consulting_click"
              eventPayload={{ section: 'mobile-nav' }}
              fullWidth
              href={ctaContent.secondary.href}
              variant="secondary"
            >
              {ctaContent.secondary.label}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
