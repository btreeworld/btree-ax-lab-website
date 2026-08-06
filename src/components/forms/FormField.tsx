'use client';

import type { ReactNode } from 'react';

import { cn } from '@/components/ui/cn';

/**
 * 폼 필드 — 마스터 문서 20장
 * label 을 반드시 입력요소와 연결하고, 오류 메시지는 aria-describedby 로 연결한다.
 */

const fieldBase =
  'w-full min-h-[52px] rounded-button border bg-surface-white px-4 py-3 text-body text-ink-primary-light ' +
  'placeholder:text-ink-secondary-light/60 focus-visible:outline focus-visible:outline-2 ' +
  'focus-visible:outline-offset-1 focus-visible:outline-accent-deep';

export function FieldWrapper({
  id,
  label,
  required,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label className="text-small font-semibold text-ink-primary-light" htmlFor={id}>
        {label}
        {required ? (
          <span className="ml-1 text-state-error" title="필수 입력">
            *<span className="sr-only">필수</span>
          </span>
        ) : (
          <span className="ml-1 text-ink-secondary-light">(선택)</span>
        )}
      </label>
      {children}
      {hint ? (
        <p className="text-[13px] text-ink-secondary-light" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="text-[13px] font-medium text-state-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function inputClassName(hasError?: boolean) {
  return cn(fieldBase, hasError ? 'border-state-error' : 'border-line-light');
}

export function textareaClassName(hasError?: boolean) {
  return cn(fieldBase, 'min-h-[160px] resize-y', hasError ? 'border-state-error' : 'border-line-light');
}

export function selectClassName(hasError?: boolean) {
  return cn(
    fieldBase,
    'appearance-none bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10',
    hasError ? 'border-state-error' : 'border-line-light',
  );
}
