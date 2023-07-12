import { useLocation, useNavigate } from 'react-router-dom'
import Formulario from "./Formulario"
import useUsuario from '../../hooks/useUsuario';
import useAlerta from '../../hooks/useAlerta';

const EditarUsuario = () => {

    const location = useLocation();
    const navigate = useNavigate()

    const { editarUsuario } = useUsuario()
    const { mostrarAlerta } = useAlerta()

    const onSubmit = (data) => {

        console.log("editando...", data)

        const result = editarUsuario(data);

        result ? mostrarAlerta('Usuario editado correctamente', 'alerta-ok') : mostrarAlerta('Ocurrio un error', 'alerta-error')

        navigate('/dashboard/usuarios/ver')
    }

    return (
        <Formulario tipo="editar" usuario={location.state} onSubmit={onSubmit} />
        
    )

}
export default EditarUsuario