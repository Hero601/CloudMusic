import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../components/index.vue'
import foundMusic from '../components/foundMusic.vue'
import myMusic from '../components/myMusic.vue'
import friend from '../components/friend.vue'
// 发现音乐下的推荐页面
import recommended from '../components/foundMusic/recommended.vue'

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
        redirect: '/foundmusic/discover',
        children: [{ path: '/foundmusic/discover', component: recommended }]
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
