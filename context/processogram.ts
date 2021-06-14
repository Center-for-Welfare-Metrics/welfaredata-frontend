import { createContext } from "react";



export interface IProcessogramContext {
    onHover:string
    setOnHover(onHover:string):void
    currentProcessogram:any
    setCurrentProcessogram(currentProcessogram:any):void
}




const ProcessogramContext = createContext<IProcessogramContext>(null)

export default ProcessogramContext