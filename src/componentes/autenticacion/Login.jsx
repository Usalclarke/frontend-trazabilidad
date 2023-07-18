import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
import useAlerta from '../../hooks/useAlerta';
import Logo from '../../img/logo.jpg';



const Login = () => {

    //STATE INICIO SESION USUARIO
    const [dni, setDni] = useState('')
    const [password, setPassword] = useState('')

    const { iniciarSesion, autenticado} = useAuth();
    const { alerta, mostrarAlerta } = useAlerta();
    
    const navigate = useNavigate()

    //SE EJECUTA AL INICIAR SESION (BOTON)
    const onSubmit = async (e) => {
        e.preventDefault();

        //VALIDAR
        if (dni.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }
        //ACTION 
        const result = await iniciarSesion({dni, password})

        if(!result) mostrarAlerta("Usuario y/o contraseña incorrectos", 'alerta-error');

    }
    useEffect(() => {
        //console.log('ENTRA USE EFECT');
        //SI EL LOGIN ES CORRECTO ENTONCES AUTENTICADO = TRUE Y ENVIA AL USER AL DASHBOARD
        if(autenticado){
            navigate('/dashboard')
        }
        //SI EL LOGIN ES FALLIDO SE GUARDA UN MENSAJE EN "MSG" Y LUEGO MUESTRA ESE MENSAJE
        /*if(msg){
            mostrarAlerta(msg.msg,msg.categoria);
        }*/
    }, [autenticado]); 

    return (
        // INICIO INTERFAZ LOGIN
        <>
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="form-usuario">
                <div className="contenedor-form sombra-dark">
                    <img src={Logo} alt="" width="100%" />
                    <h1>Trazabilidad</h1>
                    <form
                        onSubmit={onSubmit}
                    >
                        <div className="campo-form">
                            <label htmlFor="dni">Dni</label>
                            <input
                                type="text"
                                name="dni"
                                id="dni"
                                placeholder="Ingresa tu dni"
                                value={dni}
                                onChange={e => setDni(e.target.value)}
                            />
                        </div>
                        <div className="campo-form">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Ingresa tu password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="campo-form">
                            <input
                                type="submit"
                                value="Iniciar Sesion"
                                className="btn btn-primario btn-block"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
    // FIN INTERFAZ LOGIN
}

export default Login;