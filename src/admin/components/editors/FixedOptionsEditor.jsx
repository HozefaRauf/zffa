import { Plus, Trash2 } from 'lucide-react'

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function FixedOptionsEditor({ data, onChange }) {
  const options = data.options ?? []

  function updateOption(index, field, value) {
    const updated = options.map((o, i) => (i === index ? { ...o, [field]: value } : o))
    onChange({ ...data, options: updated })
  }

  function addOption() {
    onChange({ ...data, options: [...options, { id: `option-${Date.now()}`, label: '', priceLabel: '' }] })
  }

  function removeOption(index) {
    onChange({ ...data, options: options.filter((_, i) => i !== index) })
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Options</p>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              value={opt.label}
              onChange={(e) => updateOption(i, 'label', e.target.value)}
              onBlur={(e) => {
                if (!opt.id || opt.id.startsWith('option-')) {
                  updateOption(i, 'id', slugify(e.target.value) || opt.id)
                }
              }}
              className="field flex-1 py-1.5 text-xs"
              placeholder="e.g. Small (up to 12×18)"
            />
            <input
              type="text"
              value={opt.priceLabel}
              onChange={(e) => updateOption(i, 'priceLabel', e.target.value)}
              className="field w-36 py-1.5 text-xs"
              placeholder="e.g. $55–$75"
            />
            <button type="button" onClick={() => removeOption(i)}
              className="shrink-0 rounded p-1 text-slate-400 hover:text-rose-600">
              <Trash2 size={12} />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addOption}
        className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700"
      >
        <Plus size={13} /> Add option
      </button>
    </div>
  )
}
