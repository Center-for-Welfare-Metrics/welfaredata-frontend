import { SpeciesTypes } from "@/utils/enum_types";
import { IMedia } from "@/utils/processogram";
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

export interface IMediaViewer{
    medias:IMedia[]
    index:number
}

export interface ISpecie{
    _id:SpeciesTypes
    description:string
}
export interface IProcessogramContext {
    collection:any[],
    mediasViewer:IMediaViewer
    setMediasViewer(mediasViewer:IMediaViewer):void
    stack:string[]
    setStack(stack:string[]):void,
    specie:ISpecie
}




const ProcessogramContext = createContext<IProcessogramContext>(null)

export default ProcessogramContext