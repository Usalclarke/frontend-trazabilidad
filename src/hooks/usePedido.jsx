import { useContext } from "react";
import PedidoContext from "../context/PedidoProvider";

const usePedido = () =>{
    return useContext(PedidoContext) 
}

export default usePedido