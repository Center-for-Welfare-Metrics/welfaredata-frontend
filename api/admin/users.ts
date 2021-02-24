import api from '@/api/api'
import {IUser} from '@/context/user'

const p = (url) => `admin/users/${url}`

export default {
    get: (data:{skip?:number,limit?:number,name?:string,createdBy?:string}) => api.get<IUser[]>(p(`?skip=${data.skip}&limit=${data.limit}&name=${data.name}&createdBy=${data.createdBy}`)),
    create: (data:{name:string,email:string,password:string,password_confirmation:string,role:string}) => api.post<IUser>(p(''),data),
    update: (_id:string,data:{role:string}) => api.put<IUser>(p(`${_id}`),data),
    delete: (_id:string) => api.delete(p(`${_id}`))
}