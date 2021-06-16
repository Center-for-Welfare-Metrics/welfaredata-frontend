import { createContext } from "react";

export interface IProcessogram{
    name:string
    description:string
}

export interface IDimensions {
    width:number
    height:number
    top:number
    left:number
    middleX:number
    middleY:number
}

export interface IProcessogramContext {
    onHover:string
    setOnHover(onHover:string):void
    currentProcessogram:string
    setCurrentProcessogram(currentProcessogram:string):void
    parentDimensions:IDimensions
    setParentDimensions(parentDimensions:any):void
}




const ProcessogramContext = createContext<IProcessogramContext>(null)

export default ProcessogramContext