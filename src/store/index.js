import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import {shoppingcar} from "../store/shoppingcar"
import {address} from "../store/addressmodel"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isShowNav: true
  },
  getters: {

  },
  mutations: {
    changeShowNav(state, payload) {
      state.isShowNav = payload
    }
  },
  actions: {
  },
  modules: {
    shoppingcar,
    address
  },
  plugins:[
    //默认是本地存储
    //createPersistedState()
    //设置会话存储
    createPersistedState(
      {
        storage:window.sessionStorage
      }
    )]
})
