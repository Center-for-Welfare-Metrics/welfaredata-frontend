import { LevelNames, SpeciesTypes } from "./enum_types";

export interface IMedia {
    _id: string
    originalName: string
    url: string
    size: number
    type: string
    name?: string
    descripition?: string
}

export interface IContentInformation {
    _id:string
    description?:string
    medias?:IMedia[]
    levelName:LevelNames
    ref_id:string
    ref_description?:string
    ref_medias?:any[]
    ref_name:string
    ref_specie:SpeciesTypes
    ref_name_synonyms?:string[]
    ref_updatedAt?:string
    ref_createdAt?:string
    ref_lastUpdatedBy?:string
}