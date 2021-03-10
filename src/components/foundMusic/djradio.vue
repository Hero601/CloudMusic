<template>
  <div>
    <!-- 居中容器 -->
    <div class="containerMain">
      <!-- 加一层 padding 和 border -->
      <div class="innerContainer">
        <!-- 电台分类 -->
        <div class="catList">
          <el-row>
            <el-col v-for="item in djCatList" :key="item.id" :span="3">
              <a @click='targetPage(item.id)' :href='"/foundmusic/djradio/category/id=" + item.id'>
                <img style="height: 48px" :src="item.pic56x56Url" />
                <p class="text">{{ item.name }}</p>
              </a>
            </el-col>
          </el-row>
        </div>
        <!-- 用户点击的是那个分类就要把分类 id 传递过去 -->
        <router-view :to='{name: "test", query: {id: targetId}}'></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 电台分类列表
      djCatList: [],
      // 用户点中的 id
      targetId: 'test'
    }
  },
  created() {
    this.getDjCatList()
  },
  methods: {
    // 获取电台分类列表
    async getDjCatList() {
      const result = await this.$http.get('/dj/catelist')
      if (result.status !== 200) return this.$message.error('获取电台分类失败')
      this.djCatList = result.data.categories
      console.log(this.djCatList)
    },
    targetPage(id) {
      // console.log(id)
      this.targetId = id
      return false
    }
  }
}
</script>
<style lang="css" scoped>
.innerContainer {
  width: 900px;
  padding: 10px 40px;
  background-color: #fff;
  border: 0.5px solid #ccc;
  margin: 0;
}
.el-col {
  display: block;
  width: 70px;
  height: 70px;
  background-position: 0 9999px;
  text-align: center;
  color: #888;
  margin: 20px;
}

.el-col p {
  margin: 0;
}

.el-col img:hover,
.el-col p:hover {
  cursor: pointer;
  color: #888;
}
.el-col p {
  color: #888;
}
</style>
