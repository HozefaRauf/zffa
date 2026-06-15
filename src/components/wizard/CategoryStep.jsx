import OptionCard from './OptionCard'

export default function CategoryStep({ categories, selectedCategoryId, onSelect }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          What do you need today?
        </h2>
        <span className="mt-2 block h-1 w-12 rounded-full bg-rose-600" aria-hidden="true" />
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          Pick the category that best matches your project.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => (
            <OptionCard
              key={cat.id}
              icon={cat.icon}
              title={cat.title}
              categoryId={cat.id}
              selected={selectedCategoryId === cat.id}
              onClick={() => onSelect(cat.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
