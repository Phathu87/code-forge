import React from 'react';
import { brand } from '@/brand/config';

/** The existing CodeForge code mark, extracted into one vector source. */
export default function BrandMark({ className = 'w-8 h-8', decorative = true }) {
  return <img src="/brand/mark.svg" width="32" height="32" className={className} alt={decorative ? '' : brand.name} aria-hidden={decorative || undefined} />;
}
