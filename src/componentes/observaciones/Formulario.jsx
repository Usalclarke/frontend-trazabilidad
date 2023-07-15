import { useState } from 'react';
import useAlerta from '../../hooks/useAlerta';
import PropTypes from 'prop-types';


const Formulario = ({ observacion, pedido, onSubmit }) => {


    const { mostrarAlerta } = useAlerta()

    const fields = observacion ? observacion :
        {
            codObservacion: 'OBS' + Math.floor((Math.random() * 10000) + 1),
            codPedido: '',
            motivo: '',
            cantidadPiezas: 0,
            idproducto: 0
        }

    const [form, setForm] = useState(fields)

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.cantidadPiezas === 0) {
            mostrarAlerta('Cantidad de piezas no valido', 'alerta-error')
            return
        }

        const producto = pedido.pedidoDetalleList.find(value => value.idproducto.idproducto == form.idproducto)

        if (form.cantidadPiezas > producto.cantidad) {
            mostrarAlerta('Cantidad de piezas no valido', 'alerta-error')
            return
        }

        //LLAMA AL ON SUBMIT QUE RECIBO POR PARAMETRO
        await onSubmit(form, pedido);
    };
    return (
        <div className='flex justify-center items-center'>
            <div className="contenedor-observacion sombra-dark">
                { observacion ?  <h1>Formulario Editar Observacion</h1> :  <h1>Formulario Agregar Observacion</h1>}
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="mt-20">
                        <div className="campo-form">
                            <label id="label-form-obs" htmlFor="galpon">Galpon de fabricacion</label>
                            <input
                                type="text"
                                name="galpon"
                                value={pedido.galpon}
                                disabled
                            />
                        </div>
                        <div className="campo-form">
                            <label id="label-form-obs" htmlFor="">Codigo de producto</label>
                            <select
                                name="idproducto"
                                onChange={onChange}
                                required
                            >
                                <option value="">--Selecciona un producto--</option>
                                {
                                    //ITERAMOS LOS ITEMS DEL PEDIDO PARA MOSTRAR EL COD DE PRODUCTO
                                    pedido.pedidoDetalleList && pedido.pedidoDetalleList.map(producto => (
                                        <option
                                            key={producto.idproducto.idproducto}
                                            value={Number(producto.idproducto.idproducto)}
                                        >
                                            {producto.idproducto.codProducto}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="campo-form">
                            <label id="label-form-obs" htmlFor="">Motivo</label>
                            <select
                                name="motivo"
                                onChange={onChange}
                                required
                            >
                                <option value="">--Selecciona un motivo--</option>
                                <option value="fisura">Fisura</option>
                                <option value="desgranado">Desgranado</option>
                                <option value="descolorado">Descolorado</option>
                                <option value="faltante">Faltante</option>
                            </select>
                        </div>
                        <div className="campo-form">
                            <label id="label-form-obs" htmlFor="cantidadPiezas">Cantidad de piezas a registrar</label>
                            <input
                                type="number"
                                name="cantidadPiezas"
                                id="cantidadPiezas"
                                required
                                placeholder="Ingrese cantidad de piezas a registrar"
                                onChange={onChange}
                            />
                        </div>
                        <div className="campo-form">
                            <input
                                type="submit"
                                value={`${observacion ? "Editar": "Agregar"} observacion`}
                                className="btn btn-primario btn-block"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

Formulario.propTypes = {
    observacion: PropTypes.object,
    pedido: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
}
export default Formulario;
