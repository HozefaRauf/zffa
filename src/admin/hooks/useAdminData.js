import { useState, useCallback } from 'react'
import categoriesSource from '../../data/pricingData'
import { getSessionPassword } from './useAdminSession'

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function useAdminData() {
  const [categories, setCategories] = useState(() => deepClone(categoriesSource))
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null) // { type: 'success'|'error', message }

  function showToast(type, message) {
    setToast({ type, message })
    setTimeout(() => setToast(null), 5000)
  }

  function markDirty() {
    setDirty(true)
  }

  // ── Categories ──────────────────────────────────────────────────────────────

  const updateCategory = useCallback((catId, patch) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === catId ? { ...c, ...patch } : c))
    )
    markDirty()
  }, [])

  const addCategory = useCallback((cat) => {
    setCategories((prev) => [...prev, cat])
    markDirty()
  }, [])

  const deleteCategory = useCallback((catId) => {
    setCategories((prev) => prev.filter((c) => c.id !== catId))
    markDirty()
  }, [])

  const reorderCategories = useCallback((newOrder) => {
    setCategories(newOrder)
    markDirty()
  }, [])

  // ── Products ─────────────────────────────────────────────────────────────────

  const addProduct = useCallback((catId, product) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === catId ? { ...c, products: [...(c.products ?? []), product] } : c
      )
    )
    markDirty()
  }, [])

  const updateProduct = useCallback((catId, productId, patch) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === catId
          ? {
              ...c,
              products: c.products.map((p) =>
                p.id === productId ? { ...p, ...patch } : p
              ),
            }
          : c
      )
    )
    markDirty()
  }, [])

  const deleteProduct = useCallback((catId, productId) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === catId
          ? { ...c, products: c.products.filter((p) => p.id !== productId) }
          : c
      )
    )
    markDirty()
  }, [])

  const reorderProducts = useCallback((catId, newProducts) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === catId ? { ...c, products: newProducts } : c))
    )
    markDirty()
  }, [])

  // ── Save ─────────────────────────────────────────────────────────────────────

  const saveAll = useCallback(async () => {
    const password = getSessionPassword()
    if (!password) {
      showToast('error', 'Session expired — please log in again.')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/save-pricing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({ categories }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Unknown error')
      setDirty(false)
      showToast('success', 'Saved! Site will update in ~2 minutes.')
    } catch (err) {
      showToast('error', `Save failed: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }, [categories])

  return {
    categories,
    dirty,
    saving,
    toast,
    updateCategory,
    addCategory,
    deleteCategory,
    reorderCategories,
    addProduct,
    updateProduct,
    deleteProduct,
    reorderProducts,
    saveAll,
  }
}
