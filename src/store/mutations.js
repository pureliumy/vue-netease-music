import {
  RECORD_USER_PROFILE,
  RECORD_USER_PLAYLIST,
  RECORD_USER_FM
} from 'mutation-types'

export default {
  [RECORD_USER_PROFILE] (state, {
    userProfile,
    userId
  }) {
    state.userProfile = userProfile
    state.uid = userId
  },

  [RECORD_USER_PLAYLIST] (state, userPlaylist) {
    if (!state.login) {
      return
    }
    state.userPlaylist = userPlaylist
  },

  [RECORD_USER_FM] (state, userFm) {
    if (!state.login) {
      return
    }
    state.userFm = userFm
  }
}
