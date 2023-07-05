import useAlerta from '../hooks/useAlerta'
import useAuth from '../hooks/useAuth'


const Barra = () => {

    const { usuario } = useAuth()
    const { alerta } = useAlerta()

    return (
        <header className="app-header">
            {
                usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre + ' ' + usuario.apellido}</span></p> : null
            }
            <nav className="nav-principal">
                <button className="btn btn-blank cerrar-sesion">Cerrar Sesion</button>
            </nav>
            {alerta ? (<div className={`alerta ${alerta.categoria}`} >{alerta.msg}</div>) : null}
        </header>
    )
}

export default Barra