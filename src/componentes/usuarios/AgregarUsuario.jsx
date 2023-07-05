import { useNavigate } from "react-router-dom";
import useAlerta from "../../hooks/useAlerta";
import useUsuario from "../../hooks/useUsuario";
import Formulario from "./Formulario"

const AgregarUsuario = () => {

    const navigate = useNavigate()

    const { agregarUsuario } = useUsuario()
    const { mostrarAlerta } = useAlerta()

    const onSubmit = (data) => {

        console.log("creando...", data)

        const result = agregarUsuario(data);

        result ? mostrarAlerta('Usuario creado correctamente', 'alerta-ok') : mostrarAlerta('Usuario no se creo correctamente', 'alerta-error')

        navigate('/dashboard/usuarios')

    }
    return (
        <Formulario tipo="agregar" onSubmit={onSubmit} />
    )

}
export default AgregarUsuario