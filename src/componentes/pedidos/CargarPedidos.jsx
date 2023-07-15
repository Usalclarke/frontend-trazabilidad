import { useNavigate } from "react-router-dom";
import useAlerta from "../../hooks/useAlerta";
import Papaparse from "papaparse"
import usePedido from "../../hooks/usePedido";

const CargarPedidos = () => {

    //EN LOS PROVIDER DECLARAMOS VARIABLES PARA QUE SEAN LLAMADAS DESDE OTROS ARCHIVOS. ESTA ES LA FORMA DE LLAMAR
    //A AQUELLAS VARIABLES QUE VAMOS A UTILIZAR.
    const { mostrarAlerta } = useAlerta()
    const { cargarPedidos } = usePedido()
    const navigate = useNavigate()

    //HANDLEFILE ES IGUAL QUE ONSUBMIT. ONSUBMIT PRESTA ATENCION A LOS CLICKS Y HANDLEFILE A LOS ARCHIVOS.
    const handleFile = async (e) => {
        //EXTRAEMOS EL ARCHIVO
        const file = e.target.files[0];
        //VALIDAMOS SU FORMATO
        if (file.type !== 'text/csv' || !file.name.includes('csv')) {
            mostrarAlerta('Tipo de archivo invalido', 'alerta-error')
            return
        }
        const reader = new FileReader();
        //DECLARO ARRAY VACIO DE PEDIDOS
        let pedidos = []
        reader.onload = async(e) => {
            //CONTENT ES EL CONTENIDO DEL ARCHIVO
            const content = e.target.result;
            //PARSEAMOS EL CSV A JSON
            const { data } = Papaparse.parse(content, { header: true, skipEmptyLines: true })
            pedidos = data
            //VALIDAR TODOS LOS PEDIDOS (NINGUN CAMPO VACIO)
            for (const pedido of pedidos) {
                const isPedido = Object.values(pedido).every(val => {
                    if (typeof val === 'string') {
                        return val.trim().length > 0;
                    } else {
                        return !!val;
                    }
                });
                if (!isPedido) {
                    mostrarAlerta('Todos los campos deben estar completos', 'alerta-error')
                    return
                }
            }
            //AGRUPAR TODOS LOS PEDIDOS
            pedidos = pedidos.reduce((x, y) => {
                (x[y.codPedido] = x[y.codPedido] || []).push(y);
                return x;
            }, {});

           
            //PASAMOS ARCHIVO JSON CON LOS PEDIDOS
            const result = await cargarPedidos(pedidos)

            mostrarAlerta(`${result } pedidos cargados correctamente`, 'alerta-ok')
            
            return 
        };

        reader.readAsText(file);
        
        navigate('/dashboard/pedidos/ver')

    }
    // CODIGO HTML DEL CARGAR PEDIDOS
    return (
        <div>
            <h1>CARGAR PEDIDOS</h1>
            <div className='flex justify-center items-center'>
                <div className="contenedor-observacion sombra-dark">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center ">
                            <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="mb-2 text-1xl text-gray-500 dark:text-gray-400"><span className="font-semibold">Selecciona un archivo para subir</span></p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" accept=".csv" onChange={handleFile} />
                    </label>
                    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 mt-6 pt-8">
                        <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">NOTA: Las extensiones permitidas son .CSV</h2>
                    </div>
                    <script src="https://unpkg.com/flowbite@1.4.0/dist/flowbite.js"></script>
                </div>
            </div>
        </div>
    )
}

export default CargarPedidos