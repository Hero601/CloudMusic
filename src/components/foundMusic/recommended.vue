<template>
  <div>
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
    <div class="containerMain">
      <div class="songList">
        <!-- 榜单前的功能菜单 -->
        <div class="songListTitle">
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
      <!-- 右侧登录状态和歌手信息 -->
      <div class="musicians"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: '',
      // 轮播图图片
      bannerList: [],
      // 打开首页之后的推荐歌单
      recommendedPlayList: []
    }
  },
  created() {
    // 获取轮播图数据
    this.getBannerData()
    // this.run()
    // 获取推荐歌单
    this.getRecommendedPlayList()
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
      console.log(this.recommendedPlayList)
    },
    // 测试接口函数
    async run() {
      const data = await this.$http.get('/personalized?limit=8')
      console.log(data)
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
  padding-bottom: 5px;
  border-bottom: 2px solid #c10d0c;
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
  height: 1000px;
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
</style>
