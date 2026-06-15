# ZFFA Pricing Estimator — Design & UX Brief (Multi-Step Wizard)

This is the spec for the full UX/visual rebuild of the pricing estimator,
following `01-functionality-fixes.md` (apply that first — the wizard should
be built on top of corrected pricing data).

**Confirmed direction (from client):**
- Full-screen wizard — **one question per screen**, not a single long form
- A progress bar showing "Step X of Y" — Y **varies per product** (3, 4, or 5)
- The price is **revealed only on the final step**, not live throughout
- Category and Product steps use a **visual card grid** (icon + label, with
  price badges on the Product step) — not dropdowns
- The final screen has **"Edit"** (jump back to any step, keep other
  answers), **"Request Exact Quote"**, and **"Start Over"**

Three reference mockups were shown to and approved in concept by the client
during this conversation:
1. Product-selection step (card grid + price badges + progress bar)
2. The single-page accordion alternative (rejected — wizard was chosen instead)
3. Final reveal screen (price + breakdown + Edit/Quote/Start Over)

**Visual language:** the client also shared a reference quiz-style flow
(personalized step headers, icon cards that invert to a solid color block
when selected, bold uppercase nav buttons). The full visual treatment —
colors, the `OptionCard` anatomy with hover/selected states, button styles,
step-header accents, and all animation/transition specs — is now in
`03-visual-style-guide.md`. Apply that styling to every component described
below. This file (`02`) stays focused on structure, flow, and logic.

---

## 1. Step sequence (variable length: 3–5 steps)

Every flow starts with the same two steps, ends with the same result step,
and has 0, 1, or 2 configuration steps in between depending on the selected
product's `type`:

| Product `type` | Steps | Total |
|---|---|---|
| `fixedRange`, `startingPrice`, `customQuote` | Category → Product → Result | **3** |
| `area`, `quantity`, `size`, `fixedOptions`, `tieredSize` | Category → Product → Configure → Result | **4** |
| `tieredQuantity` | Category → Product → Tier → Quantity → Result | **5** |

### New utility: `getStepsForProduct(product)`

Add to `src/utils/pricingLogic.js`:

```js
export function getStepsForProduct(product) {
  const steps = ['category', 'product']

  switch (product?.type) {
    case 'area':
      steps.push('dimensions')
      break
    case 'quantity':
      steps.push('quantity')
      break
    case 'tieredQuantity':
      steps.push('tier', 'quantity')
      break
    case 'size':
    case 'fixedOptions':
    case 'tieredSize':
      steps.push('size')
      break
    default:
      // fixedRange, startingPrice, customQuote — no extra step
      break
  }

  steps.push('result')
  return steps
}
```

Before a product is selected, treat the step list as `['category', 'product',
'result']` (3 steps / minimum) for progress-bar purposes — it recalculates
the moment a product is chosen on step 2.

---

## 2. New utility: `getStartingPrice(product)`

Used for the price badge on each card in the Product step. Add to
`src/utils/pricingLogic.js`:

```js
function extractFirstDollarAmount(str) {
  if (!str) return null
  const match = str.match(/\$([\d,]+(?:\.\d+)?)/)
  if (!match) return null
  return parseFloat(match[1].replace(/,/g, ''))
}

export function getStartingPrice(product) {
  if (!product) return null

  switch (product.type) {
    case 'area': {
      return product.minPerSqFt != null ? `From $${product.minPerSqFt}/sq ft` : null
    }
    case 'quantity': {
      const amounts = (product.priceTable ?? [])
        .map((row) => extractFirstDollarAmount(row.range))
        .filter((n) => n != null)
      return amounts.length ? `From $${Math.min(...amounts)}` : 'Custom quote'
    }
    case 'tieredQuantity': {
      const amounts = (product.tiers ?? [])
        .flatMap((tier) => tier.priceTable ?? [])
        .map((row) => extractFirstDollarAmount(row.range))
        .filter((n) => n != null)
      return amounts.length ? `From $${Math.min(...amounts)}` : 'Custom quote'
    }
    case 'size':
    case 'fixedOptions': {
      const amounts = (product.options ?? [])
        .map((opt) => extractFirstDollarAmount(opt.priceLabel))
        .filter((n) => n != null)
      return amounts.length ? `From $${Math.min(...amounts)}` : 'Custom quote'
    }
    case 'tieredSize': {
      const amounts = (product.tiers ?? [])
        .map((tier) => extractFirstDollarAmount(tier.priceLabel))
        .filter((n) => n != null)
      return amounts.length ? `From $${Math.min(...amounts)}` : 'Custom quote'
    }
    case 'fixedRange':
    case 'startingPrice': {
      const amount = extractFirstDollarAmount(product.priceLabel)
      return amount != null ? `From $${amount}` : product.priceLabel
    }
    case 'customQuote':
    default:
      return 'Custom quote'
  }
}
```

---

## 3. Data model addition: icons

Every category and product needs an `icon` field — a string matching a
`lucide-react` export name. Create `src/utils/iconMap.js`:

```js
import {
  Store, AppWindow, Car, Flag, Printer, Gift, Presentation, Globe,
  LayoutTemplate, Lightbulb, Triangle, Replace,
  PanelLeft, Sticker,
  Magnet, CarFront, Shapes,
  Image, GalleryVerticalEnd, Columns2, PanelsTopLeft, FlagTriangleRight,
  Square, Frame, Signpost, SignpostBig,
  IdCard, FileImage, BookOpen, MailOpen, Notebook, FolderOpen, DoorOpen,
  Tag, Ticket, Mail,
  Coffee, GlassWater, CupSoda, KeyRound, Mouse,
  MonitorPlay, Layers2, Tent,
  Monitor, MonitorSmartphone,
} from 'lucide-react'

export const ICONS = {
  Store, AppWindow, Car, Flag, Printer, Gift, Presentation, Globe,
  LayoutTemplate, Lightbulb, Triangle, Replace,
  PanelLeft, Sticker,
  Magnet, CarFront, Shapes,
  Image, GalleryVerticalEnd, Columns2, PanelsTopLeft, FlagTriangleRight,
  Square, Frame, Signpost, SignpostBig,
  IdCard, FileImage, BookOpen, MailOpen, Notebook, FolderOpen, DoorOpen,
  Tag, Ticket, Mail,
  Coffee, GlassWater, CupSoda, KeyRound, Mouse,
  MonitorPlay, Layers2, Tent,
  Monitor, MonitorSmartphone,
}

// Usage: const Icon = ICONS[item.icon] ?? Shapes
```

All names above are verified to exist in `lucide-react@0.460.0`.

### Icon assignments — add `icon: '...'` to each object in `pricingData.js`

**Categories:**

| Category id | icon |
|---|---|
| `store-front-signage` | `Store` |
| `windows-and-graphics` | `AppWindow` |
| `vehicle-branding` | `Car` |
| `banners-and-large-format-printing` | `Flag` |
| `promotional-and-business-printing` | `Printer` |
| `promotional-products` | `Gift` |
| `indoor-branding-and-displays` | `Presentation` |
| `digital-services` | `Globe` |

**Products** (grouped by category):

| Product id | icon |
|---|---|
| `box-sign` | `LayoutTemplate` |
| `channel-letters` | `Lightbulb` |
| `a-frame-sign` | `Triangle` |
| `sign-face-replacement` | `Replace` |
| `vinyl-graphics` | `AppWindow` |
| `perforated-graphics` | `PanelLeft` |
| `decals` | `Sticker` |
| `promotional-magnets` | `Magnet` |
| `vehicle-magnets` | `CarFront` |
| `car-magnets` | `Car` |
| `custom-shape-magnets` | `Shapes` |
| `vinyl-banners` | `Flag` |
| `posters` | `Image` |
| `pull-up-banners` | `GalleryVerticalEnd` |
| `x-frame-banners` | `Columns2` |
| `pop-up-displays` | `PanelsTopLeft` |
| `trade-show-displays` | `Presentation` |
| `flags` | `FlagTriangleRight` |
| `foam-board-prints` | `Square` |
| `canvas-prints` | `Frame` |
| `custom-aluminum-signs` | `Signpost` |
| `coroplast-and-yard-signs` | `SignpostBig` |
| `business-cards` | `IdCard` |
| `flyers` | `FileImage` |
| `brochures` | `BookOpen` |
| `postcards` | `MailOpen` |
| `booklets` | `Notebook` |
| `presentation-folders` | `FolderOpen` |
| `door-hangers` | `DoorOpen` |
| `stickers-roll-labels` | `Tag` |
| `tickets` | `Ticket` |
| `invitation-cards` | `Mail` |
| `custom-printed-mugs` | `Coffee` |
| `stainless-steel-bottles` | `GlassWater` |
| `tumblers` | `CupSoda` |
| `keychains` | `KeyRound` |
| `mouse-pads` | `Mouse` |
| `led-displays` | `MonitorPlay` |
| `table-covers` | `Layers2` |
| `tents` | `Tent` |
| `website-development` | `Monitor` |
| `digital-display-setup` | `MonitorSmartphone` |

(Includes `car-magnets`, added in `01-functionality-fixes.md` Fix 3.)

---

## 4. Component architecture

### Remove (replaced by new wizard components)

- `src/components/CategorySelection.jsx`
- `src/components/ProductSelection.jsx`
- `src/components/OptionSelection.jsx`
- `src/components/DropdownSelector.jsx`
- `src/components/DimensionsSelector.jsx`
- `src/components/EstimateCard.jsx`
- `src/components/ProgressBar.jsx`
- `src/components/QuoteButton.jsx`
- (Already removed in Fix 4b: `QuantitySelector.jsx`, `SizeSelector.jsx`, `TierSelector.jsx`)

### Add — `src/components/wizard/`

| File | Purpose |
|---|---|
| `WizardShell.jsx` | Top-level layout: progress bar, `AnimatePresence` step transitions, Back/Next nav bar. Holds no business state — receives current step content as children. |
| `StepProgressBar.jsx` | Segmented progress bar. `props: { current, total }`. One segment per step; filled rose for steps ≤ current, neutral for upcoming, with a smooth color transition on advance. Exact classes in `03-visual-style-guide.md` §5. |
| `OptionCard.jsx` | Reusable selectable card: icon badge (circle), title, optional subtitle/description, optional price badge, selected state, hover state, check-badge indicator. `props: { icon, title, subtitle, badge, selected, onClick }`. Full anatomy, states, and animation in `03-visual-style-guide.md` §2. |
| `CategoryStep.jsx` | Renders a responsive grid of `OptionCard` for all 8 categories. Heading: "What do you need today?" |
| `ProductStep.jsx` | Grid of `OptionCard` for products in the selected category, badge = `getStartingPrice(product)`. Heading: "Which `{category.title}` product do you need?" |
| `DimensionsStep.jsx` | Width/height number inputs (rebuilt from `DimensionsSelector`), live "Calculated area: X sq ft" readout. Heading: "What size is your project?" |
| `QuantityStep.jsx` | Grid of `OptionCard` (no icons, just quantity + price) for `type: 'quantity'` products, and for the quantity sub-step of `tieredQuantity` (options come from the **selected tier's** `priceTable`). Heading: "How many do you need?" |
| `TierStep.jsx` | Grid of `OptionCard` for: (a) the tier-choice step of `tieredQuantity` (badge = lowest price in that tier's table), and (b) `tieredSize` products (badge = `priceLabel`, subtitle includes `sizes` + `bestFor` — reuse the detail-panel content from the old `OptionSelection`). Heading: "Which option fits best?" |
| `SizeOptionStep.jsx` | Grid of `OptionCard` for `type: 'size'`/`'fixedOptions'` products, badge = `option.priceLabel`. Heading: "Choose a size / option" |
| `ResultStep.jsx` | Final reveal — see Section 6. |
| `PricingWizard.jsx` | Replaces `PricingEstimator.jsx` as the page component. Owns all state, step index, and navigation/reset logic (Section 5). |

`src/pages/PricingEstimator.jsx` becomes a thin re-export of `PricingWizard`,
or is deleted and `App.jsx` imports `PricingWizard` directly — Claude Code's
choice, but keep the route/usage in `App.jsx` working.

---

## 5. State, navigation, and reset rules

`PricingWizard.jsx` state (same underlying fields as today, plus step index):

```js
const [stepIndex, setStepIndex] = useState(0)
const [direction, setDirection] = useState(1) // +1 forward, -1 backward — drives transition direction, see 03 §6
const [selectedCategoryId, setSelectedCategoryId] = useState(null)
const [selectedProductId, setSelectedProductId] = useState(null)
const [selectedTierId, setSelectedTierId] = useState(null)
const [selectedQuantity, setSelectedQuantity] = useState('')
const [selectedSizeId, setSelectedSizeId] = useState('')
const [width, setWidth] = useState('')
const [height, setHeight] = useState('')
```

- `steps = getStepsForProduct(selectedProduct)` — recomputed via `useMemo`
  whenever `selectedProduct` changes. `total = steps.length`.
- `currentStepKey = steps[stepIndex]` drives which step component renders.
- **Next** is disabled until the current step has a valid value:
  - `category` → `selectedCategoryId` set
  - `product` → `selectedProductId` set
  - `dimensions` → `width > 0 && height > 0`
  - `quantity` → `selectedQuantity` set
  - `tier` → `selectedTierId` set
  - `size` → `selectedSizeId` set
- **Back** is hidden on step 0 (`category`). On the `result` step, no
  Back/Next — only Edit / Request Quote / Start Over (see Section 6).

### Cascading resets (same logic as today's `useEffect`s, extended to Edit)

- Changing **category** → reset `selectedProductId`, `selectedTierId`,
  `selectedQuantity`, `selectedSizeId`, `width`, `height`. Recompute `steps`
  (back to 3-step minimum until a new product is picked).
- Changing **product** → reset `selectedTierId`, `selectedQuantity`,
  `selectedSizeId`, `width`, `height`. Recompute `steps`.
- Changing **tier** (for `tieredQuantity`) → reset `selectedQuantity` only
  (quantity options depend on the tier's price table).
- Changing **quantity**, **size**, or **dimensions** → no downstream resets.

### Edit flow (from `result` step)

- "Edit" expands a list of summary rows, one per step *except* `result`
  (e.g. "Category: Banners & Large Format Printing", "Product: Pop-up
  Displays", "Quantity: 250"), each with an edit affordance.
- Clicking a row's edit button sets `stepIndex` to that step's index and
  re-enters the wizard at that screen — the user can move forward again with
  Next, and the same cascading-reset rules above apply if they change that
  step's answer (e.g. editing "Product" still resets tier/quantity/size as
  normal).
- "Start Over" resets **all** state to initial values and `stepIndex = 0`.

### Animation

Wrap step content in `<AnimatePresence mode="wait" custom={direction}>`; each
step is a `motion.div` using direction-aware slide+fade variants — full
variant code, the `direction` state pattern (+1 forward / -1 backward), and
timing are specified in `03-visual-style-guide.md` §6. Use the existing
`framer-motion` dependency — no new packages needed.

---

## 6. Per-step screen specs

All screens follow the visual language from the approved mockups: rose
(`#c11524`) for the progress bar fill, selected-card borders, and primary
buttons; white cards with `0.5px` neutral borders; `border-radius: 1rem`
(roughly `rounded-2xl`) on cards.

### `category` — "What do you need today?"
- Subtext: "Pick the category that best matches your project."
- Grid of 8 `OptionCard`s: icon + category title. Description field
  available for a subtitle if space allows (2-col mobile / 4-col desktop).

### `product` — "Which `{category}` product do you need?"
- Subtext: "Prices shown are starting estimates — you'll refine the details next."
- Grid of `OptionCard`s for each product in the category: icon, title, and a
  price badge from `getStartingPrice(product)`. 2-col mobile / 3-col desktop.

### `dimensions` — "What size is your project?"
- Width (ft) and height (ft) number inputs, side by side.
- Live "Calculated area: X sq ft" readout below (reuse logic from old
  `DimensionsSelector`).
- Helper text: "Enter the width and height of the area to be covered."

### `quantity` — "How many do you need?"
- Grid of `OptionCard`s, one per quantity tier (label = quantity, badge =
  that row's price `range`). For `tieredQuantity`, options come from
  `selectedTier.priceTable`, and the heading includes the chosen tier name,
  e.g. "How many `{tier.label}` do you need?"

### `tier` — "Which option fits best?"
- For `tieredQuantity`: grid of `OptionCard`s, one per tier — title =
  `tier.label`, subtitle = `tier.note`, badge = lowest price in
  `tier.priceTable`.
- For `tieredSize`: grid of `OptionCard`s, one per tier — title =
  `tier.label`, badge = `tier.priceLabel`, subtitle combines `tier.sizes`
  and `tier.bestFor` (e.g. "6x6, 8x10, 12x12 · Best for: Parking signs,
  Notices, Door signs") — preserves the info from the old detail panel.

### `size` — "Choose a size / option"
- Grid of `OptionCard`s, one per `product.options[]` entry — title =
  `option.label`, badge = `option.priceLabel`.
- **Exception**: for `a-frame-sign`, keep price visible on this step (the
  earlier `description: undefined` suppression for this product can be
  removed now that price only shows on result anyway — no behavior
  conflict, just simplifies the data).

### `result` — "Your estimate is ready"
- Checkmark icon, animated pop-in inside a rose circle (see `03` §7).
- Large price display (`estimate.price`, from `getCurrentEstimate`), styled
  per `03` §2 (heading font / size).
- Breakdown card: Category, Product, and any selected
  Tier/Quantity/Size/Dimensions (reuse the `details` array logic from the old
  `EstimateCard.jsx`), fading in with a slight stagger per `03` §7.
- Disclaimer text (unchanged): "This is an estimated price range. Final
  pricing depends on design, materials, and installation."
- Buttons (stacked, full width), styled per `03` §5:
  1. **Request Exact Quote** (primary, rose fill) → links to `/contact`. At
     minimum, pass the current selections as query params (e.g.
     `/contact?category=...&product=...&details=...`) so the destination
     contact form can be pre-filled later — this replaces `QuoteButton.jsx`.
  2. **Edit answers** (secondary/outline) → expands the per-step summary
     list described in Section 5.
  3. **Start Over** (text/ghost) → full reset.

### Every step heading

Use the accent-underline heading treatment from `03` §4 (bold heading +
short rose underline + subtext) consistently across `category`, `product`,
`dimensions`, `quantity`, `tier`, `size`, and `result`.

---

## 7. Visual cleanup (tie-in with Fix 4)

- Remove the empty `<h1>` and the "Project Details" / "Refined estimate
  flow" header card entirely — Step 1's own heading replaces it.
- Remove the decorative middle grid column (rotated "Price Estimator" label)
  and the Unsplash workspace photo — neither carries into the wizard. (If a
  product image is wanted later, `OptionCard` supports an optional `image`
  prop per `03` §9 — not required for v1.)
- Fix `tailwind.config.js`: replace `accent: '#1d4ed8'` / `accentSoft:
  '#e0e7ff'` with the rose scale defined in `03` §1, so `StepProgressBar` and
  any `bg-accent` usages are on-brand. Resolves the blue/red mismatch noted
  in Fix 4e.
- Add the optional heading font and/or notched-corner panel accent from `03`
  §9 if desired — both are drop-in additions that don't affect structure.
- `Header` and `Footer` are unchanged — the wizard replaces only the
  `<main>` content.

---

## 8. Mobile

This is likely used on phones as much as desktop:
- Card grids: 2 columns on mobile (`grid-cols-2`), up to 3–4 on desktop
  (`sm:grid-cols-3 lg:grid-cols-4`), using `gap-3`/`gap-4`.
- `WizardShell` content max-width ~`640px`, centered, with comfortable
  padding (`px-4 py-6` on mobile, more on desktop).
- Progress bar and Back/Next nav are full-width and sit at a consistent
  position (e.g. nav fixed/sticky to the bottom on mobile if it helps
  reachability — optional polish, not required for v1).
- On touch devices, hover states from `03` §2/§5 won't trigger — make sure
  the `selected` state alone (without hover) is visually sufficient, which
  it is by design (filled icon badge + check badge).

---

## 9. Build/verify checklist

- [ ] `getStepsForProduct` and `getStartingPrice` added to `pricingLogic.js`
- [ ] `icon` field added to all 8 categories and all 42 products (incl. `car-magnets`)
- [ ] `src/utils/iconMap.js` created with verified `lucide-react` imports
- [ ] All listed old components removed; new `wizard/` components created
- [ ] `OptionCard` implements default/hover/selected states + check-badge animation from `03` §2
- [ ] Step headings use the accent-underline treatment from `03` §4
- [ ] Buttons use the uppercase/letter-spacing styles + hover/press feedback from `03` §5
- [ ] Wizard correctly shows 3/4/5 steps depending on product type
- [ ] Back hidden on step 0; Next disabled until valid; result step has no Back/Next
- [ ] Cascading resets work for category/product/tier changes, including via Edit
- [ ] Edit jumps to the correct step and preserves unrelated answers
- [ ] Start Over fully resets state and returns to step 1
- [ ] Step transitions are direction-aware (forward/back) per `03` §6
- [ ] Result screen reveal animation (checkmark pop + staggered fade-in) per `03` §7
- [ ] `tailwind.config.js` accent colors updated to rose scale
- [ ] Empty `<h1>`, decorative column, and stock photo removed
- [ ] Mobile: 2-column card grids, comfortable spacing, no horizontal scroll, selected state visible without hover
