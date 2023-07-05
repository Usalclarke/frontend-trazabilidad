import { Outlet } from "react-router-dom"
import Menu from "../../utils/Menu"

const routes = [
    {
        name: "Ver Stock",
        path: "/dashboard/stock/ver"
    }
]

const GestionStock = () => {
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

export default GestionStock