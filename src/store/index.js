import Vue from 'vue'
import Vuex from 'vuex'
import mutations from 'mutations'

Vue.use(Vuex)

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
  banners: {}
}

export default new Vuex.Store({
  state,
  mutations
})
