# Wanderlic — Travel Booking Landing Page

A production-quality travel booking landing page built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Features a fully interactive booking search experience with a Mediterranean-editorial design language.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-e64ee6?logo=framer)

---

## ✨ Features

### Interactive Booking Search
- **Multi-vertical tabs** — Hotels, Flights, Trains, Attractions, and Flight + Hotel. Each tab reconfigures the form labels and search copy with an animated transition.
- **Destination picker** — searchable dropdown (city, country, or vibe keyword) with curated popular destinations, staggered reveal, animated selection checkmark, and free-text fallback for any destination.
- **Dual-month range calendar** — full date-range selection with a spring-animated selection pill that *glides* between dates (`layoutId`), animated range band, month navigation with slide transitions, and auto-close with confirmation on range completion.
- **Guest & room selector** — stepper controls with rolling number animations, minimum-value guards, and an explicit Done action.
- **Search flow states** — idle → searching (spinner) → success (spring checkmark), with a toast notification summarizing results.
- **Toast system** — centralized, auto-dismissing notification capsule confirming every user action (destination set, dates confirmed, guests saved, search results, trip-mode toggle).

### Motion & Polish
- Word-by-word hero headline reveal with 3D rotation
- Scroll-linked parallax on the hero photograph (translate + scale + scrim opacity)
- Shared-layout tab pill and calendar-underline transitions (spring physics)
- Scroll progress indicator
- Editorial stats ticker (infinite marquee)
- Bento destination grid with viewport-triggered stagger reveals and hover zoom
- `prefers-reduced-motion` respected globally

### Design System
- **Direction:** Mediterranean editorial — warm paper surfaces, disciplined accents, serif/sans typographic pairing
- **Typography:** [Fraunces](https://fonts.google.com/specimen/Fraunces) (display serif, italic accents) + [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (UI), self-hosted via `next/font`
- **Palette:** semantic token roles — `paper` (base), `ink` (text), `ocean` (interactive), `terra` (accent), `sand` (hairlines)
- Locally served, optimized hero imagery (`next/image`, AVIF/WebP, priority preload)

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | ≥ 18.18 (LTS recommended) |
| npm | ≥ 9 |

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd LandingPageTravelBooking

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint checks |

> **Note:** stop the dev server before running `npm run build` — both write to `.next/`.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, font loading, metadata
│   ├── page.tsx            # Landing page composition
│   └── globals.css         # Design tokens, base styles, utilities
├── components/
│   ├── Navbar.tsx          # Fixed nav with scroll-aware styling
│   ├── ScrollProgress.tsx  # Top-of-page scroll indicator
│   ├── StatsMarquee.tsx    # Editorial stats ticker
│   ├── Destinations.tsx    # Bento grid of featured destinations
│   ├── Footer.tsx          # CTA card, link columns, legal
│   ├── ui/
│   │   └── Toast.tsx       # App-wide notification capsule
│   └── hero/
│       ├── Hero.tsx        # Parallax hero, headline, layout stack
│       ├── SearchBar.tsx   # Booking search orchestrator (state owner)
│       ├── SearchTabs.tsx  # Vertical tabs (Hotels / Flights / …)
│       ├── DestinationPicker.tsx  # Searchable destination dropdown
│       ├── Calendar.tsx    # Dual-month range calendar
│       ├── GuestSelector.tsx      # Guests & rooms stepper
│       └── FeatureBadges.tsx      # Trust indicators strip
└── lib/
    ├── calendar.ts         # Pure date/grid utilities (framework-free)
    └── motion.ts           # Shared Framer Motion variants & easings
public/
├── hero-santorini.jpg      # Hero photograph (locally served)
└── alley-greece.jpg        # Spare imagery
```

### Architecture Notes

- **State ownership** — `SearchBar` is the single state owner for the booking flow (tab, destination, dates, guests, panel visibility, search status, toasts). Child components are presentational and receive props + callbacks.
- **Pure utilities** — calendar math (`buildMonthGrid`, `nightsBetween`, `isBetween`, …) lives in `lib/calendar.ts` with no framework imports, keeping it unit-testable in isolation.
- **Stacking strategy** — the hero section is an isolated stacking context (`isolate`); background clipping is scoped to an inner wrapper so popovers can overflow the section without being cut off.
- **Timer hygiene** — all `setTimeout` handles (toast dismissal, auto-close, search simulation) are tracked in a ref and swept on unmount.

---

## 🎨 Design Tokens

Defined in `tailwind.config.ts`:

| Token | Value | Role |
|-------|-------|------|
| `paper` | `#faf6ef` | Page background (warm cream) |
| `paper-deep` | `#f3ecdf` | Quiet raised surfaces |
| `ink` | `#1a2530` | Primary text (blue-slate) |
| `ocean-700` | `#144a67` | Interactive elements, CTAs |
| `terra-500` | `#c65b33` | Semantic accents (italic words, marks) |
| `sand-*` | creams | Hairlines and dividers |

**Rule of use:** `ocean` is reserved for interactive elements; `terra` for small semantic accents. Neither is used decoratively at scale — this keeps the visual hierarchy legible.

---

## ⚡ Performance

- **First Load JS:** ~163 kB (landing route, gzipped) — within the 150–300 kB landing budget
- Static prerendering (`○` route) — zero server work per request
- Hero image served locally with `priority` + `fetchpriority` hints via `next/image`
- Fonts subset and self-hosted through `next/font` (zero external font requests, `font-display: swap`)
- Animations restricted to compositor-friendly properties (`transform`, `opacity`)
- Scroll effects driven by Framer Motion's `useScroll` (passive, rAF-batched) — no scroll-handler churn

---

## ♿ Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`) with labeled headings
- Full keyboard operability: calendar days, steppers, tabs, and pickers are native `<button>` elements; destination search submits on Enter
- `aria-label`s on icon-only controls (month navigation, steppers, menu, language)
- Disabled states communicated visually **and** via the `disabled` attribute
- `prefers-reduced-motion` collapses all animation durations globally
- Contrast-checked text/overlay pairings on photography (scrim + vignette)

---

## 🧩 Tech Stack Decisions

| Choice | Rationale |
|--------|-----------|
| **Next.js App Router** | Static prerendering for a landing page, built-in image/font optimization |
| **Framer Motion** | Shared-layout (`layoutId`) transitions and scroll-linked values that CSS cannot express |
| **Tailwind CSS** | Token-driven design system co-located with markup; zero runtime CSS |
| **lucide-react** | Consistent 1.5px-stroke icon language, tree-shakeable imports |
| **Local hero imagery** | Deterministic paint — no third-party image CDN on the critical path |

---

## 📄 License

This project is provided as-is for portfolio and educational use. Photography sourced from [Unsplash](https://unsplash.com/license) under the Unsplash License.
