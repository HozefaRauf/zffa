export default function SizeSelector({ options, selectedSizeId, onChange }) {
  if (!options?.length) return null

  return (
    <div className="space-y-2">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Select option</p>
      <div className="space-y-2">
        {options.map((opt) => {
          const active = selectedSizeId === opt.id
          return (
            <button key={opt.id} type="button" onClick={() => onChange(opt.id)}
              className={`choice ${active ? 'choice-active' : ''}`}
            >
              <p className="text-sm font-semibold">{opt.label}</p>
              {opt.priceLabel && (
                <p className={`mt-0.5 text-xs ${active ? 'text-rose-200' : 'text-slate-400'}`}>
                  {opt.priceLabel}
                </p>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
