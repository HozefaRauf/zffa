export function getCategoryById(categories, categoryId) {
  return categories.find((category) => category.id === categoryId)
}

export function getProductById(category, productId) {
  return category?.products?.find((product) => product.id === productId)
}

export function getCurrentEstimate(product, state) {
  if (!product) {
    return { label: 'Choose a product to see an estimate', price: null }
  }

  const { selectedTierId, selectedQuantity, selectedSizeId, width, height } = state

  const staticPriceProductIds = ['vinyl-graphics', 'perforated-graphics', 'decals']
  if (staticPriceProductIds.includes(product.id)) {
    return {
      label: `${product.title} estimate`,
      price: product.priceLabel ?? product.note ?? 'Estimate not available',
    }
  }

  if (product.type === 'area') {
    if (!width || !height) {
      return {
        label: `${product.title} estimate`,
        price: product.priceLabel ?? product.note ?? null,
      }
    }

    const sizeValue = parseFloat(width) * parseFloat(height)
    if (Number.isNaN(sizeValue) || sizeValue <= 0) {
      return { label: 'Provide valid dimensions', price: null }
    }

    const minTotal = Math.round(sizeValue * product.minPerSqFt)
    const maxTotal = Math.round(sizeValue * product.maxPerSqFt)
    return {
      label: `${product.title} estimate`,
      price: `$${minTotal.toLocaleString()} – $${maxTotal.toLocaleString()} CAD`,
    }
  }

  if (product.type === 'quantity') {
    if (!selectedQuantity) {
      return { label: 'Choose quantity to estimate', price: null }
    }

    const tierRow = product.priceTable.find((row) => row.quantity === selectedQuantity)
    return {
      label: `${product.title} estimate`,
      price: tierRow ? tierRow.range : 'Estimate not available',
    }
  }

  if (product.type === 'tieredQuantity') {
    if (!selectedTierId) {
      return { label: 'Choose a tier to estimate', price: null }
    }
    if (!selectedQuantity) {
      return { label: 'Choose quantity to estimate', price: null }
    }
    const tier = product.tiers.find((item) => item.id === selectedTierId)
    const tierRow = tier?.priceTable.find((row) => row.quantity === selectedQuantity)
    return {
      label: `${tier?.label ?? product.title} estimate`,
      price: tierRow ? tierRow.range : 'Estimate not available',
    }
  }

  if (product.type === 'size' || product.type === 'fixedOptions') {
    if (!selectedSizeId) {
      return { label: `Choose an option for ${product.title}`, price: null }
    }
    const option = product.options.find((item) => item.id === selectedSizeId)
    return {
      label: `${option?.label ?? product.title} estimate`,
      price: option?.priceLabel ?? 'Estimate not available',
    }
  }

  if (product.type === 'tieredSize') {
    if (!selectedSizeId) {
      return { label: `Choose a size tier for ${product.title}`, price: null }
    }
    const tier = product.tiers.find((item) => item.id === selectedSizeId)
    return {
      label: `${tier?.label ?? product.title} estimate`,
      price: tier?.priceLabel ?? 'Estimate not available',
    }
  }

  if (product.type === 'fixedRange') {
    return { label: `${product.title} estimate`, price: product.priceLabel }
  }

  if (product.type === 'startingPrice') {
    return { label: `${product.title} estimate`, price: `Starting at ${product.priceLabel}` }
  }

  if (product.type === 'customQuote') {
    return { label: `${product.title} estimate`, price: product.priceLabel }
  }

  return { label: `${product.title} estimate`, price: 'Estimate not available' }
}

export function getStepsForProduct(product) {
  const steps = ['category', 'product']

  switch (product?.type) {
    case 'area':
      steps.push('dimensions')
      break
    case 'quantity':
      steps.push('quantity')
      break
    case 'tieredQuantity':
      steps.push('tier', 'quantity')
      break
    case 'size':
    case 'fixedOptions':
    case 'tieredSize':
      steps.push('size')
      break
    default:
      break
  }

  steps.push('result')
  return steps
}

function extractFirstDollarAmount(str) {
  if (!str) return null
  const match = str.match(/\$([\d,]+(?:\.\d+)?)/)
  if (!match) return null
  return parseFloat(match[1].replace(/,/g, ''))
}

export function getStartingPrice(product) {
  if (!product) return null

  switch (product.type) {
    case 'area': {
      return product.minPerSqFt != null ? `From $${product.minPerSqFt}/sq ft` : null
    }
    case 'quantity': {
      const amounts = (product.priceTable ?? [])
        .map((row) => extractFirstDollarAmount(row.range))
        .filter((n) => n != null)
      return amounts.length ? `From $${Math.min(...amounts)}` : 'Custom quote'
    }
    case 'tieredQuantity': {
      const amounts = (product.tiers ?? [])
        .flatMap((tier) => tier.priceTable ?? [])
        .map((row) => extractFirstDollarAmount(row.range))
        .filter((n) => n != null)
      return amounts.length ? `From $${Math.min(...amounts)}` : 'Custom quote'
    }
    case 'size':
    case 'fixedOptions': {
      const amounts = (product.options ?? [])
        .map((opt) => extractFirstDollarAmount(opt.priceLabel))
        .filter((n) => n != null)
      return amounts.length ? `From $${Math.min(...amounts)}` : 'Custom quote'
    }
    case 'tieredSize': {
      const amounts = (product.tiers ?? [])
        .map((tier) => extractFirstDollarAmount(tier.priceLabel))
        .filter((n) => n != null)
      return amounts.length ? `From $${Math.min(...amounts)}` : 'Custom quote'
    }
    case 'fixedRange':
    case 'startingPrice': {
      const amount = extractFirstDollarAmount(product.priceLabel)
      return amount != null ? `From $${amount}` : product.priceLabel
    }
    case 'customQuote':
    default:
      return 'Custom quote'
  }
}
