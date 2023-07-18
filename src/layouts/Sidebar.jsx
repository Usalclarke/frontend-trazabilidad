import { Link } from 'react-router-dom';
import { Nav } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useAuth from '../hooks/useAuth'
import useAlerta from '../hooks/useAlerta'


const Sidebar = () => {

    const { usuario } = useAuth()
    const { mostrarAlerta } = useAlerta()
    
    
    const handleClick = (modulo) => (event) => {
        switch (modulo) {
            case "usuarios":
            case "observaciones":
            case "stock":
            case "estadistica":
                if (!usuario.cargo.includes(["admin", "jefeproduccion"])) {
                    mostrarAlerta("No tenes los permisos para acceder", "alerta-error")
                    event.preventDefault(); // Prevents the navigation
                }
                break;
            default:
                break;
        }

    };

    return (
        <aside>
            <h1>TRAZABILIDAD<span>v1.0</span></h1>
            <hr />
            <div className="scroll-sidebar">
                <div className="proyectos">
                    <PerfectScrollbar className="sidebar-nav">
                        <Nav style={{ display: 'block' }}>

                            <li className='sidebar-item'>
                                <Link to="/dashboard/usuarios"  onClick={handleClick('usuarios')}>
                                    <button
                                        type="button"
                                        className="btn btn-primario btn-block btn-custom"
                                    >
                                        <span className="hide-menu">Usuarios</span>
                                    </button>
                                </Link>
                            </li>
                            <li className='sidebar-item'>
                                <Link to="/dashboard/pedidos" className="sidebar-link">
                                    <button
                                        type="button"
                                        className="btn btn-primario btn-block btn-custom"
                                    >
                                        <span className="hide-menu">Pedidos</span>
                                    </button>
                                </Link>
                            </li>
                            <li className='sidebar-item'>
                                <Link to="/dashboard/observaciones" className="sidebar-link" onClick={handleClick('observaciones')}>
                                    <button
                                        type="button"
                                        className="btn btn-primario btn-block btn-custom"
                                    >
                                        <span className="hide-menu">Observaciones</span>
                                    </button>
                                </Link>
                            </li>
                            <li className='sidebar-item'>
                                <Link to="/dashboard/stock" className="sidebar-link" onClick={handleClick('stock')}>
                                    <button
                                        type="button"
                                        className="btn btn-primario btn-block btn-custom"
                                    >
                                        <span className="hide-menu">Stock</span>
                                    </button>
                                </Link>
                            </li>
                            <li className='sidebar-item'>
                                <Link to="/dashboard/estadistica" className="sidebar-link" onClick={handleClick('estadistica')}>
                                    <button
                                        type="button"
                                        className="btn btn-primario btn-block btn-custom"
                                    >
                                        <span className="hide-menu">Estadistica</span>
                                    </button>
                                </Link>
                            </li>

                        </Nav>
                    </PerfectScrollbar>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar