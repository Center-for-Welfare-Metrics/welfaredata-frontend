import { createContext } from "react";

export interface IProcessogramContext {
    choosen:any,
    setChoosen(choosen:any):void,
    shareLink:string,
    generateShareLink(processogram_tree:any):void,
    pageScrollY:number,
    setPageScrollY(pageScrollY:number):void,
    allRefsLoaded:boolean,
    setAllRefsLoaded(loaded:boolean):void
}

const ProcessogramContext = createContext<IProcessogramContext>(null)


export default ProcessogramContext