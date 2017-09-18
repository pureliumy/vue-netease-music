import App from '../App.vue'
import VueRouter from 'vue-router'
import Vue from 'vue'

const Discover = resolve => require(['../pages/discover/discover'], resolve)
const Playlist = resolve => require(['../pages/discover/children/playlist'], resolve)
const Home = resolve => require(['../pages/discover/children/home/home'], resolve)
const Djradio = resolve => require(['../pages/discover/children/djradio'], resolve)
const Rank = resolve => require(['../pages/discover/children/rank'], resolve)
const Artist = resolve => require(['../pages/discover/children/artist'], resolve)
const Album = resolve => require(['../pages/discover/children/album'], resolve)
const Download = resolve => require(['../pages/download/download'], resolve)
const Fm = resolve => require(['../pages/fm/fm'], resolve)
const Friend = resolve => require(['../pages/friend/friend'], resolve)
const LocalMusic = resolve => require(['../pages/local/localmusic'], resolve)
const Mv = resolve => require(['../pages/mv/mv'], resolve)
const My = resolve => require(['../pages/my/my'], resolve)
const MyArtist = resolve => require(['../pages/my/artist'], resolve)
const Cloud = resolve => require(['../pages/my/cloud'], resolve)
const MyMv = resolve => require(['../pages/my/mv'], resolve)
const MyPlaylist = resolve => require(['../pages/my/playlist'], resolve)
const MyRadio = resolve => require(['../pages/my/radio'], resolve)

const routes = [
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
            component: Home
          }, {
            path: 'playlist',
            component: Playlist
          }, {
            path: 'djradio',
            component: Djradio
          }, {
            path: 'rank',
            component: Rank
          }, {
            path: 'artist',
            component: Artist
          }, {
            path: 'album',
            component: Album
          }
        ]
      }, {
        path: '/download',
        component: Download
      }, {
        path: '/fm',
        component: Fm
      }, {
        path: '/friend',
        component: Friend
      }, {
        path: '/local',
        component: LocalMusic
      }, {
        path: '/mv',
        component: Mv
      }, {
        path: '/my',
        component: My,
        children: [
          {
            path: 'artist',
            component: MyArtist
          }, {
            path: 'cloud',
            component: Cloud
          }, {
            path: 'mv',
            component: MyMv
          }, {
            path: 'radio',
            component: MyRadio
          }, {
            path: 'playlist',
            component: MyPlaylist
          }
        ]
      }]
  }
]

Vue.use(VueRouter)

const router = new VueRouter(
  {
    routes,
    mode: 'hash',
    scrollBehavior (to, from, savedPosition) {
      return savedPosition || { x: 0, y: 0 }
    }
  }
)

export default router
