import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  login: false,
  uid: null,
  sid: 476987525,
  mvid: null,
  djid: null,
  play: false,
  banners: {},
  topList: {},
  personalized: {},
  dailyRecom: {},
  newSongs: {}
}

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
