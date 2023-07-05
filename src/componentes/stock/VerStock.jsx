import { useNavigate } from "react-router-dom"
import Tabla from "../../utils/Tabla"
import useProducto from "../../hooks/useProducto";

const VerStock = () => {

    const navigate = useNavigate()

    const { productos, columns } = useProducto()

    const handleEdit = (row) => {
        console.log("edit stock...", row)
        //RECIBIMOS POR PARAMETRO EL PRODUCTO A EDITAR
        //REDIRECCION AL COMPONENTE PARA EDITAR Y PASAMOS EL PRODUCTO
        navigate("/dashboard/stock/editar", { state: row })
    }

    return (
        <>
            <h1>VER STOCK</h1>
            <Tabla
                handleEdit={handleEdit}
                columns={columns}
                data={productos}
            />
        </>
    )
}

export default VerStock