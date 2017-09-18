import axios from 'axios'

export const personalized = () => axios.get('/api/personalized') // （无需登录）

export const newSongs = () => axios.get('/api/personalized/newsong') // （无需登录）

export const toplist = idx => axios.get('/api/top/list?idx=' + idx)

export const getBanner = () => axios.get('/api/banner')

export const mp3Url = id => axios.get('/api/music/mp3?id=' + id)

export const userPlaylist = uid => axios.get('/api/user/playlist?uid=' + uid)

export const userFm = () => axios.get('/api/personal_fm')
