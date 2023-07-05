import { useContext } from "react";
import AlertaProvider from "../context/AlertaProvider";

const useAlerta = () =>{
    return useContext(AlertaProvider) 
}

export default useAlerta