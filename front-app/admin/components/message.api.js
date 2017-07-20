

import request from 'superagent'

export function getMessage(query,cb){
  request
    .get('/message')
    .query(query)
    .end((err,res)=>{
      cb(res.body)
    })
}
