import { createContext } from "react";

export interface IProcessogram{
    name:string
    description:string
}

export interface IParentDimensions {
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
    parentDimensions:IParentDimensions
    setParentDimensions(parentDimensions:any):void
}




const ProcessogramContext = createContext<IProcessogramContext>(null)

export default ProcessogramContext