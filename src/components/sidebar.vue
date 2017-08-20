<template>
  <div class="sidebar">
    <ul class="sidebar-recom">
      <router-link v-for="item in sidebar_recom" :to="item.path" tag="li" :key="item.id" class="sidebar-recom_li">
        {{item.title}}
      </router-link>
    </ul>
    <ul class="sidebar-my">
      <router-link v-for="item in sidebar_my" :to="item.path" tag="li" :key="item.id" class="sidebar-recom_li">
        {{item.title}}
      </router-link>
    </ul>
    <ul class="sidebar-playlist"></ul>
    <ul class="sidebar-collection"></ul>
  </div>
</template>

<script>
  export default {
    name: 'sidebar',
    method: {},
    data () {
      return {
        sidebar_recom: [
          {
            title: '发现音乐',
            path: '/discover'
          }, {
            title: '私人FM',
            path: '/fm'
          }, {
            title: 'MV',
            path: '/mv'
          }, {
            title: '朋友',
            path: '/friends'
          }
        ],
        sidebar_my: [
          {
            title: '发现音乐',
            path: '/discover'
          }, {
            title: '私人FM',
            path: '/fm'
          }, {
            title: '私人FM',
            path: '/fm'
          }, {
            title: '私人FM',
            path: '/fm'
          }, {
            title: '私人FM',
            path: '/fm'
          }, {
            title: '私人FM',
            path: '/fm'
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
  }

  .sidebar-recom, .sidebar-my, .sidebar-playlist, .sidebar-collection {
    position: relative;
    font-size: 12px;
    color: #5c5c5c;
    margin-top: 38px;
  }

  .sidebar-recom {
    margin-top: 32px;
  }

  .sidebar-recom_li {
    list-style: none;
    display: block;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 50px;
    margin-right: 10px;
    cursor: pointer;
  }

  .sidebar-recom_li:hover {
    color: #000;
  }

  .router-link-active {
    background: #e8e9ec;
    border-left: 3px solid #c62f2f;
    color: #000;
  }

  .sidebar-recom::before, .sidebar-my::before {
    position: absolute;
    left: 11px;
    top: -23px;
    color: #4f4f4f;
  }

  .sidebar-recom::before {
    content: '推荐';
  }

  .sidebar-my::before {
    content: '我的音乐';
  }
</style>
