import { SpeciesTypes } from "@/utils/enum_types";
import { createContext } from "react";

export interface IContextOptions {
    text:string
    icon:string
    onClick(optionTarget:any):void
    type:'primary'|'success'|'danger'|'warning'
}

export interface IContextMenu {
    open:boolean
    x?:number
    y?:number
    options?:IContextOptions[]
    document?:any
    svg?:any
    optionTarget?:any
    type:'options' | 'processogram' | 'none'
    specie?:SpeciesTypes
}


export interface IContextMenuContext {
    contextMenu:IContextMenu,
    setContextMenu(contextMenu:IContextMenu):void
}

const ContextMenu = createContext<IContextMenuContext>(null)


export default ContextMenu