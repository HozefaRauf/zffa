import OptionCard from './OptionCard'
import { getStartingPrice } from '../../utils/pricingLogic'

export default function ProductStep({ category, selectedProductId, onSelect }) {
  if (!category) return null

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Which {category.title} product do you need?
        </h2>
        <span className="mt-2 block h-1 w-12 rounded-full bg-rose-600" aria-hidden="true" />
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          Prices shown are starting estimates — you'll refine the details next.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {category.products.map((product) => (
            <OptionCard
              key={product.id}
              icon={product.icon}
              title={product.title}
              badge={getStartingPrice(product)}
              categoryId={category.id}
              selected={selectedProductId === product.id}
              onClick={() => onSelect(product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
