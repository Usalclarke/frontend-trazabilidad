import { useState } from "react"
import { useNavigate } from "react-router-dom";
import usePedido from "../../hooks/usePedido"
import useAlerta from "../../hooks/useAlerta"
import useObservacion from "../../hooks/useObservacion"
import Formulario from "./Formulario";


const AgregarObservacion = () => {
    const navigate = useNavigate()
    const { mostrarAlerta } = useAlerta()
    const { pedidos } = usePedido()
    const { agregarObservacion } = useObservacion()

    // SECCION : BUSCAR PEDIDO
    const [form, setForm] = useState({
        codPedido: '',
    })

    const onSubmitFind = (e) => {
        e.preventDefault()

        if (form.codPedido.trim() === '') {
            mostrarAlerta('Ingrese un codigo de pedido valido', 'alerta-error')
            return
        }

        const pedido = pedidos.find(value => value.codPedido === form.codPedido)

        if (pedido) {
            setPedido(pedido)
        } else {
            mostrarAlerta('El Pedido no existe o es invalido', 'alerta-error')
            return
        }
    }

    const onSubmit = (data, pedido) => {

        const result = agregarObservacion(data, pedido);
        result ? mostrarAlerta('Observacion creada correctamente', 'alerta-ok') : mostrarAlerta('Observacion no se creo correctamente', 'alerta-error')
        navigate('/dashboard/observaciones')

    }

    const [pedido, setPedido] = useState(false)

    return (
        <>
            <div className='flex justify-center items-center'>
                <div className="contenedor-observacion sombra-dark">
                    <h1>Buscar pedido</h1>
                    <form
                        onSubmit={onSubmitFind}
                    >
                        <div className="campo-form" >
                            <label id="label-form-obs" htmlFor="numeropedido">Numero de pedido</label>
                            <input type="text"
                                name="codPedido"
                                placeholder="Ingrese codigo de pedido"
                                onChange={(e) => setForm({
                                    ...form,
                                    [e.target.name]: e.target.value
                                })}
                                value={form.codPedido}
                            />
                            <input
                                type="submit"
                                value="Buscar"
                                className="btn btn-primario btn-block ml-5"
                            />
                        </div>
                    </form>
                </div>
            </div>
            {pedido ?<Formulario pedido={pedido} onSubmit={onSubmit} /> : null }
        </>
    )
}

export default AgregarObservacion