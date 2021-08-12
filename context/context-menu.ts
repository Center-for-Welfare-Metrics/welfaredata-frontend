import { CommonIconsTypes, ContextMenuPosition, SpeciesTypes } from "@/utils/enum_types";
import { createContext } from "react";

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
    document?:any
    svg?:any
    optionTarget?:any
    type:'options' | 'processogram' | 'none'
    position: ContextMenuPosition
    specie?:SpeciesTypes
    shareUrl?:string
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