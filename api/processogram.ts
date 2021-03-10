import { ICommonDataEntry, IDataEntryFormInformations } from '@/context/data-entry'
import { FieldReferenceTypes, SpeciesTypes } from '@/utils/enum_types'
import api from './api'

const p = (url) => `processogram/${url}`

export default {
  all: () => api.get(p('all')),
  getOne:(_id) => api.get(p(_id)),
  create: (data:{productionSystem:string,specie:SpeciesTypes}) => api.post(p(''),data),
  update: (data:{id_tree:any,values:any},_id:string) => api.patch<IDataEntryFormInformations>(p(_id),data),
  newLayer: (data:{id_tree:any,pushTo:string,object:any},_id:string) => api.post(p(`${_id}/new_layer`),data),
  getOneReference: (fieldReference:FieldReferenceTypes,data:{name:string,specie:SpeciesTypes}) => api.post(`${fieldReference}/getOneReference`,data),
  uploadFileToReference: (fieldReference:FieldReferenceTypes,_id:string,formData:any,uploadProgress:any) => api.patch<ICommonDataEntry>(`${fieldReference}/${_id}/upload`,formData,{headers:{'content-type':'multipart/form-data'},onUploadProgress:uploadProgress}),
  updateReference: (fieldReference:FieldReferenceTypes,_id:string,data:any) => api.patch<ICommonDataEntry>(`${fieldReference}/${_id}`,data)
}