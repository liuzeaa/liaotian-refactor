<template>
  <div class="user-item">
    <h1>{{username}}</h1>
    <div>
      <img :src="logo" width="100" height="100"/>
    </div>

    <el-upload
            name="file"
            action="/upload"
            :on-success="onSuccess"
            list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>

    <el-button @click="saveAsLogo">保存个头像</el-button>
    <h3>文章列表</h3>
    <el-form :inline="true">

      <el-form-item>
        <el-button @click="addPost.visible=true">增加文章</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="增加文章"
      :visible="addPost.visible"
      :before-close="handleClose"
    >
      <el-form>
        <el-form-item  label="标题" label-width="50px">
          <el-input v-model="addPost.title"></el-input>
        </el-form-item>
        <el-form-item  label="内容" label-width="50px">
          <el-input v-model="addPost.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPost.visible=false">取 消</el-button>
        <el-button type="primary" @click="handleAddPost">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="编辑文章"
      :visible="editPost.visible"
      :before-close="handleClose"
    >
      <el-form>
        <el-form-item  label="标题" label-width="50px">
          <el-input v-model="editPost.title"></el-input>
        </el-form-item>
        <el-form-item  label="内容" label-width="50px">
          <el-input v-model="editPost.content"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editPost.visible=false">取 消</el-button>
        <el-button type="primary" @click="saveEditPost">确 定</el-button>
      </span>
    </el-dialog>
    <el-table :data="post" border>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column>
        <template scope="scope">
          <el-button @click="showEditPost(scope.row)">编辑</el-button>
          <el-button type="danger" @click="handleDeletePost(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间"></el-table-column>
      <el-table-column prop="updatedAt" label="最后更新时间"></el-table-column>
    </el-table>
    <h3>好友列表</h3>
    <el-form :inline="true">

      <el-form-item  v-if="!addFriend.visible">
        <el-button @click="addFriend.visible=true">增加好友</el-button>
      </el-form-item>

      <el-form-item v-if="addFriend.visible">
        <el-select v-model="addFriend.friendId">
          <el-option
            v-for="u in allUser"
            :label="u.username"
            :value="u.id"
            :key="u.id"
            v-if="!isFriend(u.id)&& u.id!=id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  v-if="addFriend.visible">
        <el-button @click="handleAddFriend">确定</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="friend" border>
      <el-table-column prop="id" label="好友id"></el-table-column>
      <el-table-column prop="username" label="好友名字"></el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button @click="navigateToMesage(scope.row.username)">查看聊天记录</el-button>
          <el-button type="danger" @click="handleDeleteFriend(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {detail,addPost,editPost,deletePost,addFriend,deleteFriend,queryUser,edit} from './user.item.api';
  import {get_all_user} from './user.api';
  export default {
      name:'user-item',
      data(){
          return {
              addPost:{
                  visible:false,
                  title:'',
                  content:''
              },
              editPost:{
                visible:false,
                title:'',
                content:''
              },
              addFriend:{
                visible:false,
                friendId:''
              },
              id:'-1',
              username:'',
              nickname:'',
              logo:'',
              createdAt:'',
              updatedAt:'',
              post:[],
              friend:[],
              allUser:[],
              tempLogoUrl:''
          }
      },
      methods:{
          onSuccess(response){
            this.tempLogoUrl = response.url;
          },
          saveAsLogo(){
          console.log(this.tempLogoUrl)
              edit(this.id,{logo:this.tempLogoUrl},(item)=>{
                  this.logo = item.logo
                  this.tempLogoUrl = '';
              })
          },
          fetch(){
            detail(this.id,(item)=>{
                this.username = item.username
                this.nickname = item.nickname
                this.logo = item.logo
                this.createdAt=item.createdAt
                this.updatedAt = item.updatedAt
                this.post = item.post
                this.friend = item.friend
            })
          },
          showEditPost(obj){
            var post = Object.assign({},obj,{visible:true})
            this.editPost = post
          },
          saveEditPost(){
            var post = this.editPost
            var obj = Object.assign({},post)
            delete post.visible
            editPost(this.id,obj.id,obj,(item)=>{
              this.post =this.post.map((obj)=>{
                if(obj.id==item.id){
                  obj = Object.assign({},item)
                }
                return obj
              })
            })
          },
          handleDeletePost(postId){

              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                deletePost(this.id,postId,(item)=>{

                  this.post = this.post.filter(obj=>{
                    return obj.id != item.id
                  })
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });
          },
          handleAddPost(){
            addPost(this.id,{title:this.addPost.title,content:this.addPost.content},(item)=>{
                this.post.push(item)
                this.addPost.visible = false
            })
          },
          isFriend(id){
              return !!this.friend.find((user)=>{
                  return user.id == id
              })
          },
          handleClose(){
            this.addPost.visible = false
            this.editPost.visible = false
          },

          handleAddFriend(){
          console.log(this.friend)
            addFriend(this.id,this.addFriend.friendId,(item)=>{
              queryUser(this.addFriend.friendId,(i)=>{
                console.log(i)
                this.friend.push(i)
                console.log(this.friend)
              })
              this.addFriend.visible = false
              this.friendId = ''
            })
          },
          handleDeleteFriend(friendId){
              this.$confirm('此操作将永久删除该好友, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                deleteFriend(this.id,friendId,(item)=>{
                  this.friend = this.friend.filter(obj=>{
                    return obj.id != item.friendId
                  })
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });
              });

          },
          navigateToMesage(name){
            this.$router.push('/message?user='+this.username+'&friend='+name)
          }
      },
      mounted(){
          this.id = this.$route.params.id
          this.fetch()
          get_all_user((list)=>{
              this.allUser = list
          })
      }
  }
</script>
<style>
</style>
