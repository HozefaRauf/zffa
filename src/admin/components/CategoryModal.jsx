import { useState } from 'react'
import { X } from 'lucide-react'

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

export default function CategoryModal({ initial, onSave, onClose }) {
  const isEdit = !!initial
  const [title, setTitle] = useState(initial?.title ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [icon, setIcon] = useState(initial?.icon ?? 'Package')

  function handleSave(e) {
    e.preventDefault()
    if (!title.trim()) return
    onSave({
      id: initial?.id ?? slugify(title),
      title: title.trim(),
      description: description.trim(),
      icon,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="font-display text-lg font-extrabold text-slate-900">
            {isEdit ? 'Edit Category' : 'Add Category'}
          </h2>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4 p-6">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="field"
              placeholder="e.g. Store Front Signage"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="field min-h-[72px] resize-y"
              placeholder="Short description shown on the category card."
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">Icon</label>
            <select value={icon} onChange={(e) => setIcon(e.target.value)} className="field">
              {ICON_OPTIONS.map((ic) => (
                <option key={ic} value={ic}>{ic}</option>
              ))}
            </select>
            <p className="mt-1 text-xs text-slate-400">Selected: <strong>{icon}</strong> (Lucide icon name)</p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
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
              {isEdit ? 'Save Changes' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
