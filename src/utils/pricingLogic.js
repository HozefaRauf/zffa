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

export function getQuantityOptions(product) {
  if (product?.type === 'tieredQuantity' || product?.type === 'quantity') {
    return product.quantities
  }
  return []
}

export function getTierOptions(product) {
  return product?.type === 'tieredQuantity' ? product.tiers : []
}

export function getSizeOptions(product) {
  return product?.options ?? []
}
