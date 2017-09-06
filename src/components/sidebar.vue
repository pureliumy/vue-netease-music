<template>
  <div class="sidebar">
    <ul class="sidebar-recom">
      <router-link v-for="item in sidebar_recom" :to="item.path" tag="li" :key="item.id" class="sidebar-recom_li">
        <span class="sidebar-recom_span">
          <svg class="sidebar-recom_svg" :class="item.class">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" v-bind:xlink:href="'#'+item.class"></use>
          </svg>
        </span>
        {{item.title}}
      </router-link>
    </ul>
    <ul class="sidebar-my">
      <router-link v-for="item in sidebar_my" :to="item.path" tag="li" :key="item.id" class="sidebar-my_li">
        <span class="sidebar-recom_span">
          <svg class="sidebar-recom_svg" :class="item.class">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" v-bind:xlink:href="'#'+item.class"></use>
          </svg>
        </span>
        {{item.title}}
      </router-link>
      <transition v-if="login">
        <router-link v-for="item in sidebar_my_login" :to="item.path" tag="li" :key="item.id" class="sidebar-my_li">
          <span class="sidebar-recom_span">
            <svg class="sidebar-recom_svg" :class="item.class">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" v-bind:xlink:href="'#'+item.class"></use>
            </svg>
          </span>
          {{item.title}}
        </router-link>
      </transition>
    </ul>
    <ul class="sidebar-playlist" v-if="login"></ul>
    <ul class="sidebar-collection" v-if="login"></ul>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  method: {},
  data () {
    return {
      login: false,
      sidebar_recom: [
        {
          title: '发现音乐',
          path: '/discover',
          class: 'discover'
        }, {
          title: '私人FM',
          path: '/fm',
          class: 'fm'
        }, {
          title: 'MV',
          path: '/mv',
          class: 'mv'
        }, {
          title: '朋友',
          path: '/friend',
          class: 'friend'
        }
      ],
      sidebar_my: [
        {
          title: '本地音乐',
          path: '/local',
          class: 'local'
        }, {
          title: '下载管理',
          path: '/download',
          class: 'dld'
        }
      ],
      sidebar_my_login: [
        {
          title: '我的音乐云盘',
          path: '/cloud',
          class: 'cloud'
        }, {
          title: '我的歌手',
          path: '/my/artist',
          class: 'artist'
        }, {
          title: '我的MV',
          path: '/my/mv',
          class: 'mv'
        }, {
          title: '本地音乐',
          path: '/my/radio',
          class: 'radio'
        }
      ]
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 200px;
  height: 570px;
  background: #f5f5f7;
  position: absolute;
  top: 50px;
  left: 0;
  box-shadow: 1px 0 0 0 #e1e2e2;
  z-index: 5;
}

.sidebar>ul {
  position: relative;
  font-size: 12px;
  color: #5c5c5c;
  margin-top: 42px;
}

ul.sidebar-recom {
  margin-top: 32px;
}

.sidebar>ul>li {
  position: relative;
  list-style: none;
  display: block;
  padding-top: 9px;
  padding-bottom: 10px;
  padding-left: 44px;
  margin-right: 10px;
  cursor: pointer;
}

.sidebar>ul>li:hover,
.sidebar>ul>li:hover svg {
  color: #000;
  fill: #000;
}

.sidebar>ul>li.router-link-active {
  background: rgba(31, 33, 51, .06);
  border-left: 3px solid #c62f2f;
  color: #000;
  padding-left: 41px;
}

.sidebar>ul>li.router-link-active svg {
  fill: #000;
  left: 14px;
}

.sidebar>ul::before {
  position: absolute;
  left: 11px;
  top: -23px;
  color: #7d7d7d;
}

ul.sidebar-recom::before {
  content: '推荐';
}

ul.sidebar-my::before {
  content: '我的音乐';
}

ul.sidebar-playlist {
  content: '创建的歌单';
}

ul.sidebar-collection {
  content: '收藏的歌单';
}

svg.discover,
svg.fm,
svg.mv,
svg.friend,
svg.dld,
svg.local,
svg.cloud,
svg.artist,
svg.radio,
svg.love,
svg.song {
  width: 18px;
  height: 18px;
  fill: #5c5c5c;
  position: absolute;
  top: 7px;
  left: 17px;
}
</style>
