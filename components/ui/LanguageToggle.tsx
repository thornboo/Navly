'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Globe } from 'lucide-react';
import { localeNames, type Locale } from '@/i18n/config';
import { MotionButton } from './motion-button';

type LanguageToggleProps = {
  className?: string;
  showLabel?: boolean;
  variant?: React.ComponentProps<typeof MotionButton>['variant'];
  size?: React.ComponentProps<typeof MotionButton>['size'];
};

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className,
  showLabel = true,
  variant = 'topbarIcon',
  size = 'default',
}) => {
  const t = useTranslations('common');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale: Locale = locale === 'zh' ? 'en' : 'zh';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <MotionButton
      variant={variant}
      size={size}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className={className ?? (showLabel ? 'h-9 gap-2 px-3 text-sm' : undefined)}
      title={t('switchToLanguage', { language: locale === 'zh' ? 'English' : '简体中文' })}
    >
      <Globe size={16} />
      {showLabel ? <span className="font-medium">{localeNames[locale]}</span> : null}
    </MotionButton>
  );
};
