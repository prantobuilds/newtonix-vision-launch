## Goal

Align Newtonix Tech with its parent VISER X: same service catalog, same typography (Manrope display + Inter body), and a VISER X-inspired electric-blue accent — while keeping the premium dark/light SaaS feel already built.

## 1. Services restructure

Replace the current flat services grid with **two clearly grouped categories**, matching viserx.com/services:

**Web Development**
- Website Development
- Ecommerce Website
- Website Speed Optimization
- Website Maintenance

**Software Solutions**
- ERP
- E‑Commerce Platform
- Project Management
- CRM
- HR Management
- Accounts & Finance
- Payroll
- Mobile App

Implementation:
- Each item = glass card with a Lucide icon, 1‑line tagline, 3 bullet sub‑features, "Learn more" affordance.
- Two-column section header ("Web Development" / "Software Solutions") with category description.
- Tabs (Web / Software / All) on desktop, accordion-style stacked on mobile.
- Update the Portfolio section's category badges to map to these new categories.

## 2. Typography — Manrope + Inter

- Add Google Fonts `<link>` for **Manrope (500/600/700/800)** and **Inter (400/500/600)** in `src/routes/__root.tsx`.
- In `src/styles.css` `@theme`: `--font-display: "Manrope", sans-serif;` and `--font-sans: "Inter", sans-serif;`.
- Headings + nav/logo → `font-display`; body, buttons, cards → `font-sans`.
- Tighten heading tracking (`-0.02em`) to match VISER X's look.

## 3. Color palette — VISER X inspired

Pull the signature electric blue from viserx.com and re-tune tokens (kept in OKLCH, works in both themes):

- `--brand`: electric blue ~ `oklch(0.62 0.22 258)` (≈ #2F6BFF)
- `--brand-glow`: lighter cyan-blue for gradient ends
- Light mode: near-white background, deep ink text (matches VISER X home)
- Dark mode: keep current deep navy but shift accent to the new brand blue
- Update `--gradient-primary`, `--shadow-elegant`, button + link hover states, hero mesh colors.
- Pill-shaped primary CTA (fully rounded) to match VISER X's "Get Free Assessment" button.

## 4. Design cues borrowed from VISER X

- **Top utility bar** (thin strip above navbar) with "Revenue driven for our clients" style stat + phone/WhatsApp contact.
- **Clutch-style rating chip** ("5.0 ★★★★★") near the hero headline as a trust signal.
- **"120+ Brands That Chose Us"** logo marquee strip under the hero (using monochrome placeholder marks until real logos provided).
- **Pill buttons** + subtle search-style input styling on contact form.
- Hero headline split into two lines, very large display weight, with the abstract gradient visual on the right (keep existing `hero-visual.jpg`).

## 5. Anything else worth considering

Optional add-ons you can pick from — I'll only include what you confirm:

- a. **Industries served** strip (Retail, Manufacturing, Education, Healthcare, Fintech) — VISER X has this.
- b. **Sister-brand callout** card linking back to viserx.com ("Part of the VISER X group").
- c. **Tech-stack logos** band (React, Node, Laravel, Flutter, PostgreSQL…) to reinforce credibility.
- d. **FAQ accordion** (5–7 Qs) — good for SEO + lead objection handling.
- e. **Animated stat counters** (projects delivered, clients, countries).
- f. **Sticky "Get Free Quote" mini-bar** on mobile.

## Files to touch

- `src/styles.css` — tokens, fonts, gradients, pill button utility
- `src/routes/__root.tsx` — Manrope + Inter `<link>` tags, updated SEO
- `src/routes/index.tsx` — new Services section (grouped + tabs), top utility bar, rating chip, logo marquee, Portfolio category updates, optional add-ons
- (no backend / no new routes)

## Open questions before I build

1. Confirm the **8 software items** above (you wrote "MObile app" — assuming "Mobile App").
2. Which **optional add-ons (a–f)** should I include?
3. Should the **light mode become the default** (matching viserx.com), or keep **dark as default** with toggle?
