import { Plus, Trash2 } from 'lucide-react'

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function TieredSizeEditor({ data, onChange }) {
  const tiers = data.tiers ?? []

  function updateTier(index, patch) {
    const updated = tiers.map((t, i) => (i === index ? { ...t, ...patch } : t))
    onChange({ ...data, tiers: updated })
  }

  function addTier() {
    onChange({
      ...data,
      tiers: [...tiers, { id: `tier-${Date.now()}`, label: '', sizes: '', bestFor: [], priceLabel: '' }],
    })
  }

  function removeTier(index) {
    onChange({ ...data, tiers: tiers.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Size Tiers</p>
      <div className="space-y-3">
        {tiers.map((tier, i) => (
          <div key={i} className="rounded-xl border border-slate-200 p-3 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={tier.label}
                onChange={(e) => updateTier(i, { label: e.target.value, id: slugify(e.target.value) || tier.id })}
                className="field flex-1 py-1.5 text-xs font-semibold"
                placeholder="e.g. Small Signs"
              />
              <button type="button" onClick={() => removeTier(i)}
                className="shrink-0 rounded p-1 text-slate-400 hover:text-rose-600">
                <Trash2 size={13} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="mb-1 block text-xs text-slate-500">Sizes</label>
                <input
                  type="text"
                  value={tier.sizes ?? ''}
                  onChange={(e) => updateTier(i, { sizes: e.target.value })}
                  className="field py-1.5 text-xs"
                  placeholder="e.g. 6x6, 8x10, 12x12"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-slate-500">Price Label</label>
                <input
                  type="text"
                  value={tier.priceLabel ?? ''}
                  onChange={(e) => updateTier(i, { priceLabel: e.target.value })}
                  className="field py-1.5 text-xs"
                  placeholder="e.g. Starting at $29"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-500">Best For (comma-separated)</label>
              <input
                type="text"
                value={(tier.bestFor ?? []).join(', ')}
                onChange={(e) => updateTier(i, { bestFor: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                className="field py-1.5 text-xs"
                placeholder="e.g. Parking signs, Notices"
              />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addTier}
        className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700"
      >
        <Plus size={13} /> Add size tier
      </button>
    </div>
  )
}
