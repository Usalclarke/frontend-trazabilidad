import { useState, createContext } from 'react';

const AlertaContext = createContext()

// eslint-disable-next-line react/prop-types
const AlertaProvider = ({ children }) => {

    const [alerta, setAlerta] = useState({})

    const mostrarAlerta = (msg, categoria) => {
        setAlerta({
            categoria,
            msg
        })
        setTimeout(() => {
           setAlerta({})
        }, 5000);
    }
    
    return (
        <AlertaContext.Provider
            value={{
                alerta,
                setAlerta,
                mostrarAlerta
            }}
        >
            {children}
        </AlertaContext.Provider>
    )
}
export {
    AlertaProvider
}

export default AlertaContext