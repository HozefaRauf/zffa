import { toSqFt } from '../../utils/pricingLogic'

const UNIT_OPTIONS = [
  { value: 'in', label: 'Inches (in)' },
  { value: 'ft', label: 'Feet (ft)' },
  { value: 'cm', label: 'Centimeters (cm)' },
  { value: 'm',  label: 'Meters (m)' },
]

const WIDTH_PLACEHOLDERS = { in: '48', ft: '4', cm: '120', m: '1.2' }
const HEIGHT_PLACEHOLDERS = { in: '24', ft: '2', cm: '60', m: '0.6' }

export default function DimensionsStep({ product, width, height, unit, onWidthChange, onHeightChange, onUnitChange }) {
  const sqFt = toSqFt(width, height, unit)
  const hasArea = !isNaN(sqFt) && sqFt > 0

  function handleUnitChange(newUnit) {
    onUnitChange(newUnit)
    onWidthChange('')
    onHeightChange('')
  }

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
        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">
            Unit of measurement
          </label>
          <select
            value={unit}
            onChange={(e) => handleUnitChange(e.target.value)}
            className="field"
          >
            {UNIT_OPTIONS.map((u) => (
              <option key={u.value} value={u.value}>{u.label}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Width ({unit})
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={width}
              onChange={(e) => onWidthChange(e.target.value)}
              placeholder={`e.g. ${WIDTH_PLACEHOLDERS[unit] ?? '10'}`}
              className="field"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Height ({unit})
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={height}
              onChange={(e) => onHeightChange(e.target.value)}
              placeholder={`e.g. ${HEIGHT_PLACEHOLDERS[unit] ?? '10'}`}
              className="field"
            />
          </div>
        </div>

        {hasArea && (
          <div className="mt-4 rounded-xl bg-rose-50 px-4 py-3">
            <p className="text-sm font-semibold text-rose-700">
              Calculated area: {sqFt.toFixed(2)} sq ft
            </p>
            {product?.minPerSqFt != null && (
              <p className="mt-0.5 text-xs text-rose-500">
                Approx. ${Math.round(sqFt * product.minPerSqFt).toLocaleString()} –{' '}
                ${Math.round(sqFt * product.maxPerSqFt).toLocaleString()} CAD
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
