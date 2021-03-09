import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../components/index.vue'
import foundMusic from '../components/foundMusic.vue'
import myMusic from '../components/myMusic.vue'
import friend from '../components/friend.vue'
// 发现音乐下的推荐页面
import recommended from '../components/foundMusic/recommended.vue'
// 发现音乐下的排行榜页面
import topList from '../components/foundMusic/topList.vue'
// 发现音乐下的歌单页面
import playlist from '../components/foundMusic/playlist.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/foundmusic' },
  {
    path: '/',
    component: index,
    children: [
      {
        path: '/foundmusic',
        component: foundMusic,
        // 打开发现音乐，自动跳转到推荐页
        redirect: '/foundmusic/discover',
        children: [
          { path: '/foundmusic/discover', component: recommended },
          { path: '/foundmusic/toplist', component: topList },
          { path: '/foundmusic/playlist', component: playlist }
        ]
      },
      { path: '/my', component: myMusic },
      { path: '/friend', component: friend }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
