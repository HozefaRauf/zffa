import { Navigate } from 'react-router-dom'
import { getSession } from './hooks/useAdminSession'

export default function AdminRoute({ children }) {
  const session = getSession()
  if (!session) return <Navigate to="/admin/login" replace />
  return children
}
