import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

const state = {
  login: false,
  uid: null,
  name: '',
  signature: '',
  userPlaylist: {},
  userProfile: {},
  userDj: {},
  userFm: {},
  userEvent: {},
  event: {},
  playlistDetail: {},
  songDetail: {},
  play: false,
  banners: {},
  topList: {}
}

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
