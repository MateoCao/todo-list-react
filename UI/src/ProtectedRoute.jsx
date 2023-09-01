import { useAuth } from './context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute () {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <h2>Loading...</h2>
  if (!loading && !isAuthenticated) return <Navigate to='/login' replace />
  return (
    <Outlet />
  )
}

export default ProtectedRoute
