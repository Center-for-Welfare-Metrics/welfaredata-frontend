import api from './api'
import {IUser} from '@/context/user'

export default {
  register: (data:{email:string,password:string,password_confirmation:string}) => api.post<IUser>('register',data),
  login: (data:{email:string,password:string}) => api.post<IUser>('login',data),
  logout: () => api.post('logout'),
  get_user: () => api.get<IUser>('user')
}