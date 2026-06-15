import OptionCard from './OptionCard'

export default function SizeOptionStep({ product, selectedSizeId, onSelect }) {
  if (!product) return null

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Choose a size / option
        </h2>
        <span className="mt-2 block h-1 w-12 rounded-full bg-rose-600" aria-hidden="true" />
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          Pick the option that fits your project.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {product.options.map((option) => (
          <OptionCard
            key={option.id}
            icon="Shapes"
            title={option.label}
            badge={option.priceLabel}
            selected={selectedSizeId === option.id}
            onClick={() => onSelect(option.id)}
          />
        ))}
      </div>
    </div>
  )
}
