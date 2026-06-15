import DropdownSelector from './DropdownSelector'

export default function CategorySelection({ categories, selectedCategoryId, onSelect }) {
  const options = categories.map((c) => ({
    value:       c.id,
    label:       c.title,
    description: c.description,
  }))

  return (
    <DropdownSelector
      label="Service category"
      options={options}
      value={selectedCategoryId}
      onChange={onSelect}
      placeholder="Select a category"
    />
  )
}
