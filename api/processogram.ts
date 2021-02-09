import api from './api'

const p = (url) => `processogram/${url}`

export default {
  all: () => api.get(p('all'))
}