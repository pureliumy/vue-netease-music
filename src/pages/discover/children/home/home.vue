<template>
  <div class="home">
    <slide></slide>
    <!-- 推荐歌单开始 -->
    <div class="recom-album container">
      <div class="head">
        <h2 class="title">推荐歌单</h2>
        <a href="#" class="more">更多></a>
      </div>
      <div class="flex">
        <!-- 每日推荐开始 -->
        <div class="recom-album_item">
          <a href="#" class="recom-album_cover">
            <img src="../../../../assets/temp/list_temp1.jpg" alt="" class="img">
            <span class="recom-album_tip">根据您的音乐口味生成每日更新</span>
            <div class="recom-album_play-count">
              <svg class="recom-album_icon icon-earphone">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#earphone"></use>
              </svg>
              <span class="recom-album_count">587983</span>
            </div>
            <span class="btn-play">
              <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#play_rb"></use>
              </svg>
            </span>
          </a>
          <span class="recom-album_copywrite copywrite">每日歌曲推荐</span>
        </div>
        <!-- 每日推荐结束 -->
        <!-- 其他歌单推荐开始 -->
        <div class="recom-album_item" v-for="item in recom" :key="item.id">
          <a class="recom-album_cover">
            <router-link :to="{name:'album',params:{albumId:item.id}}">
              <img :src="item.picUrl+'?param=200y200'" alt="" class="img">
              <span class="recom-album_tip">{{item.copywriter}}</span>
              <div class="recom-album_play-count">
                <svg class="recom-album_icon icon-earphone">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#earphone"></use>
                </svg>
                <span class="recom-album_count">{{countFormate(item.playCount)}}</span>
              </div>
            </router-link>
            <span class="btn-play" @click="coverClick(item)">
              <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#play_rb"></use>
              </svg>
            </span>
          </a>
          <a class="recom-album_copywrite copywrite" href="#">{{item.name}}</a>
        </div>
        <!-- 其他歌单推荐结束 -->

        <!-- 为补足空位额外添加三个推荐，来自精选碟 -->
        <div class="recom-album_item" v-for="item in moreRecom" :key="item.id">
          <a class="recom-album_cover">
            <router-link :to="{name:'album',params:{albumId:item.id}}">
              <img :src="item.coverImgUrl+'?param=200y200'" alt="" class="img">
              <span class="recom-album_tip">{{item.copywriter}}</span>
              <div class="recom-album_play-count">
                <svg class="recom-album_icon icon-earphone">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#earphone"></use>
                </svg>
                <span class="recom-album_count">{{countFormate(item.playCount)}}</span>
              </div>
            </router-link>
            <span class="btn-play" @click="coverClick(item)">
              <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#play_rb"></use>
              </svg>
            </span>
          </a>
          <a class="recom-album_copywrite copywrite" href="#">{{item.name}}</a>
        </div>
        <!--补位结束 -->

      </div>
    </div>
    <!-- 推荐歌单结束 -->
    <!-- 独家放送开始 -->
    <div class="recom-private container">
      <div class="head">
        <h2 class="title">独家放送</h2>
        <span class="more">
          <a href="#">更多></a>
        </span>
      </div>
      <div class="flex">
        <div class="recom-private_item" v-for="item in priva" :key="item.id">
          <router-link class="recom-private_cover" :to="{name:'album'}" tag="a">
            <img :src="item.sPicUrl" alt="" class="img">
            <span class="btn-tag">
              <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#act"></use>
              </svg>
            </span>
          </router-link>
          <a href="#" class="recom-album_copywrite">
            <span class="copywrite">{{item.name}}</span>
          </a>
        </div>
      </div>
    </div>
    <!-- 独家放送结束 -->
    <!-- 最新音乐开始 -->
    <div class="new-songs container">
      <div class="head">
        <h2 class="title">最新音乐</h2>
        <span class="more">
          <a href="#">更多></a>
        </span>
      </div>
      <ul class="new-songs_ul">
        <li class="new-songs_li" v-for="(item, index) in newSongs" :key="item.id">
          <span class="order">{{index}}</span>
          <span class="play-status">
            <svg>
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#list-play"></use>
            </svg>
          </span>
          <a class="new-songs_cover" @click="coverClick(item)">
            <img :src="item.song.album.picUrl+'?param=40y40'" alt="" class="img">
            <span class="btn-play">
              <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#play_rb"></use>
              </svg>
            </span>
          </a>
          <h3>
            <span class="title">{{item.song.name}}</span>
            <span class="alias">
              {{item.song.alias.toString() ? ('（' + item.song.alias + '）') : '' || item.song.transNames ? '（' + item.song.transNames.toString() + '）' : ''}}
            </span>
          </h3>
          <div class="info">
            <span>
              <svg class="sq-tag" v-if="item.song.privilege.fl===320000">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#sq"></use>
              </svg>
            </span>
            <a href="#" class="mv-tag" v-show="item.song.mvid">
              <svg>
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mv"></use>
              </svg>
            </a>
            <a href="#" class="author-name" v-for="artist in item.song.artists" :key="artist.id">
              <span>
                {{artist.name}}{{item.song.artists.length>1?'/':''}}
              </span>
            </a>
          </div>
        </li>
      </ul>
    </div>
    <!-- 最新音乐结束 -->
    <!-- 推荐MV开始 -->
    <div class="recom-mv container">
      <div class="head">
        <h2 class="title">推荐MV</h2>
        <span class="more">
          <a href="#">更多></a>
        </span>
      </div>
      <div class="flex">
        <div class="recom-mv_item" v-for="item in mv" :key="item.id">
          <router-link :to="{name:'album'}" class="recom-mv_cover">
            <img :src="item.picUrl+'?param=400y225'" alt="" class="img">
            <span class="recom-mv_tip">{{item.copywriter}}</span>
            <div class="recom-mv_play-count">
              <svg class="recom-mv_icon icon-video">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#video_mv"></use>
              </svg>
              <span class="recom-mv_count">{{countFormate(item.playCount)}}</span>
            </div>
          </router-link>
          <a href="#" class="recom-mv_copywrite">
            <span class="copywrite">{{item.name}}</span>
          </a>
          <a href="#" class="recom-mv_author">
            {{item.artistName}}
          </a>
        </div>
      </div>
    </div>
    <!-- 推荐MV结束 -->
    <!-- 主播电台开始 -->
    <div class="recom-dj container">
      <div class="head">
        <h2 class="title">主播电台</h2>
        <span class="more">
          <a href="#">更多></a>
        </span>
      </div>
      <div class="flex">
        <div class="recom-dj_item" v-for="item in dj" :key="item.id">
          <div class="wrap">
            <a href="#" class="recom-dj_cover">
              <img :src="item.picUrl+'?param=80y80'" alt="" class="img">
              <span class="btn-play">
                <svg>
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#play_rb"></use>
                </svg>
              </span>
            </a>
            <div class="recom-dj_info">
              <a href="#" class="title">{{item.name}}</a>
              <a href="#" class="author">{{item.program.radio.name}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 主播电台结束 -->
  </div>
</template>

<script>
import Slide from './slide'
import { getPersonalized, getNewSongs, getPrivate, getRecomMv, getRecomDJ, getMoreRecom, getAlbumDetail } from '../../../../utils/get-data.js'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'home',
  components: {
    Slide
  },
  data () {
    return {
      recom: null,
      priva: null,
      newSongs: null,
      mv: null,
      dj: null,
      moreRecom: null
    }
  },
  computed: {
    ...mapState([
      'login'
    ])
  },
  methods: {
    ...mapMutations({
      playNew: 'PLAY_SONG_BY_ID'
    }),
    async initDate () {
      if (!this.login) {
        try {
          const getDataFunc = {
            'recom': getPersonalized(),
            'priva': getPrivate(),
            'newSongs': getNewSongs(),
            'mv': getRecomMv(),
            'dj': getRecomDJ(),
            'moreRecom': getMoreRecom(3)
          }
          const allData = await Promise.all(Object.values(getDataFunc))
          const allResult = []
          allData.forEach(function ({ data }) {
            if (data.result) {
              allResult.push(data.result)
            } else {
              allResult.push(data.playlists)
            }
          });
          [this.recom, this.priva, this.newSongs, this.mv, this.dj, this.moreRecom] = [
            ...allResult
          ]
        } catch (err) {
          console.log(err)
        }
      }
    },
    countFormate (num) {
      if (num > 99999) {
        num = parseInt(num / 10000)
        return num + '万'
      }
      return parseInt(num)
    },
    coverClick (item) {
      switch (item.type) {
        case 0:
          // 推荐歌单封面点击，直接将整个歌单作为新的播放列表
          this.replacePlayList(item)
          break

        case 4:
          // 新歌推荐，直接提交更改歌曲id的mutation
          this.playNew(item)
          break

        default:
          // 补位添加的3个没有type属性
          this.replacePlayList(item)
          break
      }
    },
    async replacePlayList (item) {
      const { data: { playlist } } = await getAlbumDetail(item.id)
      this.playNew(playlist.trackIds[0])
    }
  },
  mounted () {
    this.initDate()
  }
}

</script>

<style scoped="">
.container {
  position: relative;
  min-width: 760px;
  max-width: 1040px;
}

.head {
  width: 100%;
  border-bottom: 1px solid #e1e1e2;
  padding: 0 0 10px;
  margin-top: 11px;
}

.head::after {
  content: '';
  width: 0;
  height: 0;
  clear: both;
  display: block;
}

.head .title {
  float: left;
  color: #333;
  font-size: 18px;
  font-weight: 400;
}

.head .more {
  float: right;
  color: #666;
  margin-top: 7px;
}

.head .more:hover {
  color: #333;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: top;
  width: 100%;
  margin: 10px -9px 20px;
  width: calc(100% + 18px);
}

.recom-mv .flex {
  flex-wrap: nowrap;
  overflow: hidden;
}

.recom-album_item,
.recom-private_item,
.recom-mv_item,
.recom-dj_item {
  order: 1;
  flex-direction: column;
  display: flex;
  overflow: hidden;
  margin-bottom: 34px;
  padding: 0 9px;
  box-sizing: border-box;
}

.recom-album_item {
  width: 20%;
}

.recom-private_item,
.recom-mv_item {
  width: 33.33%;
  flex: 1 0 auto;
}

.recom-dj_item {
  width: 50%;
  margin-bottom: 10px;
}

.recom-dj_item .wrap {
  display: flex;
  flex-flow: row nowrap;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, .05);
}

.recom-dj_item .wrap {
  border-bottom: 1px solid rgba(0, 0, 0, .05);
}

.recom-album_cover,
.recom-mv_cover,
.recom-private_cover,
.new-songs_cover,
.recom-dj_cover {
  display: inline-block;
  position: relative;
  line-height: 0;
  cursor: pointer;
}

.new-songs_cover {
  left: 39px;
}

.recom-album_cover .img,
.recom-mv_cover .img,
.recom-private_cover .img {
  width: 100%;
  height: 100%;
}

.new-songs_cover .img {
  width: 40px;
  height: 40px;
}

.recom-dj_cover .img {
  width: 80px;
  height: 80px;
}

.recom-album_cover .btn-play,
.new-songs_cover .btn-play,
.recom-dj_cover .btn-play,
.recom-private_cover .btn-tag {
  position: absolute;
  display: inline-block;
  width: 24px;
  height: 24px;
  background-color: rgba(0, 0, 0, .4);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, .5);
}

.recom-album_cover .btn-play {
  right: 5px;
  bottom: 5px;
  opacity: 0;
  transition: .2s;
}

.new-songs_cover .btn-play {
  left: 9px;
  top: 9px;
  width: 20px;
  height: 20px;
}

.recom-dj_cover .btn-play {
  right: 5px;
  bottom: 5px;
}

.recom-private_cover .btn-tag {
  width: 30px;
  height: 30px;
  left: 6px;
  top: 5.5px;
  box-sizing: border-box;
}

.recom-album_cover:hover .btn-play {
  opacity: 1;
}

.btn-play:hover {
  background-color: rgba(0, 0, 0, .6);
}

.btn-play svg {
  width: 10px;
  height: 10px;
  fill: #fff;
  border-radius: 50%;
  padding: 7px;
}

.new-songs_cover .btn-play svg {
  padding: 5px;
}

.btn-tag svg {
  width: 28px;
  height: 28px;
  fill: #fff;
  border-radius: 50%;
}

.recom-album_tip,
.recom-mv_tip {
  position: absolute;
  top: -50px;
  left: 0;
  background-color: rgba(0, 0, 0, .5);
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 18px;
  padding: 6px 8px;
  width: 100%;
  transition: .25s .5s;
  color: #fff;
  box-sizing: border-box;
}

.recom-album_cover:hover .recom-album_tip,
.recom-mv_cover:hover .recom-mv_tip {
  top: 0;
}

.recom-album_play-count,
.recom-mv_play-count {
  width: 100%;
  opacity: 1;
  transition: 0s .5s;
  position: absolute;
  text-align: right;
  line-height: 20px;
  right: 0;
  top: 0;
  color: #fff;
  background: linear-gradient(left, rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0.25) 85%);
  padding-right: 6px;
  box-sizing: border-box;
}

.recom-album_cover:hover .recom-album_play-count,
.recom-mv_cover:hover .recom-mv_play-count {
  opacity: 0;
}

.recom-album_play-count .icon-earphone {
  width: 12px;
  height: 9px;
  fill: #fff;
}

.recom-mv_play-count .icon-video {
  width: 14px;
  height: 9px;
  fill: #fff;
}

.recom-mv_copywrite,
.recom-mv_author,
.recom-album_copywrite {
  width: fit-content;
}

.copywrite {
  font-size: 14px;
  line-height: 18px;
  font-family: "Noto Sans CJK SC Regular";
  margin: 3px 0 2px;
  display: inline-block;
  color: #333;
  letter-spacing: -0.05em
}

.copywrite:hover {
  color: #111;
}

.recom-mv_author {
  font-size: 12px;
  color: #666;
}

.recom-mv_author:hover {
  color: #333;
}

.recom-mv_copywrite .copywrite,
.recom-mv_author {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.new-songs_ul {
  overflow: hidden;
  list-style: none;
  width: 100%;
  height: 300px;
  margin: 10px 0 20px;
  border: 1px solid rgba(0, 0, 0, .05);
  display: flex;
  flex-flow: column wrap;
}

.new-songs_ul::after {
  position: absolute;
  content: '';
  width: 1px;
  height: 300px;
  background-color: rgba(0, 0, 0, .05);
  left: 50%;
}

.new-songs_li {
  position: relative;
  height: 60px;
  padding: 10px 0;
  box-sizing: border-box;
}

.new-songs_li .order,
.new-songs_li .play-status {
  position: absolute;
  left: 11px;
  line-height: 40px;
  color: #666;
}

.new-songs_li .play-status {
  opacity: 0;
}

.playing .play-status {
  opacity: 1;
}

.playing .order {
  opacity: 0;
}

.new-songs_li .play-status svg {
  width: 14px;
  height: 14px;
  fill: #c62f2f;
}

.new-songs_li h3 {
  position: absolute;
  display: block;
  left: 89px;
  right: 15px;
  top: 10px;
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 20px;
}

.new-songs_li h3 span {
  display: inline-block;
  line-height: 20px;
}

.new-songs_li h3 span.title {
  color: #111;
}

.new-songs_li h3 span.alias {
  color: #666;
}

.new-songs_li:nth-child(2),
.new-songs_li:nth-child(4),
.new-songs_li:nth-child(7),
.new-songs_li:nth-child(9) {
  background-color: #f5f5f7
}

.new-songs_li:hover {
  background-color: rgba(31, 33, 51, .06)
}

.new-songs_li.selected {
  background-color: rgba(31, 33, 51, .1)
}

.new-songs_li.slected h3 span.alias {
  color: #111;
}

.new-songs_li.selected .order {
  color: #111;
}

.new-songs_li .info {
  position: absolute;
  left: 89px;
  bottom: 10px;
  line-height: 20px;
}

.new-songs_li .sq-tag {
  fill: #c62f2f;
  width: 16px;
  height: 9px;
  float: left;
  line-height: 20px;
  margin: 6px 5px 0 0;
}

.new-songs_li .mv-tag {
  float: left;
  height: 20px;
  line-height: 1;
  font-size: 0;
  margin-right: 5px;
}

.new-songs_li .mv-tag svg {
  fill: #c62f2f;
  width: 18px;
  height: 18px;
}

.new-songs_li .author-name {
  float: left;
  color: #666;
}

.new-songs_li:hover .author-name {
  color: #111;
}

.recom-dj_info {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  padding: 9px 0 10px 11px;
}

.recom-dj_info a.title {
  color: #333;
  font-size: 13px;
  width: fit-content;
}

.recom-dj_info a.title:hover {
  color: #111;
}

.recom-dj_info a.author {
  color: #666;
  font-size: 12px;
  width: fit-content;
}

.recom-dj_info a.author:hover {
  color: #333;
}
</style>
