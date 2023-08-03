import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoggedIn: false,
    userId: null
  },
  getters: {
  },
  mutations: {
    setIsloggedIn(state){
      const token = localStorage.getItem('auth-token')
      const userId = localStorage.getItem('userId')
      if(token){
        state.isLoggedIn = true
        state.userId = userId
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
