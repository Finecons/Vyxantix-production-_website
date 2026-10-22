# VyxAntix — Production Website

Modern, responsive marketing website for **VyxAntix Cloud ERP** built from the Figma design specifications.

## 🚀 Features

- **4 Core Pages + Legal Pages**:
  - `index.html` (Home) — Hero with interactive ERP dashboard mockup, 6 core modules, live interactive tax invoice preview, comparison matrix, ROI metrics, FAQ, and CTA.
  - `product.html` (Product) — In-depth breakdown of Finance & Accounting, Inventory & Warehouse, Sales & Invoicing, Purchase & Procurement, Manufacturing (BOM), and HR & Payroll.
  - `pricing.html` (Pricing) — Monthly / Annual toggle with 20% discount math, Starter / Growth / Enterprise plan cards, and complete feature comparison table with sticky header/columns.
  - `contact.html` (Contact & Demo) — Interactive demo booking form with real-time validation, business email checks, custom time-slot chips, multi-select modules, direct office contact info, and Google Maps embed.
  - `privacy.html`, `terms.html`, and `404.html`.
- **Fully Responsive**:
  - Ultra-wide monitors (`1440px`–`2560px+`)
  - Standard laptops (`1025px`–`1439px`)
  - Tablets (`768px`–`1024px`) with responsive layout wrapping & horizontal-scroll tables
  - Mobile devices (`< 768px`) with sticky navigation, full-screen slide drawer, and touch-friendly controls
- **Design System & Aesthetics**:
  - Curated brand palette (Deep Slate Navy `#0F172A`, Vivid Teal `#0D9488`, Warm Amber `#D97706`, Soft Mint `#F0FDF4`)
  - Modern typography: Plus Jakarta Sans & Inter via Google Fonts
  - High-res vector SVGs, trust badges, and interactive UI mockups
  - Free trial CTAs redirecting directly to Demo/Contact workflow

## 🛠️ Tech Stack

- **Core**: HTML5, Vanilla JavaScript (ES Modules)
- **Styling**: Vanilla CSS (Tokens, CSS Grid, Flexbox, Glassmorphism, Micro-animations)
- **Bundler & Dev Server**: Vite Multi-Page Application

## 💻 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm / yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build

```bash
npm run build
```

Compiled static files will be emitted to the `dist/` directory, ready to deploy to Vercel, Netlify, Cloudflare Pages, AWS S3, or any static web host.

### Preview Production Build

```bash
npm run preview
```

---

© 2026 VyxAntix Technologies. All rights reserved.
