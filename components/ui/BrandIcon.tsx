'use client';

import React, { useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import * as SimpleIcons from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';
import { getThemeServerSnapshot, getThemeSnapshot, subscribeTheme } from '@/lib/theme';

interface BrandIconProps {
  brand?: string;
  name: string;
  size?: number;
  backgroundColor?: string;
  className?: string;
}

export const BrandIcon: React.FC<BrandIconProps> = ({
  brand,
  name,
  size = 48,
  backgroundColor = '#f4f4f5',
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);
  const simpleIcons = SimpleIcons as unknown as Record<string, SimpleIcon>;
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);

  const getSimpleIcon = () => {
    if (!brand) return null;

    try {
      // simple-icons keys omit hyphens.
      const normalized = brand.replace(/-/g, '');

      const formats = [
        `si${normalized.charAt(0).toUpperCase()}${normalized.slice(1).toLowerCase()}`,
        `si${normalized.toUpperCase()}`,
        `si${normalized.toLowerCase()}`,
      ];

      for (const iconKey of formats) {
        const icon = simpleIcons[iconKey];
        if (icon) {
          const hex = icon.hex;
          const r = parseInt(hex.substr(0, 2), 16);
          const g = parseInt(hex.substr(2, 2), 16);
          const b = parseInt(hex.substr(4, 2), 16);
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;

          let bgColor: string;

          if (brightness < 80) {
            if (theme === 'dark') {
              bgColor = 'rgba(255, 255, 255, 0.12)';
            } else {
              bgColor = 'rgba(0, 0, 0, 0.06)';
            }
          } else if (brightness < 140) {
            if (theme === 'dark') {
              bgColor = `rgba(${r}, ${g}, ${b}, 0.25)`;
            } else {
              bgColor = `rgba(${r}, ${g}, ${b}, 0.15)`;
            }
          } else {
            if (theme === 'dark') {
              bgColor = `rgba(${r}, ${g}, ${b}, 0.18)`;
            } else {
              bgColor = `rgba(${r}, ${g}, ${b}, 0.12)`;
            }
          }

          return (
            <div
              className="flex items-center justify-center rounded-lg transition-colors duration-200"
              style={{
                backgroundColor: bgColor,
                width: size,
                height: size,
              }}
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width={size * 0.55}
                height={size * 0.55}
                fill={`#${icon.hex}`}
                className={className}
              >
                <title>{icon.title}</title>
                <path d={icon.path} />
              </svg>
            </div>
          );
        }
      }
    } catch (error) {
      console.error(`Failed to load icon for brand: ${brand}`, error);
    }

    return null;
  };

  const simpleIcon = getSimpleIcon();

  if (simpleIcon) {
    return simpleIcon;
  }

  if (brand && !imageError) {
    const iconName = brand.toLowerCase().replace(/-/g, '');
    const iconSize = Math.round(size * 0.55);

    return (
      <div
        className="flex items-center justify-center rounded-lg"
        style={{
          backgroundColor: `${backgroundColor}30`,
          width: size,
          height: size,
        }}
      >
        <Image
          src={`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${iconName}.svg`}
          alt={name}
          width={iconSize}
          height={iconSize}
          className={className}
          onError={() => setImageError(true)}
          unoptimized
        />
      </div>
    );
  }

  const initial = name.charAt(0).toUpperCase();
  const fontSize = size * 0.4;

  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: size,
        height: size,
        backgroundColor: backgroundColor || '#f4f4f5',
        borderRadius: '8px',
      }}
    >
      <span
        style={{
          fontSize: `${fontSize}px`,
          fontWeight: 700,
          color: '#ffffff',
        }}
      >
        {initial}
      </span>
    </div>
  );
};
