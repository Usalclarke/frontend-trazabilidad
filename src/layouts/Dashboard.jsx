import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Barra from './Barra'
import Sidebar from './Sidebar'
import { useEffect } from 'react'

const Dashboard = () => {

    const { autenticado, cargando, obtenerUsuario } = useAuth();
    
    useEffect(() => {
        obtenerUsuario();
    }, []); 
    
    if (cargando) return 'Cargando...'
    
    return (
        <>{
            autenticado && !cargando?
                (
                    <div
                        className="contenedor-app"
                        id="main-wrapper"
                        data-theme="light"
                        data-layout="vertical"
                        data-sidebartype="full"
                        data-sidebar-position="fixed"
                        data-header-position="fixed"
                        data-boxed-layout="full"
                    >
                        
                        <Sidebar />

                        <div className="seccion-principal">
                        
                            <Barra />
                        
                            <div className="page-wrapper d-block">
                        
                                <Outlet />
                        
                            </div>
                        
                        </div>
                    </div>
                ) : <Navigate to="/" />
        }
        </>
    );
}

export default Dashboard;