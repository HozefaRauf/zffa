import { useState } from 'react'
import { X } from 'lucide-react'
import AreaEditor from './editors/AreaEditor'
import QuantityEditor from './editors/QuantityEditor'
import TieredQuantityEditor from './editors/TieredQuantityEditor'
import FixedOptionsEditor from './editors/FixedOptionsEditor'
import TieredSizeEditor from './editors/TieredSizeEditor'
import SimpleEditor from './editors/SimpleEditor'

const PRODUCT_TYPES = [
  { value: 'area',            label: 'Area-based (sq ft pricing)' },
  { value: 'quantity',        label: 'Quantity (one price table)' },
  { value: 'tieredQuantity',  label: 'Tiered Quantity (multiple tiers)' },
  { value: 'size',            label: 'Size Options' },
  { value: 'fixedOptions',    label: 'Fixed Options' },
  { value: 'tieredSize',      label: 'Tiered Sizes' },
  { value: 'fixedRange',      label: 'Fixed Range (e.g. $20–$170)' },
  { value: 'startingPrice',   label: 'Starting Price' },
  { value: 'customQuote',     label: 'Custom Quote' },
]

const ICON_OPTIONS = [
  'Store','AppWindow','Car','Flag','Printer','Gift','Presentation','Globe',
  'LayoutTemplate','Lightbulb','Triangle','Replace','PanelLeft','Sticker',
  'Magnet','CarFront','Shapes','Image','GalleryVerticalEnd','Columns2',
  'PanelsTopLeft','SignpostBig','Signpost','Square','Frame','FlagTriangleRight',
  'IdCard','FileImage','BookOpen','MailOpen','Notebook','FolderOpen','DoorOpen',
  'Tag','Ticket','Mail','Coffee','GlassWater','CupSoda','KeyRound','Mouse',
  'MonitorPlay','Layers2','Tent','Monitor','MonitorSmartphone','Package',
]

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function getDefaultTypeData(type) {
  switch (type) {
    case 'area':           return { minPerSqFt: 0, maxPerSqFt: 0 }
    case 'quantity':       return { quantities: [], priceTable: [] }
    case 'tieredQuantity': return { quantities: [], tiers: [] }
    case 'size':
    case 'fixedOptions':   return { options: [] }
    case 'tieredSize':     return { tiers: [] }
    default:               return { priceLabel: '' }
  }
}

function getTypeData(product, type) {
  if (!product) return getDefaultTypeData(type)
  switch (type) {
    case 'area':           return { minPerSqFt: product.minPerSqFt ?? 0, maxPerSqFt: product.maxPerSqFt ?? 0 }
    case 'quantity':       return { quantities: product.quantities ?? [], priceTable: product.priceTable ?? [] }
    case 'tieredQuantity': return { quantities: product.quantities ?? [], tiers: product.tiers ?? [] }
    case 'size':
    case 'fixedOptions':   return { options: product.options ?? [] }
    case 'tieredSize':     return { tiers: product.tiers ?? [] }
    default:               return { priceLabel: product.priceLabel ?? '' }
  }
}

export default function ProductModal({ initial, categoryId, onSave, onClose }) {
  const isEdit = !!initial
  const [title, setTitle] = useState(initial?.title ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [icon, setIcon] = useState(initial?.icon ?? 'Package')
  const [type, setType] = useState(initial?.type ?? 'area')
  const [note, setNote] = useState(initial?.note ?? '')
  const [typeData, setTypeData] = useState(() => getTypeData(initial, initial?.type ?? 'area'))

  function handleTypeChange(newType) {
    setType(newType)
    setTypeData(getDefaultTypeData(newType))
  }

  function handleSave(e) {
    e.preventDefault()
    if (!title.trim()) return

    const base = {
      id: initial?.id ?? slugify(title),
      title: title.trim(),
      description: description.trim(),
      icon,
      type,
      note: note.trim() || undefined,
    }

    onSave({ ...base, ...typeData })
  }

  function renderTypeEditor() {
    switch (type) {
      case 'area':
        return <AreaEditor data={typeData} onChange={setTypeData} />
      case 'quantity':
        return <QuantityEditor data={typeData} onChange={setTypeData} />
      case 'tieredQuantity':
        return <TieredQuantityEditor data={typeData} onChange={setTypeData} />
      case 'size':
      case 'fixedOptions':
        return <FixedOptionsEditor data={typeData} onChange={setTypeData} />
      case 'tieredSize':
        return <TieredSizeEditor data={typeData} onChange={setTypeData} />
      case 'fixedRange':
      case 'startingPrice':
      case 'customQuote':
        return <SimpleEditor data={typeData} onChange={setTypeData} type={type} />
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex max-h-[90vh] w-full max-w-xl flex-col rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="font-display text-lg font-extrabold text-slate-900">
            {isEdit ? `Edit: ${initial.title}` : 'Add Product'}
          </h2>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
            <X size={16} />
          </button>
        </div>

        {/* Scrollable body */}
        <form onSubmit={handleSave} className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
            {/* Title */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="field"
                placeholder="e.g. Box Sign"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="field min-h-[60px] resize-y"
                placeholder="Short product description."
              />
            </div>

            {/* Icon + Type row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Icon</label>
                <select value={icon} onChange={(e) => setIcon(e.target.value)} className="field">
                  {ICON_OPTIONS.map((ic) => (
                    <option key={ic} value={ic}>{ic}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Pricing Type *</label>
                <select value={type} onChange={(e) => handleTypeChange(e.target.value)} className="field">
                  {PRODUCT_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Type-specific editor */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              {renderTypeEditor()}
            </div>

            {/* Note */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Note (optional)</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="field"
                placeholder="e.g. Includes die-cut door hole and full-color printing."
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex shrink-0 justify-end gap-2 border-t border-slate-100 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-bold text-white hover:bg-rose-700 disabled:opacity-40"
            >
              {isEdit ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
