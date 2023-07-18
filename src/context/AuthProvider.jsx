import { useState, createContext } from 'react';
import clienteAxios from '../config/axios';
import authToken from '../config/authToken';
const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {

    const [usuario, setUsuario] = useState({})
    const [autenticado, setAutenticado] = useState(false)

    const [cargando, setCargando] = useState(false)

    /*useEffect(() => {
        obtenerUsuario()
    }, [])*/

    const iniciarSesion = async (usuario) => {
        try {
            //validamos dni y contraseña y obtenemos un token.
            const { data } = await clienteAxios.post('usuarios/validarLogin', usuario);
            localStorage.setItem('token', data.token)
            await obtenerUsuario()
            return true
            //setUsuario({ nombre: "jorge", apellido: "luis", cargo: 'operario', galpon: 1})
        } catch (error) {
            console.error(error)
            return false
        }
    }

    const cerrarSesion = async () => {
        setAutenticado(false);
        localStorage.removeItem('token');
    }
    
    const obtenerUsuario = async () => {
        //FUNCION PARA ENVIAR EL TOKEN POR HEADERS
        setCargando(true)
        //enviamos el token recibido y nos devuelve el usuario que se autenticó
        authToken(localStorage.getItem('token'));
        try {
            console.log("validando usuario...");
            const { data } = await clienteAxios.post('usuarios/autenticarUsuario');
            setUsuario(data)
            setAutenticado(true)
        } catch (error) {
            console.log(error)
        }
        setCargando(false)
    }

    return (
        <AuthContext.Provider
            value={{
                usuario,
                setUsuario,
                cargando,
                setCargando,
                iniciarSesion,
                autenticado,
                cerrarSesion,
                obtenerUsuario

            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider
}

export default AuthContext