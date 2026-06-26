export default function AreaEditor({ data, onChange }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">Min $/sq ft *</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={data.minPerSqFt ?? ''}
            onChange={(e) => onChange({ ...data, minPerSqFt: parseFloat(e.target.value) || 0 })}
            className="field"
            placeholder="60"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">Max $/sq ft *</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={data.maxPerSqFt ?? ''}
            onChange={(e) => onChange({ ...data, maxPerSqFt: parseFloat(e.target.value) || 0 })}
            className="field"
            placeholder="70"
          />
        </div>
      </div>
      <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
        Price = width × height (in sq ft) × this rate. Displayed as a min–max range.
      </p>
    </div>
  )
}
