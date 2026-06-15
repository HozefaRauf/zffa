import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import categories from '../../data/pricingData'
import { getCategoryById, getProductById, getCurrentEstimate, getStepsForProduct } from '../../utils/pricingLogic'
import WizardTopBar from './WizardTopBar'
import WizardShell from './WizardShell'
import CategoryStep from './CategoryStep'
import ProductStep from './ProductStep'
import DimensionsStep from './DimensionsStep'
import QuantityStep from './QuantityStep'
import TierStep from './TierStep'
import SizeOptionStep from './SizeOptionStep'
import ResultStep from './ResultStep'

const variants = {
  enter: (dir) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
}

export default function PricingWizard() {
  const [stepIndex, setStepIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [selectedTierId, setSelectedTierId] = useState(null)
  const [selectedQuantity, setSelectedQuantity] = useState('')
  const [selectedSizeId, setSelectedSizeId] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')

  // Cascading resets on category change
  useEffect(() => {
    setSelectedProductId(null)
    setSelectedTierId(null)
    setSelectedQuantity('')
    setSelectedSizeId('')
    setWidth('')
    setHeight('')
  }, [selectedCategoryId])

  // Cascading resets on product change
  useEffect(() => {
    setSelectedTierId(null)
    setSelectedQuantity('')
    setSelectedSizeId('')
    setWidth('')
    setHeight('')
  }, [selectedProductId])

  // Reset quantity when tier changes
  useEffect(() => {
    setSelectedQuantity('')
  }, [selectedTierId])

  const selectedCategory = useMemo(
    () => getCategoryById(categories, selectedCategoryId),
    [selectedCategoryId]
  )

  const selectedProduct = useMemo(
    () => getProductById(selectedCategory, selectedProductId),
    [selectedCategory, selectedProductId]
  )

  const selectedTier = useMemo(
    () => selectedProduct?.tiers?.find((t) => t.id === selectedTierId) ?? null,
    [selectedProduct, selectedTierId]
  )

  const steps = useMemo(
    () => getStepsForProduct(selectedProduct),
    [selectedProduct]
  )

  const currentStepKey = steps[stepIndex] ?? 'category'
  const isResult = currentStepKey === 'result'

  const estimate = getCurrentEstimate(selectedProduct, {
    selectedTierId,
    selectedQuantity,
    selectedSizeId,
    width,
    height,
  })

  const nextEnabled = useMemo(() => {
    switch (currentStepKey) {
      case 'category':   return !!selectedCategoryId
      case 'product':    return !!selectedProductId
      case 'dimensions': return parseFloat(width) > 0 && parseFloat(height) > 0
      case 'quantity':   return !!selectedQuantity
      case 'tier':       return !!selectedTierId
      case 'size':       return !!selectedSizeId
      default:           return true
    }
  }, [currentStepKey, selectedCategoryId, selectedProductId, width, height, selectedQuantity, selectedTierId, selectedSizeId])

  function goNext() {
    if (!nextEnabled) return
    setDirection(1)
    setStepIndex((i) => Math.min(i + 1, steps.length - 1))
  }

  function goBack() {
    setDirection(-1)
    setStepIndex((i) => Math.max(i - 1, 0))
  }

  function goToStep(targetIndex) {
    setDirection(targetIndex >= stepIndex ? 1 : -1)
    setStepIndex(targetIndex)
  }

  function startOver() {
    setDirection(-1)
    setSelectedCategoryId(null)
    setSelectedProductId(null)
    setSelectedTierId(null)
    setSelectedQuantity('')
    setSelectedSizeId('')
    setWidth('')
    setHeight('')
    setStepIndex(0)
  }

  function handleCategorySelect(id) {
    setSelectedCategoryId(id)
    setDirection(1)
    setStepIndex(1)
  }

  function renderStep() {
    switch (currentStepKey) {
      case 'category':
        return (
          <CategoryStep
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelect={handleCategorySelect}
          />
        )
      case 'product':
        return (
          <ProductStep
            category={selectedCategory}
            selectedProductId={selectedProductId}
            onSelect={setSelectedProductId}
          />
        )
      case 'dimensions':
        return (
          <DimensionsStep
            product={selectedProduct}
            width={width}
            height={height}
            onWidthChange={setWidth}
            onHeightChange={setHeight}
          />
        )
      case 'tier':
        return (
          <TierStep
            product={selectedProduct}
            selectedTierId={selectedTierId}
            onSelect={setSelectedTierId}
            categoryId={selectedCategory?.id}
          />
        )
      case 'quantity':
        return (
          <QuantityStep
            product={selectedProduct}
            selectedTier={selectedTier}
            selectedQuantity={selectedQuantity}
            onSelect={setSelectedQuantity}
            categoryId={selectedCategory?.id}
          />
        )
      case 'size':
        return (
          <SizeOptionStep
            product={selectedProduct}
            selectedSizeId={selectedSizeId}
            onSelect={setSelectedSizeId}
            categoryId={selectedCategory?.id}
          />
        )
      case 'result':
        return (
          <ResultStep
            estimate={estimate}
            category={selectedCategory}
            product={selectedProduct}
            selectedTier={selectedTier}
            selectedQuantity={selectedQuantity}
            selectedSizeId={selectedSizeId}
            width={width}
            height={height}
            steps={steps}
            stepIndex={stepIndex}
            onGoToStep={goToStep}
            onStartOver={startOver}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <WizardTopBar />
      <main className="min-h-screen bg-white pb-16 pt-24">
        <WizardShell
          currentStep={stepIndex + 1}
          totalSteps={steps.length}
          onBack={goBack}
          onNext={goNext}
          showBack={stepIndex > 0}
          nextDisabled={!nextEnabled}
          isResult={isResult}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStepKey + stepIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </WizardShell>
      </main>
    </>
  )
}
