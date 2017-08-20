import {
  RECORD_USER_PROFILE,
  RECORD_USER_PLAYLIST,
  RECORD_USER_FM
} from 'mutation-types'

export default {
  [RECORD_USER_PROFILE] (state, {
    user_profile,
    user_id
  }) {
    state.user_profile = user_profile
    state.uid = user_id
  },

  [RECORD_USER_PLAYLIST] (state, user_playlist) {
    if (!state.login) {
      return
    }
    state.user_playlist = user_playlist
  },

  [RECORD_USER_FM] (state, user_fm) {
    if (!state.login) {
      return
    }
    state.user_fm = user_fm
  }
}
