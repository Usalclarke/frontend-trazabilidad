import { useContext } from "react";
import ObservacionContext from "../context/ObservacionProvider";

const useObservacion = () =>{
    return useContext(ObservacionContext) 
}

export default useObservacion