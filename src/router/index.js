import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../components/index.vue'
import foundMusic from '../components/foundMusic.vue'
import myMusic from '../components/myMusic.vue'
import friend from '../components/friend.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: index,
    redirect: '/foundmusic',
    children: [
      { path: '/foundmusic', component: foundMusic },
      { path: '/my', component: myMusic },
      { path: '/friend', component: friend }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
