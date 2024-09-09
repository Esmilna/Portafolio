import { Navigate } from 'react-router-dom'
import { useAuthentication } from '../components/Context/AuthenticationContext'
import { useEffect } from 'react'
import Loading from '../components/Loading/Loading'

export default function PublicRoute({ children }) {
  const { isLoggedIn, checkAuth } = useAuthentication()

  useEffect(() => {
    checkAuth()
  },[checkAuth])
  
  if(isLoggedIn === null) {
    return <Loading/>
  }

  if(isLoggedIn){
    return <Navigate to="/" replace />
  }
  
  return children
}