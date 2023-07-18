// import { useNavigate } from "react-router-dom"
import useAlerta from "../../hooks/useAlerta"
import usePedido from "../../hooks/usePedido"
import useAuth from "../../hooks/useAuth"
import { TablaDetalle } from "../../utils/TablaDetalle"


const VerPedidos = () => {

    //METODO PARA REDIRECCIONAR
    // const navigate = useNavigate()
    const { pedidos, columns, eliminarPedido } = usePedido()
    const { mostrarAlerta } = useAlerta()
    const { usuario } = useAuth()
    /*
    const handleEdit = (row) => {
        console.log("editando pedido...", row)
        //RECIBIMOS POR PARAMETRO EL USUARIO A EDITAR
        //REDIRECCION AL COMPONENTE PARA EDITAR Y PASAMOS EL USUARIO
        navigate("/dashboard/pedidos/editar", { state: row })
    }
    */

    const handleDelete = async (row) => {
        //RECIBIMOS POR PARAMETRO EL USUARIO A ELIMINAR

        console.log('eliminado pedido...', row)

        const result = await eliminarPedido(row)
        if (result.ok) {
            mostrarAlerta('Pedido eliminado correctamente', 'alerta-ok')
        } else {
            if (result.message) {
                mostrarAlerta(result.message, 'alerta-error')
            } else {
                mostrarAlerta('Ocurrio un error', 'alerta-error')
            }
        }

    }

    if (usuario && usuario.cargo == "operario") {
        return (
            <div>
                <h1>No tenes pemisos para acceder</h1>
            </div>
        );
    }
    return (
        <>
            <h1>VER PEDIDOS</h1>
            <TablaDetalle
                columns={columns}
                data={pedidos}
                handleDelete={usuario && usuario.cargo !== 'vendedor' ? handleDelete : null}
            />
        </>
    )
}

export default VerPedidos