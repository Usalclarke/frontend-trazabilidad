import { useState, createContext } from 'react';

const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {

    const [usuario, setUsuario] = useState({})
    const [cargando, setCargando] = useState(false)

    return (
        <AuthContext.Provider
            value={{
                usuario,
                setUsuario, 
                cargando, 
                setCargando

            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider
}

export default AuthContext