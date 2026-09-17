import React from 'react';
import BrandMark from '@/components/BrandMark';
import { brand } from '@/brand/config';

export default function IdentityTab() {
  return <section className="rounded-xl border border-border bg-card p-6">
    <div className="flex items-center gap-3 mb-4"><BrandMark /><h3 className="font-semibold">{brand.name} identity</h3></div>
    <p className="text-sm text-muted-foreground">Identity is maintained in the versioned source. This screen is read-only.</p>
    <dl className="grid gap-4 sm:grid-cols-2 mt-5">
      {Object.entries(brand).map(([key,value]) => <div key={key}><dt className="text-xs text-muted-foreground">{key}</dt><dd className="text-sm mt-1">{value}</dd></div>)}
    </dl>
    <p className="text-sm text-muted-foreground mt-5">Web icons are prepared. Native assets are candidates; public brand sign-off remains blocked pending licensing, accessibility and platform review.</p>
    <a href={brand.supportPath} className="inline-block text-primary underline mt-4">CodeForge support</a>
  </section>;
}
