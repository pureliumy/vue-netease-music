<template>
  <div class="app">
    <header-top></header-top>
    <sidebar></sidebar>
    <div class="main">
      <router-view></router-view>
    </div>
    <footer-bottom></footer-bottom>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import HeaderTop from './components/header.vue'
import FooterBottom from './components/footer.vue'
import Sidebar from './components/sidebar.vue'
import SvgIcon from './components/svg.vue'

export default {
  components: { HeaderTop, FooterBottom, Sidebar, SvgIcon },
  name: 'app'
}
</script>

<style>
@import "~normalize.css";

html,
body,
ul,
li,
a,
div,
svg,
use,
input,
span,
img {
  margin: 0;
  padding: 0;
  outline: none;
}
</style>
<style scoped>
.app {
  box-sizing: border-box;
  font-family: "Microsoft Yahei", 'Noto Sans CJK SC Medium', arial, helvetica, sans-serif, simsun;
  font-size: 12px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 1022px;
  height: 670px;
  position: relative;
  margin: 10px auto 0;
  box-shadow: 0 0 30px 3px #ccc;
}

.main {
  padding: 0 30px;
  width: 762px;
  height: 570px;
  position: absolute;
  left: 200px;
  top: 50px;
  z-index: 1;
  background: #fafafa;
}
</style>
