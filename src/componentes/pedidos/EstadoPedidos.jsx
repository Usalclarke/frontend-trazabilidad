import useAlerta from "../../hooks/useAlerta"
import useAuth from "../../hooks/useAuth"
import usePedido from "../../hooks/usePedido"
import { TablaEstado } from "../../utils/TablaDetalle"


const EstadoPedidos = () => {

    const { pedidos, columns, editarPedido, editarPedidoTerminado } = usePedido()
    const { usuario } = useAuth()
    const { mostrarAlerta } = useAlerta()

    const handleEdit = async (row, action) => {

        if (usuario.cargo !== 'operario' || !usuario.galpon) {
            mostrarAlerta('Usuario no es operation o no tiene galpon asignado', 'alerta-error')
            return
        }

        let result

        if (action === 'pasarProduccion') {
            if (row.fechaProduccion) {
                mostrarAlerta('Pedido ya fue pasado a produccion', 'alerta-error')
                return
            }
            
            row.fechaProduccion = new Date();
            row.galpon = usuario.galpon;

            result = await editarPedido(row)
        }else if (action === 'pasarTerminado') {

            if (!row.fechaProduccion) {
                mostrarAlerta('Pedido aun no fue pasado a produccion', 'alerta-error')
                return
            }
            if (row.fechaTerminado) {
                mostrarAlerta('Pedido ya fue pasado a terminado', 'alerta-error')
                return
            }
            row.fechaTerminado = new Date();
            row.galpon = usuario.galpon;

            result = await editarPedidoTerminado(row)
        }

        result ? mostrarAlerta('Pedido editado correctamente', 'alerta-ok') : mostrarAlerta('Pedido no se ha editado correctamente', 'alerta-error')
    }

    return (
        <>
            <h1>VER PEDIDOS</h1>
            <TablaEstado
                columns={columns}
                data={pedidos}
                handleState={handleEdit}
            />
        </>
    )
}

export default EstadoPedidos