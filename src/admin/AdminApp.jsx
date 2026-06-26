import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save, LogOut, Menu, X, AlertCircle, CheckCircle } from 'lucide-react'
import { clearSession } from './hooks/useAdminSession'
import { useAdminData } from './hooks/useAdminData'
import CategorySidebar from './components/CategorySidebar'
import ProductList from './components/ProductList'
import CategoryModal from './components/CategoryModal'
import ProductModal from './components/ProductModal'

export default function AdminApp() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedCatId, setSelectedCatId] = useState(null)
  const [catModalOpen, setCatModalOpen] = useState(false)
  const [catModalData, setCatModalData] = useState(null) // null = add, object = edit
  const [productModalOpen, setProductModalOpen] = useState(false)
  const [productModalData, setProductModalData] = useState(null) // null = add, object = edit
  const [deleteConfirm, setDeleteConfirm] = useState(null) // { type, id, name }

  const {
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
  } = useAdminData()

  const selectedCategory = categories.find((c) => c.id === selectedCatId) ?? categories[0] ?? null

  function handleLogout() {
    clearSession()
    navigate('/admin/login', { replace: true })
  }

  function openAddCategory() {
    setCatModalData(null)
    setCatModalOpen(true)
  }

  function openEditCategory(cat) {
    setCatModalData(cat)
    setCatModalOpen(true)
  }

  function handleCategorySave(data) {
    if (catModalData) {
      updateCategory(catModalData.id, data)
    } else {
      addCategory({ ...data, products: [] })
    }
    setCatModalOpen(false)
  }

  function handleDeleteCategory(cat) {
    setDeleteConfirm({ type: 'category', id: cat.id, name: cat.title })
  }

  function openAddProduct() {
    setProductModalData(null)
    setProductModalOpen(true)
  }

  function openEditProduct(product) {
    setProductModalData(product)
    setProductModalOpen(true)
  }

  function handleProductSave(data) {
    if (productModalData) {
      updateProduct(selectedCategory.id, productModalData.id, data)
    } else {
      addProduct(selectedCategory.id, data)
    }
    setProductModalOpen(false)
  }

  function handleDeleteProduct(product) {
    setDeleteConfirm({ type: 'product', id: product.id, catId: selectedCategory.id, name: product.title })
  }

  function confirmDelete() {
    if (!deleteConfirm) return
    if (deleteConfirm.type === 'category') {
      deleteCategory(deleteConfirm.id)
      if (selectedCatId === deleteConfirm.id) setSelectedCatId(null)
    } else {
      deleteProduct(deleteConfirm.catId, deleteConfirm.id)
    }
    setDeleteConfirm(null)
  }

  return (
    <div className="flex h-screen flex-col bg-slate-50 font-sans">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed right-4 top-4 z-50 flex items-center gap-2 rounded-xl border px-4 py-3 shadow-lg text-sm font-semibold
            ${toast.type === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-rose-200 bg-rose-50 text-rose-800'
            }`}
        >
          {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {toast.message}
        </div>
      )}

      {/* Topbar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 lg:hidden"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <span className="font-display text-base font-extrabold text-slate-900">ZFFA Admin</span>
          <span className="hidden text-xs text-slate-400 sm:block">Pricing Dashboard</span>
        </div>

        <div className="flex items-center gap-2">
          {dirty && (
            <span className="hidden items-center gap-1.5 text-xs font-semibold text-amber-600 sm:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
              Unsaved changes
            </span>
          )}
          <button
            type="button"
            onClick={saveAll}
            disabled={!dirty || saving}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white transition-all
              ${dirty && !saving
                ? 'bg-rose-600 hover:bg-rose-700 shadow-sm'
                : 'cursor-not-allowed bg-slate-300'
              }`}
          >
            <Save size={13} />
            {saving ? 'Saving…' : 'Save All'}
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:border-slate-300 hover:text-slate-700"
          >
            <LogOut size={13} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar overlay on mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`absolute z-30 flex h-full w-72 shrink-0 flex-col border-r border-slate-200 bg-white
            transition-transform duration-200 lg:relative lg:translate-x-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <CategorySidebar
            categories={categories}
            selectedCatId={selectedCategory?.id}
            onSelect={(id) => { setSelectedCatId(id); setSidebarOpen(false) }}
            onAdd={openAddCategory}
            onEdit={openEditCategory}
            onDelete={handleDeleteCategory}
            onReorder={reorderCategories}
          />
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {selectedCategory ? (
            <ProductList
              category={selectedCategory}
              onAdd={openAddProduct}
              onEdit={openEditProduct}
              onDelete={handleDeleteProduct}
              onReorder={(products) => reorderProducts(selectedCategory.id, products)}
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-slate-400">
              <p className="text-sm font-medium">Select a category from the sidebar to manage its products.</p>
            </div>
          )}
        </main>
      </div>

      {/* Delete confirmation dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="font-display text-lg font-extrabold text-slate-900">Delete "{deleteConfirm.name}"?</h2>
            <p className="mt-2 text-sm text-slate-500">This cannot be undone until you save. Are you sure?</p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteConfirm(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category modal */}
      {catModalOpen && (
        <CategoryModal
          initial={catModalData}
          onSave={handleCategorySave}
          onClose={() => setCatModalOpen(false)}
        />
      )}

      {/* Product modal */}
      {productModalOpen && selectedCategory && (
        <ProductModal
          initial={productModalData}
          categoryId={selectedCategory.id}
          onSave={handleProductSave}
          onClose={() => setProductModalOpen(false)}
        />
      )}
    </div>
  )
}
