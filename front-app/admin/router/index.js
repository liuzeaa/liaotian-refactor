import Vue from 'vue'
import Router from 'vue-router'

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
    {path:'/user',name: '用户',component:  resolve => require(["../components/user.vue"], resolve)},
    {path:'/user/:id',name: '用户项目',component:  resolve => require(["../components/user.item.vue"], resolve), hidden:true},
    {path:'/post',name: '说说',component:  resolve => require(["../components/post.vue"], resolve)},
    {path:'/post/:id',name: '说说项目',component:  resolve => require(["../components/post.item.vue"], resolve), hidden:true},
    {path:'/messsage',name: '消息',component:message, hidden:true}
  ]
})
