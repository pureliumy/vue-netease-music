<template>
  <div class="footer">
    <div class="control">
      <span title="上一首（Ctrl+Left）" class="prev">
        <svg class="prev">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#prev"></use>
        </svg>
      </span>
      <span title="播放（Ctrl+P）" class="play">
        <svg class="play">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#play"></use>
        </svg>
      </span>
      <span title="下一首（Ctrl+Right）" class="next">
        <svg class="next">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#next"></use>
        </svg>
      </span>
    </div>
    <div class="progress">
      <span class="now">00:00</span>
      <div class="buffer-bar">
        <div class="prog-bar"></div>
        <div class="prog-now"></div>
        <div class="prog-drag"></div>
      </div>
      <span class="all">04:49</span>
    </div>
    <div class="volume">
      <span title="静音">
        <svg class="voice">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#voice"></use>
        </svg>
      </span>
      <div class="volume-bar">
        <div class="prog-bar"></div>
        <div class="prog-now"></div>
        <div class="prog-drag"></div>
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
  </div>
</template>

<script>
  export default {
    name: 'footer',
    data () {
      return {
        loopTitle: '列表循环'
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

  .footer > div {
    position: absolute;
  }

  .control {
    left: 30px;
  }

  .control span {
    display: inline-block;
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
    width: 30px;
    height: 4px;

    border-radius: 2px;
    background-color: rgb(233, 59, 59);
  }

  .prog-drag {
    position: absolute;
    top: -1px;
    left: 25px;

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

  .volume .prog-now{
    top: 4px;
  }
  .volume .prog-drag{
    width: 10px;
    height: 10px;
    top: 0;
    display: none;
  }

  .volume .volume-bar:hover .prog-drag {
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
