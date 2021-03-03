<template>
  <div>
    <el-header height="106px">
      <div class="container">
        <div class="logo"></div>
        <div class="menu">
          <ul>
            <li class="activeMenu"><a href="/foundMusic">发现音乐</a></li>
            <li><a href="/my">我的音乐</a></li>
            <li><a href="/friend">朋友</a></li>
            <li><a href="/shop">商城</a></li>
            <li><a href="/musicians">音乐人</a></li>
            <li><a href="/downloadClient">下载客户端</a></li>
            <!-- hot -->
            <el-badge class="badge" value=""></el-badge>
          </ul>
        </div>
        <!-- 搜索歌曲MV -->
        <div class="searchMusic">
          <el-form size="small" ref="searchFormRef" label-width="0px">
            <el-form-item>
              <el-input
                placeholder="音乐/视频/电台/用户"
                class="input_search"
                prefix-icon="el-icon-search"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- 创作者中心 -->
        <div class="creator">
          <button>创作者中心</button>
        </div>
        <!-- 登录 -->
        <div class="login">
          <!-- 点击时展示登录对话框 -->
          <a @click="showLoginDialog" href="#">登录</a>
        </div>
        <!-- 登录对话框 -->
        <el-dialog
          title="登录"
          :visible.sync="loginDialogVisible"
          width="30%"
          :before-close="loginDialogClose"
        >
          <span>扫码登录</span>
          <img :src="qrSrc" />
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="loginDialogVisible = false"
              >其他方式登录</el-button
            >
          </span>
        </el-dialog>
      </div>
      <!-- 一级菜单下的选择按钮 -->
      <div class="subnav">
        <div class="container">
          <ul>
            <li>
              <a class="activeSubnav" href="/foundmusic/discover">推荐</a>
            </li>
            <li><a href="#">排行榜</a></li>
            <li><a href="#">歌单</a></li>
            <li><a href="#">主播电台</a></li>
            <li><a href="#">歌手</a></li>
            <li><a href="#">新碟上架</a></li>
          </ul>
        </div>
      </div>
    </el-header>
    <div class="main">
      <router-view></router-view>
    </div>
    <!-- <div class="footer">
      this is footer
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginDialogVisible: false,
      // 二维码图片的src属性
      qrSrc: '/'
    }
  },
  methods: {
    // 展示登录对话框，生成登录二维码
    async showLoginDialog() {
      // 当用户点击时生成二维码的key
      // key中的值为对象，code属性和unikey属性
      const { data: key } = await this.$http.get('/login/qr/key', {
        params: { t: new Date().getTime() }
      })
      if (key.code !== 200) return null
      // 生成二维码的base64编码
      // 请求时携带时间戳
      const { data: base64 } = await this.$http.get(
        `/login/qr/create?key=${key}&qrimg=s&t=${new Date().getTime()}`
      )
      if (base64.code !== 200) return null
      this.qrSrc = base64.data.qrimg
      this.loginDialogVisible = true
    },
    // 关闭登录对话框
    loginDialogClose() {
      // base64置为空
      this.qrSrc = '/'
      // 关闭
      this.loginDialogVisible = false
    }
  }
}
</script>
<style lang="css" scoped>
.el-header {
  background-color: rgb(36, 36, 36);
  color: #ccc;
  font-size: 14px;
  padding: 0;
}
.el-container {
  height: 1000px;
}
.container {
  height: 70px;
  width: 1100px;
  margin: 0 auto;
  display: block;
}
.container > div {
  float: left;
}
.logo {
  width: 177px;
  height: 70px;
  background-image: url('../assets/logo_img.png');
}
.menu {
  height: 70px;
}
.menu ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
  height: 70px;
  /* 微调 */
  margin-left: -1px;
}
/* 当前活动菜单项 */
.activeMenu {
  background-color: #000;
  color: #fff;
}

.activeMenu a {
  color: #fff;
}

.menu ul li:hover a {
  color: #fff;
}

.menu ul li {
  float: left;
  height: 70px;
  line-height: 67px;
  padding: 0 19px;
}
.menu ul li:hover {
  cursor: pointer;
  background-color: #000;
  color: #fff;
}
.badge {
  position: relative;
  top: 16px;
  left: -10px;
  width: 30px;
  height: 12px;
  background-image: url('../assets/logo_img.png');
  background-position: -190px 0;
}
.searchMusic {
  margin-left: 20px;
  line-height: 70px;
}
.input_search {
  border-radius: 50px;
  overflow: hidden;
  width: 160px;
}
.searchMusic .el-form {
  height: 70px;
  margin-left: 20px;
}
.searchMusic .el-form-item {
  transform: translateY(40%);
}
.login {
  margin-left: 20px;
  line-height: 70px;
}
.login a {
  color: #ccc;
  text-decoration: none;
}
.login a:hover {
  color: #fff;
}
.creator {
  margin-left: 20px;
  line-height: 70px;
}
.creator button {
  outline: none;
  width: 90px;
  font-size: x-small;
  color: #ccc;
  background-color: rgb(36, 36, 36);
  border: 0.5px solid #ccc;
  font-weight: 100;
  border-radius: 50px;
  height: 30px;
}
.creator button:hover {
  cursor: pointer;
  color: #fff;
  background-color: rgb(36, 36, 36);
  border: 0.5px solid #fff;
}
.main {
  /* height: 10000px; */
}
.subnav {
  height: 35px;
  background-color: #c20c0c;
  border-bottom: 1px solid #a40011;
  margin-top: -14px;
}
.subnav ul {
  margin-left: 189px;
  padding: 0;
}
.subnav ul li {
  line-height: 35px;
  list-style: none;
  float: left;
  padding: 0 11px;
}

.subnav ul li a {
  padding: 1px 15px;
  border-radius: 10px;
}

.subnav ul li:hover {
  cursor: pointer;
}

/* TODO 当前选中的 subnav */
.activeSubnav {
  background-color: #9b0909;
  color: #fff;
}

.subnav ul li:hover a {
  background-color: #9b0909;
}
</style>
