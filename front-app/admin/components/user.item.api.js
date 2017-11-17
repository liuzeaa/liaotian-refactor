import axios from 'Axios';
export function edit(id,obj,cb) {
    axios.patch('/user/'+id,obj)
        .then(res=>{
            cb(res.data)
        })
        .catch(err=>{
            console.log(err)
        })

}
export function detail(id, cb) {
    axios.get('/user/'+id+'/detail')
        .then(res=>{
            cb(res.data)
        }).catch(err=>{
            console.log(err)
        })

}
export function queryUser(id,cb){
    axios.get('/user/'+id)
        .then(res=>{
            "use strict";
            cb(res.data)
        })

}
export function addPost(id,obj,cb) {
    axios.post('/user/'+id+'/post',obj)
        .then(res=>{
            "use strict";
            cb(res.data)
        })
}
export function editPost(userId,postId,obj,cb){
    axios.patch('/user/'+userId+'/post/'+postId,obj)
        .then(res=>{
            "use strict";
            cb(res.data)
        })
}
export function deletePost(userId,postId,cb){
    axios.delete('/user/'+userId+'/post/'+postId)
        .then(res=>{
            "use strict";
            cb(res.data)
        })
}
export function addFriend(userId,friendId,cb){
    axios.post('/user/'+userId+'/friend/'+friendId)
        .then(res=>{
            "use strict";
            cb(res.data)
        })
}
export function deleteFriend(userId,friendId,cb){
    axios.delete('/user/'+userId+'/friend/'+friendId)
        .end(res=>{
            "use strict";
            cb(res.data)
        })
}
