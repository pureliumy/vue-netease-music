import Vue from 'vue'
import Vuex from 'vuex'
import mutations from 'mutations'

Vue.use(Vuex)

const state = {
  login: false,
  uid: null,
  name: '',
  signature: '',
  user_playlist: {},
  user_profile: {},
  user_dj: {},
  user_fm:{},
  user_event: {},
  event: {},
  playlist_detail: {},
  song_detail: {},
  play: false,
  banners: {}
}

export default new Vuex.Store({
  state,
  mutations
})
