import api from './api'

export default {
  addFeedBack: (data:{title,description}) => api.post('issue',data)
}