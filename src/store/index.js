import Vue from 'vue'
import Vuex from 'vuex'
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
  }
})
