import { ProductionSystemTypes, ResourcesTypes, TabTypes } from "./enum_types"

export const RESOURCES : ResourcesTypes[]  = ['processograms','users','privileges','all']

export const PIG : ProductionSystemTypes[] = ['conventional intensive','european intensive','enhanced intensive','outdoor semi-intensive']

export const CHICKEN : ProductionSystemTypes[] = ['conventional cages']

export const SPECIES = {
    pig:PIG,
    chicken:CHICKEN
}

export const CommonTabs : TabTypes[] = ['description','media']

export const ProductionSystemTABS : TabTypes[] = [...CommonTabs,'sources']

export const LifeFateTABS : TabTypes[] = [...CommonTabs]

export const PhaseTABS : TabTypes[] = [...CommonTabs]

export const CircumstanceTabs : TabTypes[] = [...CommonTabs]

export const TABS = {
    productionSystem:ProductionSystemTABS,
    lifeFate:LifeFateTABS,
    phase:PhaseTABS,
    circumstance:CircumstanceTabs
}