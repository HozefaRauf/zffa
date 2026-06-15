import OptionCard from './OptionCard'

export default function QuantityStep({ product, selectedTier, selectedQuantity, onSelect, categoryId }) {
  if (!product) return null

  const priceTable = selectedTier ? selectedTier.priceTable : product.priceTable ?? []
  const tierLabel = selectedTier?.label

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          {tierLabel ? `How many ${tierLabel} do you need?` : 'How many do you need?'}
        </h2>
        <span className="mt-2 block h-1 w-12 rounded-full bg-rose-600" aria-hidden="true" />
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          Choose a quantity to see your price estimate.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {priceTable.map((row) => (
            <OptionCard
              key={row.quantity}
              icon="Hash"
              title={row.quantity}
              badge={row.range}
              categoryId={categoryId}
              selected={selectedQuantity === row.quantity}
              onClick={() => onSelect(row.quantity)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
