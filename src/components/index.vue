<template>
  <div>
    <el-header height="106px">
      <div class="container">
        <div class="logo"></div>
        <div class="menu">
          <ul>
            <!-- 当前展示页面才有 activeMenu 类 -->
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
          <a v-if="!userInfo" @click="showLoginDialog" href="#">登录</a>
          <el-dropdown v-if="userInfo">
            <!-- 点击时展示登录对话框 -->
            <img
              style="width: 40px;"
              v-if="userInfo"
              :src="userInfo.profile.avatarUrl"
            />
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的主页</el-dropdown-item>
              <el-dropdown-item>我的消息</el-dropdown-item>
              <el-dropdown-item>我的等级</el-dropdown-item>
              <el-dropdown-item>VIP 会员</el-dropdown-item>
              <el-dropdown-item>个人设置</el-dropdown-item>
              <el-dropdown-item>实名认证</el-dropdown-item>
              <el-dropdown-item
                ><span @click="logout">退出登录</span></el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- 登录对话框 -->
        <el-dialog
          title="登录"
          :visible.sync="loginDialogVisible"
          width="40%"
          :before-close="loginDialogClose"
        >
          <!-- 登录方式页签 -->
          <template>
            <!-- value=0 表示默认打开扫码登陆 -->
            <el-tabs value="0">
              <el-tab-pane label="扫码登录" name="0">
                <div>打开网易云app -> 扫一扫</div>
                <img :src="qrSrc" />
              </el-tab-pane>
              <el-tab-pane label="手机号登录" name="1">
                <el-form
                  ref="phoneLoginFormRef"
                  :model="phoneLoginForm"
                  label-width="80px"
                >
                  <el-form-item label="手机号">
                    <el-input
                      size="small"
                      v-model="phoneLoginForm.phone"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input
                      type="password"
                      size="small"
                      v-model="phoneLoginForm.password"
                    ></el-input>
                  </el-form-item>
                  <button @click="phoneSubmit" class="phoneLoginSubmit">
                    提交
                  </button>

                  <button @click.prevent="check">验证登录状态</button>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="QQ登录" name="2">QQ登录</el-tab-pane>
              <el-tab-pane label="网易邮箱登录" name="3"
                >网易邮箱登录</el-tab-pane
              >
              <el-tab-pane label="微博登录" name="4">微博</el-tab-pane>
            </el-tabs>
          </template>
        </el-dialog>
      </div>
      <!-- 一级菜单下的选择按钮 -->
      <div class="subnav">
        <div class="container">
          <ul>
            <!-- 绑定页面切换事件 -->
            <li @click='pageChange'>
              <a :class='activeSubPage == "discover" ? "activeSubnav" : "" ' href="/foundmusic/discover">推荐</a>
            </li>
            <li @click='pageChange'><a href="/foundmusic/toplist" :class='activeSubPage == "toplist" ? "activeSubnav" : "" '>排行榜</a></li>
            <li @click='pageChange'><a href="/foundmusic/playlist" :class='activeSubPage == "playlist" ? "activeSubnav" : "" '>歌单</a></li>
            <!-- TODO 待修改的链接和 class 属性 -->
            <li @click='pageChange'><a href="#" :class='activeSubPage == "#" ? "activeSubnav" : "" '>主播电台</a></li>
            <li @click='pageChange'><a href="#" :class='activeSubPage == "#" ? "activeSubnav" : "" '>歌手</a></li>
            <li @click='pageChange'><a href="#" :class='activeSubPage == "#" ? "activeSubnav" : "" '>新碟上架</a></li>
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
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      loginDialogVisible: false,
      // 二维码图片的src属性
      qrSrc: '/',
      // 手机号登录表单对象
      phoneLoginForm: {
        phone: '',
        password: ''
      },
      // 默认的三级路由活动页
      activeSubPage: 'discover'
    }
  },
  created() {
    // 一定要将 this(vue) 传递过去，因为在mutations中this为vuex，vuex中的并没有$localStorage属性
    this.getUserInfoForLocalStorage(this)
    this.readParamsForLocalStorage()
  },
  computed: {
    // userInfo：用户信息
    ...mapState(['userInfo'])
  },
  methods: {
    // 映射的操作 state 函数
    ...mapMutations(['getUserInfoForLocalStorage']),
    // 页面渲染时，从 localStorage 中读取数据
    readParamsForLocalStorage() {
      // 将从 localStorage 中获取的数据存到三级活动路由中
      this.activeSubPage = window.sessionStorage.getItem('activeSubPage')
    },
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
    },
    // 手机登录
    async phoneSubmit() {
      // 加上时间戳，防止缓存
      const result = await this.$http.get(
        '/login/cellphone?timestamp' + Date.now(),
        {
          params: {
            phone: this.phoneLoginForm.phone,
            password: this.phoneLoginForm.password
          }
        }
      )
      // 登录失败
      if (result.status !== 200) return this.$message.error(result.statusText)
      let cookies = result.data.cookie
      cookies = cookies.split('; ')
      // 保存cookie
      cookies.forEach(item => {
        document.cookie = item
      })
      // 将登录信息保存到localStorage 中
      this.$localStorage.set('userInfo', result.data)
      // 登录成功，刷新页面
      window.top.location.reload(true)
      // 登录成功，关闭登录对话框
      this.loginDialogClose()
    },
    // 检测登录状态
    async check() {
      const result = await this.$http.get('/login/status')
      console.log(result)
    },
    // 退出登录
    async logout() {
      const result = await this.$http.get('/logout')
      if (result.status !== 200) {
        return this.$message.error('退出登录失败')
      } else {
        // 清除cookie
        this.clearAllCookie()
        // 清除localStorage
        localStorage.removeItem('userInfo')
        // 强制页面刷新
        window.top.location.reload(true)
      }
    },
    // 清除cookie
    clearAllCookie() {
      var date = new Date()
      date.setTime(date.getTime() - 10000)
      var keys = document.cookie.match(/[^ =;]+(?==)/g)
      console.log('需要删除的cookie名字：' + keys)
      if (keys) {
        for (var i = keys.length; i--;) {
          document.cookie =
            keys[i] + '=0; expire=' + date.toGMTString() + '; path=/'
        }
      }
    },
    // 页面切换事件
    pageChange($event) {
      // 取出href 中最后一个的路径
      let url = $event.target.getAttribute('href').split('/')
      url = url[url.length - 1]
      // 将当前活动页设置到 sessionStorage 中
      // activeSubPage 表示活动的三级路由
      window.sessionStorage.setItem('activeSubPage', url)
      console.log(url)
      return false
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
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  transform: translateY(40%);
  border-radius: 50%;
  overflow: hidden;
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

.activeSubnav {
  background-color: #9b0909;
  color: #fff;
}

.subnav ul li:hover a {
  background-color: #9b0909;
}

.phoneLoginSubmit {
  width: 100px;
  height: 40px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #ccc;
}
</style>
