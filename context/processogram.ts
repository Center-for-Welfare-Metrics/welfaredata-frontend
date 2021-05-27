import { createContext } from "react";

export interface IProcessogramContextCurrentState {
    target:any,
    id_tree:any,
    svg_id:string
}

export interface IProcessogramContext {
    choosen:any
    setChoosen(choosen:any):void
    shareLink:string
    generateShareLink(processogram_tree:any):void
    processogramTreeFromQuery:any
    setProcessogramTreeFromQuery(processogramTreeFromQuery:any):void
    currentState(history:any):IProcessogramContextCurrentState
    history:any
    setHistory(history:any):void
    mouseOverOn:string
    setMouseOverOn(mouseOverOn:string):void
    idFromCurrentFocusedElement:string
    setIDFromCurrentFocusedElement(idFromCurrentFocusedElement:string):void
    level:number,
    setLevel(level:number):void,
    onContext:string,
    setOnContext(onContext:string):void
    setChoosenProductionSystem?():void
}




const ProcessogramContext = createContext<IProcessogramContext>(null)

export default ProcessogramContext