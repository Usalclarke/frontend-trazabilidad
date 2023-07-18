import { Route, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

// eslint-disable-next-line react/prop-types
function PrivateRoute({ element: Component, ...props }) {
  
  const { obtenerUsuario, autenticado, cargando } = useAuth();
  
  useEffect(() => {
    obtenerUsuario();
  }, []); 
 
  if(cargando) return 'Cargando...'

  return autenticado ? (
    <Route {...props} element={<Component />} />
  ) : (
    <Navigate to="/" replace />
  );
     
}

export default PrivateRoute;