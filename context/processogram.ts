import { createContext } from "react";

export interface IProcessogram{
    name:string
    description:string
}

export interface IProcessogramContext {
    onHover:string
    setOnHover(onHover:string):void
    currentProcessogram:string
    setCurrentProcessogram(currentProcessogram:string):void      
}




const ProcessogramContext = createContext<IProcessogramContext>(null)

export default ProcessogramContext