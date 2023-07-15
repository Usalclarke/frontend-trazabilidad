import { useState, createContext, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useProducto from '../hooks/useProducto';
import clienteAxios from '../config/axios';

const PedidoContext = createContext()

// eslint-disable-next-line react/prop-types
const PedidoProvider = ({ children }) => {
    const { usuario } = useAuth()
    const { productos, obtenerProductos } = useProducto()
    const [pedidos, setPedidos] = useState([])
    const [cargando, setCargando] = useState(false)
    //OBTENEMOS PEDIDOS CON USEEFECT AUTOMATICAMENTE DESPUES DE INICIAR SESION.
    useEffect(() => {
        console.log('requesting pedidos data....')
        obtenerPedidos()
    }, [usuario, productos])

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

        let result = 0

        for (const key in pedidos) {
            try {
                const pedido = pedidos[key]
                //CREAR PEDIDO
                const response = await clienteAxios.post('/pedidos/', pedido[0])
                //OBTENER NUEVO PEDIDO CREADO
                const pedidoNuevo = response.data

                //OBTENER DETALLE DEL PEDIDO. DETALLE ES UN ARRAY DECLARADO EN EL DTO DE PEDIDO.
                const detalle = pedido.map(linea => {
                    return {
                        idpedido: pedidoNuevo.idpedido,
                        codProducto: linea.codProducto,
                        cantidad: linea.cantidad,
                        unidades: linea.unidades
                    }
                })

                //CREAR DETALLE DEL PEDIDO
                await clienteAxios.post('pedidoDetalle/all', detalle)

                result++
            } catch (error) {
                console.log(error.message)
            }
        }

        await obtenerPedidos()

        setCargando(false)

        return result

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

    const editarPedidoTerminado = async (pedido) => {
        try {
            await clienteAxios.post('/pedidos/terminado', pedido)
            await obtenerPedidos()
            await obtenerProductos()
            return true
        } catch (error) {
            return false
        }
    }
    //LLAMAMOS A ELIMINAR PEDIDO DEL BACKEND MEDIANTE SU URL.
    const eliminarPedido = async (pedido) => {
        const result = {}
        try {
            await clienteAxios.delete(`/pedidos/id/${pedido.idpedido}`)
            await obtenerPedidos()
            result.ok = true
        } catch (error) {
            result.ok = false
            if(error.response.status === 409){
                result.message = "El pedido tiene observaciones asociadas"
            }
        }
        return result

    }

    //CAMBIAMOS NOMBRES DE VARIABLES RECIBIDAS DEL BACKEND A UN FORMATO MAS LINDO PARA EL FRONTEND
    const columns = {
        'Codigo pedido': 'codPedido',
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
                editarPedidoTerminado
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