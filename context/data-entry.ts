import { IContentInformation } from "@/utils/processogram";
import { createContext } from "react";
import { ISpecie } from "./processogram";


export interface IDataEntryContext {
    contentInformation:IContentInformation
    specie:ISpecie
    setSpecie(specie:ISpecie):void
    processograms:any[]
    setProcessograms(processograms:any[]):void
    pathAsObject:any
    onFetch:boolean
    setOnFetch(onFetch:boolean):void
}

const DataEntryContext = createContext<IDataEntryContext>(null)


export default DataEntryContext