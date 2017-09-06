import axios from 'axios'

export const toplist = idx => axios.get('/api/top/list?idx=' + idx)

export const banner = () => axios.get('/api/banner')

export const userPlaylist = uid => axios.get('/api/user/playlist?uid=' + uid)
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })

export const userFm = () => axios.get('/api/personal_fm')
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })
