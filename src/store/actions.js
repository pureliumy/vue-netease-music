import * as data from '../utils/get-data.js'
import * as types from './mutation-types'

export default {
  async getTopList ({ commit, state }, idx) {
    let res = await data.toplist(idx)
    commit(types.RECORD_TOP_LIST, res)
  },

  async getPersonalized ({ commit, state }) {
    let res = await data.personalized()
    commit(types.RECORD_PERSONALIZED, res)
  },

  async getDailyRecom ({ commit, state }) {
    let res = await data.dailyRecom()
    commit(types.RECORD_DAILY_RECOM, res)
  },

  async getNewSongs ({ commit, state }) {
    let res = await data.newSongs()
    commit(types.RECORD_NEW_SONGS, res)
  }
}
