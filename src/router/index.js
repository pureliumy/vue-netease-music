import App from '../App.vue'

const Discover = resolve => require(['../pages/discover/discover'], resolve)
const Playlist = resolve => require(['../pages/discover/children/playlist'], resolve)
const Personalized = resolve => require(['../pages/discover/children/personalized'], resolve)
const Djradio = resolve => require(['../pages/discover/children/djradio'], resolve)
const Toplist = resolve => require(['../pages/discover/children/toplist'], resolve)
const Artist = resolve => require(['../pages/discover/children/artist'], resolve)
const Album = resolve => require(['../pages/discover/children/album'], resolve)

export default [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        redirect: '/discover'
      }, {
        path: '/discover',
        component: Discover,
        children: [
          {
            path: '',
            component: Personalized
          }, {
            path: 'playlist',
            component: Playlist
          }, {
            path: 'djradio',
            component: Djradio
          }, {
            path: 'toplist',
            component: Toplist
          }, {
            path: 'artist',
            component: Artist
          }, {
            path: 'album',
            component: Album
          }
        ]
      }]
  }
]
