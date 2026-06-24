import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Pencil } from 'lucide-react'
import { toSqFt } from '../../utils/pricingLogic'

function buildDetails({ category, product, selectedTier, selectedQuantity, selectedSizeId, width, height, unit }) {
  const details = []

  if (category) details.push({ label: 'Category', value: category.title })
  if (product) details.push({ label: 'Product', value: product.title })

  if (selectedTier) {
    details.push({ label: 'Option', value: selectedTier.label })
  }

  if (selectedQuantity) {
    details.push({ label: 'Quantity', value: selectedQuantity })
  }

  if (selectedSizeId && product?.options) {
    const opt = product.options.find((o) => o.id === selectedSizeId)
    if (opt) details.push({ label: 'Size / Option', value: opt.label })
  }

  if (selectedSizeId && product?.tiers) {
    const tier = product.tiers.find((t) => t.id === selectedSizeId)
    if (tier) details.push({ label: 'Size Tier', value: tier.label })
  }

  if (width && height) {
    const sqFt = toSqFt(width, height, unit)
    if (!isNaN(sqFt) && sqFt > 0) {
      details.push({ label: 'Dimensions', value: `${width} ${unit} × ${height} ${unit} (${sqFt.toFixed(2)} sq ft)` })
    }
  }

  return details
}

export default function ResultStep({
  estimate,
  category,
  product,
  selectedTier,
  selectedQuantity,
  selectedSizeId,
  width,
  height,
  unit,
  steps,
  stepIndex,
  onGoToStep,
  onStartOver,
}) {
  const [editOpen, setEditOpen] = useState(false)

  const details = buildDetails({ category, product, selectedTier, selectedQuantity, selectedSizeId, width, height, unit })

  const editableSteps = steps
    .map((key, idx) => ({ key, idx }))
    .filter(({ key }) => key !== 'result')

  const stepLabels = {
    category: 'Category',
    product: 'Product',
    dimensions: 'Dimensions',
    quantity: 'Quantity',
    tier: 'Option / Tier',
    size: 'Size / Option',
  }

  const stepValues = {
    category: category?.title,
    product: product?.title,
    dimensions: width && height ? `${width} ${unit} × ${height} ${unit}` : null,
    quantity: selectedQuantity || null,
    tier: selectedTier?.label || null,
    size: selectedSizeId
      ? (product?.options?.find((o) => o.id === selectedSizeId)?.label ||
         product?.tiers?.find((t) => t.id === selectedSizeId)?.label)
      : null,
  }

  return (
    <div className="flex flex-col items-center text-center">
      {/* Checkmark */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-rose-600 text-white"
      >
        <Check size={28} strokeWidth={3} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="mt-4 text-sm font-semibold uppercase tracking-widest text-slate-400"
      >
        Your estimate is ready
      </motion.p>

      {/* Price */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="font-display mt-3 text-4xl font-extrabold tracking-tight text-rose-600 sm:text-5xl"
      >
        {estimate?.price ?? '—'}
      </motion.p>

      {/* Breakdown card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="mt-6 w-full rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-sm"
      >
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">Breakdown</p>
        <ul className="space-y-2">
          {details.map(({ label, value }) => (
            <li key={label} className="flex items-baseline justify-between gap-4 text-sm">
              <span className="text-slate-500">{label}</span>
              <span className="text-right font-semibold text-slate-800">{value}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          This is an estimated price range. Final pricing depends on design, materials, and installation.
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.3 }}
        className="mt-6 flex w-full flex-col gap-3"
      >
        <a
          href={`/contact?category=${encodeURIComponent(category?.id ?? '')}&product=${encodeURIComponent(product?.id ?? '')}`}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-rose-600 px-6 py-3
            text-sm font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-150
            hover:-translate-y-0.5 hover:bg-rose-700 hover:shadow-md active:translate-y-0 active:scale-[0.97]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2"
        >
          Request Exact Quote
        </a>

        <button
          type="button"
          onClick={() => setEditOpen((v) => !v)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3
            text-sm font-bold uppercase tracking-wider text-slate-500 transition-all duration-150
            hover:border-slate-400 hover:text-slate-700 active:scale-[0.97]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2"
        >
          <Pencil size={14} />
          Edit Answers
        </button>

        <button
          type="button"
          onClick={onStartOver}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5
            text-sm font-bold uppercase tracking-wider text-slate-400 transition-colors duration-150
            hover:text-rose-600 active:scale-[0.97]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2"
        >
          Start Over
        </button>
      </motion.div>

      {/* Edit panel */}
      {editOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 w-full overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
        >
          <p className="border-b border-slate-100 px-5 py-3 text-xs font-bold uppercase tracking-widest text-slate-400">
            Jump to a step
          </p>
          <ul className="divide-y divide-slate-100">
            {editableSteps.map(({ key, idx }) => (
              <li key={key} className="flex items-center justify-between px-5 py-3">
                <div className="text-left">
                  <p className="text-xs text-slate-400">{stepLabels[key] ?? key}</p>
                  <p className="text-sm font-semibold text-slate-800">{stepValues[key] ?? '—'}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditOpen(false)
                    onGoToStep(idx)
                  }}
                  className="ml-4 flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5
                    text-xs font-bold uppercase tracking-wider text-slate-500 transition-all
                    hover:border-rose-200 hover:text-rose-600 active:scale-[0.97]"
                >
                  <Pencil size={11} />
                  Edit
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  )
}
