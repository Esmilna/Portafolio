import { Navigate } from 'react-router-dom'
import { useAuthentication } from '../components/Context/AuthenticationContext'
import { useEffect } from 'react'
import Loading from '../components/Loading/Loading'

export default function PrivateRoute({ children }) {
  const { isLoggedIn, checkAuth } = useAuthentication()

  useEffect(() => {
    checkAuth()
  },[checkAuth])
  
  if(isLoggedIn === null){
    return <Loading />
  }
  else if(isLoggedIn === false){
    return <Navigate to="/login" replace />
  }
  
  return children
}