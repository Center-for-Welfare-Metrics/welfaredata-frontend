import { FieldReferenceTypes } from "@/utils/enum_types";
import { createContext } from "react";

export interface IDataEntryFormInformations {
    _id?:string
    name:string
    description:string
    lifefates?:any
    phases?:any
    circumstances?:any
}

export interface IDataEntryContext {
    currentInformations:IDataEntryFormInformations
    currentFieldReference: FieldReferenceTypes
    // setCurrentInformations(currentInformations:IDataEntryFormInformations):void
    updateCurrentInformations(update:any):void
}

const DataEntryContext = createContext<IDataEntryContext>(null)


export default DataEntryContext