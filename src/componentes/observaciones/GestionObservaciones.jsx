import { Outlet } from "react-router-dom"
import Menu from "../../utils/Menu"


const GestionObservaciones = () => {
    const routes = [
        {
            name: "Agregar Observacion",
            path: "/dashboard/observaciones/agregar"
        },
        {
            name: "Ver Observaciones",
            path: "/dashboard/observaciones/ver"
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

export default GestionObservaciones