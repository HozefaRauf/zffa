import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { ICONS } from '../../utils/iconMap'

export default function OptionCard({ icon, title, subtitle, badge, selected, onClick }) {
  const Icon = ICONS[icon] ?? Check

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group relative flex flex-col items-center gap-3 rounded-2xl border p-4 text-center transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2
        ${selected
          ? 'border-rose-600 bg-rose-50/60 ring-2 ring-rose-100'
          : 'border-slate-200 bg-white hover:-translate-y-1 hover:border-rose-200 hover:shadow-md active:scale-[0.98]'}`}
    >
      {selected && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-rose-600 text-white shadow-sm"
        >
          <Check size={14} strokeWidth={3} />
        </motion.span>
      )}

      <motion.span
        animate={selected ? { scale: [1, 1.15, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`grid h-12 w-12 place-items-center rounded-full transition-colors duration-200
          ${selected ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-rose-50 group-hover:text-rose-600'}`}
      >
        <Icon size={22} strokeWidth={1.75} />
      </motion.span>

      <span className={`text-sm font-semibold leading-snug ${selected ? 'text-rose-700' : 'text-slate-900'}`}>
        {title}
      </span>

      {subtitle && (
        <span className="text-xs leading-snug text-slate-500">{subtitle}</span>
      )}

      {badge && (
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium
          ${selected ? 'bg-white text-rose-700' : 'bg-slate-100 text-slate-500'}`}>
          {badge}
        </span>
      )}
    </button>
  )
}
