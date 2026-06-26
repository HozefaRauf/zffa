import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PricingEstimator from './pages/PricingEstimator'
import AdminLogin from './admin/AdminLogin'
import AdminApp from './admin/AdminApp'
import AdminRoute from './admin/AdminRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PricingEstimator />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminApp />
            </AdminRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
