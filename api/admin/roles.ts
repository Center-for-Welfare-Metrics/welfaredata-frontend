import api from '@/api/api'
import {IRole} from '@/context/roles'

const p = (url) => `admin/roles/${url}`

export default {
    get: (data:{skip?:number,limit?:number,name?:string,createdBy?:string}) => api.get<IRole[]>(p(`?skip=${data.skip}&limit=${data.limit}&name=${data.name}&createdBy=${data.createdBy}`)),
    create: (data:IRole) => api.post<IRole>(p(''),data),
    update: (_id:string,data:IRole) => api.put<IRole>(p(`${_id}`),data)
}