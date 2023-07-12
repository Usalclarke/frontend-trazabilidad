import { useNavigate } from "react-router-dom"
import useAlerta from "../../hooks/useAlerta"
import usePedido from "../../hooks/usePedido"
import { TablaDetalle } from "../../utils/TablaDetalle"


const VerPedidos = () => {

    //METODO PARA REDIRECCIONAR
    const navigate = useNavigate()
    const { pedidos, columns, eliminarPedido } = usePedido()
    const { mostrarAlerta } = useAlerta()

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

        result ? mostrarAlerta('Pedido eliminado correctamente', 'alerta-ok') : mostrarAlerta('Ocurrio un error', 'alerta-error')
    }

    return (
        <>
            <h1>VER PEDIDOS</h1>
            <TablaDetalle
                columns={columns}
                data={pedidos}
                handleDelete={handleDelete}
            />
        </>
    )
}

export default VerPedidos