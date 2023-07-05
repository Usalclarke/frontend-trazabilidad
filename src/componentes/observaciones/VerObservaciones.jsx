import { useNavigate } from "react-router-dom"
import Tabla from "../../utils/Tabla"
import useObservacion from "../../hooks/useObservacion"
import usePedido from "../../hooks/usePedido"



const VerObservaciones = () => {

    const navigate = useNavigate()

    const { columns, observaciones } = useObservacion()

    const { pedidos } = usePedido()
    const handleEdit = (row) => {
        console.log("edit ...", row)
        //RECIBIMOS POR PARAMETRO LA OBS A EDITAR
        //REDIRECCION AL COMPONENTE PARA EDITAR Y PASAMOS LA OBS
        const pedido = pedidos.find(value => value.codPedido === row.codPedido)
        console.log(pedido)
        navigate("/dashboard/observaciones/editar", { state: {obs: row, pedido} })
    };
    return (
        <>
            <h1>VER OBSERVACIONES</h1>
            <Tabla
                handleEdit={handleEdit}
                columns={columns}
                data={observaciones}
            />
        </>
    )
}

export default VerObservaciones