export default function SimpleEditor({ data, onChange, type }) {
  const hint = {
    fixedRange:    'e.g. $20–$170',
    startingPrice: 'e.g. $800 plus tax',
    customQuote:   'e.g. Contact us for pricing',
  }[type] ?? ''

  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">Price Label</label>
      <input
        type="text"
        value={data.priceLabel ?? ''}
        onChange={(e) => onChange({ ...data, priceLabel: e.target.value })}
        className="field"
        placeholder={hint}
      />
      <p className="mt-1 text-xs text-slate-400">
        {type === 'startingPrice' && 'Displayed as "Starting at [label]".'}
        {type === 'customQuote' && 'Shown as-is — typically "Contact us for pricing".'}
        {type === 'fixedRange' && 'Shown as the price range for this product.'}
      </p>
    </div>
  )
}
