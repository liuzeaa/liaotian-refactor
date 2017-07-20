import Vue from 'vue'
import Router from 'vue-router'
import user from '../components/user.vue'
import userItem from '../components/user.item.vue'
import post from '../components/post.vue'
import postItem from '../components/post.item.vue'
import message from '../components/message.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/user',
      hidden:true
    },
    {
      path: '/user',
      name: '用户',
      component: user,
    },
    {
      path: '/user/:id',
      name: '用户项目',
      component: userItem,
      hidden:true
    },
    {
      path: '/post',
      name: '说说',
      component: post
    },
    {
      path: '/post/:id',
      name: '说说项目',
      component: postItem,
      hidden:true
    },
    {
      path: '/messsage',
      name: '消息',
      component: message,
      hidden:true
    }
  ]
})
