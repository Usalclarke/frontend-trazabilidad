import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAlerta from "../../hooks/useAlerta";
import useProducto from "../../hooks/useProducto";

const EditarStock = () => {

    const { mostrarAlerta } = useAlerta()
    const { editarProducto } = useProducto()

    const location = useLocation();
    const navigate = useNavigate()

    const [productoForm, setProductoForm] = useState(location.state);

    const onChange = (e) => {
        setProductoForm({
            ...productoForm,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (productoForm.codProducto.trim() === '' || productoForm.descripcion.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return
        }

        const result = editarProducto(productoForm)
        
        result ? mostrarAlerta('Producto editado correctamente', 'alerta-ok') : mostrarAlerta('Ocurrio un error', 'alerta-error')

        navigate('/dashboard/stock/ver')
    }
    return (
        <div className='flex justify-center items-center'>
            <div className="contenedor-observacion sombra-dark">
                <h1>Formulario editar</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Codigo Producto</label>
                        <input
                            type="text"
                            name="codProducto"
                            id="codProducto"
                            value={productoForm.codProducto}
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
                            value={productoForm.descripcion}
                            onChange={onChange}
                            required
                            maxLength="45"
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="cantidad">Cantidad</label>
                        <input
                            type="number"
                            name="cantidad"
                            id="cantidad"
                            value={productoForm.cantidad}
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

export default EditarStock