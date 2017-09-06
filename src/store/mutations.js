import * as types from './mutation-types'

export default {
  // 记录banner图信息
  [types.RECORD_BANNER] (state, { data }) {
    state.banners = data.banners
  },
  // 记录排行榜信息
  [types.RECORD_TOP_LIST] (state, { data }) {
    state.topList = data.result
  },
  [types.RECORD_USER_PROFILE] (state, {
    userProfile,
    userId
  }) {
    state.userProfile = userProfile
    state.uid = userId
  },

  [types.RECORD_USER_PLAYLIST] (state, userPlaylist) {
    if (!state.login) {
      return
    }
    state.userPlaylist = userPlaylist
  },

  [types.RECORD_USER_FM] (state, userFm) {
    if (!state.login) {
      return
    }
    state.userFm = userFm
  }
}
