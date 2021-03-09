<template>
  <div>
    <!-- 居中容器 -->
    <div class="containerMain">
      <template>
        <el-select
          @change="selectedChange"
          v-model="playListSelectedValue"
          placeholder="全部"
        >
          <el-option-group
            v-for="(group, index) in playlistSelectedData"
            :key="index"
            :label="group.label"
          >
            <el-option
              v-for="(item, subIndex) in group.options"
              :key="subIndex"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-option-group>
        </el-select>
        <el-button @click='querySongAll'>全部歌单</el-button>
      </template>
      <!-- 歌曲页面 -->
      <el-row :span="30">
        <el-col
          :push=1
          style="height: 200px"
          v-for="(item, index) in playlistData"
          :key="index"
          :span="6"
        >
          <!-- 歌单图片 -->
          <img
            style="width: 140px; height: 140px"
            :songId="item.id"
            :src="item.coverImgUrl"
            :title="item.description"
          />
          <!-- 歌单名 -->
          <div :songId="item.id" class="songListName">{{ item.name }}</div>
          <!-- 歌单作者 -->
          <div :authorId="item.creator.userId" class="songListAuthor">
            <span>by</span> {{ item.creator.nickname }}
          </div>
        </el-col>
      </el-row>
      <!-- 歌单的数据分页 -->
      <el-pagination
        background
        :page-size="limit"
        layout="prev, pager, next"
        @current-change="currentChange"
        :total="total"
      >
      </el-pagination>
      <!-- 歌单评论 -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      playlistData: [],
      // 歌单的分类数据 - 级联菜单中的数据
      playlistSelectedData: [],
      // 歌单分类选中的值
      playListSelectedValue: '',
      // 总数据条数
      total: 0,
      // 当前页
      pagenum: 1,
      // limit指定取多少数据，如果不指定，自动请求50条数据
      limit: 32
    }
  },
  methods: {
    // 获取歌单分类数据
    async getPlaylistSelectedData() {
      const result = await this.$http.get('/playlist/catlist')
      if (result.status !== 200) return this.$message.error('获取分类数据失败')

      // 将类别拷贝进 playlistSelectedData 中
      for (const key in result.data.categories) {
        this.playlistSelectedData.push({
          label: result.data.categories[key],
          options: []
        })
      }
      // 根据 sub 属性中应该属于的类别，添加进相应的类别对象中
      result.data.sub.forEach(ele => {
        // 获取应属于的类别索引
        this.playlistSelectedData[ele.category].options.push(ele)
      })
      return null
    },
    // 获取歌单数据 - 默认获取全部歌单
    async getPlayListData(query = '') {
      // offset 表示偏移几首歌
      // limit 表示取几首歌
      const result = await this.$http.get(
        `/top/playlist?cat=${query}&limit=${this.limit}&offset=${(this.pagenum -
          1) *
          this.limit}`
      )
      this.total = result.data.total
      this.playlistData = result.data.playlists
    },
    // 下拉菜单选中的值改变事件
    selectedChange() {
      this.getPlayListData(this.playListSelectedValue)
    },
    // 当前活动页发生变化事件
    currentChange(newSize) {
      // 改变当前页
      this.pagenum = newSize
      // 重新发起请求
      this.getPlayListData()
    },
    // 查询所有歌单
    querySongAll() {
      this.playListSelectedValue = ''
      this.getPlayListData()
    }
  },
  created() {
    this.getPlaylistSelectedData()
    this.getPlayListData()
  }
}
</script>
<style lang="css" scoped>
.containerMain {
  background-color: #fff;
  box-sizing: border-box;
  padding: 20px;
  border: 0.5px solid #ccc;
}
.el-button {
  margin-left: 30px;
}
/* .col {
  margin: 20px;
} */
.el-row {
  margin-top: 30px;
  margin-bottom: 30px;
}
.el-row .songListName,
.el-row .songListAuthor {
  width: 140px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.el-row .songListName {
  font-size: 14px;
}
.el-row .songListAuthor span {
  color: #aaa;
}
.el-row .songListAuthor {
  margin-top: 2px;
  font-size: 12px;
  color: #666;
}
</style>
