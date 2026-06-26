import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function PriceTable({ rows, onChange }) {
  function updateRow(index, field, value) {
    const updated = rows.map((r, i) => (i === index ? { ...r, [field]: value } : r))
    onChange(updated)
  }
  function addRow() { onChange([...rows, { quantity: '', range: '' }]) }
  function removeRow(index) { onChange(rows.filter((_, i) => i !== index)) }

  return (
    <div className="space-y-2">
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-xs">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-1.5 text-left font-bold text-slate-500">Qty</th>
              <th className="px-3 py-1.5 text-left font-bold text-slate-500">Price Range</th>
              <th className="w-7 px-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, i) => (
              <tr key={i}>
                <td className="px-1.5 py-1">
                  <input type="text" value={row.quantity} onChange={(e) => updateRow(i, 'quantity', e.target.value)}
                    className="field py-1 text-xs" placeholder="100" />
                </td>
                <td className="px-1.5 py-1">
                  <input type="text" value={row.range} onChange={(e) => updateRow(i, 'range', e.target.value)}
                    className="field py-1 text-xs" placeholder="$40–$60" />
                </td>
                <td className="px-1.5 py-1">
                  <button type="button" onClick={() => removeRow(i)} className="rounded p-1 text-slate-400 hover:text-rose-600">
                    <Trash2 size={11} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button type="button" onClick={addRow}
        className="flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700">
        <Plus size={12} /> Add row
      </button>
    </div>
  )
}

export default function TieredQuantityEditor({ data, onChange }) {
  const tiers = data.tiers ?? []
  const [activeTab, setActiveTab] = useState(0)

  function updateTier(index, patch) {
    const updated = tiers.map((t, i) => (i === index ? { ...t, ...patch } : t))
    syncQuantities(updated)
  }

  function updateTierTable(index, priceTable) {
    updateTier(index, { priceTable })
  }

  function addTier() {
    const newTier = { id: `tier-${Date.now()}`, label: 'New Tier', note: '', priceTable: [] }
    const updated = [...tiers, newTier]
    setActiveTab(updated.length - 1)
    syncQuantities(updated)
  }

  function removeTier(index) {
    const updated = tiers.filter((_, i) => i !== index)
    if (activeTab >= updated.length) setActiveTab(Math.max(0, updated.length - 1))
    syncQuantities(updated)
  }

  function syncQuantities(updatedTiers) {
    const allQtys = [...new Set(updatedTiers.flatMap((t) => (t.priceTable ?? []).map((r) => r.quantity)))]
    onChange({ ...data, tiers: updatedTiers, quantities: allQtys })
  }

  return (
    <div className="space-y-3">
      {/* Tier tabs */}
      <div className="flex flex-wrap items-center gap-1">
        {tiers.map((tier, i) => (
          <button
            key={tier.id}
            type="button"
            onClick={() => setActiveTab(i)}
            className={`rounded-lg px-3 py-1 text-xs font-semibold transition-colors
              ${activeTab === i ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {tier.label || `Tier ${i + 1}`}
          </button>
        ))}
        <button
          type="button"
          onClick={addTier}
          className="flex items-center gap-1 rounded-lg border border-dashed border-slate-300 px-2 py-1 text-xs font-semibold text-slate-500 hover:border-rose-400 hover:text-rose-600"
        >
          <Plus size={11} /> Add Tier
        </button>
      </div>

      {/* Active tier editor */}
      {tiers[activeTab] && (
        <div className="rounded-xl border border-slate-200 p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 space-y-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Tier Label</label>
                <input
                  type="text"
                  value={tiers[activeTab].label}
                  onChange={(e) => updateTier(activeTab, { label: e.target.value, id: slugify(e.target.value) || tiers[activeTab].id })}
                  className="field text-xs py-1.5"
                  placeholder="e.g. Standard"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-600">Tier Note</label>
                <input
                  type="text"
                  value={tiers[activeTab].note ?? ''}
                  onChange={(e) => updateTier(activeTab, { note: e.target.value })}
                  className="field text-xs py-1.5"
                  placeholder="e.g. 100lb gloss or matte stock."
                />
              </div>
            </div>
            {tiers.length > 1 && (
              <button
                type="button"
                onClick={() => removeTier(activeTab)}
                className="mt-0.5 rounded-lg border border-rose-200 p-1.5 text-rose-500 hover:bg-rose-50"
                title="Remove this tier"
              >
                <Trash2 size={13} />
              </button>
            )}
          </div>
          <PriceTable
            rows={tiers[activeTab].priceTable ?? []}
            onChange={(table) => updateTierTable(activeTab, table)}
          />
        </div>
      )}
    </div>
  )
}
