
import Menu from '../../utils/Menu'
import { Outlet } from 'react-router-dom'
const GestionUsuarios = () => {

    const routes = [
        {
            name: "Agregar Usuario",
            path: "/dashboard/usuarios/agregar"
        },
        {
            name: "Ver Usuarios",
            path: "/dashboard/usuarios/ver"
        }
    ]
    return (
        <div className="seccion-principal">
            <Menu routes={routes} />
            <main>
                <div className="contenedor-tareas">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default GestionUsuarios