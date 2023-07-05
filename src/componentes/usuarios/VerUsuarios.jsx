import { useNavigate } from "react-router-dom";
import Tabla from "../../utils/Tabla"
import useUsuario from "../../hooks/useUsuario";
import useAlerta from "../../hooks/useAlerta";

const VerUsuarios = () => {

    const navigate = useNavigate()
    
    const { usuarios, eliminarUsuario } = useUsuario()
    const { mostrarAlerta } = useAlerta()

    const handleEdit = (row) => {
        console.log("edit ...", row )
        //RECIBIMOS POR PARAMETRO EL USUARIO A EDITAR
        //REDIRECCION AL COMPONENTE PARA EDITAR Y PASAMOS EL USUARIO
        navigate("/dashboard/usuarios/editar", { state: row })
    };

    const handleDelete = (row) => {
        console.log("delete...", row )
        //RECIBIMOS POR PARAMETRO EL USUARIO A ELIMINAR
        //REDIRECCION AL COMPONENTE PARA EDITAR Y PASAMOS EL USUARIO
        
        const result = eliminarUsuario(row);
    
        if (result) {
            mostrarAlerta('Usuario eliminado correctamente', 'alerta-ok')
        } else {
            mostrarAlerta('Usuario no se elimino correctamente', 'alerta-error')
        }
    
        navigate('/dashboard/usuarios/ver')
        
    };

    const columns = {
        Nombre: 'nombre',
        Apellido: 'apellido',
        Dni: 'dni',
        Galpon: 'galpon',
        Cargo: 'cargo'
    }

    return (
        <>
            <h1>VER USUARIOS</h1>
            <Tabla
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                columns={columns}
                data={usuarios}
            />
        </>


    )

}
export default VerUsuarios