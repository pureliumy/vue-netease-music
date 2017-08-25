import axios from 'axios'

export const user_playlist = () => axios.get('/api/user/playlist?uid=' + uid)
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })

export const user_fm = () => axios.get('/api/personal_fm')
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })
