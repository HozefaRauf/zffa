export default function TierSelector({ tiers, selectedTierId, onChange }) {
  if (!tiers?.length) return null

  return (
    <div className="space-y-2">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Tier</p>
      <div className="space-y-2">
        {tiers.map((tier) => {
          const active = selectedTierId === tier.id
          return (
            <button key={tier.id} type="button" onClick={() => onChange(tier.id)}
              className={`choice ${active ? 'choice-active' : ''}`}
            >
              <span className="block text-sm font-semibold">{tier.label}</span>
              {tier.note && (
                <span className={`mt-0.5 block text-xs ${active ? 'text-rose-200' : 'text-slate-400'}`}>
                  {tier.note}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}