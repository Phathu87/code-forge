# Brand asset inventory



Machine-readable inventory: `src/assets/brand/manifest.json`. Canonical extracted mark: `src/assets/brand/mark.svg`. Generator: `scripts/build-brand.mjs`. Generated public delivery assets live only in `public/brand/`; public/icon.svg is the compatibility favicon copy. Do not edit generated copies independently.



Run `node scripts/build-brand.mjs` with Sharp available in the tool environment, or SHARP_PATH pointing to its installed module. The application build does not require Sharp. Generated PNGs come directly from the vector, never a resized low-resolution bitmap.



| Asset | Origin / licence | Status |

| --- | --- | --- |

| Blue tile / Code2 mark | Existing source styles plus Lucide ISC paths; notice retained | Extracted implementation master; owner release sign-off pending |

| Monochrome / notification / maskable | Newly derived from that master | Candidates; no historical approval claim |

| 32, 180, 192, 512, 1024 PNGs | Vector-derived | Web sizes prepared; 1024 native source candidate |

| Default social image | New composition using existing palette, mark and system font | Generic preview only, no personal data |

| UI icons | lucide-react ISC | Keep required notice |

| UI / code fonts | Named CSS fallbacks only; no font files or remote downloads | No redistribution licence asserted |

| Store screenshots / feature artwork | None published | Must use actual packaged release UI |

| Certificate / achievement artwork | No formal approved set | Trust features disabled; no fabricated awards |



The root production dependency manifests contain no Base44 SDK or plugin. Keep generic React, Vite, Tailwind, Radix and Lucide dependencies; removed platform infrastructure is replaced by the existing Node API. Historical references are retained as provenance and project history. Prototype data and other unfinished screens remain governed by the mock audit, not hidden by rebranding.



PWA manifest and icons are present; no offline worker or install/update lifecycle is claimed. Android launcher sizes and adaptive XML, iOS raster sizes, a Huawei master, Windows icon sizes and a splash mark are prepared under src/assets/brand/platforms. They need target-project resource mapping, asset catalogues, launch integration and package testing. Store screenshots need the actual target builds. The shared master and notification candidate are inputs, not store-ready packages. Recheck current store requirements at submission time.



Social metadata uses a relative asset URL for local/preview compatibility. Set an absolute final-domain image URL and canonical URL after the production domain is selected; validate with target sharing crawlers. Dynamic private profile/project metadata is not generated.



Transactional email templates share restrained text branding, HTML escaping and a full plain-text fallback. Verification and recovery are connected; welcome, security, deletion, milestone, project and verification-family templates are dormant and must only be invoked by genuine server events. No email is sent by asset generation. Email-client rendering and final sender/domain approval remain required.


The Lucide notice is also distributed at `/brand/LUCIDE-LICENSE.txt`. No external image URLs or bundled font-face rules were found in the production source audit. Required third-party notices are retained; developer attribution does not claim exclusive ownership of open-source icon geometry.
