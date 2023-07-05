import { useState } from "react";
import useAlerta from "../../hooks/useAlerta";
import { useLocation, useNavigate } from "react-router-dom";
import usePedido from "../../hooks/usePedido";
import moment from "moment";

const EditarPedido = () => {

    const location = useLocation();
    const navigate = useNavigate()
    const { mostrarAlerta } = useAlerta()
    const { editarPedido } = usePedido()

    const [pedidoForm, setPedidoForm] = useState(location.state)

    const onChange = (e) => {
        setPedidoForm({
            ...pedidoForm,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(pedidoForm)
        //VALIDAMOS NO VACIO
        if (pedidoForm.codPedido.trim() === '' || pedidoForm.descripcion.trim() === '' || pedidoForm.cliente.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return
        }

      
        const result = editarPedido(pedidoForm)

        if (result) {
            mostrarAlerta('Pedido editado correctamente', 'alerta-ok')
        } else {
            mostrarAlerta('Pedido no se ha editado correctamente', 'alerta-error')
        }

        navigate('/dashboard/pedidos/ver')
    }
    return (
        <div className='flex justify-center items-center'>
            <div className="contenedor-observacion sombra-dark">
                <h1>Formulario editar</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Codigo Pedido</label>
                        <input
                            type="text"
                            name="codPedido"
                            id="codPedido"
                            value={pedidoForm.codPedido}
                            onChange={onChange}
                            required
                            maxLength="45"
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="cliente">Cliente</label>
                        <input
                            type="text"
                            name="cliente"
                            id="cliente"
                            value={pedidoForm.cliente}
                            onChange={onChange}
                            required
                            maxLength="45"
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="descripcion">Descripcion</label>
                        <input
                            type="text"
                            name="descripcion"
                            id="descripcion"
                            value={pedidoForm.descripcion}
                            onChange={onChange}
                            required
                            maxLength="45"
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="cantidad">Fecha Emision</label>
                        <input
                            type="date"
                            name="fechaEmision"
                            id="fechaEmision"
                            value={moment(pedidoForm.fechaEmision).format('YYYY-MM-DD')}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            value="Guardar"
                            className="btn btn-primario btn-block"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditarPedido