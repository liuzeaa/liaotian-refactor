import axios from 'Axios';
import request from 'superagent'


export function detail(id,cb) {
    axios.get('/post/'+id)
        .then(res=>{
            "use strict";
            cb(res.data)
        })
}
export function addComment(id,obj,cb) {
    axios.post('/post/'+id+'/comment',obj)
        .then(res=>{
            "use strict";
            cb(res.data)
        })
}
export function editComment(postId,commentId,obj,cb){
    axios.patch('/post/'+postId+'/comment/'+commentId,obj)
        .then(res=>{
            "use strict";
            cb(res.data)
        })
}
export function deleteComment(postId,commentId,cb){
    axios.delete('/post/'+postId+'/comment/'+commentId)
        .then(res=>{
            "use strict";
            cb(res.data);
        })
}
