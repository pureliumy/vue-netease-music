<template>
  <div class="header">
    <router-link :to="'/'" tag="a" class="logo-route">
      <svg class="icon-logo logo">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#logo"></use>
      </svg>
    </router-link>
    <div class="header-route">
      <svg class="icon-back route-back" @click="go('back')" :class="{'route-active':back}">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back" xlink:title="后退"></use>
      </svg>
      <svg class="icon-next route-next" @click="go('forward')" :class="{'route-active':forward}">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#head_next" xlink:title="前进"></use>
      </svg>
    </div>
    <div class="header-search">
      <input type="text" class="search-input"
             v-model="keywords"
             v-bind:placeholder="placeholder"
             @focus="focus()"
             @blur="blur()"
             @keydown.enter="search()">
      <svg class="icon-search search-btn" @click="search()">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
      </svg>
    </div>
    <div class="header-user">
      <img v-bind:style="login?{'backgroundImg':'url(' + user.face + ')'}:{'background':'url('+defaultFace+')'}"
           class="user-face">
      <div class="name">
        <span class="user-name">{{login ? user.name : '未登录'}}</span>
        <svg class="head-arr">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#head_arr"></use>
        </svg>
      </div>
    </div>
    <div class="header-tool">
      <ul class="tool-ul">
        <li class="tool-li">
          <svg class="icon-skin tool-skin">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#skin"></use>
          </svg>
        </li>
        <li class="tool-li">
          <svg class="icon-msg tool-msg">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#msg"></use>
          </svg>
        </li>
        <li class="tool-li" title="设置">
          <svg class="icon-set tool-set">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#set"></use>
          </svg>
        </li>
      </ul>
    </div>
    <div class="header-btns">
      <ul class="btns-ul">
        <li class="btns-li" title="mini模式（Ctrl+M）">
          <svg class="icon-mini btns-mini">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mini"></use>
          </svg>
        </li>
        <li class="btns-li" title="最小化">
          <svg class="icon-zoomout btns-zoomout">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#zoomout"></use>
          </svg>
        </li>
        <li class="btns-li" title="最大化">
          <svg class="icon-zoomin btns-zoomin">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#zoomin"></use>
          </svg>
        </li>
        <li class="btns-li" title="关闭">
          <svg class="icon-close btns-close">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#close"></use>
          </svg>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'header',
    data () {
      return {
        hIndex: window.sessionStorage.getItem('hIndex') || 1,  // 当前路由在历史记录中的位置
        keywords: '',
        msg: 'Welcome guy!',
        placeholder: '搜索音乐，歌手，歌词，用户',
        login: false,
        defaultFace: require('../assets/default/face_24.png')
      }
    },
    computed: {
      newtab: function () {
        return !window.sessionStorage.getItem('hLength') && window.history.length === 2
      },
      // 路由历史记录的长度，判断若是通过新标签页输入网址打开，则减去新标签页
      // 将hLength存入sessionstorage，若初始为空且history.length为2，则为新标签页打开
      hLength: function () {
        if (this.newtab) {
          return window.history.length - 1
        } else {
          return window.history.length
        }
      },
      back: function () {
        return this.hIndex > 1
      },
      forward: function () {
        return this.hIndex < this.hLength
      }
    },
    watch: {
      $route: function () {
        if (window.history.length > this.hLength) {
          this.hLength = window.history.length
          this.hIndex++
        }
      }
    },
    methods: {
      go: function (direction) {
        if (direction === 'back' && this.back) {
          this.hIndex--
          this.$router.go(-1)
        } else if (direction === 'forward' && this.forward) {
          this.hIndex++
          this.$router.go(1)
        }
        window.sessionStorage.setItem('hIndex', this.hIndex)
      },
      focus: function () {
        this.placeholder = ''
      },
      blur: function () {
        this.placeholder = '搜索音乐，歌手，歌词，用户'
      },
      search: function () {
        if (this.keywords === '') return 'good'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    width: 100%;
    height: 50px;
    background: #c72e2e;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .icon-logo {
    width: 118px;
    height: 20px;
    fill: #fff;
  }

  .logo {
    position: absolute;
    left: 0;
    top: 5px;
    padding: 10px 13px;
    cursor: pointer;
  }

  .header-route {
    position: absolute;
    top: 15px;
    left: 192px;
    width: 52px;
    height: 20px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 3px;
  }

  .header-route::before {
    content: '';
    position: absolute;
    left: 25px;
    height: 22px;
    width: 1px;
    background: rgba(0, 0, 0, 0.15);
  }

  .icon-back, .icon-next {
    width: 26px;
    height: 22px;
  }

  .route-next, .route-back {
    margin-top: -1px;
    float: left;
    fill: rgba(255, 255, 255, 0.20);
  }

  .route-active {
    fill: #fff;
    cursor: pointer;
  }

  .header-search {
    width: 218px;
    height: 22px;
    position: absolute;
    left: 255px;
    top: 14px;
    overflow: hidden;
    padding: 4px;
    box-sizing: border-box;
  }

  .search-btn {
    position: absolute;
    width: 12px;
    height: 13px;
    fill: #fff;
    opacity: 0.45;
    cursor: pointer;
    top: 0;
    left: 192px;
    padding: 4px;
  }

  .search-btn:hover {
    opacity: 0.8;
  }

  .search-input {
    position: absolute;
    color: #fff;
    box-sizing: border-box;
    -webkit-transform: translateZ(0px);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    line-height: 16px;
    background: rgba(0, 0, 0, 0.15);
    padding: 4px 27px 4px 10px;
    border-radius: 11px;
    border: 0;
  }

  .search-input::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.35);
  }

  .header-search input:focus + .search-btn {
    opacity: 0.8;
  }

  .header-user {
    position: absolute;
    right: 246px;
    top: 13px;
  }

  .user-face {
    display: inline-block;
    float: left;
    width: 24px;
    height: 24px;
    border-radius: 12px;
  }

  .header-user .name {
    float: left;
    cursor: pointer;
    margin-left: 5px;
    padding-right: 14px;
  }

  .name:hover > * {
    fill: #fff;
    opacity: 1;
  }

  .user-name {
    color: #fff;
    opacity: 0.7;
    float: left;
    height: 24px;
    line-height: 24px;
    max-width: 80px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .head-arr {
    fill: rgba(255, 255, 255, 0.7);
    width: 8px;
    height: 4px;
    float: left;
    margin-top: 11px;
    margin-left: 9px;
  }

  .header-tool {
    position: absolute;
    right: 121px;
    top: 0;
  }

  .tool-ul {
    overflow: hidden;
  }

  .tool-li {
    list-style: none;
    float: left;
    width: 42px;
    padding: 17px 13px 0 13px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .tool-li svg {
    fill: rgba(255, 255, 255, 0.7);
    width: 16px;
    height: 16px;
  }

  .tool-li:hover svg {
    fill: #fff;
  }

  .header-tool:after {
    content: '';
    width: 1px;
    height: 20px;
    background-color: rgba(0, 0, 0, 0.15);
    position: absolute;
    top: 15px;
    right: -5px;
  }

  .header-btns {
    position: absolute;
    right: 11px;
    top: 0;
  }

  .btns-ul {
    overflow: hidden;
  }

  .btns-li {
    list-style: none;
    float: left;
    padding: 19px 5px 0 5px;
    cursor: pointer;
  }

  .btns-li:hover svg {
    fill: #fff;
  }

  .btns-li svg {
    width: 13px;
    height: 11px;
    fill: rgba(255, 255, 255, .5);
  }
</style>
