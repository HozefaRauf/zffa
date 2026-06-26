import { useState, useRef } from 'react'
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react'

const TYPE_LABELS = {
  area: 'Area (sq ft)',
  quantity: 'Quantity',
  tieredQuantity: 'Tiered Qty',
  size: 'Size Options',
  fixedOptions: 'Fixed Options',
  tieredSize: 'Tiered Size',
  fixedRange: 'Fixed Range',
  startingPrice: 'Starting Price',
  customQuote: 'Custom Quote',
}

function getPriceSummary(product) {
  switch (product.type) {
    case 'area':
      return `$${product.minPerSqFt}–$${product.maxPerSqFt} / sq ft`
    case 'quantity':
    case 'size':
    case 'fixedOptions':
    case 'fixedRange':
    case 'startingPrice':
    case 'customQuote':
      return product.priceLabel ?? '—'
    case 'tieredQuantity':
      return `${product.tiers?.length ?? 0} tier${product.tiers?.length === 1 ? '' : 's'}`
    case 'tieredSize':
      return `${product.tiers?.length ?? 0} size${product.tiers?.length === 1 ? '' : 's'}`
    default:
      return '—'
  }
}

export default function ProductList({ category, onAdd, onEdit, onDelete, onReorder }) {
  const [draggingId, setDraggingId] = useState(null)
  const [overIndex, setOverIndex] = useState(null)
  const dragSrcIndex = useRef(null)
  const products = category.products ?? []

  function handleDragStart(e, index) {
    dragSrcIndex.current = index
    setDraggingId(products[index].id)
    e.dataTransfer.effectAllowed = 'move'
  }

  function handleDragOver(e, index) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setOverIndex(index)
  }

  function handleDrop(e, index) {
    e.preventDefault()
    if (dragSrcIndex.current === null || dragSrcIndex.current === index) return
    const reordered = [...products]
    const [moved] = reordered.splice(dragSrcIndex.current, 1)
    reordered.splice(index, 0, moved)
    onReorder(reordered)
    dragSrcIndex.current = null
    setDraggingId(null)
    setOverIndex(null)
  }

  function handleDragEnd() {
    setDraggingId(null)
    setOverIndex(null)
    dragSrcIndex.current = null
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-extrabold text-slate-900">{category.title}</h2>
          <p className="mt-0.5 text-sm text-slate-500">
            {products.length} product{products.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1.5 rounded-xl bg-rose-600 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-rose-700 transition-colors"
        >
          <Plus size={14} />
          Add Product
        </button>
      </div>

      {/* Product cards */}
      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 py-12 text-center">
          <p className="text-sm text-slate-400">No products yet — add one above.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {products.map((product, index) => {
            const isDragging = draggingId === product.id
            const isOver = overIndex === index && draggingId !== product.id

            return (
              <li
                key={product.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                className={`group flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all
                  ${isDragging ? 'opacity-40' : ''}
                  ${isOver ? 'border-t-2 border-rose-400' : ''}`}
              >
                <GripVertical
                  size={16}
                  className="shrink-0 cursor-grab text-slate-300 hover:text-slate-400 active:cursor-grabbing"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-bold text-slate-900">{product.title}</span>
                    <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
                      {TYPE_LABELS[product.type] ?? product.type}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {getPriceSummary(product)}
                    {product.note ? ` · ${product.note.slice(0, 60)}${product.note.length > 60 ? '…' : ''}` : ''}
                  </p>
                </div>

                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => onEdit(product)}
                    className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:border-rose-200 hover:text-rose-600 transition-colors"
                  >
                    <Pencil size={12} />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(product)}
                    className="rounded-lg border border-slate-200 p-1.5 text-slate-400 hover:border-rose-200 hover:text-rose-600 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
