import { useNavigate } from "react-router-dom"
import Tabla from "../../utils/Tabla"
import useObservacion from "../../hooks/useObservacion"
import usePedido from "../../hooks/usePedido"
import useAlerta from "../../hooks/useAlerta";



const VerObservaciones = () => {

    const navigate = useNavigate()

    const { columns, observaciones, eliminarObservacion } = useObservacion()
    const { mostrarAlerta } = useAlerta()
    const { pedidos } = usePedido()

    const handleEdit = (row) => {
        console.log("edit ...", row)
        //RECIBIMOS POR PARAMETRO LA OBS A EDITAR
        //REDIRECCION AL COMPONENTE PARA EDITAR Y PASAMOS LA OBS
        const pedido = pedidos.find(value => value.codPedido === row.codPedido)
        console.log(pedido)
        navigate("/dashboard/observaciones/editar", { state: { obs: row, pedido } })
    };

    const handleDelete = async (row) => {
        console.log("delete...", row)
        //RECIBIMOS POR PARAMETRO EL USUARIO A ELIMINAR
        //REDIRECCION AL COMPONENTE PARA EDITAR Y PASAMOS EL USUARIO

        const result = await eliminarObservacion(row);

        if (result) {
            mostrarAlerta('Observacion eliminada correctamente', 'alerta-ok')
        } else {
            mostrarAlerta('Observacion no se elimino correctamente', 'alerta-error')
        }

        navigate('/dashboard/observaciones/ver')

    };
    return (
        <>
            <h1>VER OBSERVACIONES</h1>
            <Tabla
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                columns={columns}
                data={observaciones}
            />
        </>
    )
}

export default VerObservaciones