import OptionCard from './OptionCard'

function getLowestTierPrice(tier) {
  if (!tier?.priceTable) return null
  const amounts = tier.priceTable
    .map((row) => {
      const match = row.range.match(/\$([\d,]+(?:\.\d+)?)/)
      return match ? parseFloat(match[1].replace(/,/g, '')) : null
    })
    .filter((n) => n != null)
  return amounts.length ? `From $${Math.min(...amounts)}` : null
}

export default function TierStep({ product, selectedTierId, onSelect, categoryId }) {
  if (!product) return null

  const isTieredSize = product.type === 'tieredSize'

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Which option fits best?
        </h2>
        <span className="mt-2 block h-1 w-12 rounded-full bg-rose-600" aria-hidden="true" />
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          Select the tier that matches your requirements.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {product.tiers.map((tier) => {
            const badge = isTieredSize
              ? tier.priceLabel
              : getLowestTierPrice(tier)

            const subtitle = isTieredSize
              ? [
                  tier.sizes,
                  tier.bestFor
                    ? `Best for: ${Array.isArray(tier.bestFor) ? tier.bestFor.join(', ') : tier.bestFor}`
                    : null,
                ]
                  .filter(Boolean)
                  .join(' · ')
              : tier.note

            return (
              <OptionCard
                key={tier.id}
                icon="Shapes"
                title={tier.label}
                subtitle={subtitle}
                badge={badge}
                categoryId={categoryId}
                selected={selectedTierId === tier.id}
                onClick={() => onSelect(tier.id)}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
