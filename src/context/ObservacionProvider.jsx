import { useState, useEffect, createContext } from 'react';
import useAuth from '../hooks/useAuth';
import clienteAxios from '../config/axios';

const ObservacionContext = createContext()

// eslint-disable-next-line react/prop-types
const ObservacionProvider = ({ children }) => {

    const [observaciones, setObservaciones] = useState([])
    const { usuario } = useAuth()

    const agregarObservacion = async (data, pedido) => {
        try {
            data.idpedido = Number(pedido.idpedido)
            data.idproducto = Number(data.idproducto)

            console.log(data)

            await clienteAxios.post('/observaciones/', data)

            obtenerObservaciones()

            return true
        } catch (error) {
            return false
        }

    }

    useEffect(() => {
        console.log('requesting observaciones data....')
        obtenerObservaciones()
    }, [usuario])

    const obtenerObservaciones = async () => {
        try {
            const { data } = await clienteAxios.get('/observaciones/')
            setObservaciones(data)
            return true
        } catch (error) {
            return false
        }
    }

    const eliminarObservacion = async (data) => {
        try {
            await clienteAxios.delete(`/observaciones/id/${data.idobservacion}`)
            obtenerObservaciones()
            return true
        } catch (error) {
            return false
        }
    }

    const obtenerPorPedido = async (pedido) => {
        try {
            const { data } = await clienteAxios.delete(`/observaciones/getbypedido`, pedido)

            return data

        } catch (error) {
            return false
        }
    }

    const columns = {
        Observacion: 'codObservacion',
        Motivo: 'motivo',
        Cantidad: 'cantidadPiezas',
        Pedido: 'codPedido',
        Galpon: 'galpon',
        Producto: 'codProducto'
    }
    return (
        <ObservacionContext.Provider
            value={{
                columns,
                observaciones,
                setObservaciones,
                agregarObservacion,
                eliminarObservacion,
                obtenerPorPedido
            }}
        >
            {children}
        </ObservacionContext.Provider>
    )
}
export {
    ObservacionProvider
}

export default ObservacionContext