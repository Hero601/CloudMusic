<template>
  <div>
    <div class="containerMain">
      <!-- 左侧导航菜单 -->
      <div class="navMenu">
        <el-menu
          default-active="19723756"
          active-text-color="#FF7F00 "
          class="el-menu-vertical-demo"
        >
          <el-menu-item
            @click="querySongDescList(item.id)"
            v-for="item in topListData"
            :key="item.id"
            :index="item.id + ''"
          >
            <div slot="title">
              <img
                class="img"
                style="width: 40px; height: 40px"
                :src="item.coverImgUrl"
              />
              <!-- 歌单名 -->
              <span class="text">{{ item.name }}</span>
              <!-- 当前歌单的更新信息 -->
              <span class="updataInfo">{{ item.updateFrequency }}</span>
            </div>
          </el-menu-item>
        </el-menu>
      </div>
      <!-- 右侧菜单中的数据，根据左侧菜单中被选中状态的id -->
      <div class="listContent">
        <!-- 居中布局容器 -->
        <div class="listContentContainer">
          <!-- 排行榜内容的标题 -->
          <div class="title">
            <!-- 当前排行榜的显示图片 -->
            <div class="topListImg">
              <img style="height: 150px" :src="topListDataDesc.coverImgUrl" />
            </div>
            <!-- 排行榜的信息 -->
            <div class="topListInfo">
              <!-- 排行榜名称 -->
              <p class="topListName">{{ topListDataDesc.name }}</p>
              <!-- 更新的时间 -->
              <!-- TODO 时间戳转日期 -->
              <p>最近更新: {{ timeStampToDate(topListDataDesc.updateTime) }}</p>
              <!-- 六个功能按钮 -->
              <div class="funBtn">
                <button>播放</button>
                <!-- 加入播放列表 -->
                <button>+</button>
                <button>收藏</button>
                <button>分享</button>
                <button>下载</button>
                <button>评论</button>
              </div>
            </div>
          </div>
          <!-- 歌曲信息 -->
          <div class="songInfo">
            <div class="songInfoHeader"></div>
            <div class="songInfoTable">
              <el-table
                border
                size="mini"
                :data="topListDataDesc.tracks"
                stripe
                style="width: 100%"
              >
                <el-table-column type="index" label="#" width="50">
                </el-table-column>
                <el-table-column prop="name" label="标题" width="300">
                </el-table-column>
                <el-table-column prop="dt" label="时长" width="120">
                  <template slot-scope="scope">
                    {{ millisToMinutesAndSeconds(scope.row.dt) }}
                  </template>
                </el-table-column>
                <el-table-column prop="ar[0].name" label="歌手" width="180">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 排行榜数据
      topListData: [],
      // 排行榜详细数据
      topListDataDesc: {}
    }
  },
  created() {
    // 获取排行榜数据
    this.getTopListData()
    // 查询排行榜详细数据
    this.querySongDescList()
  },
  methods: {
    // 获取排行榜数据
    async getTopListData() {
      const result = await this.$http.get('/toplist/detail')
      if (result.status !== 200) return this.$message.error('获取歌单失败')
      this.topListData = result.data.list
    },
    async querySongDescList(id) {
      // 由于挂载了created钩子，需要判断id是否存在，如果不存在需要使用飙升榜的 id 来获取数据
      let result = []
      if (id) {
        result = await this.$http.get(`/playlist/detail?id=${id}`)
      } else {
        result = await this.$http.get('/playlist/detail?id=19723756')
      }
      if (result.status !== 200) return this.$message.error('获取排行榜失败')
      this.topListDataDesc = result.data.playlist
      console.log(this.topListDataDesc)
    },
    // 毫秒转分钟
    millisToMinutesAndSeconds(millis) {
      var minutes = Math.floor(millis / 60000)
      var seconds = ((millis % 60000) / 1000).toFixed(0)
      return '0' + minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    },
    timeStampToDate(nS) {
      return new Date(parseInt(nS))
        .toLocaleString()
        .replace(/:\d{1,2}$/, ' ')
    }
  }
}
</script>
<style lang="css" scoped>
.containerMain > div {
  float: left;
}
.navMenu {
  width: 240px;
  border: 0.5px solid #ccc;
}
.navMenu .el-menu-item {
  padding-bottom: 5px;
  overflow: hidden;
}
.navMenu .el-menu-item .img {
  margin-right: 10px;
}
.navMenu .el-menu-item span {
  display: block;
  line-height: 20px;
  height: 20px;
  position: relative;
  top: -46px;
  left: 50px;
}
.navMenu .el-menu-item span.updataInfo {
  color: #aaa;
  font-size: 12px;
}
.listContent {
  width: 740px;
  background-color: #fff;
  border: 0.5px solid #ccc;
  border-left: none;
  height: auto;
  overflow: hidden;
}
.listContent .title {
  width: 100%;
  height: 240px;
}
.listContent .title div {
  float: left;
}
.listContentContainer {
  width: 740px;
  margin: 0 auto;
  overflow: hidden;
  padding: 40px;
}
.topListImg {
  width: 150px;
  height: 150px;
  overflow: hidden;
  padding: 2px;
  border: 0.5px solid #ccc;
}

.listContent .title .topListInfo {
  margin-left: 40px;
}

.listContent .title .topListInfo .topListName {
  font-size: 18px;
  font-weight: 500;
}
</style>
