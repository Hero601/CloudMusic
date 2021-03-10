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
// 发现音乐下的主播电台页面
import djradio from '../components/foundMusic/djradio.vue'
// 发现音乐 -> 主播电台 -> 默认展示页面
import djradioDefault from '../components/foundMusic/djradio/default.vue'
// 发现音乐 -> 主播电台 -> 传递了 id 的页面
import djradioOthers from '../components/foundMusic/djradio/others.vue'

Vue.use(VueRouter)

const routes = [
  // 默认跳转到发现音乐页面
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
          { path: '/foundmusic/playlist', component: playlist },
          {
            path: '/foundmusic/djradio',
            component: djradio,
            // 默认跳转到 default 页面
            redirect: '/foundmusic/djradio/category',
            children: [
              // 没有传递 id 参数时
              {
                path: '/foundmusic/djradio/category',
                component: djradioDefault
              },
              // 传递了参数 id 之后展示的页面
              {
                path: '/foundmusic/djradio/category/:id',
                component: djradioOthers
              }
            ]
          }
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
