import Vuex from 'vuex'
import Vue from 'vue'
import flightModule from './flightModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    flightModule: flightModule
  }
})

export default store