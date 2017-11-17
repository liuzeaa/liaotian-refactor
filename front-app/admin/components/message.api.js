import axios from 'Axios';

import request from 'superagent'

export function getMessage(query,cb){
    axios.get('/message',{params:{query}})
        .then(res=>{
            "use strict";
            cb(res.data)
        })
}
