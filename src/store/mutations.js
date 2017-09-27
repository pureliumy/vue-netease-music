import * as types from './mutation-types'

export default {
  // 改变当前播放歌曲
  [types.PLAY_SONG_BY_ID] (state, payload) {
    state.sid = payload.id
  },

  // 记录新歌
  [types.RECORD_NEW_SONGS] (state, { data }) {
    state.newSongs = data.result
  },
  // 记录每日推荐
  [types.RECORD_DAILY_RECOM] (state, { data }) {
    state.dailyRecom = data.result
  },
  // 记录推荐歌单
  [types.RECORD_PERSONALIZED] (state, { data }) {
    state.personalized = data.result
  },
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
