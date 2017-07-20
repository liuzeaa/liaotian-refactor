
import request from 'superagent'
export function edit(id,obj,cb) {
    request
        .patch('/user/'+id)
        .send(obj)
        .end((err,res)=>{
            cb(res.body)
        })
}
export function detail(id, cb) {
    request
      .get('/user/'+id+'/detail')
      .end((err,res)=>{
          cb(res.body)
      })
}
export function queryUser(id,cb){
  request
    .get('/user/'+id)
    .end((err,res)=>{
      cb(res.body)
    })
}
export function addPost(id,obj,cb) {
    request
      .post('/user/'+id+'/post')
      .send(obj)
      .end((err,res)=>{
          cb(res.body)
      })
}
export function editPost(userId,postId,obj,cb){
  request
    .patch('/user/'+userId+'/post/'+postId)
    .send(obj)
    .end((err,res)=>{
      cb(res.body)
    })
}
export function deletePost(userId,postId,cb){
  request
    .delete('/user/'+userId+'/post/'+postId)
    .end((err,res)=>{
      cb(res.body)
    })
}
export function addFriend(userId,friendId,cb){
  request
    .post('/user/'+userId+'/friend/'+friendId)
    .end((err,res)=>{
      cb(res.body)
    })
}
export function deleteFriend(userId,friendId,cb){
  request
    .delete('/user/'+userId+'/friend/'+friendId)
    .end((err,res)=>{
      cb(res.body)
    })
}
