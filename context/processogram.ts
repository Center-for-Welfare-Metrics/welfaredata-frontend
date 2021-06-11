import { createContext } from "react";



export interface IProcessogramContext {
    onHover:string
    setOnHover(onHover:string):void
}




const ProcessogramContext = createContext<IProcessogramContext>(null)

export default ProcessogramContext