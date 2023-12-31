import { useState, createContext, useEffect } from 'react';
import useAuth from '../hooks/useAuth';

import clienteAxios from '../config/axios';

const ProductoContext = createContext()

// eslint-disable-next-line react/prop-types
const ProductoProvider = ({ children }) => {

    const { autenticado } = useAuth()

    const [productos, setProductos] = useState([])

    useEffect(() => {
        console.log('requesting products data....')
        obtenerProductos()
    }, [autenticado])

    const obtenerProductos = async () => {
        try {
            const { data } = await clienteAxios.get('/productos/')
            setProductos(data)
            return true
        } catch (error) {
            return false
        }
    }
    const editarProducto = async (productoForm) => {
        try {
            await clienteAxios.post('/productos/', productoForm)
            obtenerProductos()
            return true
        } catch (error) {
            return false
        }
    }

    const columns = {
        Producto: 'codProducto',
        Descripcion: 'descripcion',
        Cantidad: 'cantidad'
    }

    return (
        <ProductoContext.Provider
            value={{
                productos,
                setProductos,
                editarProducto,
                columns,
                obtenerProductos
            }}
        >
            {children}
        </ProductoContext.Provider>
    )
}
export {
    ProductoProvider
}

export default ProductoContext