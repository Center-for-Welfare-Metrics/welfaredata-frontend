import { CommonIconsTypes, SpeciesTypes } from "@/utils/enum_types";
import { createContext } from "react";
import { ICommonDataEntry } from "./data-entry";

export interface IContextOptions {
    text:string
    icon:CommonIconsTypes
    onClick(optionTarget:any):void
    type:'primary'|'success'|'danger'|'warning'
}

export interface IContextMenu {
    open:boolean
    x?:number
    y?:number
    options?:IContextOptions[]
    document?:ICommonDataEntry
    svg?:any
    optionTarget?:any
    type:'options' | 'processogram' | 'none'
    specie?:SpeciesTypes
}


export interface IContextMenuContext {
    contextMenu:IContextMenu,
    setContextMenu(contextMenu:IContextMenu):void
    loading:boolean
    setLoading(loading:boolean):void
    temporary:any
    setTemporary(temporary:any):void
}

const ContextMenu = createContext<IContextMenuContext>(null)


export default ContextMenu