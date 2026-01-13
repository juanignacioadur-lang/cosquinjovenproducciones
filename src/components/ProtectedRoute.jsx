import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    // Si no está logueado, lo mandamos al login
    return <Navigate to="/portal" replace />;
  }

  return children;
}