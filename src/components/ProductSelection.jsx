export default function ProductSelection({ category, selectedProductId, onSelect }) {
  if (!category) {
    return <p className="mt-6 text-sm text-slate-500">Select a category to reveal product options.</p>
  }

  const selectedProduct = category.products.find((product) => product.id === selectedProductId)

  return (
    <div className="mt-6">
      <label htmlFor="product-select" className="block text-sm font-semibold text-slate-900">
        Select Type <span className="text-rose-600">*</span>
      </label>
      <div className="relative mt-3">
        <select
          id="product-select"
          value={selectedProductId || ''}
          onChange={(event) => onSelect(event.target.value)}
          className="input-surface w-full appearance-none pr-12 text-base"
        >
          <option value="" disabled>
            Choose a product
          </option>
          {category.products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.title}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">
          ▼
        </div>
      </div>
      <div className="mt-4 rounded-2xl bg-white/50 p-4 text-sm leading-6 text-slate-600">
        {selectedProduct
          ? selectedProduct.description
          : 'Choose a product to unlock tailored size and quantity options.'}
      </div>
    </div>
  )
}
