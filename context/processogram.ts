import { createContext } from "react";

export interface IProcessogramContext {
    choosen:any,
    setChoosen(choosen:any):void,
    shareLink:string,
    generateShareLink(processogram_tree:any):void,
    pageScrollY:number,
    setPageScrollY(pageScrollY:number):void,
    processogramTreeFromQuery:any,
    setProcessogramTreeFromQuery(processogramTreeFromQuery:any):void,
    getFigureRealInformations(history:any):any
}

const ProcessogramContext = createContext<IProcessogramContext>(null)


export default ProcessogramContext