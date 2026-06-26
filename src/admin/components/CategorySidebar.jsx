import { useState, useRef } from 'react'
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react'

export default function CategorySidebar({
  categories,
  selectedCatId,
  onSelect,
  onAdd,
  onEdit,
  onDelete,
  onReorder,
}) {
  const [draggingId, setDraggingId] = useState(null)
  const [overIndex, setOverIndex] = useState(null)
  const dragSrcIndex = useRef(null)

  function handleDragStart(e, index) {
    dragSrcIndex.current = index
    setDraggingId(categories[index].id)
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
    const reordered = [...categories]
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
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="border-b border-slate-100 px-4 py-3">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Categories</p>
      </div>

      <ul className="flex-1 overflow-y-auto py-2">
        {categories.map((cat, index) => {
          const isSelected = cat.id === selectedCatId
          const isDragging = draggingId === cat.id
          const isOver = overIndex === index && draggingId !== cat.id

          return (
            <li
              key={cat.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`group mx-2 mb-0.5 flex items-center gap-1 rounded-xl transition-all
                ${isSelected ? 'bg-rose-50 text-rose-700' : 'hover:bg-slate-50 text-slate-700'}
                ${isDragging ? 'opacity-40' : ''}
                ${isOver ? 'border-t-2 border-rose-400' : ''}`}
            >
              <button
                type="button"
                className="flex flex-1 items-center gap-2 px-2 py-2.5 text-left"
                onClick={() => onSelect(cat.id)}
              >
                <GripVertical
                  size={14}
                  className="shrink-0 cursor-grab text-slate-300 group-hover:text-slate-400 active:cursor-grabbing"
                />
                <span className="flex-1 truncate text-sm font-semibold">{cat.title}</span>
                <span className="text-xs text-slate-400">{cat.products?.length ?? 0}</span>
              </button>

              <div className="flex shrink-0 pr-1 opacity-0 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onEdit(cat) }}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  title="Edit category"
                >
                  <Pencil size={12} />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onDelete(cat) }}
                  className="rounded-lg p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                  title="Delete category"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="border-t border-slate-100 p-3">
        <button
          type="button"
          onClick={onAdd}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-slate-300 py-2 text-xs font-semibold text-slate-500 hover:border-rose-300 hover:text-rose-600 transition-colors"
        >
          <Plus size={14} />
          Add Category
        </button>
      </div>
    </div>
  )
}
