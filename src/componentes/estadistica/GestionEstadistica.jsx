import { Outlet } from "react-router-dom"
import Menu from "../../utils/Menu"


const GestionEstadistica = () => {
    const routes = [
        {
            name: "Eficiencia Producto",
            path: "/dashboard/estadistica/producto"
        },
        {
            name: "Eficiencia Galpones",
            path: "/dashboard/estadistica/galpones"
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

export default GestionEstadistica