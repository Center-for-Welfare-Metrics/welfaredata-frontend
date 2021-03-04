import { ProductionSystemTypes, SpeciesTypes } from "./enum_types"

export interface ISvgPath {
    file_name:string
    folder:'avatars'|'education'|'icons'|'minimal-icons'|'zoo'
}

export const SvgPath = ({file_name,folder}:ISvgPath) => (
    `/assets/svg/${folder}/${file_name}.svg`
)

export interface ISvgZooPath {
    specie: SpeciesTypes
    productionSystem: ProductionSystemTypes
}

export const SvgZooPath = ({specie,productionSystem}:ISvgZooPath) => (
    `/assets/svg/zoo/${specie}/${productionSystem}.svg`
)