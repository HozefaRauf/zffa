import DimensionsSelector from './DimensionsSelector'
import DropdownSelector   from './DropdownSelector'

const PROMO_IDS = ['custom-printed-mugs', 'stainless-steel-bottles', 'tumblers', 'keychains', 'mouse-pads']

const INFO = {
  fixedRange:    'Price range is fixed based on standard production.',
  startingPrice: 'This product starts at the price shown — final pricing depends on requirements.',
  customQuote:   'This product requires a custom quote based on your project scope.',
}

export default function OptionSelection({
  product,
  selectedTierId, selectedQuantity, selectedSizeId,
  width, height,
  onTierChange, onQuantityChange, onSizeChange, onWidthChange, onHeightChange,
}) {
  if (!product) {
    return (
      <p className="text-sm text-slate-400 italic">
        Select a product type to configure options.
      </p>
    )
  }

  const tierOptions = ['tieredQuantity', 'tieredSize'].includes(product.type)
    ? product.tiers.map((t) => ({
        value:       t.id,
        label:       t.label,
        description: PROMO_IDS.includes(product.id) ? undefined : t.note,
      }))
    : []

  const selectedTier = product.type === 'tieredQuantity'
    ? product.tiers.find((t) => t.id === selectedTierId)
    : null

  const quantityOptions = product.type === 'quantity'
    ? product.quantities.map((q) => ({ label: q, value: q }))
    : product.type === 'tieredQuantity'
      ? (selectedTier?.priceTable ?? []).map((row) => ({ label: row.quantity, value: row.quantity }))
      : []

  const sizeOptions = ['size', 'fixedOptions', 'tieredSize'].includes(product.type)
    ? product.type === 'tieredSize'
        ? product.tiers.map((t) => ({
            value:       t.id,
            label:       t.label,
            description: `${t.sizes} — ${t.priceLabel}`,
          }))
        : product.options.map((o) => ({
            value:       o.id,
            label:       o.label,
            description: product.id === 'a-frame-sign' ? undefined : o.priceLabel,
          }))
    : []

  const activeTier = product.type === 'tieredSize'
    ? product.tiers.find((t) => t.id === selectedSizeId)
    : null

  return (
    <div className="space-y-4">

      {/* Area / dimensions */}
      {product.type === 'area' && (
        <DimensionsSelector
          width={width} height={height}
          onWidthChange={onWidthChange} onHeightChange={onHeightChange}
        />
      )}

      {/* Quantity / tiered-quantity */}
      {['quantity', 'tieredQuantity'].includes(product.type) && (
        <div className={`grid gap-4 ${product.type === 'tieredQuantity' ? 'sm:grid-cols-2' : ''}`}>
          {product.type === 'tieredQuantity' && (
            <DropdownSelector
              label="Choose tier"
              options={tierOptions}
              value={selectedTierId}
              onChange={onTierChange}
              placeholder="Select product tier"
            />
          )}
          <DropdownSelector
            label="Choose quantity"
            options={quantityOptions}
            value={selectedQuantity}
            onChange={onQuantityChange}
            placeholder="Select quantity"
          />
        </div>
      )}

      {/* Size / fixed options / tiered size */}
      {['size', 'fixedOptions', 'tieredSize'].includes(product.type) && (
        <DropdownSelector
          label="Choose size / option"
          options={sizeOptions}
          value={selectedSizeId}
          onChange={onSizeChange}
          placeholder="Select option"
        />
      )}

      {/* Tiered-size detail panel */}
      {product.type === 'tieredSize' && activeTier && (
        <div className="rounded-xl bg-rose-50 p-4 text-xs space-y-3">
          <p className="font-semibold text-slate-800">Sizes: {activeTier.sizes}</p>
          {activeTier.bestFor?.length > 0 && (
            <div className="space-y-1">
              <p className="font-semibold uppercase tracking-wider text-slate-400">Best For</p>
              {activeTier.bestFor.map((item, i) => (
                <p key={i} className="flex items-center gap-2 text-slate-600">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-rose-400" />
                  {item}
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Static info banner */}
      {INFO[product.type] && (
        <p className="rounded-xl bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-500">
          {INFO[product.type]}
        </p>
      )}
    </div>
  )
}