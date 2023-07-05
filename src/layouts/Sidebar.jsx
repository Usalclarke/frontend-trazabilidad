import { Link } from 'react-router-dom';
import { Nav } from 'reactstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';


const Sidebar = () => {
    return (
        <aside>
            <h1>TRAZABILIDAD<span>v1.0</span></h1>
            <hr />
            <div className="scroll-sidebar">
                <div className="proyectos">
                    <PerfectScrollbar className="sidebar-nav">
                        <Nav style={{ display: 'block' }}>

                            <li className='sidebar-item'>
                                <Link to="/dashboard/usuarios" className="sidebar-link">
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
                                <Link to="/dashboard/observaciones" className="sidebar-link">
                                    <button
                                        type="button"
                                        className="btn btn-primario btn-block btn-custom"
                                    >
                                        <span className="hide-menu">Observaciones</span>
                                    </button>
                                </Link>
                            </li>
                            <li className='sidebar-item'>
                                <Link to="/dashboard/stock" className="sidebar-link">
                                    <button
                                        type="button"
                                        className="btn btn-primario btn-block btn-custom"
                                    >
                                        <span className="hide-menu">Stock</span>
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