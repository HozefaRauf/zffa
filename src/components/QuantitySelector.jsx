export default function QuantitySelector({ quantities, selectedQuantity, onChange }) {
  if (!quantities?.length) {
    return null
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-900">Quantity</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {quantities.map((quantity) => (
          <button
            key={quantity}
            type="button"
            onClick={() => onChange(quantity)}
            className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
              selectedQuantity === quantity
                ? 'border-accent bg-accent text-white'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-900/10 hover:bg-slate-100'
            }`}
          >
            {quantity}
          </button>
        ))}
      </div>
    </div>
  )
}
