import { ProductionSystemTypes, ResourcesTypes, TabTypes } from "./enum_types"

export const RESOURCES : ResourcesTypes[]  = ['processograms','users','privileges','all']

export const PIG : ProductionSystemTypes[] = ['conventional intensive','european intensive','enhanced intensive','outdoor semi-intensive']

export const CHICKEN : ProductionSystemTypes[] = ['conventional cages']

export const SPECIES = {
    pig:PIG,
    chicken:CHICKEN
}

export const CommonTabs : TabTypes[] = ['basic','media']

export const ProductionSystemTABS : TabTypes[] = [...CommonTabs,'sources','quality assessment']

export const LifeFateTABS : TabTypes[] = [...CommonTabs]

export const PhaseTABS : TabTypes[] = [...CommonTabs, 'location','data']

export const CircumstanceTabs : TabTypes[] = [...CommonTabs,'data']

export const TABS = {
    productionSystem:ProductionSystemTABS,
    lifeFate:LifeFateTABS,
    phase:PhaseTABS,
    circumstance:CircumstanceTabs
}