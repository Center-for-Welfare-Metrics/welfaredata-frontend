import { FieldReferenceTypes, TabTypes } from "@/utils/enum_types";
import { createContext } from "react";

export interface IMedia {
    _id: string
    originalName: string
    url: string
    size: number
    type: string
    name?: string
    descripition?: string
}

export interface ICommonDataEntry {
    _id?:string
    name:string
    description:string
    global_population?:string
    medias?:IMedia[]
}

export interface IDataEntryFormInformations extends ICommonDataEntry {
    lifefates?:IDataEntryFormInformations
    phases?:IDataEntryFormInformations
    circumstances?:IDataEntryFormInformations
    productionSystem?:ICommonDataEntry
    lifeFate?:ICommonDataEntry
    phase?:ICommonDataEntry
    circumstance?:ICommonDataEntry
}

export interface IDataEntryContext {
    currentInformations:IDataEntryFormInformations
    currentFieldReference: FieldReferenceTypes
    onFetch:boolean
    setOnFetch(onFetch:boolean):void
    updateCurrentInformations(update:any,withDelay:boolean):void
    updateReferenceData(value:any,callback?:any)
    handleReferenceInputChange(value:any)
    tab:TabTypes,
    setTab(tab:TabTypes):void,
    handleLocalInputChange(value:any,withDelay?:boolean):void,
    idTree:any
}

const DataEntryContext = createContext<IDataEntryContext>(null)


export default DataEntryContext