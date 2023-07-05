import { useState } from 'react';
import PropTypes from 'prop-types';
import useAlerta from '../../hooks/useAlerta';

const Formulario = ({ tipo, usuario, onSubmit }) => {

    const { mostrarAlerta } = useAlerta()

    const campos = usuario ? usuario :
        {
            nombre: '',
            apellido: '',
            dni: '',
            galpon: '',
            cargo: '',
            password: '',
            confirmarPassword: ''
        }

    const [usuarioForm, setUsuarioForm] = useState(campos);

    const onChange = (e) => {
        setUsuarioForm({
            ...usuarioForm,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isNaN(usuarioForm.nombre) || !isNaN(usuarioForm.apellido)) {
            mostrarAlerta('El nombre o apellido no puede ser numerico', 'alerta-error');
            return;
        }
        //VALIDAR PASSWORD MINIMO
        if (usuarioForm.password.length < 6) {
            mostrarAlerta('El password debe ser de al menos de 6 caracteres', 'alerta-error');
            return;
        }
        //VALIDAR PASSWORD IGUALES
        if (usuarioForm.password !== usuarioForm.confirmarPassword) {
            mostrarAlerta('Los passwords no son iguales', 'alerta-error');
            return;
        }
        if (usuarioForm.cargo === 'operario') {
            if (isNaN(usuarioForm.galpon)) {
                mostrarAlerta('Se debe proporcionar un galpon valido', 'alerta-error');
                return;
            }
        } else {
            usuarioForm.galpon = ''
        }
        if (usuarioForm.dni.length !== 8) {
            mostrarAlerta('El campo dni debe tener 8 digitos', 'alerta-error');
            return;
        }
        console.log(usuarioForm)

        onSubmit(usuarioForm);
        // {alerta ? (<div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div>) : null}
    };

    return (
        <div className='flex justify-center items-center'>
            <div className="contenedor-observacion sombra-dark">
                <h1>{`Formulario ${tipo === 'agregar' ? 'agregar' : 'editar'} `}</h1>
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            id="nombre"
                            placeholder="Ingresa tu Nombre"
                            value={usuarioForm.nombre}
                            onChange={onChange}
                            required
                            maxLength="45"
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="apellido">Apellido</label>
                        <input
                            type="text"
                            name="apellido"
                            id="apellido"
                            placeholder="Ingresa tu Apellido"
                            value={usuarioForm.apellido}
                            onChange={onChange}
                            required
                            maxLength="45"
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="dni">Dni</label>
                        <input
                            type="number"
                            name="dni"
                            id="dni"
                            placeholder="Ingresa tu dni"
                            value={usuarioForm.dni}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Ingresa tu password"
                            value={usuarioForm.password}
                            onChange={onChange}
                            required
                            maxLength="45"
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Confirmar Password</label>
                        <input
                            type="password"
                            name="confirmarPassword"
                            id="password"
                            placeholder="Repite tu password"
                            value={usuarioForm.confirmarPassword}
                            onChange={onChange}
                            required
                            maxLength="45"
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="cargo">Cargo</label>
                        <select
                            name="cargo"
                            value={usuarioForm.cargo}
                            onChange={onChange}
                            required
                        >
                            <option value="">--Selecciona--</option>
                            <option value="jefeproduccion">Jefe/a Produccion</option>
                            <option value="admin">Administrador/a</option>
                            <option value="operario">Operario/a</option>
                            <option value="vendedor">Vendedor/a</option>
                        </select>
                    </div>
                    {(usuarioForm.cargo === 'operario') ? (
                        <div className="campo-form">
                            <label htmlFor="galpon">#N Galpon</label>
                            <select
                                name="galpon"
                                value={usuarioForm.galpon}
                                onChange={onChange}
                                required
                            >
                                <option value="">--Selecciona--</option>
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                            </select>
                        </div>
                    ) : (null)}
                    <div className="campo-form">
                        <input
                            type="submit"
                            value={tipo === 'agregar' ? 'Agregar' : 'Guardar'}
                            className="btn btn-primario btn-block"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

Formulario.propTypes = {
    tipo: PropTypes.string.isRequired,
    usuario: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
}

export default Formulario;

