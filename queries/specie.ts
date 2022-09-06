import api from './api'

const p = (url) => `specie/${url}`

export default {  
  getOne:(_id) => api.get(p(_id)),
  update: (data,_id:string) => api.patch(p(_id),data)
}