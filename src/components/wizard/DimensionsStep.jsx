export default function DimensionsStep({ product, width, height, onWidthChange, onHeightChange }) {
  const area = parseFloat(width) * parseFloat(height)
  const hasArea = !isNaN(area) && area > 0

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          What size is your project?
        </h2>
        <span className="mt-2 block h-1 w-12 rounded-full bg-rose-600" aria-hidden="true" />
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          Enter the width and height of the area to be covered.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Width (ft)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={width}
              onChange={(e) => onWidthChange(e.target.value)}
              placeholder="e.g. 4"
              className="field"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Height (ft)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={height}
              onChange={(e) => onHeightChange(e.target.value)}
              placeholder="e.g. 2"
              className="field"
            />
          </div>
        </div>

        {hasArea && (
          <div className="mt-4 rounded-xl bg-rose-50 px-4 py-3">
            <p className="text-sm font-semibold text-rose-700">
              Calculated area: {area.toFixed(2)} sq ft
            </p>
            {product?.minPerSqFt != null && (
              <p className="mt-0.5 text-xs text-rose-500">
                Approx. ${Math.round(area * product.minPerSqFt).toLocaleString()} –{' '}
                ${Math.round(area * product.maxPerSqFt).toLocaleString()} CAD
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
