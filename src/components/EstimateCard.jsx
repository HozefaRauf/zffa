export default function EstimateCard({
  category, product,
  selectedTierId, selectedQuantity, selectedSizeId,
  width, height, estimate,
}) {
  const details = []
  if (product) {
    if (selectedTierId) {
      details.push({ k: 'Tier', v: product.tiers?.find((t) => t.id === selectedTierId)?.label ?? selectedTierId })
    }
    if (selectedQuantity) {
      details.push({ k: 'Quantity', v: selectedQuantity })
    }
    if (selectedSizeId) {
      const label = product.options?.find((o) => o.id === selectedSizeId)?.label
                 ?? product.tiers?.find((t) => t.id === selectedSizeId)?.label
                 ?? selectedSizeId
      details.push({ k: 'Option', v: label })
      if (product.type === 'tieredSize') {
        const tier = product.tiers?.find((t) => t.id === selectedSizeId)
        if (tier?.sizes)             details.push({ k: 'Sizes',    v: tier.sizes })
        if (tier?.bestFor?.length)   details.push({ k: 'Best For', v: tier.bestFor.join(', ') })
      }
    }
    if (width && height) {
      details.push({ k: 'Dimensions', v: `${width} × ${height} ft` })
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">

      {/* ── Price band ── */}
      <div className="bg-rose-600 px-6 py-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-rose-200">
          Estimated Price
        </p>
        <p className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">
          {estimate.price ?? '—'}
        </p>
        {product?.note && (
          <p className="mt-2 text-xs leading-relaxed text-rose-200">{product.note}</p>
        )}
      </div>

      {/* ── Breakdown ── */}
      <div className="p-5 space-y-4">
        <div className="space-y-2.5">
          {[
            { k: 'Category', v: category?.title },
            { k: 'Product',  v: product?.title  },
          ].map(({ k, v }) => (
            <div key={k} className="flex items-center justify-between gap-3 text-sm">
              <span className="text-slate-400">{k}</span>
              <span className="font-medium text-slate-900 text-right">
                {v ?? <span className="text-slate-200">—</span>}
              </span>
            </div>
          ))}
        </div>

        {details.length > 0 && (
          <div className="rounded-xl bg-rose-50 p-4 space-y-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rose-500">
              Selected Details
            </p>
            {details.map(({ k, v }) => (
              <div key={k} className="flex items-start justify-between gap-3 text-xs">
                <span className="text-slate-400 shrink-0">{k}</span>
                <span className="font-medium text-slate-700 text-right">{v}</span>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs leading-relaxed text-slate-400">
          Final pricing depends on design, materials, quantity, finishing, and installation.
        </p>
      </div>
    </div>
  )
}