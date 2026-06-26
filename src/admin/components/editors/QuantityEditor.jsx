import { Plus, Trash2 } from 'lucide-react'

export default function QuantityEditor({ data, onChange }) {
  const rows = data.priceTable ?? []

  function updateRow(index, field, value) {
    const updated = rows.map((r, i) => (i === index ? { ...r, [field]: value } : r))
    const quantities = updated.map((r) => r.quantity)
    onChange({ ...data, priceTable: updated, quantities })
  }

  function addRow() {
    const updated = [...rows, { quantity: '', range: '' }]
    onChange({ ...data, priceTable: updated, quantities: updated.map((r) => r.quantity) })
  }

  function removeRow(index) {
    const updated = rows.filter((_, i) => i !== index)
    onChange({ ...data, priceTable: updated, quantities: updated.map((r) => r.quantity) })
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Price Table</p>
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-bold text-slate-500">Quantity</th>
              <th className="px-3 py-2 text-left text-xs font-bold text-slate-500">Price Range</th>
              <th className="w-8 px-2 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, i) => (
              <tr key={i}>
                <td className="px-2 py-1.5">
                  <input
                    type="text"
                    value={row.quantity}
                    onChange={(e) => updateRow(i, 'quantity', e.target.value)}
                    className="field py-1.5 text-xs"
                    placeholder="e.g. 100"
                  />
                </td>
                <td className="px-2 py-1.5">
                  <input
                    type="text"
                    value={row.range}
                    onChange={(e) => updateRow(i, 'range', e.target.value)}
                    className="field py-1.5 text-xs"
                    placeholder="e.g. $80–$110"
                  />
                </td>
                <td className="px-2 py-1.5">
                  <button
                    type="button"
                    onClick={() => removeRow(i)}
                    className="rounded p-1 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        onClick={addRow}
        className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700"
      >
        <Plus size={13} /> Add row
      </button>
    </div>
  )
}
