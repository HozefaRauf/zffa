import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import categories from '../data/pricingData'
import { getCategoryById, getProductById, getCurrentEstimate } from '../utils/pricingLogic'
import CategorySelection from '../components/CategorySelection'
import ProductSelection from '../components/ProductSelection'
import OptionSelection from '../components/OptionSelection'
import EstimateCard from '../components/EstimateCard'
import ProgressBar from '../components/ProgressBar'
import QuoteButton from '../components/QuoteButton'

function PricingEstimator() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [selectedTierId, setSelectedTierId] = useState(null)
  const [selectedQuantity, setSelectedQuantity] = useState('')
  const [selectedSizeId, setSelectedSizeId] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')

  useEffect(() => {
    setSelectedProductId(null)
    setSelectedTierId(null)
    setSelectedQuantity('')
    setSelectedSizeId('')
    setWidth('')
    setHeight('')
  }, [selectedCategoryId])

  useEffect(() => {
    setSelectedTierId(null)
    setSelectedQuantity('')
    setSelectedSizeId('')
    setWidth('')
    setHeight('')
  }, [selectedProductId])

  const selectedCategory = useMemo(
    () => getCategoryById(categories, selectedCategoryId),
    [selectedCategoryId]
  )
  const selectedProduct = useMemo(
    () => getProductById(selectedCategory, selectedProductId),
    [selectedCategory, selectedProductId]
  )

  const estimate = getCurrentEstimate(selectedProduct, {
    selectedTierId,
    selectedQuantity,
    selectedSizeId,
    width,
    height,
  })

  const currentStep = selectedCategory ? (selectedProduct ? 3 : 2) : 1

  return (
    <div className="mx-auto max-w-screen-2xl px-5 py-8 sm:px-8 lg:px-12">
      <div className="grid gap-6 xl:grid-cols-[1.25fr_auto_1.1fr]">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="left-panel rounded-[2rem] border border-rose-200 p-8 shadow-panel sm:p-10"
        >
          <div className="mb-8 flex items-center justify-between gap-4 rounded-[2rem] border border-rose-100 bg-white/80 px-6 py-5 shadow-sm">
            <div>
              <p className="text-3xl font-semibold text-slate-950">Project Details</p>
              <h1 className="mt-3 text-4xl font-semibold text-slate-950 sm:text-5xl"> </h1>
            </div>
            <span className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm">
              Refined estimate flow
            </span>
          </div>

          <section className="space-y-8">
            <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900">Service Category *</h2>
              <p className="mt-2 text-sm text-slate-500">Choose the service area that best fits your project.</p>
              <div className="mt-5">
                <CategorySelection
                  categories={categories}
                  selectedCategoryId={selectedCategoryId}
                  onSelect={setSelectedCategoryId}
                />
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900">Select Type *</h2>
              <p className="mt-2 text-sm text-slate-500">Pick the product type for this service category.</p>
              <div className="mt-5">
                <ProductSelection
                  category={selectedCategory}
                  selectedProductId={selectedProductId}
                  onSelect={setSelectedProductId}
                />
              </div>
            </div>

            <div className="rounded-[1.75rem] bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold text-slate-900">Select Size / Coverage *</h2>
              <p className="mt-2 text-sm text-slate-500">Refine your choice with size, volume, or dimensions.</p>
              <div className="mt-5">
                <OptionSelection
                  product={selectedProduct}
                  selectedTierId={selectedTierId}
                  selectedQuantity={selectedQuantity}
                  selectedSizeId={selectedSizeId}
                  width={width}
                  height={height}
                  onTierChange={setSelectedTierId}
                  onQuantityChange={setSelectedQuantity}
                  onSizeChange={setSelectedSizeId}
                  onWidthChange={setWidth}
                  onHeightChange={setHeight}
                />
              </div>
            </div>
          </section>
        </motion.section>

        <div className="relative hidden xl:flex">
          <div className="absolute inset-y-0 left-1/2 w-16 -translate-x-1/2 rounded-full bg-rose-600 shadow-lg" />
          <div className="relative flex h-full w-16 items-center justify-center">
            <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 text-sm font-semibold uppercase tracking-[0.36em] text-white">
              Price Estimator
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
            className="rounded-[2rem] bg-[#ffe8ea] p-8 shadow-panel"
          >
            <EstimateCard
              category={selectedCategory}
              product={selectedProduct}
              selectedTierId={selectedTierId}
              selectedQuantity={selectedQuantity}
              selectedSizeId={selectedSizeId}
              width={width}
              height={height}
              estimate={estimate}
            />
            <div className="mt-8">
              <QuoteButton />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.16 }}
            className="overflow-hidden rounded-[2rem] bg-white shadow-panel"
          >
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
              alt="Collaborative workspace"
              className="h-72 w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default PricingEstimator
