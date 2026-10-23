import { Navigate, useLocation } from 'react-router-dom'

export function App() {
  const location = useLocation()

  if (location.pathname === '/') {
    return <Navigate to="/sign-in" replace />
  }

  return null
}
