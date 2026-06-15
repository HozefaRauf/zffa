# ZFFA Pricing Estimator — Visual Style Guide

This is the visual design system for the wizard described in
`02-design-brief.md`. It translates the reference quiz-flow images the
client shared into a flatter, more minimal language that fits the existing
ZFFA site — same structure (icon cards that invert to a solid color block on
selection, bold step headers, chunky uppercase buttons), without the
paper/grain texture or vintage display type. Apply these tokens and component
specs to every wizard component.

---

## 1. Design tokens

Extend `src/index.css` `:root` with a fuller rose scale (keep the existing
`--rose`, `--rose-deep`, `--rose-soft`, `--rose-mid`):

```css
:root {
  --rose-50:   #fff1f2;  /* = --rose-soft, keep both names */
  --rose-100:  #ffe1e3;
  --rose-200:  #fecdd3;  /* = --rose-mid */
  --rose-300:  #fca5ad;
  --rose-600:  #c11524;  /* = --rose */
  --rose-700:  #9f0e1b;  /* = --rose-deep */
}
```

Then in `tailwind.config.js`, replace the blue `accent`/`accentSoft` tokens:

```js
colors: {
  surface: '#f8fafc',
  panel: '#ffffff',
  brand: '#0f172a',
  accent: '#c11524',     // was #1d4ed8
  accentSoft: '#fff1f2', // was #e0e7ff
  rose: {
    50: '#fff1f2', 100: '#ffe1e3', 200: '#fecdd3',
    300: '#fca5ad', 600: '#c11524', 700: '#9f0e1b',
  },
},
```

(If `rose-*` Tailwind utilities are already available via the default
palette in your Tailwind version, this `rose` block just pins them to the
exact brand values — `bg-rose-600`, `border-rose-200`, etc. will then match
`--rose` precisely.)

---

## 2. `OptionCard` — the core selectable card

This is the single most-reused component (Category, Product, Quantity, Tier,
Size steps all use it). It directly adapts the reference images' "icon
inverts to a solid circle when selected" pattern.

### Anatomy

```
┌──────────────────┐
│   ⊙ check (sel.)  │ ← only when selected, top-right, animated in
│                   │
│      ( icon )     │ ← circular badge, 48px
│                   │
│   Card title      │ ← 14px semibold
│   $80–$110        │ ← optional price/quantity badge (pill)
└──────────────────┘
```

### Reference implementation (Tailwind + lucide-react + framer-motion)

```jsx
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { ICONS } from '../../utils/iconMap'

export default function OptionCard({ icon, title, subtitle, badge, selected, onClick }) {
  const Icon = ICONS[icon] ?? Check

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group relative flex flex-col items-center gap-3 rounded-2xl border p-4 text-center transition-all duration-200 ease-out
        ${selected
          ? 'border-rose-600 bg-rose-50/60 ring-2 ring-rose-100'
          : 'border-slate-200 bg-white hover:-translate-y-1 hover:border-rose-200 hover:shadow-md active:scale-[0.98]'}`}
    >
      {selected && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-rose-600 text-white shadow-sm"
        >
          <Check size={14} strokeWidth={3} />
        </motion.span>
      )}

      <motion.span
        animate={selected ? { scale: [1, 1.15, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`grid h-12 w-12 place-items-center rounded-full transition-colors duration-200
          ${selected ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-rose-50 group-hover:text-rose-600'}`}
      >
        <Icon size={22} strokeWidth={1.75} />
      </motion.span>

      <span className={`text-sm font-semibold leading-snug ${selected ? 'text-rose-700' : 'text-slate-900'}`}>
        {title}
      </span>

      {subtitle && (
        <span className="text-xs leading-snug text-slate-500">{subtitle}</span>
      )}

      {badge && (
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium
          ${selected ? 'bg-white text-rose-700' : 'bg-slate-100 text-slate-500'}`}>
          {badge}
        </span>
      )}
    </button>
  )
}
```

### States

| State | Border | Icon badge | Title | Card |
|---|---|---|---|---|
| Default | `border-slate-200` | `bg-slate-100`, `text-slate-500` | `text-slate-900` | `bg-white` |
| Hover | `border-rose-200` | `bg-rose-50`, `text-rose-600` (group-hover) | unchanged | lifts `-translate-y-1`, `shadow-md` |
| Selected | `border-rose-600` + `ring-2 ring-rose-100` | `bg-rose-600`, `text-white` | `text-rose-700` | `bg-rose-50/60`, check badge appears (spring scale-in), icon does a quick 1→1.15→1 pulse |
| Press (any) | — | — | — | `active:scale-[0.98]` |

Grid layout: `grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4` (Category
step can use up to 4 columns on desktop since it always has 8 items;
Product/Size/Quantity/Tier steps flex with however many options exist).

---

## 3. Quantity / tier cards without icons

Some `QuantityStep` cards represent a plain quantity (e.g. "250") with no
natural icon. Use the same `OptionCard`, passing a `Hash` icon (from
`lucide-react`) as a neutral default, with the quantity as `title` and the
price range as `badge`:

```jsx
<OptionCard icon="Hash" title="250" badge="$140–$190" selected={...} onClick={...} />
```

Add `Hash` to `iconMap.js`'s import/export list alongside the existing icons.

---

## 4. Step headings

Every step uses the same heading block: a bold title with a short rose
accent underline, plus muted subtext. This is the minimal echo of the
reference images' bold-headline-with-rule treatment, without the double
full-width rules or condensed display font.

```jsx
<div className="mb-6">
  <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
    {heading}
  </h2>
  <span className="mt-2 block h-1 w-12 rounded-full bg-rose-600" aria-hidden="true" />
  {subtext && (
    <p className="mt-3 text-sm leading-relaxed text-slate-500">{subtext}</p>
  )}
</div>
```

- `h2` here is the in-app heading (not to be confused with the 22px
  visualizer-mockup convention used earlier in this conversation).
- The underline is intentionally short (48px) and left-aligned under the
  heading — a quiet signature mark rather than a full rule.

---

## 5. Buttons

Bold, uppercase, generous letter-spacing — directly inspired by "GO BACK" /
"NEXT STEP" in the reference, restyled in rose/neutral instead of
red-on-cream-with-borders.

### Primary ("Next", "Request Exact Quote")

```jsx
<button className="inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-6 py-3
  text-sm font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-150
  hover:-translate-y-0.5 hover:bg-rose-700 hover:shadow-md
  active:translate-y-0 active:scale-[0.97]
  disabled:pointer-events-none disabled:opacity-40">
  Next
</button>
```

### Secondary ("Back", "Edit answers")

```jsx
<button className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3
  text-sm font-bold uppercase tracking-wider text-slate-500 transition-all duration-150
  hover:border-slate-400 hover:text-slate-700
  active:scale-[0.97]
  disabled:pointer-events-none disabled:opacity-40">
  Back
</button>
```

### Ghost / text ("Start Over")

```jsx
<button className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5
  text-sm font-bold uppercase tracking-wider text-slate-400 transition-colors duration-150
  hover:text-rose-600 active:scale-[0.97]">
  Start over
</button>
```

All three share: `rounded-lg`, `font-bold uppercase tracking-wider`,
`active:scale-[0.97]` for press feedback, and `transition-all duration-150`.

### Layout

`WizardShell`'s nav bar: `flex items-center justify-between` with Back on the
left (or `invisible` placeholder on step 0 to preserve layout) and Next on
the right. On `result`, replace this row entirely with the three stacked
buttons from `02` §6.

---

## 6. Step transitions (direction-aware)

Add a `direction` state (`+1` = forward via Next/category-or-product
selection auto-advance if used, `-1` = backward via Back or an Edit jump to
an earlier step). Set it right before changing `stepIndex`:

```js
function goNext() {
  setDirection(1)
  setStepIndex((i) => Math.min(i + 1, steps.length - 1))
}

function goBack() {
  setDirection(-1)
  setStepIndex((i) => Math.max(i - 1, 0))
}

function goToStep(targetIndex) {
  setDirection(targetIndex >= stepIndex ? 1 : -1)
  setStepIndex(targetIndex)
}
```

Variants for the step container:

```jsx
const variants = {
  enter:  (dir) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
}

<AnimatePresence mode="wait" custom={direction}>
  <motion.div
    key={steps[stepIndex]}
    custom={direction}
    variants={variants}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{ duration: 0.25, ease: 'easeOut' }}
  >
    {renderStep()}
  </motion.div>
</AnimatePresence>
```

48px horizontal offset keeps the motion subtle — large enough to register as
"a new screen," small enough not to feel like a slideshow.

---

## 7. Result-screen reveal animation

Staggered entrance using `framer-motion`'s `delay`:

```jsx
<motion.div
  initial={{ scale: 0.5, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-rose-600 text-white"
>
  <Check size={28} strokeWidth={3} />
</motion.div>

<motion.p
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.15, duration: 0.3 }}
  className="text-4xl font-extrabold tracking-tight text-rose-600 sm:text-5xl"
>
  {estimate.price}
</motion.p>

<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.3 }}
>
  {/* breakdown card */}
</motion.div>

<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.45, duration: 0.3 }}
>
  {/* buttons */}
</motion.div>
```

---

## 8. Progress bar

Keep the segmented bar from the earlier mockups, with a color transition on
advance:

```jsx
<div className="flex gap-1.5">
  {Array.from({ length: total }).map((_, i) => (
    <div
      key={i}
      className={`h-1.5 flex-1 rounded-full transition-colors duration-300
        ${i < current ? 'bg-rose-600' : 'bg-slate-200'}`}
    />
  ))}
</div>
<p className="sr-only">Step {current} of {total}</p>
```

(`i < current` where `current` is 1-indexed and `i` is 0-indexed means
segments up to and including the current step are filled.)

---

## 9. Optional accents (drop-in, non-structural)

These are polish layers — easy to add now or skip and revisit later without
touching wizard logic.

### 9a. Notched "ticket" corners on the wizard panel

To echo the reference images' cut-corner card shape on the **outer wizard
frame only** (not on every small `OptionCard` — that would be too busy), add
to `index.css`:

```css
.wizard-panel {
  clip-path: polygon(
    16px 0, calc(100% - 16px) 0, 100% 16px,
    100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%,
    0 calc(100% - 16px), 0 16px
  );
}
```

Apply `wizard-panel` to `WizardShell`'s outer container. Remove the class
(and it falls back to normal rounded corners) if it feels too busy alongside
the card grids — purely a one-line toggle.

### 9b. Optional heading/display font

For extra personality on step headings and the result price (the reference
images use a bold condensed display face), optionally add a second Google
Font alongside the existing Inter — **Sora** (bold, geometric, pairs cleanly
with Inter, available in 700/800 weights):

```html
<link
  href="https://fonts.googleapis.com/css2?family=Sora:wght@700;800&family=Inter:wght@400;500;600;700;800&display=swap"
  rel="stylesheet"
/>
```

```css
.font-display { font-family: 'Sora', 'Inter', ui-sans-serif, sans-serif; }
```

Apply `font-display` to the `h2` in §4 and the price `<p>` in §7. If you'd
rather keep one typeface site-wide, skip this — Inter at `font-extrabold`
already reads as bold/confident.

### 9c. Product images (future-proofing)

`OptionCard` can accept an optional `image` prop (a thumbnail URL) that
renders in place of the icon badge when present, falling back to the icon
otherwise:

```jsx
{image
  ? <img src={image} alt="" className="h-12 w-12 rounded-full object-cover" />
  : <span className="grid h-12 w-12 place-items-center rounded-full ...">{/* icon */}</span>
}
```

Not needed for v1 (no product photography available yet), but keeps the
component ready if the client supplies real product photos later — avoids
another round of stock-photo filler like the one removed in `02` §7.

---

## 10. Quick reference — interaction states summary

| Element | Hover | Active/press | Selected | Focus (keyboard) |
|---|---|---|---|---|
| `OptionCard` | lift + rose border + tinted icon badge | `scale-0.98` | filled rose icon badge + check badge + rose border/ring | `focus-visible:ring-2 ring-rose-300` |
| Primary button | darken + lift | `scale-0.97` | n/a | `focus-visible:ring-2 ring-rose-300` |
| Secondary button | border/text darken | `scale-0.97` | n/a | `focus-visible:ring-2 ring-rose-300` |
| Ghost button | text → rose | `scale-0.97` | n/a | `focus-visible:ring-2 ring-rose-300` |
| Progress segment | — | — | filled rose, `transition-colors duration-300` | — |

Add `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2`
to the shared button/card base classes so keyboard navigation is clearly
visible — important since the whole flow is keyboard-operable one step at a
time.
