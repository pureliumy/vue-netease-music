import * as data from '../utils/get-data.js'
import * as types from './mutation-types'

export default {
  async getTopList ({ commit, state }, idx) {
    try {
      let res = await data.toplist(idx)
      commit(types.RECORD_TOP_LIST, res)
    } catch (err) {
      console.log(err)
    }
  },

  async getBanner ({ commit, state }) {
    try {
      let res = await data.banner()
      commit(types.RECORD_BANNER, res)
    } catch (err) {
      console.log(err)
    }
  }
}
