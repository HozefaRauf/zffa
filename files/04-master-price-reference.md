# ZFFA Pricing Estimator — Master Price Reference

This is the complete, corrected pricing reference for every category and
product in the estimator — the **target state** after applying
`01-functionality-fixes.md`. Use this to do a line-by-line comparison against
`src/data/pricingData.js`.

Each product is listed with its `id` (matches the `id` field in
`pricingData.js` — search for it directly), its pricing `type`, and the full
price table / options / notes.

Items marked **🆕** or **✏️** are the 3 changes from `01-functionality-fixes.md`
— everything else should already match your current code unchanged.

---

## 1. Store Front Signage — `store-front-signage`

### Box Sign — `box-sign` (type: `area`)
- $60 – $70 per sq ft
- Note: Estimated per square foot pricing for standard panel construction.

### Channel Letters — `channel-letters` (type: `area`)
- $70 – $80 per sq ft of total sign area
- Note: Pricing applies to total sign area, including letter faces and returns.

### Standard A-Frame Sign — `a-frame-sign` (type: `fixedOptions`)

| Option id | Label | Price |
|---|---|---|
| `18x24` | 18x24 A-Frame Sign | $109 – $119 CAD |
| `36x24` | 36x24 A-Frame Sign | $149 – $169 CAD |

- Note: Standard hardware and full-color panels included in the estimate.

### Sign Face Replacement — `sign-face-replacement` (type: `area`)
- $35 – $40 per sq ft
- Note: Estimate based on square footage of the sign face area.

---

## 2. Windows & Graphics — `windows-and-graphics`

### Vinyl Graphics — `vinyl-graphics` (type: `area`, static price)
- Approx. $9 per sq ft (`minPerSqFt`/`maxPerSqFt` = 9, but always displays the
  flat rate — does not compute a min–max range)

### Perforated Graphics — `perforated-graphics` (type: `area`, static price)
- Approx. $11 per sq ft (`minPerSqFt`/`maxPerSqFt` = 11, flat rate display)

### Decals — `decals` (type: `fixedRange`, static price)
- Approx. $9 per sq ft

---

## 3. Vehicle Branding — `vehicle-branding`

### Promotional Magnets — `promotional-magnets` (type: `quantity`) ✏️

| Quantity | Price |
|---|---|
| 100 | $80 – $110 |
| 250 | $140 – $190 |
| 500 | $220 – $300 |
| 1000 | $350 – $500 |
| 2500 | $700 – $950 |
| 5000 | $1200 – $1600 |

- Note: Best for giveaways, real estate, and promotional campaigns.
- ✏️ Extended from the previous 2500→"Custom quote" cutoff to real prices at
  2500 and 5000.

### Vehicle Magnets — `vehicle-magnets` (type: `size`)

| Option id | Label | Price |
|---|---|---|
| `small` | Small (up to 12"×18") | $55 – $75 |
| `medium` | Medium (up to 18"×24") | $80 – $120 |
| `large` | Large (24"×24"+) | $120 – $180 |
| `fleet` | Fleet / Bulk Orders | Custom quote |

- Note: Used for vehicle wraps, fleets, and mobile branding applications.

### Car Magnets — `car-magnets` (type: `quantity`) 🆕

| Quantity | Price |
|---|---|
| 1 | $60 – $90 |
| 2–5 | $50 – $75 each |
| 6–10 | $45 – $65 each |
| 10+ | Custom quote |

- Note: 30mil thickness for durable, high-impact vehicle branding. Typically
  ordered in 1–10 unit quantities.
- 🆕 New product — sits between `vehicle-magnets` and `custom-shape-magnets`.

### Custom Shape Magnets — `custom-shape-magnets` (type: `quantity`)

| Quantity | Price |
|---|---|
| 100 | $120 – $180 |
| 250 | $220 – $320 |
| 500 | $350 – $500 |
| 1000 | $600 – $850 |
| 2500 | Custom quote |

- Note: Ideal for branded merchandise, giveaways, and premium collateral.

---

## 4. Banners & Large Format Printing — `banners-and-large-format-printing`

### Vinyl Banners — `vinyl-banners` (type: `fixedRange`)
- $20 – $170
- Note: Print-only pricing based on standard banner sizes.

### Posters — `posters` (type: `fixedRange`)
- $15 – $90
- Note: Print-only pricing based on standard poster sizes.

### Pull-up Banners — `pull-up-banners` (type: `fixedRange`)
- $80 – $135
- Note: Includes banner stand and full-color print.

### X-Frame Banners — `x-frame-banners` (type: `fixedRange`)
- $60 – $95
- Note: Includes frame hardware plus printed graphic.

### Pop-up Displays — `pop-up-displays` (type: `fixedRange`)
- $305 – $1230
- Note: Large structural displays for trade shows and premium events.

### Trade Show Displays — `trade-show-displays` (type: `customQuote`)
- "Contact us for pricing"
- Note: Pricing depends on configuration, size, and installation needs.

### Flags — `flags` (type: `fixedRange`)
- $100 – $259
- Note: Large structural flag solutions for events and exteriors.

### Foam Board Prints — `foam-board-prints` (type: `fixedRange`)
- $15 – $60
- Note: Indoor decorative and professional display prints.

### Canvas Prints — `canvas-prints` (type: `fixedRange`)
- $25 – $80
- Note: Indoor decorative and gallery-quality canvas printing.

### Custom Aluminum Signs — `custom-aluminum-signs` (type: `tieredSize`)

| Tier id | Label | Sizes | Best For | Price |
|---|---|---|---|---|
| `aluminum-small` | Small Signs | 6x6, 8x10, 12x12 | Parking signs, Notices, Door signs | Starting at $29 |
| `aluminum-medium` | Medium Signs | 12x18, 18x24 | Business signs, Directional signage | Starting at $69 |
| `aluminum-large` | Large Signs | 24x24, 24x36 | Outdoor branding, Property signage | Starting at $149 |

- Note: Final pricing depends on size, finishing, and mounting requirements.

### Coroplast & Yard Signs — `coroplast-and-yard-signs` (type: `tieredQuantity`)

**Standard Yard Signs** (`standard-yard-signs`) — 18"×24", Most Popular

| Quantity | Price |
|---|---|
| 1–9 | $25 – $30 each |
| 10–24 | $18 – $22 each |
| 25–49 | $14 – $18 each |
| 50–99 | $12 – $15 each |
| 100+ | Custom quote |

**Small Yard Signs** (`small-yard-signs`) — 6"×24"

| Quantity | Price |
|---|---|
| 1–9 | $20 – $25 each |
| 10–24 | $16 – $20 each |
| 25–49 | $13 – $16 each |
| 50+ | $11 – $14 each |

**Large Yard Signs** (`large-yard-signs`) — 48"×48"

| Quantity | Price |
|---|---|
| 1–9 | $65 – $85 each |
| 10–24 | $55 – $70 each |
| 25–49 | $45 – $60 each |
| 50+ | Custom quote |

- Note: Includes full-color printing and metal stakes.

---

## 5. Promotional & Business Printing — `promotional-and-business-printing`

### Business Cards — `business-cards` (type: `tieredQuantity`)

**Standard Business Cards** (`standard-business-cards`) — Most Popular —
14pt/16pt Matte, Gloss/AQ

| Quantity | Price |
|---|---|
| 100 | $25 – $35 |
| 250 | $40 – $55 |
| 500 | $55 – $75 |
| 1000 | $80 – $110 |

**Premium Business Cards** (`premium-business-cards`) — 18pt Silk/Matte
Laminated, Thicker Stock

| Quantity | Price |
|---|---|
| 100 | $50 – $70 |
| 250 | $80 – $110 |
| 500 | $110 – $150 |
| 1000 | $160 – $220 |

**Luxury / Specialty Cards** (`luxury-business-cards`) — Spot UV, foil,
die-cut, soft-touch

| Quantity | Price |
|---|---|
| 100 | $90 – $130 |
| 250 | $150 – $220 |
| 500 | $220 – $320 |
| 1000 | Custom quote |

- Note: Choose a category based on quality and finish. Final pricing may vary
  depending on specifications.

### Flyers — `flyers` (type: `tieredQuantity`)

**Standard** (`standard-flyers`) — 100lb gloss/matte, 1 or 2 sided, sizes
8.5"×11" / 5.5"×8.5"

| Quantity | Price |
|---|---|
| 100 | $45 – $65 |
| 250 | $70 – $100 |
| 500 | $100 – $140 |
| 1000 | $140 – $200 |
| 2500 | $250 – $350 |
| 5000 | $400 – $550 |

**Premium** (`premium-flyers`) — UV coating, thicker stock, higher impact

| Quantity | Price |
|---|---|
| 100 | $70 – $100 |
| 250 | $110 – $150 |
| 500 | $150 – $220 |
| 1000 | $220 – $320 |
| 2500 | $350 – $500 |
| 5000 | $550 – $750 |

- Note: Pricing based on standard sizes (e.g., 8.5"×11"). Custom sizes and
  finishes may vary.

### Brochures — `brochures` (type: `tieredQuantity`)

**Standard** (`standard-brochures`) — 100lb gloss/matte, standard folding

| Quantity | Price |
|---|---|
| 100 | $90 – $120 |
| 250 | $130 – $180 |
| 500 | $180 – $250 |
| 1000 | $250 – $350 |
| 2500 | $450 – $650 |
| 5000 | $700 – $950 |

**Premium** (`premium-brochures`) — High-gloss UV finish, premium stock

| Quantity | Price |
|---|---|
| 100 | $120 – $160 |
| 250 | $180 – $250 |
| 500 | $250 – $350 |
| 1000 | $350 – $500 |
| 2500 | $650 – $900 |
| 5000 | $950 – $1300 |

- Note: Includes standard folding. Custom sizes and specialty folds may
  affect pricing.

### Postcards — `postcards` (type: `tieredQuantity`)

**Standard** (`standard-postcards`) — 14pt/16pt matte or AQ, sizes 4"×6" /
5"×7"

| Quantity | Price |
|---|---|
| 100 | $40 – $60 |
| 250 | $65 – $90 |
| 500 | $90 – $130 |
| 1000 | $130 – $180 |
| 2500 | $220 – $320 |
| 5000 | $350 – $500 |

**Premium** (`premium-postcards`) — UV coating, laminated finishes

| Quantity | Price |
|---|---|
| 100 | $60 – $90 |
| 250 | $100 – $140 |
| 500 | $140 – $200 |
| 1000 | $200 – $300 |
| 2500 | $350 – $500 |
| 5000 | $550 – $750 |

- Note: Pricing based on standard sizes. Custom sizes and finishes may vary.

### Booklets — `booklets` (type: `tieredQuantity`)

**Standard** (`standard-booklets`) — 8–20 pages, saddle-stitched, gloss/silk

| Quantity | Price |
|---|---|
| 100 | $180 – $250 |
| 250 | $350 – $500 |
| 500 | $600 – $850 |
| 1000 | $1000 – $1400 |

**Premium** (`premium-booklets`) — 20–40 pages, higher quality stock

| Quantity | Price |
|---|---|
| 100 | $300 – $450 |
| 250 | $600 – $850 |
| 500 | $1000 – $1400 |
| 1000 | $1600 – $2200 |

**High-End / Catalog** (`catalog-booklets`) — 40+ pages, product catalogs

| Quantity | Price |
|---|---|
| 100 | $500 – $800 |
| 250 | $1000 – $1600 |
| 500 | $1800 – $2600 |
| 1000 | Custom Quote |

- Note: Pricing based on typical page ranges. Final quote depends on number
  of pages and specifications.
- Max quantity for all three tiers is **1000** — this is correct, do not add
  2500/5000.

### Presentation Folders — `presentation-folders` (type: `tieredQuantity`)

**Standard** (`standard-folders`) — 14pt/16pt stock, matte/AQ/UV, standard
pockets

| Quantity | Price |
|---|---|
| 100 | $220 – $300 |
| 250 | $400 – $550 |
| 500 | $700 – $950 |
| 1000 | $1200 – $1600 |

**Premium** (`premium-folders`) — Laminated matte/silk, thicker stock

| Quantity | Price |
|---|---|
| 100 | $300 – $420 |
| 250 | $550 – $750 |
| 500 | $950 – $1300 |
| 1000 | $1600 – $2200 |

**Luxury / Specialty** (`luxury-folders`) — Foil, spot UV, soft-touch, custom
die-cut pockets

| Quantity | Price |
|---|---|
| 100 | $450 – $700 |
| 250 | $900 – $1400 |
| 500 | $1600 – $2400 |
| 1000 | Custom quote |

- Note: Includes standard pockets and full-color printing. Custom finishes
  and specialty options may affect pricing.

### Door Hangers — `door-hangers` (type: `tieredQuantity`) ✏️

**Standard** (`standard-door-hangers`) — 14pt matte/AQ, 4.25"×11", single or
double-sided

| Quantity | Price |
|---|---|
| 100 | $70 – $100 |
| 250 | $110 – $150 |
| 500 | $160 – $220 |
| 1000 | $220 – $320 |
| 2500 | $400 – $600 |

**Premium** (`premium-door-hangers`) — UV coating, higher-end finishing

| Quantity | Price |
|---|---|
| 100 | $100 – $140 |
| 250 | $150 – $220 |
| 500 | $220 – $320 |
| 1000 | $320 – $450 |
| 2500 | $600 – $850 |

- Note: Includes die-cut door hole and full-color printing. Custom sizes or
  finishes may affect pricing.
- ✏️ The `2500` row is new for both tiers — `quantities` array must include
  `'2500'`.

### Stickers / Roll Labels — `stickers-roll-labels` (type: `tieredQuantity`)

**Standard Labels** (`standard-labels`) — Paper, indoor packaging

| Quantity | Price |
|---|---|
| 100 | $0.80 – $1.20 each |
| 250 | $0.60 – $0.90 each |
| 500 | $0.45 – $0.70 each |
| 1000 | $0.30 – $0.50 each |
| 2500 | $0.25 – $0.40 each |
| 5000+ | Custom quote |

**Premium Labels** (`premium-labels`) — BOPP / waterproof

| Quantity | Price |
|---|---|
| 100 | $1.20 – $1.80 each |
| 250 | $0.90 – $1.40 each |
| 500 | $0.70 – $1.10 each |
| 1000 | $0.50 – $0.80 each |
| 2500 | $0.40 – $0.65 each |
| 5000+ | Custom quote |

- Note: Pricing varies based on size, material, and quantity. Includes
  full-color printing.

### Tickets — `tickets` (type: `tieredQuantity`)

**Standard Numbered Tickets** (`standard-tickets`) — 14pt stock, optional
perforation, single numbering

| Quantity | Price |
|---|---|
| 100 | $80 – $110 |
| 250 | $140 – $190 |
| 500 | $220 – $300 |
| 1000 | $350 – $500 |
| 2500 | $700 – $950 |
| 5000 | $1200 – $1600 |

**Premium Event Tickets** (`premium-tickets`) — double-sided, multiple
numbering fields

| Quantity | Price |
|---|---|
| 100 | $110 – $150 |
| 250 | $180 – $250 |
| 500 | $300 – $420 |
| 1000 | $500 – $700 |
| 2500 | $900 – $1300 |
| 5000 | Custom quote |

- Note: Includes sequential numbering. Additional charges may apply for
  multiple number fields or custom layouts.

### Invitation Cards — `invitation-cards` (type: `tieredQuantity`)

**Standard Invitations** (`standard-invitations`) — 14pt matte or AQ

| Quantity | Price |
|---|---|
| 100 | $70 – $100 |
| 250 | $110 – $150 |
| 500 | $160 – $220 |
| 1000 | $240 – $340 |

**Premium Invitations** (`premium-invitations`) — UV coating, pearl paper

| Quantity | Price |
|---|---|
| 100 | $100 – $140 |
| 250 | $150 – $220 |
| 500 | $220 – $320 |
| 1000 | $320 – $450 |

**Luxury Invitations** (`luxury-invitations`) — Metallic foil, kraft paper

| Quantity | Price |
|---|---|
| 100 | $160 – $240 |
| 250 | $280 – $400 |
| 500 | $400 – $600 |
| 1000 | Custom quote |

- Note: Budget, premium, and luxury invitation pricing tiers.

---

## 6. Promotional Products — `promotional-products`

### Custom Printed Mugs — `custom-printed-mugs` (type: `tieredQuantity`, single tier `mugs-default`)

| Quantity | Price |
|---|---|
| 10+ | $14 – $16 per mug |
| 25+ | $12 – $14 per mug |
| 50+ | $10 – $12 per mug |
| 100+ | Custom Quote (Best Pricing) |

- Note: Prices include full-color printing. Final pricing may vary slightly
  based on design and quantity.

### Stainless Steel Bottles (17oz) — `stainless-steel-bottles` (type: `tieredQuantity`, single tier `bottles-default`)

| Quantity | Price |
|---|---|
| 10+ | $22 – $26 per bottle |
| 25+ | $20 – $24 per bottle |
| 50+ | $18 – $22 per bottle |
| 100+ | Custom Quote (Best Pricing) |

- Note: Prices include custom branding. Final pricing may vary based on
  design and quantity.

### Tumblers (20oz) — `tumblers` (type: `tieredQuantity`, single tier `tumblers-default`)

| Quantity | Price |
|---|---|
| 10+ | $28 – $34 per tumbler |
| 25+ | $26 – $30 per tumbler |
| 50+ | $24 – $28 per tumbler |
| 100+ | Custom Quote (Best Pricing) |

- Note: Includes full-color branding. Additional charges may apply for
  multi-side printing.

### Keychains — `keychains` (type: `tieredQuantity`, single tier `keychains-default`)

| Quantity | Price |
|---|---|
| 50+ | $4.50 – $5.50 each |
| 100+ | $4.00 – $5.00 each |
| 250+ | $3.50 – $4.50 each |
| 500+ | Custom Quote (Best Pricing) |

- Note: Sold in multiples of 10. Pricing includes full-color printing.

### Mouse Pads — `mouse-pads` (type: `tieredQuantity`, single tier `mousepads-default`)

| Quantity | Price |
|---|---|
| 10+ | $12 – $14 each |
| 25+ | $11 – $13 each |
| 50+ | $10 – $12 each |
| 100+ | Custom Quote (Best Pricing) |

- Note: Includes full-color printing. Pricing may vary for custom sizes or
  premium finishes.

---

## 7. Indoor Branding & Displays — `indoor-branding-and-displays`

### LED Displays — `led-displays` (type: `customQuote`)
- "Contact us for pricing"
- Note: Pricing depends on size, installation, and control setup.

### Table Covers — `table-covers` (type: `fixedRange`)
- $95 – $185 plus tax
- Note: Premium printed covers with fitted or stretch styles.

### Tents — `tents` (type: `startingPrice`)
- $800 plus tax (starting price)
- Note: Starting price for custom printed tent solutions.

---

## 8. Digital Services — `digital-services`

### Website Development — `website-development` (type: `customQuote`)
- "Contact us for pricing"
- Note: Project pricing varies by scope, platform, and timelines.

### Digital Display Setup — `digital-display-setup` (type: `startingPrice`)
- $300 plus (starting price)
- Note: Approximate starting price based on setup complexity.

---

## Summary of changes vs. your current code

| Product | Change |
|---|---|
| `promotional-magnets` | ✏️ Add `2500 → $700–$950` and `5000 → $1200–$1600` (replace previous "2500 → Custom quote") |
| `car-magnets` | 🆕 Brand-new product — add to `vehicle-branding.products`, between `vehicle-magnets` and `custom-shape-magnets` |
| `door-hangers` | ✏️ Add `2500` to `quantities`, plus `2500 → $400–$600` (Standard) and `2500 → $600–$850` (Premium) |

Everything else in this document should already match `pricingData.js`
exactly — if anything differs (a number, a label, a note), that's a
discrepancy to fix to match this reference.

**Category & product count check:** 8 categories, 43 products total (42
original + `car-magnets`).
