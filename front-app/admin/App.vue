<template>
  <div id="app">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-menu>
          <el-menu-item
            v-for="(route,index) in $router.options.routes"
            v-if="!route.hidden"
            :index="route.path"
            @click="click(route.path)"
            key="index"
          >
            {{route.name}}
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods:{
      click(path){
          this.$router.push(path)
      }
  },
  mounted(){
      console.log(this.$router.options.routes)
  }
}
</script>

<style>
#app {

}
</style>
