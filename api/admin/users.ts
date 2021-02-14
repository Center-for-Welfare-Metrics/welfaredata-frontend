import api from '@/api/api'
import {IUser} from '@/context/user'

const p = (url) => `admin/users/${url}`

export default {
    get: (data:{skip?:number,limit?:number,name?:string,createdBy?:string}) => api.get<IUser[]>(p(`?skip=${data.skip}&limit=${data.limit}&name=${data.name}&createdBy=${data.createdBy}`))
}