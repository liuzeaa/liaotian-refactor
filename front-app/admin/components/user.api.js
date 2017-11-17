/**
 * Created by Administrator on 2017/6/11.
 */

import axios from 'Axios';
import request from 'superagent'


export const get_all_user = function (cb) {
    axios.get('/user')
        .then(res=>{
           cb(res.data)
        })
        .catch(err=>{
           console.log(err)
        })
}
