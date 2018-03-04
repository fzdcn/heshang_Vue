import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  user: JSON.parse(window.localStorage.getItem('user')),
  username: window.localStorage.getItem('username'),
  accessToken: window.localStorage.getItem('accessToken'),

  loginRedirect: window.sessionStorage.getItem('loginRedirect'),

  pageLoading: false
}

export default {
  state,
  actions,
  getters,
  mutations
}
