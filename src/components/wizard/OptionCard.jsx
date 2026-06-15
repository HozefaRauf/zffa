import { useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { ICONS } from '../../utils/iconMap'
import { getColors } from '../../utils/categoryColorMap'

export default function OptionCard({
  icon,
  title,
  subtitle,
  badge,
  selected,
  onClick,
  categoryId,
}) {
  const Icon = ICONS[icon] ?? Check
  const colors = getColors(categoryId)
  const cardRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    card.style.setProperty('--spotlight-x', `${x}%`)
    card.style.setProperty('--spotlight-y', `${y}%`)
  }, [])

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      aria-pressed={selected}
      style={{ '--spotlight-x': '50%', '--spotlight-y': '50%' }}
      className={`
        group relative flex flex-col items-center gap-3 overflow-hidden
        rounded-2xl border p-4 text-center transition-all duration-200 ease-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2
        ${selected
          ? 'border-rose-600 bg-rose-50/60 ring-2 ring-rose-100 shadow-sm'
          : 'border-slate-200 bg-white hover:-translate-y-1 hover:border-rose-200 hover:shadow-md active:scale-[0.98]'
        }
      `}
    >
      {/* Cursor spotlight — only visible on hover, not when selected */}
      {!selected && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(circle at var(--spotlight-x) var(--spotlight-y), rgba(193,21,36,0.09), transparent 60%)',
          }}
        />
      )}

      {/* Check badge — springs in on selection, inside card boundary */}
      {selected && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          className="absolute right-2 top-2 z-10 grid h-6 w-6 place-items-center
                     rounded-full bg-rose-600 text-white shadow-md ring-2 ring-white"
          aria-hidden="true"
        >
          <Check size={13} strokeWidth={3} />
        </motion.span>
      )}

      {/* Icon badge */}
      <motion.span
        animate={selected ? { scale: [1, 1.15, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 grid h-12 w-12 place-items-center rounded-full transition-colors duration-200"
        style={
          selected
            ? { background: '#c11524', color: '#ffffff' }
            : { background: colors.badgeBg, color: colors.badgeIcon }
        }
      >
        <Icon size={22} strokeWidth={1.75} />
      </motion.span>

      {/* Title */}
      <span
        className={`relative z-10 text-sm font-semibold leading-snug transition-colors duration-150
          ${selected ? 'text-rose-700' : 'text-slate-800 group-hover:text-slate-900'}`}
      >
        {title}
      </span>

      {/* Optional subtitle */}
      {subtitle && (
        <span className="relative z-10 text-xs leading-snug text-slate-500">
          {subtitle}
        </span>
      )}

      {/* Optional price / quantity badge */}
      {badge && (
        <span
          className={`relative z-10 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors duration-150
            ${selected ? 'bg-white text-rose-700' : 'bg-slate-100 text-slate-500'}`}
        >
          {badge}
        </span>
      )}
    </button>
  )
}
