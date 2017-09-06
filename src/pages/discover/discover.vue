<template>
  <div class="discover">
    <div class="discover-submenu">
      <ul class="discover-submenu_ul">
        <router-link v-for="item in discoverMenu" tag="li" :to="item.target" :key="item.id" class="discover-submenu_li" exact>
          {{item.title}}
        </router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'discover',
  data () {
    return {
      discoverMenu: [
        {
          title: '个性推荐',
          target: '/discover'
        },
        {
          title: '歌单',
          target: '/discover/playlist'
        },
        {
          title: '主播电台',
          target: '/discover/djradio'
        },
        {
          title: '排行榜',
          target: '/discover/rank'
        },
        {
          title: '歌手',
          target: '/discover/artist'
        },
        {
          title: '最新音乐',
          target: '/discover/album'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.discover {
  padding: 0 30px;
}

.discover-submenu {
  box-shadow: 0 1px 0 0 #e1e1e2;
  margin-bottom: 19px;
}

.discover-submenu_ul {
  margin: 0 auto;
  overflow: hidden;
  zoom: 1;
  font-size: 14px;
  width: 510px;
  color: #333;
}

.discover-submenu_li {
  float: left;
  list-style: none;
  cursor: pointer;
  margin: 0 14px;
  width: 57px;
  text-align: center;
  line-height: 42px;
}

.discover-submenu_li:hover {
  color: #c72e2e;
}

.router-link-active {
  color: #c72e2e;
  border-bottom: 2px solid #c72e2e;
}
</style>
