import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user
  }
})

export default store
