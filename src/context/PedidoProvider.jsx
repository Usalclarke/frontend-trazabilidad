import { useState, createContext, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import clienteAxios from '../config/axios';

const PedidoContext = createContext()

// eslint-disable-next-line react/prop-types
const PedidoProvider = ({ children }) => {
    const { usuario } = useAuth()
    const [pedidos, setPedidos] = useState({})
    const [cargando, setCargando] = useState(false)

    //OBTENEMOS PEDIDOS CON USEEFECT AUTOMATICAMENTE DESPUES DE INICIAR SESION.
    useEffect(() => {
        console.log('requesting pedidos data....')
        obtenerPedidos()
    }, [usuario])

    //LLAMAMOS A OBTENER PEDIDO DEL BACKEND MEDIANTE SU URL. 
    const obtenerPedidos = async () => {
        setCargando(true)
        try {
            const { data } = await clienteAxios.get('/pedidos/')
            setPedidos(data)
            return true
        } catch (error) {
            return false
        } finally {
            setCargando(false)
        }
    }

    //LLAMAMOS A CARGAR PEDIDO DEL BACKEND MEDIANTE SU URL.
    const cargarPedidos = async (pedidos) => {
        setCargando(true)

        /*KEY ES EL CODIGO DEL PEDIDO. KEY=COD001. 
            COD001(
                    COD001, JORGE, LOSETA, 1M2;
                    COD001, JORGE, BORDE, 1U.
            )
            COD002(
                    COD001, JORGE, LOSETA, 1M2;
                    COD001, JORGE, BORDE, 1U.
            )
        */
        for (const key in pedidos) {
            try {
                const pedido = pedidos[key]
                //CREAR PEDIDO
                const response = await clienteAxios.post('/pedidos/', pedido[0])
                //OBTENER NUEVO PEDIDO CREADO
                const pedidoNuevo = response.data
                //OBTENER PRODUCTOS
                const productos = await clienteAxios.get('productos/');

                //OBTENER DETALLE DEL PEDIDO. DETALLE ES UN ARRAY DECLARADO EN EL DTO DE PEDIDO.
                const detalle = pedido.map(linea => {
                    const producto = productos.data.find(producto => producto.codProducto === linea.codProducto)
                    return {
                        idpedido: pedidoNuevo.idpedido,
                        idproducto: producto ? producto.idproducto : null,
                        cantidad: linea.cantidad,
                        unidades: linea.unidades
                    }
                })
                //CREAR DETALLE DEL PEDIDO
                await clienteAxios.post('pedidoDetalle/all', detalle)


            } catch (error) {
                console.log(error.message)
                return false
            }
        }
        await obtenerPedidos()
        setCargando(false)
        return true

    }

    //LLAMAMOS A EDITAR PEDIDO DEL BACKEND MEDIANTE SU URL.
    const editarPedido = async (pedido) => {
        try {
            await clienteAxios.post('/pedidos/', pedido)
            await obtenerPedidos()
            return true
        } catch (error) {
            return false
        }
    }

    //LLAMAMOS A ELIMINAR PEDIDO DEL BACKEND MEDIANTE SU URL.
    const eliminarPedido = async (pedido) => {
        try {
            await clienteAxios.delete(`/pedidos/id/${pedido.idpedido}`)
            await obtenerPedidos()
            return true
        } catch (error) {
            return false
        }
    }

    //CAMBIAMOS NOMBRES DE VARIABLES RECIBIDAS DEL BACKEND A UN FORMATO MAS LINDO PARA EL FRONTEND
    const columns = {
        'Codigo pedido': 'codPedido',
        'Descripcion': 'descripcion',
        'Cliente': 'cliente',
        'Fecha Emision': 'fechaEmision',
        'Fecha Produccion': 'fechaProduccion',
        'Fecha Terminado': 'fechaTerminado',
        'Galpon': 'galpon',
    }

    //SE DECLARAN LOS METODOS QUE PUEDEN SER LLAMADOS DESDE OTROS ARCHIVOS DEL PROYECTO.
    return (
        <PedidoContext.Provider
            value={{
                pedidos,
                setPedidos,
                columns,
                cargando,
                setCargando,
                cargarPedidos,
                editarPedido,
                eliminarPedido,

            }}
        >
            {children}
        </PedidoContext.Provider>
    )
}
export {
    PedidoProvider
}

export default PedidoContext