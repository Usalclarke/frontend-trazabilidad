import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './componentes/autenticacion/Login'
import { AuthProvider } from './context/AuthProvider'
import { AlertaProvider } from './context/AlertaProvider'
import Dashboard from './layouts/Dashboard'
import GestionUsuarios from './componentes/usuarios/GestionUsuarios'
import GestionPedidos from './componentes/pedidos/GestionPedidos'
import AgregarUsuario from './componentes/usuarios/AgregarUsuario'
import VerUsuarios from './componentes/usuarios/VerUsuarios'
import EditarUsuario from './componentes/usuarios/EditarUsuario'
import CargarPedidos from './componentes/pedidos/CargarPedidos'
import VerPedidos from './componentes/pedidos/VerPedidos'
import EstadoPedidos from './componentes/pedidos/EstadoPedidos'
import GestionObservaciones from './componentes/observaciones/GestionObservaciones'
import GestionStock from './componentes/stock/GestionStock'
import AgregarObservacion from './componentes/observaciones/AgregarObservacion'
import VerObservaciones from './componentes/observaciones/VerObservaciones'
import VerStock from './componentes/stock/VerStock'
import { UsuarioProvider } from './context/UsuarioProvider'
import EditarStock from './componentes/stock/EditarStock'
import { ProductoProvider } from './context/ProductoProvider'
import { PedidoProvider } from './context/PedidoProvider'
import { ObservacionProvider } from './context/ObservacionProvider'
import EditarPedido from './componentes/pedidos/EditarPedido'
import EditarObservacion from './componentes/observaciones/EditarObservacion'
import GestionEstadistica from './componentes/estadistica/GestionEstadistica'
import EficienciaProducto from './componentes/estadistica/EficienciaProducto'
import EficienciaGalpones from './componentes/estadistica/EficienciaGalpones'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <AlertaProvider>
          <UsuarioProvider>
              <ProductoProvider>
            <PedidoProvider>
                <ObservacionProvider>

                <Routes>
                  <Route path="/" element={<Login />}>
                  </Route>

                  <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="/dashboard/usuarios" element={<GestionUsuarios />} >
                      <Route path="/dashboard/usuarios/agregar" element={<AgregarUsuario />} />
                      <Route path="/dashboard/usuarios/ver" element={<VerUsuarios />} />
                      <Route path="/dashboard/usuarios/editar" element={<EditarUsuario />} />
                    </Route>

                    <Route path="/dashboard/pedidos" element={<GestionPedidos />} >
                      <Route path="/dashboard/pedidos/cargar" element={<CargarPedidos />} />
                      <Route path="/dashboard/pedidos/ver" element={<VerPedidos />} />
                      <Route path="/dashboard/pedidos/editar" element={<EditarPedido />} />
                      <Route path="/dashboard/pedidos/cambiarestado" element={<EstadoPedidos />} />
                    </Route>

                    <Route path="/dashboard/observaciones" element={<GestionObservaciones />} >
                      <Route path="/dashboard/observaciones/agregar" element={<AgregarObservacion />} />
                      <Route path="/dashboard/observaciones/ver" element={<VerObservaciones />} />
                      <Route path="/dashboard/observaciones/editar" element={<EditarObservacion />} />
                    </Route>

                    <Route path="/dashboard/stock" element={<GestionStock />} >
                      <Route path="/dashboard/stock/ver" element={<VerStock />} />
                      <Route path="/dashboard/stock/editar" element={<EditarStock />} />
                    </Route>

                    <Route path="/dashboard/estadistica" element={<GestionEstadistica/>} >
                      <Route path="/dashboard/estadistica/producto" element={<EficienciaProducto />} />
                      <Route path="/dashboard/estadistica/galpones" element={<EficienciaGalpones />} />
                    </Route>

                  </Route>
                </Routes>
                </ObservacionProvider>
            </PedidoProvider>
              </ProductoProvider>
          </UsuarioProvider>
        </AlertaProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
