<template>
  <div class="home">
    <div class="slide" ref="slide">
      <ul class="slide_ul">
        <li class="slide_li" v-for="item of banners" :key="item.id">
          <a :href="item.url===''?'#':item.url">
            <img :src="item.pic" alt="">
            <span class="slide_tag" :class="item.titleColor">{{item.typeTitle}}</span>
          </a>
        </li>
      </ul>
      <div class="slide_switch" @mouseenter="pause()" @mouseleave="start()">
        <span class="prev" @click="prev()" @mouseenter="pause()">
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#banner_arr"></use>
          </svg>
        </span>
        <span class="next" @click="next()" @mouseenter="pause()">
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#banner_arr"></use>
          </svg>
        </span>
      </div>
      <ul class="slide_tab">
        <li class="slide_tab-li" v-for="(item,i) of banners" :key="item.id" @mouseenter="Switch(i)" @mouseleave="start()"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'personalized',
  data () {
    return {
      msg: 'personalized',
      index: 0,
      timer: null,
      len: null
    }
  },
  computed: {
    ...mapState([
      'banners'
    ])
  },
  methods: {
    ...mapActions([
      'getBanner'
    ]),
    start () {
      this.slideStyle()
      this.timer = setInterval(this.autoPlay, 5000)
    },
    pause () {
      clearInterval(this.timer)
    },
    next () {
      this.autoPlay()
    },
    prev () {
      this.index--
      if (this.index === -1) {
        this.index = this.len - 1
      }
      this.slideStyle()
    },
    Switch (i) {
      clearInterval(this.timer)
      this.index = i
      this.slideStyle()
    },
    autoPlay () {
      this.index++
      if (this.index === this.len) {
        this.index = 0
      }
      this.slideStyle()
    },
    slideStyle () {
      const imglis = this.$refs.slide.querySelectorAll('.slide_li')
      const tablis = this.$refs.slide.querySelectorAll('.slide_tab-li')
      imglis.forEach((item, index) => {
        tablis[index].className = 'slide_tab-li'
        if (index === this.index) {
          item.className = 'slide_li curr'
          tablis[index].className = 'slide_tab-li curr'
        } else if (index === ((this.index === this.len - 1) ? 0 : (this.index + 1))) {
          item.className = 'slide_li next'
        } else if (index === ((this.index === 0) ? (this.len - 1) : (this.index - 1))) {
          item.className = 'slide_li prev'
        } else {
          item.className = 'slide_li'
        }
      }, this)
    }
  },
  mounted: async function () {
    await this.getBanner()
    this.len = this.banners.length
    this.start()
  }
}
</script>

<style scoped>
.slide {
  width: 100%;
  position: relative;
}

.slide_ul {
  list-style: none;
  overflow: hidden;
  height: 200px;
}

.slide_li {
  position: absolute;
  transition: .45s;
  line-height: 0;
  transform: scale(0.8);
  transform-origin: left bottom;
  z-index: 1;
  left: calc(50% - 270px);
  width: 540px;
  height: 200px;
}

/* 
 * 每张图片上面默认盖上一个透明的遮罩
 */
.slide_li::before {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  z-index: 4;
  background-color: #303030;
  opacity: 0;
  transition: .45s;
  left: 0;
  top: 0;
}

.slide_li::after{
  position: absolute;
  display: block;
  content: '';
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  border: 1px solid rgba(0, 0, 0, .1);
  z-index: 10;
  box-sizing: content-box;
}

/* 
 * class为prev和next时改变遮罩透明度
 */
.slide_li.next::before,
.slide_li.prev::before {
  opacity: 0.7;
}

/*
 * 当前图片z-index比遮罩层高;
 * 用位置改变及缩放作为动画效果
*/
.slide_li.curr {
  z-index: 6;
  transform: scale(1);
  left: calc(50% - 270px);
}

.slide_li.next,
.slide_li.prev {
  transform: scale(0.95);
  z-index: 3;
}

.slide_li.next {
  transform-origin: right bottom;
  left: calc(100% - 540px);
}

.slide_li.prev {
  transform-origin: left bottom;
  left: 0;
}

.slide_li img,
.slide_li a {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 2;
}

.slide_li.curr a {
  z-index: 11;
}

/* 
 * 切换按钮
 */
 .slide_switch{
   position: absolute;
   height: 200px;
   width: 100%;
   top: 0;
 }
.slide_switch .prev,
.slide_switch .next {
  display: block;
  position: absolute;
  bottom: 0;
  height: 190px;
  width: calc(50% - 270px);
  z-index: 5;
  cursor: pointer;
  box-sizing: border-box;
  opacity: 0;
}

.slide_switch:hover .prev,
.slide_switch:hover .next {
  opacity: 1;
}

.slide_switch .prev {
  left: 0;
}

.slide_switch .next {
  right: 0;
}

.slide_switch .prev svg,
.slide_switch .next svg {
  position: absolute;
  top: 55px;
  padding: 31px 15px;
  width: 10px;
  height: 18px;
  fill: rgba(255, 255, 255, .4);
}

.slide_switch .prev svg:hover,
.slide_switch .next svg:hover {
  fill: rgba(255, 255, 255, .8);
}

.slide_switch .prev svg {
  left: -6px;
}

.slide_switch .next svg {
  transform: rotate(180deg);
  right: -3px;
}

/*
 * banner右下角标签
 */
.slide_tag {
  position: absolute;
  right: -2px;
  bottom: 10px;
  z-index: 20;
  color: #fff;
  padding: 0 5px 0 8px;
  border-radius: 9px 0 0 9px;
  line-height: 18px;
  height: 18px;
}

.slide_tag.red {
  background: #cc4a4a;
}

.slide_tag.blue {
  background: #4a79cc;
}

/*
 * 轮播图底部指示器
 */
.slide_tab {
  margin-top: 8px;
  line-height: 2px;
  list-style: none;
  position: relative;
  left: 0;
  right: 0;
  text-align: center;
}

.slide_tab-li {
  width: 17px;
  height: 2px;
  display: inline-block;
  background: rgba(0, 0, 0, .2);
  margin: 0 3px;
  cursor: pointer;
}

.slide_tab-li.curr {
  background: #c72e2e;
}
</style>
