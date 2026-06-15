export default function DropdownSelector({ label, options, value, onChange, placeholder }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <label htmlFor={`dropdown-${label.replace(/\s+/g, '-').toLowerCase()}`} className="block text-sm font-semibold text-slate-900">
        {label}
      </label>
      <div className="relative mt-3">
        <select
          id={`dropdown-${label.replace(/\s+/g, '-').toLowerCase()}`}
          value={value || ''}
          onChange={(event) => onChange(event.target.value)}
          className="input-surface w-full appearance-none pr-12 text-base"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">
          ▼
        </div>
      </div>
    </div>
  )
}
