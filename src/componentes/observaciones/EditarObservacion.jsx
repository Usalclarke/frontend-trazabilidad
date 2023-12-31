import { useLocation, useNavigate } from 'react-router-dom'
import Formulario from "./Formulario"
import useObservacion from '../../hooks/useObservacion';
import useAlerta from '../../hooks/useAlerta';

const EditarObservacion = () => {

    const location = useLocation();
    const navigate = useNavigate()

    const { agregarObservacion } = useObservacion()
    const { mostrarAlerta } = useAlerta()

    const onSubmit = async (data, pedido) => {

        console.log(data)
        console.log(pedido)
        const result = await agregarObservacion(data, pedido);

        result ? mostrarAlerta('Observacion editada correctamente', 'alerta-ok') : mostrarAlerta('Ocurrio un error', 'alerta-error')

        navigate('/dashboard/observaciones/ver')
    }

    return (

        <Formulario observacion={location.state.obs} pedido={location.state.pedido} onSubmit={onSubmit} />

    )

}
export default EditarObservacion