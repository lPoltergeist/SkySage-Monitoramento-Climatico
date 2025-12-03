import { useEffect, useState, type ReactNode } from 'react';
import { api } from '@/lib/api';
import { Navigate } from 'react-router';

function PrivateRoute({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true)
  const [isAuthorized, setIsAuthorized] = useState<Boolean>(false)

  useEffect(() => {
    api.get('/auth/me', {
      withCredentials: true,
    }).then(() => {
      setIsAuthorized(true)
      setLoading(false)
    }).catch(() => {
      setIsAuthorized(false)
      setLoading(false)
    })
  })

  if (loading) return <div>Carregando...</div>
  if (!isAuthorized) return <Navigate to="/signin" replace />

  return <>{children}</>;
}

export default PrivateRoute;
