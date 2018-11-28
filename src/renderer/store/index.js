import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

// import modules from './modules'
import menu from '@/store/modules/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    menu
  },
  plugins: [
    createPersistedState(),
    createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
