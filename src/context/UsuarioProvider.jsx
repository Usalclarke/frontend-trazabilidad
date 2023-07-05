import { useState, useEffect, createContext } from 'react';
import useAuth from '../hooks/useAuth';
import clienteAxios from '../config/axios';

const UsuarioContext = createContext()

// eslint-disable-next-line react/prop-types
const UsuarioProvider = ({ children }) => {

    const { usuario } = useAuth()
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        console.log('requesting users data....')
        obtenerUsuarios()
    }, [usuario])

    const obtenerUsuarios = async () => {
        try {
            const { data } = await clienteAxios.get('/usuarios/')
            setUsuarios(data)
            return true
        } catch (error) {
            return false
        }
    }
    const agregarUsuario = async(data) => {
        try {
            await clienteAxios.post('/usuarios/', data)
            obtenerUsuarios()
            return true
        } catch (error) {
            return false
        }
    }

    const editarUsuario = async(data) => {
        try {
            await clienteAxios.post('/usuarios/', data)
            obtenerUsuarios()
            return true
        } catch (error) {
            return false
        }
    }

    const eliminarUsuario = async(data) => {
        try {
            await clienteAxios.delete(`/usuarios/id/${data.idusuario}`)
            obtenerUsuarios()
            return true
        } catch (error) {
            return false
        }
    }

    return (
        <UsuarioContext.Provider
            value={{
                usuarios,
                setUsuarios,
                agregarUsuario,
                editarUsuario,
                eliminarUsuario
            }}
        >
            {children}
        </UsuarioContext.Provider>
    )
}
export {
    UsuarioProvider
}

export default UsuarioContext