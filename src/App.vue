<template>
  <div class="app">
    <header-top></header-top>
    <sidebar></sidebar>
    <div class="main">
      <div v-bar>
        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>
    <footer-bottom></footer-bottom>
    <svg-icon v-once></svg-icon>
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
img,
h1,
h2,
h3,
h4 {
  margin: 0;
  padding: 0;
  outline: none;
}

body {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

a {
  text-decoration: none;
  color: inherit;
}

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
  box-shadow: 0 0 40px rgba(0, 0, 0, .3);
}

.main {
  /* padding: 0 30px; */
  height: 572px;
  position: absolute;
  left: 200px;
  right: 0;
  top: 50px;
  z-index: 1;
  background: #fafafa;
}

.vb {
  height: 100%;
}

.vb>.vb-dragger {
  z-index: 5;
  width: 8px;
  right: 0;
}

.vb>.vb-dragger>.vb-dragger-styler {
  backface-visibility: hidden;
  transform: rotate3d(0, 0, 0, 0);
  transition: background-color 100ms ease-out;
  background-color: #e1e1e2;
  border-radius: 6px;
  height: 100%;
  display: block;
  pointer-events: none;
}

.vb>.vb-dragger:hover>.vb-dragger-styler {
  background-color: #cfcfd1;
}

.vb.vb-dragging>.vb-dragger>.vb-dragger-styler {
  background-color: rgba(50, 50, 50, .3);
}
</style>
