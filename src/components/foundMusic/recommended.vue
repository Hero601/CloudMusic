<template>
  <div>
    <div
      class="bgImg"
      style="background-image: url('http://p1.music.126.net/1ezHdSc_ljV9o6ppU98oEg==/109951165777623292.jpg')"
    >
      <div class="containerMain banner">
        <template>
          <!-- interval 是指图片自动切换的时间 - ms -->
          <el-carousel
            trigger="click"
            :interval="5000"
            arrow="always"
            height="284px"
            style="width: 730px"
          >
            <el-carousel-item v-for="(item, index) in bannerList" :key="index">
              <img
                :src="item.imageUrl"
                :targetId="item.targetId"
                :targetType="item.targetType"
                style="height: 284px;"
              />
            </el-carousel-item>
          </el-carousel>
        </template>
        <div class="download"></div>
      </div>
    </div>
    <div class="containerMain">
      <div class="songList">
        <!-- 第一块歌单：精品歌单 -->
        <div>
          <!-- 榜单前的功能菜单 -->
          <div class="fitstSongListTitle songListTitle">
            <div>
              <span class="firstTitle"><a href="#">热门推荐</a></span>
              <el-divider direction="vertical"></el-divider>
              <span> <a href="#">华语</a></span>
              <el-divider direction="vertical"></el-divider>
              <span> <a href="#">流行</a></span>
              <el-divider direction="vertical"></el-divider>
              <span> <a href="#">摇滚</a></span>
              <el-divider direction="vertical"></el-divider>
              <span> <a href="#">民谣</a></span>
              <el-divider direction="vertical"></el-divider>
              <span> <a href="#">电子</a></span>
              <span class="readMore"> <a href="#">更多</a></span>
            </div>
          </div>
          <!-- 歌单 -->
          <div class="songListContent">
            <ul>
              <li v-for="item in recommendedPlayList" :key="item.id">
                <div class="img">
                  <img
                    style="height: 140px; widht: 140px"
                    :src="item.picUrl"
                    alt=""
                  />
                </div>
                <div class="text" v-text="item.name"></div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 第二块歌单：个性化推荐 - 登录才会显示 -->
        <div v-if="userInfo">
          <div class="songListTitle">
            <div>
              <span class="firstTitle"><a href="#">个性化推荐</a></span>
              <span class="readMore"> <a href="#">更多</a></span>
            </div>
          </div>
          <div class="songListContent secondBlock">
            <ul>
              <li>
                <!-- 每日歌曲推荐 -->
                <div class="dailySong">
                  <div class="img u-date">
                    <!-- TODO 动态获取日期 -->
                    <span class="head">星期五</span>
                    <span class="bd">5</span>
                  </div>
                  <div class="text">
                    <p class="dec">每日歌曲推荐</p>
                    <p class="instructions">根据你的口味生成，每天6:00更新</p>
                  </div>
                </div>
              </li>
              <!-- 私人雷达 -->
              <li v-for="item in recommendData" :key="item.id">
                <div class="img">
                  <img
                    style="height: 140px; widht: 140px"
                    :src="item.picUrl"
                    alt=""
                  />
                </div>
                <div class="text">
                  <p class="dec">{{ item.name }}</p>
                  <p class="instructions">{{ item.copywriter }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- 第三块歌单 - 新碟上架 -->
        <div>
          <div class="songListTitle">
            <div>
              <span class="firstTitle"><a href="#">新碟上架</a></span>
              <span class="readMore"> <a href="#">更多</a></span>
            </div>
          </div>
          <!-- TODO 应为轮播图形式展示的新碟上架 -->
          <div class="songListContent thirdBlock">
            <ul>
              <li v-for="(item, index) in newDiscData" :key="index">
                <img class="songImg" :src="item.picUrl" />
                <p class="songName">{{ item.name }}</p>
                <p class="author">{{ item.artist.name }}</p>
              </li>
            </ul>
          </div>
        </div>
        <!-- 第四块歌单 - 榜单 -->
        <div>
          <div class="songListTitle">
            <div>
              <span class="firstTitle"><a href="#">榜单</a></span>
              <span class="readMore"> <a href="/foundmusic/toplist">更多</a></span>
            </div>
          </div>
          <!-- 使用了第三个块的部分样式 -->
          <div class="songListContent thirdBlock fourthBlock">
            <!-- 飙升榜 -->
            <ul :rankingId="item.id" v-for="item in rankingData" :key="item.id">
              <!-- 榜单名称 -->
              <li class="imgLi">
                <img style="width: 80px" :src="item.coverImgUrl" />
                <p>{{ item.name }}</p>
              </li>
              <!-- 当前表单下的数据需要使用 rankingId 来获取 -->
              <li v-for="(subItem, subIndex) in item.tracks" :key="subIndex">
                {{ subItem.first }}
              </li>
              <!-- 查看全部 -->
              <li class="showall">查看全部 ></li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 用户信息、歌手信息、主播信息 -->
      <div
        :style="!userInfo ? 'height: 1142px;' : 'height: 1502px;'"
        class="musicians"
      >
        <!-- 用户信息 -->
        <div class="userBlock">
          <!-- 未登录展示内容 -->
          <p v-if="!userInfo">
            登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
          </p>
          <!-- 登录展示内容 -->
          <div v-else class="userInfo">
            <!-- 用户头像 -->
            <div class="portrait">
              <img style="height: 80px" :src="userInfo.profile.avatarUrl" />
            </div>
            <!-- 用户昵称 -->
            <div class="nickname">{{ userInfo.profile.nickname }}</div>
            <!-- 签到 -->
            <button v-if="!isSignIn" @click="signIn" class="signIn">
              签到
            </button>
            <button v-else class="yesSignIn signIn">已签到</button>
          </div>
        </div>
        <!-- 歌手列表 -->
        <div class="singerList">
          <div class="title">
            <p>入驻歌手</p>
            <a class="showall">查看全部></a>
          </div>
          <ul>
            <li v-for="item in singerList" :key="item.id">
              <img
                style="width: 62px; height: 55px"
                :src="item.picUrl"
                alt=""
              />
              <p class="name">{{ item.name }}</p>
            </li>
          </ul>
        </div>
        <!-- 热门主播 -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      data: '',
      // 轮播图图片
      bannerList: [],
      // 打开首页之后的推荐歌单
      recommendedPlayList: [],
      // 新碟数据
      newDiscData: [],
      // 排行榜数据
      rankingData: [],
      // 飙升榜、新歌榜、原创榜的id
      listId: {},
      // 个性化推荐的歌单
      recommendData: [],
      // 歌手列表
      singerList: [],
      isSignIn: false
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {
    // 获取轮播图数据
    this.getBannerData()
    // this.run()
    // 获取推荐歌单数据
    this.getRecommendedPlayList()
    // 获取新碟上架数据
    this.getNewDisc()
    // 获取排行榜数据
    this.getRankingData()
    // 获取每日推荐数据
    this.getRecommendData()
    // 获取歌手列表
    this.getSingerLisst()
    // 初始化是否登录
    this.initSignIn()
  },
  methods: {
    // 获取轮播图数据
    async getBannerData() {
      const data = await this.$http.get('/banner?type=0')
      if (data.status !== 200) {
        return this.$message.error('轮播图数据获取异常')
      }
      this.bannerList = data.data.banners
    },
    // 获取推荐歌单
    async getRecommendedPlayList() {
      // 获取八条推荐的歌单
      const result = await this.$http.get('/personalized?limit=8')
      if (result.status !== 200) return this.$http.error('获取推荐歌单失败')
      this.recommendedPlayList = result.data.result
    },
    // 获取个性化推荐块中的数据 - 需登录
    async getRecommendData() {
      if (!this.userInfo) return false
      const result = await this.$http.get('/recommend/resource')
      if (result.status !== 200) {
        return this.$message.error('亲，建议登录一下~')
      }
      this.recommendData = result.data.recommend.slice(0, 3)
    },
    loginDialogHandleClick() {
      console.log('object')
    },
    // 获取新碟数据
    async getNewDisc() {
      const data = await this.$http.get('/top/album?offset=0&limit=5')
      if (data.status !== 200) {
        return this.$message.error('获取新碟失败')
      }
      // 从所有数据中添加5条
      this.newDiscData = data.data.weekData.slice(0, 5)
    },
    // 获取榜单数据
    async getRankingData() {
      const data = await this.$http.get('/toplist/detail')
      if (data.status !== 200) {
        return this.$message.error('获取榜单失败')
      }
      // 从所有榜单中取出飙升榜、新歌榜、原创榜
      this.rankingData = data.data.list.slice(0, 3)
    },
    // 测试接口函数
    async run() {
      const data = await this.$http.get('/top/artists?limit=5')
      console.log(data)
    },
    // TODO 返回状态为 400 报错，无法使用 catch 捕获
    async signIn() {
      const result = await this.$http.get('/daily_signin?type=1')
      if (result.data.code !== 200) {
        return this.$message.error('签到出现未知错误')
      }
      window.sessionStorage.setItem('isSignIn', true)
      // 显示本次签到得分
      this.$message.success(`签到成功，获得积分${result.data.point}`)
      // 刷新页面，更改签到按钮
      window.top.location.reload(true)
    },
    initSignIn() {
      this.isSignIn = window.sessionStorage.getItem('isSignIn') || false
    },
    // 获取歌手列表
    async getSingerLisst() {
      const result = await this.$http.get('/top/artists?limit=5')
      this.singerList = result.data.artists
    }
  }
}
</script>
<style lang="css" scoped>
.download {
  width: 254px;
  height: 285px;
  background-color: black;
}
.banner div {
  float: left;
}

.banner {
  /* 防止轮播图区域没有高度，开启bfc */
  overflow: hidden;
  /* margin-bottom: 50px; */
}

.songList {
  background-color: #fff;
  border: 0.5px solid #ccc;
  box-sizing: border-box;
  padding: 20px;
}

.songList,
.musicians {
  float: left;
  background-color: #fff;
}

.songListTitle {
  position: relative;
  padding-left: 10px;
  width: 689px;
  padding-top: 30px;
  padding-bottom: 5px;
  border-bottom: 2px solid #c10d0c;
}
.fitstSongListTitle {
  padding-top: 0;
}

.songList .firstTitle {
  font-size: 20px;
}
.songListTitle span:hover {
  cursor: pointer;
  text-decoration: #333;
}
.songListTitle span {
  padding: 3px;
}
.songList .songListTitle a {
  color: #333;
}

.songList .songListTitle span:hover a {
  color: #000;
  text-decoration: underline;
}

.musicians {
  position: absolute;
  right: 0;
  width: 254px;
  height: 100px;
  border: 0.5px solid #ccc;
  height: 1502px;
}
.readMore {
  position: absolute;
  right: 16px;
}
.songListContent {
  height: 400px;
  width: 690px;
}
.songListContent ul {
  padding: 0;
}
.songListContent ul li {
  float: left;
  list-style: none;
  width: 140px;
  height: 204px;
  padding-left: 42px;
  display: inline-block;
  /* padding: 0 21px; */
}
.songListContent ul li .text {
  font-size: 14px;
}
.songListContent ul li:nth-child(1),
.songListContent ul li:nth-child(5) {
  padding-left: 0;
}

.bgImg {
  background-size: 60000px;
  background-position: center center;
}

.u-date {
  position: relative;
  zoom: 1;
  display: block;
  width: 140px;
  height: 140px;
  background: url('../../assets/elves2.png') no-repeat;
  background-position: -260px -310px;
}

.u-date .head {
  display: block;
  height: 33px;
  line-height: 33px;
  color: #fed9d9;
  font-size: 14px;
  text-shadow: 0 -1px #962626;
  text-align: center;
}
.u-date .bd {
  display: block;
  line-height: 102px;
  text-align: center;
  font-size: 94px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  color: #202020;
}
.text .dec {
  margin: 8px 0 3px;
  font-size: 14px;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.text .instructions {
  margin-top: 3px;
  position: relative;
  z-index: 2;
  color: #999;
}

/* 个性化推荐块 */
.secondBlock {
  height: 280px;
}

/* 新碟上架块 */
div.thirdBlock {
  margin-top: 20px;
  border: 0.5px solid #ccc;
  height: 190px;
  background: #f5f5f5;
}

div.thirdBlock > ul > li:nth-child(1) {
  padding-left: 30px;
}
div.thirdBlock > ul > li:nth-child(5) {
  padding-left: 15px;
}

div.thirdBlock > ul > li {
  width: 100px;
  height: 100px;
  padding: 0 15px;
}

.thirdBlock .songImg {
  width: 100%;
}

.thirdBlock .songName {
  width: 90%;
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  margin-top: 5px;
  font-size: 14px;
}
.thirdBlock .author {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
  color: #666;
  font-size: 12px;
  padding-top: 5px;
}
div.fourthBlock {
  height: auto;
  overflow: hidden;
}
div.fourthBlock ul {
  overflow: hidden;
  width: 230px;
  margin: 0;
  float: left;
  border: 0.5px solid #ccc;
  box-sizing: border-box;
}
div.fourthBlock ul li:not(:nth-child(1)) {
  width: 90%;
  margin: 0 auto;
  height: 32px;
}
div.fourthBlock ul li.imgLi {
  width: 188.5px;
  height: auto;
  overflow: hidden;
  padding: 0;
  padding: 20px 0 0 19px;
}
div.fourthBlock ul li.imgLi p {
  display: inline-block;
  color: #333;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  position: relative;
  top: -50px;
  left: 10px;
  margin-bottom: 15px;
}

div.fourthBlock ul li,
div.fourthBlock ul li.showall {
  padding: 5px;
  line-height: 30px;
  padding-left: 20px;
}

div.fourthBlock ul li:nth-child(2),
div.fourthBlock ul li:nth-child(4),
div.fourthBlock ul li:nth-child(6) {
  background-color: #ddd;
}

div.fourthBlock ul li:hover {
  cursor: pointer;
}

div.fourthBlock ul li.showall {
  position: relative;
  right: -110px;
}
.containerMain .musicians .userBlock {
  /* height: 126px; */
  overflow: hidden;
  height: auto;
  background-color: rgb(227, 227, 227);
  box-shadow: 0 3px 3px 1px #ccc;
}
.containerMain .musicians .userBlock p {
  margin: 0;
  box-sizing: border-box;
  padding: 20px;
  color: #666;
  font-size: 15px;
}
.musicians .userBlock .userInfo {
  box-sizing: border-box;
  padding: 20px;
  margin-bottom: 10px;
}
.musicians .userBlock .userInfo img {
  border: 0.5px solid #ccc;
  float: left;
}
.musicians .userBlock .userInfo .nickname {
  font-size: 16px;
  float: left;
  font-weight: 600;
  margin-left: 20px;
  margin-top: 10px;
}
.musicians .userBlock .userInfo .signIn {
  outline: none;
  border: 0.5px solid #ccc;
  padding: 5px 20px;
  font-size: 14px;
  background-color: rgb(0, 88, 139);
  color: #fff;
  border-radius: 5px;
  margin-left: 20px;
  margin-top: 10px;
}
.singerList ul li {
  list-style: none;
}

.singerList {
  box-sizing: border-box;
  padding: 10px;
}

.singerList .title {
  margin-top: 5px;
  border-bottom: 1px solid #333;
  height: 43px;
}
.singerList .title p,
.singerList .title a {
  float: left;
}
.singerList .title p {
  font-weight: 500;
}
.singerList .title a {
  position: relative;
  right: -90px;
  top: 17px;
  color: #666;
}
.singerList .title a:hover {
  text-decoration: underline;
  cursor: pointer;
}
.singerList ul {
  padding: 0 20px;
}
.singerList ul li {
  background-color: rgb(250, 250, 250);
  height: 55px;
  margin: 10px 0;
  border: 0.5px solid #ccc;
}
.singerList ul li img,
.singerList ul li p {
  float: left;
}
.singerList ul li img {
  margin-right: 10px;
}
.musicians .userBlock .userInfo button.yesSignIn {
  background-color: darkcyan;
}
</style>
