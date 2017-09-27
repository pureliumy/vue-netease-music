import axios from 'axios'

// 用户无关

// 从网友精选碟中截取几张，以填补个性推荐歌单数量的不足（但是没有推荐理由！！）
export const getMoreRecom = (count) => axios.get('/api/top/playlist/highquality?limit=' + count)

// 获取mp3地址
export const getMp3Url = id => axios.get('/api/music/url?id=' + id)

// 推荐歌单
export const getPersonalized = () => axios.get('/api/personalized')

// 最新音乐
export const getNewSongs = () => axios.get('/api/personalized/newsong')

// 独家放送
export const getPrivate = () => axios.get('/api/personalized/privatecontent')

// 推荐MV
export const getRecomMv = () => axios.get('/api/personalized/mv')

// 推荐DJ
export const getRecomDJ = () => axios.get('/api/personalized/djprogram')

// 用户相关
export const toplist = idx => axios.get('/api/top/list?idx=' + idx)

export const getBanner = () => axios.get('/api/banner')

export const userPlaylist = uid => axios.get('/api/user/playlist?uid=' + uid)

export const userFm = () => axios.get('/api/personal_fm')

// 歌单详情
export const getAlbumDetail = (id) => axios.get('/api/playlist/detail?id=' + id)
