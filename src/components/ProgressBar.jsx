const steps = ['Category', 'Product', 'Estimate']

export default function ProgressBar({ step }) {
  return (
    <div className="mb-5 rounded-3xl border border-slate-200 bg-slate-900/95 p-5 text-white shadow-lg shadow-slate-900/10">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Estimator progress</p>
      <div className="mt-4 grid gap-3">
        {steps.map((label, index) => {
          const active = index + 1 <= step
          return (
            <div key={label} className="flex items-center gap-3">
              <div
                className={`grid h-9 w-9 place-items-center rounded-2xl text-sm font-semibold transition ${
                  active ? 'bg-accent text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {index + 1}
              </div>
              <div>
                <p className={`text-sm font-semibold ${active ? 'text-white' : 'text-slate-400'}`}>{label}</p>
                <div className="h-1 rounded-full bg-slate-800">
                  <div className={`h-full rounded-full bg-accent ${active ? 'w-full' : 'w-0'}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
