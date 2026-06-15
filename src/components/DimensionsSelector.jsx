export default function DimensionsSelector({ width, height, onWidthChange, onHeightChange }) {
  const area = width && height ? (parseFloat(width) * parseFloat(height)).toFixed(2) : null

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[
          { id: 'width-input',  label: 'Width (ft)',  value: width,  onChange: onWidthChange  },
          { id: 'height-input', label: 'Height (ft)', value: height, onChange: onHeightChange },
        ].map(({ id, label, value, onChange }) => (
          <div key={id}>
            <label htmlFor={id} className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 mb-1.5">
              {label}
            </label>
            <input
              id={id}
              type="number"
              min="0"
              step="0.1"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="field"
              placeholder="e.g. 4"
            />
          </div>
        ))}
      </div>

      {area && (
        <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-slate-500">
          Calculated area:{' '}
          <span className="font-semibold text-rose-600">{area} sq&nbsp;ft</span>
        </p>
      )}

      <p className="text-xs text-slate-400">
        Enter square footage to estimate area-based signage (box signs, channel letters, etc.)
      </p>
    </div>
  )
}