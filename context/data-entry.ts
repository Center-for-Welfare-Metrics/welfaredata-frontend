import { IContentInformation } from "@/utils/processogram";
import { createContext } from "react";
import { ISpecie } from "./processogram";

export interface IDataEntryContext {
    contentInformation:IContentInformation
    specie:ISpecie
    processograms:any[]
    setProcessograms(processograms:any[]):void
    pathAsObject:any
}

const DataEntryContext = createContext<IDataEntryContext>(null)


export default DataEntryContext