# Zenosite — Product Requirements Document

**Last updated:** 2026-05-13
**Covers code through:** 2026-05-13 (6974c96)
**Shortcode:** zs
**Status:** Live

---

## TL;DR
Zenosite is the public marketing website for the Zeno loyalty top-up platform. Static HTML/CSS/JS, no backend.
Live at siteez.labzeno.com. Pages: landing (index), merchant, partner, EULA.
Key constraint: pure static — no build step, no framework; Nginx serves files directly from ~/projects/zenosite/.

> **Agent quick-find:** product purpose → §1 | pages & flows → §3 | infrastructure → §9 | design decisions → §10 | changelog → §12

---

## §1. Product Overview

Zenosite is the marketing and legal presence for the Zeno loyalty ecosystem. It targets merchants considering integration, potential channel partners, and end users seeking legal/terms information.

**Core value proposition:** Positions Zeno as a world-class loyalty top-up platform. Drives merchant sign-ups and partner interest.

**Business context:** Part of the Labzeno ecosystem. Entry point for merchants and partners before they interact with the Zeno merchant or partner portals.

---

## §2. User Roles & Personas

### Visitor (anonymous)
- **Who:** Prospective merchants, channel partners, or end users
- **Goals:** Understand what Zeno offers, sign up or contact
- **Can:** Browse all pages, click CTAs
- **Cannot:** Log in or transact (no auth)

---

## §3. Core Features & User Flows

### Landing Page (index.html)
Hero → Features → How It Works → Pricing Tiers → Social Proof → FAQ → CTA footer.

### Merchant Page (merchant.html)
Dedicated pitch for merchants: integration benefits, onboarding flow, CTA.

### Partner Page (partner.html)
Channel partner programme: revenue share model, onboarding, CTA.

### EULA (eula.html)
Legal terms for end users.

---

## §4. Data Model

N/A — static site, no database.

---

## §5. API Reference

N/A — no backend.

---

## §6. Frontend Architecture

Pure HTML/CSS/JS. No framework, no build step. All pages share a common asset structure under `assets/`.
CSS: custom properties for theming, mobile-first responsive. JS: vanilla, minimal.

---

## §9. Infrastructure & Environment

- **Live URL:** https://siteez.labzeno.com
- **Served by:** Nginx, static files from `~/projects/zenosite/`
- **No process manager needed** — purely static

---

## §10. Non-Obvious Decisions

- **No framework** — keeps deployment trivial (no build CI needed) and load time minimal.
- **Feedback FAB removed** — was dev-only, removed at commit 40d9c57. Static marketing sites don't need in-app feedback.
- **Reveal animations default visible** — JS reveal animations have a CSS fallback so content is always visible even if JS is slow or blocked (fixed in session ending at 40d9c57).

- **SVG icon system** — inline SVG sprite (`<svg style="display:none">` with `<symbol>` defs) + `.z-icon` CSS class. Icons use `currentColor` and `1em` sizing. Add new icons by adding `<symbol>` to sprite block, reference with `<svg class="z-icon"><use href="#i-name"/></svg>`.

---

## Current State (2026-05-13)

**What was done this session:**
- Full icon overhaul: 40+ emoji replaced with premium SVG stroke icons across index.html, merchant.html, partner.html
- DPO email updated from server@expzeno.com to dpo@expzeno.com across all pages (index, merchant, partner, privacy-policy)
- PRD.md changelog updated, CLAUDE.md updated with icon system note

**What's pending:**
- User review of icon overhaul (user said "surprise me when I land")
- Contact form decision (from prior session — Lion hasn't decided)
- Tier EXP thresholds still TBD
- Global CLAUDE.md now requires `docs/INDEX.md` pattern — zenosite hasn't migrated yet

**Git:** 3 commits ahead of remote (8b12314 icon overhaul, 870409e docs update, 6974c96 DPO email)

---

## §11. Glossary

- **Zeno** — the loyalty top-up platform this site markets
- **FAB** — floating action button (feedback widget, now removed)

---

## §12. Changelog

## 2026-05-12 — Premium icon overhaul + brand design polish
- All 40+ emoji icons replaced with inline SVG stroke icons (Lucide-style, 24x24 viewBox, consistent 2px stroke weight)
- SVG sprite block + `.z-icon` CSS added to index.html, merchant.html, partner.html
- Diamond brand accent added to centered section headers
- Section divider gradient improved with brand+gold blend
- Star ratings in testimonials now use filled SVG stars instead of emoji

## 2026-05-08 — 30-round content revamp, feedback FAB removed
- Hero, features, tiers, FAQ, social proof all rewritten (rounds 1–26)
- Mobile header nav-cta hidden on mobile
- Feedback FAB removed from all pages
- Reveal animation bug fixed — content always visible by default
