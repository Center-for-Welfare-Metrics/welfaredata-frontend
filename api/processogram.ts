import { SpeciesTypes } from '@/utils/enum_types'
import api from './api'

const p = (url) => `processogram/${url}`

export default {
  all: () => api.get(p('all')),
  create: (data:{productionSystem:string,specie:SpeciesTypes}) => api.post(p(''),data),
  update: (data:{id_tree:any,values:any},_id:string) => api.patch(p(_id),data),
  newLayer: (data:{id_tree:any,pushTo:string,object:any},_id:string) => api.post(p(`${_id}/new_layer`),data),
  getOneReference: (from:string,data:{name:string,specie:SpeciesTypes}) => api.post(`${from}/getOneReference`,data)
}