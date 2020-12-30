import api from './api'

export default {
  register: (data:{email:string,password:string,password_confirmation:string}) => api.post('register',data),
  login: (data:{email:string,password:string}) => api.post('login',data)
}