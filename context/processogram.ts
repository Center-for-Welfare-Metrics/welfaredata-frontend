import { createContext } from "react";



export interface IProcessogramContext {
    choosen:any,
    setChoosen(choosen:any):void
}

const ProcessogramContext = createContext<IProcessogramContext>(null)


export default ProcessogramContext