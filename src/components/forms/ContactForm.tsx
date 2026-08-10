'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  FieldWrapper,
  inputClassName,
  selectClassName,
  textareaClassName,
} from '@/components/forms/FormField';
import {
  attachmentPolicy,
  budgetOptions,
  contactCopy,
  industryOptions,
  serviceOptions,
  timelineOptions,
} from '@/content/contact';
import type { Locale } from '@/i18n/locales';
import { Link } from '@/i18n/navigation';
import { trackEvent } from '@/lib/analytics';
import { buildContactSchema, contactDefaultValues, type ContactInput } from '@/lib/validation';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/** Cloudflare Pages에서도 별도 서버 함수 없이 동작하는 Formspree 문의 엔드포인트. */
const CONTACT_FORM_ENDPOINT = 'https://formspree.io/f/xaeweapv';

export function ContactForm({
  defaultService = '',
  defaultIndustry = '',
}: {
  defaultService?: string;
  defaultIndustry?: string;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations('Form');
  const tCommon = useTranslations('Common');
  const copy = contactCopy[locale];
  const industries = industryOptions[locale];
  const services = serviceOptions[locale];
  const budgets = budgetOptions[locale];
  const timelines = timelineOptions[locale];

  const [status, setStatus] = useState<Status>('idle');
  const started = useRef(false);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(buildContactSchema(locale)),
    defaultValues: {
      ...contactDefaultValues(locale),
      service: services.some((option) => option.value === defaultService) ? defaultService : '',
      industry: industries.includes(defaultIndustry) ? defaultIndustry : '',
    },
    mode: 'onBlur',
  });

  const errorEntries = Object.entries(errors).filter(([name]) => name !== 'locale');

  const onFirstInteraction = () => {
    if (started.current) return;
    started.current = true;
    trackEvent('contact_form_start', { section: 'contact-form' });
  };

  const onSubmit = async (values: ContactInput) => {
    setStatus('submitting');
    trackEvent('contact_form_submit', { section: 'contact-form', service_type: values.service });

    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('request failed');

      setStatus('success');
      trackEvent('contact_form_success', { section: 'contact-form', service_type: values.service });
      reset(contactDefaultValues(locale));
    } catch {
      setStatus('error');
      trackEvent('contact_form_error', { section: 'contact-form' });
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-card border border-accent/40 bg-accent-soft p-8 text-center" role="status">
        <h2 className="text-h3 text-ink-primary-dark">{copy.successTitle}</h2>
        <p className="mt-4 text-body-l text-ink-secondary-dark">{copy.successMessage}</p>
        <button
          className="mt-8 min-h-[52px] rounded-button border border-line-dark px-6 text-[15px] font-semibold text-ink-primary-dark hover:border-accent hover:text-accent"
          onClick={() => setStatus('idle')}
          type="button"
        >
          {t('newInquiry')}
        </button>
      </div>
    );
  }

  return (
    <form
      className="rounded-card border border-line-light bg-surface-white p-6 md:p-8"
      noValidate
      onChange={onFirstInteraction}
      onSubmit={handleSubmit(onSubmit, () => {
        trackEvent('contact_form_error', { section: 'contact-form' });
        errorSummaryRef.current?.focus();
      })}
    >
      <input type="hidden" value={locale} {...register('locale')} />

      {/* 오류 요약 — 마스터 문서 20장 */}
      <div ref={errorSummaryRef} tabIndex={-1}>
        {errorEntries.length > 0 ? (
          <div className="mb-6 rounded-button border border-state-error bg-state-error/10 px-5 py-4" role="alert">
            <p className="text-small font-semibold text-state-error">
              {errorEntries.length}
              {t('errorSummaryPrefix')}
            </p>
            <ul className="mt-2 flex list-disc flex-col gap-1 pl-5">
              {errorEntries.map(([name, error]) => (
                <li className="text-[13px] text-state-error" key={name}>
                  <a className="underline underline-offset-2" href={`#${name}`}>
                    {error?.message as string}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <fieldset className="border-0 p-0" disabled={status === 'submitting'}>
        <legend className="sr-only">{t('requiredSection')}</legend>

        <h2 className="text-h4 text-ink-primary-light">{t('requiredSection')}</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <FieldWrapper error={errors.company?.message} id="company" label={t('company')} optionalLabel={tCommon('optional')} required requiredLabel={tCommon('required')}>
            <input
              aria-describedby={errors.company ? 'company-error' : undefined}
              aria-invalid={Boolean(errors.company)}
              autoComplete="organization"
              className={inputClassName(Boolean(errors.company))}
              id="company"
              type="text"
              {...register('company')}
            />
          </FieldWrapper>

          <FieldWrapper error={errors.name?.message} id="name" label={t('name')} optionalLabel={tCommon('optional')} required requiredLabel={tCommon('required')}>
            <input
              aria-describedby={errors.name ? 'name-error' : undefined}
              aria-invalid={Boolean(errors.name)}
              autoComplete="name"
              className={inputClassName(Boolean(errors.name))}
              id="name"
              type="text"
              {...register('name')}
            />
          </FieldWrapper>

          <FieldWrapper error={errors.email?.message} id="email" label={t('email')} optionalLabel={tCommon('optional')} required requiredLabel={tCommon('required')}>
            <input
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={Boolean(errors.email)}
              autoComplete="email"
              className={inputClassName(Boolean(errors.email))}
              id="email"
              inputMode="email"
              type="email"
              {...register('email')}
            />
          </FieldWrapper>

          <FieldWrapper error={errors.phone?.message} id="phone" label={t('phone')} optionalLabel={tCommon('optional')} required requiredLabel={tCommon('required')}>
            <input
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              aria-invalid={Boolean(errors.phone)}
              autoComplete="tel"
              className={inputClassName(Boolean(errors.phone))}
              id="phone"
              inputMode="tel"
              type="tel"
              {...register('phone')}
            />
          </FieldWrapper>

          <FieldWrapper error={errors.industry?.message} id="industry" label={t('industry')} optionalLabel={tCommon('optional')} required requiredLabel={tCommon('required')}>
            <select
              aria-describedby={errors.industry ? 'industry-error' : undefined}
              aria-invalid={Boolean(errors.industry)}
              className={selectClassName(Boolean(errors.industry))}
              id="industry"
              {...register('industry')}
            >
              <option value="">{tCommon('selectPlaceholder')}</option>
              {industries.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FieldWrapper>

          <FieldWrapper error={errors.service?.message} id="service" label={t('service')} optionalLabel={tCommon('optional')} required requiredLabel={tCommon('required')}>
            <select
              aria-describedby={errors.service ? 'service-error' : undefined}
              aria-invalid={Boolean(errors.service)}
              className={selectClassName(Boolean(errors.service))}
              id="service"
              {...register('service')}
            >
              <option value="">{tCommon('selectPlaceholder')}</option>
              {services.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FieldWrapper>
        </div>

        <FieldWrapper
          className="mt-5"
          error={errors.problem?.message}
          hint={t('problemHint')}
          id="problem"
          label={t('problem')}
          optionalLabel={tCommon('optional')}
          required
          requiredLabel={tCommon('required')}
        >
          <textarea
            aria-describedby={errors.problem ? 'problem-error problem-hint' : 'problem-hint'}
            aria-invalid={Boolean(errors.problem)}
            className={textareaClassName(Boolean(errors.problem))}
            id="problem"
            {...register('problem')}
          />
        </FieldWrapper>

        <h2 className="mt-10 text-h4 text-ink-primary-light">{t('optionalSection')}</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <FieldWrapper id="website" label={t('website')} optionalLabel={tCommon('optional')}>
            <input className={inputClassName()} id="website" placeholder="https://" type="url" {...register('website')} />
          </FieldWrapper>

          <FieldWrapper id="region" label={t('region')} optionalLabel={tCommon('optional')}>
            <input className={inputClassName()} id="region" type="text" {...register('region')} />
          </FieldWrapper>

          <FieldWrapper id="budget" label={t('budget')} optionalLabel={tCommon('optional')}>
            <select className={selectClassName()} id="budget" {...register('budget')}>
              <option value="">{tCommon('selectPlaceholder')}</option>
              {budgets.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FieldWrapper>

          <FieldWrapper id="timeline" label={t('timeline')} optionalLabel={tCommon('optional')}>
            <select className={selectClassName()} id="timeline" {...register('timeline')}>
              <option value="">{tCommon('selectPlaceholder')}</option>
              {timelines.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FieldWrapper>
        </div>

        <FieldWrapper className="mt-5" hint={t('existingSystemHint')} id="existingSystem" label={t('existingSystem')} optionalLabel={tCommon('optional')}>
          <textarea aria-describedby="existingSystem-hint" className={textareaClassName()} id="existingSystem" {...register('existingSystem')} />
        </FieldWrapper>

        <div className="mt-5 flex items-start gap-3">
          <input
            className="mt-1 h-5 w-5 shrink-0 rounded border-line-light accent-[color:var(--color-accent-deep)]"
            id="governmentProgram"
            type="checkbox"
            {...register('governmentProgram')}
          />
          <label className="text-body text-ink-primary-light" htmlFor="governmentProgram">
            {t('governmentProgram')}
          </label>
        </div>

        {/* honeypot — 사람에게는 보이지 않는 봇 방지 필드 */}
        <div aria-hidden="true" className="absolute h-px w-px overflow-hidden opacity-0">
          <label htmlFor="hp">{t('honeypotLabel')}</label>
          <input autoComplete="off" id="hp" tabIndex={-1} type="text" {...register('hp')} />
        </div>

        {/* 개인정보 동의 */}
        <div className="mt-8 rounded-button border border-line-light bg-surface-light p-5">
          <div className="flex items-start gap-3">
            <input
              aria-describedby="consent-detail"
              aria-invalid={Boolean(errors.consent)}
              className="mt-1 h-5 w-5 shrink-0 rounded border-line-light accent-[color:var(--color-accent-deep)]"
              id="consent"
              type="checkbox"
              {...register('consent')}
            />
            <div>
              <label className="text-body font-semibold text-ink-primary-light" htmlFor="consent">
                {copy.consentLabel}
              </label>
              <p className="mt-2 text-[13px] text-ink-secondary-light" id="consent-detail">
                {copy.consentDetail} <Link className="underline underline-offset-2" href="/privacy">{t('consentPrivacyLink')}</Link>
              </p>
            </div>
          </div>
          {errors.consent ? (
            <p className="mt-3 text-[13px] font-medium text-state-error" id="consent-error" role="alert">
              {errors.consent.message}
            </p>
          ) : null}
        </div>

        <p className="mt-5 text-[13px] text-ink-secondary-light">{attachmentPolicy[locale]}</p>

        {status === 'error' ? (
          <p className="mt-6 rounded-button border border-state-error bg-state-error/10 px-5 py-4 text-small text-state-error" role="alert">
            {copy.errorMessage}
          </p>
        ) : null}

        <button
          className="mt-8 inline-flex min-h-[52px] w-full items-center justify-center rounded-button bg-accent-deep px-6 text-[15px] font-semibold text-white transition-colors hover:bg-accent-deep/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          type="submit"
        >
          {status === 'submitting' ? t('submitting') : copy.submitLabel}
        </button>
      </fieldset>
    </form>
  );
}
