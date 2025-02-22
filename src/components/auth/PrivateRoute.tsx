import useUser from '@hooks/auth/useUser'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = useUser()

  if (user == null) {
    return <Navigate to="/login" replace={true} />
  }

  return <>{children}</>
}

export default PrivateRoute
