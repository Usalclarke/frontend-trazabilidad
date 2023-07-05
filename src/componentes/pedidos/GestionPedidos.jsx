
import { Outlet } from 'react-router-dom'
import Menu from '../../utils/Menu'

const GestionPedidos = () => {
    
    const routes = [
        {
            name: "Cargar Pedidos",
            path: "/dashboard/pedidos/cargar"
        },
        {
            name: "Ver Pedidos",
            path: "/dashboard/pedidos/ver"
        },
        {
            name: "Estado Pedidos",
            path: "/dashboard/pedidos/cambiarestado"
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

export default GestionPedidos