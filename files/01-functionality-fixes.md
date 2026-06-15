# ZFFA Pricing Estimator — Functionality Fixes

This document is the source of truth for fixing the pricing data and logic in
`src/data/pricingData.js`, `src/utils/pricingLogic.js`, and related
components. It was produced by auditing the current code against
`Products_and_Services_for_ZFFA_Trading_Limited.docx` (yellow-highlighted
"PRICE ESTIMATOR AMENDMENTS" section = source of truth for pricing) and the
functionality test report.

**Status of audit:** Every category and product price was checked line by
line. The vast majority already matches the client's document correctly
(Store Front Signage, Windows & Graphics, Custom Aluminum Signs, Coroplast &
Yard Signs, all Promotional & Business Printing products, all Promotional
Products, all Banners & Large Format items, Indoor Branding & Digital
Services). **Do not change anything not listed below** — those values are
already correct and verified.

There are 3 required data fixes and 1 cleanup pass. Apply them in order.

---

## Fix 1 — Door Hangers: add missing $2500 quantity tier

**File:** `src/data/pricingData.js`
**Product id:** `door-hangers`

The document specifies a 5th quantity tier (2500 units) for both Standard and
Premium Door Hangers that is currently missing from the code. Without it, a
customer who wants 2500 door hangers gets "Estimate not available."

### Changes

1. Update the top-level `quantities` array for `door-hangers`:

```js
// BEFORE
quantities: ['100', '250', '500', '1000'],

// AFTER
quantities: ['100', '250', '500', '1000', '2500'],
```

2. Add a new row to the `standard-door-hangers` tier's `priceTable`:

```js
priceTable: [
  { quantity: '100', range: '$70–$100' },
  { quantity: '250', range: '$110–$150' },
  { quantity: '500', range: '$160–$220' },
  { quantity: '1000', range: '$220–$320' },
  { quantity: '2500', range: '$400–$600' }, // NEW
],
```

3. Add a new row to the `premium-door-hangers` tier's `priceTable`:

```js
priceTable: [
  { quantity: '100', range: '$100–$140' },
  { quantity: '250', range: '$150–$220' },
  { quantity: '500', range: '$220–$320' },
  { quantity: '1000', range: '$320–$450' },
  { quantity: '2500', range: '$600–$850' }, // NEW
],
```

No other part of the `door-hangers` object changes.

---

## Fix 2 — Promotional Magnets: extend pricing to 2500 / 5000

**File:** `src/data/pricingData.js`
**Product id:** `promotional-magnets` (in `vehicle-branding` category)

**Decision (confirmed with client):** Use the extended pricing table, which
adds real price ranges for 2500 and 5000 units instead of "Custom quote."

### Changes

Replace the entire `promotional-magnets` product object with:

```js
{
  id: 'promotional-magnets',
  title: 'Promotional Magnets',
  description: 'Affordable fridge and giveaway magnets for marketing campaigns.',
  type: 'quantity',
  quantities: ['100', '250', '500', '1000', '2500', '5000'],
  priceTable: [
    { quantity: '100', range: '$80–$110' },
    { quantity: '250', range: '$140–$190' },
    { quantity: '500', range: '$220–$300' },
    { quantity: '1000', range: '$350–$500' },
    { quantity: '2500', range: '$700–$950' },   // CHANGED (was 'Custom quote')
    { quantity: '5000', range: '$1200–$1600' }, // NEW
  ],
  note: 'Best for giveaways, real estate, and promotional campaigns.',
},
```

Only the `quantities` array and `priceTable` change — `title`, `description`,
`type`, and `note` stay the same.

---

## Fix 3 — Add new product: Car Magnets (30mil)

**File:** `src/data/pricingData.js`
**Category:** `vehicle-branding`

**Decision (confirmed with client):** Add "Car Magnets" as a brand-new third
product in the Vehicle Branding category, alongside the existing "Vehicle
Magnets" (size-based: Small/Medium/Large/Fleet). Do not remove or modify
`vehicle-magnets`.

This product is quantity-based (30mil premium magnets, ordered in small
batches of 1–10 units), per the document's "🔵 2. Car Magnets (30mil –
premium product)" section.

### New product object

Insert this **after** `vehicle-magnets` and **before** `custom-shape-magnets`
in the `vehicle-branding` category's `products` array:

```js
{
  id: 'car-magnets',
  title: 'Car Magnets',
  description: 'Premium 30mil magnets for vehicle branding, ideal for small-batch orders.',
  type: 'quantity',
  quantities: ['1', '2–5', '6–10', '10+'],
  priceTable: [
    { quantity: '1', range: '$60–$90' },
    { quantity: '2–5', range: '$50–$75 each' },
    { quantity: '6–10', range: '$45–$65 each' },
    { quantity: '10+', range: 'Custom quote' },
  ],
  note: '30mil thickness for durable, high-impact vehicle branding. Typically ordered in 1–10 unit quantities.',
},
```

### Resulting product order for `vehicle-branding.products`

1. `promotional-magnets`
2. `vehicle-magnets`
3. `car-magnets` ← NEW
4. `custom-shape-magnets`

### Verify after adding

- `getCurrentEstimate` in `pricingLogic.js` already handles `type: 'quantity'`
  correctly (looks up `priceTable` by `selectedQuantity`) — no logic changes
  needed, this product reuses the existing `quantity` type path.
- `OptionSelection.jsx` already renders a quantity dropdown for `type ===
  'quantity'` products (see `custom-shape-magnets` for reference) — no
  component changes needed.
- Confirm the dropdown shows all four quantity labels (`1`, `2–5`, `6–10`,
  `10+`) and each produces the correct price range from the table above.

---

## Fix 4 — Dead code cleanup

These don't affect pricing correctness but should be cleaned up before the
redesign (some of this — especially the progress bar — will be reused as the
foundation for the new multi-step flow, so it's worth tidying now).

### 4a. `ProgressBar` — currently imported but never rendered

**File:** `src/pages/PricingEstimator.jsx`

- `import ProgressBar from '../components/ProgressBar'` is present but
  `<ProgressBar />` is never used in JSX.
- `const currentStep = selectedCategory ? (selectedProduct ? 3 : 2) : 1` is
  computed but never used.

**Action:** Leave as-is for now — this will be wired into the new multi-step
layout in the design/UX pass (see `02-design-brief.md`, coming next). Do not
delete `ProgressBar.jsx` or the `currentStep` logic.

### 4b. Unused component files — safe to delete

None of these are imported anywhere in `src/`:

- `src/components/QuantitySelector.jsx`
- `src/components/SizeSelector.jsx`
- `src/components/TierSelector.jsx`

**Action:** Delete these three files.

### 4c. Unused exports in `pricingLogic.js`

- `getQuantityOptions`
- `getTierOptions`
- `getSizeOptions`

**Action:** Remove these three exported functions from
`src/utils/pricingLogic.js`. `OptionSelection.jsx` derives the equivalent
options inline and does not call them.

### 4d. Unused import in `PricingEstimator.jsx`

- `import { Sparkles } from 'lucide-react'` — not used anywhere in the file.

**Action:** Remove this import line.

### 4e. Tailwind color mismatch

**File:** `tailwind.config.js`

```js
colors: {
  surface: '#f8fafc',
  panel: '#ffffff',
  brand: '#0f172a',
  accent: '#1d4ed8',     // blue — inconsistent with rose brand color
  accentSoft: '#e0e7ff', // light blue
},
```

The site's real brand color is the rose/red defined in `src/index.css`
(`--rose: #c11524`). `accent`/`accentSoft` (blue) are unused except by the
dormant `ProgressBar` component (`bg-accent`). This will be resolved as part
of the design pass when `ProgressBar` is wired in — flagging here so it isn't
missed. **No action needed yet.**

---

## Verification checklist (after Fixes 1–3)

Run through each of these in the running app and confirm the price shown
matches:

- [ ] Door Hangers → Standard tier → 2500 → shows **$400–$600**
- [ ] Door Hangers → Premium tier → 2500 → shows **$600–$850**
- [ ] Vehicle Branding → Promotional Magnets → 2500 → shows **$700–$950**
- [ ] Vehicle Branding → Promotional Magnets → 5000 → shows **$1200–$1600**
- [ ] Vehicle Branding → "Car Magnets" appears as a selectable product
- [ ] Car Magnets → 1 → **$60–$90**
- [ ] Car Magnets → 2–5 → **$50–$75 each**
- [ ] Car Magnets → 6–10 → **$45–$65 each**
- [ ] Car Magnets → 10+ → **Custom quote**
- [ ] Existing Vehicle Magnets (Small/Medium/Large/Fleet) still works unchanged
- [ ] `QuantitySelector.jsx`, `SizeSelector.jsx`, `TierSelector.jsx` deleted, app still builds
- [ ] `getQuantityOptions`, `getTierOptions`, `getSizeOptions` removed, app still builds
- [ ] `Sparkles` import removed, app still builds

Once all boxes are checked, the pricing data and logic are fully aligned with
the client's specification and the calculator is ready for the design/UX
overhaul in `02-design-brief.md`.
