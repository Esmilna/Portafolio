import { Navigate } from 'react-router-dom'
import { useAuthentication } from '../components/Context/AuthenticationContext'
import PrivateRoute from './PrivateRoute'

export default function AdminRoute({  children }) {
  const { isLoggedIn, role } = useAuthentication()

  return (
    <PrivateRoute>
      {
        isLoggedIn && role !== "admin" ? <Navigate to="/" replace /> : children
      }
    </PrivateRoute>
  )
}