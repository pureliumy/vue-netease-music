<template>
  <div class="footer">
    <div class="control">
      <span title="上一首（Ctrl+Left）" class="prev">
        <svg class="prev">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#prev"></use>
        </svg>
      </span>
      <span :title="title" class="play" @click="play()">
        <svg class="play">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="playOrPauseIcon"></use>
        </svg>
      </span>
      <span title="下一首（Ctrl+Right）" class="next">
        <svg class="next">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#next"></use>
        </svg>
      </span>
    </div>
    <div class="progress">
      <span class="now">{{currTime}}</span>
      <div class="buffer-bar" @mousedown="changeProgress($event)">
        <div class="prog-bar" ref="progBar"></div>
        <div class="prog-now" ref="progNow"></div>
        <div class="prog-drag" ref="progDrag" @mousedown="progressDrag($event)"></div>
      </div>
      <span class="all">{{allTime}}</span>
    </div>
    <div class="volume">
      <span title="静音" @click="muted()">
        <svg class="voice">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#voice"></use>
        </svg>
      </span>
      <div class="volume-bar" @mousedown="changeVolume($event)">
        <div class="prog-bar" ref="volumeProgBar"></div>
        <div class="prog-now" ref="volumeProgNow"></div>
        <div class="prog-drag" ref="volumeProgDrag" @mousedown="volumeDrag($event)"></div>
      </div>
    </div>
    <div class="btns">
      <span v-bind:title="loopTitle">
        <svg class="loop">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#loop"></use>
        </svg>
      </span>
      <span title="打开歌词">
        <svg class="lrc">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#lrc"></use>
        </svg>
      </span>
      <div class="btns-plist" title="打开播放列表">
        <span title="打开播放列表">
          <svg class="playlist">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#state_playlist"></use>
          </svg>
        </span>
        <span class="num">0</span>
      </div>
    </div>
    <audio ref="audio" preload :src="src" @canplaythrough="eventCanPlay()" @ended="eventEnd()">
    </audio>
    <span>{{src}}</span>
  </div>
</template>

<script>
import { getMp3Url, getDailyRecom } from '../utils/get-data.js'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'footer',
  data () {
    return {
      loopTitle: '列表循环',
      title: '播放（Ctrl+P）',
      src: null,
      playing: false,
      audio: null,
      progNow: null,
      progDrag: null,
      progBar: null,
      currTime: '00:00',
      allTime: null,
      timer1: null,
      timer2: null,
      volume: null
    }
  },
  computed: {
    ...mapState([
      'sid'
    ]),
    playOrPauseIcon: function () {
      if (!this.playing) {
        return '#play'
      } else {
        return '#pause'
      }
    }
  },
  watch: {
    sid: function () {
      this.updateUrl()
    }
  },
  methods: {
    ...mapMutations({
      playNew: 'PLAY_SONG_BY_ID'
    }),
    init () {
      [this.progBar, this.progNow, this.progDrag, this.volumeProgBar, this.volumeProgNow, this.volumeProgDrag, this.audio] = Object.values(this.$refs)
      this.progDrag.style.left = '-8px'
      this.volumeProgDrag.style.left = '-8px'
      this.loadStorage()
    },
    async loadStorage () {
      const sid = parseInt(window.localStorage.getItem('sid'))
      const volume = parseFloat(window.localStorage.getItem('volume'))
      const currentTime = parseFloat(window.localStorage.getItem('currentTime'))
      if (sid) {
        this.playNew({ id: sid })
      } else {
        const playList = await getDailyRecom()
        this.playNew(playList)
      }
      this.updateUrl()
      this.audio.volume = volume
      this.changePoint(this.volumeProgNow, this.volumeProgDrag, volume * 100)
      this.audio.currentTime = currentTime
      this.progress()
    },
    async updateUrl () {
      const { data: { data: urlData } } = await getMp3Url(this.sid)
      this.src = urlData[0].url
      this.audio.load()
    },
    eventCanPlay () {
      this.changeTime(this.audio.duration, 'allTime')
    },
    eventEnd () {
      this.playing = false
    },
    setTimer (time, progress) {
      var self = this
      if (time) {
        this.timer1 = setInterval(function () {
          self.changeTime(self.audio.currentTime, 'currTime')
        }, 500)
      }
      if (progress) {
        this.timer2 = setInterval(function () {
          self.progress()
        }, 1000)
      }
    },
    play () {
      if (!this.playing && this.audio.pause) {
        this.audio.play()
        this.playing = true
        this.setTimer('time', 'progress')
      } else {
        this.audio.pause()
        this.playing = false
        clearInterval(this.timer1)
        clearInterval(this.timer2)
      }
    },
    changeTime (timeValue, result) {
      const time = parseInt(timeValue)
      const minutes = Math.floor(time / 60)
      const seconds = time % 60
      if (seconds < 10) {
        this[result] = '0' + minutes + ':0' + seconds
      } else {
        this[result] = '0' + minutes + ':' + seconds
      }
    },
    progress () {
      let percent = this.audio.currentTime / this.audio.duration
      const changeValue = percent * this.progBar.clientWidth
      this.changePoint(this.progNow, this.progDrag, changeValue)
      console.log(this.audio.currentTime, this.audio.duration, changeValue)
    },
    changeProgress (e) {
      if (e.target === this.progDrag) {
        return
      }
      this.changePoint(this.progNow, this.progDrag, e.offsetX)
      const maxW = this.progBar.clientWidth
      const percent = e.offsetX / maxW
      this.audio.currentTime = percent * this.audio.duration
      this.changeTime(this.audio.currentTime, 'currTime')
    },
    changeVolume (e) {
      if (e.target === this.volumeProgDrag) {
        return
      }
      this.changePoint(this.volumeProgNow, this.volumeProgDrag, e.offsetX)
      this.audio.volume = e.offsetX / 100
    },
    changePoint (now, drag, value) {
      console.log(value)
      now.style.width = value + 'px'
      drag.style.left = value - 8 + 'px'
    },
    progressDrag (e) {
      // 按下拖拽按钮时，应该时间继续走，进度条定住，所以只清除掉进度条的定时器
      clearInterval(this.timer2)

      const x = e.clientX
      const self = this

      const w = this.progNow.clientWidth
      const maxW = this.progBar.clientWidth
      let setTime

      document.onmousemove = function (e) {
        // 拖拽时，停止时间的走动
        clearInterval(self.timer1)

        const newW = self.judge(e, x, w, maxW)

        self.changePoint(self.progNow, self.progDrag, newW)
        setTime = (newW / maxW) * self.audio.duration
        self.changeTime(setTime, 'currTime')
      }

      document.onmouseup = function () {
        document.onmousemove = null

        // 拖拽完成后，设置新的的播放时间点，恢复进度条和时间进度的走动
        // if的作用是如果单纯的点击而不拖动时，setTime为undefined，会发生'HTMLMediaElement': The provided double value is non-finite错误导致下面的逻辑无法执行
        if (setTime) {
          self.audio.currentTime = setTime

          // 因为timer1的清除是在拖拽时进行的，单纯点击不会清除，也就不需要再添加，所以放在if之中
          self.setTimer('time')
        }

        self.setTimer(null, 'progress')

        // 拖动过后，document仍存在mouseup事件，页面点击时可能会将setTime重新赋给currentTime，导致播放卡顿、倒退
        // 若mouseup事件中没有逻辑处理，仅仅是去掉mousemove事件，那是否取消mouseup事件就没什么影响
        document.onmouseup = null
      }
    },
    volumeDrag (e) {
      const x = e.clientX
      const self = this

      const w = this.volumeProgNow.clientWidth
      const maxW = 100

      this.volumeProgDrag.className = 'prog-drag drag'

      document.onmousemove = function (e) {
        const newW = self.judge(e, x, w, maxW)
        self.changePoint(self.volumeProgNow, self.volumeProgDrag, newW)
        self.audio.volume = newW / 100
      }

      document.onmouseup = function () {
        document.onmousemove = null
        self.volumeProgDrag.className = 'prog-drag'
        document.onmouseup = null
      }
    },
    judge (e, x, w, maxW) {
      let newW = e.clientX - x + w
      if (newW < 0) {
        newW = 0
      } else if (newW > maxW) {
        newW = maxW
      }
      return newW
    },
    muted () {
      if (!this.audio.muted) {
        this.audio.muted = true
      } else {
        this.audio.muted = false
      }
    }
  },
  mounted () {
    this.init()
    window.onunload = () => {
      window.localStorage.setItem('volume', this.audio.volume.toString())
      window.localStorage.setItem('currentTime', this.audio.currentTime.toString())
      window.localStorage.setItem('sid', this.sid.toString())
    }
  }
}
</script>

<style scoped>
.footer {
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;

  box-sizing: border-box;
  width: 100%;
  height: 48px;

  background: #f5f5f7;
  box-shadow: 0 0 0 1px #e1e1e2;
}

.footer div:not(.control) svg {
  cursor: pointer;

  fill: #666;
}

.footer div:not(.control) svg:hover {
  fill: #444;
}

.footer>div {
  position: absolute;
}

.control {
  left: 30px;
}

.control span {
  float: left;

  box-sizing: border-box;

  cursor: pointer;
  transition: background-color .2s ease-in;

  border-radius: 50%;
  background-color: rgb(233, 59, 59);
}

.control span:hover {
  background-color: rgb(212, 47, 47);
}

.control span.prev,
span.next {
  width: 30px;
  height: 30px;
  margin: 9px 24px 10px 0;
}

.control span.play {
  width: 34px;
  height: 34px;
  margin: 7px 24px 8px 0;
}

.control .prev,
.control .next {
  width: 30px;
  height: 30px;

  fill: #fff;
}

.control .play {
  width: 34px;
  height: 34px;

  fill: #fff;
}

.progress {
  right: 299px;
  left: 205px;
}

.progress span {
  line-height: 12px;

  position: absolute;

  display: inline-block;

  margin-top: 18px;

  color: #333;
}

.progress .now {
  left: 0;
}

.progress .buffer-bar {
  position: absolute;
  top: 18px;
  height: 4px;
  padding: 4px 0;
  right: 39px;
  left: 43px;
}

.prog-bar {
  box-sizing: border-box;
  height: 4px;

  border-radius: 2px;
  background-color: rgba(0, 0, 0, .06);
}

.prog-now {
  position: absolute;
  top: 4px;

  box-sizing: border-box;
  height: 4px;

  border-radius: 2px;
  background-color: rgb(233, 59, 59);
}

.prog-drag {
  position: absolute;
  top: -1px;

  display: inline-block;

  width: 12px;
  height: 12px;

  cursor: pointer;

  border: 1px solid rgba(0, 0, 0, .25);
  border-radius: 50%;
  background-color: #fff;
}

.prog-drag::after {
  display: inline-block;

  width: 4px;
  height: 4px;

  content: '';

  border-radius: 50%;
  background-color: rgb(233, 59, 59);
}

.prog-drag:hover {
  box-shadow: 0 0 8px rgba(0, 0, 0, .3);
}

.progress .prog-drag::after {
  position: absolute;
  top: 4px;
  left: 4px;
}

.progress .all {
  right: 0;
}

.volume {
  top: 18px;
  right: 258px;
}

.volume .voice {
  width: 16px;
  height: 12px;
}

.volume .volume-bar {
  position: absolute;
  top: 0;
  left: 21px;
  padding: 4px 0 4px;
  height: 4px;

  width: 100px;
}

.volume .prog-now {
  top: 4px;
}

.volume .prog-drag {
  box-sizing: content-box;
  width: 10px;
  height: 10px;
  top: 0;
  display: none;
}

.volume .prog-drag.drag {
  display: block;
  box-shadow: none;
}

.volume .volume-bar:hover .prog-drag {
  display: block;
  box-shadow: none;
}

.volume .volume-bar.drag .prog-drag {
  display: block;
  box-shadow: none;
}

.volume .prog-drag::after {
  position: absolute;
  top: 3px;
  left: 3px;
}

.btns {
  right: 131px;
}

.btns svg {
  top: 17px;
}

.btns .loop {
  position: absolute;
  left: 0;

  width: 18px;
  height: 14px;
}

.btns .lrc {
  position: absolute;
  top: 16px;
  left: 36px;

  box-sizing: content-box;
  width: 16px;
  height: 16px;

  box-shadow: 0 0 0 1px rgba(102, 102, 102, .7) inset;
}

.btns .lrc:hover {
  box-shadow: 0 0 0 1px #444 inset;
}

.btns .btns-plist {
  position: absolute;
  top: 16px;
  left: 68px;

  cursor: pointer;
}

.btns .btns-plist:hover svg {
  fill: #444;
}

.btns .playlist {
  position: absolute;
  z-index: 2;
  top: 0;

  width: 19px;
  height: 17px;
}

.btns .num {
  line-height: 12px;

  position: absolute;
  top: 0;
  left: 17px;

  display: inline-block;

  padding: 2px 13px 2px 12px;

  color: #333;
  border-radius: 0 8px 8px 0;
  background: #e1e1e2;
}
</style>
