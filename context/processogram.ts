import { createContext } from "react";

export interface IProcessogram{
    name:string
    description:string
}

export interface ImainState {    
    level:number
    viewBox:string
    currentDomID:string
}

export interface ImainStateChange {
    level?:number
    viewBox?:string
    currentDomID:string
}

export interface IProcessogramContext {
    collection:any[]
}




const ProcessogramContext = createContext<IProcessogramContext>(null)

export default ProcessogramContext